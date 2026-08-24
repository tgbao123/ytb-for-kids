import { test, expect } from '@playwright/test';

test('Test Shorts scrolling and autoplay', async ({ page }) => {
  // Catch console logs
  page.on('console', msg => {
    console.log(`[Browser Console]: ${msg.text()}`);
  });

  page.on('pageerror', exception => {
    console.log(`[Browser Error]: ${exception}`);
  });

  console.log("Navigating to Shorts...");
  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(2000);
  
  // check initial active video
  await page.screenshot({ path: 'shorts_initial.png' });

  // Click next button
  console.log("Clicking Next Button...");
  await page.click('button:has(svg.lucide-arrow-down)');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shorts_scrolled.png' });

  console.log("Test finished!");
});
