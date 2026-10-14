# 🧹 Git: Purging Huge Files & History Cleanup

Remove accidentally committed secrets, API keys, or multi-gigabyte binaries from Git's entire commit history.

---

## 1. Finding What Bloats Your `.git` Directory

### Problem: Clone size is 500MB even though project files are small
```bash
# Find top 10 largest objects across all Git history
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  | sed -n 's/^blob //p' \
  | sort -nr \
  | head -n 10
```

---

## 2. Completely Purging Sensitive Files or Binaries

> Simply deleting a file in a new commit (`git rm .env`) does NOT remove it from past Git history. Anyone cloning the repo can view the secret.

### Recommended Tool: `git-filter-repo` (Modern & Fast)
```bash
# Install git-filter-repo (Python-based standard recommended by Git documentation)
pip install git-filter-repo

# Completely eradicate a specific file from all commits, branches, and tags
git filter-repo --invert-paths --path-match .env

# Purge any file larger than 50MB across history
git filter-repo --strip-blobs-bigger-than 50M
```

### Alternative: BFG Repo-Cleaner
```bash
# Delete file named passwords.txt from all revisions
bfg --delete-files passwords.txt

# Force expire reflog and reclaim disk space
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

> **Warning:** Rewriting history changes all commit SHAs. You must coordinate with your team before running `git push --force-with-lease --all`.
