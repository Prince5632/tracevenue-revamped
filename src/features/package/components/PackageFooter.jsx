import React, { useState, useRef } from "react";
import { Button } from "@/shared/components/ui";
import PreviewEnquiry from "./PreviewEnquiry";
import { useAuth } from "@/features/auth/context/useAuthStore.jsx";
import { useRaiseEnquiry } from "@/features/venue/enquiry/utils/raiseEnquiry";
import { useNavigate } from "react-router-dom";
import Login from "@/features/auth/components/Login";

/** Auto-generate a title like "Looking for Wedding for 50 people on 28 Feb." */
const generateEnquiryTitle = (enquiry) => {
  const eventName =
    enquiry?.eventType?.eventName ||
    enquiry?.eventType?.label ||
    (typeof enquiry?.eventType === "string" ? enquiry.eventType : null);
  const maxPeople = enquiry?.peopleRange?.maxPeople;
  const firstDate = enquiry?.eventDateOptions?.preferredDates?.[0]?.date;
  const dateStr = firstDate
    ? new Date(firstDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    : null;
  if (!eventName) return enquiry?.name || "My Enquiry";
  return `Looking for ${eventName}${maxPeople ? ` for ${maxPeople} people` : ""}${dateStr ? ` on ${dateStr}` : ""}.`;
};

const getEnquiryTitle = (job) =>
  job?.name && job.name !== "Untitled Enquiry" ? job.name : generateEnquiryTitle(job);

function PackageFooter({ job, cuisineMenu, cuisineServices, cuisineNames, cuisineIds }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const { raiseEnquiry } = useRaiseEnquiry();
  const navigate = useNavigate();

  // Stores pending action to fire after login succeeds
  const pendingActionRef = useRef(null);

  // After login succeeds — fire the pending action automatically
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      action();
    }
  };

  // Merge package data into job so payload includes menuSections, services, cuisines
  // Also generates a smart title instead of "Untitled Enquiry"
  // cuisineIds = ObjectIds for the API; cuisineNames = display strings only
  const buildEnrichedJob = () => {
    const title = getEnquiryTitle(job);
    return {
      ...job,
      name: title,
      menuSections: cuisineMenu?.length ? cuisineMenu : (job?.menuSections || []),
      services: cuisineServices?.length ? cuisineServices : (job?.services || []),
      cuisines: cuisineIds?.length ? cuisineIds : (job?.cuisines || []),
    };
  };

  const handleRaiseEnquiry = () => {
    if (!isLoggedIn) {
      pendingActionRef.current = () => {
        const enrichedJob = buildEnrichedJob();
        if (enrichedJob) raiseEnquiry(enrichedJob.name, enrichedJob, enrichedJob._id);
      };
      setShowLoginModal(true);
      return;
    }
    const enrichedJob = buildEnrichedJob();
    if (enrichedJob) {
      raiseEnquiry(enrichedJob.name, enrichedJob, enrichedJob._id);
    }
  };

  const handlePreviewEnquiry = () => setIsModalOpen(true);

  const handleViewEnquiry = () => {
    if (job?._id) {
      navigate(`/service/venues/enquiry/details/${job._id}`, {
        state: {
          currentStepName: "Quotations",
          activeTab: "all",
        },
      });
    }
  };

  const isEnquiryRaised = job?.status === "Active" || job?.jobstatus === "Active";

  return (
    <>
      <div
        className="
            flex z-10
            px-2
            fixed bottom-0 right-0 left-0 justify-center
            md:bottom-8
          "
      >
        <div
          className="
              flex flex-col
              w-full max-w-[800px]
              py-[12px] px-[24px]
              bg-[#ffffff]
              border border-[rgba(0,0,0,0.05)]
              shadow-[0_8px_32px_#0000001f]
              items-center gap-[20px]
              md:rounded-[16px] md:!flex-row md:justify-between
              mx-auto 
            "
        >
          <div
            className="
                flex
                w-full
                font-semibold
                justify-center items-center gap-[16px]
                sm:justify-start
                md:w-auto md:justify-between
              "
          >
            {isEnquiryRaised ? null : (
              <div
                className="
                   flex
                   h-[48px] w-[48px]
                   text-[16px] text-[#ff4000]
                   bg-[linear-gradient(135deg,#fff5f0_0%,#ffe8de_100%)]
                   rounded-[12px]
                   justify-center items-center
                   sm:text-[20px]
                 "
              >
                <i
                  className="
                     fa-solid fa-paper-plane
                   "
                ></i>
              </div>
            )}
            <div
              className="
                  sm:w-full
                  md:w-auto
                "
            >
              <h4
                className="
                    mb-[4px]
                    text-[#1a1a1a] text-[13px] font-bold
                    sm:text-[16px]
                  "
              >
                {isEnquiryRaised ? "Your enquiry has already been raised" : "Send to Match Venues"}
              </h4>
              {!isEnquiryRaised && (
                <p
                  className="
                      hidden
                      text-[#666666] text-[13px] font-semibold
                      md:inline
                    "
                >
                  Get personalized quotes from venues
                </p>
              )}
            </div>
          </div>
          <div
            className="
                flex flex-col
                w-full
                items-center gap-[12px]
                md:w-auto
                lg:!flex-row
              "
          >
            {isEnquiryRaised ? (
              <Button
                variant="gradient"
                onClick={handleViewEnquiry}
                className="
                      flex items-center justify-center
                      w-full
                      px-[20px] py-[12px]
                      text-[#ffffff] text-[16px]
                      bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)]
                      rounded-[30px] border border-[rgb(255,64,0)]
                      cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                      !font-bold hover:translate-y-[-2px] duration-300 ease-in group 
                      sm:px-[32px] sm:py-[16px]
                      md:w-auto
                    "
              >
                View Enquiry
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handlePreviewEnquiry}
                  className="
                        w-full
                        px-[20px] py-[12px]
                        text-[#ff4000] text-[16px]
                        rounded-[30px] border border-[rgb(255,64,0)]
                        hover:!bg-[#ffffff] hover:!text-[#ff4000]
                        cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                        !font-bold hover:translate-y-[-2px] duration-300 ease-in
                        sm:px-[32px] sm:py-[16px]
                        md:w-auto
                      "
                >
                  Preview Enquiry
                </Button>
                <PreviewEnquiry
                  enquiry={job}
                  cuisineMenu={cuisineMenu}
                  cuisineServices={cuisineServices}
                  cuisineNames={cuisineNames}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
                <Button
                  variant="gradient"
                  onClick={handleRaiseEnquiry}
                  className="
                        flex items-center justify-center
                        w-full
                        px-[20px] py-[12px]
                        text-[#ffffff] text-[16px]
                        bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)]
                        rounded-[30px] border border-[rgb(255,64,0)]
                        cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                        !font-bold hover:translate-y-[-2px] duration-300 ease-in group 
                        sm:px-[32px] sm:py-[16px]
                        md:w-auto
                      "
                >
                  Get Best Quotes
                  <i
                    className="
                          ml-1
                          text-[14px] text-[#ffffff]
                          transition-transform transition-all
                          fa-solid fa-arrow-right group-hover:translate-x-1 duration-300 ease-in !font-extrabold
                        "
                  ></i>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Inline login modal — no page reload, state preserved after auth */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/10 backdrop-blur-sm p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <Login
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowLoginModal(false)}
            type="login"
          />
        </div>
      )}
    </>
  );
}
export default PackageFooter;
