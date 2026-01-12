import { stepRoutes } from "../constants";

export const getCurrentStepIndex = (pathName) => {
    // Find the matching route path in our array
    const routeIndex = stepRoutes.findIndex((route) =>
        pathName.includes(route)
    );
    return routeIndex !== -1 ? routeIndex : 0; // Default to first step if not found
};
