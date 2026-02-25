import { API } from "@shared/services";

/**
 * Create a new draft job
 * @param {Object} jobData - Job payload
 * @returns {Promise} API response with jobId
 */
export const createJob = async (jobData) => {
    try {
        const response = await API.post("/api/v1/traceVenue/jobs", jobData);
        return response.data;
    } catch (error) {
        console.error("❌ Error creating job:", error);
        throw error.response?.data || error;
    }
};

/**
 * Update an existing draft job
 * @param {string} id - Job ID
 * @param {Object} jobData - Updated job payload
 * @returns {Promise} API response
 */
export const updateJob = async (id, jobData) => {
    try {
        const response = await API.put(`/api/v1/traceVenue/jobs/${id}`, jobData);
        return response.data;
    } catch (error) {
        console.error(`❌ Error updating job (ID: ${id}):`, error);
        throw error.response?.data || error;
    }
};

/**
 * Check job status (Draft/Active)
 * @param {string} id - Job ID
 * @returns {Promise} Job status data
 */
export const checkJobStatus = async (id) => {
    try {
        const response = await API.get(`/api/v1/traceVenue/jobs/status/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error checking job status (ID: ${id}):`, error);
        throw error.response?.data || error;
    }
};
