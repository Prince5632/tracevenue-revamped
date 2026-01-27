
const STEP_DEFINITIONS = {
    location: {
        id: 'location',
        title: 'Location',
        description: 'Where would you like to host your event?',
        componentKey: 'Location'
    },
    service_type: {
        id: 'service_type',
        title: 'Specify the service type',
        description: 'Tell us which service you’re looking for',
        componentKey: 'ServiceType'
    },
    event_type: {
        id: 'event_type',
        title: 'Event Type',
        description: "Select the type of event you're planning",
        componentKey: 'EventType'
    },
    gathering_budget: {
        id: 'gathering_budget',
        title: 'Gathering & Budget',
        description: 'Tell us about your expected guests and budget',
        componentKey: 'GatheringBudget'
    },
    event_date: {
        id: 'event_date',
        title: 'Event Date',
        description: 'Pick your preferred dates and times',
        componentKey: 'EventDate'
    },
    food_preferences: {
        id: 'food_preferences',
        title: 'Specify the food preferences',
        description: 'Veg & Non-Veg',
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
