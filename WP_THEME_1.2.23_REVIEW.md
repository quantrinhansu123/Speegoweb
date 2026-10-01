# WordPress theme 1.2.23 — Knowledge favicon

## Change

Elementor Knowledge pages call `wp_head()` without the static shell's favicon links. When no WordPress Site Icon is configured, local WordPress emitted no icon and the saved staging HTML used WordPress.com's `webclip.png` fallback.

The theme now supplies `explore/assets/favicon-speego.png` through WordPress's `get_site_icon_url` filter. The URL comes from the active theme directory and includes `ver=1.2.23`, so it works with the actual installed theme folder and avoids stale favicon URLs. A configured customer Site Icon and icons belonging to other blogs remain intact. No database options were changed.

The ZIP differs from 1.2.22 in five files: the fallback filter in `functions.php`, the version in `style.css`, and cache versions in `front-page.php`, `sourcing-reference.php`, and `explore/index.html`. Layout CSS, Elementor documents, images and all other packaged files are unchanged.

## Verification

- Real local WordPress: all 30 Knowledge hub/category/article routes return HTTP 200 and their favicon links return the exact packaged PNG bytes. Three browser navigation timeouts were retried using HTTP requests; those checks validate the HTML and icon responses, not complete browser loading of those three articles. Evidence is recorded in `scratch/review-1.2.23/favicon-audit.json`.
- All three native Elementor Knowledge hubs pass at 1280/1024/375px: nine browser checks with six topic cards, correct three/two/one-column layouts, loaded images and no horizontal overflow. Screenshots are saved beside the audit JSON.
- Focused WordPress integration checks pass: absent Site Icon, simulated WordPress.com default, core favicon markup, configured customer icon, other blog icon and unchanged Site Icon option.
- All 12 theme PHP files pass syntax checks with PHP 8.3.35.
- `npm.cmd run build` passes and generates 68 static SEO routes.
- ZIP CRC and all 194 entries are verified against the theme directory by `package_verified_theme.py`.

## Delivery and staging

ZIP: `E:\speego-web\speego-logistics-theme-v1.2.23.zip` (70,345,196 bytes).

SHA256: `005d34f8d3470122d48ab7c13b690d12a1f134cfb8ed2e16cab6abdf9f8725cb`.

The previous 1.2.22 ZIP is preserved. `speego-logistics-vercel-parity.zip` now aliases 1.2.23.

Vercel's three Knowledge hubs and existing favicon URL return HTTP 200. No Vercel source or deployment was changed.

WordPress.com staging (`speegowebvercel.wpcomstaging.com`) still refuses connections from this environment on 2026-10-01. This session has not installed the ZIP or cleared staging cache. After installation, clear WordPress.com cache and verify `/vi/kien-thuc/`, `/en/knowledge/`, `/es/conocimiento/` and their favicon image responses. Local checks do not establish that staging matches Vercel.
