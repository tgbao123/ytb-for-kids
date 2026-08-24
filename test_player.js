const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Create a minimal HTML page to test react-player URL formats
  const html = `
    <html>
      <body>
        <div id="root"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/react-player/dist/ReactPlayer.standalone.js"></script>
        <script>
          const { createElement } = React;
          const { render } = ReactDOM;
          
          render(
            createElement(ReactPlayer, { 
              url: 'https://www.youtube.com/shorts/Zhl_KEKPuQI', 
              playing: true, 
              muted: true,
              onReady: () => console.log('Player 1 Ready'),
              onError: (e) => console.log('Player 1 Error:', e)
            }),
            document.getElementById('root')
          );
        </script>
      </body>
    </html>
  `;
  
  page.on('console', msg => console.log(msg.text()));
  
  await page.setContent(html);
  await page.waitForTimeout(3000);
  
  await browser.close();
})();
