# 🌿 Git: Undo, Uncommit & Lost Code Recovery

Commands to recover lost commits, undo accidental resets, discard local changes, and fix mistakes safely.

---

## 1. The Emergency Lifesaver: `git reflog`

> **Golden Rule of Git:** As long as code was committed or added to the staging area at least once, Git almost never deletes it immediately. `git reflog` keeps an audit trail of every `HEAD` pointer movement.

### Problem: Accidentally deleted a branch or ran `git reset --hard` and lost work
```bash
# 1. View the history of all HEAD actions
git reflog

# Output example:
# 4a2b91c HEAD@{0}: reset: moving to HEAD~1
# 8f1e24a HEAD@{1}: commit: Add stripe billing webhook  <-- YOUR LOST COMMIT!
# 1c3d5e7 HEAD@{2}: checkout: moving from main to dev

# 2. Recover the lost commit into a new branch immediately
git checkout -b recovered-work 8f1e24a
```

---

## 2. Undoing the Last Commit

### Problem: Committed too early, forgot a file, or need to edit the commit message
```bash
# Undo the commit, but KEEP all modified files in your staging area
git reset --soft HEAD~1

# Undo the commit, and move modified files to UNSTAGED working tree
git reset HEAD~1

# Just change the message of the most recent commit
git commit --amend -m "New updated message"

# Add a forgotten file to the most recent commit without creating a new commit
git add forgotten-file.ts
git commit --amend --no-edit
```

---

## 3. Discarding Local Uncommitted Changes

### Problem: Messed up local code and want to restore files cleanly to current branch HEAD
```bash
# Discard changes in a specific file
git restore path/to/file.ts

# Discard all changes in all tracked files across the repo
git restore .

# Delete untracked files and folders (caution!)
# -d = remove directories, -f = force, -n = dry run first
git clean -fdn   # preview what will be removed
git clean -fd    # execute deletion
```

---

## 4. Reverting a Pushed Commit Safely

### Problem: A buggy commit was already pushed to `main`/`production`
> Never use `git reset --hard` on shared remote branches. Use `git revert` to create an inverse commit cleanly.

```bash
# Creates a new commit that safely reverses the changes of <commit-sha>
git revert <commit-sha> --no-edit

# Revert a merge commit (specifying parent 1 as mainline)
git revert -m 1 <merge-commit-sha>
```
