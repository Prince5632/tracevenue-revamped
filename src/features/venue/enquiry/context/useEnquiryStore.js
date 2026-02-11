import { create } from "zustand";
import { createEmptyForm } from "@/features/venue/enquiry/constants/formDefaults";

const buildInitialForm = () => createEmptyForm();

const useEnquiryStore = create((set) => ({
  formData: buildInitialForm(),

  // Runtime flags (UI + API)
  issueFactor: null,
  suggestionMessage: null,
  isApiLoading: false,

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

  clearValidationFeedback: () =>
    set({
      issueFactor: null,
      suggestionMessage: null,
    }),
}));

export default useEnquiryStore;
