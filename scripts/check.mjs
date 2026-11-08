import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { getSiteUrl, site } from '../src/site.js';

const html = await fs.readFile('dist/index.html', 'utf8');
const checks = [];
function check(name, callback) { callback(); checks.push(name); console.log(`PASS ${name}`); }
check('Initial HTML contains the article, answer, sources, and FAQs', () => {
  for (const content of ['How do you make a React page discoverable?', 'Pre-render your main content into HTML', 'JavaScript SEO guide', 'Can I measure everything while running locally?']) assert.ok(html.includes(content), content);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(!html.includes('<!--app-html-->'));
});
check('Title, description, canonical, and social metadata are present', () => {
  assert.ok(html.includes(site.description));
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('name="twitter:card"'));
  const url = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(url); assert.equal(new URL(url).protocol, 'https:');
});
check('JSON-LD is parseable and agrees with visible content and canonical', () => {
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]);
  const article = data['@graph'].find(item => item['@type'] === 'Article');
  assert.ok(html.includes(article.headline));
  assert.equal(article.mainEntityOfPage, html.match(/rel="canonical" href="([^"]+)"/)[1]);
  assert.deepEqual(data['@graph'].map(item => item['@type']), ['Organization', 'Article']);
});
check('Single home page does not claim a nonexistent breadcrumb hierarchy', () => {
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data['@graph'].some(item => [].concat(item['@type']).includes('BreadcrumbList')), false,
    'Do not add BreadcrumbList until a real page hierarchy exists.');
  assert.ok(!html.includes('Organization, Article, and BreadcrumbList'));
  const ids = new Set(data['@graph'].map(item => item['@id']));
  const article = data['@graph'].find(item => item['@type'] === 'Article');
  assert.ok(ids.has(article.author['@id']));
  assert.ok(ids.has(article.publisher['@id']));
});
const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
const robots = await fs.readFile('dist/robots.txt', 'utf8');
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
check('Crawler files use the same public origin', () => {
  assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});
check('No public-page noindex directive or placeholder render marker', () => {
  assert.ok(!/<meta[^>]*name="robots"[^>]*noindex/.test(html));
  assert.ok(!html.includes('<!--app-head-->'));
});
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) await fs.access(`dist${match[1]}`);
check('Production asset references resolve to generated files', () => {
  assert.ok(/src="\/assets\/.+\.js"/.test(html));
});
check('Tab panel uses a compatible element and fonts are discovered from the document head', () => {
  assert.match(html, /<div class="lens-explainer [^"]+" id="lens-panel" role="tabpanel"/);
  assert.match(html, /<link[^>]+rel="preconnect"[^>]+fonts\.googleapis\.com/);
  assert.match(html, /<link[^>]+fonts\.googleapis\.com\/css2[^>]+rel="stylesheet"/);
});
check('Public origin configuration rejects unsafe or invalid values', () => {
  assert.equal(getSiteUrl('https://demo.test'), 'https://demo.test');
  for (const input of ['http://demo.test', 'https://demo.test/path', 'https://user:pass@demo.test', 'https://demo.test?x=1', 'bad']) assert.throws(() => getSiteUrl(input));
});
await fs.access('dist/answer-review.csv');
console.log(`\n${checks.length} checks passed. HTML is readable without executing JavaScript.`);
console.log('These checks do not measure rankings, field performance, answer inclusion, or AI citations.');
