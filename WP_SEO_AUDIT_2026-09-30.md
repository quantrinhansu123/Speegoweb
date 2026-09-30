# WordPress SEO audit — 2026-09-30

Site checked: `https://speegowebvercel.wpcomstaging.com/` (theme 1.2.6 during the first audit; the user subsequently installed 1.2.7). See the follow-up below for current counts and the prepared 1.2.8 release.

## Findings

- Lighthouse SEO on `/vi/kho-van/`: **69/100**. The only failing scored audit was **Page is blocked from indexing**. The live `/robots.txt` returned `User-agent: *` and `Disallow: /`. The other scored SEO audits passed. WordPress.com says plugin-enabled sites on the default `.wpcomstaging.com` domain are not indexed by default; a custom domain is the recommended route for a public site. [WordPress.com SEO](https://wordpress.com/support/seo/), [Lighthouse indexability audit](https://developer.chrome.com/docs/lighthouse/seo/is-crawlable/).
- Crawled all **57** fixed VI/EN/ES theme URLs: no missing or duplicate title, meta description, H1, canonical, image `alt`, or broken hreflang reciprocity in the HTML response. All returned HTTP 200. The JSON-LD scripts present were valid JSON. This checks technical markup, not keyword relevance or content quality.
- The live sitemap had **59** URLs during this first audit: 57 fixed routes plus published Posts `/2026/09/29/test/` and `/2026/09/27/hello-world/`. The follow-up audit found 57 URLs; the sample Posts were no longer in the sitemap.
- A nonexistent URL returned **HTTP 200** with an empty generic page (soft 404). Theme 1.2.7 adds a real, localized 404 response.
- Theme 1.2.7 also makes its `robots.txt` output and homepage robots meta follow WordPress `blog_public`. WordPress.com can still serve a platform-level robots file before PHP; the theme cannot override that response.

## Before public launch

1. Install the prepared theme 1.2.8 and verify a made-up URL returns HTTP 404. Keep the default `.wpcomstaging.com` address blocked while it is only for review.
2. When publishing on the intended custom domain, check **Settings → Reading → Site Visibility** is public and “Discourage search engines from indexing this site” is off. Confirm `https://YOUR-DOMAIN/robots.txt` does not disallow `/`, and that canonical and sitemap URLs use the same domain. [WordPress.com visibility](https://wordpress.com/support/privacy-settings/make-your-website-public/).
3. Set up [Google Search Console](https://search.google.com/search-console/about) for the public domain, submit `/sitemap.xml`, and use URL Inspection on a VI, EN and ES page. [Google Search Console help](https://support.google.com/webmasters/answer/7451001).

For deeper site-wide technical checks, [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) audits links, response codes, redirects, headings and metadata. The free edition crawls up to 500 URLs, enough for the current 59 URL sitemap. It respects `robots.txt`; ignoring a disallow requires its paid configuration, so run its free crawl after the public domain is crawlable. [Screaming Frog robots guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/general/).

Lighthouse 100 is an audit score, not a promise of Google ranking. Recheck on the public domain after the platform's crawl block is removed.

## Follow-up: live links, assets, Screaming Frog and Search Console

- The current `/robots.txt` still returns `User-agent: *` and `Disallow: /`. `/sitemap.xml` currently lists **57 URLs**.
- A direct HTTP link audit of those 57 pages found **1,151 internal anchor occurrences** pointing to **70 distinct same-site targets**. No sitemap URL lacked an incoming anchor. Eight target URLs redirected. A separate asset audit checked **75 distinct same-site image, script, stylesheet and poster URLs**; none failed.
- Five distinct link targets returned 404:

  | Target | Links | Status |
  | --- | ---: | --- |
  | `/wp-content/themes/speego-logistics/explore/contact/index.html` | 6 | Homepage CTA fixed in local theme 1.2.8. |
  | `/wp-content/themes/speego-logistics/explore/news/index.html` | 30 | Homepage Knowledge links fixed in local theme 1.2.8. |
  | `/contact/index.html` | 3 | Sourcing reference contact links fixed in local theme 1.2.8. |
  | `/privacy-policy` | 3 | Unresolved: site owner has no approved content or URL. |
  | `/terms-and-conditions` | 3 | Unresolved: site owner has no approved content or URL. |

- The three fixed link types remain broken on live WordPress until theme 1.2.8 is installed. Do not invent legal content for the other two links.
- Screaming Frog SEO Spider 24.3 free edition was run against all 57 live sitemap URLs in List mode. **57/57 were blocked by `robots.txt`**, so the tool did not inspect their HTML. The free edition respects robots rules; its paid edition offers an ignore setting. [Screaming Frog robots guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/general/)
- The same free Screaming Frog CLI crawled **57 local WordPress-theme preview URLs**: 57 HTTP 200, zero 4xx, with a title, meta description and H1 on every page. Titles and descriptions were unique. Seven H1 strings were reused across related route or language pages, a content review item. This local preview does not include WordPress database content or platform cache behavior; it is not a live-site crawl.
- Google Search Console private reports and URL Inspection require access to a verified property. No verified property or account access was supplied, so indexing state, sitemap submission, Google-selected canonicals, Core Web Vitals and search performance **were not verified**. [Search Console ownership](https://support.google.com/webmasters/answer/9008080), [URL Inspection](https://support.google.com/webmasters/answer/9012289)
- An ordinary live request to the theme's `style.css` returned cached version **1.2.6**, while a fresh query parameter returned **1.2.7**. This indicates a stale static-file cache. After installing 1.2.8, use **Hosting Dashboard → site → Settings → Caching → Clear all**, then test in a private browser window. An unversioned cached stylesheet is not reliable evidence of the installed theme version. [WordPress.com cache guide](https://wordpress.com/support/clear-your-sites-cache/)

Next: install 1.2.8, purge cache, verify homepage Contact and Knowledge links in VI/EN/ES and the Sourcing reference contact links, and rerun the live link audit. On the final public domain, verify that `robots.txt` allows crawling, submit `/sitemap.xml` in Search Console and inspect one page per language. [WordPress.com SEO](https://wordpress.com/support/seo/)
