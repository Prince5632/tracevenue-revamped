import { useEffect, useRef } from "react";
import { matchEventFromCatalog, isObjectId } from "@/features/venue/enquiry/utils/eventMatching";
import { validateWithCuisineApi } from "@/features/venue/services/enquiryValidationService";
import { STEP_IDS } from "@/features/venue/enquiry/constants/steps";
import useEnquiryStore from "@/features/venue/enquiry/context/useEnquiryStore";

/**
 * Two responsibilities:
 *
 * 1. SLUG RESOLUTION (any step) — as soon as eventOptions loads, if
 *    selectedEventType.value is a slug string (not a real ObjectId), resolve
 *    it to the real _id from the API catalog and update formData. This ensures
 *    subsequent API calls always send a proper eventTypeId, even when the user
 *    lands directly on step 5/6 from a shared URL.
 *
 * 2. CUISINE-ANALYSIS VALIDATION (event_type OR gathering_budget only):
 *    Case A — event_type step: validate → advance to gathering_budget on pass,
 *             show error and stay on event_type on fail.
 *    Case B — gathering_budget step: validate → stay on gathering_budget on
 *             pass, show error and navigate back to event_type on fail.
 *
 * setIsResolvingEventSlug drives the shimmer overlay in Steps.jsx.
 */
const useUrlEventTypeResolution = (
    { currentStep, formData, eventOptions, eventOptionsLoading, steps },
    { updateFormData, setIssueFactor, setSuggestionMessage, setIsApiLoading, setActiveStepIndex, commitAnswersThroughStep, boundedStepIndex, setIsResolvingEventSlug }
) => {
    // Guards to avoid re-running for the same slug
    const hasResolvedSlugRef = useRef(false);
    const lastResolvedSlugRef = useRef(null);

    // Guard for cuisine-analysis flow (separate from slug resolution)
    const hasValidatedRef = useRef(false);

    // ── Part 1: Always resolve slug → ObjectId ──────────────────────────────
    useEffect(() => {
        if (eventOptionsLoading || !eventOptions?.length) return;

        const selected = formData?.selectedEventType;
        if (!selected) return;

        const selectedValue = selected?.value || selected?.id || selected?.slug;
        if (!selectedValue) return;

        // Already a real ObjectId — nothing to resolve
        if (isObjectId(selectedValue)) {
            hasResolvedSlugRef.current = false;
            lastResolvedSlugRef.current = null;
            return;
        }

        // Don't re-run for the same slug
        if (hasResolvedSlugRef.current && lastResolvedSlugRef.current === selectedValue) return;

        const match = matchEventFromCatalog(eventOptions, selected);
        if (match?._id) {
            hasResolvedSlugRef.current = true;
            lastResolvedSlugRef.current = selectedValue;

            updateFormData("selectedEventType", {
                id: match._id,
                value: match._id,
                eventName: match.eventName || match.label,
                label: match.eventName || match.label,
                slug: Array.isArray(match.slug) ? match.slug[0] : match.slug,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventOptionsLoading, eventOptions, formData?.selectedEventType]);

    // ── Part 2: Cuisine-analysis validation + navigation ────────────────────
    useEffect(() => {
        const stepId = currentStep?.id;
        const isEventTypeStep = stepId === STEP_IDS.EVENT_TYPE;
        const isGatheringBudgetStep = stepId === STEP_IDS.GATHERING_BUDGET;

        if (!isEventTypeStep && !isGatheringBudgetStep) {
            hasValidatedRef.current = false;
            return;
        }

        if (eventOptionsLoading || !eventOptions?.length) return;

        const selected = formData?.selectedEventType;
        if (!selected) return;

        const selectedValue = selected?.value || selected?.id || selected?.slug;
        if (!selectedValue) return;

        // Only run validation when value is still a slug (not yet an ObjectId).
        // Part 1 above will resolve it — this effect re-runs when selectedEventType updates.
        // We specifically want to wait until Part 1 has resolved the slug.
        // So: if selectedValue is a slug AND Part 1 hasn't resolved yet, skip.
        if (!isObjectId(selectedValue)) return;

        // Don't re-run validation for the same resolved id
        if (hasValidatedRef.current && lastResolvedSlugRef.current === selectedValue) return;

        const run = async () => {
            hasValidatedRef.current = true;
            lastResolvedSlugRef.current = selectedValue;

            setIsResolvingEventSlug?.(true);
            setIsApiLoading(true);

            try {
                const freshFormData = {
                    ...useEnquiryStore.getState().formData,
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

                if (isEventTypeStep) {
                    // Case A: advance to gathering_budget
                    commitAnswersThroughStep(boundedStepIndex);
                    setActiveStepIndex((prev) => prev + 1);
                }
                // Case B success: stay on gathering_budget — no navigation  
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
        // Re-run when selectedEventType changes (i.e. after Part 1 resolves the slug to ObjectId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep?.id, eventOptionsLoading, eventOptions, formData?.selectedEventType]);
};

export default useUrlEventTypeResolution;
