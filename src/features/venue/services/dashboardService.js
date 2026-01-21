import { API } from "@shared/services";

const dashboardServices = {
    getDashboardData: async () => {
        try {
            // Get token from cookies

            const response = await API.get(
                "api/v1/traceVenue/jobs/dashboard"
            );
            return response.data;
        } catch (err) {
            console.error("Dashboard API Error:", err);
            throw err;
        }
    },
};

export default dashboardServices;
