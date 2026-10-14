# SSL & TLS Certificate Debugging

Diagnose expired certificates, mismatched private keys, TLS handshake failures, and intermediate chain issues with OpenSSL.

---

## 1. Remote Server Certificate Inspection

### Problem: Check certificate expiration date and issuer without a browser
```bash
# Print expiration dates, subject, and issuer for an HTTPS endpoint
openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -dates -issuer -subject
```

### Fast one-liner to get ONLY the expiration date:
```bash
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -enddate
```

---

## 2. Checking Certificate & Private Key Match

### Problem: `SSL_CTX_use_PrivateKey_file: key values mismatch`
> When installing SSL in Nginx/Apache, you must verify that the `.crt` file matches the `.key` file.

```bash
# 1. Print MD5 hash of public certificate modulus
openssl x509 -noout -modulus -in certificate.crt | openssl md5

# 2. Print MD5 hash of private key modulus
openssl rsa -noout -modulus -in private.key | openssl md5

# 3. (Optional) Print MD5 of CSR modulus
openssl req -noout -modulus -in request.csr | openssl md5
```
> **Rule:** If the MD5 hashes match, the key and certificate pair are mathematically valid. If they differ, the certificate cannot decrypt data signed with that key.

---

## 3. Inspecting Local Certificate Files

### Problem: View full details of a `.crt`, `.pem`, or `.cer` file
```bash
openssl x509 -in certificate.crt -text -noout
```

### Problem: Inspect Subject Alternative Names (SAN)
```bash
openssl x509 -in certificate.crt -noout -text | grep -A1 "Subject Alternative Name"
```

---

## 4. Converting SSL Certificate Formats

```bash
# Convert PEM (.crt, .pem) to PKCS#12 (.pfx / .p12) for Windows IIS / Azure
openssl pkcs12 -export -out bundle.pfx -inkey private.key -in cert.crt -certfile ca-bundle.crt

# Convert PFX (.pfx) back to separate PEM private key and certificate
# Extract private key:
openssl pkcs12 -in bundle.pfx -nocerts -out private.key -nodes
# Extract certificate:
openssl pkcs12 -in bundle.pfx -clcerts -nokeys -out cert.crt
```
