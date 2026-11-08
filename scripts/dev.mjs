import http from 'node:http';
import fs from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';
import { getSiteUrl, renderHead } from '../src/site.js';

const env = loadEnv('development', process.cwd(), '');
const origin = getSiteUrl(process.env.SITE_URL || env.SITE_URL);
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/robots.txt' || path === '/sitemap.xml') {
    const { crawlerFile } = await import('./files.mjs');
    res.setHeader('Content-Type', path.endsWith('.xml') ? 'application/xml' : 'text/plain');
    res.end(crawlerFile(path, origin));
    return;
  }
  vite.middlewares(req, res, async () => {
    try {
      if (path !== '/') { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Page not found'); return; }
      let template = await fs.readFile('index.html', 'utf8');
      template = await vite.transformIndexHtml(req.url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const html = template.replace('<!--app-head-->', renderHead(origin)).replace('<!--app-html-->', render());
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.writeHead(500); res.end('Rendering error. See terminal.');
    }
  });
});
const port = Number(process.env.PORT || 5173);
server.listen(port, '127.0.0.1', () => console.log(`Signal Lab: http://127.0.0.1:${port}/`));
async function close() { server.close(); await vite.close(); }
process.on('SIGINT', () => { close().then(() => process.exit()); });
process.on('SIGTERM', () => { close().then(() => process.exit()); });
