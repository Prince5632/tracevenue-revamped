import { PREDEFINED_LOCATIONS, SERVICE_OPTIONS } from './routePaths';

/**
 * Encode location data to URL segment
 * Uses predefined shortcut if available, otherwise full coordinates
 */
export const encodeLocationToUrl = (locationData, radius = 20) => {
    // Support both flat structure and legacy cities array
    let locationName, lat, lng, dist;

    if (locationData?.locations) {
        // New flat structure
        locationName = locationData.locations;
        lat = locationData.latitude;
        lng = locationData.longitude;
        dist = locationData.radius || radius;
    } else if (Array.isArray(locationData) && locationData.length > 0) {
        // Legacy array structure
        const city = locationData[0];
        locationName = city.name || city.address;
        lat = city.latitude;
        lng = city.longitude;
        dist = radius;
    } else {
        return null;
    }

    if (!locationName || !lat || !lng) return null;

    // Check for predefined location match
    const matchedKey = Object.keys(PREDEFINED_LOCATIONS).find(key => {
        const loc = PREDEFINED_LOCATIONS[key];
        return loc.latitude === lat && loc.longitude === lng;
    });

    if (matchedKey) return matchedKey;

    // Fallback to full coordinates format: address+lng+lat+distance
    const address = (locationName || '')
        .split(/[ ,/]+/)
        .filter(Boolean)
        .join('+');
    return `${address}+${lng}+${lat}+${dist}`;
};

/**
 * Decode URL segment to location data
 */
export const decodeLocationFromUrl = (urlSegment) => {
    if (!urlSegment) return null;

    const locationKey = urlSegment.toLowerCase();

    // Check predefined locations first
    if (PREDEFINED_LOCATIONS[locationKey]) {
        const loc = PREDEFINED_LOCATIONS[locationKey];
        return {
            name: loc.address,
            address: loc.address,
            latitude: loc.latitude,
            longitude: loc.longitude,
            distance: 20, // Default distance for predefined
            isPredefined: true
        };
    }

    // Parse full coordinates format: address+lng+lat+distance
    const parts = urlSegment.split('+');
    if (parts.length < 4) return null;

    const distance = parseInt(parts.pop());
    const lat = parseFloat(parts.pop());
    const lng = parseFloat(parts.pop());
    const address = parts.join(' ');

    if (isNaN(lat) || isNaN(lng)) return null;

    return {
        name: address,
        address: address,
        latitude: lat,
        longitude: lng,
        distance: distance || 20,
        isPredefined: false
    };
};

/**
 * Encode service type to URL slug
 */
export const encodeServiceTypeToUrl = (serviceId) => {
    const service = SERVICE_OPTIONS.find(s => s.id === serviceId);
    return service?.urlSlug || serviceId;
};

/**
 * Decode service type from URL slug
 */
export const decodeServiceTypeFromUrl = (urlSlug) => {
    if (!urlSlug) return null;
    const service = SERVICE_OPTIONS.find(s =>
        s.urlSlug.toLowerCase() === urlSlug.toLowerCase()
    );
    return service?.id || null;
};

/**
 * Encode event type to kebab-case URL slug
 */
export const encodeEventTypeToUrl = (eventType) => {
    if (!eventType) return null;
    const name = eventType.eventName || eventType.label || eventType.name || '';
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
};

/**
 * Encode gathering & budget to URL segment
 * Format: minPeople+maxPeople+minBudget+maxBudget+type(pp|ls)
 */
export const encodeGatheringToUrl = (peopleRange, minBudget, maxBudget, budgetType) => {
    if (!peopleRange || !minBudget || !maxBudget) return null;
    const typeStr = budgetType === 'perPerson' ? 'pp' : 'ls';
    return `${peopleRange.minPeople}+${peopleRange.maxPeople}+${minBudget}+${maxBudget}+${typeStr}`;
};

/**
 * Decode gathering & budget from URL segment
 */
