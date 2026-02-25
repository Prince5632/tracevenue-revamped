import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@shared/components/layout";
import { packageInformation } from "@shared/services";
import { getClubbedCuisineById } from "@/features/venue/services/clubbedPackageService";
import { checkJobStatus } from "@/features/venue/services/jobService";
import { fetchSelectedCuisineComboDetails } from "@/utils/helperCuisineApi";
import { generatePackageTitle } from "@/utils/packageTitle";
import { formatRupees } from "@/features/venue/enquiry/utils/budgetHelpers";

import CardImage from "@/assets/package images/card1.jpeg";
import PackageCard from "@/features/package/components/PackageCard";
import PackageFooter from "@/features/package/components/PackageFooter";
import { ProgressBar } from "@/shared/components/feedback";
import MenuCategories from "@/features/package/components/MenuCategories";
import PackageServices from "@/features/package/components/PackageServices";
import FoodItems from "@/features/package/components/FoodItems";
import PackageHeader from "@/features/package/components/PackageHeader";
import PackageCuisines from "@/features/package/components/PackageCuisines";

function PackageDetails() {
  const { id, jobId } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [clubbedData, setClubbedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const sectionRefs = useRef({});
  const [active, setActive] = useState(null);

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

  // Observer for scroll spy
  useEffect(() => {
    if (!packageData) return; // Wait for data

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setActive(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    // Give a small delay for DOM to render items
    setTimeout(() => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.observe(section);
      });
    }, 100);

    return () => observer.disconnect();
  }, [packageData]);

  const handleMenuClick = (id) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Format price helper
  const formatPrice = () => {
    const priceRange = clubbedData?.price_range;
    if (!priceRange) return "Price not available";

    const job = jobStatus?.job || {};
    const budgetType = job.budgetType;

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
  const job = clubbedData?.job || jobStatus?.job;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <main className="max-w-full p-[10px] lg:px-[40px]">
        {/* header */}
        <PackageHeader />

        <ProgressBar value={0} className="mt-6 mb-[20px]" />

        <div>
          <div className="mb-[10px] md:flex md:justify-between">
            <h2 className="text-[18px] text-[#000000] font-semibold md:text-[20px]">
              {packageTitle || "Custom Food Package"}
            </h2>
            <div className="flex flex-col mt-2">
              <span className="text-[22px] text-[#ff6b35] font-bold text-start md:text-end">
                {formatPrice()}
              </span>
              <span className="text-[11px] text-[#888888] font-bold text-start md:text-end">
                {jobStatus?.job?.budgetType}
              </span>
            </div>
          </div>
        </div>

        <PackageCard
          cuisines={packageData?.cuisineNames}
          services={packageData?.services}
          packageMenu={packageData?.menuTree}
          CardImage={CardImage}
        />

        <PackageCuisines cuisines={packageData?.cuisineNames} />

        <PackageFooter
          job={job}
          cuisineMenu={packageData?.menuTree}
          cuisineServices={packageData?.services}
          cuisineNames={packageData?.cuisineNames}
        />

        <div className="flex flex-col md:flex-row! items-start sticky top-24">
          {/* Menu Categories */}
          <div className="hidden lg:block">
            <MenuCategories packageMenu={packageData?.menuTree} isActive={active} handleMenuClick={() => handleMenuClick} />
          </div>
          {/* food items */}
          <div className="w-full md:max-w-[600px] ">
            <h2 className="text-[18px] text-[#060606] font-bold px-4">Food Items</h2>
            <div className="w-full h-auto max-h-[calc(100vh-8rem)] overflow-y-auto overflow-hidden scrollbar-hide md:pb-[200px]">
              <FoodItems packageMenu={packageData?.menuTree} sectionRefs={sectionRefs} />
            </div>
          </div>
          {/* Amenities & Services */}
          <PackageServices services={packageData?.services} handleMenuClick={() => handleMenuClick} sectionRefs={sectionRefs} />
        </div>
      </main>
    </>
  );
}
export default PackageDetails;
