import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const videos = [
  'lfhvt2d2Ekw',
  'xnihTQpdAM0',
  'RarBn46bSDg'
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
  });
  
  const page = await context.newPage();
  
  for (const id of videos) {
    console.log(`Downloading ${id}...`);
    try {
      await page.goto('https://cobalt.tools/', { waitUntil: 'domcontentloaded' });
      await page.fill('#link-area', `https://www.youtube.com/watch?v=${id}`);
      await page.keyboard.press('Enter');
      
      const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
      const download = await downloadPromise;
      
      const fileName = `${id}.mp4`;
      const filePath = path.join(__dirname, 'public', 'videos', fileName);
      await download.saveAs(filePath);
      console.log(`Saved ${fileName}`);
    } catch (e: any) {
      console.error(`Failed to download ${id}:`, e.message);
    }
  }
  
  await browser.close();
}

main();
