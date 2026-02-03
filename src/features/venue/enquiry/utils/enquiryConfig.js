
const STEP_DEFINITIONS = {
    location: {
        id: 'location',
        title: 'Specify the Location',
        description: 'Tell us where you want to host your event in Mohali, Chandigarh, or Panchkula',
        componentKey: 'Location'
    },
    service_type: {
        id: 'service_type',
        title: 'Specify the service type',
        description: 'Choose whether you need only a venue, only catering, or a complete event solution',
        componentKey: 'ServiceType'
    },
    event_type: {
        id: 'event_type',
        title: 'Event Type',
        description: "Select whether it's a wedding, birthday, corporate meet, or any other celebration",
        componentKey: 'EventType'
    },
    gathering_budget: {
        id: 'gathering_budget',
        title: 'Specify the gathering & budget',
        description: 'We can suggest the right venues & catering options that fit your guests and stay within budget',
        componentKey: 'GatheringBudget'
    },
    event_date: {
        id: 'event_date',
        title: 'Specify the event date',
        description: 'Select your preferred date and add a few alternate dates so we can lock in the best venues and caterers available',
        componentKey: 'EventDate'
    },
    food_preferences: {
        id: 'food_preferences',
        title: 'Specify the food preferences',
        description: 'Choose pure veg or a mix of veg and non‑veg, and alcohol preferences to match you with suitable caterers or venues',
        componentKey: 'FoodPreferences'
    },
};

export const getEnquirySteps = () => {
    const stepsEnv = import.meta.env.VITE_ENQUIRY_STEPS || '';
    const stepKeys = stepsEnv.split(',').filter(key => key && STEP_DEFINITIONS[key.trim()]);

    return stepKeys.map((key, index) => ({
        ...STEP_DEFINITIONS[key.trim()],
        stepNumber: index + 1
    }));
};
