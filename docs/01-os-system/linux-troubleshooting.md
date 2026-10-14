# Linux System Diagnostics & Emergency Recipes

Comprehensive problem-solving commands when a Linux server is struggling with storage, CPU, RAM, or unresponsive processes.

---

## 1. Disk Space Emergencies ("No space left on device") <span class="badge-safe">Read-Only</span>

### Problem: Disk shows 100% full, but you don't know which files are eating space

```bash
# Check filesystem utilization summary
df -h

# Check inode exhaustion (rare but causes "No space left" even with free gigabytes)
df -i

# Find top 20 largest directories or files on root (stays on one mount)
du -ahx / 2>/dev/null | sort -rh | head -n 20
```

<details>
<summary>Explain these flags (`du -ahx`)</summary>

* `-a`: Include individual files in the count, not just directories.
* `-h`: Human-readable formatting (GB, MB).
* `-x`: Stay on the root filesystem (prevents scanning `/proc`, `/sys`, or mounted network shares).
* `2>/dev/null`: Silently suppress "Permission denied" errors.
* `sort -rh`: Sort numerically in reverse order (largest on top).
* `head -n 20`: Limit output to top 20 offenders.
</details>

---

### Problem: Deleted a large file, but disk space did not free up <span class="badge-mutating">State Change</span>

::: warning WHY SPACE IS NOT FREED
When a process holds an open file descriptor to a deleted file, the OS retains the data on disk until the process releases the handle.
:::

```bash
# 1. Find deleted files still held open by active processes
lsof +L1

# 2. Gracefully reload/restart that service:
sudo systemctl restart <service-name>

# 3. OR if you cannot restart the service immediately, truncate the open file descriptor:
: > "/proc/<PID>/fd/<FD_NUMBER>"
```

---

### Problem: Cleaning journal logs that grew to tens of gigabytes <span class="badge-danger">Destructive</span>

```bash
# Check current systemd journal log size
journalctl --disk-usage

# Retain only the last 2 days of logs
sudo journalctl --vacuum-time=2d

# Alternatively, retain maximum 500MB
sudo journalctl --vacuum-size=500M
```

---

## 2. High CPU & High Load Average <span class="badge-safe">Read-Only</span>

### Problem: CPU load is spiking; which processes are responsible?

```bash
# Sort top 10 processes consuming CPU
ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%cpu | head -n 11

# Interactive visual monitor (if installed)
htop
```

### Problem: High load average, but CPU usage is low (Disk I/O Wait)

::: tip DISK I/O BOTTLENECK
If load average is high (e.g. 20.0) but `%cpu` is low, the CPU is waiting on slow disk operations (`%wa` in top).
:::

```bash
# Identify processes causing high disk write/read throughput
sudo iotop -o -P

# Check disk transfer latency and queue depth (1 second interval)
iostat -xz 1 5
```

---

## 3. Memory & Out-Of-Memory (OOM) Emergencies <span class="badge-safe">Read-Only</span>

### Problem: Checking available RAM and swap accurately

```bash
# Display memory in megabytes (focus on 'available', NOT 'free')
free -m

# Continuous 1-second view of memory & swap paging activity
vmstat 1 5
```

### Problem: Did the Linux kernel kill my database or app due to OOM?

```bash
# Search kernel ring buffer for Out Of Memory killer events
sudo dmesg -T | grep -i -E "oom|out of memory|killed process"

# View OOM killer logs via systemd journal
sudo journalctl -k | grep -i -E "oom-killer|killed process"
```

---

## 4. Unresponsive & Zombie Processes <span class="badge-mutating">State Change</span>

### Problem: Identifying zombie / defunct processes

```bash
# List all zombie processes and their parent PIDs
ps aux | awk '$8 ~ /Z/ {print $2, $3, $8, $11}'

# Or show PID and PPID directly
ps -ef | grep defunct
```

::: tip HOW TO KILL A ZOMBIE
You cannot kill a zombie process directly with `kill -9` because it is already dead. You must send `SIGHUP` or restart its **parent process (PPID)** so it reaps the child.
:::

### Problem: Graceful termination vs force kill

::: danger DANGER: SIGKILL VS SIGTERM
Never start with `kill -9`. Force-killing prevents database transaction rollbacks and leaves orphaned locks. Always attempt `kill -15` (SIGTERM) first.
:::

```bash
# 1. Attempt graceful shutdown first (SIGTERM, signal 15)
kill -15 <PID>

# 2. Wait 10-15 seconds. If completely frozen, force terminate (SIGKILL, signal 9)
kill -9 <PID>

# 3. Kill all instances of a stuck process by name safely
killall -SIGTERM node
```

---

## 5. File Permissions & Lockouts <span class="badge-sudo">Root Required</span>

### Problem: Recursively fixing web/app permissions safely

::: danger NEVER USE CHMOD 777
Running `chmod -R 777` makes files executable by anyone, exposing security vulnerabilities. Set directories to `755` and files to `644`.
:::

```bash
# Set directories to 755 (owner read/write/execute, others read/execute)
find /var/www/my-app -type d -exec chmod 755 {} +

# Set regular files to 644 (owner read/write, others read only)
find /var/www/my-app -type f -exec chmod 644 {} +

# Set ownership to current user and group
sudo chown -R $USER:$USER /var/www/my-app
```
