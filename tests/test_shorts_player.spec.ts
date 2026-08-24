import { test, expect } from '@playwright/test';

test('Shorts video loads properly', async ({ page }) => {
  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(3000);
  
  // check if an iframe was injected by react-player
  const frames = page.frames();
  const ytFrame = frames.find(f => f.url().includes('youtube.com/embed/'));
  
  if (ytFrame) {
    console.log("YouTube iframe found! URL:", ytFrame.url());
  } else {
    console.log("No YouTube iframe found!");
  }
});
