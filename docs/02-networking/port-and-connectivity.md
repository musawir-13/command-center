# 🔌 Ports, Sockets & Network Connectivity

Essential commands for debugging firewalls, socket states, connectivity drops, and listening ports across platforms.

---

## 1. Finding Who is Listening on a Port

### Universal Cross-Platform Comparison

| Platform | Command to Check Port 8080 | Command to Kill Offender |
| :--- | :--- | :--- |
| **Linux** | `sudo ss -tulpn \| grep :8080` | `sudo fuser -k 8080/tcp` |
| **macOS** | `lsof -nP -iTCP:8080 -sTCP:LISTEN` | `kill -9 $(lsof -t -i:8080)` |
| **Windows** | `netstat -ano \| findstr :8080` | `Stop-Process -Id <PID> -Force` |

---

## 2. Remote Port Testing (Without browser or Postman)

### Problem: Is the remote service reachable and accepting TCP connections?

```bash
# Using Netcat (nc) - fast and lightweight
# -z = scan only (do not send data), -v = verbose, -w 3 = 3-second timeout
nc -zvw 3 api.example.com 443

# Using cURL (telnet protocol)
curl -v telnet://api.example.com:443

# Using PowerShell (Windows)
Test-NetConnection -ComputerName api.example.com -Port 443

# Using Bash built-in /dev/tcp (works on Linux without nc/telnet)
timeout 3 bash -c "</dev/tcp/api.example.com/443" && echo "PORT OPEN" || echo "PORT CLOSED"
```

---

## 3. Diagnosing Packet Loss & High Latency

### Problem: Ping works, but connection drops intermittently
> Regular `ping` tests ICMP, not packet drops along the full path. Use `mtr` (My Traceroute).

```bash
# Run real-time interactive route & packet loss analysis
mtr api.example.com

# Run a non-interactive 10-packet report
mtr --report --report-cycles 10 api.example.com
```

### Windows alternative:
```powershell
pathping api.example.com
```

---

## 4. Socket States & Connection Leaks

### Problem: Checking connection states (TIME_WAIT, CLOSE_WAIT, ESTABLISHED)
> Too many `TIME_WAIT` or `CLOSE_WAIT` connections indicate unclosed client sockets or microservice connection leaks.

```bash
# Summary count of all TCP socket states
ss -s

# Count sockets by state
ss -tan | awk '{print $1}' | sort | uniq -c

# Show top remote IPs connected to your server
ss -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -n 10
```
