# 🐳 Docker Emergencies & Space Reclaim

Resolve disk space exhaustion, exited containers with error codes, and orphaned networks.

---

## 1. Reclaiming Gigabytes of Docker Disk Space

### Problem: Docker daemon consumed all disk space on host
```bash
# Check how much disk space Docker is currently consuming
docker system df

# Check detailed breakdown of images, containers, and local volumes
docker system df -v
```

### Problem: Complete cleanup of unused images, build caches, and containers
```bash
# Safely remove all stopped containers, unused networks, and dangling images
docker system prune

# Aggressive cleanup: remove ALL stopped containers, all unused images (not just dangling), and unused volumes
# CAUTION: This will delete unused data volumes!
docker system prune -a --volumes --force

# Remove builder cache specifically (often hundreds of gigabytes in CI/CD)
docker builder prune -a --force
```

---

## 2. Container Exit Code Diagnosis

| Exit Code | Cause | Fix / Next Step |
| :--- | :--- | :--- |
| **137** | **Killed by OOM (Out Of Memory) or `kill -9`** | Inspect memory limits (`docker inspect <id> \| grep -i oom`) and increase container RAM. |
| **139** | **Segmentation Fault** | C/C++ or native binary crashed inside container. |
| **1** | **Application Error / Exception** | Inspect logs using `docker logs --tail 100 <id>`. |
| **127** | **Command / Binary Not Found** | Missing executable or bad `ENTRYPOINT`/`CMD` path. |
| **126** | **Permission Denied** | Entrypoint script does not have execute (`+x`) permissions. |

---

## 3. Investigating Unresponsive or Failing Containers

### Problem: Container crashes immediately on launch
```bash
# Check the last 100 lines of container logs
docker logs --tail 100 -f <container_name_or_id>

# Override the entrypoint with a shell to debug inside
docker run --rm -it --entrypoint sh <image_name>
```

### Problem: Inspecting real-time CPU & Memory usage per container
```bash
docker stats --no-stream
```

### Problem: Copying files out of a crashed / stopped container
```bash
# Syntax: docker cp <container_id>:<path_inside> <host_destination>
docker cp my-broken-container:/var/log/app/error.log ./error.log
```

---

## 4. Port Binding & Network Conflicts

### Problem: `driver failed programming external connectivity on endpoint ...: Bind for 0.0.0.0:80 failed: port is already allocated`
```bash
# Check if another Docker container is already holding the port
docker ps --filter "publish=80"

# Kill all currently running Docker containers (nuclear reset for local dev)
docker stop $(docker ps -q)
```
