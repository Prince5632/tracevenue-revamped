import { API } from "@/shared";

// api to fetch cuisine combination using data filled from enquiry steps
export const fetchCuisineCombinations = async (formData) => {
    try {
        const cleanedFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => {
                // remove null or undefined
                if (value === null || value === undefined) return false;

                // remove empty string
                if (typeof value === "string" && value.trim() === "") return false;

                // remove empty array
                if (Array.isArray(value) && value.length === 0) return false;

                return true;
            })
        );

        const response = await API.post(
            `/analysis/cuisine-analysis`,
            cleanedFormData
        );
        return response;
    } catch (error) {
        console.error("Error while fetching cuisine combinations", error);
    }
};



