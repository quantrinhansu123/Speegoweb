# WordPress theme 1.2.22 — Knowledge parity

Reference: https://speegoweb.vercel.app/vi/kien-thuc/

## Changes

- Remove WordPress-generated empty paragraphs, layout paragraph wrappers and stray line breaks from imported Knowledge HTML during rendering. Those empty nodes occupied grid cells and placed every topic card in the middle column. Keep article paragraphs, deliberate heading breaks, edited text and links.
- Add `explore/css/wp-knowledge-parity.css` for native Elementor Knowledge documents: reference hero spacing and typography, full-width three/two/one-column topic grids, card spacing, FAQ borders and consultation styling.
- Render one consultation band at the bottom of each of the 18 category pages. Parse placeholders as HTML so quoted `data-heading` values containing `<br>` do not prevent rendering.
- Resolve authorized Elementor preview requests before the document initializes. Virtual Vietnamese and Spanish URLs previously resolved as missing attachments and the editor showed “The preview could not be loaded.”
- Increment theme and cache versions to 1.2.22. Existing header, home and sourcing corrections from 1.2.21 remain included.

## Verified

- 72 browser page/viewport checks on real local WordPress and repaired HTML fixtures: three native Knowledge hubs and three legacy hub fixtures at 1280/1024/375px, plus 18 categories and nine articles at 1280/375px. No HTTP, image, horizontal overflow or card-column failures.
- All 27 built-in category/article pages compared against live Vercel at desktop width: matching heading text and styles, section count, image count and grid columns.
- Six topic cards at each hub; three desktop columns, two tablet columns and one mobile column. Native FAQs expand.
- Elementor editor previews open for VI post 49, EN post 74 and ES post 51, with six cards in each preview. Original `_elementor_data` matches the imported source. Anonymous requests do not receive the authorized preview query override.
- PHP 7.4 syntax checks for every theme PHP file pass. Build generates 68 static SEO routes. Existing home/sourcing markup repair regression check passes.
- ZIP CRC and every packaged file verified byte-for-byte against the theme directory by `package_verified_theme.py`.

Evidence: `scratch/review-1.2.22/audit.json`, `editor-check.json`, screenshots and the focused PHP checks in `scratch/test_knowledge_1222.php` and `scratch/test_knowledge_editor_route_1222.php`.

## Delivery and staging status

ZIP: `E:\speego-web\speego-logistics-theme-v1.2.22.zip`.

Alias: `E:\speego-web\speego-logistics-vercel-parity.zip`.

Theme 1.2.22 has not been installed on WordPress.com staging by this session. Staging currently refuses connections from this environment. Local tests are not confirmation that the installed staging site is fixed or pixel-identical. After replacing the theme, clear WordPress.com cache and check `/vi/kien-thuc/`, `/en/knowledge/`, `/es/conocimiento/`, their category/article routes and all three Elementor editor previews on staging.

No Elementor database contents, plugin files or media uploads were replaced. The ZIP contains theme files only.
