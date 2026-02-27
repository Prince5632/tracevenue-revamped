import { API } from "@shared/services";

const venueService = {
  fetchVenues: async (data) => {
    try {
      const response = await API.post(
        `/api/v1/traceVenue/venues/by-location`,
        data
      );
      return response.data;
    } catch (error) {
      return error.response?.data || "Failed to fetch venues.";
    }
  },
  sendInvites: async (data) => {
    try {
      const response = await API.post(
        `/api/v1/traceVenue/jobs/${data?.jobId}/invite-vendors/`,
        data
      );
      return response.data;
    } catch (error) {
      return (
        error.response?.data.message ||
        "Failed to send invitations. Please try again."
      );
    }
  },
  fetchRestaurantById: async (restaurantId) => {
    try {
      const response = await API.get(`/restaurants/${restaurantId}/users`);
      return response.data;
    } catch (error) {
      return error.response?.data || "Failed to fetch restaurant details.";
    }
  },
};

export default venueService;
