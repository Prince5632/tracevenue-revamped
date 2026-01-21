// useRaiseEnquiry.js
import { useDispatch, useSelector } from "react-redux";
// import { createJob, raiseEnquiryAction, updateJob } from "@/redux/actions/jobActions"; // Redux not set up
// import { transformMenuData } from "@/utils/menuTranformation";
// import { selectIsUserLogged, selectUser } from "@/redux/slices/userSlice"; 
// import { useFormStore } from "@/hooks/useFormStore";
import { useNavigate } from "react-router-dom";
// import { useLogin } from "@/hooks/useLogin";
import { useToast } from "@shared/components/feedback";

export const useRaiseEnquiry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsUserLogged);
    const {
        getValue,
        setIndependentValue,
        removeAllExcept,
        removePermanentKeys,
    } = useFormStore();
    const { toggleLogin } = useLogin();
    const { showInfoToast, showErrorToast, showSuccessToast } = useToast();

    const raiseEnquiry = async (jobTitle = "") => {
        try {
            const userId = userDetails?._id;

            const jobName = getValue("jobTitle") || jobTitle;

            if (!jobName?.trim()) {
                showInfoToast("Enquiry title is required", {
                    toastId: "job_title_required",
                });
                return;
            }

            const tranformData = transformMenuData(getValue("countData"));

            const jobData = {
                name: jobName,
                description: "",
                status: isAuthenticated ? "Active" : "Draft",
                userId,
                eventType: getValue("selectedEventType")?.value,
                cuisines: getValue("selectedCuisines")?.map((c) => c?.value),
                budget: {
                    min: getValue("yourBudget")?.min || 0,
                    max: getValue("yourBudget")?.max || 0,
                },
                serviceType: getValue("serviceType"),
                services: getValue("services") || [],
                menuSections: getValue("countData") || [],
                numberOfGuests: getValue("selectedPeopleRange")?.value,
                peopleRange: {
                    minPeople: getValue("selectedPeopleRange")?.minPeople,
                    maxPeople: getValue("selectedPeopleRange")?.maxPeople,
                },
                isBudgetPerPerson: getValue("check"),
                budgetType: getValue("check") ? "lumpSum" : "perPerson",
                dietaryRequirements: getValue("dietaryRequirements") || [],
                location: getValue("userLocation"),
                selectedCities: getValue("selectedCities"),
                radius: parseInt(getValue("distance")),
                eventDate: getValue("eventDate"),
                timeSlot: getValue("selectedTimeSlot")?.value,
                matched: getValue("matchedResult") || [],
                cuisineApiData: {
                    selectedCard: getValue("selectedCard") || "",
                    matchedResponse: getValue("matchedResponse") || [],
                },
                recommendedResIds: getValue("recommendedResIds", "permanent") || getValue("recommendedResIds", "temporary") || useFormStore.getState()?.permanent?.recommendedResIds || useFormStore.getState()?.temporary?.recommendedResIds,
                perPersonBudget: {
                    min: getValue("check")
                        ? (getValue("yourBudget")?.max /
                            getValue("selectedPeopleRange")?.maxPeople) *
                        0.8
                        : getValue("yourBudget")?.min /
                        getValue("selectedPeopleRange")?.maxPeople,
                    max:
                        getValue("yourBudget")?.max /
                        getValue("selectedPeopleRange")?.maxPeople,
                },
                vegOnly: getValue("dietaryRequirements")?.includes("vegOnly")
                    ? true
                    : false,
                nonAlcoholicOnly: getValue("dietaryRequirements")?.includes(
                    "alcoholic"
                )
                    ? false
                    : true,
            };

            // if (!userId && !isAuthenticated) {
            // toggleLogin();
            //     return;
            // }

            const requiredFunction = getValue("jobId")
                ? raiseEnquiryAction({ updateData: jobData, id: getValue("jobId") })
                : createJob(jobData);

            const response = await dispatch(requiredFunction).unwrap();

            if (response?.message === "user logged out") {
                showErrorToast("User logged out, Please login again.", {
                    toastId: "job-error",
                });
                toggleLogin();
                return;
            }

            showSuccessToast("Enquiry created successfully.", {
                toastId: "job-success",
            });

            removeAllExcept([""]);
            setIndependentValue("showJobModal", false, "both");
            removePermanentKeys(["jobId"]);
            navigate(`/service/venues/enquiry/details/${response?.data?._id}`, {
                state: {
                    from: "/service/venues/enquiry/active",
                    currentStepName: "Invite For Quote",
                    activeTab: "all",
                },
            });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred";
            showErrorToast(errorMessage, { toastId: "job-error" });
        }
    };

    return { raiseEnquiry };
};
