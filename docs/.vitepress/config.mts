import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/command-center/',
  title: "Command Center",
  description: "Universal Command & Problem-Solving Knowledge Base for Developers, Sysadmins, and Engineers",
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,

  themeConfig: {
    siteTitle: '⚡ Command Center',
    nav: [
      { text: 'Home', link: '/' },
      { text: '⚡ Basic-to-Ultra', link: '/00-mastery-spectrum/basic-to-ultra' },
      { text: '🔴 Ultra Tools', link: '/07-ultra-power-tools/system-internals' },
      { text: 'Categories', items: [
        { text: 'Mastery Spectrum (Basic to Ultra)', link: '/00-mastery-spectrum/basic-to-ultra' },
        { text: 'Operating Systems', link: '/01-os-system/linux-troubleshooting' },
        { text: 'Networking & Connectivity', link: '/02-networking/port-and-connectivity' },
        { text: 'Git & Version Control', link: '/03-git-version-control/undo-and-recover' },
        { text: 'Containers & Docker', link: '/04-containers-orchestration/docker-emergencies' },
        { text: 'Databases', link: '/05-databases/postgresql-recipes' },
        { text: 'Web & API Debugging', link: '/06-web-apis/curl-http-cheatsheet' },
        { text: 'Ultra Forensics (strace, tcpdump, bisect)', link: '/07-ultra-power-tools/system-internals' }
      ]},
      { text: 'Contribute', link: '/contributing' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search commands & problems...',
                buttonAriaLabel: 'Search commands'
              },
              modal: {
                noResultsText: 'No matching commands or recipes found',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },

    sidebar: [
      {
        text: '⚡ Command Mastery Spectrum',
        collapsed: false,
        items: [
          { text: 'Basic to Ultra Mastery Matrix', link: '/00-mastery-spectrum/basic-to-ultra' }
        ]
      },
      {
        text: '🖥️ 1. OS & System Troubleshooting',
        collapsed: false,
        items: [
          { text: 'Linux Diagnostics (Disk, CPU, RAM)', link: '/01-os-system/linux-troubleshooting' },
          { text: 'Windows & PowerShell Emergencies', link: '/01-os-system/windows-powershell' },
          { text: 'macOS Terminal Operations', link: '/01-os-system/macos-terminal' }
        ]
      },
      {
        text: '🌐 2. Network & Connectivity',
        collapsed: false,
        items: [
          { text: 'Ports, Sockets & Ping Checks', link: '/02-networking/port-and-connectivity' },
          { text: 'DNS & Domain Investigation', link: '/02-networking/dns-and-domains' },
          { text: 'SSL / TLS Certificate Debugging', link: '/02-networking/ssl-and-certificates' },
          { text: 'SSH Access & Port Tunneling', link: '/02-networking/ssh-and-remote' }
        ]
      },
      {
        text: '🌿 3. Git & Code Recovery',
        collapsed: false,
        items: [
          { text: 'Undo, Uncommit & Lost Code Recovery', link: '/03-git-version-control/undo-and-recover' },
          { text: 'Conflicts, Rebasing & Cherry-Picking', link: '/03-git-version-control/branch-and-merge' },
          { text: 'Purging Huge Files & History Cleanup', link: '/03-git-version-control/repo-cleanup' }
        ]
      },
      {
        text: '🐳 4. Containers & Orchestration',
        collapsed: false,
        items: [
          { text: 'Docker Emergencies & Space Reclaim', link: '/04-containers-orchestration/docker-emergencies' },
          { text: 'Kubernetes Pod & Cluster Debugging', link: '/04-containers-orchestration/kubernetes-debugging' }
        ]
      },
      {
        text: '🗄️ 5. Databases & Caching',
        collapsed: false,
        items: [
          { text: 'PostgreSQL: Locks, Slowness & Stats', link: '/05-databases/postgresql-recipes' },
          { text: 'MySQL / MariaDB: Queries & Processlist', link: '/05-databases/mysql-mariadb-recipes' },
          { text: 'Redis: Keys, Memory & Evictions', link: '/05-databases/redis-cache-ops' }
        ]
      },
      {
        text: '🚀 6. Web & API Testing',
        collapsed: false,
        items: [
          { text: 'cURL & HTTP Diagnostic Suite', link: '/06-web-apis/curl-http-cheatsheet' },
          { text: 'Nginx / Reverse Proxy Fixes', link: '/06-web-apis/reverse-proxy-nginx' }
        ]
      },
      {
        text: '🔴 7. Ultra & God-Tier Forensics',
        collapsed: false,
        items: [
          { text: 'Deep Forensics (strace, tcpdump, jq, bisect)', link: '/07-ultra-power-tools/system-internals' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Released under the MIT License. Built for engineers worldwide.',
      copyright: 'Copyright © 2026 Command Center Contributors'
    }
  }
})
