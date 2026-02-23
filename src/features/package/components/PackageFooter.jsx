import React, { useState } from "react";
import { Button } from "@/shared/components/ui";
import PreviewEnquiry from "./PreviewEnquiry";
import { useLogin } from "@/hooks/useLogin";
import { useRaiseEnquiry } from "@/features/venue/enquiry/utils/raiseEnquiry";
import { useNavigate } from "react-router-dom";

function PackageFooter({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, isLoggedIn } = useLogin();
  const { raiseEnquiry } = useRaiseEnquiry();
  const navigate = useNavigate();

  const handleRaiseEnquiry = () => {
    if (!login()) return;

    // Access job details
    if (job) {
      raiseEnquiry(job.name, job, job._id);
    }
  };

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
            flex z-50
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
                  onClick={() => setIsModalOpen(true)}
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
                <PreviewEnquiry job={job} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
    </>
  );
}
export default PackageFooter;
