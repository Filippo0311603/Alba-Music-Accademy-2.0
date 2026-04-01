import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.SITE_URL || 'https://alba-music-academy.vercel.app';
const today = new Date().toISOString().slice(0, 10);

const publicRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/chi-siamo', changefreq: 'monthly', priority: '0.8' },
  { path: '/la-sede', changefreq: 'monthly', priority: '0.8' },
  { path: '/hollywood-recording-studio', changefreq: 'weekly', priority: '0.8' },
  { path: '/le-nostre-sale', changefreq: 'weekly', priority: '0.9' },
  { path: '/corsi/musica', changefreq: 'weekly', priority: '0.9' },
  { path: '/corsi/cinema', changefreq: 'weekly', priority: '0.9' },
];

function toUrl(routePath) {
  if (routePath === '/') {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${routePath}`;
}

function buildSitemapXml() {
  const entries = publicRoutes
    .map(
      (route) => `  <url>\n    <loc>${toUrl(route.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const sitemap = buildSitemapXml();
const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`Sitemap generated at ${outputPath}`);
