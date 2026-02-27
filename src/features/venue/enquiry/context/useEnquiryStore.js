import { create } from "zustand";
import { createEmptyForm } from "@/features/venue/enquiry/constants/formDefaults";
import { fetchEventTypes } from "@/features/venue/services/eventTypesService";

const buildInitialForm = () => createEmptyForm();

const useEnquiryStore = create((set, get) => ({
  formData: buildInitialForm(),

  // Runtime flags (UI + API)
  issueFactor: null,
  suggestionMessage: null,
  isApiLoading: false,
  eventOptions: [],
  eventOptionsLoading: false,

  // Draft job & cuisine data (set after step 6)
  jobId: null,
  cuisineCombinationsData: null,
  clubbedPackageId: null,

  // === Form Data Actions ===
  hydrateFromUrl: (nextData) =>
    set({
      formData: nextData ? { ...nextData } : buildInitialForm(),
    }),

  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  updateFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  resetForm: () =>
    set({
      formData: buildInitialForm(),
    }),

  // === UI Feedback ===
  setIssueFactor: (factor) => set({ issueFactor: factor }),
  setSuggestionMessage: (message) => set({ suggestionMessage: message }),
  setIsApiLoading: (loading) => set({ isApiLoading: loading }),
  setEventOptions: (options = []) =>
    set({
      eventOptions: Array.isArray(options) ? options : [],
    }),
  setEventOptionsLoading: (loading) =>
    set({
      eventOptionsLoading: Boolean(loading),
    }),
  loadEventOptions: async () => {
    const { eventOptionsLoading } = get();
    if (eventOptionsLoading) return;
    try {
      set({ eventOptionsLoading: true });
      const events = await fetchEventTypes();
      set({
        eventOptions: events,
        eventOptionsLoading: false,
      });
    } catch (error) {
      console.error("Unable to fetch event catalog", error);
      set({ eventOptionsLoading: false });
    }
  },

  // === Draft Job & Cuisine Setters ===
  setJobId: (id) => set({ jobId: id }),
  setCuisineCombinationsData: (data) => set({ cuisineCombinationsData: data }),
  setClubbedPackageId: (id) => set({ clubbedPackageId: id }),

  /**
   * Call this when the user changes event type after a job was already created.
   * Clears the existing jobId (so next step-6 submission creates a *new* job),
   * and resets all form fields that come after the event type step.
   */
  resetJobData: () =>
    set((state) => ({
      jobId: null,
      cuisineCombinationsData: null,
      clubbedPackageId: null,
      formData: {
        ...state.formData,
        // Clear everything downstream of event type
        selectedPeopleRange: null,
        minBudgetValue: null,
        maxBudgetValue: null,
        budgetType: null,
        yourBudget: { min: null, max: null },
        selectedDates: [],
        alternateDates: [],
        dietaryRequirements: [],
        vegOnly: null,
        alcoholic: null,
        cuisineApiResponse: null,
      },
    })),

  clearValidationFeedback: () =>
    set({
      issueFactor: null,
      suggestionMessage: null,
    }),
}));

export default useEnquiryStore;
