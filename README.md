# Signal Lab — React SEO, AEO & GEO example

An English learning site built with React and Vite. It explains each optimization alongside a working article, source snippets, original references, local implementation checks, and a measurement toolkit.

## Run locally

Requires Node.js 22.12+ (tested with Node 22.17).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. The development server renders the initial article on the server; the browser hydrates it for interactions.

## Build and verify

```sh
npm run build
npm run check
npm run preview
```

The production build generates static HTML in `dist/`. It does not require a Node server in production. `npm run check` inspects that generated HTML, metadata, schema, crawler files, and asset references. The browser's “Run page checks” button inspects the current DOM; it is not a performance, ranking, or citation test.

### Reproduce the local measurements

```sh
npm run audit:local
```

Requires a local Chrome installation (or set the standard `CHROME_PATH` environment variable). The command builds and checks the project, starts an isolated Vite production preview at `127.0.0.1:4175`, runs Lighthouse once for mobile and desktop, and saves HTML/JSON reports plus `summary.json` in `artifacts/lighthouse/`. It also checks the HTTP responses for the page, crawler files, worksheet, and a missing URL. The audit closes its own preview and temporary Chrome instance in a `finally` block; it does not use your browser profile.

These are laboratory measurements, not real-user Core Web Vitals, Google rich-result validation, live rankings, or AI citation measurements. Vite preview is an SPA preview: a missing URL may return the home page with HTTP 200. Configure your real static host to return 404 for missing pages. External font availability can affect the measured result; inspect network warnings in the report.

The saved measurements and prioritized findings are explained in Arabic in [artifacts/lighthouse/RESULTS.md](artifacts/lighthouse/RESULTS.md). The report also records dependency advisories affecting the audit tooling; check them before upgrading or reusing that tooling. Production dependency audit results are recorded separately.

## What each part does

| File | Purpose | Why it matters |
| --- | --- | --- |
| `src/App.jsx` | Semantic article, direct answer, visible FAQs, references, tabs, tool filters, URL launcher, and document checks | Useful content for people; structured answers and evidence for discovery systems |
| `src/content.js` | English explanations, illustrative snippets, tool descriptions, and primary-source links | Explains SEO, AEO, and GEO without presenting them as guaranteed outcomes |
| `src/site.js` | Title, description, canonical, Open Graph, Twitter card, and JSON-LD | Defines page identity and descriptive machine-readable metadata |
| `src/entry-server.jsx` | Uses React `renderToString` | Produces readable article HTML before client JavaScript executes |
| `scripts/prerender.mjs` | Inserts rendered HTML and head tags into the production output | Static generation: crawlers and readers receive content in the first response |
| `src/entry-client.jsx` | Uses React `hydrateRoot` | Adds interactivity to the existing HTML rather than starting with an empty root |
| `scripts/files.mjs` | Generates `robots.txt` and `sitemap.xml` | Allows crawling and lists the public canonical URL |
| `scripts/dev.mjs` | Development SSR with Vite middleware | Local source HTML also includes the article and metadata |
| `scripts/check.mjs` | Inspects built output with Node assertions | Catches missing content, inconsistent URLs, malformed JSON-LD, and missing assets |
| `public/answer-review.csv` | Downloadable question-review worksheet | Helps record repeated, contextual answer and citation observations |
| `src/styles.css` | Responsive design, visible keyboard focus, reduced motion | Supports readable and accessible use on desktop and mobile |

### SEO implementation

The article is in the initial HTML, with a unique title, description, absolute canonical, one main h1, meaningful links, and semantic sections. Open Graph and Twitter metadata describe shared links; they are not ranking signals. `Organization` and `Article` JSON-LD match visible entities and content. This is an educational publisher, not an invented expert or business with fabricated credentials.

This project has one home page, so it intentionally emits no `BreadcrumbList`. A single-item list does not meet Google's breadcrumb rich-result requirements. Add a breadcrumb only when real pages form a visible navigation hierarchy with at least two distinct entries. The build checks guard against reintroducing a breadcrumb on this single home page. Reference: [Google breadcrumb requirements](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

### AEO implementation

The example leads with a genuine question and a direct answer. Numbered steps add detail. Native `<details>` FAQs keep every answer in the original HTML and remain usable without JavaScript. No `FAQPage` markup or featured-snippet guarantee is claimed.

### GEO implementation

The article identifies its publisher, links to original documentation, and distinguishes implementation from measured results. These are source-quality practices; no special GEO tag or schema ensures inclusion. Google says no special AI files or schema are required for its AI search features. Other engines have their own behavior and access policies.

## Measurement tools and their limits

| Tool | What to use it for | Limits / setup |
| --- | --- | --- |
| [Google Search Console](https://search.google.com/search-console/about) | Index inspection, impressions, clicks, CTR, average position | Verify your public site; reporting is delayed and not a universal rank |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Lab diagnostics and Core Web Vitals field data when available | Remote testing needs a public URL; field data needs sufficient real users |
| Chrome DevTools Lighthouse | Local performance, accessibility, and SEO diagnostics | Lab runs vary with device/throttling; SEO audit coverage is limited |
| [Rich Results Test](https://search.google.com/test/rich-results) | Supported Google structured-data validation | Paste HTML using Code mode for a local project; validity does not guarantee display |
| [Schema Markup Validator](https://validator.schema.org/) | General schema.org vocabulary validation | Broader than Google eligibility; not an AI citation test |
| Answer review worksheet | A fixed set of questions across engines, dated citations, accuracy | Manually record engine, mode/model, locale, exact prompt, citation and answer URL; no universal AEO/GEO score |
| [Bing Webmaster Tools](https://www.bing.com/webmasters/about) | Indexing and AI Performance citation trends where available | Verify a site; coverage is limited to supported Microsoft experiences, not all AI systems |
| [Google Analytics 4](https://marketingplatform.google.com/about/analytics/) | Referral visits and key events after installing your own analytics | No tag is installed here. Clickless mentions are invisible and referrer data can be incomplete |

Categories overlap: performance and structure support all three approaches. The UI tool filters are learning categories, not exclusive boundaries.

The public-URL form only prepares external links. It does not call tool APIs, run remote audits, or collect analytics. Opening a prepared link passes your entered URL to that external tool. Use Lighthouse locally for localhost, and Rich Results Test's Code mode for generated HTML.

## Before publishing

1. Copy `.env.example` to `.env`, then set `SITE_URL=https://your-real-domain.com`.
2. Replace demo publisher information and article content with accurate information about your site. Keep schema in sync with visible text.
3. Rebuild: `npm run build` and `npm run check`.
4. Host `dist/` on a static host with HTTPS. Serve `/` as HTTP 200. Configure missing paths to return HTTP 404 with `404.html`; avoid an SPA catch-all that returns 200 for nonexistent URLs. Vite preview is a local preview, not a production hosting policy.
5. View Page Source on the published URL and inspect title, canonical, article text, JSON-LD, `/robots.txt`, and `/sitemap.xml`.
6. Verify Search Console and Bing Webmaster Tools, submit your sitemap, and inspect the public URL. Connect your own analytics if desired, respecting applicable privacy requirements.
7. Establish a baseline, then record search results, answer/citation samples, referrals, and useful outcomes over time.

`https://example.com` is deliberately a placeholder. Local success says nothing about indexing, rankings, field performance, or AI inclusion. Google Fonts is an optional external styling resource; the site has system-font fallbacks. All core content and icons are local.

## Original references

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Vite: Server-side rendering and pre-rendering](https://vite.dev/guide/ssr)
- [React: renderToString](https://react.dev/reference/react-dom/server/renderToString)
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Bing: AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
