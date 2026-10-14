<script setup>
import { ref } from 'vue'

const activeTab = ref('linux')
const searchQuery = ref('')

const snippets = {
  linux: {
    command: 'du -ahx / 2>/dev/null | sort -rh | head -n 10',
    output: `42G    /var/log/journal
18G    /var/lib/docker
8.2G   /var/cache
4.1G   /opt/app/backups
>>> Disk space bottleneck isolated to journal logs.`
  },
  powershell: {
    command: 'Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force',
    output: `Confirming PID 4820 (node.exe) terminated.
LocalPort 8080 state: CLOSED
>>> Port 8080 successfully released.`
  },
  git: {
    command: 'git reflog\ngit checkout -b recovery-branch 8f29c41',
    output: `8f29c41 HEAD@{1}: commit: Stripe webhook integration
4a2b91c HEAD@{2}: reset: moving to HEAD~1
Switched to a new branch 'recovery-branch'
>>> Deleted commit successfully recovered.`
  },
  docker: {
    command: 'docker system prune -a --volumes --force',
    output: `Deleted Containers: 14
Deleted Images: 38 (Total reclaimed space: 48.72GB)
Deleted Volumes: 6
>>> Docker storage reclaimed.`
  }
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    window.location.href = `/command-center/01-operating-systems/linux-core-essentials?search=${encodeURIComponent(searchQuery.value)}`
  } else {
    window.location.href = `/command-center/01-operating-systems/linux-core-essentials`
  }
}
</script>

