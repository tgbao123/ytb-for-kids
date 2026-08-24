const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set absolute inset-0 to the shorts container via CSS injection
  await page.route('**/*', (route) => route.continue());
  
  await page.goto('http://localhost:3000/shorts');
  await page.waitForTimeout(2000);
  
  await page.evaluate(() => {
    const div = document.querySelector('main > div');
    div.className = "absolute inset-0 w-full bg-[#0f0f0f] overflow-y-scroll snap-y snap-mandatory no-scrollbar";
  });
  
  const scrollHeight = await page.evaluate(() => {
    const div = document.querySelector('main > div');
    return div ? div.scrollHeight : -1;
  });
  
  console.log("Div scrollHeight:", scrollHeight);
  
  await page.click('button:has(svg.lucide-arrow-down)');
  await page.waitForTimeout(1000);
  
  const scrollTopAfter = await page.evaluate(() => {
    return document.querySelector('main > div').scrollTop;
  });
  
  console.log("scrollTopAfter clicking down:", scrollTopAfter);
  
  await browser.close();
})();
