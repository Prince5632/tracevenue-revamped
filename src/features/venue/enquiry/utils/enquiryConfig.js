
const STEP_DEFINITIONS = {
    location: {
        id: 'location',
        title: 'Specify the Location',
        shortTitle: 'Location',
        shortDescription: "Where would you like to host your event?",
        description: 'Tell us where you want to host your event in Mohali, Chandigarh, or Panchkula',
        componentKey: 'Location'
    },
    service_type: {
        id: 'service_type',
        title: 'Specify the service type',
        shortTitle: 'Service Type',
        shortDescription: "Tell us which service you’re looking for",
        description: 'Choose whether you need only a venue, only catering, or a complete event solution',
        componentKey: 'ServiceType'
    },
    event_type: {
        id: 'event_type',
        title: 'Event Type',
        shortTitle: 'Event Type',
        shortDescription: "Select the type of event you're planning",
        description: "Select whether it's a wedding, birthday, corporate meet, or any other celebration",
        componentKey: 'EventType'
    },
    gathering_budget: {
        id: 'gathering_budget',
        title: 'Specify the gathering',
        shortTitle: 'Gathering & Budget',
        shortDescription: "Tell us about your expected guests and budget",
        description: 'We can suggest the right venues & catering options that fit your guests and stay within budget',
        componentKey: 'GatheringBudget'
    },
    event_date: {
        id: 'event_date',
        title: 'Specify the event date',
        shortTitle: 'Event Date & Time',
        shortDescription: "Pick your preferred dates and times",
        description: 'Select your preferred date and add a few alternate dates so we can lock in the best venues and caterers available',
        componentKey: 'EventDate'
    },
    food_preferences: {
        id: 'food_preferences',
        title: 'Specify the food preferences',
        shortTitle: 'Food Preferences',
        shortDescription: "Share your food and dietary preferences",
        description: 'Choose pure veg or a mix of veg and non‑veg, and alcohol preferences to match you with suitable caterers or venues',
        componentKey: 'FoodPreferences'
    },
    discover_packages: {
        id: 'discover_packages',
        title: 'Discover Packages',
        shortTitle: 'Discover Packages',
        shortDescription: "Here are some packages we’ve curated for you",
        description: 'Here are some packages we’ve curated for you',
        componentKey: 'DiscoverPackages'
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
