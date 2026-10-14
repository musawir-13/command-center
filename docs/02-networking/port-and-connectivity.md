# 🔌 Ports, Sockets & Network Connectivity

Essential commands for debugging firewalls, socket states, connectivity drops, and listening ports across platforms.

---

## 1. Finding Who is Listening on a Port <span class="badge-safe">Read-Only</span>

Identify the process ID (PID) holding a port (e.g. 8080).

::: code-group
```bash [Linux]
# List listening TCP & UDP sockets with process names and PIDs
sudo ss -tulpn | grep :8080
```
```bash [macOS]
# Show listening process on TCP port 8080
lsof -nP -iTCP:8080 -sTCP:LISTEN
```
```powershell [Windows]
# Query active TCP port listener and owning PID
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess
```
:::

<details>
<summary>🔍 What do these flags mean?</summary>

* **Linux (`ss -tulpn`):**
  * `-t`: TCP sockets
  * `-u`: UDP sockets
  * `-l`: Only listening sockets
  * `-p`: Show process name and PID (requires sudo)
  * `-n`: Numeric IP and port numbers (avoids slow reverse DNS lookups)
* **macOS (`lsof -nP`):**
  * `-n`: Do not resolve hostnames
  * `-P`: Do not resolve port numbers (shows `8080` instead of service name)
  * `-iTCP:8080`: Filter for TCP traffic on port 8080
</details>

---

## 2. Terminating the Process Holding a Port <span class="badge-danger">Destructive</span>

::: warning CAUTION
Forcefully terminating a process will close all open connections and drop active user requests. Ensure you have identified the PID before killing.
:::

::: code-group
```bash [Linux]
# Instant kill whatever process owns port 8080
sudo fuser -k 8080/tcp
```
```bash [macOS]
# Find PID and kill process on port 8080
kill -9 $(lsof -ti:8080)
```
```powershell [Windows]
# Kill process by port one-liner
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force
```
:::

---

## 3. Remote Port Testing (Without browser or Postman) <span class="badge-safe">Read-Only</span>

Quickly verify if a remote server firewall is allowing traffic to reach your port.

::: code-group
```bash [Netcat (Linux / Mac)]
# -z = scan only (do not send data), -v = verbose, -w 3 = 3-second timeout
nc -zvw 3 api.example.com 443
```
```powershell [PowerShell (Windows)]
Test-NetConnection -ComputerName api.example.com -Port 443
```
```bash [cURL (Cross-Platform)]
curl -v telnet://api.example.com:443
```
```bash [Pure Bash (Zero Dependencies)]
timeout 3 bash -c "</dev/tcp/api.example.com/443" && echo "PORT OPEN" || echo "PORT CLOSED"
```
:::

---

## 4. Diagnosing Packet Loss & High Latency <span class="badge-safe">Read-Only</span>

::: tip WHY PING IS INSUFFICIENT
Standard `ping` only tests ICMP echo. If packets are dropping at an intermediate ISP router or cloud gateway, use `mtr` to see hop-by-hop packet loss.
:::

::: code-group
```bash [Linux / macOS (MTR)]
# Real-time interactive hop-by-hop latency and loss tracker
mtr api.example.com

# Or non-interactive 10-cycle report
mtr --report --report-cycles 10 api.example.com
```
```powershell [Windows (Pathping)]
pathping api.example.com
```
:::

---

## 5. Socket States & Connection Leaks <span class="badge-safe">Read-Only</span>

Inspect whether microservices or databases are leaking unclosed sockets (`TIME_WAIT`, `CLOSE_WAIT`).

```bash
# Summary count of all TCP socket states
ss -s

# Count sockets grouped by connection state
ss -tan | awk '{print $1}' | sort | uniq -c

# Show top 10 remote client IPs connected to your server
ss -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -n 10
```
