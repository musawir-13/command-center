# ⚡ Command Center

> **The Universal Problem-Solving Command Knowledge Base.**  
> Real-world, copy-pasteable commands, emergency diagnostics, and troubleshooting recipes for developers, sysadmins, DevOps, and database engineers.

---

## 📖 What is Command Center?

Most command manuals (like `man` pages) are arranged alphabetically by flag (`-a`, `-b`, `-c`) without explaining **which command actually fixes your current crisis**.

**Command Center** is built **problem-first**:
* 🛑 *"Port 8080 is locked by an unknown process"*
* 🛑 *"Linux disk is 100% full, but I deleted the log files"*
* 🛑 *"Accidentally ran `git reset --hard` and lost my branch"*
* 🛑 *"Docker is taking up 60GB of hard drive space"*
* 🛑 *"PostgreSQL database has locked tables and slow queries"*

---

## ⚡ Instant Terminal Search (CLI Companion)

You don't even need to open a browser. Search across all commands and error scenarios in your terminal:

```bash
# Instant search by keyword or error message
node bin/cli.js "kill port"
node bin/cli.js "docker disk full"
node bin/cli.js "git lost commit"
node bin/cli.js "strace"
```

---

## 📚 100-Page Engineering Taxonomy (9 Core Modules)

Command Center contains **100 dedicated multi-page guides** covering the entire computing stack:

| Module | Topic Domain | Page Count | Key Coverage |
| :--- | :--- | :---: | :--- |
| **01** | **🖥️ Operating Systems & Kernels** | **12 Pages** | Linux Core, Sysctl Tuning, Memory/OOM, Processes, systemd, PowerShell, Registry/WMI, macOS, BSD, Alpine, Hardware, Package Managers |
| **02** | **🌐 Networking & Wire Protocols** | **12 Pages** | TCP/UDP Sockets, DNS/BIND, SSL/TLS, SSH Tunnels, HTTP/1/2/3, iptables/nftables, Routing/BGP, tcpdump, WireGuard, Nginx, HAProxy, gRPC |
| **03** | **🌿 Git & Version Control Mastery** | **10 Pages** | Daily Essentials, Reflog Recovery, Branching, Interactive Rebase, Bisect/Blame, Worktrees, Hooks, Secret Sanitation, Internals, GitHub/GitLab CLI |
| **04** | **🐳 Containers & Orchestration** | **12 Pages** | Docker Core, Dockerfile Tuning, Docker Compose, Volumes, Networking, Rootless, Podman, kubectl, Pod Debugging, Helm, Ingress, Local Clusters |
| **05** | **🗄️ Databases & Storage Engines** | **12 Pages** | PostgreSQL Locks, Vacuum/Tuning, MySQL Processlist, InnoDB Deadlocks, Redis Keys, Redis Cluster, MongoDB, SQLite, Elasticsearch, Kafka, Backups, ZFS/LVM |
| **06** | **☁️ Cloud, DevOps & IaC** | **12 Pages** | AWS CLI, Azure CLI, Google Cloud, Terraform State, Ansible Playbooks, GitHub Actions, GitLab CI/CD, Prometheus PromQL, Grafana, Cron/Timers, Vault, Cloudflare |
| **07** | **🛡️ Cyber Security & Forensics** | **10 Pages** | Linux PrivEsc, Nmap Scanning, Web Vulnerabilities, Fail2ban, SELinux/AppArmor, Auditd, Memory Forensics, Hashcat, GPG Signing, Trivy Scanner |
| **08** | **⚙️ Developer Tooling & Languages** | **10 Pages** | Node/npm/pnpm, Python/uv/poetry, Rust/cargo, Go Toolchain, JVM jcmd, C/C++ CMake, Awk/Sed, tmux, Modern CLI (fzf/rg/eza/bat), Regex Reference |
| **09** | **🤖 AI, Agents & Machine Learning** | **10 Pages** | LLM Directives, Agent & MCP Servers, Vector DBs (Qdrant), Hugging Face, GPU nvidia-smi, OpenAI/Anthropic CLI, Ollama/vLLM, Benchmarks, Fine-Tuning, Tokenizers |

---

## 🧭 Quick Problem Solver Matrix