<template>
  <div class="python-org-wrapper">
    <!-- Top Sister Navigation Bar -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <ul class="meta-menu">
          <li class="active"><a href="/command-center/">Command Center</a></li>
          <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Core Spectrum</a></li>
          <li><a href="/command-center/01-operating-systems/linux-core-essentials">Docs</a></li>
          <li><a href="/command-center/07-ultra-power-tools/system-internals">Forensics</a></li>
          <li><a href="https://github.com/musawir-13/command-center" target="_blank">GitHub</a></li>
          <li><a href="/command-center/contributing">Community</a></li>
        </ul>
        <div class="top-right-links">
          <span class="font-resizer"><strong><small>A</small> A</strong></span>
          <a href="https://github.com/musawir-13/command-center" target="_blank" class="social-link">Star on GitHub</a>
        </div>
      </div>
    </div>

    <!-- Main Header with Logo and Search -->
    <header class="main-header">
      <div class="container main-header-inner">
        <div class="site-branding">
          <a href="/command-center/" class="brand-link">
            <div class="logo-badge">
              <span class="logo-sym">&gt;_</span>
            </div>
            <div class="logo-text">
              <span class="logo-title">command center<span class="tm">tm</span></span>
              <span class="logo-subtitle">Universal Problem-Solving Knowledge Base</span>
            </div>
          </a>
        </div>

        <div class="header-actions">
          <a href="https://github.com/musawir-13/command-center" target="_blank" class="btn-donate">Contribute / Star</a>
          <form class="search-form" @submit.prevent="handleSearch">
            <input 
              v-model="searchQuery" 
              type="text" 
              class="search-input" 
              placeholder="Search commands & problem guides..."
            />
            <button type="submit" class="search-btn">GO</button>
          </form>
        </div>
      </div>
    </header>

    <!-- Main Python-style Navigation Menu -->
    <nav class="main-nav">
      <div class="container">
        <ul class="nav-menu">
          <li><a href="/command-center/">About</a></li>
          <li><a href="/command-center/01-operating-systems/linux-core-essentials">Command Library</a></li>
          <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Mastery Spectrum</a></li>
          <li><a href="/command-center/07-ultra-power-tools/system-internals">Forensics</a></li>
          <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Containers</a></li>
          <li><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">Databases</a></li>
          <li><a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam">Cloud & DevOps</a></li>
          <li><a href="/command-center/contributing">Contribute</a></li>
        </ul>
      </div>
    </nav>

    <!-- The Iconic Python.org Split Hero -->
    <section class="hero-split">
      <div class="container hero-inner">
        <!-- Left Hero Column -->
        <div class="hero-left">
          <h1 class="hero-headline">
            Command Center is an open-source, problem-first knowledge base that lets you troubleshoot and solve server outages quickly.
          </h1>
          <p class="hero-description">
            Whether you are trapped in a 100% full disk emergency, an unresponsive locked database query, or an accidentally deleted Git commit, find the exact copy-pasteable command in seconds.
          </p>
          <div class="hero-cta-group">
            <a href="/command-center/01-operating-systems/linux-core-essentials" class="btn-yellow-cta">
              Browse Command Library
            </a>
            <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="btn-blue-cta">
              View Basic to Ultra Spectrum
            </a>
          </div>
        </div>

        <!-- Right Hero Column: Interactive Terminal Box -->
        <div class="hero-right">
          <div class="terminal-window">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-tabs">
                <button 
                  :class="{ active: activeTab === 'linux' }" 
                  @click="activeTab = 'linux'">
                  Linux
                </button>
                <button 
                  :class="{ active: activeTab === 'powershell' }" 
                  @click="activeTab = 'powershell'">
                  PowerShell
                </button>
                <button 
                  :class="{ active: activeTab === 'git' }" 
                  @click="activeTab = 'git'">
                  Git
                </button>
                <button 
                  :class="{ active: activeTab === 'docker' }" 
                  @click="activeTab = 'docker'">
                  Docker
                </button>
              </div>
            </div>
            <div class="terminal-body">
              <div class="terminal-prompt-line">
                <span class="prompt-symbol">$</span>
                <span class="prompt-command">{{ snippets[activeTab].command }}</span>
              </div>
              <pre class="terminal-output">{{ snippets[activeTab].output }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Get Started Banner -->
    <section class="get-started-strip">
      <div class="container strip-inner">
        <span class="strip-badge">Get Started</span>
        <span class="strip-text">New to Command Center? Read the emergency guides:</span>
        <a href="/command-center/01-operating-systems/linux-memory-and-oom" class="strip-link">Linux Memory & OOM &rarr;</a>
        <a href="/command-center/03-version-control-git/git-undo-and-reflog" class="strip-link">Git Reflog Recovery &rarr;</a>
        <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss" class="strip-link">Socket States &rarr;</a>
      </div>
    </section>

    <!-- 4-Column Feature Cards (Python.org style) -->
    <section class="features-section">
      <div class="container features-grid">
        <div class="feature-card">
          <h3 class="feature-title">Problem-First Diagnostics</h3>
          <p class="feature-desc">
            Organized around real-world symptoms ("Port in use", "Out of Memory", "Commit vanished") rather than dry alphabetical man-pages.
          </p>
          <a href="/command-center/01-operating-systems/linux-core-essentials" class="feature-link">Explore solutions</a>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">Multi-OS Tabbed Code</h3>
          <p class="feature-desc">
            Switch effortlessly between Linux, macOS, and Windows commands without endless vertical scrolling.
          </p>
          <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss" class="feature-link">See multi-OS tabs</a>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">100 Comprehensive Modules</h3>
          <p class="feature-desc">
            Over 100 dedicated technical pages covering Operating Systems, Networks, Git, Containers, Databases, Cloud, and Security.
          </p>
          <a href="/command-center/01-operating-systems/linux-core-essentials" class="feature-link">View 100 pages</a>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">Sub-50ms CLI Companion</h3>
          <p class="feature-desc">
            Query every command directly from your terminal using <code>node bin/cli.js "your problem"</code> when you cannot open a browser.
          </p>
          <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="feature-link">Learn CLI usage</a>
        </div>
      </div>
    </section>

    <!-- 2-Column Python-style News / Quick Reference -->
    <section class="columns-section">
      <div class="container columns-grid">
        <div class="column-box">
          <div class="box-header">
            <h3>Popular Emergency Recipes</h3>
            <a href="/command-center/01-operating-systems/linux-core-essentials" class="more-link">More</a>
          </div>
          <ul class="recipe-list">
            <li>
              <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">
                <strong>Port in use:</strong> Find process ID and terminate gracefully
              </a>
              <span class="recipe-tag">Networking</span>
            </li>
            <li>
              <a href="/command-center/01-operating-systems/linux-memory-and-oom">
                <strong>Out Of Memory:</strong> Diagnose OOM killer kernel events
              </a>
              <span class="recipe-tag">Linux</span>
            </li>
            <li>
              <a href="/command-center/03-version-control-git/git-undo-and-reflog">
                <strong>Git Disaster:</strong> Recover lost branches with git reflog
              </a>
              <span class="recipe-tag">Git</span>
            </li>
            <li>
              <a href="/command-center/04-containers-orchestration/docker-storage-and-volumes">
                <strong>Docker Full Disk:</strong> Safely prune volumes and build cache
              </a>
              <span class="recipe-tag">Containers</span>
            </li>
          </ul>
        </div>

        <div class="column-box">
          <div class="box-header">
            <h3>Mastery Spectrum Highlights</h3>
            <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="more-link">More</a>
          </div>
          <ul class="recipe-list">
            <li>
              <a href="/command-center/00-mastery-spectrum/basic-to-ultra">
                <strong>Level 1 (Basic):</strong> Daily essentials, navigation, and file search
              </a>
              <span class="recipe-tag safe">Basic</span>
            </li>
            <li>
              <a href="/command-center/00-mastery-spectrum/basic-to-ultra">
                <strong>Level 2 (Intermediate):</strong> Text surgery, process control, socket inspection
              </a>
              <span class="recipe-tag mutating">Intermediate</span>
            </li>
            <li>
              <a href="/command-center/07-ultra-power-tools/system-internals">
                <strong>Level 3 (Ultra Forensics):</strong> Syscall tracing with strace & tcpdump
              </a>
              <span class="recipe-tag danger">Ultra</span>
            </li>
            <li>
              <a href="/command-center/03-version-control-git/git-bisect-and-blame">
                <strong>Automated Bisect:</strong> Automated binary search for software regressions
              </a>
              <span class="recipe-tag danger">Ultra</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Python.org Style Deep Navy Footer -->
    <footer class="python-footer">
      <div class="container footer-inner">
        <div class="footer-col">
          <h4>About</h4>
          <ul>
            <li><a href="/command-center/">Overview</a></li>
            <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Mastery Spectrum</a></li>
            <li><a href="/command-center/contributing">Contributing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Documentation</h4>
          <ul>
            <li><a href="/command-center/01-operating-systems/linux-core-essentials">Command Library</a></li>
            <li><a href="/command-center/07-ultra-power-tools/system-internals">Deep Forensics</a></li>
            <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Containers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Community</h4>
          <ul>
            <li><a href="https://github.com/musawir-13/command-center" target="_blank">GitHub Repository</a></li>
            <li><a href="https://github.com/musawir-13/command-center/issues" target="_blank">Issue Tracker</a></li>
            <li><a href="/command-center/contributing">Contribute a Recipe</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Open Source</h4>
          <p class="footer-text">
            Command Center is released under the MIT License. Built for site reliability engineers, sysadmins, and developers worldwide.
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copyright">Copyright &copy; 2026 Command Center Contributors. Inspired by Python.org.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Python.org Color Scheme & Typography */
.python-org-wrapper {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333333;
  background-color: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 1. Top Sister Bar */
.top-bar {
  background-color: #2b5b84;
  border-bottom: 1px solid #1e415e;
  font-size: 0.82rem;
  line-height: 1.5;
}

.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
}

.meta-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 16px;
}

