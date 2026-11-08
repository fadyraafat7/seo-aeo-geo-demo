export const strategies = {
  SEO: {
    name: 'Search engine optimization', color: 'purple', icon: 'search',
    line: 'Make your page easy to discover.',
    description: 'Help search engines crawl, understand, and index your content. Start with useful HTML and clear page metadata.',
    label: 'A clear title + crawlable content',
    why: 'The title describes the page, the canonical identifies its preferred URL, and pre-rendering puts the article in the initial HTML response.',
    file: 'src/site.js · scripts/prerender.mjs',
    code: `// Page metadata is written into the initial HTML.\n<title>React SEO, AEO & GEO | Signal Lab</title>\n<meta name="description" content="A practical React guide..." />\n<link rel="canonical" href="https://your-domain.com/" />\n\n// At build time, React becomes real HTML.\nconst html = renderToString(<App />);`,
    details: [
      ['Pre-rendered HTML', 'The build renders React to HTML before deployment. The article remains readable with JavaScript disabled.'],
      ['Unique metadata', 'A descriptive title and description explain this page. A canonical signals the preferred URL; it is not a ranking guarantee.'],
      ['Discovery files', 'The generated sitemap lists the public page. robots.txt permits crawling; neither file guarantees indexing.'],
    ],
  },
  AEO: {
    name: 'Answer engine optimization', color: 'blue', icon: 'message',
    line: 'Give the question a useful answer.',
    description: 'Structure real answers around the questions your audience asks. Be direct first, then provide context and practical steps.',
    label: 'A direct answer, followed by depth',
    why: 'The article starts with a real question and a self-contained answer. Clear steps and visible FAQs help readers and answer systems understand the page.',
    file: 'src/App.jsx · ExampleArticle',
    code: `<article aria-labelledby="article-title">\n  <h2 id="article-title">\n    How do you make a React page discoverable?\n  </h2>\n  <p>Pre-render the main content, add descriptive metadata,\n     and answer the visitor’s question with useful evidence.</p>\n  <h3>Start with these three steps</h3>\n  <ol>...</ol>\n</article>`,
    details: [
      ['Question-led headings', 'Use the language of a genuine user question. Describe the section accurately instead of repeating keywords.'],
      ['Answer first', 'The opening paragraph can stand on its own. Follow it with steps, context, and the limits of your advice.'],
      ['Accessible FAQs', 'Native details elements keep answers in the HTML and work without JavaScript. FAQ markup is not a shortcut to rich results.'],
    ],
  },
  GEO: {
    name: 'Generative engine optimization', color: 'green', icon: 'spark',
    line: 'Build something worth referencing.',
    description: 'Make content useful as a source: clear entities, accurate claims, first-hand evidence where available, and links to original references.',
    label: 'Transparent sources + clear attribution',
    why: 'The example identifies its publisher, cites original documentation, and states its limitations. Article JSON-LD describes the visible content without promising AI citations.',
    file: 'src/site.js · structuredData()',
    code: `{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "How do you make a React page discoverable?",\n  "author": { "@id": "https://your-domain.com/#organization" },\n  "mainEntityOfPage": "https://your-domain.com/",\n  "inLanguage": "en"\n}`,
    details: [
      ['Traceable claims', 'References link to original React, Vite, and Google documentation. No made-up performance numbers or testimonials.'],
      ['Clear entities', 'Organization and Article JSON-LD describe the publisher and article. This single-page site has no breadcrumb hierarchy to mark up.'],
      ['Honest boundaries', 'This is a teaching example. Clear structure and credible evidence can help, but no implementation guarantees an AI mention or citation.'],
    ],
  },
};

export const tools = [
  { name: 'Google Search Console', category: 'SEO', icon: 'chart', label: 'Search visibility', description: 'Inspect a URL and track search impressions, clicks, CTR, and average position.', limitation: 'Needs a verified public site. Data can take time to appear.', href: 'https://search.google.com/search-console/about', cta: 'Open Search Console' },
  { name: 'PageSpeed Insights', category: 'SEO', icon: 'gauge', label: 'Performance', description: 'Review Lighthouse lab diagnostics and real-user Core Web Vitals when field data is available.', limitation: 'A lab result is not a ranking score. New sites may have no field data.', href: 'https://pagespeed.web.dev/', cta: 'Check performance' },
  { name: 'Rich Results Test', category: 'SEO', icon: 'code', label: 'Structured data', description: 'Validate structured data types supported by Google. Paste a public URL or your generated HTML.', limitation: 'Valid markup does not guarantee a rich result or an AI citation.', href: 'https://search.google.com/test/rich-results', cta: 'Validate markup' },
  { name: 'Answer review worksheet', category: 'AEO', icon: 'message', label: 'Answer visibility', description: 'Use a fixed set of questions. Record the engine, date, exact prompt, page citation, and answer accuracy.', limitation: 'A repeatable sample, not a universal AEO score. Results vary by context.', href: '/answer-review.csv', cta: 'Download worksheet', download: true },
  { name: 'Bing Webmaster Tools', category: 'GEO', icon: 'spark', label: 'AI citations', description: 'Use AI Performance, where available, to review citation trends across supported Microsoft AI experiences.', limitation: 'Coverage is limited to supported experiences. Citations are not visits.', href: 'https://www.bing.com/webmasters/about', cta: 'Open Webmaster Tools' },
  { name: 'Google Analytics 4', category: 'GEO', icon: 'chart', label: 'Visits & outcomes', description: 'Review referral traffic and key events to see whether discoverability brings useful visits.', limitation: 'Only measures collected visits. It cannot see mentions with no click or reliably identify every AI referral.', href: 'https://marketingplatform.google.com/about/analytics/', cta: 'Explore Analytics' },
];

export const sources = [
  ['JavaScript SEO basics', 'Google Search Central', 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics'],
  ['AI features and your website', 'Google Search Central', 'https://developers.google.com/search/docs/appearance/ai-features'],
  ['Server rendering & pre-rendering', 'Vite documentation', 'https://vite.dev/guide/ssr'],
  ['renderToString reference', 'React documentation', 'https://react.dev/reference/react-dom/server/renderToString'],
  ['AI Performance reporting', 'Bing Webmaster Tools', 'https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c'],
];
