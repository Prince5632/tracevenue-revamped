import { useEffect, useRef } from "react";
import { matchEventFromCatalog, isObjectId } from "@/features/venue/enquiry/utils/eventMatching";
import { validateWithCuisineApi } from "@/features/venue/services/enquiryValidationService";
import { STEP_IDS } from "@/features/venue/enquiry/constants/steps";
import useEnquiryStore from "@/features/venue/enquiry/context/useEnquiryStore";

/**
 * Handles event-type slug resolution and validation for two URL entry points:
 *
 * Case A — User lands on event_type step (slug not yet resolved to ObjectId):
 *   → Resolve slug → _id → call cuisine-analysis
 *   → Pass: advance to gathering_budget
 *   → Fail: show error, stay on event_type
 *
 * Case B — User lands on gathering_budget step with an unresolved event slug in URL:
 *   (e.g. /Chandigarh.../venue/charity-run → wizard resolves to step 4)
 *   → Resolve slug → _id → call cuisine-analysis
 *   → Pass: stay on gathering_budget (no navigation needed)
 *   → Fail: show error and navigate BACK to event_type step
 *
 * setIsResolvingEventSlug is toggled true/false around the async flow to drive shimmer UI.
 */
const useUrlEventTypeResolution = (
    { currentStep, formData, eventOptions, eventOptionsLoading, steps },
    { updateFormData, setIssueFactor, setSuggestionMessage, setIsApiLoading, setActiveStepIndex, commitAnswersThroughStep, boundedStepIndex, setIsResolvingEventSlug }
) => {
    const hasResolvedRef = useRef(false);
    const lastResolvedSlugRef = useRef(null);

    useEffect(() => {
        const stepId = currentStep?.id;

        const isEventTypeStep = stepId === STEP_IDS.EVENT_TYPE;
        const isGatheringBudgetStep = stepId === STEP_IDS.GATHERING_BUDGET;

        if (!isEventTypeStep && !isGatheringBudgetStep) {
            hasResolvedRef.current = false;
            lastResolvedSlugRef.current = null;
            return;
        }

        if (eventOptionsLoading || !eventOptions?.length) return;

        const selected = formData?.selectedEventType;
        if (!selected) return;

        const selectedValue = selected?.value || selected?.id || selected?.slug;
        if (!selectedValue) return;

        // If already a real ObjectId, no resolution needed
        if (isObjectId(selectedValue)) return;

        // Don't re-run for the same slug
        if (hasResolvedRef.current && lastResolvedSlugRef.current === selectedValue) return;

        const run = async () => {
            hasResolvedRef.current = true;
            lastResolvedSlugRef.current = selectedValue;

            // Show shimmer while resolving
            setIsResolvingEventSlug?.(true);

            // ── Step 1: Resolve slug → real event _id ────────────────────────────
            const match = matchEventFromCatalog(eventOptions, selected);
            if (!match?._id) {
                setIssueFactor(STEP_IDS.EVENT_TYPE);
                setSuggestionMessage(
                    "We couldn't find an event matching the link you followed. Please choose one below."
                );
                if (isGatheringBudgetStep) {
                    const eventTypeIndex = steps?.findIndex((s) => s.id === STEP_IDS.EVENT_TYPE);
                    if (eventTypeIndex >= 0) setActiveStepIndex(eventTypeIndex);
                }
                setIsResolvingEventSlug?.(false);
                return;
            }

            // Update formData with the resolved event (real ObjectId value)
            const resolvedEvent = {
                id: match._id,
                value: match._id,
                eventName: match.eventName || match.label,
                label: match.eventName || match.label,
                slug: Array.isArray(match.slug) ? match.slug[0] : match.slug,
            };
            updateFormData("selectedEventType", resolvedEvent);

            // ── Step 2+3: Cuisine-analysis (availability + package check) ─────────
            setIsApiLoading(true);
            try {
                const freshFormData = {
                    ...useEnquiryStore.getState().formData,
                    selectedEventType: resolvedEvent,
                };

                const result = await validateWithCuisineApi(STEP_IDS.EVENT_TYPE, freshFormData);

                if (!result?.ok) {
                    setIssueFactor(result?.issueFactor || STEP_IDS.EVENT_TYPE);
                    const parts = [];
                    if (result?.suggestions?.issue) parts.push(result.suggestions.issue);
                    if (result?.suggestions?.solution) parts.push(result.suggestions.solution);
                    setSuggestionMessage(
                        parts.join(" • ") ||
                        result?.message ||
                        "This event type is not available for your selection."
                    );

                    // Case B failure: navigate back to event_type step
                    if (isGatheringBudgetStep) {
                        const eventTypeIndex = steps?.findIndex((s) => s.id === STEP_IDS.EVENT_TYPE);
                        if (eventTypeIndex >= 0) setActiveStepIndex(eventTypeIndex);
                    }
                    return;
                }

                // ── All checks passed ─────────────────────────────────────────────
                if (isEventTypeStep) {
                    // Case A: advance to gathering_budget
                    commitAnswersThroughStep(boundedStepIndex);
                    setActiveStepIndex((prev) => prev + 1);
                }
                // Case B success: stay on gathering_budget
            } catch (err) {
                console.error("[useUrlEventTypeResolution] cuisine-analysis failed:", err);
                setSuggestionMessage("Something went wrong while validating. Please choose an event below.");
                if (isGatheringBudgetStep) {
                    const eventTypeIndex = steps?.findIndex((s) => s.id === STEP_IDS.EVENT_TYPE);
                    if (eventTypeIndex >= 0) setActiveStepIndex(eventTypeIndex);
                }
            } finally {
                setIsApiLoading(false);
                setIsResolvingEventSlug?.(false);
            }
        };

        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep?.id, eventOptionsLoading, eventOptions, formData?.selectedEventType]);
};

export default useUrlEventTypeResolution;
