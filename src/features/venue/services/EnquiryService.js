import { API } from "@shared/services";

/**
 * Fetch detailed enquiry data by enquiry ID
 * @param {string} enquiryId
 * @returns {Promise<Object>} Enquiry detail response
 */
export const fetchEnquiry = async (enquiryId) => {
  try {
    const response = await API.get(`/api/v1/traceVenue/jobs/${enquiryId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch enquiry detail:", error);
    throw error.response?.data || error;
  }
};
