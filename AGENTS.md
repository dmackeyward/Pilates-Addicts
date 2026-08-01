# Agents guide for Pilates Addicts

Read this file before making any navigation, layout, or styling change in this project.

## App overview
- This is a static single-page app with structure defined in [index.html](index.html), behavior in [script.js](script.js), visual styling in [styles.css](styles.css), and content data in [data.js](data.js).
- The UI is driven by a left sidebar navigation and a main content panel.

## Navigation behavior
- The page uses a simple hash-based navigation pattern. Each resource item is linked with a hash value such as `#some-resource`.
- The sidebar contains a search input and category buttons rendered from the knowledge base.
- Clicking a category loads that section’s items into the content panel.
- Clicking an item either opens a resource document in the content area or renders a lesson list when the item has children.
- Preserve the current route behavior so deep links and browser back/forward navigation continue to work.
- When adding new content, keep the item structure consistent with the existing data model in [data.js](data.js).

## Styling conventions
- Keep the app visually lightweight and editorial, with a calm neutral background and a teal accent.
- Favor a soft, professional, content-first feel rather than a flashy or overly app-like interface.
- The preferred visual direction is warm, grounded, and quietly refined: generous spacing, polished card surfaces, readable typography, and calm interaction states that feel like a thoughtful teaching resource rather than a product dashboard.
- Use the existing CSS custom properties in [styles.css](styles.css) rather than introducing new color tokens unless necessary.
- The layout is based on a two-column app shell that becomes single-column on smaller screens.
- Reuse existing UI patterns such as `.card`, `.sidebar`, `.content-header`, `.resource-link`, and `.resource-iframe`.
- Preserve the current spacing, rounded corners, borders, and responsive behavior.
- Keep interactions simple and understated: clear hierarchy, readable typography, and gentle visual cues are preferred over heavy effects.
- Use teal sparingly as an accent; the overall experience should feel calm, warm, and grounded rather than loud or busy.
- When a single item is shown, keep the same card-based rhythm and the same title/body composition as the multi-card views so the interface remains cohesive.
- For single-resource or single-lesson views, prefer a card-like shell that mirrors the collection layout rather than a full-width iframe-only treatment.
- Prefer incremental changes over a redesign.

## Design preferences to preserve
- The experience should feel approachable for teaching and learning, not overly corporate or decorative.
- Prioritize clarity, breathing room, and legibility in both layout and content presentation.
- Maintain a balance between structure and softness: organized, but still human and relaxed.
- If a new visual direction is introduced, make sure it still feels aligned with the existing editorial style.

## Change guidance
- Before editing UI behavior, inspect [index.html](index.html), [script.js](script.js), and [styles.css](styles.css) together.
- Keep navigation and styling changes aligned with the established structure.
- Avoid introducing frameworks, build tools, or major layout rewrites unless explicitly requested.
- If new UI components are added, make them fit the current design system and remain accessible.
- If more preferences about the app’s look, feel, or behavior are discovered, update this guide so future changes stay consistent.
