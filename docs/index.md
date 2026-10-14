---
layout: home

hero:
  name: "Command Center"
  text: "Universal Problem-Solving Knowledge Base"
  tagline: "Instant, copy-pasteable commands and recipes for Linux, Windows, macOS, DevOps, Networks, and Databases. Built to solve real problems fast."
  actions:
    - theme: brand
      text: ⚡ Basic-to-Ultra Spectrum
      link: /00-mastery-spectrum/basic-to-ultra
    - theme: alt
      text: 🔴 Ultra Forensics
      link: /07-ultra-power-tools/system-internals
    - theme: alt
      text: 🚨 Emergency Problem Solver
      link: /01-os-system/linux-troubleshooting

features:
  - icon: 🚨
    title: Problem-First Solutions
    details: Organized by what went wrong ("Port in use", "Out of Memory", "Commit vanished") rather than dry alphabetical man-pages.
  - icon: ⚡
    title: Zero-Fluff & Copy-Paste Ready
    details: Every command includes real-world parameter explanations, expected outputs, and copy-ready snippets.
  - icon: 🛡️
    title: Safety Flags & Risk Warnings
    details: Destructive commands are explicitly labeled with safety warnings to prevent unintended production downtime.
  - icon: 🌐
    title: Cross-Platform & Full-Stack
    details: Covers Linux, Windows PowerShell, macOS, Docker, Kubernetes, Git, PostgreSQL, MySQL, Redis, and Web Protocols.
---

## 🧭 Emergency Quick Jump Matrix

| Problem Scenario | Fastest Command | Guide Link |
| :--- | :--- | :--- |
| **"Which process is using port 8080?"** | `ss -tulpn \| grep :8080` / `netstat -ano` | [Port Connectivity](/02-networking/port-and-connectivity) |
| **"Disk is 100% full, system won't boot/write"** | `du -ahx / \| sort -rh \| head -20` | [Linux Diagnostics](/01-os-system/linux-troubleshooting) |
| **"Accidentally deleted a Git commit / branch"** | `git reflog` & `git checkout -b <branch> <SHA>` | [Git Recovery](/03-git-version-control/undo-and-recover) |
| **"Docker is eating all my hard drive space"** | `docker system prune -a --volumes` | [Docker Emergencies](/04-containers-orchestration/docker-emergencies) |
| **"Database locked / queries hanging"** | `SELECT pid, query FROM pg_stat_activity...` | [Database Recipes](/05-databases/postgresql-recipes) |
| **"Inspect SSL certificate expiry from CLI"** | `openssl s_client -connect domain:443...` | [SSL Debugging](/02-networking/ssl-and-certificates) |
| **"Kill frozen Windows process on a port"** | `Get-NetTCPConnection` + `Stop-Process` | [Windows PowerShell](/01-os-system/windows-powershell) |
| **"Debug CrashLoopBackOff in Kubernetes"** | `kubectl logs <pod> --previous` | [Kubernetes Debugging](/04-containers-orchestration/kubernetes-debugging) |

---

### How to use this repository
1. **Search Anything:** Press `Ctrl + K` (or click the search box above) and type your error message or tool name.
2. **Find Recipes by Category:** Use the left sidebar to navigate by infrastructure domain.
3. **Contribute:** Know a lifesaver command? Submit a PR via the [Contribution Guide](/contributing).
