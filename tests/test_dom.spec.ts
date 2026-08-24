import { test } from '@playwright/test';
test('Dump DOM', async ({ page }) => {
  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(3000);
  const html = await page.evaluate(() => document.querySelector('.short-container')?.innerHTML);
  console.log("HTML of first short:\n", html);
});
