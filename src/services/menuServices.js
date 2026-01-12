import API from "./API";

const menuService = {
  searchMenu: async ({searchText, vegOnly}) => {
    try {
      const response = await API.post("/api/v1/traceVenue/masterMenu/search", {
        searchText,
        vegOnly,
      });
      return response.data;
    } catch (error) {
      return console.log(error.response?.data || "Failed to fetch menu.");
    }
  },
  fetchMenu: async (data) => {
    try {
      const response = await API.post(
        "/api/v1/traceVenue/masterMenu/countData",
        data
      );
      return response.data;
    } catch (error) {
      return console.log(error.response?.data || "Failed to fetch menu data.");
    }
  },
  fetchMenuCountByIds: async (data) => {
    try {
      const response = await API.post(
        "/api/v1/traceVenue/masterMenu/countByIds",
        data
      );
      return response.data;
    } catch (error) {
      return console.log(
        error.response?.data || "Failed to fetch menu by ids."
      );
    }
  },
};

export default menuService;
