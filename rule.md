# SpeeGo Web — Development Rules

This document defines the rules that should be followed when developing or modifying the SpeeGo Web repository.

The project is currently undergoing a **website migration and integration process**. The goal is not simply to add new HTML files, but to integrate the newer SpeeGo website implementation and visual design into the existing website architecture while preserving existing functionality.

---

# 1. Golden Rules

## Rule 1 — Know which architecture you are modifying

The repository contains two website generations:

```text
New Website
explore/

Legacy Website
themes.pixelwars.org/logistica/demo-01/
```

Before changing a file, determine which website owns the behavior.

Do not assume that modifying `explore/` automatically changes the production homepage.

---

## Rule 2 — Do not blindly copy external/recent code into the repository

The newer website source is maintained separately in:

```text
https://github.com/lovemom-exe/html-demo-speego
```

This repository is a **source/reference implementation for the new SpeeGo website**.

When integrating it into this repository:

```text
Do NOT simply copy the entire repository
        ↓
Analyze the existing implementation
        ↓
Extract required pages/components/assets/layout/styles/scripts
        ↓
Adapt them to the current SpeeGo architecture
        ↓
Integrate and test
```

The result must behave as one coherent website.

---

# 2. New Website Integration

## Rule 3 — The goal is to merge code AND layout

The primary migration task is:

```text
Existing SpeeGo Website
+
New SpeeGo Website
=
One integrated SpeeGo Website
```

The integration must preserve both:

### Functional requirements

- Existing routing
- Existing navigation behavior
- Existing forms
- Existing language switching
- Existing business/service information
- Existing integrations
- Existing responsive behavior

### Visual requirements

- New website layout
- New spacing system
- New typography
- New hero sections
- New cards/components
- New page composition
- New animations/interactions
- New visual hierarchy
- New responsive layout

The new website must not be treated as a separate microsite inside `explore/`.

---

## Rule 4 — Layout integration is a first-class requirement

When importing a page from:

```text
lovemom-exe/html-demo-speego
```

do not only copy its HTML content.

Also inspect and migrate the elements responsible for its appearance:

```text
HTML structure
CSS
Images
SVGs
Icons
Fonts
Animations
JavaScript interactions
Responsive rules
Component spacing
Navigation patterns
```

A page is considered successfully migrated only when its **structure, behavior, and visual layout** are correctly integrated.

---

# 3. Integration Architecture

## Rule 5 — `explore/` remains the target architecture

The imported code from `html-demo-speego` should ultimately live inside the existing `explore/` architecture.

Target direction:

```text
Speegoweb/
│
├── explore/
│   ├── index.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   └── ...
│   │
│   ├── js/
│   │   └── ...
│   │
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   │
│   ├── assets/
│   │   └── ...
│   │
│   └── pages/
│       ├── Knowledge/
│       ├── fulfillment/
│       ├── sourcing/
│       ├── tuyen_van_chuyen/
│       └── xuat_nhap_khau/
```

Do not create a second independent application under:

```text
explore/html-demo-speego/
```

unless there is a temporary migration reason.

The end state should have **one coherent `explore/` application**.

---

## Rule 6 — Preserve useful parts of the old architecture

Integration does not mean replacing everything.

Before modifying a component, identify whether the existing implementation already provides useful behavior.

Examples:

```text
Existing router
Existing language system
Existing shared header
Existing shared footer
Existing breadcrumbs
Existing forms
Existing navigation
Existing deployment setup
```

Reuse them where appropriate.

The new website should improve the current architecture rather than unnecessarily duplicate it.

---

# 4. Page Migration Rules

## Rule 7 — Compare old and new versions before merging

For every major page:

```text
Old page
    ↓
New page
    ↓
Compare
    ↓
Decide what to preserve
    ↓
Merge
```

Compare:

```text
HTML structure
Content
Sections
CSS classes
Images
CTAs
Navigation
Animations
Mobile layout
JavaScript behavior
```

Do not assume the newer HTML can simply replace the old page.

---

## Rule 8 — Preserve business content while adopting the new layout

