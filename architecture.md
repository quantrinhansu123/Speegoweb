# SpeeGo Web — Architecture

## 1. Overview

SpeeGo Web is currently a **static website with two coexisting generations of architecture**:

1. **New architecture** — located under `explore/`
   - Custom HTML/CSS/Vanilla JavaScript.
   - Hash-based client-side routing.
   - Shared header/footer partials.
   - Vietnamese and English content.
   - Organized service and knowledge pages.

2. **Legacy architecture** — located under `themes.pixelwars.org/logistica/demo-01/`
   - Static export of the previous WordPress/Pixelwars Logistica website.
   - Contains `wp-content`, `wp-includes`, `wp-json`, theme assets and legacy JavaScript.
   - Still relevant because the repository root currently redirects to this version.

> **Important:** The repository is in a migration/redesign state. Do not assume that `explore/` is already the production root.

---

## 2. High-Level Architecture

```text
                           ┌─────────────────────┐
                           │      Vercel         │
                           │   Static Hosting    │
                           └──────────┬──────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │     index.html  │
                             │  Root redirect  │
                             └────────┬────────┘
                                      │
                                      ▼
                ┌─────────────────────────────────────────┐
                │ themes.pixelwars.org/logistica/demo-01 │
                │          Legacy Website                │
                └─────────────────────────────────────────┘


                    New SpeeGo Architecture
                              │
                              ▼
                     ┌─────────────────┐
                     │ explore/index   │
                     │ Hash Router     │
                     └────────┬────────┘
                              │
             ┌────────────────┼─────────────────┐
             ▼                ▼                 ▼
       Shared Layout      Route Pages       Language
             │                │                 │
      ┌──────┴──────┐   ┌─────┴────────┐   ┌────┴─────┐
      │   Header    │   │ Services     │   │   VI     │
      │   Footer    │   │ Knowledge    │   │   EN     │
      └─────────────┘   │ Articles     │   └──────────┘
                        └──────────────┘
                              │
                              ▼
                       Global CSS / JS
```

---

## 3. Repository Structure

The important project structure is approximately:

```text
/
├── index.html
├── vercel.json
├── prepare-vercel.js
│
├── explore/
│   ├── index.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   │
│   └── pages/
│       ├── Knowledge/
│       │   ├── VI/
│       │   └── EN/
│       │
│       ├── fulfillment/
│       ├── sourcing/
│       ├── tuyen_van_chuyen/
│       └── xuat_nhap_khau/
│
└── themes/
    └── pixelwars.org/
        └── logistica/
            └── demo-01/
                ├── wp-content/
                ├── wp-includes/
                ├── wp-json/
                └── ...
```

---

# 4. Deployment Architecture

`vercel.json` currently defines:

```json
{
  "buildCommand": "node prepare-vercel.js",
  "outputDirectory": "public",
  "cleanUrls": true,
  "trailingSlash": true
}
```

Therefore deployment is not simply "serve the repository root".

The deployment flow is:

```text
Git Repository
      │
      ▼
Vercel
      │
      ├── node prepare-vercel.js
      │
      ▼
    public/
      │
      ▼
Static Website
```

The exact internal behavior of `prepare-vercel.js` should be treated as implementation-specific. When modifying deployment behavior, inspect that file before making assumptions.

---

# 5. Root Website

The root `index.html` currently redirects to:

```text
themes.pixelwars.org/logistica/demo-01/index.html
```

This means:

```text
/
│
└── index.html
      │
      ▼
Legacy Logistica Website
```

This is an important architectural detail.

The `explore/` application is **not automatically the root production website** simply because it contains the newer architecture.

Any change involving the production entry point must first determine whether the change belongs to:

- the legacy website, or
- the new `explore/` website.

---

# 6. New Website Architecture — `explore/`

The new website is implemented as a lightweight static SPA.

Main entry:

```text
explore/index.html
```

Its basic structure is:

```html
<div id="header-container"></div>

<main id="app-main">
    ...
</main>

<div id="footer-container"></div>
```

