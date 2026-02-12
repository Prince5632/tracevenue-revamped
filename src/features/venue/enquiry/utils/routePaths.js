// Route path constants
export const STEP_ROUTES = [
    'location',       // Step 1
    'service-type',   // Step 2 
    'event-type',     // Step 3
    'gathering',      // Step 4
    'event-date',     // Step 5
    'food-preferences' // Step 6
];

// URL param names matching route segments
export const URL_PARAMS = {
    LOCATION: 'location',
    SERVICE_TYPE: 'serviceType',
    EVENT_TYPE: 'eventType',
    GATHERING: 'gatheringAndBudget',
    EVENT_DATE: 'eventDate',
    FOOD: 'foodPreference'
};

// Predefined location shortcuts (lowercase keys for URL matching)
export const PREDEFINED_LOCATIONS = {
    chandigarh: {
        latitude: 30.7333113,
        longitude: 76.7794179,
        address: 'Chandigarh, India',
        name: 'Chandigarh'
    },
    mohali: {
        latitude: 30.7046486,
        longitude: 76.71787259999999,
        address: 'Mohali, Punjab, India',
        name: 'Mohali'
    },
    panchkula: {
        latitude: 30.6942091,
        longitude: 76.860565,
        address: 'Panchkula, Haryana, India',
        name: 'Panchkula'
    },
    zirakpur: {
        latitude: 30.64251,
        longitude: 76.81729,
        address: 'Zirakpur, Punjab, India',
        name: 'Zirakpur'
    },
};

// Service type options
export const SERVICE_OPTIONS = [
    {
        id: 'venue',
        name: 'Venue',
        urlSlug: 'venue',
        available: true,
    },
    {
        id: 'catering',
        name: 'Catering',
        urlSlug: 'catering',
        available: true,
    },
];

// Step names for display
export const STEP_NAMES = [
    'Location',
    'Service Type',
    'Event Type',
    'Gathering & Budget',
    'Event Date',
    'Food Preferences',
    'Discover Packages',
];
