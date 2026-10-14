# Nginx & Reverse Proxy Fixes

Fix 502 Bad Gateway errors, syntax check configurations before deployment, and reload with zero downtime.

---

## 1. Zero-Downtime Operations & Syntax Testing

> **Golden Rule of Nginx:** Never reload or restart Nginx without testing the config first. A single missing semicolon will crash your web server.

```bash
# 1. Test configuration syntax and verify all paths/certs exist
sudo nginx -t

# Output must say:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# 2. Reload Nginx without dropping a single active connection (Graceful reload)
sudo nginx -s reload

# Or using systemd
sudo systemctl reload nginx
```

---

## 2. Troubleshooting 502 Bad Gateway

> A `502 Bad Gateway` means Nginx is running fine, but the backend application it is proxying to (Node.js, Python Gunicorn, PHP-FPM, Go) is **dead, listening on the wrong port, or rejecting connections**.

### 502 Triage Checklist:

1. **Check Nginx error log:**
   ```bash
   sudo tail -n 50 /var/log/nginx/error.log
   ```
   * *Common error:* `connect() failed (111: Connection refused) while connecting to upstream`
     $\rightarrow$ Your backend app on `127.0.0.1:3000` is offline or crashed.

2. **Verify your backend process is actually listening:**
   ```bash
   # Check if backend app port is open
   ss -tulpn | grep :3000
   ```

3. **Check SELinux blocking (on CentOS / RHEL / Fedora):**
   ```bash
   # If Nginx gets (13: Permission denied) while connecting to upstream:
   sudo setsebool -P httpd_can_network_connect 1
   ```

---

## 3. Large File Upload Errors (`413 Request Entity Too Large`)

In your `/etc/nginx/nginx.conf` or inside the `server {}` or `location {}` block:

```nginx
# Increase max upload size (default is only 1MB!)
client_max_body_size 50M;
```

Then test and reload:
```bash
sudo nginx -t && sudo nginx -s reload
```
