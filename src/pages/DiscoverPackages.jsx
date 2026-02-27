import React, { useEffect, useState } from "react";
import useEnquiryStore from "@/features/venue/enquiry/context/useEnquiryStore";
import PackageCard from "@/features/venue/enquiry/components/CustomerCard";
import {
    generatePackageTitle,
    generatePackageDescription,
    generateFeaturedText,
} from "@/utils/packageTitle";
import { formatRupees } from "@/features/venue/enquiry/utils/budgetHelpers";
import { fetchCuisineCombinations } from "@/features/venue/services/cuisineComboService";
import { saveClubbedData } from "@/features/venue/services/clubbedPackageService";

/**
 * Discover Packages — rendered as step 7 within EnquiryLayout.
 * Displays cuisine combination cards using data saved via the clubbed package API.
 * Falls back to calling the cuisine analysis API directly if store data is missing.
 */
const DiscoverPackages = () => {
    const {
        cuisineCombinationsData,
        jobId,
        formData,
        isApiLoading,
        setCuisineCombinationsData,
        setClubbedPackageId,
    } = useEnquiryStore();

    const [localLoading, setLocalLoading] = useState(false);
    const packages = cuisineCombinationsData;

    // Fallback: if we arrive at this step without store data (e.g. after page refresh
    // or direct navigation), re-run the cuisine analysis + save flow.
    useEffect(() => {
        if (cuisineCombinationsData && cuisineCombinationsData.length > 0) return;
        if (!formData?.selectedEventType) return; // not enough data to query

        const load = async () => {
            setLocalLoading(true);
            try {
                const response = await fetchCuisineCombinations(formData);
                const data = response?.data;
                if (!data) return;

                const sortedCombinations = data?.sorted_cuisine_combinations || [];
                if (sortedCombinations.length === 0) return;

                const saveRes = await saveClubbedData(sortedCombinations);
                const savedDocs = saveRes?.savedDocs || [];
                if (savedDocs.length > 0) {
                    setCuisineCombinationsData(savedDocs);
                    setClubbedPackageId(savedDocs[0]?._id);
                } else {
                    setCuisineCombinationsData(sortedCombinations);
                }
            } catch (err) {
                console.error("Failed to load cuisine combinations:", err);
            } finally {
                setLocalLoading(false);
            }
        };

        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount

    // useEffect(() => {
    //     const loadPackages = async () => {
    //         try {
    //             // If we already have data in the store, use it
    //             if (cuisineCombinationsData && cuisineCombinationsData.length > 0) {
    //                 setPackages(cuisineCombinationsData);
    //                 setLoading(false);
    //                 return;
    //             }

    //             // Otherwise fetch from API using clubbedPackageId
    //             if (clubbedPackageId) {
    //                 const response = await getClubbedCuisineById(clubbedPackageId);
    //                 const data = response?.data || response;
    //                 if (data) {
    //                     setPackages(Array.isArray(data) ? data : [data]);
    //                     setLoading(false);
    //                     return;
    //                 }
    //             }

    //             // Fallback: use dummy data for UI preview
    //             setPackages([]);
    //         } catch (error) {
    //             console.error("Failed to load packages:", error);
    //             setPackages([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadPackages();
    // }, [cuisineCombinationsData, clubbedPackageId]);

    // Helper: extract cuisine names from a combination
    // Handles both shapes:
    //   - Cuisine API: { id, name }
    //   - Saved clubbed data: { value: { id, name }, label }
    const getCuisineNames = (cuisineCombination) =>
        cuisineCombination
            ?.map((c) => c?.value?.name || c?.name)
            .filter(Boolean) || [];

    // Helper: format price based on budget type
    const formatPrice = (priceRange) => {
        if (!priceRange) return "Price not available";
        const budgetType = formData?.budgetType;
        const maxPeople = formData?.selectedPeopleRange?.maxPeople || 1;
        console.log(formData, "cfghbjk")
        if (budgetType !== "perPerson") {
            return priceRange.min_price !== priceRange.max_price
                ? `${formatRupees(priceRange.min_price * maxPeople)} - ${formatRupees(priceRange.max_price * maxPeople)}`
                : formatRupees(priceRange.min_price * maxPeople);
        }
        return priceRange.min_price !== priceRange.max_price
            ? `${formatRupees(priceRange.min_price)} - ${formatRupees(priceRange.max_price)}`
            : formatRupees(priceRange.min_price);
    };

    if (isApiLoading || localLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        );
    }

    if (packages && packages?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center p-4">
                <h2 className="text-2xl font-bold text-gray-800">No Packages Found</h2>
                <p className="text-gray-500">
                    We couldn't find any packages matching your preferences. Please try adjusting your enquiry.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-[1000px] -mt-3 sm:mx-6 md:mx-6 lg:mx-0">
            {/* Header */}
            <div className="mb-8">
                <p className="text-[15px] text-gray-500 mt-1">
                    Based on your preferences, we found {packages?.length} package
                    {packages?.length !== 1 ? "s" : ""} for you
                </p>
            </div>

            {/* Package Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-6 -mt-4 mb-28">
                {packages?.map((item, index) => {
                    // Handle both direct data and nested clubbedData structure
                    const clubbedData = item?.clubbedData || item;
                    const cuisineNames = getCuisineNames(clubbedData?.cuisine_combination);
                    const title = generatePackageTitle(cuisineNames);
                    const subtitle = generateFeaturedText(cuisineNames);
                    const description = generatePackageDescription(cuisineNames);
                    const priceText = formatPrice(clubbedData?.price_range);
                    const itemId = item?._id || clubbedData?._id;

                    return (
                        <PackageCard
                            key={itemId || index}
                            title={title}
                            subtitle={subtitle}
                            cuisines={cuisineNames}
                            foodItemCount={clubbedData?.menu_stats?.total_available_menu_count || 0}
                            menuCount={clubbedData?.menu_stats?.total_unique_categories || 0}
                            cuisineCount={clubbedData?.cuisine_stats?.total_cuisine_count || 0}
                            amenitiesCount={clubbedData?.service_stats?.total_unique_services || 0}
                            priceText={priceText}
                            description={description}
                            clubbedId={itemId}
                            jobId={jobId}
                            venueCount={clubbedData?.venue_stats?.total_unique_venues || 0}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DiscoverPackages;
