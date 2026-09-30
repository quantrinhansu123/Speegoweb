# WordPress SEO audit — 2026-09-30

Site checked: `https://speegowebvercel.wpcomstaging.com/` (theme 1.2.6 live during audit).

## Findings

- Lighthouse SEO on `/vi/kho-van/`: **69/100**. The only failing scored audit was **Page is blocked from indexing**. The live `/robots.txt` returned `User-agent: *` and `Disallow: /`. The other scored SEO audits passed. WordPress.com says plugin-enabled sites on the default `.wpcomstaging.com` domain are not indexed by default; a custom domain is the recommended route for a public site. [WordPress.com SEO](https://wordpress.com/support/seo/), [Lighthouse indexability audit](https://developer.chrome.com/docs/lighthouse/seo/is-crawlable/).
- Crawled all **57** fixed VI/EN/ES theme URLs: no missing or duplicate title, meta description, H1, canonical, image `alt`, or broken hreflang reciprocity in the HTML response. All returned HTTP 200. The JSON-LD scripts present were valid JSON. This checks technical markup, not keyword relevance or content quality.
- The live sitemap had **59** URLs: 57 fixed routes plus published Posts `/2026/09/29/test/` and `/2026/09/27/hello-world/`. Remove or unpublish these sample Posts before a public launch if they are not intended content.
- A nonexistent URL returned **HTTP 200** with an empty generic page (soft 404). Theme 1.2.7 adds a real, localized 404 response.
- Theme 1.2.7 also makes its `robots.txt` output and homepage robots meta follow WordPress `blog_public`. WordPress.com can still serve a platform-level robots file before PHP; the theme cannot override that response.

## Before public launch

1. Install theme 1.2.7 and verify a made-up URL returns HTTP 404. Keep the default `.wpcomstaging.com` address blocked while it is only for review.
2. When publishing on the intended custom domain, check **Settings → Reading → Site Visibility** is public and “Discourage search engines from indexing this site” is off. Confirm `https://YOUR-DOMAIN/robots.txt` does not disallow `/`, and that canonical and sitemap URLs use the same domain. [WordPress.com visibility](https://wordpress.com/support/privacy-settings/make-your-website-public/).
3. Set up [Google Search Console](https://search.google.com/search-console/about) for the public domain, submit `/sitemap.xml`, and use URL Inspection on a VI, EN and ES page. [Google Search Console help](https://support.google.com/webmasters/answer/7451001).

For deeper site-wide technical checks, [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) audits links, response codes, redirects, headings and metadata. The free edition crawls up to 500 URLs, enough for the current 59 URL sitemap. It respects `robots.txt`; ignoring a disallow requires its paid configuration, so run its free crawl after the public domain is crawlable. [Screaming Frog robots guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/general/).

Lighthouse 100 is an audit score, not a promise of Google ranking. Recheck on the public domain after the platform's crawl block is removed.
