import { create } from "zustand";
import { fetchEnquiry } from "@/features/venue/services/EnquiryService";

const useEnquiryDetailStore = create((set, get) => ({
  enquiryDetail: null,
  variants: [],
  isLoading: false,
  error: null,

  fetchEnquiryDetail: async (enquiryId) => {
    if (!enquiryId) return;
    const { isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const data = await fetchEnquiry(enquiryId);
      set({
        enquiryDetail: data?.data || data,
        variants: data?.data?.variants || data?.variants || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch enquiry detail:", error);
      set({ error, isLoading: false });
    }
  },

  clearEnquiryDetail: () =>
    set({
      enquiryDetail: null,
      variants: [],
      isLoading: false,
      error: null,
    }),
}));

export default useEnquiryDetailStore;
