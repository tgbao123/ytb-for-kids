import { test } from '@playwright/test';
test('Video player iframe', async ({ page }) => {
  await page.goto('http://localhost:3000/video/lfhvt2d2Ekw');
  await page.waitForTimeout(3000);
  const frames = page.frames();
  const ytFrame = frames.find(f => f.url().includes('youtube.com/embed/'));
  if (ytFrame) {
    console.log("YouTube iframe found! URL:", ytFrame.url());
  } else {
    console.log("No YouTube iframe found!");
  }
});
