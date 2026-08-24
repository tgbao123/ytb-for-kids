import { test, expect } from '@playwright/test';

test('Test Final Shorts native video', async ({ page }) => {
  page.on('console', msg => {
    if (msg.text().includes('[DEBUG]')) {
      console.log(msg.text());
    }
  });

  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(2000);

  // Click next
  await page.click('button:has(svg.lucide-arrow-down)');
  await page.waitForTimeout(2000);
  
  // Check if a native video element is playing
  const videoSrc = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video ? video.getAttribute('src') : null;
  });
  
  console.log("Found Native Video SRC:", videoSrc);
});