.meta-menu li a {
  color: #d1e2f2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;
}

.meta-menu li a:hover,
.meta-menu li.active a {
  color: #ffd343;
}

.top-right-links {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #d1e2f2;
}

.social-link {
  color: #ffd343;
  text-decoration: none;
  font-weight: 600;
}

/* 2. Main Header */
.main-header {
  background-color: #ffffff;
  padding: 24px 0;
}

.main-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 14px;
}

.logo-badge {
  background: linear-gradient(135deg, #306998 50%, #ffd343 50%);
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.logo-sym {
  color: #ffffff;
  font-family: monospace;
  font-weight: 800;
  font-size: 1.35rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #306998;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.logo-title .tm {
  font-size: 0.8rem;
  vertical-align: super;
  color: #ffd343;
}

.logo-subtitle {
  font-size: 0.88rem;
  color: #666666;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-donate {
  background-color: #ffd343;
  color: #2b5b84;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 18px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.btn-donate:hover {
  background-color: #f2c735;
}

.search-form {
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  border: none;
  padding: 8px 12px;
  font-size: 0.88rem;
  width: 240px;
  outline: none;
}

.search-btn {
  background-color: #2b5b84;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #1e415e;
}

/* 3. Main Navigation Bar */
.main-nav {
  background-color: #2b5b84;
  border-top: 1px solid #1e415e;
}

.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-menu li a {
  display: block;
  padding: 14px 18px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.nav-menu li a:hover {
  background-color: #1e415e;
  color: #ffd343;
}

/* 4. Split Hero Section */
.hero-split {
  background: linear-gradient(135deg, #1e415e 0%, #2b5b84 100%);
  color: #ffffff;
  padding: 50px 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
}

.hero-headline {
  font-size: 1.85rem;
  font-weight: 700;
  line-height: 1.35;
  color: #ffffff;
  margin-bottom: 18px;
}

.hero-description {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #d1e2f2;
  margin-bottom: 28px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-yellow-cta {
  background-color: #ffd343;
  color: #1e415e;
  font-weight: 700;
  font-size: 1.02rem;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.btn-yellow-cta:hover {
  background-color: #f2c735;
  transform: translateY(-2px);
}

.btn-blue-cta {
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-weight: 600;
  font-size: 1.02rem;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background-color 0.15s ease;
}

.btn-blue-cta:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Terminal Console Box */
.terminal-window {
  background-color: #111827;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid #374151;
}

.terminal-header {
  background-color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #374151;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background-color: #ef4444; }
.dot.yellow { background-color: #f59e0b; }
.dot.green { background-color: #10b981; }

.terminal-tabs {
  display: flex;
  gap: 4px;
}

.terminal-tabs button {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.terminal-tabs button.active {
  color: #ffd343;
  background-color: rgba(255, 211, 67, 0.1);
}

.terminal-body {
  padding: 20px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.88rem;
  min-height: 190px;
}

.terminal-prompt-line {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
}

.prompt-symbol {
  color: #ffd343;
  font-weight: 700;
}

.prompt-command {
  color: #60a5fa;
  font-weight: 600;
}

.terminal-output {
  color: #9ca3af;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
}

/* 5. Get Started Strip */
.get-started-strip {
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 14px 0;
}

.strip-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.strip-badge {
  background-color: #306998;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
}

.strip-text {
  font-weight: 600;
  color: #4b5563;
  font-size: 0.92rem;
}

.strip-link {
  color: #2b5b84;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.strip-link:hover {
  text-decoration: underline;
}

/* 6. Features Grid */
.features-section {
  padding: 50px 0;
  background-color: #ffffff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  border-top: 3px solid #306998;
  padding: 20px 0;
}

.feature-title {
  color: #2b5b84;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 0.92rem;
  line-height: 1.55;
  color: #555555;
  margin-bottom: 14px;
}

.feature-link {
  color: #306998;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
}

.feature-link:hover {
  text-decoration: underline;
}

/* 7. Two-Column News & Highlights */
.columns-section {
  padding: 40px 0 60px 0;
  background-color: #f8fafc;
}

.columns-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.column-box {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #2b5b84;
  padding-bottom: 10px;
  margin-bottom: 16px;
}

.box-header h3 {
  font-size: 1.18rem;
  color: #2b5b84;
  margin: 0;
  font-weight: 700;
}

.more-link {
  color: #306998;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
}

.recipe-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recipe-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.recipe-list li:last-child {
  border-bottom: none;
}

.recipe-list li a {
  color: #333333;
  text-decoration: none;
  font-size: 0.92rem;
  line-height: 1.4;
  flex: 1;
}

.recipe-list li a:hover {
  color: #2b5b84;
}

.recipe-tag {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #e2e8f0;
  color: #475569;
  padding: 3px 8px;
  border-radius: 4px;
  margin-left: 12px;
}

.recipe-tag.safe { background-color: #dcfce7; color: #166534; }
.recipe-tag.mutating { background-color: #fef9c3; color: #854d0e; }
.recipe-tag.danger { background-color: #fee2e2; color: #991b1b; }

/* 8. Python-style Navy Footer */
.python-footer {
  background-color: #1e415e;
  color: #ffffff;
  padding: 40px 0 20px 0;
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.footer-col h4 {
  color: #ffd343;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col ul li {
  margin-bottom: 8px;
}

.footer-col ul li a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.15s ease;
}

.footer-col ul li a:hover {
  color: #ffffff;
}

.footer-text {
  color: #cbd5e1;
  font-size: 0.88rem;
  line-height: 1.6;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
}

.copyright {
  color: #94a3b8;
  font-size: 0.82rem;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
  .columns-grid {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
