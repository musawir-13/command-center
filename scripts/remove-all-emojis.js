const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Robust emoji & variation selector regex
const EMOJI_REGEX = /([\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F200}-\u{1F2FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2B50}\u{2B06}\u{2934}\u{25AA}\u{25AB}\u{20E3}\u{21AA}\u{2194}\u{2B05}\u{25B6}\u{25C0}\u{23E9}-\u{23FA}\u{231A}\u{231B}\u{2328}\u{23CF}\u{25FD}\u{25FE}\u{FE0F}\u{200D}]|\p{Extended_Pictographic})\s*/gu;

function stripEmojis(text) {
  return text.replace(EMOJI_REGEX, '');
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'cache') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.js') || entry.name.endsWith('.mts') || entry.name.endsWith('.json') || entry.name.endsWith('.vue')) {
      const original = fs.readFileSync(fullPath, 'utf-8');
      let cleaned = stripEmojis(original);
      
      // Specifically clean up index.md feature icons
      if (entry.name === 'index.md') {
        cleaned = cleaned.replace(/\s*icon:\s*["']?.*["']?\r?\n/g, '\n');
      }

      if (cleaned !== original) {
        fs.writeFileSync(fullPath, cleaned, 'utf-8');
        console.log(`Cleaned emojis from: ${path.relative(ROOT_DIR, fullPath)}`);
      }
    }
  }
}

console.log('Stripping all emojis across the entire repository...');
processDirectory(DOCS_DIR);
processDirectory(path.join(ROOT_DIR, 'scripts'));
processDirectory(path.join(ROOT_DIR, 'bin'));

// Also clean root README.md
const readmePath = path.join(ROOT_DIR, 'README.md');
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf-8');
  fs.writeFileSync(readmePath, stripEmojis(readme), 'utf-8');
  console.log('Cleaned emojis from: README.md');
}

console.log('Emoji removal complete!');
