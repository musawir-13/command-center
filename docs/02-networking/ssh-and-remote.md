# SSH Access, Port Tunneling & Remote Ops

Fix permission errors, establish secure tunnels to internal databases, and bypass timeouts.

---

## 1. Permission Lockouts & Common SSH Errors

### Problem: `Permissions 0644 for id_rsa are too open`
> SSH rejects private keys that other system users can read.

```bash
# Set strict permissions on the private key
chmod 600 ~/.ssh/id_rsa

# Ensure .ssh directory permissions are 700
chmod 700 ~/.ssh

# Ensure authorized_keys is 600
chmod 600 ~/.ssh/authorized_keys
```

### Problem: `Host key verification failed` (Remote server was reinstalled/rebuilt)
```bash
# Remove stale fingerprint from known_hosts for a specific hostname/IP
ssh-keygen -R 192.168.1.50
# Or hostname
ssh-keygen -R example.com
```

---

## 2. SSH Port Forwarding / Tunneling

### Problem: Connect your local GUI tool to a private remote database (PostgreSQL / MySQL)
> Tunnel remote port `5432` through a bastion server to your local port `5433`:

```bash
# Syntax: ssh -L <local_port>:<remote_host>:<remote_port> <user>@<bastion_ip>
ssh -N -L 5433:10.0.1.25:5432 user@bastion.example.com

# -N = Do not execute a remote command (port forward only)
# -f = Run in background
```
Now connect DBeaver / pgAdmin / TablePlus to `localhost:5433`!

---

### Problem: Expose a local dev server (port 3000) to a remote server (Reverse Tunnel)
```bash
# Syntax: ssh -R <remote_port>:<local_host>:<local_port> <user>@<remote_ip>
ssh -N -R 8080:localhost:3000 user@remote-vps.com
```

---

### Problem: Create a Dynamic SOCKS5 Proxy to route browser traffic through a server
```bash
# Starts a SOCKS proxy on local port 1080
ssh -N -D 1080 user@remote-server.com
```
Configure your browser or proxy settings to `socks5://127.0.0.1:1080`.

---

## 3. SSH Connection Stability & Timeouts

### Problem: SSH session drops after a few minutes of inactivity
Add the following to your local `~/.ssh/config` file:

```ssh-config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes
```

### Problem: Verbose debug mode when connection hangs
```bash
# -v, -vv, or -vvv reveals exactly which auth step or cipher handshake is stalling
ssh -vvv user@server.example.com
```
