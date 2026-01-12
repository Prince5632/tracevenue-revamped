import axios from "axios";
import Cookies from "js-cookie";
import { getGlobalDispatch } from "../utils/dispatchBridge";
import { logoutUser } from "../redux/slices/userSlice";
import { globalLoginToggle } from "../utils/loginBridge";
import { globalAccessDeniedToggle } from "../utils/accessDeniedBridge";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
const plainAxios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

API.interceptors.request.use(
    async (config) => {
        // Note: Token is stored as httpOnly cookie, so it's sent automatically
        // via withCredentials: true. No need to manually set Authorization header.

        config.headers["Content-Type"] = "application/json";
        config.headers.Accept = "application/json";

        // ✅ Add timestamp to all GET requests
        if (config.method === "get") {
            const timestamp = Date.now();
            config.params = {
                ...(config.params || {}),
                _ts: timestamp,
            };
        }

        return config;
    }
    // ,(error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if this request should skip refresh and go directly to login
        if (originalRequest?.skipAuthRetry) {
            if (error.response?.status === 401) {
                globalLoginToggle();
                return Promise.reject(error);
            } else if (error.response?.status === 403) {
                globalAccessDeniedToggle();
                return Promise.reject(error);
            }
        }

        // Handle 401/403 errors - token expired or missing
        if (
            (error.response?.status === 401 ||
                error.response?.status === 403) &&
            !originalRequest?._retry
        ) {
            originalRequest._retry = true;
            try {
                // Try to refresh the token
                await plainAxios.get("/users/refresh-token");
                // If refresh successful, retry the original request silently
                return API(originalRequest);
            } catch (refreshError) {
                // Refresh failed - token is invalid or missing
                // Clear cookies and show login
                try {
                    await plainAxios.get("/users/log-out", {
                        withCredentials: true,
                    });
                } catch (logoutError) {
                    // Ignore logout errors
                }
                // Show modal based on error status
                if (error.response?.status === 401) {
                    globalLoginToggle();
                } else if (error.response?.status === 403) {
                    globalAccessDeniedToggle();
                }
                return Promise.reject(error);
            }
        }

        // Return the Axios error, not the config!
        return Promise.reject(error);
    }
);

export default API;
