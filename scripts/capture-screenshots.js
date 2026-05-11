// scripts/capture-screenshots.js
import { chromium } from 'playwright';
import { execSync }  from 'child_process';
import path          from 'path';
import fs            from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT       = path.join(__dirname, '../public/media/projects');
fs.mkdirSync(OUT, { recursive: true });

const projects = [
  { name: 'coco',    url: 'https://coco17.netlify.app',           waitFor: 'main, body' },
  { name: 'chatbot', url: 'https://ayushsingh17.netlify.app',      waitFor: '#hero, main, body' },
  { name: 'crypto',  url: 'https://cryptowallet17.netlify.app',   waitFor: 'main, body' },
];

const hasWebP = () => { try { execSync('cwebp -version', { stdio: 'ignore' }); return true; } catch { return false; } };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const webp    = hasWebP();
  for (const p of projects) {
    const png  = path.join(OUT, `${p.name}.png`);
    const wbp  = path.join(OUT, `${p.name}.webp`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForSelector(p.waitFor, { timeout: 5000 }).catch(() => page.waitForTimeout(2500));
      await page.waitForTimeout(800);
      await page.screenshot({ path: png });
      if (webp) { execSync(`cwebp -q 85 "${png}" -o "${wbp}"`, { stdio: 'ignore' }); fs.unlinkSync(png); }
      console.log(`✓  ${p.name} → ${webp ? wbp : png}`);
    } catch (e) { console.error(`✗  ${p.name}: ${e.message}`); }
    await page.close();
  }
  await browser.close();
})();
