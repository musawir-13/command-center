<script setup>
import { ref } from 'vue'
import PythonTopBar from './components/PythonTopBar.vue'
import PythonFooter from './components/PythonFooter.vue'

const activeTab = ref('linux')
const searchQuery = ref('')
const copyFeedback = ref('')

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

function copyCommand() {
  const cmd = snippets[activeTab.value].command
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(cmd)
    copyFeedback.value = 'Copied!'
    setTimeout(() => {
      copyFeedback.value = ''
    }, 2000)
  }
}

function handleSearch() {
  if (typeof document !== 'undefined') {
    const btn = document.querySelector('.DocSearch-Button') || document.querySelector('.VPNavBarSearch button')
    if (btn) {
      btn.click()
      return
    }
  }
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
    <PythonTopBar />

    <!-- Main Header with Logo, Donate Button & Search Bar -->
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

        <div class="options-bar-container">
          <a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener" class="donate-button">
            Contribute / Star
          </a>
          <div class="options-bar">
            <form class="search-the-site" @submit.prevent="handleSearch">
              <input 
                v-model="searchQuery" 
                type="search" 
                class="search-field" 
                placeholder="Search"
                aria-label="Search Command Center"
              />
              <button type="submit" class="search-button" title="Submit this Search">GO</button>
            </form>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Python-style Navigation Menu with Interactive Dropdowns -->
    <nav class="python-navigation main-navigation" id="mainnav">
      <div class="container">
        <ul class="nav-menu" role="menubar">
          <!-- About -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/" class="nav-link">About <span class="nav-caret">&#9662;</span></a>
            <ul class="subnav-menu">
              <li><a href="/command-center/">Platform Overview</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Core Philosophy</a></li>
              <li><a href="/command-center/01-operating-systems/linux-core-essentials">Getting Started</a></li>
              <li><a href="/command-center/contributing">Help & FAQ</a></li>
            </ul>
          </li>

          <!-- Command Library -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/01-operating-systems/linux-core-essentials" class="nav-link">
              Command Library <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu wide-subnav">
              <li><a href="/command-center/01-operating-systems/linux-core-essentials">1. Operating Systems & Kernels (12 Topics)</a></li>
              <li><a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">2. Networking & Protocols (12 Topics)</a></li>
              <li><a href="/command-center/03-version-control-git/git-core-daily-workflow">3. Version Control & Git (11 Topics)</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">4. Containers & Orchestration (11 Topics)</a></li>
              <li><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">5. Databases & Storage (10 Topics)</a></li>
              <li><a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam">6. Cloud, DevOps & IaC (10 Topics)</a></li>
              <li><a href="/command-center/07-ultra-power-tools/system-internals">7. Ultra Forensics & Tracing (10 Topics)</a></li>
              <li><a href="/command-center/08-security-hardening-auditing/ssh-hardening-and-keys">8. Security & Hardening (12 Topics)</a></li>
              <li><a href="/command-center/09-ai-modern-agentic/ai-coding-agents-cli">9. AI & Modern Agentic Tools (12 Topics)</a></li>
            </ul>
          </li>

          <!-- Mastery Spectrum -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="nav-link">
              Mastery Spectrum <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Level 1: Daily Essentials</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Level 2: SysAdmin Surgery</a></li>
              <li><a href="/command-center/07-ultra-power-tools/system-internals">Level 3: Ultra Forensics</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Complete Diagnostics Matrix</a></li>
            </ul>
          </li>

          <!-- Containers -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/04-containers-orchestration/docker-core-cli-operations" class="nav-link">
              Containers <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Docker Core CLI Operations</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-compose-production-recipes">Docker Compose Outages</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-storage-and-volumes">Storage & Volume Leaks</a></li>
              <li><a href="/command-center/04-containers-orchestration/kubernetes-pod-crashloop-debugging">Kubernetes CrashLoop Debugging</a></li>
            </ul>
          </li>

          <!-- Databases -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/05-databases-storage/postgresql-admin-and-locks" class="nav-link">
              Databases <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">PostgreSQL Lock Recovery</a></li>
              <li><a href="/command-center/05-databases-storage/mysql-deadlocks-and-innodb">MySQL InnoDB Deadlocks</a></li>
              <li><a href="/command-center/05-databases-storage/redis-memory-and-evictions">Redis Memory & Evictions</a></li>
              <li><a href="/command-center/05-databases-storage/database-backup-and-dump-recovery">Backup & Disaster Dumps</a></li>
            </ul>
          </li>

          <!-- Cloud & DevOps -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam" class="nav-link">
              Cloud & DevOps <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam">AWS CLI Operations & IAM</a></li>
              <li><a href="/command-center/06-cloud-devops-iac/terraform-state-and-drift">Terraform State Recovery</a></li>
              <li><a href="/command-center/06-cloud-devops-iac/ci-cd-pipeline-troubleshooting">CI/CD Pipeline Troubleshooting</a></li>
              <li><a href="/command-center/01-operating-systems/linux-kernel-and-sysctl">Linux Kernel Tuning</a></li>
            </ul>
          </li>

          <!-- Outage Runbooks -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss" class="nav-link">
              Outage Runbooks <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">Port 8080 Collision Resolution</a></li>
              <li><a href="/command-center/01-operating-systems/linux-memory-and-oom">Linux OOM Killer Triage</a></li>
              <li><a href="/command-center/03-version-control-git/git-undo-and-reflog">Git Reflog Recovery</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-storage-and-volumes">Docker 100% Full Disk</a></li>
            </ul>
          </li>

          <!-- Community -->
          <li class="nav-item has-dropdown">
            <a href="/command-center/contributing" class="nav-link">
              Community <span class="nav-caret">&#9662;</span>
            </a>
            <ul class="subnav-menu">
              <li><a href="/command-center/contributing">Contribution Guidelines</a></li>
              <li><a href="https://github.com/musawir-13/command-center/issues" target="_blank" rel="noopener">Issue Tracker</a></li>
              <li><a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener">GitHub Repository</a></li>
              <li><a href="/command-center/contributing">Code of Conduct</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- The Iconic Python.org Split Hero -->
    <section class="hero-split">
      <div class="container hero-inner">
        <!-- Left Hero Column -->
        <div class="hero-left">
          <h1 class="hero-headline">
            Command Center is an open-source, problem-first command repository that lets you troubleshoot and solve server outages quickly.
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
              <button class="terminal-copy-btn" @click="copyCommand" title="Copy Command">
                {{ copyFeedback || 'Copy' }}
              </button>
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

    <!-- Python.org Style Introduction Strip -->
    <div class="introduction-strip">
      <div class="container">
        <p class="intro-text">
          Command Center is a high-speed technical reference that lets you diagnose outages quickly and recover production systems effectively. 
          <a class="readmore" href="/command-center/01-operating-systems/linux-core-essentials">Learn More &rarr;</a>
        </p>
      </div>
    </div>

    <!-- 4 Small Widgets Row (Exact Python.org Layout) -->
    <section class="widgets-section">
      <div class="container widgets-grid">
        <div class="small-widget get-started-widget">
          <h2 class="widget-title">Get Started</h2>
          <p>Whether you're new to systems troubleshooting or an experienced DevOps engineer, start with our step-by-step diagnostic workflows.</p>
          <p><a href="/command-center/01-operating-systems/linux-core-essentials" class="widget-link">Start with our Beginner's Guide &rarr;</a></p>
        </div>

        <div class="small-widget download-widget">
          <h2 class="widget-title">Download CLI</h2>
          <p>Run sub-50ms offline queries in your terminal. Latest: <strong>Command Center CLI v1.0.0</strong> for Linux, macOS & Windows.</p>
          <p><a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="widget-link">Install CLI Companion &rarr;</a></p>
        </div>

        <div class="small-widget documentation-widget">
          <h2 class="widget-title">Docs</h2>
          <p>Over 100 dedicated technical pages covering Operating Systems, Networks, Git, Containers, Databases, Cloud & Security.</p>
          <p><a href="/command-center/01-operating-systems/linux-core-essentials" class="widget-link">Browse 100 Topics &rarr;</a></p>
        </div>

        <div class="small-widget runbooks-widget last">
          <h2 class="widget-title">Runbooks</h2>
          <p>Trapped in an active production outage? Jump straight into battle-tested recovery runbooks for memory, disk, and network.</p>
          <p><a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss" class="widget-link">View Outage Recipes &rarr;</a></p>
        </div>
      </div>
    </section>

    <!-- 2 Medium Widgets Row (Latest News & Upcoming Highlights) -->
    <section class="columns-section">
      <div class="container columns-grid">
        <div class="column-box blog-widget">
          <div class="box-header">
            <h3>Latest Outage Recipes</h3>
            <a href="/command-center/01-operating-systems/linux-core-essentials" class="more-link">More recipes &rarr;</a>
          </div>
          <ul class="recipe-list">
            <li>
              <time class="recipe-time">2026-10-14</time>
              <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">
                <strong>Port 8080 collision:</strong> Locate listening process ID and terminate gracefully
              </a>
              <span class="recipe-tag">Networking</span>
            </li>
            <li>
              <time class="recipe-time">2026-10-12</time>
              <a href="/command-center/01-operating-systems/linux-memory-and-oom">
                <strong>Out Of Memory:</strong> Diagnose OOM killer kernel events and swap thrashing
              </a>
              <span class="recipe-tag">Linux</span>
            </li>
            <li>
              <time class="recipe-time">2026-10-10</time>
              <a href="/command-center/03-version-control-git/git-undo-and-reflog">
                <strong>Git Disaster:</strong> Recover lost branches & deleted commits via reflog
              </a>
              <span class="recipe-tag">Git</span>
            </li>
            <li>
              <time class="recipe-time">2026-10-08</time>
              <a href="/command-center/04-containers-orchestration/docker-storage-and-volumes">
                <strong>Docker Full Disk:</strong> Safely prune dangling volumes and builder cache
              </a>
              <span class="recipe-tag">Containers</span>
            </li>
            <li>
              <time class="recipe-time">2026-10-05</time>
              <a href="/command-center/05-databases-storage/postgresql-admin-and-locks">
                <strong>PostgreSQL Lock Cascades:</strong> Terminate blocked backend transactions
              </a>
              <span class="recipe-tag">Databases</span>
            </li>
          </ul>
        </div>

        <div class="column-box event-widget">
          <div class="box-header">
            <h3>Mastery Spectrum Highlights</h3>
            <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="more-link">More &rarr;</a>
          </div>
          <ul class="recipe-list">
            <li>
              <span class="level-indicator level-1">L1</span>
              <a href="/command-center/00-mastery-spectrum/basic-to-ultra">
                <strong>Level 1 (Basic Essentials):</strong> Navigation, file search, and permission checks
              </a>
              <span class="recipe-tag safe">Basic</span>
            </li>
            <li>
              <span class="level-indicator level-2">L2</span>
              <a href="/command-center/00-mastery-spectrum/basic-to-ultra">
                <strong>Level 2 (Intermediate Surgery):</strong> Process control, text slicing, and socket inspection
              </a>
              <span class="recipe-tag mutating">Intermediate</span>
            </li>
            <li>
              <span class="level-indicator level-3">L3</span>
              <a href="/command-center/07-ultra-power-tools/system-internals">
                <strong>Level 3 (Ultra Forensics):</strong> Syscall tracing with strace & live tcpdump packet sniffing
              </a>
              <span class="recipe-tag danger">Ultra</span>
            </li>
            <li>
              <span class="level-indicator level-3">L3</span>
              <a href="/command-center/03-version-control-git/git-bisect-and-blame">
                <strong>Automated Bisect:</strong> Binary search git histories for silent software regressions
              </a>
              <span class="recipe-tag danger">Ultra</span>
            </li>
            <li>
              <span class="level-indicator level-3">L3</span>
              <a href="/command-center/06-cloud-devops-iac/terraform-state-and-drift">
                <strong>State Recovery:</strong> Repair corrupted Terraform state locks and drift
              </a>
              <span class="recipe-tag danger">Ultra</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Success Stories & Applications Section -->
    <section class="stories-section">
      <div class="container stories-grid">
        <div class="story-box">
          <div class="box-header">
            <h3>Success Stories</h3>
            <a href="/command-center/00-mastery-spectrum/basic-to-ultra" class="more-link">More &rarr;</a>
          </div>
          <blockquote class="story-quote">
            "Command Center saved us 45 minutes of critical downtime during a PostgreSQL deadlocked transaction cascade. Finding the exact diagnostic command in 5 seconds prevented an escalation."
          </blockquote>
          <p class="story-author">
            <strong>PostgreSQL High-Availability Recovery</strong> <em>by Production SRE Team</em>
          </p>
        </div>

        <div class="apps-box">
          <div class="box-header">
            <h3>Use Command Center for...</h3>
            <a href="/command-center/01-operating-systems/linux-core-essentials" class="more-link">More &rarr;</a>
          </div>
          <ul class="apps-list">
            <li>
              <strong>System Administration:</strong> 
              <span class="tags-group">
                <a href="/command-center/01-operating-systems/linux-core-essentials">Linux</a>, 
                <a href="/command-center/01-operating-systems/systemd-units-and-services">systemd</a>, 
                <a href="/command-center/01-operating-systems/linux-process-forensics">journalctl</a>, 
                <a href="/command-center/01-operating-systems/windows-powershell-mastery">PowerShell</a>
              </span>
            </li>
            <li>
              <strong>Network Engineering:</strong> 
              <span class="tags-group">
                <a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">ss</a>, 
                <a href="/command-center/02-networking-protocols/curl-and-http-diagnostics">curl</a>, 
                <a href="/command-center/02-networking-protocols/dns-resolution-and-dig">dig</a>, 
                <a href="/command-center/07-ultra-power-tools/system-internals">tcpdump</a>
              </span>
            </li>
            <li>
              <strong>Container Operations:</strong> 
              <span class="tags-group">
                <a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Docker</a>, 
                <a href="/command-center/04-containers-orchestration/docker-compose-production-recipes">Compose</a>, 
                <a href="/command-center/04-containers-orchestration/kubernetes-pod-crashloop-debugging">Kubernetes</a>
              </span>
            </li>
            <li>
              <strong>Database Reliability:</strong> 
              <span class="tags-group">
                <a href="/command-center/05-databases-storage/postgresql-admin-and-locks">PostgreSQL</a>, 
                <a href="/command-center/05-databases-storage/mysql-deadlocks-and-innodb">MySQL</a>, 
                <a href="/command-center/05-databases-storage/redis-memory-and-evictions">Redis</a>
              </span>
            </li>
            <li>
              <strong>Version Control:</strong> 
              <span class="tags-group">
                <a href="/command-center/03-version-control-git/git-undo-and-reflog">Reflog</a>, 
                <a href="/command-center/03-version-control-git/git-bisect-and-blame">Bisect</a>, 
                <a href="/command-center/03-version-control-git/git-submodules-and-worktrees">Worktrees</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- PSF Style Open-Source Knowledge Project Widget -->
    <section class="foundation-section">
      <div class="container">
        <div class="foundation-widget">
          <div class="foundation-badge">&gt;&gt;&gt;</div>
          <div class="foundation-content">
            <h2 class="foundation-title">Command Center Open Knowledge Project</h2>
            <p class="foundation-desc">
              The mission of the Command Center project is to democratize systems reliability engineering, eliminate server outages through battle-tested commands, and support a global community of engineers.
            </p>
            <div class="foundation-cta">
              <a href="/command-center/contributing" class="btn-foundation">Become a Contributor</a>
              <a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener" class="btn-foundation outline">Star on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Python.org Style Deep Navy Footer -->
    <PythonFooter />
  </div>
</template>

<style scoped>
/* Python.org Official Color Scheme & Typography */
.python-org-wrapper {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333333;
  background-color: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 1. Main Header */
.main-header {
  background-color: #ffffff;
  padding: 24px 0;
}

.main-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 14px;
}

.logo-badge {
  background: linear-gradient(135deg, #306998 50%, #ffd343 50%);
  width: 46px;
  height: 46px;
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
  font-size: 1.4rem;
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

.options-bar-container {
  display: flex;
  align-items: center;
  gap: 14px;
}

.donate-button {
  background-color: #ffd343;
  color: #2b5b84;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 18px;
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.donate-button:hover {
  background-color: #f2c735;
  transform: translateY(-1px);
}

.options-bar {
  display: flex;
  align-items: center;
}

.search-the-site {
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
}

.search-field {
  border: none;
  padding: 8px 12px;
  font-size: 0.88rem;
  width: 220px;
  outline: none;
  color: #333333;
}

.search-button {
  background-color: #2b5b84;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: background-color 0.15s ease;
}

.search-button:hover {
  background-color: #1e415e;
}

/* 2. Main Navigation Bar with Dropdowns */
.python-navigation {
  background-color: #2b5b84;
  border-top: 1px solid #1e415e;
  position: relative;
  z-index: 90;
}

.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 18px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.94rem;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-caret {
  font-size: 0.65rem;
  opacity: 0.8;
}

.nav-item:hover > .nav-link {
  background-color: #1e415e;
  color: #ffd343;
}

/* Subnav Dropdown Menus */
.subnav-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  min-width: 240px;
  z-index: 200;
}

.wide-subnav {
  min-width: 320px;
}

.nav-item:hover .subnav-menu {
  display: block;
}

.subnav-menu li a {
  display: block;
  padding: 8px 18px;
  color: #333333;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.subnav-menu li a:hover {
  background-color: #f1f5f9;
  color: #306998;
  font-weight: 700;
}

/* 3. Split Hero Section */
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

.terminal-copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #cbd5e1;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
}

.terminal-copy-btn:hover {
  background-color: #ffd343;
  color: #1e415e;
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

/* 4. Introduction Strip */
.introduction-strip {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 0;
}

.intro-text {
  margin: 0;
  font-size: 0.96rem;
  color: #475569;
  font-weight: 500;
  text-align: center;
}

.readmore {
  color: #2b5b84;
  font-weight: 700;
  text-decoration: none;
  margin-left: 6px;
}

.readmore:hover {
  text-decoration: underline;
}

/* 5. 4 Small Widgets Row */
.widgets-section {
  padding: 50px 0 40px 0;
  background-color: #ffffff;
}

.widgets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.small-widget {
  border-top: 3px solid #306998;
  padding: 20px 0;
}

.widget-title {
  color: #2b5b84;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.small-widget p {
  font-size: 0.92rem;
  line-height: 1.55;
  color: #555555;
  margin-bottom: 12px;
}

.widget-link {
  color: #306998;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
}

.widget-link:hover {
  text-decoration: underline;
}

/* 6. Medium Widgets (News / Recipes & Highlights) */
.columns-section {
  padding: 40px 0 50px 0;
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
  gap: 12px;
}

.recipe-list li:last-child {
  border-bottom: none;
}

.recipe-time {
  font-size: 0.78rem;
  font-weight: 700;
  color: #64748b;
  white-space: nowrap;
}

.level-indicator {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 3px;
  color: #ffffff;
}

.level-1 { background-color: #10b981; }
.level-2 { background-color: #f59e0b; }
.level-3 { background-color: #ef4444; }

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
  white-space: nowrap;
}

.recipe-tag.safe { background-color: #dcfce7; color: #166534; }
.recipe-tag.mutating { background-color: #fef9c3; color: #854d0e; }
.recipe-tag.danger { background-color: #fee2e2; color: #991b1b; }

/* 7. Success Stories & Applications Section */
.stories-section {
  padding: 40px 0 50px 0;
  background-color: #ffffff;
}

.stories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.story-box, .apps-box {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 24px;
}

.story-quote {
  font-style: italic;
  color: #475569;
  font-size: 0.98rem;
  line-height: 1.6;
  margin: 0 0 16px 0;
  border-left: 3px solid #ffd343;
  padding-left: 16px;
}

.story-author {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
}

.apps-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.apps-list li {
  padding: 8px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #f1f5f9;
  color: #333333;
}

.apps-list li:last-child {
  border-bottom: none;
}

.tags-group a {
  color: #306998;
  text-decoration: none;
  font-weight: 600;
}

.tags-group a:hover {
  text-decoration: underline;
}

/* 8. Foundation Project Widget */
.foundation-section {
  background-color: #f8fafc;
  padding: 40px 0;
  border-top: 1px solid #e2e8f0;
}

.foundation-widget {
  background: linear-gradient(135deg, #1e415e 0%, #2b5b84 100%);
  color: #ffffff;
  border-radius: 8px;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.foundation-badge {
  font-size: 3rem;
  font-weight: 900;
  color: #ffd343;
  font-family: monospace;
}

.foundation-content {
  flex: 1;
}

.foundation-title {
  color: #ffd343;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.foundation-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0 0 20px 0;
}

.foundation-cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-foundation {
  background-color: #ffd343;
  color: #1e415e;
  font-weight: 700;
  font-size: 0.92rem;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.btn-foundation:hover {
  background-color: #f2c735;
}

.btn-foundation.outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn-foundation.outline:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .widgets-grid {
    grid-template-columns: 1fr 1fr;
  }
  .columns-grid, .stories-grid {
    grid-template-columns: 1fr;
  }
  .foundation-widget {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  .foundation-cta {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .main-header-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .options-bar-container {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  .search-the-site {
    width: 100%;
  }
  .search-field {
    width: 100%;
  }
  .widgets-grid {
    grid-template-columns: 1fr;
  }
}
</style>
