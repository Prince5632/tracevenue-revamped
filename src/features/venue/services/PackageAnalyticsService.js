import { API } from "@shared/services";

const packageAnalyticsService = {
  getpackageAnalyticsData: async (data) => {
    try {
      const response = await API.post(
        `/api/v1/traceVenue/variant/filteredVariants`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default packageAnalyticsService;
