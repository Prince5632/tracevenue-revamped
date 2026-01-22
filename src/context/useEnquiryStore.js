import { create } from 'zustand';

const useEnquiryStore = create((set) => ({
  formData: {
    locations: "",
    radius: 20,
    latitude: "",
    longitude: "",
    serviceType: null,
    selectedEventType: null,
    selectedPeopleRange: null,
    minBudgetValue: null,
    maxBudgetValue: null,
    budgetType: null,
    selectedDates: [],
    dietaryRequirements: []
  },
  completedSteps: [],

  // Actions
  setFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),

  updateFormData: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value }
  })),

  setCompletedSteps: (steps) => set({ completedSteps: steps }),

  addCompletedStep: (stepId) => set((state) => {
    if (state.completedSteps.includes(stepId)) return state;
    return { completedSteps: [...state.completedSteps, stepId] };
  }),

  resetStore: () => set({
    formData: {
      locations: "",
      radius: 20,
      latitude: "",
      longitude: "",
      serviceType: null,
      selectedEventType: null,
      selectedPeopleRange: null,
      minBudgetValue: null,
      maxBudgetValue: null,
      budgetType: null,
      selectedDates: [],
      dietaryRequirements: []
    },
    completedSteps: []
  })
}));

export default useEnquiryStore;
