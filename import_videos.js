const fs = require('fs');
const path = require('path');

const dir = '/Users/tgbao/Downloads/videos';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

async function importAll() {
  for (const file of files) {
    console.log(`\n=> Uploading ${file}...`);
    const filePath = path.join(dir, file);
    
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer], { type: 'video/mp4' });
    
    const formData = new FormData();
    formData.append('file', blob, file);

    try {
      const res = await fetch('http://localhost:3001/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      console.log(`Result:`, data);
    } catch (e) {
      console.error(`Error:`, e.message);
    }
  }
}

importAll();
