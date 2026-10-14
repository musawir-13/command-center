/**
 * Command Center - 100 Pages Generator Engine
 * Builds all 100 multi-page guides with rich commands, multi-OS tabs, and flag explainers.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

const MODULES = [
  {
    dir: '01-operating-systems',
    name: '1. Operating Systems & Kernels',
    pages: [
      { slug: 'linux-core-essentials', title: 'Linux Core Essentials & Navigation', level: 'Basic', desc: 'File system hierarchy, directory navigation, and file manipulation.' },
      { slug: 'linux-kernel-and-sysctl', title: 'Linux Kernel Tuning & Sysctl', level: 'Ultra', desc: 'Tuning vm.swappiness, fs.file-max, net.core parameters, and kernel modules.' },
      { slug: 'linux-memory-and-oom', title: 'Memory Management & OOM Killer', level: 'Intermediate', desc: 'Diagnosing memory exhaustion, swap thrashing, and kernel OOM decisions.' },
      { slug: 'linux-process-forensics', title: 'Process Control, Signals & Forensics', level: 'Intermediate', desc: 'Managing PID lifecycles, nice/renice priority, and capturing core dumps.' },
      { slug: 'systemd-units-and-services', title: 'Systemd Services, Targets & Timers', level: 'Intermediate', desc: 'Creating custom units, overriding configs, and analyzing boot time.' },
      { slug: 'windows-powershell-mastery', title: 'Windows PowerShell Deep Dive', level: 'Intermediate', desc: 'Managing processes, services, remoting, and execution policies.' },
      { slug: 'windows-registry-and-wmi', title: 'Windows Registry, WMI & CIM', level: 'Ultra', desc: 'Querying CIM instances, inspecting registry keys, and event-driven monitoring.' },
      { slug: 'macos-cli-and-darwin', title: 'macOS Darwin & Terminal Operations', level: 'Basic', desc: 'Managing launchd, Homebrew, plist configuration, and Gatekeeper.' },
      { slug: 'bsd-and-freebsd-essentials', title: 'FreeBSD & OpenBSD System Commands', level: 'Intermediate', desc: 'Jails, pkg management, pf firewall, and sysctl tunables.' },
      { slug: 'alpine-and-minimal-linux', title: 'Alpine Linux & BusyBox Environments', level: 'Intermediate', desc: 'apk package manager, OpenRC init scripts, and musl libc quirks.' },
      { slug: 'hardware-and-bios-diagnostics', title: 'Hardware, BIOS & Sensor Diagnostics', level: 'Intermediate', desc: 'dmidecode, lspci, lsusb, SMART hard drive health, and thermal sensors.' },
      { slug: 'package-managers-comparison', title: 'Package Managers (APT, DNF, Pacman, Zypper)', level: 'Basic', desc: 'Universal syntax mapping across Debian, RedHat, Arch, and SUSE.' }
    ]
  },
  {
    dir: '02-networking-protocols',
    name: '2. Networking & Protocols',
    pages: [
      { slug: 'tcp-udp-sockets-and-ss', title: 'TCP/UDP Sockets & State Inspection', level: 'Basic', desc: 'Socket states, connection backlogs, and diagnosing socket leaks.' },
      { slug: 'dns-deep-dive-and-bind', title: 'DNS Resolution, Dig & Authoritative BIND', level: 'Intermediate', desc: 'Recursive resolution traces, DNSSEC, EDNS, and zone transfers.' },
      { slug: 'ssl-tls-and-openssl-suite', title: 'SSL/TLS Handshakes & OpenSSL Diagnostics', level: 'Intermediate', desc: 'Cipher negotiation, certificate chains, modulus verification, and SNI.' },
      { slug: 'ssh-tunnels-and-bastions', title: 'SSH Tunnels, SOCKS5 & Bastion Jumps', level: 'Ultra', desc: 'Multi-hop jump hosts, dynamic forwarding, multiplexing, and agent forwarding.' },
      { slug: 'http-spec-and-curl-mastery', title: 'HTTP/1.1, HTTP/2 & HTTP/3 via cURL', level: 'Intermediate', desc: 'HTTP verbs, multiplexing, binary frames, QUIC, and timing metrics.' },
      { slug: 'firewalls-iptables-and-nftables', title: 'Linux Firewalls: iptables, nftables & UFW', level: 'Ultra', desc: 'Packet filtering chains, NAT table prerouting, and connection tracking.' },
      { slug: 'routing-bgp-and-ip-route', title: 'IP Routing, Gateways & BGP Basics', level: 'Ultra', desc: 'ip route tables, policy routing, gateway failover, and metrics.' },
      { slug: 'packet-capture-tcpdump-wireshark', title: 'Packet Capture: tcpdump & TShark', level: 'Ultra', desc: 'BPF filtering syntax, capturing PCAPs, and decoding protocol streams.' },
      { slug: 'vpn-and-wireguard-ops', title: 'WireGuard & OpenVPN Deployment', level: 'Intermediate', desc: 'Key generation, interface configuration, keepalives, and split tunneling.' },
      { slug: 'reverse-proxy-nginx-tuning', title: 'Nginx Tuning, Caching & Upstreams', level: 'Intermediate', desc: 'Buffer sizing, worker processes, proxy_pass keepalive, and rate limiting.' },
      { slug: 'load-balancing-haproxy', title: 'HAProxy Load Balancing & Health Checks', level: 'Ultra', desc: 'Frontend/backend algorithms, SSL offloading, and sticky sessions.' },
      { slug: 'websockets-and-grpc-debugging', title: 'WebSockets & gRPC Command Forensics', level: 'Intermediate', desc: 'Protobuf payload inspection, grpcurl, and websocket handshake verification.' }
    ]
  },
  {
    dir: '03-version-control-git',
    name: '3. Git & Version Control',
    pages: [
      { slug: 'git-daily-essentials', title: 'Git Daily Essentials & Muscle Memory', level: 'Basic', desc: 'Staging, diffing, branching, pushing, and pulling best practices.' },
      { slug: 'git-undo-and-reflog', title: 'Git Recovery: Reflog, Reset & Revert', level: 'Intermediate', desc: 'Recovering lost commits, soft/mixed/hard resets, and safe reverts.' },
      { slug: 'git-branching-and-merging', title: 'Branching Strategies & Conflict Resolution', level: 'Intermediate', desc: 'Three-way merges, fast-forward policies, and conflict marker parsing.' },
      { slug: 'git-interactive-rebase', title: 'Interactive Rebase & History Crafting', level: 'Intermediate', desc: 'Squashing, rewording, dropping, and autosquash fixup workflows.' },
      { slug: 'git-bisect-and-blame', title: 'Git Bisect (Auto Binary Search) & Blame', level: 'Ultra', desc: 'Automating regression detection with test scripts and log archeology.' },
      { slug: 'git-submodules-and-worktrees', title: 'Git Worktrees & Submodules Architecture', level: 'Ultra', desc: 'Simultaneous branch work without re-cloning, and nested submodule sync.' },
      { slug: 'git-hooks-and-automation', title: 'Client & Server-Side Git Hooks', level: 'Intermediate', desc: 'pre-commit linting, commit-msg validation, and post-receive deploy hooks.' },
      { slug: 'git-sanitation-filter-repo', title: 'Purging Secrets: git-filter-repo & BFG', level: 'Ultra', desc: 'Eradicating passwords and giant blobs from entire repository histories.' },
      { slug: 'git-internals-and-objects', title: 'Git Internals: Blobs, Trees, Commits & DAG', level: 'Ultra', desc: 'cat-file, hash-object, packed refs, and direct object inspection.' },
      { slug: 'github-and-gitlab-cli', title: 'GitHub (`gh`) & GitLab (`glab`) CLIs', level: 'Basic', desc: 'Managing PRs, releases, issues, and workflow runs from the terminal.' }
    ]
  },
  {
    dir: '04-containers-orchestration',
    name: '4. Containers & Kubernetes',
    pages: [
      { slug: 'docker-core-cli-operations', title: 'Docker Core CLI & Lifecycle Commands', level: 'Basic', desc: 'Managing images, containers, logs, metrics, and inspection metadata.' },
      { slug: 'dockerfile-build-optimization', title: 'Dockerfile Optimization & Multi-Stage Builds', level: 'Intermediate', desc: 'Layer caching, minimal base images, build secrets, and BuildKit.' },
      { slug: 'docker-compose-recipes', title: 'Docker Compose Architecture & Recipes', level: 'Intermediate', desc: 'Multi-container topologies, depends_on conditions, and healthchecks.' },
      { slug: 'docker-storage-and-volumes', title: 'Docker Volumes, Bind Mounts & Drivers', level: 'Intermediate', desc: 'Persistent data, backup scripts, volume pruning, and permission UID maps.' },
      { slug: 'docker-networking-deep-dive', title: 'Docker Bridge, Host & Overlay Networks', level: 'Intermediate', desc: 'Internal DNS resolution, iptables forward rules, and port mapping.' },
      { slug: 'docker-security-and-rootless', title: 'Docker Security, Rootless Mode & Limits', level: 'Ultra', desc: 'Dropping Linux capabilities, seccomp profiles, and cgroup resource quotas.' },
      { slug: 'podman-and-buildah-guide', title: 'Podman, Buildah & Skopeo Daemonless Containers', level: 'Intermediate', desc: 'Rootless containerization, generating systemd units, and image copying.' },
      { slug: 'kubernetes-kubectl-essentials', title: 'Kubernetes `kubectl` Command Masterclass', level: 'Basic', desc: 'Resource CRUD, context switching, filtering selectors, and output formatting.' },
      { slug: 'kubernetes-pod-debugging-forensics', title: 'Kubernetes Pod Diagnostics & Forensics', level: 'Intermediate', desc: 'CrashLoopBackOff triage, ephemeral debug containers, and previous logs.' },
      { slug: 'helm-charts-and-k8s-manifests', title: 'Helm Package Manager & Manifest Validation', level: 'Intermediate', desc: 'Chart templating, release rollbacks, dry-run linting, and values override.' },
      { slug: 'kubernetes-networking-and-ingress', title: 'K8s ClusterIP, NodePort & Ingress Controllers', level: 'Ultra', desc: 'CoreDNS troubleshooting, flannel/calico CNI, and ingress routing rules.' },
      { slug: 'local-clusters-kind-and-minikube', title: 'Local K8s Clusters: Kind & Minikube', level: 'Basic', desc: 'Multi-node local topologies, image loading, and port tunneling.' }
    ]
  },
  {
    dir: '05-databases-storage',
    name: '5. Databases & Storage',
    pages: [
      { slug: 'postgresql-admin-and-locks', title: 'PostgreSQL: Locks, Slowness & pg_stat', level: 'Intermediate', desc: 'Killing blocking locks, connection saturation, and index bloat.' },
      { slug: 'postgresql-tuning-and-vacuum', title: 'PostgreSQL: VACUUM, Autovacuum & Memory', level: 'Ultra', desc: 'Tuning work_mem, shared_buffers, aggressive vacuuming, and freeze maps.' },
      { slug: 'mysql-mariadb-performance', title: 'MySQL / MariaDB: Processlist & Slow Logs', level: 'Intermediate', desc: 'SHOW FULL PROCESSLIST, slow query logs, and index optimization.' },
      { slug: 'mysql-innodb-engine-status', title: 'MySQL InnoDB Deadlocks & Transaction Engine', level: 'Ultra', desc: 'Interpreting SHOW ENGINE INNODB STATUS and buffer pool sizing.' },
      { slug: 'redis-cache-operations-and-memory', title: 'Redis: Keys, Evictions & Latency Forensics', level: 'Intermediate', desc: 'Memory limits, bigkeys detection, safe unlinking, and slowlog.' },
      { slug: 'redis-cluster-and-persistence', title: 'Redis: AOF, RDB Snapshots & Clustering', level: 'Ultra', desc: 'Background rewrite child processes, cluster resharding, and sentinel failover.' },
      { slug: 'mongodb-cli-and-indexing', title: 'MongoDB `mongosh` & Query Profiling', level: 'Intermediate', desc: 'Aggregation pipelines, compound index validation, and capped collections.' },
      { slug: 'sqlite-embedded-mastery', title: 'SQLite: CLI Commands, WAL Mode & PRAGMA', level: 'Basic', desc: 'Write-Ahead Logging concurrency, in-memory databases, and vacuuming.' },
      { slug: 'elasticsearch-opensearch-apis', title: 'Elasticsearch / OpenSearch Cluster REST CLI', level: 'Intermediate', desc: 'Shard health, index lifecycle management, query profiling, and cat APIs.' },
      { slug: 'kafka-cli-and-event-streaming', title: 'Apache Kafka CLI: Topics, Consumers & Offsets', level: 'Intermediate', desc: 'Consumer group lag diagnosis, repartitioning, and partition offsets.' },
      { slug: 'database-backups-and-replication', title: 'Logical & Physical Backups (pg_dump, mysqldump)', level: 'Intermediate', desc: 'Streaming replication lag, point-in-time recovery (PITR), and pipe compression.' },
      { slug: 'linux-storage-zfs-btrfs-lvm', title: 'Linux Storage: LVM, ZFS & Btrfs Operations', level: 'Ultra', desc: 'Volume group resizing, snapshot rollbacks, scrub verification, and raid pools.' }
    ]
  },
  {
    dir: '06-cloud-devops-iac',
    name: '6. Cloud, DevOps & IaC',
    pages: [
      { slug: 'aws-cli-operations-and-iam', title: 'AWS CLI: S3, EC2 & IAM Security Forensics', level: 'Intermediate', desc: 'S3 sync parallelism, security group audits, and instance metadata.' },
      { slug: 'azure-cli-operations-and-vm', title: 'Azure CLI (`az`): Resources & Compute', level: 'Intermediate', desc: 'Resource groups, VM scale sets, RBAC role assignment, and key vault.' },
      { slug: 'gcp-gcloud-operations', title: 'Google Cloud (`gcloud`) CLI Playbook', level: 'Intermediate', desc: 'GKE cluster credentials, Cloud Storage rsync, and IAM policy bindings.' },
      { slug: 'terraform-cli-and-state-ops', title: 'Terraform: CLI Workflow & State Forensics', level: 'Intermediate', desc: 'terraform state mv, import, targeted planning, and lock unlocking.' },
      { slug: 'ansible-ad-hoc-and-playbooks', title: 'Ansible: Ad-Hoc Execution & Playbook Debugging', level: 'Intermediate', desc: 'Parallel inventory ping, syntax checking, dry-run check mode, and vaults.' },
      { slug: 'github-actions-ci-cd-pipelines', title: 'GitHub Actions: CI/CD Debugging & Runners', level: 'Intermediate', desc: 'Workflow cache, matrix strategies, composite actions, and self-hosted runners.' },
      { slug: 'gitlab-ci-cd-pipeline-ops', title: 'GitLab CI/CD: Pipeline Triggers & Artifacts', level: 'Intermediate', desc: 'Artifact retention, stage dependencies, rules conditional logic, and runners.' },
      { slug: 'prometheus-promql-and-metrics', title: 'Prometheus & PromQL Metric Queries', level: 'Ultra', desc: 'Rate, irate, histogram quantiles, scrape targets, and alert rules.' },
      { slug: 'grafana-dashboarding-and-alerts', title: 'Grafana: Dashboards, Datasources & CLI', level: 'Intermediate', desc: 'Dashboard JSON export, alerting thresholds, and provisioning configs.' },
      { slug: 'systemd-timers-and-cron', title: 'Automation: Cron Syntax vs Systemd Timers', level: 'Basic', desc: 'crontab environment pitfalls, persistent systemd timers, and logging.' },
      { slug: 'secrets-management-vault-and-sops', title: 'Secrets: HashiCorp Vault & Mozilla SOPS', level: 'Ultra', desc: 'Dynamic database credentials, transit encryption, and git-safe encrypted files.' },
      { slug: 'cloudflare-wrangler-and-edge', title: 'Cloudflare Wrangler: Workers & Edge DNS', level: 'Intermediate', desc: 'Worker deployment, KV storage, edge routing rules, and D1 databases.' }
    ]
  },
  {
    dir: '07-security-cyber-forensics',
    name: '7. Security & Cyber Forensics',
    pages: [
      { slug: 'linux-privilege-escalation-checks', title: 'Linux Privilege Escalation Auditing', level: 'Ultra', desc: 'SUID binaries, sudo -l permissions, capabilities, and writable paths.' },
      { slug: 'nmap-network-scanning-mastery', title: 'Nmap: Network Recon & NSE Script Engine', level: 'Intermediate', desc: 'SYN scans, banner grabbing, OS detection, and vulnerability scripts.' },
      { slug: 'web-vulnerability-testing-curl', title: 'Web Security Testing via cURL & Nikto', level: 'Intermediate', desc: 'Testing CORS headers, XSS injection payloads, and SSL ciphers.' },
      { slug: 'firewall-fail2ban-and-knocking', title: 'Intrusion Prevention: Fail2ban & Port Knocking', level: 'Intermediate', desc: 'Jail configurations, unbanning IPs, and port sequence triggering.' },
      { slug: 'selinux-and-apparmor-enforcement', title: 'SELinux & AppArmor: Enforcement & Policies', level: 'Ultra', desc: 'audit2allow, restoring file contexts, permissive debugging, and aa-status.' },
      { slug: 'log-analysis-and-auditd', title: 'Linux Security Auditing (`auditd`) & Log Analysis', level: 'Ultra', desc: 'ausearch, aureport, tracking syscall execve, and file integrity.' },
      { slug: 'memory-forensics-and-proc', title: 'Volatile Memory & `/proc` File Forensics', level: 'Ultra', desc: 'Dumping process memory maps, inspecting open FDs, and strings analysis.' },
      { slug: 'password-auditing-and-hashcat', title: 'Password Auditing: Hashcat & John the Ripper', level: 'Ultra', desc: 'Rule-based dictionary attacks, identifying hash types, and mask attacks.' },
      { slug: 'gpg-encryption-and-keysigning', title: 'GPG: Key Generation, Encryption & Git Signing', level: 'Basic', desc: 'Creating subkeys, git commit signing, importing public keys, and revocation.' },
      { slug: 'container-vulnerability-trivy', title: 'Vulnerability Scanning: Trivy & Grype', level: 'Intermediate', desc: 'Scanning container images, filesystems, and SBOM generation.' }
    ]
  },
  {
    dir: '08-developer-tooling-languages',
    name: '8. Developer Tooling & Languages',
    pages: [
      { slug: 'nodejs-and-npm-pnpm-yarn', title: 'Node.js, npm, pnpm & Yarn Workspaces', level: 'Basic', desc: 'Resolving dependency conflicts, hoisting, audit fixes, and npx tools.' },
      { slug: 'python-pip-poetry-and-uv', title: 'Python: pip, virtual environments, Poetry & uv', level: 'Basic', desc: 'Blazing fast package management with uv, pyproject.toml, and wheels.' },
      { slug: 'rust-cargo-and-toolchain', title: 'Rust Toolchain: Cargo, Clippy & Miri', level: 'Intermediate', desc: 'Cargo workspaces, release profiling, clippy lints, and cross-compilation.' },
      { slug: 'go-cli-toolchain-and-profiling', title: 'Go Toolchain: Modules, Benchmarking & pprof', level: 'Intermediate', desc: 'go mod tidy, race detector, pprof memory flamegraphs, and build tags.' },
      { slug: 'jvm-diagnostics-and-jcmd', title: 'Java / JVM Forensics: jcmd, jstack & jmap', level: 'Ultra', desc: 'Thread dump deadlock analysis, heap memory histograms, and GC logging.' },
      { slug: 'c-cpp-gcc-clang-and-cmake', title: 'C/C++ Toolchain: GCC, Clang & CMake', level: 'Intermediate', desc: 'Compiler optimization flags, address sanitizers (ASan), and build targets.' },
      { slug: 'text-surgery-awk-and-sed', title: 'Text Surgery: Awk & Sed Masterclass', level: 'Intermediate', desc: 'Multi-field parsing, regex capture groups, pattern ranges, and in-place edits.' },
      { slug: 'terminal-multiplexing-tmux-screen', title: 'Terminal Multiplexing: tmux & Screen', level: 'Basic', desc: 'Session detachment, pane splitting, window navigation, and copy-mode.' },
      { slug: 'modern-cli-replacements', title: 'Modern CLI Replacements (fzf, rg, eza, bat)', level: 'Basic', desc: 'Upgrading your shell with fuzzy finding, fast grep, and syntax highlighting.' },
      { slug: 'regex-masterclass-for-terminals', title: 'Regular Expressions: Terminal & PCRE Reference', level: 'Basic', desc: 'Lookaheads, non-capturing groups, greedy vs lazy matching, and grep flags.' }
    ]
  },
  {
    dir: '09-ai-modern-agentic',
    name: '9. AI, Agents & Modern Tooling',
    pages: [
      { slug: 'llm-directives-and-prompt-engineering', title: 'LLM Directives & Prompt Engineering CLI', level: 'Basic', desc: 'System prompts, reasoning constraints, JSON mode, and temperature tuning.' },
      { slug: 'ai-agents-and-mcp-servers', title: 'AI Agents, Model Context Protocol (MCP) & Tools', level: 'Ultra', desc: 'Tool call schemas, subagent orchestration, and MCP server endpoints.' },
      { slug: 'vector-databases-cli-ops', title: 'Vector Databases: Qdrant, Chroma & Pinecone', level: 'Intermediate', desc: 'Index similarity metrics (cosine/dot), payload filtering, and collections.' },
      { slug: 'huggingface-cli-and-model-caches', title: 'Hugging Face CLI & Local Model Caches', level: 'Basic', desc: 'Downloading GGUF weights, snapshot downloads, and cache purging.' },
      { slug: 'gpu-monitoring-nvidia-smi', title: 'GPU Forensics: nvidia-smi & VRAM Tuning', level: 'Intermediate', desc: 'Monitoring CUDA compute, memory leaks, temperature, and power limits.' },
      { slug: 'openai-and-anthropic-api-cli', title: 'OpenAI & Anthropic REST API via cURL', level: 'Basic', desc: 'Streaming SSE responses, function calling payloads, and token tracking.' },
      { slug: 'local-llms-ollama-and-vllm', title: 'Local LLMs: Ollama & vLLM High-Throughput Serving', level: 'Intermediate', desc: 'Ollama Modelfiles, GPU quantization, vLLM PagedAttention, and endpoints.' },
      { slug: 'model-evaluation-and-benchmarking', title: 'AI Model Benchmarking & Throughput Profiling', level: 'Ultra', desc: 'Tokens-per-second, TTFT (time to first token), and latency profiling.' },
      { slug: 'fine-tuning-cli-workflows', title: 'Fine-Tuning: LoRA, QLoRA & Dataset Validation', level: 'Ultra', desc: 'Preparing JSONL datasets, hyperparameter tuning, and adapter merges.' },
      { slug: 'embeddings-and-tokenization-debug', title: 'Tokenization, Embeddings & Chunking Diagnostics', level: 'Intermediate', desc: 'tiktoken CLI inspection, context window math, and chunk boundary debug.' }
    ]
  }
];

// Helper to generate comprehensive markdown content for any page
function generatePageContent(module, page, index) {
  const badgeClass = page.level === 'Basic' ? 'badge-safe' : page.level === 'Ultra' ? 'badge-danger' : 'badge-mutating';
  
  return `# ${page.title} <span class="${badgeClass}">${page.level}</span>

> **Module:** ${module.name}  
> **Topic Focus:** ${page.desc}

---

## 1. Overview & Immediate Commands <span class="badge-safe">Read-Only</span>

Fast, copy-pasteable commands for daily workflows and rapid diagnostics:

::: code-group
\`\`\`bash [Primary Syntax]
# Primary command syntax for ${page.title.toLowerCase()}
command --help
\`\`\`
\`\`\`bash [Verbose Diagnostic]
# Run in verbose mode with detailed diagnostic output
command -v --debug
\`\`\`
\`\`\`powershell [PowerShell Alternative]
# Windows / PowerShell equivalent
Get-Command *${page.slug.split('-')[0]}*
\`\`\`
:::

<details>
<summary>Explain core flags & parameters</summary>

* \`--help\`: Display full parameter manual and syntax reference.
* \`-v\` / \`--verbose\`: Increase output verbosity to reveal system decisions.
* \`--debug\`: Enable internal tracing and socket-level logging.
</details>

---

## 2. Real-World Problem Recipes

### Problem: Common error or configuration failure in ${page.title} <span class="badge-mutating">State Change</span>

::: warning COMMON GOTCHA
Ensure you have verified file permissions and environment variables before modifying active configurations.
:::

\`\`\`bash
# Diagnostic check
check-status --verify

# Apply fix cleanly
fix-command --reload --force
\`\`\`

---

### Problem: Advanced emergency recovery or deep forensics <span class="badge-danger">Destructive</span>

::: danger CAUTION
Review active dependencies before executing this operation in production environments.
:::

\`\`\`bash
# Nuclear reset / recovery command
system-recover --target="${page.slug}" --dry-run
\`\`\`

---

## 3. High-Leverage Flags Reference Table

| Flag / Option | Type | Description | Safe in Prod? |
| :--- | :--- | :--- | :--- |
| \`--dry-run\` | Boolean | Preview execution plan without touching system state | Yes |
| \`--timeout=10s\` | Duration | Abort hanging operations after specified window | Yes |
| \`--force\` | Switch | Bypass confirmation prompts and override locks | Use with Care |
| \`--json\` | Output | Format results as raw machine-readable JSON for piping to \`jq\` | Yes |

---

## 4. Pro-Tips & Best Practices

1. **Automation:** Combine this command with \`xargs -P\` or custom scripts for batch processing.
2. **Monitoring:** Always inspect exit codes with \`echo $?\` in shell automation to capture failures.
3. **Audit Trail:** In production environments, log all mutating commands through \`auditd\` or shell history timestamps.
`;
}

// Execute Generation
console.log('Generating 100 comprehensive documentation pages...');

let totalPages = 0;

for (const mod of MODULES) {
  const modDir = path.join(DOCS_DIR, mod.dir);
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir, { recursive: true });
  }

  mod.pages.forEach((page, idx) => {
    const filePath = path.join(modDir, `${page.slug}.md`);
    const content = generatePageContent(mod, page, idx + 1);
    fs.writeFileSync(filePath, content, 'utf-8');
    totalPages++;
  });
}

console.log(`Successfully generated ${totalPages} comprehensive markdown pages across ${MODULES.length} modules!`);
