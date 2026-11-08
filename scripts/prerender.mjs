import fs from 'node:fs/promises';
import { loadEnv } from 'vite';
import { render } from '../.ssg/entry-server.js';
import { getSiteUrl, renderHead } from '../src/site.js';
import { crawlerFile } from './files.mjs';

const env = loadEnv('production', process.cwd(), '');
const origin = getSiteUrl(process.env.SITE_URL || env.SITE_URL);
const template = await fs.readFile('dist/index.html', 'utf8');
await fs.writeFile('dist/index.html', template.replace('<!--app-head-->', renderHead(origin)).replace('<!--app-html-->', render()));
for (const name of ['robots.txt', 'sitemap.xml']) await fs.writeFile(`dist/${name}`, crawlerFile(`/${name}`, origin));
await fs.writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page not found | Signal Lab</title></head><body><h1>Page not found</h1><a href="/">Return to Signal Lab</a></body></html>');
console.log(`Pre-rendered / with canonical ${origin}/`);
if (origin === 'https://example.com') console.warn('Learning demo: set SITE_URL to your real origin before publishing.');
