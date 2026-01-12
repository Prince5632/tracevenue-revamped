export const firstStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (!values?.serviceType) {
        showInfoToast("Please select a service type.", {
            toastId: "service_type_required",
        });
        setMultipleIndependentValues({
            errorKey: "serviceType",
            errorValue: true,
        });
        return false;
    }
    return true;
};
export const secondStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (!values?.selectedEventType) {
        showInfoToast("Please select a event type.", {
            toastId: "event_type_required",
        });
        setMultipleIndependentValues({
            errorKey: "eventType",
            errorValue: true,
        });
        return false;
    }

    return true;
};
export const thirdStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (!values?.selectedCities?.length) {
        showInfoToast("Please select your preferred location.", {
            toastId: "atleast_one_city_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedCities",
            errorValue: true,
        });
        return false;
    }

    return true;
};
export const fourthStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.minPeople) {
        showInfoToast("Please select minimum people range", {
            toastId: "min_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.maxPeople) {
        showInfoToast("Please select maximum people range", {
            toastId: "max_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.yourBudget?.min || !values?.yourBudget?.max) {
        showInfoToast("Please enter your budget", {
            toastId: "budget_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }
    if (Number(values?.minBudgetValue) > Number(values?.maxBudgetValue)) {
        showInfoToast("Min budget should be less than max budget", {
            toastId: "budget_validation_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }

    return true;
};

export const fifthStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (!values?.selectedDates?.length) {
        showInfoToast("Please select event date.", {
            toastId: "dates_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedDates",
            errorValue: true,
        });
        return false;
    }

    const invalidTimeRange = values?.selectedDates?.some((item) => {
        if (item.allDay) return false;
        const [startH, startM] = item.startTime.split(":").map(Number);
        const [endH, endM] = item.endTime.split(":").map(Number);
        const diff = endH * 60 + endM - (startH * 60 + startM);
        return diff < 60;
    });

    if (invalidTimeRange) {
        showInfoToast(
            "End time must be at least 1 hour after start time for all dates.",
            {
                toastId: "invalid_time_range",
            }
        );
        return false;
    }

    return true;
};
export const sixthStepValidation = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (!values?.selectedCities?.length) {
        showInfoToast("Please select your preferred location.", {
            toastId: "atleast_one_city_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedCities",
            errorValue: true,
        });
        return false;
    }

    if (!values?.serviceType) {
        showInfoToast("Please select a service type.", {
            toastId: "service_type_required",
        });
        setMultipleIndependentValues({
            errorKey: "serviceType",
            errorValue: true,
        });
        return false;
    }
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.minPeople) {
        showInfoToast("Please select minimum people range", {
            toastId: "min_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.maxPeople) {
        showInfoToast("Please select maximum people range", {
            toastId: "max_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }

    if (!values?.yourBudget?.min || !values?.yourBudget?.max) {
        showInfoToast("Please enter your budget", {
            toastId: "budget_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }
    if (Number(values?.minBudgetValue) > Number(values?.maxBudgetValue)) {
        showInfoToast("Min budget should be less than max budget", {
            toastId: "budget_validation_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedDates?.length) {
        showInfoToast("Please select event date.", {
            toastId: "dates_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedDates",
            errorValue: true,
        });
        return false;
    }
    return true;
};

export const seventhStepValidations = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    if (values?.selectedCard === undefined || values?.selectedCard === null) {
        showInfoToast("Please choose a package.", {
            toastId: "card_required",
            
        });
        return false;
    }
    if (
        Array.isArray(values?.matchedResponse) &&
        values?.matchedResponse?.length === 0
    ) {
        showInfoToast("Data is unavailable for this step.", {
            toastId: "event_count_required",
        });
        return false;
    }
    if (!values?.countData) {
        showInfoToast("Data is unavailable for your selection.", {
            toastId: "event_count_required",
        });
        setMultipleIndependentValues({
            errorKey: "countData",
            errorValue: true,
        });
        return false;
    }
    if (Array.isArray(values?.countData) && values?.countData?.length === 0) {
        showInfoToast(
            "Please select at least one package or try to change it.",
            {
                toastId: "event_count_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "countData",
            errorValue: true,
        });
        return false;
    }
    return true;
};
export const eighthStepValidations = (
    values,
    showInfoToast = () => {},
    setMultipleIndependentValues = () => {}
) => {
    // if (!values?.searchQuery) {
    //   showInfoToast("Please search for an event.", {
    //     toastId: "search_required",
    //   });
    //   setMultipleIndependentValues({ errorKey: "searchQuery", errorValue: true });
    //   return false;
    // }
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.minPeople) {
        showInfoToast("Please select minimum people range", {
            toastId: "min_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedPeopleRange?.maxPeople) {
        showInfoToast("Please select maximum people range", {
            toastId: "max_people_range_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }
    if (
        Number(values?.selectedPeopleRange?.minPeople) >
        Number(values?.selectedPeopleRange?.maxPeople)
    ) {
        showInfoToast(
            "Min person length should be less than max person length",
            {
                toastId: "person_validation_required",
            }
        );
        setMultipleIndependentValues({
            errorKey: "selectedPeopleRange",
            errorValue: true,
        });
        return false;
    }

    if (!values?.yourBudget?.min || !values?.yourBudget?.max) {
        showInfoToast("Please enter your budget", {
            toastId: "budget_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }
    if (Number(values?.minBudgetValue) > Number(values?.maxBudgetValue)) {
        showInfoToast("Min budget should be less than max budget", {
            toastId: "budget_validation_required",
        });
        setMultipleIndependentValues({
            errorKey: "yourBudget",
            errorValue: true,
        });
        return false;
    }
    if (!values?.selectedCuisines?.length) {
        showInfoToast("Please select at least one cuisine.", {
            toastId: "cuisine_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedCuisines",
            errorValue: true,
        });
        return false;
    }

    if (!values?.selectedDates?.length) {
        showInfoToast("Please select event date.", {
            toastId: "dates_required",
        });
        setMultipleIndependentValues({
            errorKey: "selectedDates",
            errorValue: true,
        });
        return false;
    }
    if (!values?.countData) {
        showInfoToast("Data is unavailable for your selection.", {
            toastId: "event_count_required",
        });
        setMultipleIndependentValues({
            errorKey: "countData",
            errorValue: true,
        });
        return false;
    }
    if (Array.isArray(values?.countData) && values?.countData?.length === 0) {
        showInfoToast(
            "Please select at least one package or try to change it.",
            {
                toastId: "event_count_required",
                // autoClose: 300000,
            }
        );
        setMultipleIndependentValues({
            errorKey: "countData",
            errorValue: true,
        });
        return false;
    }
    return true;
};

export const shouldFetchData = ({ getValue = () => {} }) => {
    const selectedEventType = getValue("selectedEventType");
    const savedSelectedEventType = getValue(
        "savedSelectedEventType",
        "permanent"
    );
    const selectedCities = getValue("selectedCities");
    const savedCities = getValue("selectedCities", "permanent");
    const radius = getValue("distance");
    const savedRadius = getValue("distance", "permanent");
    const budgetCheck = getValue("check") ?? false;
    const savedBudgetCheck = getValue("check", "permanent") ?? false;
    const budgetType = budgetCheck ? "lumpSum" : "perPerson";
    const savedBudgetType = savedBudgetCheck ? "lumpSum" : "perPerson";
    const peopleRange = getValue("selectedPeopleRange");
    const savedSelectedPeopleRange = getValue(
        "selectedPeopleRange",
        "permanent"
    );
    const yourBudget = getValue("yourBudget");
    const savedYourBudget = getValue("yourBudget", "permanent");
    const dietaryRequirements = getValue("dietaryRequirements");

    if (!selectedEventType?.value) return false;

    return (
        !isEqual(selectedEventType?.value, savedSelectedEventType?.value) ||
        !isEqual(selectedCities, savedCities) ||
        !isEqual(radius, savedRadius) ||
        !isEqual(budgetType, savedBudgetType) ||
        !isEqual(peopleRange?.maxPeople, savedSelectedPeopleRange?.maxPeople) ||
        !isEqual(peopleRange?.minPeople, savedSelectedPeopleRange?.minPeople) ||
        !isEqual(yourBudget?.min, savedYourBudget?.min) ||
        !isEqual(yourBudget?.max, savedYourBudget?.max) ||
        !isEqual(
            dietaryRequirements?.length,
            getValue("dietaryRequirements", "permanent")?.length
        )
    );
};
