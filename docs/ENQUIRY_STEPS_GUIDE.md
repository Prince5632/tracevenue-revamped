# Enquiry Wizard Extension Guide

This document explains how to add new steps or fields to the URL–driven enquiry wizard without breaking the replayable architecture described in `docs/URL.md`.

---

## 1. Understand the Flow

The wizard is a pure function of the browser URL:

```
URL → decode → normalize → hydrate store → render components
```

Navigation is the inverse:

```
User edits → update store → build URL → router.replace(nextUrl)
```

Every change must keep those contracts intact:

1. **Path segments** describe immutable SEO context (`/:location/:serviceType/:eventType`).
2. **Query params** describe mutable answers (`?g=&b=&d=&f=&a=`).
3. **Zustand store** is a runtime mirror—never the source of truth.

---

## 2. Adding a New Step

Use this eight–point checklist whenever you introduce a new step (`venue_access`, `decor`, `addons`, etc.).

### 2.1. Define the Step Metadata

1. Add an entry to `STEP_DEFINITIONS` inside `src/features/venue/enquiry/utils/enquiryConfig.js`.
2. Update `.env` (`VITE_ENQUIRY_STEPS`) so the new key appears in the desired order.

### 2.2. Create the UI Component

- Add a component under `src/features/venue/enquiry/components/steps/YourStep.jsx`.
- Export it from `components/steps/index.js`.
- Keep the component “dumb”: receive `formData`, `updateFormData`, and emit changes via the store.

### 2.3. Extend the URL Schema

1. Choose whether the data belongs in the **path** (rare) or **query** (most steps).
2. If it’s a path segment, update `buildWizardUrl` & `decodeWizardUrl` to read/write the new segment before queries.
3. If it’s a query param:
   - Pick a short key (1–2 chars) and document it in `docs/URL.md`.
   - Update `decodeWizardUrl` (in `src/features/venue/enquiry/utils/urlState.js`) to parse, normalize, and inject into `formData`.
   - Update `buildWizardUrl` to encode the normalized value back into the query string.

### 2.4. Update Step Resolution

- Modify `resolveWizardStep` inside `urlState.js` so the new step has a completion rule and the wizard knows when to display it.
- Keep the rule deterministic: “step is complete when this param exists and passes normalization.”

### 2.5. Validation & API Contracts

- Extend `validateCurrentStep` in `src/layouts/EnquiryLayout.jsx` (or move logic into a dedicated helper) so the new step blocks forward navigation when incomplete.
- If cuisine or search APIs depend on the new data, update the payload builders (e.g., `fetchCuisineCombinations`) accordingly.

### 2.6. Sidebar Summary

- Update `SidebarContent` to render a concise summary for the new step so users can confirm state at a glance.

### 2.7. Tests & Fixtures

- Create URL fixtures that include the new query/path values to ensure hydration works from a cold start.
- Manually test: paste the fixture URL, refresh, navigate back/forward, and confirm the new step persists.

### 2.8. Documentation

- Update `docs/URL.md` with the new param, valid values, and normalization rules.
- Cross-link to this guide so future contributors follow the same process.

---

## 3. Adding Fields Inside an Existing Step

Use this playbook when a step needs an extra field (e.g., gathering step gains “seating style”).

1. **State Schema**
   - Add default values to `EMPTY_ENQUIRY_FORM` (`src/features/venue/enquiry/constants/formDefaults.js`).
   - Update `createEmptyForm()` to clone the new field safely.

2. **Hydration**
   - Extend `decodeWizardUrl` to parse the new field from the URL and normalize it.
   - Update `hydrateFromUrl` call sites only if the shape changes (usually not needed because the store already hydrates from the snapshot).

3. **Encoding**
   - Update `buildWizardUrl` to include the new field in the proper query segment.
   - Apply downstream invalidation rules: if field depends on an earlier choice, ensure it is dropped when upstream answers change.

4. **Change Detection**
   - Update `extractStepPayload` in `src/layouts/EnquiryLayout.jsx` so `hasStepChanged` knows the field belongs to that step. This prevents accidental URL rewrites when nothing changed.

5. **UI & Sidebar**
   - Update the step component to render the input.
   - Expose the value in the sidebar summary if it improves clarity.

6. **APIs**
   - Pass the normalized value to any API helpers that need it (e.g., cuisine analysis, venue search).

7. **Documentation**
   - Record the new field, accepted values, and normalization logic in `docs/URL.md`.

---

## 4. Normalization Rules

- Always sanitize URL input before hydrating the store. Clamp numbers, validate enums, strip past dates, etc.
- **Never** allow raw URL data into the runtime store. `decodeWizardUrl` is the only place untrusted data lives.
- If normalization removes data, the builder must omit it from the next URL so the browser stays canonical.

---

## 5. Troubleshooting Checklist

| Symptom | Fix |
| --- | --- |
| Sidebar doesn’t show new data | Verify `extractStepPayload`, `SidebarContent`, and hydration defaults. |
| URL loses params when going back | Ensure `hasStepChanged` knows about the new fields; otherwise, the commit step assumes nothing changed and drops downstream values. |
| Refresh doesn’t repopulate UI | Check `decodeWizardUrl` normalization path and default `EMPTY_ENQUIRY_FORM` values. |
| Query param grows too long | Compress values (enums, bitmasks) or move to a backend token if truly large. |

---

## 6. Quick Reference Files

| Purpose | File |
| --- | --- |
| Step metadata & env order | `src/features/venue/enquiry/utils/enquiryConfig.js` |
| URL encode/decode | `src/features/venue/enquiry/utils/urlState.js` |
| Empty form defaults | `src/features/venue/enquiry/constants/formDefaults.js` |
| Layout logic (validation, change detection) | `src/layouts/EnquiryLayout.jsx` |
| Sidebar summaries | `src/features/venue/components/Sidebar/SidebarContent.jsx` |

Use this guide as a checklist before every structural change. Following these steps preserves the “URL owns the wizard state” guarantee and keeps the flow refresh/back-button safe.***