If the old website contains required business information that is absent from the new design:

```text
Keep the business information
+
Adapt its presentation to the new layout
```

Do not remove business-critical content only because the new design does not contain an equivalent section.

The migration is:

```text
Content preservation
+
Layout modernization
+
Code integration
```

---

## Rule 9 — Avoid duplicate pages

After migration, there should not be multiple competing versions of the same page without a deliberate reason.

For example, avoid having:

```text
explore/pages/fulfillment/
new-fulfillment/
html-demo-speego/fulfillment.html
legacy-fulfillment/
```

all representing the same feature.

Choose one canonical implementation under the `explore/` architecture.

---

# 5. CSS Integration Rules

## Rule 10 — Do not blindly merge CSS files

The `html-demo-speego` repository contains its own CSS architecture.

Before copying its CSS into:

```text
explore/css/style.css
```

inspect:

```text
Class names
CSS variables
Typography
Container widths
Spacing
Breakpoints
Animations
Global selectors
```

Watch for collisions such as:

```css
.container
.card
.hero
.button
.header
.nav
section
```

Existing and imported styles may target the same selectors.

---

## Rule 11 — Prefer a controlled CSS migration

When possible:

```text
New CSS
   ↓
Identify reusable design tokens/components
   ↓
Rename conflicting classes
   ↓
Scope page-specific styles
   ↓
Merge into explore CSS structure
```

Do not dump an entire external stylesheet into the existing global stylesheet without checking conflicts.

---

## Rule 12 — Preserve the new visual system

During integration, do not simplify the new design merely to make it easier to merge.

Preserve important visual characteristics such as:

```text
Typography
Spacing
Border radius
Shadows
Card proportions
Hero composition
Button appearance
Section rhythm
Responsive behavior
Animations
```

If the final integrated page looks significantly different from the intended new website, the migration is incomplete.

---

# 6. Header and Footer Integration

## Rule 13 — One canonical header

The existing application uses:

```text
explore/partials/header.html
```

The imported website may contain its own header.

Do not keep both headers.

Instead:

```text
New Header Design
        ↓
Adapt to
        ↓
explore/partials/header.html
```

Preserve existing application requirements such as:

```text
#header-container
Navigation hooks
Language switcher
Mobile menu
Breadcrumb container
```

The final system must use one shared header.

---

## Rule 14 — One canonical footer

Apply the same principle to:

```text
explore/partials/footer.html
```

Extract the new footer design and integrate it into the shared footer rather than duplicating it per page.

---

# 7. JavaScript Integration

## Rule 15 — Do not copy JavaScript blindly

Before importing JavaScript from:

```text
html-demo-speego
```

determine whether it duplicates functionality already present in:

```text
explore/index.html
speego-main.js
speego-journey.js
```

Potential duplicate responsibilities include:

```text
Navigation
Mobile menu
Language switching
Animations
Forms
Scroll effects
Carousels
Counters
Tracking
```

Duplicate logic can cause:

- Multiple event listeners
- Conflicting state
- Broken navigation
- Animation bugs
- Unexpected mobile behavior

---

## Rule 16 — Extract page-specific JavaScript

If a migrated page requires JavaScript, prefer:

```text
explore/js/
```

with page-specific or feature-specific files.

Avoid putting every new feature into the existing large:

```text
speego-main.js
```

unless it is genuinely global functionality.

---

# 8. Asset Migration

## Rule 17 — Migrate assets together with the page

When importing a page, also identify all required:

```text
Images
SVGs
Icons
Fonts
Background images
Video/media
```

A page is not fully migrated if its HTML works but its assets are missing or broken.

---

## Rule 18 — Normalize asset paths

Imported files may assume paths such as:

```text
./assets/...
../css/...
```

These paths may become invalid after moving the page into:

```text
explore/pages/...
```

All asset references must be updated to match the final repository structure.

---

# 9. Routing Integration

## Rule 19 — Every migrated page must use the existing router

New pages should be registered through:

```text
explore/index.html
```

