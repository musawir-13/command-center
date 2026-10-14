# 🐘 PostgreSQL: Locks, Slowness & Emergency Ops

Solve hanging queries, deadlocks, connection pool exhaustion, and table bloat.

---

## 1. Finding & Terminating Stuck / Hanging Queries

### Problem: Database CPU is at 100% or tables are locked
```sql
-- List all active queries running for more than 30 seconds
SELECT 
    pid, 
    now() - pg_stat_activity.query_start AS duration, 
    usename, 
    state, 
    query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '30 seconds'
  AND state != 'idle'
ORDER BY duration DESC;
```

### Terminating the offending query:
```sql
-- 1. Gracefully cancel the query (SIGINT - allows transaction rollback)
SELECT pg_cancel_backend(<pid>);

-- 2. Forcefully terminate the backend connection if cancel fails (SIGTERM)
SELECT pg_terminate_backend(<pid>);
```

### Terminate ALL active queries from a specific user or database:
```sql
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'my_database' 
  AND pid <> pg_backend_pid() 
  AND state != 'idle';
```

---

## 2. Diagnosing Table & Row Locks

### Problem: Queries are stalled waiting for a lock held by an uncommitted transaction
```sql
SELECT
    blocked_locks.pid     AS blocked_pid,
    blocked_activity.usename  AS blocked_user,
    blocking_locks.pid    AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query    AS blocked_statement,
    blocking_activity.query   AS current_statement_in_blocking_process
FROM  pg_catalog.pg_locks         blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks         blocking_locks 
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
```

---

## 3. Connection Pool Saturation ("remaining connection slots are reserved")

```sql
-- Check current active, idle, and total connection count
SELECT state, count(*) 
FROM pg_stat_activity 
GROUP BY state;

-- Check max_connections limit configured
SHOW max_connections;
```

---

## 4. Table Size & Bloat

### Problem: Which tables are consuming the most disk space?
```sql
SELECT 
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS data_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS external_and_index_size
FROM pg_catalog.pg_statio_user_tables 
ORDER BY pg_total_relation_size(relid) DESC 
LIMIT 10;
```