export const decodeGatheringFromUrl = (urlSegment) => {
    if (!urlSegment) return null;
    const parts = urlSegment.split('+');
    if (parts.length < 5) return null;

    return {
        peopleRange: {
            minPeople: parseInt(parts[0]),
            maxPeople: parseInt(parts[1])
        },
        minBudget: parseInt(parts[2]),
        maxBudget: parseInt(parts[3]),
        budgetType: parts[4] === 'pp' ? 'perPerson' : 'lumpSum'
    };
};

/**
 * Encode event dates to URL segment
 */
export const encodeDatesToUrl = (dates) => {
    if (!dates?.length) return null;

    return dates.map(d => {
        const dObj = new Date(d.date);
        const dateStr = dObj.toISOString();

        if (d.allDay) return `${dateStr}~allDay`;

        const sTime = d.startTime || '00:00';
        const eTime = d.endTime || '23:59';
        const startFull = new Date(`${d.date} ${sTime}`);
        const endFull = new Date(`${d.date} ${eTime}`);

        return `${startFull.toISOString()}~${endFull.toISOString()}`;
    }).join(',');
};

/**
 * Encode food preferences to URL segment
 */
export const encodeFoodPreferencesToUrl = (dietaryRequirements = []) => {
    const veg = dietaryRequirements.includes('vegOnly');
    const alc = dietaryRequirements.includes('alcoholic');
    return `vegOnly-${veg}+alcoholic-${alc}`;
};

/**
 * Build URL path for a given step index based on form data
 */
export const buildStepUrl = (stepIndex, formData) => {
    const {
        locations,
        radius,
        latitude,
        longitude,
        serviceType,
        selectedEventType,
        selectedPeopleRange,
        minBudgetValue,
        maxBudgetValue,
        budgetType,
        selectedDates,
        dietaryRequirements
    } = formData;

    if (stepIndex === 0) return '/';

    // Pass location data as an object for the encoder
    const locationData = locations ? { locations, radius, latitude, longitude } : null;
    const loc = encodeLocationToUrl(locationData, radius);
    if (!loc) return '/';
    if (stepIndex === 1) return `/${loc}`;

    const svc = encodeServiceTypeToUrl(serviceType);
    if (!svc) return `/${loc}`;
    if (stepIndex === 2) return `/${loc}/${svc}`;

    const evt = encodeEventTypeToUrl(selectedEventType);
    if (!evt) return `/${loc}/${svc}`;
    if (stepIndex === 3) return `/${loc}/${svc}/${evt}`;

    const gath = encodeGatheringToUrl(selectedPeopleRange, minBudgetValue, maxBudgetValue, budgetType);
    if (!gath) return `/${loc}/${svc}/${evt}`;
    if (stepIndex === 4) return `/${loc}/${svc}/${evt}/${gath}`;

    const dt = encodeDatesToUrl(selectedDates);
    if (!dt) return `/${loc}/${svc}/${evt}/${gath}`;
    if (stepIndex === 5) return `/${loc}/${svc}/${evt}/${gath}/${dt}`;

    const food = encodeFoodPreferencesToUrl(dietaryRequirements);
    if (stepIndex >= 6) return `/${loc}/${svc}/${evt}/${gath}/${dt}/${food}`;

    return '/';
};

/**
 * Calculate step index from URL params
 * URL params indicate COMPLETED steps, so we return the NEXT step to show
 * Example: /chandigarh/venue means location (step 0) and service (step 1) are complete
 *          so we show Event Type (step 2)
 */
export const getStepIndexFromParams = (params) => {
    const { location, serviceType, eventType, gatheringAndBudget, eventDate, foodPreference } = params;

    // Each param in URL means that step is COMPLETED, show the next step
    if (foodPreference) return 6;  // All 6 steps complete, show step 7 (Discover Packages)
    if (eventDate) return 5;       // Steps 0-4 complete, show Food Preferences (step 5)
    if (gatheringAndBudget) return 4; // Steps 0-3 complete, show Event Date (step 4)
    if (eventType) return 3;       // Steps 0-2 complete, show Gathering & Budget (step 3)
    if (serviceType) return 2;     // Steps 0-1 complete, show Event Type (step 2)
    if (location) return 1;        // Step 0 complete, show Service Type (step 1)
    return 0;                      // No params, show Location (step 0)
};
