<script setup>
function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer id="site-map" class="py-main-footer">
    <div class="py-footer-links">
      <div class="py-container">
        <!-- Back to Top Jump Link -->
        <a href="javascript:;" @click="scrollToTop" class="py-back-to-top">
          <span class="py-up-arrow">&#9650;</span> Back to Top
        </a>

        <!-- 8-Column Python.org Style Sitemap -->
        <div class="py-sitemap-grid">
          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/">About</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/">Platform Overview</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Core Philosophy</a></li>
              <li><a href="/command-center/01-operating-systems/linux-core-essentials">Getting Started</a></li>
              <li><a href="/command-center/contributing">Help & FAQ</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/01-operating-systems/linux-core-essentials">Command Library</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/01-operating-systems/linux-core-essentials">Linux Core (12 Topics)</a></li>
              <li><a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">Networking (12 Topics)</a></li>
              <li><a href="/command-center/03-version-control-git/git-core-daily-workflow">Git Operations (11 Topics)</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Containers (11 Topics)</a></li>
              <li><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">Databases (10 Topics)</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Mastery Spectrum</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Level 1: Daily Essentials</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Level 2: SysAdmin Surgery</a></li>
              <li><a href="/command-center/07-ultra-power-tools/system-internals">Level 3: Ultra Forensics</a></li>
              <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Diagnostic Matrix</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Containers & K8s</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/04-containers-orchestration/docker-core-cli-operations">Docker CLI Operations</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-compose-production-recipes">Docker Compose Outages</a></li>
              <li><a href="/command-center/04-containers-orchestration/docker-storage-and-volumes">Storage & Volume Leaks</a></li>
              <li><a href="/command-center/04-containers-orchestration/kubernetes-pod-crashloop-debugging">Kubernetes CrashLoops</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">Databases & SQL</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/05-databases-storage/postgresql-admin-and-locks">PostgreSQL Lock Recovery</a></li>
              <li><a href="/command-center/05-databases-storage/mysql-deadlocks-and-innodb">MySQL InnoDB Deadlocks</a></li>
              <li><a href="/command-center/05-databases-storage/redis-memory-and-evictions">Redis Memory & Eviction</a></li>
              <li><a href="/command-center/05-databases-storage/database-backup-and-dump-recovery">Backup & Disaster Dumps</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam">Cloud & DevOps</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/06-cloud-devops-iac/aws-cli-operations-and-iam">AWS CLI Operations & IAM</a></li>
              <li><a href="/command-center/06-cloud-devops-iac/terraform-state-and-drift">Terraform State Recovery</a></li>
              <li><a href="/command-center/06-cloud-devops-iac/ci-cd-pipeline-troubleshooting">CI/CD Pipeline Triage</a></li>
              <li><a href="/command-center/01-operating-systems/linux-kernel-and-sysctl">Linux Kernel Tuning</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/07-ultra-power-tools/system-internals">Deep Forensics</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/07-ultra-power-tools/system-internals">Syscall Tracing with strace</a></li>
              <li><a href="/command-center/02-networking-protocols/tcp-udp-sockets-and-ss">Socket States with ss</a></li>
              <li><a href="/command-center/01-operating-systems/linux-memory-and-oom">Kernel OOM Killer Events</a></li>
              <li><a href="/command-center/03-version-control-git/git-undo-and-reflog">Git Lost Commits & Reflog</a></li>
            </ul>
          </div>

          <div class="py-sitemap-col">
            <h4 class="py-col-title"><a href="/command-center/contributing">Contributing</a></h4>
            <ul class="py-col-menu">
              <li><a href="/command-center/contributing">Contribution Guidelines</a></li>
              <li><a href="https://github.com/musawir-13/command-center/issues" target="_blank" rel="noopener">Issue Tracker</a></li>
              <li><a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener">GitHub Repository</a></li>
              <li><a href="/command-center/contributing">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Python.org Site Base Bar -->
    <div class="py-site-base">
      <div class="py-container py-base-inner">
        <ul class="py-base-links">
          <li><a href="/command-center/contributing">Help & Contact</a></li>
          <li><a href="/command-center/contributing">Community Initiatives</a></li>
          <li><a href="https://github.com/musawir-13/command-center/issues" target="_blank" rel="noopener">Submit Bug</a></li>
          <li>
            <a href="https://status.github.com" target="_blank" rel="noopener" class="py-status-link">
              Status <span class="py-status-dot"></span>
            </a>
          </li>
        </ul>

        <div class="py-copyright">
          <small>
            <span>Copyright &copy; 2026.</span>
            <span><a href="/command-center/">Command Center Project</a></span>
            <span><a href="/command-center/contributing">MIT License</a></span>
            <span>Inspired by <a href="https://www.python.org/" target="_blank" rel="noopener">Python.org</a></span>
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.py-main-footer {
  background-color: #1e415e;
  color: #ffffff;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
}

.py-footer-links {
  padding: 40px 0 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.py-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.py-back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffd343;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.86rem;
  margin-bottom: 24px;
  transition: opacity 0.15s ease;
}

.py-back-to-top:hover {
  opacity: 0.85;
}

.py-up-arrow {
  font-size: 0.75rem;
}

.py-sitemap-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
}

.py-sitemap-col {
  display: flex;
  flex-direction: column;
}

.py-col-title {
  margin: 0 0 12px 0;
  font-size: 0.95rem;
  font-weight: 700;
}

.py-col-title a {
  color: #ffd343;
  text-decoration: none;
}

.py-col-title a:hover {
  text-decoration: underline;
}

.py-col-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.py-col-menu li {
  margin-bottom: 8px;
  line-height: 1.35;
}

.py-col-menu li a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.py-col-menu li a:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Site Base Bar */
.py-site-base {
  background-color: #173249;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 0;
}

.py-base-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.py-base-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.py-base-links li a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  transition: color 0.15s ease;
}

.py-base-links li a:hover {
  color: #ffd343;
}

.py-status-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.py-status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.py-copyright small {
  color: #94a3b8;
  font-size: 0.8rem;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.py-copyright a {
  color: #cbd5e1;
  text-decoration: none;
}

.py-copyright a:hover {
  color: #ffd343;
}

@media (max-width: 1024px) {
  .py-sitemap-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .py-sitemap-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .py-base-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
