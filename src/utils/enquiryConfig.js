
const STEP_DEFINITIONS = {
    location: {
        id: 'location',
        title: 'Location',
        description: 'Where is your event happening?',
        componentKey: 'Location'
    },
    service_type: {
        id: 'service_type',
        title: 'Service Type',
        description: 'What kind of service do you need?',
        componentKey: 'ServiceType'
    },
    event_type: {
        id: 'event_type',
        title: 'Event Type',
        description: 'What type of event are you planning?',
        componentKey: 'EventType'
    },
    gathering_budget: {
        id: 'gathering_budget',
        title: 'Gathering & Budget',
        description: 'Estimated guests and budget.',
        componentKey: 'GatheringBudget'
    },
    event_date: {
        id: 'event_date',
        title: 'Event Date',
        description: 'When is your event?',
        componentKey: 'EventDate'
    },
    food_preferences: {
        id: 'food_preferences',
        title: 'Specify the food preferences',
        description: 'Choose pure veg or a mix of veg and non-veg, and alcohol preferences to match you with suitable caterers or venues',
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
