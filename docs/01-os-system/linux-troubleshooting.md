# 🐧 Linux System Diagnostics & Emergency Recipes

Comprehensive problem-solving commands when a Linux server is struggling with storage, CPU, RAM, or unresponsive processes.

---

## 1. Disk Space Emergencies ("No space left on device")

### Problem: Disk shows 100% full, but you don't know which files are eating space
```bash
# Check filesystem utilization summary
df -h

# Check inode exhaustion (rare but causes "No space left" even with free gigabytes)
df -i

# Find top 20 largest directories or files on the root filesystem (staying on one mount)
du -ahx / 2>/dev/null | sort -rh | head -n 20
```

### Problem: Deleted a large file, but disk space did not free up
> When a process is holding an open file descriptor to a deleted file, the OS retains the data on disk until the process is closed or restarted.

```bash
# Find deleted files still held open by active processes
lsof +L1

# Look for the offending PID and command name, then:
# Gracefully reload/restart that service:
systemctl restart <service-name>

# OR if you cannot restart the service immediately, truncate the open file descriptor:
: > "/proc/<PID>/fd/<FD_NUMBER>"
```

### Problem: Cleaning journal logs that grew to tens of gigabytes
```bash
# Check current systemd journal log size
journalctl --disk-usage

# Retain only the last 2 days of logs
sudo journalctl --vacuum-time=2d

# Alternatively, retain maximum 500MB
sudo journalctl --vacuum-size=500M
```

---

## 2. High CPU & High Load Average

### Problem: CPU load is spiking; which processes are responsible?
```bash
# Sort top 10 processes consuming CPU
ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%cpu | head -n 11

# Interactive visual monitor (if installed)
htop
# or standard top sorted by CPU (press 'P') or Memory (press 'M')
top
```

### Problem: High load average, but CPU usage is low (Disk I/O Wait)
> If load average is high (e.g., 20.0) but `%cpu` is low, the CPU is waiting on slow disk operations (`%wa` in top).

```bash
# Identify processes causing high disk write/read throughput
sudo iotop -o -P

# Check disk transfer latency and queue depth
iostat -xz 1 5
```

---

## 3. Memory & Out-Of-Memory (OOM) Emergencies

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

## 4. Unresponsive & Zombie Processes

### Problem: Identifying zombie / defunct processes
```bash
# List all zombie processes and their parent PIDs
ps aux | awk '$8 ~ /Z/ {print $2, $3, $8, $11}'

# Or show PID and PPID directly
ps -ef | grep defunct
```
> **Tip:** You cannot kill a zombie process directly with `kill -9` because it is already dead. You must send `SIGHUP` or restart its **parent process (PPID)** so it reaps the child.

### Problem: Graceful termination vs force kill
```bash
# 1. Always attempt graceful shutdown first (SIGTERM, signal 15)
kill -15 <PID>

# 2. If completely hung after 10-15 seconds, force terminate (SIGKILL, signal 9)
kill -9 <PID>

# 3. Kill all instances of a stuck process by name safely
killall -SIGTERM node
```

---

## 5. File Permissions & Lockouts

### Problem: Recursively fixing web/app permissions safely
> **Important:** Never use `chmod -R 777`! Set folders to `755` and files to `644`.

```bash
# Set directories to 755 (owner read/write/execute, others read/execute)
find /var/www/my-app -type d -exec chmod 755 {} +

# Set regular files to 644 (owner read/write, others read only)
find /var/www/my-app -type f -exec chmod 644 {} +

# Set ownership to current user and group
sudo chown -R $USER:$USER /var/www/my-app
```
