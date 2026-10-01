# Vercel demo photo sources

Updated 2026-10-02. This refresh changes only the static Vercel demo; the WordPress theme and release ZIP are unchanged.

## US office photo

- Asset: `us-office-team.webp`
- Photographer: Daniel & Hannah Snipes (Prolific People).
- Source: [Team Meeting at Greenville Office, Pexels #30004356](https://www.pexels.com/photo/team-meeting-at-greenville-office-30004356/).
- Source location: Greenville, South Carolina, United States.
- Source metadata: Canon EOS 90D; photographed 2024-12-20; published 2024-12-30.
- [Pexels license](https://www.pexels.com/license/) allows website use and modifications. This is an illustrative stock photo, not a claim that the depicted people are SpeeGo employees.
- Downloaded original from `https://images.pexels.com/photos/30004356/pexels-photo-30004356.jpeg` and converted locally to WebP. No AI generation or retouching.

## SpeeGo Houston photos

The seven facility photos below were supplied by the user for this demo. They show the storefront, office, meeting room, and warehouse. Original attachments remain local; only optimized web assets are committed.

| Asset | User attachment | Size |
| --- | --- | --- |
| `speego-houston-storefront.webp` | `1790851072391_5508196854194098654_g5270398983686685067_30e432f98f3c29563b43f3f8714eb04c.jpg` | 1600×1200, 104,182 bytes |
| `speego-houston-office.webp` | `1790851072413_5508196854194098654_g5270398983686685067_af10ad7f7cb33b6d8d8a455d0d237856.jpg` | 1600×1200, 260,250 bytes |
| `speego-houston-meeting-room.webp` | `1790851072407_5508196854194098654_g5270398983686685067_4adf7adca9f6ec60ab889ec3fc188a35.jpg` | 1600×1200, 193,584 bytes |
| `speego-houston-warehouse.webp` | `1790851072417_5508196854194098654_g5270398983686685067_3e07e01de468c66ab28fb0cfe6abe981.jpg` | 1600×1200, 309,890 bytes |
| `speego-houston-storage.webp` | `1790851072421_5508196854194098654_g5270398983686685067_d4843fede85488235d945fcf6385bcee.jpg` | 1600×1200, 265,648 bytes |
| `speego-houston-packing.webp` | `1790851072423_5508196854194098654_g5270398983686685067_ff582f7d5303424b1058fe3bf5b8b2f1.jpg` | 1600×1200, 233,488 bytes |
| `speego-houston-cartons.webp` | `1790851072425_5508196854194098654_g5270398983686685067_329c8852b9528fe002e2f7c5dc6a0551.jpg` | 1600×1200, 360,776 bytes |

All files live in `explore/assets/photos/`. Processing: EXIF orientation, proportional resize to at most 1600×1200, WebP quality 82. No invented racks, staff, or warehouse operations were added.

## Coverage

- Home introduction: real US office stock photograph. Tracking dialog: actual SpeeGo storefront.
- About pages: actual Houston office, storefront, and meeting room.
- Fulfillment hero and gallery: actual warehouse and cartons, replacing the generic rack photos and generated Houston gallery images.
- Repeated warehouse images in services and Knowledge pages use the same facility assets; manufacturing-specific OEM/QC cards retain manufacturing illustrations.
- VI, EN, and ES pages, hash routes, and generated public routes are updated together.

## Asset integrity

| Asset | SHA-256 |
| --- | --- |
| `us-office-team.webp` | `a83a47b046f3dbe367d104dab961be802d650da87333009fe8da6072a8f0b5cc` |
| `speego-houston-storefront.webp` | `b85c0f82ada10728545d4724b127369463d1149cfa762a2b104b947f80b1c20c` |
| `speego-houston-office.webp` | `f96f41e15354e97263af5aa5e8d34d2b541571b8504f12bb04b5c7d06d81f5e9` |
| `speego-houston-meeting-room.webp` | `7cc1eb6baa53a94bae47f8c4396acefaa56883e27003a47b3270d86b3cb6cf63` |
| `speego-houston-warehouse.webp` | `4b9bd9e7ab7ec886dff24a4ed796ab89f3a9af9a7675012c1219cebf5edc77cc` |
| `speego-houston-storage.webp` | `b36ad7aa0d9a2b933bd5bd017afd6fbba97a66f4266c1d0d233867134b66532d` |
| `speego-houston-packing.webp` | `815af4b3369acca9150ce55eb0ba67c0f2b8e32da7d7c74b1efc0b9b1879dd40` |
| `speego-houston-cartons.webp` | `ad0576988a2aeee79309dc24cb51482b3de0314b157405e6ddc1acfdaa63fac0` |

## Validation

- `npm.cmd run build`: passed; 68 static SEO routes plus locale home/about/contact pages generated.
- Fresh build: 62 active index pages checked; all 129 image `src` references to the new assets resolve locally; no retired team, rack, or generated Houston gallery references in these pages.
- 18 public page/viewport combinations (home, About, Fulfillment; VI/EN/ES; 1440 px and 390 px): new photos load, no horizontal overflow or JavaScript errors.
- The About vision background had a pre-existing relative path failure; replaced with the supplied office photo and rechecked all six About combinations: no local HTTP errors.
- 12 hash-route/viewport combinations for home and Fulfillment: passed.
- Three mobile tracking dialogs (VI/EN/ES): actual storefront photo loads; open and Escape-close pass.
- JavaScript syntax and `git diff --check`: passed.
- WordPress theme files unchanged.
