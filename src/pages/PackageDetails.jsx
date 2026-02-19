import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@shared/components/layout";
import PackageInfo from "@/features/package/components/PackageInfo";
import { packageInformation } from "@shared/services";
import { getClubbedCuisineById } from "@/features/venue/services/clubbedPackageService";
import { checkJobStatus } from "@/features/venue/services/jobService";
import { fetchSelectedCuisineComboDetails } from "@/utils/helperCuisineApi";
import { generatePackageTitle } from "@/utils/packageTitle";
import { formatRupees } from "@/features/venue/enquiry/utils/budgetHelpers";

function PackageDetails() {
  const { id, jobId } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [clubbedData, setClubbedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !jobId) return;

      setLoading(true);
      try {
        const [pkgRes, statusRes] = await Promise.all([
          getClubbedCuisineById(id),
          checkJobStatus(jobId),
        ]);

        // Handle pkgRes structure (it might be { data: { clubbedData: ... } } or similar)
        const clubbedInfo = pkgRes?.clubbedData || pkgRes?.data?.clubbedData || pkgRes;
        setClubbedData(clubbedInfo);

        const variantIds = clubbedInfo?.matching_variants?.map(
          (variant) => variant.variant_id
        );

        if (variantIds?.length) {
          const cuisine_details = await fetchSelectedCuisineComboDetails(
            variantIds
          );
          setPackageData(cuisine_details);
        }

        setJobStatus(statusRes?.data || statusRes);
      } catch (error) {
        console.error("Failed to fetch package details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, jobId]);

  // Format price helper
  const formatPrice = () => {
    const priceRange = clubbedData?.price_range;
    if (!priceRange) return "Price not available";

    const job = jobStatus?.job || {};
    const budgetType = job.budgetType; // 'perPerson' or 'lumpSum'
    // If budget type is 'lumpSum', ideally we show total price. 
    // But the logic from DiscoverPackages implies:
    // If budgetType !== 'perPerson', multiply py maxPeople.
    // If budgetType === 'perPerson', show per plate price.

    const maxPeople = job.peopleRange?.maxPeople || 1;

    if (budgetType !== "perPerson") {
      return priceRange.min_price !== priceRange.max_price
        ? `${formatRupees(priceRange.min_price * maxPeople)} - ${formatRupees(priceRange.max_price * maxPeople)}`
        : formatRupees(priceRange.min_price * maxPeople);
    }
    return priceRange.min_price !== priceRange.max_price
      ? `${formatRupees(priceRange.min_price)} - ${formatRupees(priceRange.max_price)}`
      : formatRupees(priceRange.min_price);
  };

  const packageTitle = generatePackageTitle(packageData?.cuisineNames || []);

  // If route params are present, render dynamic data
  if (id && jobId) {
    if (loading) {
      return (
        <>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </>
      );
    }
  }

  return (
    <>
      <PackageInfo
        step={1}
        heading={"Package Details"}
        description={"Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations."}
        packageName={packageTitle || "Custom Food Package"}
        price={formatPrice()}
        services={packageData?.services}
        cardInfo={[
          {
            title: "Cuisines",
            value: packageData?.cuisineNames,
          },
          {
            title: "Services",
            value: packageData?.services,
          },
        ]}
        budgetType={jobStatus?.job?.budgetType}
        cuisines={packageData?.cuisineNames}
        packageMenu={packageData?.menuTree}
      />
    </>
  );
}
export default PackageDetails;
