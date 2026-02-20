import { create } from "zustand";
import { fetchJobDetail as fetchJobDetailAPI } from "@/features/venue/services/jobDetailService";

const useJobDetailStore = create((set, get) => ({
  jobDetail: null,
  variants: [],
  isLoading: false,
  error: null,

  fetchJobDetail: async (jobId) => {
    if (!jobId) return;
    const { isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const data = await fetchJobDetailAPI(jobId);
      console.log("Job Detail API Response:", data);
      set({
        jobDetail: data?.data || data,
        variants: data?.data?.variants || data?.variants || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch job detail:", error);
      set({ error, isLoading: false });
    }
  },

  clearJobDetail: () =>
    set({
      jobDetail: null,
      variants: [],
      isLoading: false,
      error: null,
    }),
}));

export default useJobDetailStore;