The application dynamically loads:

```text
partials/header.html
partials/footer.html
```

and the HTML corresponding to the current route.

---

# 7. Routing

The new application uses **hash-based routing**.

Examples:

```text
#/knowledge
#/fulfillment
#/sourcing
#/tuyen-van-chuyen
#/xuat-nhap-khau
```

English routes include:

```text
#/en/knowledge
#/en/fulfillment
#/en/sourcing
#/en/shipping-routes
#/en/import-export
```

Routes are mapped through the `ROUTES` configuration in:

```text
explore/index.html
```

Conceptually:

```javascript
const ROUTES = {
    "#/knowledge": "...",
    "#/fulfillment": "...",
    "#/sourcing": "...",
    ...
};
```

The router then loads the corresponding HTML fragment into:

```text
#app-main
```

---

# 8. Route → Page Flow

The runtime flow is:

```text
User opens URL
      │
      ▼
explore/index.html
      │
      ▼
Read window.location.hash
      │
      ▼
Find route in ROUTES
      │
      ▼
Load page HTML
      │
      ▼
Insert HTML into #app-main
      │
      ├── Header already loaded
      ├── Footer already loaded
      │
      ▼
Initialize page-specific behavior
```

Because pages are dynamically injected, page code must not assume that the browser has loaded a completely independent HTML document.

---

# 9. Language Architecture

The new website supports Vietnamese and English.

Language routes are explicitly mapped.

The application also maintains a `LANG_PAIRS` mapping that connects Vietnamese routes with their English counterparts.

Conceptually:

```text
Vietnamese Route
       │
       ▼
LANG_PAIRS
       │
       ▼
English Route
```

Example:

```text
#/knowledge
      ↕
#/en/knowledge
```

When adding a bilingual page, both route definitions and their language relationship should be updated.

---

# 10. Shared Layout

Shared website components are stored in:

```text
explore/partials/
```

### Header

```text
explore/partials/header.html
```

Contains shared elements such as:

- Top bar
- Logo
- Navigation
- CTA
- Language switcher
- Mobile navigation drawer
- Breadcrumb container

### Footer

```text
explore/partials/footer.html
```

Contains:

- Brand information
- Tagline
- Explore links
- Services
- Contact information

These files are effectively the shared layout layer of the new website.

---

# 11. Page Architecture

The new pages are organized by business domain.

```text
explore/pages/
│
├── Knowledge/
│   ├── VI/
│   └── EN/
│
├── fulfillment/
│
├── sourcing/
│
├── tuyen_van_chuyen/
│
└── xuat_nhap_khau/
```

### Knowledge

Knowledge is structured like a lightweight static content/CMS layer.

It contains:

- Categories
- Articles
- Guides
- Industry information
- Trade routes
- Sourcing/QC content
- Fulfillment/warehouse content
- Import/export news

The content is stored as HTML files rather than retrieved from a backend CMS.

---

# 12. CSS Architecture

The main stylesheet is:

```text
explore/css/style.css
```

It acts as a global stylesheet for the new website.

It contains styles for areas such as:

- Header
- Navigation
- Hero sections
- Cards
- Services
- FAQ
- Forms
- Breadcrumbs
- Footer
- Responsive layouts
- Animations

The current CSS architecture is relatively centralized rather than componentized.

Therefore:

```text
New component
      │
      ▼
Check style.css first
      │
      ▼
Reuse existing classes/tokens
      │
      ▼
Only add new CSS when necessary
```

Avoid creating multiple competing styles for the same UI pattern.

---

# 13. JavaScript Architecture

The legacy website contains a large JavaScript file:

```text
themes.pixelwars.org/logistica/demo-01/
└── wp-content/themes/logistica/js/
    └── speego-main.js
```

This file contains multiple responsibilities, including:

- Navigation
- Hero behavior
- Internationalization
- Consultation/quote behavior
- Tracking
- Forms
- UI interactions
- Journey/process behavior

It is effectively a large shared application file.

For future development, new business logic should preferably not be added blindly to this file.

