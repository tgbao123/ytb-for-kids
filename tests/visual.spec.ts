import { test } from '@playwright/test';

test('take screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_home.png' });

  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshot_shorts.png' });

  await page.goto('http://localhost:3000/video/lfhvt2d2Ekw');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshot_video.png' });
});
