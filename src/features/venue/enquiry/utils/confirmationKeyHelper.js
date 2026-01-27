export const getDisplayName = (key) => {
  // Take only the part before the dot, if it exists
  const mainKey = key.split(".")[0];

  const keyDisplayNames = {
    "allService": "services",
    "availableEventTypes": "event type",
    "city": "city",
    "countData": "menu items",
    "cuisineOptions": "cuisine",
    "dietaryRequirements": "food preferences",
    "direction": "direction",
    "distance": "radius",
    "estimatedMaxBudget": "maximum estimated budget",
    "estimatedMinBudget": "minimum estimated budget",
    "formattedSelectedDates": "selected dates",
    "initialCategories": "categories",
    "jobTitle": "job title",
    "locationPermission": "location permission",
    "matchedResponse": "matched response",
    "matchedVenues": "matched venues",
    "maxBudgetValue": "maximum budget value",
    "minBudgetValue": "minimum budget value",
    "originalCountData": "original count data",
    "recentDistance": "recent distance",
    "recentSelectedCities": "selected cities",
    "selectedCard": "package",
    "selectedCities": "location",
    "selectedCuisineCombo": "cuisine combination",
    "selectedCuisines": "cuisines",
    "selectedDates": "dates",
    "selectedEventType": "event type",
    "selectedPeopleRange": "gathering size",
    "serviceType": "service type",
    "services": "services",
    "userLocation": "user location",
    "variants": "variants",
    "yourBudget": "your budget"
  };

  return keyDisplayNames[mainKey] || mainKey.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};