using the existing `ROUTES` architecture.

Do not introduce an independent routing mechanism merely because the source repository uses direct HTML pages.

---

## Rule 20 — Preserve bilingual routing

When migrating:

```text
fulfillment.html
en-fulfillment.html
```

or similar pages, map them into the existing:

```text
ROUTES
LANG_PAIRS
```

architecture.

The final result should behave consistently with existing Vietnamese/English pages.

---

# 10. Content Structure

## Rule 21 — Separate content from implementation where practical

The source repository contains large standalone HTML files.

During integration, identify which parts are:

```text
Layout
Reusable component
Business content
Page-specific content
JavaScript behavior
```

Do not preserve a large monolithic file simply because it was monolithic in the source repository.

---

## Rule 22 — Keep shared components shared

If the same structure appears in multiple migrated pages:

```text
Header
Footer
CTA
Contact block
Service cards
FAQ
Feature cards
Breadcrumbs
```

consider making it reusable rather than copying it into every page.

---

# 11. Migration Priority

## Rule 23 — Migrate in logical stages

Recommended migration order:

```text
1. Analyze html-demo-speego
2. Identify design system
3. Identify shared components
4. Integrate assets
5. Integrate header
6. Integrate footer
7. Integrate global CSS/tokens
8. Migrate homepage
9. Migrate service pages
10. Migrate Knowledge pages
11. Integrate JavaScript
12. Update routing
13. Update language mappings
14. Test responsive behavior
15. Test Vercel deployment
```

Do not attempt a blind full-repository copy.

---

# 12. Legacy Website Integration Rules

## Rule 24 — The legacy website is a reference for existing behavior

The legacy website:

```text
themes.pixelwars.org/logistica/demo-01/
```

may contain behavior or content that the new design does not yet reproduce.

When migrating, compare the two implementations.

The goal is:

```text
New visual design
+
Existing functional requirements
```

not:

```text
Delete old
+
Copy new
```

---

## Rule 25 — Preserve functionality while changing appearance

If the old implementation provides:

```text
Working forms
Tracking
Navigation behavior
Language switching
Journey interaction
Existing business flows
```

the new design should reproduce the required functionality rather than accidentally removing it.

---

# 13. Validation Rules

## Rule 26 — A visual migration requires visual validation

Do not validate migration only by checking whether the HTML renders.

Check:

```text
Desktop screenshot
Tablet screenshot
Mobile screenshot
```

Compare the integrated page against the intended new website.

Check especially:

```text
Spacing
Typography
Container width
Hero height
Card alignment
Buttons
Images
Section order
Responsive stacking
```

---

## Rule 27 — Test both direct routes and SPA routes

For every migrated page verify:

```text
Direct page access
Hash route
Browser refresh
Navigation from header
Language switch
Back/forward navigation
```

---

# 14. Migration Completion Criteria

A page is considered migrated only when all of the following are true:

```text
[ ] New HTML/layout integrated
[ ] Existing required content preserved
[ ] New CSS integrated
[ ] Assets migrated
[ ] JavaScript integrated
[ ] No obvious CSS conflicts
[ ] No duplicate navigation/header/footer
[ ] Route registered
[ ] Language mapping updated
[ ] Desktop tested
[ ] Mobile tested
[ ] Browser console checked
[ ] Vercel deployment tested
```

---

# 15. Important Principle

The core objective of this project is:

```text
             OLD SPEEGO
                  │
                  │ existing
                  │ functionality/content
                  ▼
            ┌─────────────┐
            │   MERGING   │
            └─────────────┘
                  ▲
                  │ new
                  │ layout/design/code
                  │
                  │
             NEW SPEEGO
       lovemom-exe/html-demo-speego
```

The desired final result is **one SpeeGo website**, not two websites living next to each other.

The migration should therefore preserve:

```text
Old:
- Existing functionality
- Existing business content
- Existing integrations
- Existing routes where required

New:
- New layout
- New visual system
- New components
- New interactions
- New responsive design
```

The final implementation should make these two layers feel like one coherent product.