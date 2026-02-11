Below is a **production-grade, final architecture** you can implement as-is.
It keeps your SEO entry links, needs **no backend drafts, no session/local storage**, supports refresh/back/forward/multiple tabs, and removes step-reset bugs.

The key shift:

> The URL is not a place you *store React state*.
> The URL is a deterministic **input contract** from which the app reconstructs state every navigation.

Your app becomes a **replayable state machine**.

---

# 1) What this architecture is (in one sentence)

A stateless enquiry wizard where:

**The browser URL fully describes the user’s answers, and the UI is just a renderer of those answers.**

---

# 2) URL Design (Final)

We use **Hybrid Path + Query**.

### Path → SEO intent (immutable context)

```
/:location/:serviceType/:eventType
```

Example:

```
/chandigarh/venue/birthday-party
```

This is your WordPress backlink target.

---

### Query → User answers (wizard state)

Short keys (important — URLs stay small and stable):

| Key | Meaning            |
| --- | ------------------ |
| g   | gathering size     |
| b   | budget             |
| d   | event date/time    |
| f   | food preference    |
| a   | alcohol preference |

Example:

```
/chandigarh/venue/birthday-party?g=40-60&d=2026-02-26T13:00Z_2026-02-26T17:00Z&f=veg&a=0
```

Only include **answered steps**. Missing key = unanswered step.

---

# 3) Golden Rules (Do not violate these)

1. URL is the only persistent state
2. Store is disposable cache
3. Hydration only on navigation events
4. Store never writes truth → URL does
5. Upstream changes clear downstream params
6. API results are never encoded in URL

If you follow these, the stepper will not break.

---

# 4) The State Ownership Model

Correct ownership chain:

```
URL → Decode → Normalize → Hydrate Store → Render UI
```

User action:

```
User Answer → Build Next URL → navigate() → Hydrate → Render
```

Important:
The store does **not own data**.
The URL owns the data.

Zustand only holds a runtime copy for rendering.

---

# 5) Step Resolution (No step index anymore)

You NEVER track `currentStep` in state.

You compute it:

| Condition      | Step               |
| -------------- | ------------------ |
| no g           | Step 1 – Gathering |
| g but no d     | Step 2 – Date      |
| g+d but no f   | Step 3 – Food      |
| g+d+f but no a | Step 4 – Alcohol   |
| all present    | Results            |

This single rule eliminates step desync permanently.

---

# 6) Navigation & Hydration Lifecycle (Critical)

This is the actual runtime behavior.

### On first load / refresh / pasted link

```
read URL
→ decode params
→ normalize values
→ hydrate store
→ resolve step
→ render
→ fetch API results
```

### On user clicking Next

```
construct new query params
→ remove downstream params
→ router.replace(newUrl)
→ navigation event fires
→ hydrate store again
→ render next step
```

Important:
You DO NOT manually set store and then sync URL later.
URL change is the commit.

---

# 7) The Navigation Identity Rule (prevents random bugs)

Hydrate store **only when navigation occurs**, not when component renders.

Trigger hydration when router location changes, not on every render.

This prevents:
• disappearing inputs
• flickering
• double fetch
• race conditions

---

# 8) URL Normalization Layer (very important)

Before hydrating the store you must validate and clean the params.

Example rules:

| Invalid URL | Normalized |
| ----------- | ---------- |
| g=5-20000   | g=20-500   |
| d=past date | remove d   |
| f=pizza     | remove f   |
| a=7         | remove a   |

Flow:

```
decode URL
→ validate
→ clamp to business limits
→ hydrate store
```

The URL can be dirty.
Your store must never be dirty.

---

# 9) Downstream Invalidation (how edits work)

When earlier answers change, later answers are removed.

Example:

Before:

```
?g=40-60&d=...&f=veg&a=1
```

User changes gathering to `80`.

New URL becomes:

```
?g=80-100
```

Date, food, alcohol are intentionally cleared.

Why?
Because they were chosen based on old guest count.

This prevents stale logical bugs.

---

# 10) Back Button Behavior (important UX fix)

Treat the SEO entry URL as **initializer only**.

After the first answer is given, convert to canonical wizard state:

Example:

```
/chandigarh/venue/birthday-party
→ user selects 50 guests
→ replace:
/chandigarh/venue/birthday-party?g=50-60
```

Now:

Back button exits the wizard instead of resetting it.

---

# 11) API Calling Rule

API calls depend only on decoded params.

Never store results in store permanently.

```
GET /venues/search
  peopleMin
  peopleMax
  date
  food
  alcohol
  lat
  lng
```

Refresh → decode → refetch → render.

No stale data.

---

# 12) Zustand Store Responsibilities

Store holds only:

• normalized answers
• loading flags
• fetched results (temporary)

Store does NOT:
• remember previous sessions
• persist
• determine step

It is a runtime renderer state only.

---

# 13) Developer Coding Rules

### Components

Receive data via props:

Good:

```
<GatheringStep data onChange />
```

Bad:
Directly reading URL or manipulating router inside steps.

---

### Navigation

Inside wizard → `replace()`
Leaving wizard → `push()`

Never use `window.history`.

---

### URL Builder

Create a single file:

```
urlState.ts
```

Responsible for:

* encode
* decode
* normalize
* downstream clearing

No other part of app touches URL logic.

---

# 14) Final Runtime Flow

```id="m59v5s"
User clicks SEO link
      ↓
Parse path → init base context
      ↓
URL params exist?
      ↓
Decode params
      ↓
Hydrate store
      ↓
Resolve step
      ↓
Render step
      ↓
User answers
      ↓
Update params
      ↓
Replace URL
      ↓
Re-render
```

---

# 15) What You Now Get

After implementing this:

• refresh safe
• back button works
• multi-tab safe
• SEO links work
• no local/session storage
• no step reset
• no stale state
• shareable enquiry link
• deterministic behavior

---

# Final Note

Your earlier system failed because the wizard state lived inside React.

This system works because:

**React no longer owns the enquiry.
The URL does.**

And since the browser history is already a perfect per-tab state container, you get stability without persisting anything.
