import { test, expect } from '@playwright/test';
test('test cobalt download', async ({ page }) => {
  await page.goto('https://cobalt.tools/');
  const html = await page.innerHTML('body');
  const fs = require('fs');
  fs.writeFileSync('cobalt.html', html);
});
