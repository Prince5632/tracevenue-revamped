import { API } from "@shared/services";

/**
 * Save clubbed cuisine data to the backend
 * @param {Array} sortedCuisineCombinations - array of clubbed cuisine objects
 * @returns {Promise} API response
 */
export const saveClubbedData = async (sortedCuisineCombinations) => {
  try {
    const response = await API.post("/api/v1/tracevenue/clubbedPackage/save", {
      data: sortedCuisineCombinations,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error saving clubbed cuisine data:", error);
    throw error.response?.data || error;
  }
};

/**
 * Fetch all saved clubbed cuisine data
 * @returns {Promise} List of clubbed cuisine documents
 */
export const getAllClubbedCuisines = async () => {
  try {
    const response = await API.get("/api/clubbed/all");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching all clubbed cuisines:", error);
    throw error.response?.data || error;
  }
};

/**
 * Fetch a specific clubbed cuisine document by ID
 * @param {string} id - Document ID
 * @returns {Promise} Single clubbed cuisine document
 */
export const getClubbedCuisineById = async (id) => {
  try {
    const response = await API.get(`/api/v1/tracevenue/clubbedPackage/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching clubbed cuisine (ID: ${id}):`, error);
    throw error.response?.data || error;
  }
};
