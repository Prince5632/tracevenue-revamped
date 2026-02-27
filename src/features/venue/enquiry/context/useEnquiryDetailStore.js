import { create } from "zustand";
import { fetchEnquiry } from "@/features/venue/services/EnquiryService";
import venueService from "@/features/venue/services/venueServices";

const useEnquiryDetailStore = create((set, get) => ({
  enquiryDetail: null,
  variants: [],
  isLoading: false,
  error: null,

  // ── Invite-tab venue state ──────────────────────────────────────
  venues: [],
  venuesJobId: null,      // which jobId the venues were fetched for
  venuesLoading: false,
  venuesError: null,
  invitedVenueIds: {},    // { [venueId]: 'sending' | 'sent' | 'error' }

  // ── Restaurant detail (for modal) ───────────────────────────────
  restaurantDetail: null,
  restaurantDetailId: null,
  restaurantDetailLoading: false,
  restaurantDetailError: null,

  // ── Enquiry detail ──────────────────────────────────────────────
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

  // ── Fetch Restaurant Detail (for modal) ─────────────────────────
  fetchRestaurantDetail: async (restaurantId) => {
    if (!restaurantId) return;
    set({ restaurantDetailLoading: true, restaurantDetailError: null, restaurantDetailId: restaurantId });
    try {
      const data = await venueService.fetchRestaurantById(restaurantId);
      set({
        restaurantDetail: data?.data || data,
        restaurantDetailLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch restaurant detail:", error);
      set({ restaurantDetailError: error, restaurantDetailLoading: false });
    }
  },

  clearRestaurantDetail: () =>
    set({
      restaurantDetail: null,
      restaurantDetailId: null,
      restaurantDetailLoading: false,
      restaurantDetailError: null,
    }),

  clearEnquiryDetail: () =>
    set({
      enquiryDetail: null,
      variants: [],
      isLoading: false,
      error: null,
      venues: [],
      venuesJobId: null,
      venuesLoading: false,
      venuesError: null,
      invitedVenueIds: {},
    }),

  // ── Fetch venues for Invite tab (cached per jobId) ─────────────
  fetchVenuesForJob: async (jobId, enquiryDetail) => {
    if (!jobId) return;
    const { venuesJobId, venuesLoading } = get();

    // Skip: already fetched or currently loading for this job
    if (venuesJobId === jobId || venuesLoading) return;

    const city = enquiryDetail?.selectedCities?.[0];
    const latitude =
      enquiryDetail?.location?.latitude || city?.latitude;
    const longitude =
      enquiryDetail?.location?.longitude || city?.longitude;

    if (!latitude || !longitude) return;

    set({ venuesLoading: true, venuesError: null });
    try {
      const payload = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        radius: Number(enquiryDetail?.radius || 10),
        serviceType: enquiryDetail?.serviceType || "venue",
      };
      const data = await venueService.fetchVenues(payload);
      const list = data?.data || data?.venues || data || [];
      set({
        venues: Array.isArray(list) ? list : [],
        venuesJobId: jobId,
        venuesLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch venues:", err);
      set({ venuesError: err, venuesLoading: false });
    }
  },

  // ── Send invite to a venue ─────────────────────────────────────
  sendInvite: async (venueId, jobId) => {
    if (!venueId || !jobId) return;
    set((state) => ({
      invitedVenueIds: { ...state.invitedVenueIds, [venueId]: "sending" },
    }));
    try {
      await venueService.sendInvites({ jobId, venueIds: [venueId] });
      set((state) => ({
        invitedVenueIds: { ...state.invitedVenueIds, [venueId]: "sent" },
      }));
    } catch (err) {
      console.error("Failed to send invite:", err);
      set((state) => ({
        invitedVenueIds: { ...state.invitedVenueIds, [venueId]: "error" },
      }));
    }
  },
}));

export default useEnquiryDetailStore;
