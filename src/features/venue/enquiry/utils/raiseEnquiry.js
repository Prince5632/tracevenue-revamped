import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/components/feedback";
import { updateJob, createJob } from "@/features/venue/services/jobService";

export const useRaiseEnquiry = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const raiseEnquiry = async (jobName, jobData, jobId) => {
        try {
            if (!jobName?.trim()) {
                showToast({ type: "info", message: "Enquiry title is required" });
                return;
            }

            const payload = {
                ...jobData,
                name: jobName,
                status: "Active", // user is logged in if this is called
            };

            let response;
            if (jobId) {
                response = await updateJob(jobId, payload);
            } else {
                response = await createJob(payload);
            }

            // Response handling - adapt based on actual API response structure
            const newJobId = response?.data?._id || response?._id || jobId;

            showToast({ type: "success", message: "Enquiry raised successfully." });

            navigate(`/service/venues/enquiry/details/${newJobId}`, {
                state: {
                    from: "/service/venues/enquiry/active",
                    currentStepName: "Quotations",
                    activeTab: "all",
                },
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            showToast({ type: "error", message: errorMessage });
        }
    };

    return { raiseEnquiry };
};
