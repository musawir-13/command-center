const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'docs', '.vitepress', 'config.mts');

// Load MODULES definition from build script
const buildScript = fs.readFileSync(path.join(__dirname, 'build-100-pages.js'), 'utf-8');
const modulesMatch = buildScript.match(/const MODULES = (\[[\s\S]*?\]);\r?\n\r?\n\/\/ Helper/);

if (!modulesMatch) {
  console.error('Failed to parse MODULES from build-100-pages.js');
  process.exit(1);
}

const MODULES = eval(modulesMatch[1]);

// Construct Sidebar Array
const sidebar = [
  {
    text: '⚡ Command Mastery Spectrum',
    collapsed: false,
    items: [
      { text: 'Basic to Ultra Mastery Matrix', link: '/00-mastery-spectrum/basic-to-ultra' }
    ]
  }
];

for (const mod of MODULES) {
  sidebar.push({
    text: mod.name,
    collapsed: true,
    items: mod.pages.map(p => ({
      text: `${p.level === 'Ultra' ? '🔴' : p.level === 'Intermediate' ? '🟡' : '🟢'} ${p.title}`,
      link: `/${mod.dir}/${p.slug}`
    }))
  });
}

sidebar.push({
  text: '🔴 Deep Forensics & Tools',
  collapsed: true,
  items: [
    { text: 'System Internals (strace, tcpdump, bisect)', link: '/07-ultra-power-tools/system-internals' }
  ]
});

const configContent = `import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/command-center/',
  title: "Command Center",
  description: "Universal Command & Problem-Solving Knowledge Base - 100 Comprehensive Topic Pages",
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,

  themeConfig: {
    siteTitle: '⚡ Command Center',
    nav: [
      { text: 'Home', link: '/' },
      { text: '⚡ Basic-to-Ultra', link: '/00-mastery-spectrum/basic-to-ultra' },
      { text: '🔴 Forensics', link: '/07-ultra-power-tools/system-internals' },
      { text: '📚 Command Library', link: '/01-operating-systems/linux-core-essentials' },
      { text: 'Contribute', link: '/contributing' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search commands & problem guides...',
                buttonAriaLabel: 'Search commands'
              }
            }
          }
        }
      }
    },

    sidebar: ${JSON.stringify(sidebar, null, 6)},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/musawir-13/command-center' }
    ],

    footer: {
      message: 'Released under the MIT License. 100 Topic Pages for engineers worldwide.',
      copyright: 'Copyright © 2026 Command Center Contributors'
    }
  }
})
`;

fs.writeFileSync(CONFIG_PATH, configContent, 'utf-8');
console.log('Successfully updated docs/.vitepress/config.mts with all 100 pages in sidebar!');
