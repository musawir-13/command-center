# macOS Terminal Diagnostics & Fixes

Troubleshooting commands for macOS developers, dealing with system ports, memory, DNS caches, and Homebrew.

---

## 1. Port Conflicts & The AirPlay Port 5000 / 7000 Issue

### Problem: Port 5000 or 7000 is occupied by `ControlCenter`
> On modern macOS (Monterey, Ventura, Sonoma, Sequoia), macOS enables **AirPlay Receiver** by default, which occupies ports `5000` and `7000`.

```bash
# Check who owns the port
lsof -nP -iTCP:5000 -sTCP:LISTEN

# Permanent Fix:
# Go to: System Settings -> General -> AirDrop & AirPlay -> Disable "AirPlay Receiver"
```

### Problem: Kill any process listening on a port
```bash
# Find PID on port 3000
lsof -ti:3000

# Kill process listening on port 3000 immediately
kill -9 $(lsof -ti:3000)
```

---

## 2. DNS Cache Flushing on macOS

### Problem: Domain resolution stuck or pointing to stale IP
```bash
# Flush DNS cache (macOS Monterey, Ventura, Sonoma, Sequoia)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Confirm resolution with local dig
dig +short mydomain.com
```

---

## 3. High CPU from macOS Background Services

### Problem: `mds` / `mds_stores` using 100% CPU
> `mds` and `mds_stores` are background daemons for **Spotlight indexing**.

```bash
# Temporarily pause Spotlight indexing
sudo mdutil -a -i off

# Rebuild / erase and restart Spotlight indexing cleanly
sudo mdutil -E /
sudo mdutil -a -i on
```

---

## 4. Homebrew Maintenance & Broken Packages

### Problem: Homebrew formula errors or outdated linkings
```bash
# Diagnose potential problems in brew environment
brew doctor

# Remove old versions, lockfiles, and clear download cache (can save 10GB+)
brew cleanup -s

# Prune dead symlinks
brew prune
```

---

## 5. Gatekeeper & Downloaded Executables

### Problem: `"App is damaged and can't be opened"` or `"Developer cannot be verified"`
```bash
# Remove the quarantine extended attribute on a downloaded tool/app
sudo xattr -rd com.apple.quarantine /Applications/YourApp.app

# Or on a downloaded binary:
xattr -d com.apple.quarantine ./my-cli-tool
```
