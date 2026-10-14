# The Command Mastery Spectrum: Basic to Ultra

Every command in computing exists on a spectrum of capability. This guide maps commands across **3 Mastery Levels**:

* **Level 1: Basic / Essentials** (What you learn on day one)
* **Level 2: Intermediate / Problem Solver** (What saves hours of manual work)
* **Level 3: Ultra / God-Tier** (The 1% power commands that solve "impossible" production crises)

---

## 1. File & Directory Navigation

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **List files** | `ls -l` | `ls -lah --sort=size` (Human-readable, sorted by size) | `eza -la --tree --level=2 --git` / `tree -L 2 -h` |
| **Find files** | `find . -name "*.log"` | `find . -type f -mtime -2 -size +100M` (Modified in last 48h, >100MB) | `find / -type f -name "*.log" -exec du -h {} + \| sort -rh \| head -20` |
| **Search file content** | `grep "error" app.log` | `grep -rnEI "TODO\|FIXME" ./src/` (Recursive, line numbers, exclude binaries) | `rg -i -C 3 --type-add 'web:*.{js,ts,vue}' -tweb "jwt_secret"` (Ripgrep with context) |
| **Read file** | `cat file.txt` | `less +F file.txt` (Like `tail -f` with search and scrollback) | `bat --style=full --diff file.txt` / `view_file` |
| **Tail logs** | `tail -f app.log` | `tail -n 200 -f app.log \| grep --line-buffered -i "exception"` | `multitail -i log1.log -i log2.log` / `journalctl -u nginx -f -n 100 -o json-pretty` |

---

## 2. Process Control & System Forensics

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **View processes** | `ps aux` | `ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%cpu \| head -15` | `pidstat -urd -p ALL 1 3` (Per-process CPU, RAM, & Disk I/O breakdown) |
| **Kill process** | `kill -9 <PID>` | `pkill -f "python worker.py"` (Kill by command string) | `fuser -k -9 8080/tcp` (Instant kill whatever holds socket 8080) |
| **Spy on running process** | `top` | `lsof -p <PID>` (List every open file, socket, and pipe) | `strace -p <PID> -f -e trace=network,file -s 256` (Intercept all syscalls live) |
| **Background execution** | `command &` | `nohup command > output.log 2>&1 &` | `tmux new -s session 'command'` (Detachable, immune to SSH disconnect) |

---

## 3. Data & Text Processing

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **Filter output** | `grep "text"` | `awk '{print $1, $3}' file.txt` | `awk '$9 ~ /50[0-9]/ {print $1, $7, $9}' access.log \| sort \| uniq -c \| sort -nr` |
| **Batch replace in files** | Search & replace in editor | `sed -i 's/foo/bar/g' file.txt` | `git grep -l "old_api" \| xargs sed -i 's/old_api/new_api/g'` |
| **JSON API extraction** | Copy to browser / formatter | `curl -s url \| jq .` | `curl -s url \| jq -r '.items[] \| select(.status=="failed") \| [.id, .error] \| @tsv'` |
| **Parallel processing** | Loop in bash script | `xargs -n 1 command` | `cat ids.txt \| xargs -P 8 -n 1 -I {} curl -s "https://api.com/sync/{}"` (8 concurrent threads) |

---

## 4. Networking & Connectivity

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **Ping host** | `ping google.com` | `mtr --report google.com` (Packet loss hop-by-hop) | `traceroute -T -p 443 google.com` (TCP SYN traceroute through firewall) |
| **Port scan** | `telnet host 80` | `nc -zv host 80-85` | `nmap -sV -sC -p 22,80,443,5432 -T4 host` (Version & vuln scan) |
| **Sniff network traffic** | Open browser network tab | `ngrep -q -W byline "GET\|POST" port 80` | `tcpdump -i any -nn -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'` |
| **Port forward / Relay** | Reconfigure router | `ssh -L 5432:localhost:5432 user@host` | `socat TCP-LISTEN:8080,fork,reuseaddr TCP:internal-service:3000` (Universal socket proxy) |

---

## 5. Git & Version Control

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **Commit history** | `git log` | `git log --oneline --graph --all` | `git log -S "StripeAPISecret" --source --all -p` (Find when a string was introduced) |
| **Undo commit** | Delete file and commit | `git reset --soft HEAD~1` | `git reflog` + `git checkout -b rescue <SHA>` (Restore deleted branches/commits) |
| **Find bug-causing commit** | Manual checkout testing | `git log -p filename` | `git bisect start HEAD v1.0.0` + `git bisect run ./test.sh` (Auto-binary search) |
| **Clean messy PR** | Push extra fix commits | `git rebase -i HEAD~4` (Squash / reword) | `git filter-repo --invert-paths --path-match .env` (Eradicate secret from history) |

---

## 6. Docker & Containers

| Task | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Ultra) |
| :--- | :--- | :--- | :--- |
| **Run container** | `docker run nginx` | `docker run -d -p 8080:80 --name web --restart always nginx` | `docker run -d --memory="1g" --cpus="1.5" --pids-limit 100 --read-only nginx` |
| **Clean up disk** | `docker rm <id>` | `docker system prune -f` | `docker system prune -a --volumes --force` + `docker builder prune -a` |
| **Debug dead container** | `docker logs <id>` | `docker exec -it <id> sh` | `docker run --rm -it --net=container:<id> nicolaka/netshoot` (Inspect distroless pod) |
