import { test, expect } from '@playwright/test';

test('Test with Chrome UI and capture errors', async ({ page }) => {
  // Catch console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
    }
  });

  page.on('pageerror', exception => {
    console.log('Uncaught Exception:', exception);
  });

  console.log("Navigating to Home...");
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000); // let user see

  console.log("Navigating to Shorts...");
  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(3000); // let user see

  console.log("Navigating to a Video...");
  await page.goto('http://localhost:3000/video/lfhvt2d2Ekw');
  await page.waitForTimeout(4000); // let user see

  console.log("Test finished!");
});
