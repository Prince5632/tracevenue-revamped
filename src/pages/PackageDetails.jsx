import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@shared/components/layout";
import PackageInfo from "@/features/package/components/PackageInfo";
import { packageInformation } from "@shared/services";
import { getClubbedCuisineById } from "@/features/venue/services/clubbedPackageService";
import { checkJobStatus } from "@/features/venue/services/jobService";
import { fetchSelectedCuisineComboDetails } from "@/utils/helperCuisineApi";

function PackageDetails() {
  const { id, jobId } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
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
        const variantIds = pkgRes?.clubbedData?.matching_variants?.map(
          (variant) => variant.variant_id
        );
        const cuisine_details = await fetchSelectedCuisineComboDetails(
          variantIds
        );
        setPackageData(cuisine_details);
        setJobStatus(statusRes?.data || statusRes);
      } catch (error) {
        console.error("Failed to fetch package details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, jobId]);

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
  console.log(packageData)
  return (
    <>
      <PackageInfo
        step={1}
        heading={"Package Details"}
        description={"This is package"}
        subHeading={"This is sub heading"}
        price={"1000"}
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
        cuisines={packageData?.cuisineNames}
        packageMenu={packageData?.menuTree}
      />
    </>
  );
}
export default PackageDetails;
