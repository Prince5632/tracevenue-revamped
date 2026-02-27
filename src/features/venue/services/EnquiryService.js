import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

/**
 * Fetch detailed job/enquiry data by job ID
 * @param {string} jobId
 * @returns {Promise<Object>} Job detail response
 */
export const fetchEnquiry = async (jobId) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/traceVenue/jobs/user/${jobId}/`,
    { withCredentials: true }
  );
  return response.data;
};
