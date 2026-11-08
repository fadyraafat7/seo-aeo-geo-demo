import fs from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';
import { preview } from 'vite';

// Audit the built site, not Vite's development server or a user's browser profile.
// Lighthouse creates a separate temporary Chrome profile and removes it on exit.
const outputDirectory = path.resolve(process.env.LIGHTHOUSE_OUTPUT_DIR || 'artifacts/lighthouse');
await fs.mkdir(outputDirectory, { recursive: true });
await fs.access('dist/index.html');
const server = await preview({
  configFile: false,
  preview: { host: '127.0.0.1', port: 4175, strictPort: true, open: false },
});
const url = 'http://127.0.0.1:4175/';
let chrome;
try {
  const responses = [];
  for (const route of ['/', '/robots.txt', '/sitemap.xml', '/answer-review.csv', '/missing-audit-page']) {
    const response = await fetch(new URL(route, url));
    responses.push({ path: route, status: response.status, type: response.headers.get('content-type') });
    await response.arrayBuffer();
  }
  console.log('Production-preview HTTP checks:', JSON.stringify(responses));
  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-first-run', '--no-default-browser-check'],
    logLevel: 'silent',
  });
  const reports = [];
  for (const [name, config] of [['mobile', undefined], ['desktop', desktopConfig]]) {
    console.log(`Running ${name} Lighthouse audit...`);
    const result = await lighthouse(url, {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }, config);
    if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message || 'Lighthouse returned no report');
    const { lhr } = result;
    await fs.writeFile(path.join(outputDirectory, `${name}.html`), result.report[0]);
    await fs.writeFile(path.join(outputDirectory, `${name}.json`), result.report[1]);
    const summary = {
      device: name, lighthouseVersion: lhr.lighthouseVersion, fetchedAt: lhr.fetchTime,
      scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
      metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']
        .map(key => [key, { value: lhr.audits[key]?.numericValue, display: lhr.audits[key]?.displayValue }])),
      warnings: lhr.runWarnings,
      issues: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 1 && !['manual', 'notApplicable', 'informative'].includes(audit.scoreDisplayMode))
        .map(audit => ({ id: audit.id, title: audit.title, score: audit.score, display: audit.displayValue, details: audit.details })),
    };
    reports.push(summary);
    console.log(JSON.stringify({ device: name, scores: summary.scores, metrics: summary.metrics }, null, 2));
  }
  await fs.writeFile(path.join(outputDirectory, 'summary.json'), JSON.stringify({
    url, httpChecks: responses, reports,
    limits: 'Single lab run per device against the production build on localhost. Not real-user data, Google rich-result validation, a ranking score, or an AEO/GEO citation measurement.',
  }, null, 2));
  console.log(`Reports saved in ${outputDirectory}`);
} finally {
  if (chrome) await chrome.kill();
  server.httpServer.closeAllConnections?.();
  await new Promise(resolve => server.httpServer.close(resolve));
}
