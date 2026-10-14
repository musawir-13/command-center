import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/command-center/',
  title: "Command Center",
  description: "Universal Command & Problem-Solving Knowledge Base - 100 Comprehensive Topic Pages",
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: false,

  themeConfig: {
    siteTitle: 'Command Center',
    nav: [
      { text: 'About', link: '/' },
      {
        text: 'Command Library',
        items: [
          { text: '1. Operating Systems & Kernels (12 Topics)', link: '/01-operating-systems/linux-core-essentials' },
          { text: '2. Networking & Protocols (12 Topics)', link: '/02-networking-protocols/tcp-udp-sockets-and-ss' },
          { text: '3. Version Control & Git (11 Topics)', link: '/03-version-control-git/git-core-daily-workflow' },
          { text: '4. Containers & Orchestration (11 Topics)', link: '/04-containers-orchestration/docker-core-cli-operations' },
          { text: '5. Databases & Storage (10 Topics)', link: '/05-databases-storage/postgresql-admin-and-locks' },
          { text: '6. Cloud, DevOps & IaC (10 Topics)', link: '/06-cloud-devops-iac/aws-cli-operations-and-iam' },
          { text: '7. Security & Forensics (12 Topics)', link: '/07-security-cyber-forensics/network-sniffing-and-nmap' },
          { text: '8. Developer Tooling & Languages (10 Topics)', link: '/08-developer-tooling-languages/nodejs-and-npm-pnpm-yarn' },
          { text: '9. AI & Modern Agentic Tools (12 Topics)', link: '/09-ai-modern-agentic/ai-coding-agents-cli' }
        ]
      },
      {
        text: 'Mastery Spectrum',
        items: [
          { text: 'Diagnostic Spectrum Matrix', link: '/00-mastery-spectrum/basic-to-ultra' },
          { text: 'Level 1: Daily Essentials', link: '/00-mastery-spectrum/basic-to-ultra' },
          { text: 'Level 2: SysAdmin Surgery', link: '/00-mastery-spectrum/basic-to-ultra' },
          { text: 'Level 3: Ultra Forensics', link: '/07-ultra-power-tools/system-internals' }
        ]
      },
      { text: 'Deep Forensics', link: '/07-ultra-power-tools/system-internals' },
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

    sidebar: [
      {
            "text": "Command Mastery Spectrum",
            "collapsed": false,
            "items": [
                  {
                        "text": "Basic to Ultra Mastery Matrix",
                        "link": "/00-mastery-spectrum/basic-to-ultra"
                  }
            ]
      },
      {
            "text": "1. Operating Systems & Kernels",
            "collapsed": true,
            "items": [
                  {
                        "text": "Linux Core Essentials & Navigation",
                        "link": "/01-operating-systems/linux-core-essentials"
                  },
                  {
                        "text": "Linux Kernel Tuning & Sysctl",
                        "link": "/01-operating-systems/linux-kernel-and-sysctl"
                  },
                  {
                        "text": "Memory Management & OOM Killer",
                        "link": "/01-operating-systems/linux-memory-and-oom"
                  },
                  {
                        "text": "Process Control, Signals & Forensics",
                        "link": "/01-operating-systems/linux-process-forensics"
                  },
                  {
                        "text": "Systemd Services, Targets & Timers",
                        "link": "/01-operating-systems/systemd-units-and-services"
                  },
                  {
                        "text": "Windows PowerShell Deep Dive",
                        "link": "/01-operating-systems/windows-powershell-mastery"
                  },
                  {
                        "text": "Windows Registry, WMI & CIM",
                        "link": "/01-operating-systems/windows-registry-and-wmi"
                  },
                  {
                        "text": "macOS Darwin & Terminal Operations",
                        "link": "/01-operating-systems/macos-cli-and-darwin"
                  },
                  {
                        "text": "FreeBSD & OpenBSD System Commands",
                        "link": "/01-operating-systems/bsd-and-freebsd-essentials"
                  },
                  {
                        "text": "Alpine Linux & BusyBox Environments",
                        "link": "/01-operating-systems/alpine-and-minimal-linux"
                  },
                  {
                        "text": "Hardware, BIOS & Sensor Diagnostics",
                        "link": "/01-operating-systems/hardware-and-bios-diagnostics"
                  },
                  {
                        "text": "Package Managers (APT, DNF, Pacman, Zypper)",
                        "link": "/01-operating-systems/package-managers-comparison"
                  }
            ]
      },
      {
            "text": "2. Networking & Protocols",
            "collapsed": true,
            "items": [
                  {
                        "text": "TCP/UDP Sockets & State Inspection",
                        "link": "/02-networking-protocols/tcp-udp-sockets-and-ss"
                  },
                  {
                        "text": "DNS Resolution, Dig & Authoritative BIND",
                        "link": "/02-networking-protocols/dns-deep-dive-and-bind"
                  },
                  {
                        "text": "SSL/TLS Handshakes & OpenSSL Diagnostics",
                        "link": "/02-networking-protocols/ssl-tls-and-openssl-suite"
                  },
                  {
                        "text": "SSH Tunnels, SOCKS5 & Bastion Jumps",
                        "link": "/02-networking-protocols/ssh-tunnels-and-bastions"
                  },
                  {
                        "text": "HTTP/1.1, HTTP/2 & HTTP/3 via cURL",
                        "link": "/02-networking-protocols/http-spec-and-curl-mastery"
                  },
                  {
                        "text": "Linux Firewalls: iptables, nftables & UFW",
                        "link": "/02-networking-protocols/firewalls-iptables-and-nftables"
                  },
                  {
                        "text": "IP Routing, Gateways & BGP Basics",
                        "link": "/02-networking-protocols/routing-bgp-and-ip-route"
                  },
                  {
                        "text": "Packet Capture: tcpdump & TShark",
                        "link": "/02-networking-protocols/packet-capture-tcpdump-wireshark"
                  },
                  {
                        "text": "WireGuard & OpenVPN Deployment",
                        "link": "/02-networking-protocols/vpn-and-wireguard-ops"
                  },
                  {
                        "text": "Nginx Tuning, Caching & Upstreams",
                        "link": "/02-networking-protocols/reverse-proxy-nginx-tuning"
                  },
                  {
                        "text": "HAProxy Load Balancing & Health Checks",
                        "link": "/02-networking-protocols/load-balancing-haproxy"
                  },
                  {
                        "text": "WebSockets & gRPC Command Forensics",
                        "link": "/02-networking-protocols/websockets-and-grpc-debugging"
                  }
            ]
      },
      {
            "text": "3. Git & Version Control",
            "collapsed": true,
            "items": [
                  {
                        "text": "Git Daily Essentials & Muscle Memory",
                        "link": "/03-version-control-git/git-daily-essentials"
                  },
                  {
                        "text": "Git Recovery: Reflog, Reset & Revert",
                        "link": "/03-version-control-git/git-undo-and-reflog"
                  },
                  {
                        "text": "Branching Strategies & Conflict Resolution",
                        "link": "/03-version-control-git/git-branching-and-merging"
                  },
                  {
                        "text": "Interactive Rebase & History Crafting",
                        "link": "/03-version-control-git/git-interactive-rebase"
                  },
                  {
                        "text": "Git Bisect (Auto Binary Search) & Blame",
                        "link": "/03-version-control-git/git-bisect-and-blame"
                  },
                  {
                        "text": "Git Worktrees & Submodules Architecture",
                        "link": "/03-version-control-git/git-submodules-and-worktrees"
                  },
                  {
                        "text": "Client & Server-Side Git Hooks",
                        "link": "/03-version-control-git/git-hooks-and-automation"
                  },
                  {
                        "text": "Purging Secrets: git-filter-repo & BFG",
                        "link": "/03-version-control-git/git-sanitation-filter-repo"
                  },
                  {
                        "text": "Git Internals: Blobs, Trees, Commits & DAG",
                        "link": "/03-version-control-git/git-internals-and-objects"
                  },
                  {
                        "text": "GitHub (`gh`) & GitLab (`glab`) CLIs",
                        "link": "/03-version-control-git/github-and-gitlab-cli"
                  }
            ]
      },
      {
            "text": "4. Containers & Kubernetes",
            "collapsed": true,
            "items": [
                  {
                        "text": "Docker Core CLI & Lifecycle Commands",
                        "link": "/04-containers-orchestration/docker-core-cli-operations"
                  },
                  {
                        "text": "Dockerfile Optimization & Multi-Stage Builds",
                        "link": "/04-containers-orchestration/dockerfile-build-optimization"
                  },
                  {
                        "text": "Docker Compose Architecture & Recipes",
                        "link": "/04-containers-orchestration/docker-compose-recipes"
                  },
                  {
                        "text": "Docker Volumes, Bind Mounts & Drivers",
                        "link": "/04-containers-orchestration/docker-storage-and-volumes"
                  },
                  {
                        "text": "Docker Bridge, Host & Overlay Networks",
                        "link": "/04-containers-orchestration/docker-networking-deep-dive"
                  },
                  {
                        "text": "Docker Security, Rootless Mode & Limits",
                        "link": "/04-containers-orchestration/docker-security-and-rootless"
                  },
                  {
                        "text": "Podman, Buildah & Skopeo Daemonless Containers",
                        "link": "/04-containers-orchestration/podman-and-buildah-guide"
                  },
                  {
                        "text": "Kubernetes `kubectl` Command Masterclass",
                        "link": "/04-containers-orchestration/kubernetes-kubectl-essentials"
                  },
                  {
                        "text": "Kubernetes Pod Diagnostics & Forensics",
                        "link": "/04-containers-orchestration/kubernetes-pod-debugging-forensics"
                  },
                  {
                        "text": "Helm Package Manager & Manifest Validation",
                        "link": "/04-containers-orchestration/helm-charts-and-k8s-manifests"
                  },
                  {
                        "text": "K8s ClusterIP, NodePort & Ingress Controllers",
                        "link": "/04-containers-orchestration/kubernetes-networking-and-ingress"
                  },
                  {
                        "text": "Local K8s Clusters: Kind & Minikube",
                        "link": "/04-containers-orchestration/local-clusters-kind-and-minikube"
                  }
            ]
      },
      {
            "text": "5. Databases & Storage",
            "collapsed": true,
            "items": [
                  {
                        "text": "PostgreSQL: Locks, Slowness & pg_stat",
                        "link": "/05-databases-storage/postgresql-admin-and-locks"
                  },
                  {
                        "text": "PostgreSQL: VACUUM, Autovacuum & Memory",
                        "link": "/05-databases-storage/postgresql-tuning-and-vacuum"
                  },
                  {
                        "text": "MySQL / MariaDB: Processlist & Slow Logs",
                        "link": "/05-databases-storage/mysql-mariadb-performance"
                  },
                  {
                        "text": "MySQL InnoDB Deadlocks & Transaction Engine",
                        "link": "/05-databases-storage/mysql-innodb-engine-status"
                  },
                  {
                        "text": "Redis: Keys, Evictions & Latency Forensics",
                        "link": "/05-databases-storage/redis-cache-operations-and-memory"
                  },
                  {
                        "text": "Redis: AOF, RDB Snapshots & Clustering",
                        "link": "/05-databases-storage/redis-cluster-and-persistence"
                  },
                  {
                        "text": "MongoDB `mongosh` & Query Profiling",
                        "link": "/05-databases-storage/mongodb-cli-and-indexing"
                  },
                  {
                        "text": "SQLite: CLI Commands, WAL Mode & PRAGMA",
                        "link": "/05-databases-storage/sqlite-embedded-mastery"
                  },
                  {
                        "text": "Elasticsearch / OpenSearch Cluster REST CLI",
                        "link": "/05-databases-storage/elasticsearch-opensearch-apis"
                  },
                  {
                        "text": "Apache Kafka CLI: Topics, Consumers & Offsets",
                        "link": "/05-databases-storage/kafka-cli-and-event-streaming"
                  },
                  {
                        "text": "Logical & Physical Backups (pg_dump, mysqldump)",
                        "link": "/05-databases-storage/database-backups-and-replication"
                  },
                  {
                        "text": "Linux Storage: LVM, ZFS & Btrfs Operations",
                        "link": "/05-databases-storage/linux-storage-zfs-btrfs-lvm"
                  }
            ]
      },
      {
            "text": "6. Cloud, DevOps & IaC",
            "collapsed": true,
            "items": [
                  {
                        "text": "AWS CLI: S3, EC2 & IAM Security Forensics",
                        "link": "/06-cloud-devops-iac/aws-cli-operations-and-iam"
                  },
                  {
                        "text": "Azure CLI (`az`): Resources & Compute",
                        "link": "/06-cloud-devops-iac/azure-cli-operations-and-vm"
                  },
                  {
                        "text": "Google Cloud (`gcloud`) CLI Playbook",
                        "link": "/06-cloud-devops-iac/gcp-gcloud-operations"
                  },
                  {
                        "text": "Terraform: CLI Workflow & State Forensics",
                        "link": "/06-cloud-devops-iac/terraform-cli-and-state-ops"
                  },
                  {
                        "text": "Ansible: Ad-Hoc Execution & Playbook Debugging",
                        "link": "/06-cloud-devops-iac/ansible-ad-hoc-and-playbooks"
                  },
                  {
                        "text": "GitHub Actions: CI/CD Debugging & Runners",
                        "link": "/06-cloud-devops-iac/github-actions-ci-cd-pipelines"
                  },
                  {
                        "text": "GitLab CI/CD: Pipeline Triggers & Artifacts",
                        "link": "/06-cloud-devops-iac/gitlab-ci-cd-pipeline-ops"
                  },
                  {
                        "text": "Prometheus & PromQL Metric Queries",
                        "link": "/06-cloud-devops-iac/prometheus-promql-and-metrics"
                  },
                  {
                        "text": "Grafana: Dashboards, Datasources & CLI",
                        "link": "/06-cloud-devops-iac/grafana-dashboarding-and-alerts"
                  },
                  {
                        "text": "Automation: Cron Syntax vs Systemd Timers",
                        "link": "/06-cloud-devops-iac/systemd-timers-and-cron"
                  },
                  {
                        "text": "Secrets: HashiCorp Vault & Mozilla SOPS",
                        "link": "/06-cloud-devops-iac/secrets-management-vault-and-sops"
                  },
                  {
                        "text": "Cloudflare Wrangler: Workers & Edge DNS",
                        "link": "/06-cloud-devops-iac/cloudflare-wrangler-and-edge"
                  }
            ]
      },
      {
            "text": "7. Security & Cyber Forensics",
            "collapsed": true,
            "items": [
                  {
                        "text": "Linux Privilege Escalation Auditing",
                        "link": "/07-security-cyber-forensics/linux-privilege-escalation-checks"
                  },
                  {
                        "text": "Nmap: Network Recon & NSE Script Engine",
                        "link": "/07-security-cyber-forensics/nmap-network-scanning-mastery"
                  },
                  {
                        "text": "Web Security Testing via cURL & Nikto",
                        "link": "/07-security-cyber-forensics/web-vulnerability-testing-curl"
                  },
                  {
                        "text": "Intrusion Prevention: Fail2ban & Port Knocking",
                        "link": "/07-security-cyber-forensics/firewall-fail2ban-and-knocking"
                  },
                  {
                        "text": "SELinux & AppArmor: Enforcement & Policies",
                        "link": "/07-security-cyber-forensics/selinux-and-apparmor-enforcement"
                  },
                  {
                        "text": "Linux Security Auditing (`auditd`) & Log Analysis",
                        "link": "/07-security-cyber-forensics/log-analysis-and-auditd"
                  },
                  {
                        "text": "Volatile Memory & `/proc` File Forensics",
                        "link": "/07-security-cyber-forensics/memory-forensics-and-proc"
                  },
                  {
                        "text": "Password Auditing: Hashcat & John the Ripper",
                        "link": "/07-security-cyber-forensics/password-auditing-and-hashcat"
                  },
                  {
                        "text": "GPG: Key Generation, Encryption & Git Signing",
                        "link": "/07-security-cyber-forensics/gpg-encryption-and-keysigning"
                  },
                  {
                        "text": "Vulnerability Scanning: Trivy & Grype",
                        "link": "/07-security-cyber-forensics/container-vulnerability-trivy"
                  }
            ]
      },
      {
            "text": "8. Developer Tooling & Languages",
            "collapsed": true,
            "items": [
                  {
                        "text": "Node.js, npm, pnpm & Yarn Workspaces",
                        "link": "/08-developer-tooling-languages/nodejs-and-npm-pnpm-yarn"
                  },
                  {
                        "text": "Python: pip, virtual environments, Poetry & uv",
                        "link": "/08-developer-tooling-languages/python-pip-poetry-and-uv"
                  },
                  {
                        "text": "Rust Toolchain: Cargo, Clippy & Miri",
                        "link": "/08-developer-tooling-languages/rust-cargo-and-toolchain"
                  },
                  {
                        "text": "Go Toolchain: Modules, Benchmarking & pprof",
                        "link": "/08-developer-tooling-languages/go-cli-toolchain-and-profiling"
                  },
                  {
                        "text": "Java / JVM Forensics: jcmd, jstack & jmap",
                        "link": "/08-developer-tooling-languages/jvm-diagnostics-and-jcmd"
                  },
                  {
                        "text": "C/C++ Toolchain: GCC, Clang & CMake",
                        "link": "/08-developer-tooling-languages/c-cpp-gcc-clang-and-cmake"
                  },
                  {
                        "text": "Text Surgery: Awk & Sed Masterclass",
                        "link": "/08-developer-tooling-languages/text-surgery-awk-and-sed"
                  },
                  {
                        "text": "Terminal Multiplexing: tmux & Screen",
                        "link": "/08-developer-tooling-languages/terminal-multiplexing-tmux-screen"
                  },
                  {
                        "text": "Modern CLI Replacements (fzf, rg, eza, bat)",
                        "link": "/08-developer-tooling-languages/modern-cli-replacements"
                  },
                  {
                        "text": "Regular Expressions: Terminal & PCRE Reference",
                        "link": "/08-developer-tooling-languages/regex-masterclass-for-terminals"
                  }
            ]
      },
      {
            "text": "9. AI, Agents & Modern Tooling",
            "collapsed": true,
            "items": [
                  {
                        "text": "LLM Directives & Prompt Engineering CLI",
                        "link": "/09-ai-modern-agentic/llm-directives-and-prompt-engineering"
                  },
                  {
                        "text": "AI Agents, Model Context Protocol (MCP) & Tools",
                        "link": "/09-ai-modern-agentic/ai-agents-and-mcp-servers"
                  },
                  {
                        "text": "Vector Databases: Qdrant, Chroma & Pinecone",
                        "link": "/09-ai-modern-agentic/vector-databases-cli-ops"
                  },
                  {
                        "text": "Hugging Face CLI & Local Model Caches",
                        "link": "/09-ai-modern-agentic/huggingface-cli-and-model-caches"
                  },
                  {
                        "text": "GPU Forensics: nvidia-smi & VRAM Tuning",
                        "link": "/09-ai-modern-agentic/gpu-monitoring-nvidia-smi"
                  },
                  {
                        "text": "OpenAI & Anthropic REST API via cURL",
                        "link": "/09-ai-modern-agentic/openai-and-anthropic-api-cli"
                  },
                  {
                        "text": "Local LLMs: Ollama & vLLM High-Throughput Serving",
                        "link": "/09-ai-modern-agentic/local-llms-ollama-and-vllm"
                  },
                  {
                        "text": "AI Model Benchmarking & Throughput Profiling",
                        "link": "/09-ai-modern-agentic/model-evaluation-and-benchmarking"
                  },
                  {
                        "text": "Fine-Tuning: LoRA, QLoRA & Dataset Validation",
                        "link": "/09-ai-modern-agentic/fine-tuning-cli-workflows"
                  },
                  {
                        "text": "Tokenization, Embeddings & Chunking Diagnostics",
                        "link": "/09-ai-modern-agentic/embeddings-and-tokenization-debug"
                  }
            ]
      },
      {
            "text": "Deep Forensics & Tools",
            "collapsed": true,
            "items": [
                  {
                        "text": "System Internals (strace, tcpdump, bisect)",
                        "link": "/07-ultra-power-tools/system-internals"
                  }
            ]
      }
],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/musawir-13/command-center' }
    ],

    footer: {
      message: 'Released under the MIT License. 100 Topic Pages for engineers worldwide.',
      copyright: 'Copyright 2026 Command Center Contributors'
    }
  }
})
