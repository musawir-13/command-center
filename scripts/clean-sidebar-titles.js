const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../docs/.vitepress/config.mts');
let content = fs.readFileSync(configPath, 'utf8');

// Replace any "text": "   Word" with "text": "Word"
const cleaned = content.replace(/"text":\s*"[ \t]+([^"]+)"/g, '"text": "$1"');

fs.writeFileSync(configPath, cleaned, 'utf8');
console.log('Successfully cleaned leading spaces in config.mts');
