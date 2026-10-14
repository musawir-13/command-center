# 🔀 Git: Conflicts, Rebasing & Cherry-Picking

Resolve merge and rebase conflicts, cleanly rewrite branch history, and port bug fixes across branches.

---

## 1. Safely Aborting Disasters

### Problem: Merge or rebase went sideways and you want to return to how things were
```bash
# Abort an ongoing merge and restore pre-merge state
git merge --abort

# Abort an ongoing rebase and return branch to where it was
git rebase --abort

# Abort an ongoing cherry-pick
git cherry-pick --abort
```

---

## 2. Interactive Rebase (Squashing & Cleaning History)

### Problem: Branch has 8 messy commits ("fix typo", "test", "wip") and needs squashing before PR
```bash
# Start interactive rebase for the last 5 commits
git rebase -i HEAD~5
```

In the editor that opens:
* Keep `pick` on the first commit.
* Change `pick` to `squash` (or `s`) on subsequent commits to combine them into the first.
* Change `pick` to `reword` (or `r`) to rewrite a commit message.
* Change `pick` to `drop` (or `d`) to remove a commit entirely.

Save and close the editor. Git will squash the commits and prompt for a unified message.

---

## 3. Cherry-Picking Specific Fixes

### Problem: A critical bugfix was committed to `feature-branch`, but `main` needs it right now
```bash
# 1. Switch to the target branch
git checkout main

# 2. Apply only that specific commit
git cherry-pick <commit-sha>

# 3. If there is a conflict: resolve files, then:
git add .
git cherry-pick --continue
```

---

## 4. Stashing Unfinished Work

### Problem: Need to switch branches immediately without committing half-written code
```bash
# Save working changes to stash with a descriptive label
git stash push -m "WIP: auth middleware refactor"

# List all saved stashes
git stash list

# Re-apply the latest stash and delete it from stash list
git stash pop

# Or apply a specific stash by index
git stash apply stash@{2}
```
