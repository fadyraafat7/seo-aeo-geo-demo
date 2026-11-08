# SEO, GEO, and AEO: Implementation Instructions

You are working on the website available in the current project or provided with this file. Audit it, implement appropriate improvements for search engine optimization (SEO), generative engine optimization (GEO), and answer engine optimization (AEO), and verify your changes. Work autonomously using the available codebase, tools, and permissions.

## How to work

1. Inspect the project instructions, architecture, framework, existing SEO configuration, site content, and representative public pages before making changes. Identify the site's purpose, audience, languages, and important user journeys from the available evidence.
2. Identify concrete issues and prioritize fixes by impact. Implement all applicable improvements you can safely verify, rather than only producing recommendations. Adapt to the site's existing framework and conventions; reuse existing functionality and dependencies where practical.
3. Preserve the site's design, behavior, content meaning, accessibility, working URLs, and existing integrations. Avoid unnecessary redesigns, migrations, dependencies, or breaking changes. Do not overwrite user changes.
4. Use real information already available in the project or other verified sources. Never invent business details, authors, credentials, reviews, ratings, prices, statistics, citations, locations, or claims. If essential information is missing, leave an actionable note in your final report and proceed with independent work.
5. If you only have a public URL and no write access, perform the checks available to you and deliver prioritized, specific implementation recommendations. Clearly distinguish observations from assumptions and do not claim changes were made.

## Technical SEO

- Check that important public pages return appropriate status codes, are discoverable through crawlable internal links, and are eligible for indexing. Inspect existing `robots.txt`, robots meta tags, and HTTP directives. Preserve restrictions on private, administrative, authenticated, and intentionally excluded pages.
- Review redirects, broken links, duplicate URLs, HTTPS and host consistency, and canonical URLs. Use page-specific canonical URLs where appropriate; do not canonicalize genuinely different pages to one URL. Preserve existing URLs or add appropriate permanent redirects when a change is necessary and supported.
- Create or repair an XML sitemap when appropriate. Include canonical, public, indexable URLs and exclude private, duplicate, error, and intentionally non-indexable pages. Reference the sitemap in `robots.txt` when appropriate. Generate URLs using the actual configured production origin; do not invent a domain.
- Check that search engines can access the main content, metadata, and navigation, including on JavaScript-heavy pages. Improve rendering or use the framework's server-rendering or static-generation features when an actual problem exists and the change is proportionate.
- For multilingual or regional sites, check document language, text direction, localized canonical URLs, and reciprocal `hreflang` annotations when applicable. Do not invent language versions.

## On-page SEO and content

- Give important indexable pages accurate, distinct page titles and meta descriptions based on their actual content. Use existing framework metadata APIs when available. Avoid duplicate tags and keyword stuffing; do not assume a fixed length guarantees a search-result display.
- Use a clear primary heading and a logical heading hierarchy, descriptive internal link text, accessible image alternatives when useful, and meaningful navigation. Make changes appropriate to the content and page type.
- Improve existing copy when supported by facts: answer the visitor's likely questions directly and clearly, followed by useful detail, context, and evidence. Add relevant FAQs only when they provide genuine user value and their answers can be verified.
- Where appropriate, make real business information, contact details, source attribution, authorship, and update dates easy to find. Do not create unsupported facts or dates.
- Add or correct Open Graph and social-sharing metadata when useful, ensuring URLs and images correspond to the actual page.
- Do not generate large numbers of thin, repetitive, location, or keyword-targeted pages. Do not present estimated keyword volume or difficulty as fact without a reliable current source.

## Structured data, GEO, and AEO

- Add or correct applicable structured data using the site's existing approach or JSON-LD. Consider `Organization`, `LocalBusiness`, `Product`, `Article`, and `BreadcrumbList` only where relevant and supported by real, visible page content. Follow current documentation for the selected types and escape embedded data safely.
- Never fabricate structured data, and do not promise rich results. Validate the markup and distinguish schema validity from eligibility for specific search features.
- Make useful content easy for people and automated systems to understand: use descriptive headings, accurate summaries, clear answers, and evidence where relevant. Do not add repetitive summaries, artificial question blocks, or content solely to target AI systems.
- Do not treat `llms.txt`, special AI markup, or other speculative tactics as required for Google AI search features. Add optional files only when there is a specific, justified use case.
- For local businesses, check that verified name, address, phone number, and opening hours are consistent across available site content. Do not modify external profiles without appropriate access and authorization.

## Experience, measurement, and verification

- Address identifiable mobile usability, accessibility, and performance issues relevant to the changes. Measure performance or Core Web Vitals when suitable tools or real-user data are available; report measurement limitations honestly.
- Use Search Console, analytics, and other available data if access is already provided. Do not create accounts, connect services, deploy, or change external production settings unless explicitly authorized.
- Run appropriate existing tests and build checks. Inspect representative page output, metadata, canonicals, robots directives, sitemap entries, internal links, and structured data affected by the changes. Fix regressions introduced by your work.
- Do not claim guaranteed rankings, indexing, rich results, AI citations, or traffic growth. Search engines determine what they crawl, index, and display.

## Final report

Provide a concise report covering:

1. The most important issues found and improvements implemented, with affected files or pages.
2. Checks and tests performed, including their results and anything you could not verify.
3. Remaining prioritized recommendations and any missing information, permissions, or external actions required.
4. Suggested measurement using available sources, such as indexed pages, impressions, clicks, conversions, and relevant performance data. Identify estimates and limitations; AI citation tracking may be incomplete.

## Optional site context

Use the information below if supplied; otherwise infer what you can from the project and continue.

- Production URL:
- Business and offerings:
- Target audience, locations, and languages:
- Priority pages and conversions:
- Relevant competitors:
- Constraints or pages that must not change:
- Available access: codebase / CMS / analytics / Search Console / public URL only

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google's guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Crawling and indexing](https://developers.google.com/search/docs/crawling-indexing)
- [Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