| Scenario / Problem | Fastest Command | Documentation Link |
| :--- | :--- | :--- |
| **Kill process on port 8080** | `lsof -ti:8080 \| xargs kill -9` / `Stop-Process` | [Port Connectivity](docs/02-networking/port-and-connectivity.md) |
| **Disk 100% full (Find big files)** | `du -ahx / \| sort -rh \| head -20` | [Linux Troubleshooting](docs/01-os-system/linux-troubleshooting.md) |
| **Recover lost Git branch/commit** | `git reflog` & `git checkout -b <branch> <SHA>` | [Git Undo & Recovery](docs/03-git-version-control/undo-and-recover.md) |
| **Docker out of disk space** | `docker system prune -a --volumes` | [Docker Emergencies](docs/04-containers-orchestration/docker-emergencies.md) |
| **Kill stuck PostgreSQL query** | `SELECT pg_terminate_backend(<pid>);` | [PostgreSQL Recipes](docs/05-databases/postgresql-recipes.md) |
| **Check remote SSL expiration** | `openssl s_client -connect domain:443...` | [SSL Debugging](docs/02-networking/ssl-and-certificates.md) |
| **Script execution disabled (PS)** | `Set-ExecutionPolicy -Scope Process Bypass` | [Windows PowerShell](docs/01-os-system/windows-powershell.md) |
| **Kubernetes CrashLoopBackOff** | `kubectl logs <pod> --previous` | [Kubernetes Debugging](docs/04-containers-orchestration/kubernetes-debugging.md) |
| **Measure API latency breakdown** | `curl -w "@format.txt" -o /dev/null -s ...` | [cURL & HTTP Suite](docs/06-web-apis/curl-http-cheatsheet.md) |
| **Nginx 502 Bad Gateway test** | `sudo nginx -t && sudo nginx -s reload` | [Nginx & Reverse Proxy](docs/06-web-apis/reverse-proxy-nginx.md) |

---

## 🗂️ Knowledge Base Structure

```
Command center/
├── docs/
│   ├── .vitepress/                  # VitePress site configuration & local search
│   ├── index.md                     # Interactive documentation landing page
│   ├── contributing.md              # Community contribution guide
│   │
│   ├── 01-os-system/                # OS Emergencies
│   │   ├── linux-troubleshooting.md # Disk full, CPU wait, RAM, OOM, zombies
│   │   ├── windows-powershell.md    # Windows ports, services, event logs, execution policy
│   │   └── macos-terminal.md        # AirPlay port conflicts, DNS flush, Homebrew
│   │
│   ├── 02-networking/               # Network & Connectivity
│   │   ├── port-and-connectivity.md # Finding listeners, nc, ping, sockets
│   │   ├── dns-and-domains.md       # Dig, recursive trace, cache flushes
│   │   ├── ssl-and-certificates.md  # OpenSSL expiration, modulus match, PEM conversion
│   │   └── ssh-and-remote.md        # Permission 600, tunnels, socks proxy
│   │
│   ├── 03-git-version-control/      # Version Control
│   │   ├── undo-and-recover.md      # Reflog, soft reset, discard changes, revert
│   │   ├── branch-and-merge.md      # Abort merge/rebase, squash, cherry-pick
│   │   └── repo-cleanup.md          # Purge secrets, git-filter-repo, bfg
│   │
│   ├── 04-containers-orchestration/ # Containers & Cloud
│   │   ├── docker-emergencies.md    # Space reclaim, exit codes (137, 139), inspect
│   │   └── kubernetes-debugging.md  # CrashLoopBackOff, ImagePullBackOff, port-forward
│   │
│   ├── 05-databases/                # Database Administration
│   │   ├── postgresql-recipes.md    # Kill locks, table bloat, connection limits
│   │   ├── mysql-mariadb-recipes.md # Full processlist, slow queries, deadlocks
│   │   └── redis-cache-ops.md       # Memory usage, bigkeys, safe unlinking
│   │
│   └── 06-web-apis/                 # Web & APIs
│       ├── curl-http-cheatsheet.md  # Timing breakdown, auth headers, HTTP/2 & 3
│       └── reverse-proxy-nginx.md   # 502 Bad Gateway triage, zero-downtime reload
│
├── package.json                     # Scripts & VitePress dependencies
├── CONTRIBUTING.md                  # Contribution rules
└── LICENSE                          # MIT License
```

---

## 💻 Running the Searchable Web Docs Locally

Command Center comes with a high-performance **VitePress** documentation site equipped with full offline instant client-side search (`Ctrl+K`):

```bash
# 1. Install dependencies
npm install

# 2. Run local hot-reload dev server
npm run docs:dev

# 3. Build static production site (in docs/.vitepress/dist)
npm run docs:build
```

---

## 🤝 Contributing

We welcome contributions from engineers across all disciplines! See [`CONTRIBUTING.md`](docs/contributing.md) to add new problem recipes or improve existing ones.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
