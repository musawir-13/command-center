# 🐬 MySQL & MariaDB: Queries, Locks & Performance

Identify slow queries, unblock hanging transactions, and inspect process lists.

---

## 1. Finding & Killing Hanging MySQL Queries

### Problem: `ERROR 1040 (HY000): Too many connections` or queries running for hours
```sql
-- View all currently executing queries and their duration in seconds
SHOW FULL PROCESSLIST;

-- Or query the information_schema for queries running longer than 15 seconds
SELECT id, user, host, db, command, time, state, info 
FROM information_schema.processlist 
WHERE command != 'Sleep' AND time > 15 
ORDER BY time DESC;
```

### Kill the offending query:
```sql
-- Terminate query by ID (found in first column of processlist)
KILL <process_id>;
```

---

## 2. Checking InnoDB Lock Status & Deadlocks

### Problem: Queries are stuck in `Waiting for table metadata lock` or `lock wait timeout exceeded`
```sql
-- Print complete InnoDB engine status including the LAST DETECTED DEADLOCK
SHOW ENGINE INNODB STATUS\G
```

### Problem: Which transaction is locking which row?
```sql
SELECT 
    r.trx_id waiting_trx_id,
    r.trx_mysql_thread_id waiting_thread,
    r.trx_query waiting_query,
    b.trx_id blocking_trx_id,
    b.trx_mysql_thread_id blocking_thread,
    b.trx_query blocking_query
FROM performance_schema.data_lock_waits w
INNER JOIN information_schema.innodb_trx b 
    ON b.trx_id = w.blocking_engine_transaction_id
INNER JOIN information_schema.innodb_trx r 
    ON r.trx_id = w.requesting_engine_transaction_id;
```

---

## 3. Query Performance & Index Validation

### Problem: Why is a query slow?
```sql
-- Add EXPLAIN or EXPLAIN ANALYZE (MySQL 8.0+) before the query
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 42 
ORDER BY created_at DESC 
LIMIT 20;
```
> **Warning signs in `EXPLAIN` output:**
> * `type: ALL` indicates a full table scan (missing index!).
> * `Using filesort` or `Using temporary` indicates in-memory sorting bottlenecks.
