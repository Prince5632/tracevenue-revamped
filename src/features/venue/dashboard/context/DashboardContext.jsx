import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "@/features/auth/context/useAuthStore.jsx";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export const DashboardProvider = ({ children }) => {
  const { userId } = useAuth();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to get headers with token
  // Helper for axios config
  const getAxiosConfig = () => {
    return {
      withCredentials: true,
    };
  };

  const fetchDashboardStats = useCallback(async () => {
    if (!userId) return; // Wait for user ID

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}api/v1/traceVenue/jobs/dashboard`,
        getAxiosConfig(),
      );
      setDashboardStats(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Dashboard Stats Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchJobsByStatus = useCallback(
    async (status) => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${BASE_URL}api/v1/traceVenue/jobs/${userId}/my-jobs`,
          {
            params: {
              status,
              sortBy: "latest",
            },
            ...getAxiosConfig(),
          },
        );
        setJobs(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        console.error("Jobs Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [userId],
  );

  const value = {
    dashboardStats,
    jobs,
    isLoading,
    error,
    fetchDashboardStats,
    fetchJobsByStatus,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