---

# 14. Journey Animation

The legacy website also contains:

```text
speego-journey.js
```

This controls the visual 8-step journey.

The animation includes:

```text
Scroll position
      │
      ▼
Calculate progress
      │
      ▼
SVG route progress
      │
      ▼
Active/completed steps
      │
      ▼
Moving journey icon
```

It also handles:

- Responsive/mobile layout
- Resize recalculation
- Font/layout recalculation
- `prefers-reduced-motion`

Any modification to this feature must preserve reduced-motion behavior.

---

# 15. Legacy WordPress Export

The directory:

```text
themes.pixelwars.org/logistica/demo-01/
```

contains a static export of a WordPress website.

Examples:

```text
wp-content/
wp-includes/
wp-json/
```

The presence of these directories does **not** mean that the repository contains a running PHP/WordPress backend.

The repository should currently be treated primarily as a static website/export.

The `wp-json` directory represents exported/static WordPress API content and should not automatically be interpreted as a live backend API.

---

# 16. Two-Architecture Rule

The most important architectural fact is:

```text
Legacy Website
      +
New Explore Website
      =
Current Repository
```

They are not interchangeable.

### Legacy

```text
themes.pixelwars.org/logistica/demo-01/
```

### New

```text
explore/
```

Before changing any file, determine which architecture owns the behavior.

---

# 17. Current Architecture Characteristics

### Strengths

- Simple static deployment.
- No backend required for the new site.
- Easy content editing through HTML.
- Shared header/footer reduce duplication.
- Vietnamese/English structure is explicit.
- Knowledge content is organized by domain.
- Hash routing works well with static hosting.
- Existing responsive behavior is already implemented.

### Architectural limitations

- Two website generations coexist.
- Root production entry still points to the legacy site.
- Hash routing is less SEO-friendly than normal path-based routing.
- Global CSS is large and centralized.
- Legacy `speego-main.js` has too many responsibilities.
- Page HTML can become large/monolithic.
- Legacy WordPress export increases repository size and maintenance complexity.

---

# 18. Recommended Future Direction

The long-term architecture should converge toward:

```text
                    SpeeGo Web
                       │
                       ▼
              Single production entry
                       │
                       ▼
                 New architecture
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Layout        Pages       Content
          │            │            │
       Header       Services    Knowledge
       Footer       Routes      Articles
          │            │            │
          └────────────┼────────────┘
                       ▼
                  CSS / JS modules
```

Migration from the legacy site should be incremental.

The legacy directory should **not** be removed until:

1. The new website contains all required production pages.
2. Root routing has been switched.
3. All important links have been verified.
4. Forms and integrations work.
5. Mobile behavior has been verified.
6. Deployment has been verified on Vercel.
7. SEO/redirect requirements have been handled.

---

# 19. Change Impact Map

| Change | Main location |
|---|---|
| Add new route | `explore/index.html` |
| Add new service page | `explore/pages/` |
| Add Knowledge article | `explore/pages/Knowledge/` |
| Change shared header | `explore/partials/header.html` |
| Change shared footer | `explore/partials/footer.html` |
| Change global styling | `explore/css/style.css` |
| Change legacy homepage | `themes.pixelwars.org/logistica/demo-01/` |
| Change legacy JS behavior | `themes.pixelwars.org/logistica/demo-01/wp-content/themes/logistica/js/` |
| Change deployment | `vercel.json`, `prepare-vercel.js` |
| Change production entry | root `index.html` |

---

# 20. Developer Reading Order

For a developer new to the project, read in this order:

```text
1. index.html
2. vercel.json
3. explore/index.html
4. explore/partials/header.html
5. explore/partials/footer.html
6. explore/css/style.css
7. explore/pages/
8. legacy speego-main.js
9. speego-journey.js
10. legacy WordPress export
```

This order provides the fastest understanding of:

```text
Deployment
   ↓
Entry point
   ↓
Routing
   ↓
Shared layout
   ↓
Styling
   ↓
Pages/content
   ↓
Legacy behavior
```