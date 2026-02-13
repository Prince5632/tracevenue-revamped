const BASE_LOCATION = {
  name: "",
  city: "",
  latitude: "",
  longitude: "",
  radius: 20,
};

export const EMPTY_ENQUIRY_FORM = {
  // Location context
  locations: "",
  latitude: "",
  longitude: "",
  radius: BASE_LOCATION.radius,
  selectedCities: [],
  location: null,

  // Path-based selectors
  serviceType: null,
  selectedEventType: null,

  // Gathering & budget
  selectedPeopleRange: null,
  minBudgetValue: null,
  maxBudgetValue: null,
  budgetType: null,
  yourBudget: { min: null, max: null },

  // Scheduling
  selectedDates: [],
  alternateDates: [],

  // Preferences
  dietaryRequirements: [],
  vegOnly: null,
  alcoholic: null,
};

export const createEmptyForm = () => ({
  ...EMPTY_ENQUIRY_FORM,
  selectedCities: [],
  selectedDates: [],
  alternateDates: [],
  dietaryRequirements: [],
  yourBudget: { ...EMPTY_ENQUIRY_FORM.yourBudget },
});
