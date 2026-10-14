# Kubernetes Pod & Cluster Debugging

Diagnose `CrashLoopBackOff`, `ImagePullBackOff`, `Pending` pods, and cluster connectivity.

---

## 1. The Pod Debugging Sequence

When a pod is failing, execute this 4-step triage sequence:

```
1. kubectl get pods -A
   └─ Identify Pod Name & Namespace
2. kubectl describe pod <pod-name> -n <ns>
   └─ Check "Events" section at the bottom (Scheduling, pulling, mounting errors)
3. kubectl logs <pod-name> -n <ns> --previous
   └─ Inspect the crash log of the terminated container
4. kubectl exec -it <pod-name> -n <ns> -- /bin/sh
   └─ Interactive inspection inside the environment (if running)
```

---

## 2. Common Pod Failure Modes & Solutions

### Problem: `CrashLoopBackOff`
> The container started, hit an uncaught exception or fatal error, and exited. Kubernetes is retrying with an exponential backoff.

```bash
# Print the logs from the previous failed container run (crucial!)
kubectl logs <pod-name> -n <namespace> --previous

# If multi-container pod, specify the container name:
kubectl logs <pod-name> -c <container-name> -n <namespace> --previous
```

---

### Problem: `ImagePullBackOff` or `ErrImagePull`
> Kubernetes cannot retrieve the container image from the registry.

```bash
# Inspect the exact reason (e.g. 401 Unauthorized, 404 Not Found, bad tag)
kubectl describe pod <pod-name> -n <namespace> | grep -A 10 "Events:"
```
* **Fix checklist:**
  1. Typo in image name or tag.
  2. Missing `imagePullSecrets` in pod spec for private Docker registries.
  3. Registry rate limiting (e.g., Docker Hub free tier limits).

---

### Problem: Pod is stuck in `Pending`
> The Kubernetes scheduler cannot find a node with enough CPU/RAM or matching node affinities.

```bash
# Check why scheduler skipped nodes
kubectl describe pod <pod-name> -n <namespace> | grep -A 5 "Warning  FailedScheduling"

# Check cluster node resource allocation and capacity
kubectl top nodes
kubectl describe node <node-name> | grep -A 10 "Allocated resources"
```

---

## 3. Fast Debugging Workflows

### Problem: Access an internal cluster service from your local machine
```bash
# Port-forward a ClusterIP service to localhost:8080
kubectl port-forward svc/<service-name> 8080:80 -n <namespace>
```

### Problem: Ephemeral Debugging Container (Kubernetes 1.25+)
> When a container has no shell or utilities (distroless):

```bash
kubectl debug -it <pod-name> --image=nicolaka/netshoot --target=<container-name>
```

### Problem: Force delete a stuck pod in `Terminating`
```bash
kubectl delete pod <pod-name> -n <namespace> --grace-period=0 --force
```
