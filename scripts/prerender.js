import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';
import { getSeoRoutes } from '../src/data/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

async function runPrerender() {
  console.log('Starting prerendering process...');

  // Start a local Express server to serve the SPA
  const app = express();
  
  app.use(express.static(DIST_DIR));
  
  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Static server running on port ${PORT}`);
    
    try {
      const browser = await puppeteer.launch({ headless: 'new' });
      const routes = getSeoRoutes();
      console.log(`Found ${routes.length} SEO routes to prerender.`);

      for (const route of routes) {
        console.log(`Prerendering ${route}...`);
        const page = await browser.newPage();
        
        // Suppress navigation timeout errors, wait until network is mostly idle
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Optional: wait an extra moment for React to fully mount and render components
        await new Promise(r => setTimeout(r, 500));
        
        const html = await page.content();
        
        const routeDir = path.join(DIST_DIR, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        console.log(`Saved ${routeDir}/index.html`);
        await page.close();
      }

      await browser.close();
      console.log('Prerendering completed successfully.');
    } catch (error) {
      console.error('Error during prerendering:', error);
      process.exit(1);
    } finally {
      server.close();
    }
  });
}

runPrerender();
