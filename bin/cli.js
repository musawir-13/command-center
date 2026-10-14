#!/usr/bin/env node

/**
 * Command Center CLI
 * Instant terminal search across all basic to ultra commands.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

// ANSI Color Helpers
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const magenta = (s) => `\x1b[35m${s}\x1b[0m`;
const gray = (s) => `\x1b[90m${s}\x1b[0m`;

function getMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === '.vitepress' || file === 'node_modules' || file === 'dist') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

function parseRecipes(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(path.join(__dirname, '..'), filePath);
  const lines = content.split('\n');

  let currentCategory = '';
  let currentProblem = '';
  let currentCode = [];
  let inCodeBlock = false;
  let codeLang = '';
  let recipes = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      currentCategory = line.replace('# ', '').trim();
    } else if (line.startsWith('## ') || line.startsWith('### ')) {
      if (currentProblem && currentCode.length > 0) {
        recipes.push({
          category: currentCategory,
          problem: currentProblem,
          code: currentCode.join('\n').trim(),
          file: relPath
        });
        currentProblem = '';
        currentCode = [];
      }
      currentProblem = line.replace(/^###?\s+/, '').replace(/^Problem:\s*/i, '').trim();
    } else if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      } else {
        inCodeBlock = false;
      }
    } else if (inCodeBlock) {
      currentCode.push(line);
    }
  }

  if (currentProblem && currentCode.length > 0) {
    recipes.push({
      category: currentCategory,
      problem: currentProblem,
      code: currentCode.join('\n').trim(),
      file: relPath
    });
  }

  return recipes;
}

function search(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const files = getMarkdownFiles(DOCS_DIR);
  let allRecipes = [];

  for (const f of files) {
    allRecipes = allRecipes.concat(parseRecipes(f));
  }

  const matches = allRecipes.filter((r) => {
    const haystack = `${r.category} ${r.problem} ${r.code} ${r.file}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });

  return matches;
}

function printUsage() {
  console.log(`
${bold(cyan('Command Center CLI'))} - Instant command & problem lookup

${bold('Usage:')}
  node bin/cli.js <search query>
  npm run search -- "<search query>"

${bold('Examples:')}
  node bin/cli.js "kill port"
  node bin/cli.js "disk full"
  node bin/cli.js "git reflog"
  node bin/cli.js "oom"
  node bin/cli.js "strace"
  node bin/cli.js "ssl expiry"
  node bin/cli.js "postgres lock"
  `);
}

const args = process.argv.slice(2);
const query = args.join(' ').trim();

if (!query || query === '-h' || query === '--help') {
  printUsage();
  process.exit(0);
}

const results = search(query);

if (results.length === 0) {
  console.log(`\n${yellow('No exact match found for:')} "${bold(query)}"`);
  console.log(`${gray('Try broader keywords like "port", "disk", "git", "docker", "ssl", or "memory".')}\n`);
  process.exit(1);
}

console.log(`\n${bold(green(`Found ${results.length} matching recipe(s) for "${query}":`))}\n`);

results.slice(0, 5).forEach((r, idx) => {
  console.log(`${cyan(`[${idx + 1}]`)} ${bold(r.problem)}`);
  console.log(`${gray(`    Category: ${r.category} | File: ${r.file}`)}`);
  console.log(`    ${yellow('Command:')}`);
  
  const indentedCode = r.code
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n');
  console.log(`${green(indentedCode)}\n`);
});

if (results.length > 5) {
  console.log(`${gray(`... and ${results.length - 5} more results. Refine your query for more specific matches.`)}\n`);
}
