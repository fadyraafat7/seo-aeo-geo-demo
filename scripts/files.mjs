export function crawlerFile(path, origin) {
  if (path === '/robots.txt') return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`;
}
