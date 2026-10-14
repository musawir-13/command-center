# 🪟 Windows & PowerShell Emergency Recipes

Essential PowerShell solutions for developers, sysadmins, and engineers dealing with ports, stuck services, script restrictions, and diagnostic logs.

---

## 1. Port & Network Troubleshooting

### Problem: Port 3000, 8080, or 5432 is already in use
```powershell
# 1. Find the process ID (PID) listening on the port
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess

# 2. Inspect the process details (Executable name, path)
Get-Process -Id <OwningProcessPID> | Select-Object Id, ProcessName, Path, StartTime

# 3. Kill the process forcefully
Stop-Process -Id <OwningProcessPID> -Force
```

#### Fast one-liner version:
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force
```

---

## 2. Execution Policy & Script Restrictions

### Problem: `File cannot be loaded because running scripts is disabled on this system`
> Windows PowerShell blocks script execution by default to protect against malicious downloads.

```powershell
# Allow scripts for the current PowerShell session only (Safest, requires NO administrator rights)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Or allow locally authored scripts permanently for the Current User (recommended)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# Verify current active policy
Get-ExecutionPolicy -List
```

---

## 3. High CPU & Memory Diagnostics

### Problem: Find the top 10 memory-consuming processes
```powershell
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 10 ProcessName, Id, @{Name="RAM(MB)"; Expression={[math]::Round($_.WorkingSet64 / 1MB, 2)}}
```

### Problem: Find the top 10 CPU-consuming processes
```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 ProcessName, Id, CPU, StartTime
```

---

## 4. Windows Services Stuck in "Stopping" or "Starting"

### Problem: A Windows Service is frozen and cannot be stopped through `services.msc`
```powershell
# 1. Query the service name and get its Service PID
sc.exe queryex "ServiceName"

# Example output will include: PID : 4820

# 2. Force kill the stuck service process by PID
taskkill /F /PID 4820

# 3. Verify the service is now stopped
Get-Service -Name "ServiceName"
```

---

## 5. Event Logs & System Errors

### Problem: View the latest 20 Critical/Error events in Windows System Log
```powershell
Get-WinEvent -FilterHashtable @{LogName='System'; Level=1,2} -MaxEvents 20 | Format-Table TimeCreated, ProviderName, Message -Wrap
```

### Problem: View application crashes from the Application Log
```powershell
Get-WinEvent -FilterHashtable @{LogName='Application'; Level=2} -MaxEvents 15 | Select-Object TimeCreated, Message | Format-List
```

---

## 6. Environment Variables & PATH Debugging

### Problem: Inspecting or temporarily modifying `$PATH`
```powershell
# Print each PATH entry on a separate clean line
$env:PATH -split ';'

# Temporarily append a new directory to PATH for this terminal session
$env:PATH += ";C:\path\to\your\bin"

# Permanently add a directory to User PATH
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\path\to\your\bin", "User")
```
