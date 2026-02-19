import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@shared/components/layout";
import PackageInfo from "@/features/package/components/PackageInfo";
import { packageInformation } from "@shared/services";
import { getClubbedCuisineById } from "@/features/venue/services/clubbedPackageService";
import { checkJobStatus } from "@/features/venue/services/jobService";

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
        setPackageData(pkgRes?.data || pkgRes);
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
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </>
      );
    }

    return (
      <>
        <Navbar />
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {packageData ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">Package Details</h1>
              <p className="text-gray-500 mb-6">
                Package ID: {id} | Job ID: {jobId}
              </p>
              {/* TODO: Full Package Details UI — follow-up task */}
              <pre className="bg-gray-50 p-4 rounded-xl text-sm overflow-auto max-h-[60vh]">
                {JSON.stringify(packageData, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20">
              Package not found.
            </p>
          )}
        </div>
      </>
    );
  }

  // Fallback: static mock data for the /package-details route
  return (
    <>
      <Navbar />
      {packageInformation.map((item, index) => (
        <PackageInfo
          key={index}
          step={item.step}
          heading={item.heading}
          description={item.description}
          subHeading={item.subHeading}
          price={item.price}
          services={item.services}
          cardInfo={item.cardInfo}
          cuisines={item.cuisines}
          packageMenu={item.packageMenu}
        />
      ))}
    </>
  );
}
export default PackageDetails;
