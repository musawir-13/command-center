# 🌐 DNS & Domain Investigation Recipes

Debug domain propagation, record misconfigurations, TTL caching, and resolution latency.

---

## 1. Inspecting Specific DNS Records

### Problem: Querying A, CNAME, MX, TXT, and NS records directly
```bash
# Query A record (IPv4 address)
dig example.com A +noall +answer

# Query TXT records (often used for SPF, DKIM, Google site verification)
dig example.com TXT +short

# Query MX records (mail routing)
dig example.com MX +short

# Query CNAME records
dig cname.example.com CNAME +short
```

---

## 2. Bypassing Local DNS Cache (Direct Upstream Queries)

### Problem: Has the DNS record updated globally or just locally cached?
```bash
# Query Google Public DNS directly (8.8.8.8)
dig @8.8.8.8 example.com +short

# Query Cloudflare Public DNS directly (1.1.1.1)
dig @1.1.1.1 example.com +short

# Query the authoritative nameserver directly
dig @ns1.cloudflare.com example.com +short
```

---

## 3. Tracing the Full DNS Delegation Chain

### Problem: Where is the DNS lookup failing? (Root -> TLD -> Authoritative)
```bash
# Full recursive trace from root servers to authoritative answers
dig +trace example.com
```

---

## 4. Reverse DNS (rDNS) & IP Lookups

### Problem: Find domain name from an IP address (PTR Record)
```bash
# Using dig -x
dig -x 142.250.190.46 +short

# Or using host
host 142.250.190.46
```

---

## 5. Flushing DNS Cache Across Systems

```bash
# Linux (systemd-resolved)
sudo resolvectl flush-caches

# macOS (Monterey, Ventura, Sonoma, Sequoia)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows PowerShell / CMD
Clear-DnsClientCache
# Or
ipconfig /flushdns
```
