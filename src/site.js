export const site = {
  name: 'Signal Lab',
  title: 'React SEO, AEO & GEO: A Practical Example | Signal Lab',
  description: 'Explore a pre-rendered React example with SEO metadata, direct answers, cited sources, structured data, and practical tools to measure search and AI visibility.',
  path: '/',
};

export function getSiteUrl(value = 'https://example.com') {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be a public HTTPS origin, such as https://your-domain.com');
  }
  return url.origin;
}

export function structuredData(origin) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${origin}/#organization`, name: site.name, url: origin },
      {
        '@type': 'Article', '@id': `${origin}/#article`,
        headline: 'How do you make a React page discoverable?',
        description: 'A practical guide to pre-rendering, metadata, direct answers, and evidence in a React page.',
        mainEntityOfPage: `${origin}/`, inLanguage: 'en',
        author: { '@id': `${origin}/#organization` },
        publisher: { '@id': `${origin}/#organization` },
        about: ['React', 'Search engine optimization', 'Answer engine optimization', 'Generative engine optimization'],
      },
      // This is a single home page: there is no real breadcrumb hierarchy.
      // Only add BreadcrumbList to a future page with an actual visible trail
      // and at least two distinct entries, as required for Google eligibility.
    ],
  };
}

export function renderHead(origin) {
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const json = JSON.stringify(structuredData(origin)).replaceAll('<', '\\u003c');
  return `
    <title>${escape(site.title)}</title>
    <meta name="description" content="${escape(site.description)}" />
    <link rel="canonical" href="${origin}/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escape(site.title)}" />
    <meta property="og:description" content="${escape(site.description)}" />
    <meta property="og:url" content="${origin}/" />
    <meta property="og:site_name" content="${site.name}" />
    <meta name="twitter:card" content="summary" />
    <script type="application/ld+json">${json}</script>`;
}
