# cURL & HTTP Diagnostic Suite

Diagnose API latency breakdowns, test headers, download files, and troubleshoot REST/GraphQL endpoints.

---

## 1. Measuring Exact Millisecond Latency Breakdown

### Problem: Where is the API slow? (DNS, SSL Handshake, TTFB, or Download?)

Create a format string template or run this one-liner:

```bash
curl -w "\n┌──────────────────────────────────────────\n\
│ DNS Lookup Time:     %{time_namelookup}s\n\
│ TCP Connect Time:    %{time_connect}s\n\
│ TLS Handshake Time:  %{time_appconnect}s\n\
│ Pre-transfer Time:   %{time_pretransfer}s\n\
│ Time to First Byte:  %{time_starttransfer}s\n\
│ Total Duration:      %{time_total}s\n\
└──────────────────────────────────────────\n" \
-o /dev/null -s https://api.example.com/v1/health
```

---

## 2. Common API Request Recipes

### Send JSON POST request with Bearer Auth:
```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name": "Alice", "role": "admin"}'
```

### Inspect HTTP Response Headers ONLY (`HEAD` request):
```bash
curl -I https://api.example.com
```

### Print both response headers AND body:
```bash
curl -i https://api.example.com/data
```

### Follow HTTP 301/302 Redirects automatically:
```bash
# -L instructs curl to follow the Location: header
curl -L http://example.com
```

---

## 3. Debugging SSL & Low-Level Network

### Problem: Bypass invalid or self-signed SSL certificates for local dev
```bash
# -k / --insecure ignores certificate validation errors
curl -k https://localhost:8443/api
```

### Problem: Full verbose protocol trace (Headers sent, received, TLS negotiation)
```bash
curl -v https://api.example.com
```

### Problem: Force HTTP/2 or HTTP/3
```bash
# Force HTTP/2 multiplexing
curl --http2 -I https://api.example.com

# Force HTTP/3 (QUIC)
curl --http3 -I https://cloudflare.com
```
