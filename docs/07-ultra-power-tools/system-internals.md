# 🔴 Ultra & God-Tier Power Tools: Deep Forensics

These are the rare, high-leverage power tools used by senior site reliability engineers, security researchers, and kernel developers when normal tools fail.

---

## 1. `strace`: Spy on System Calls of Any Running Process

> When an application hangs with zero log output, or says "Permission Denied" without saying which file, `strace` intercepts every system call between the process and the Linux kernel.

### Problem: Process is frozen or stalled; what is it waiting on?
```bash
# Attach to running process PID and trace all network and file system calls
sudo strace -p <PID> -f -e trace=file,network

# Trace which exact file path failed to open (ENOENT / EACCES)
sudo strace -p <PID> -f -e trace=open,openat 2>&1 | grep -E "ENOENT|EACCES"

# Time spent in system calls (profiling where the bottleneck is)
sudo strace -c -p <PID>
```

---

## 2. `git bisect run`: Automated Binary Search for Bugs

> If code worked last week in commit `v1.2.0`, but is broken on `HEAD` today across 400 commits, do not manually check out commits. Let Git run an automated binary search in 30 seconds.

```bash
# 1. Start bisect
git bisect start

# 2. Tell Git the current commit is broken
git bisect bad

# 3. Tell Git the known working tag or commit SHA
git bisect good v1.2.0

# 4. Give Git an automated test script to run (exits 0 for pass, 1 for fail)
git bisect run npm test
# Or: git bisect run ./run-check.sh
```
Git will checkout commit after commit automatically, run the script, and report:
`8f29c41 is the first bad commit.`

---

## 3. `jq`: Advanced JSON Surgery

### Problem: Extract filtered fields and format as clean CSV/TSV from complex JSON APIs
```bash
# Filter objects with status "error" and format as TSV table
curl -s https://api.example.com/v1/jobs | jq -r '
  .data[] 
  | select(.status == "failed" and .retryCount > 2) 
  | [.id, .service, .error.code, .createdAt] 
  | @tsv'

# In-place update a JSON configuration key without opening an editor
jq '.database.port = 5433 | .logging.level = "debug"' config.json > temp.json && mv temp.json config.json
```

---

## 4. `xargs -P`: Multi-Core Parallel Processing in One Line

### Problem: You have 1,000 files to convert, compress, or download; a single loop takes 2 hours
```bash
# Run 8 concurrent parallel jobs at once using -P 8
cat urls-to-fetch.txt | xargs -P 8 -n 1 -I {} curl -O -s "{}"

# Compress 500 log files using 4 CPU cores concurrently
find /var/log/app -name "*.log" | xargs -P 4 -n 1 gzip -9
```

---

## 5. `tcpdump`: Live Terminal Packet Sniffing

### Problem: API returns 500 error, but backend developer claims "We never received your request"
```bash
# Sniff incoming HTTP requests on port 80/8080 and print plain text headers in terminal
sudo tcpdump -i any -nn -s 0 -A 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'

# Capture 100 packets on port 443 into a Wireshark-compatible PCAP file
sudo tcpdump -i eth0 -w dump.pcap -c 100 port 443
```

---

## 6. `rsync`: Resumable, Bandwidth-Throttled Transfers

### Problem: Transferring 100GB of files over unstable SSH, or syncing without copying identical files
```bash
# -a = archive (preserves permissions, timestamps, symlinks)
# -v = verbose
# -z = compress on the wire
# -P = show progress bar AND allow resuming interrupted transfers
# --bwlimit = limit bandwidth to 10,000 KB/s (10MB/s) to avoid choking company network
rsync -avzP --bwlimit=10000 /local/data/ user@remote:/remote/backup/

# Dry run (preview what would be copied or deleted without touching disk)
rsync -avzP --dry-run --delete /local/data/ user@remote:/remote/backup/
```

---

## 7. `socat`: The Universal Swiss Army Knife

### Problem: Forward local port 8080 to an internal database or SSL endpoint without SSH
```bash
# Relay traffic from local port 9000 to remote IP port 5432
socat TCP-LISTEN:9000,fork,reuseaddr TCP:10.0.1.50:5432

# Expose a local serial port or unix socket to a network TCP port
socat TCP-LISTEN:9999,fork UNIX-CONNECT:/var/run/docker.sock
```
