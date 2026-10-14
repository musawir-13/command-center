# Redis: Keys, Memory & Evictions

Diagnose high memory consumption, runaway keys, slow operations, and latency spikes in Redis.

---

## 1. Diagnosing Memory & Large Keys

> **CRITICAL WARNING:** **NEVER run `KEYS *` on a production Redis instance.** It is an $O(N)$ blocking command that freezes the single-threaded Redis event loop, causing downtime for all applications.

### Safe alternatives to inspect keys:
```bash
# Scan keys safely without blocking Redis (iterates in batches)
redis-cli --scan --pattern "user:session:*" | head -n 50

# Scan for the biggest keys in the database by memory size
redis-cli --bigkeys

# Scan for hottest keys (requires maxmemory-policy with LFU enabled)
redis-cli --hotkeys
```

---

## 2. Inspecting Memory Consumption

### Problem: Redis is throwing `OOM command not allowed when used memory > 'maxmemory'`
```bash
# Check memory statistics
redis-cli info memory
```

Key metrics to look for:
* `used_memory_human`: Real data size stored in RAM.
* `used_memory_peak_human`: Peak memory consumed.
* `mem_fragmentation_ratio`: If > 1.5, memory fragmentation is high (OS allocated much more RAM than Redis is storing).

### Check memory used by a single specific key:
```bash
redis-cli MEMORY USAGE "user:1234:cache"
```

---

## 3. Real-Time Command Inspection

### Problem: What is spamming Redis right now?
```bash
# View commands in real-time (Caution: run for 5-10 seconds only in high-throughput production)
redis-cli monitor

# Check slow queries recorded by the slow log (threshold > 10ms by default)
redis-cli SLOWLOG GET 10
```

---

## 4. Emergency Eviction & Flush

```bash
# Delete a key asynchronously in the background (prevents blocking Redis for huge sets/hashes)
redis-cli UNLINK "huge_sorted_set_key"

# Nuclear Option: Asynchronously wipe current database (background thread)
redis-cli FLUSHDB ASYNC

# Nuclear Option: Asynchronously wipe ALL databases
redis-cli FLUSHALL ASYNC
```
