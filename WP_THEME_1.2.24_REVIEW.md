# WordPress theme 1.2.24 review

Reviewed on 2026-10-02 against the supplied screenshots, eleven screen recordings, and `https://speegoweb.vercel.app`.

## Changes

- Homepage desktop navigation: remove the orange active state from Home to match Vercel. Other page highlights remain available.
- Consultation video: retain the server-rendered video node during startup instead of replacing it. The packaged MP4 and Vercel MP4 are identical (SHA-256 `aa2b2b1a2a107cb67454c08ed054297cb0c46ec0fa96a4c86062ce187484a2b8`). Comparing different playback moments explains the different map views in the screenshots. The existing crop and end-card treatment match at 4, 5, and 9.5 seconds; they were preserved.
- Homepage news: all five CTAs open `/news/`, matching the reference archive, instead of the Knowledge hub. The theme includes the six reference articles, required styles/images/fonts, and a working mobile menu. Article navigation and sharing use this site's URLs. The separate Knowledge routes remain available.
- Fulfillment: section links use canonical public page URLs, preserve calculator/form state, and account for the sticky header. Old path-style bookmarks redirect to the real page plus section fragment.
- Warehouse/returns pricing: remove the exclusive accordion handler and startup reset. All four warehouse groups, outbound fees, and packaging can remain open together, like Vercel. The catalog's active orange matches the reference; rates and group contents are unchanged.
- About: remove the first factory/map banner from VI/EN/ES in both the Vercel demo and WordPress theme. Output cleanup also handles existing saved managed HTML without rewriting database content.
- Theme version and shared asset cache keys: `1.2.24`.

## Recordings

| Paired recording timestamps | Reviewed behavior |
| --- | --- |
| 17:12:37 / 17:13:07 | Homepage View All opens the reference News archive |
| 17:14:16 / 17:15:03 | All four Read Analysis links open that archive |
| 17:28:08 / 17:28:45 | Fulfillment quick links and pricing sections |
| 17:30:19 / 17:30:55 | USPS pricing section and calculator navigation |
| 17:31:43 / 17:34:21 / 17:34:57 | Outbound/packaging expansion, warehouse/returns groups, and policy navigation |

## Validation

- Local WordPress: 24 page/viewport combinations (home, About, Fulfillment, Knowledge; VI/EN/ES; 2048 px and 390 px). HTTP 200, no horizontal overflow or JavaScript errors, correct news destinations, normal Home highlight, removed banner, visible pricing headings, and input retention.
- Six legacy section bookmarks: correct canonical destinations and headings visible below the actual sticky header.
- Warehouse/returns: six language/viewport combinations (VI/EN/ES, 2560 px and 390 px). All four groups and 18 fee rows render, independent expansion/collapse works, outbound and packaging stay open together, and section navigation retains pricing state and calculator input.
- Six reference article routes: HTTP 200, article content/images load, sharing points at the current site. Unknown article routes remain HTTP 404.
- News archive: six cards, three desktop columns, responsive mobile layout, loaded assets, working mobile menu. Main desktop geometry differs from the live reference by less than one pixel due to fractional grid widths.
- Reference image paths are shortened within the new bundle to avoid Windows path-length failures. Inline image backgrounds and article images resolve locally.
- Consultation video: same-time browser comparisons at 4, 5, and 9.5 seconds match source dimensions, frame dimensions, fit, position, and transform. Screenshots inspected locally.
- PHP syntax: all 14 theme PHP files pass. Changed JavaScript syntax passes. `npm.cmd run build` generates 68 SEO routes. `git diff --check` passes.
- Existing local Knowledge Elementor documents retain their four top-level containers and nested structure. No database import or document update is performed.

The existing optional CTA REST lookups can return 404 when their database partial is absent; their bundled fallback renders. Those known lookups were excluded from unexpected HTTP-error assertions.

## Package and deployment limit

`speego-logistics-theme-v1.2.24.zip`: 263 entries, 75,862,835 bytes. CRC checked; every archived file compared byte-for-byte with the reviewed source.

SHA-256: `11661298947641d4370e0b19de448c0c55a79e0538eca014f2a84b328a23608d`.

WordPress staging at `https://speegowebvercel.wpcomstaging.com/vi/` refused the connection from this environment (WinError 10061). This release has not been installed there and WordPress.com cache has not been cleared. Recheck the reviewed pages after installation/cache clearing; local checks do not certify the entire staging site as identical to Vercel.

Uploading a theme ZIP does not transfer Elementor document layers stored in the WordPress database. The local layer audit therefore does not establish that staging has the same documents.
