# Branch Cleanup Instructions for GitHub
**Manual cleanup required for branch deletion**

---

## ⚠️ Why Manual Cleanup?

Branch protection prevents automated deletion of certain branches. You'll need to delete merged branches manually via GitHub's web interface.

---

## 🗑️ Branches to Delete (4 merged branches)

These branches are already merged to main and can be safely deleted:

1. ✅ **claude/cleanup-phone-buyback-t38D9** - Cleanup work (merged)
2. ✅ **claude/fix-mobile-pricing-models-vnnNq** - PR #112 (merged)
3. ✅ **claude/review-buyback-system-Rdf7h** - Review work (merged)
4. ✅ **claude/debug-buyback-system-emLLr** - Latest fixes (ready to merge via PR)

---

## 📋 Step-by-Step Deletion Guide

### Method 1: GitHub Web Interface (Easiest)

1. **Go to Your Repository**
   ```
   https://github.com/favianyip/iboxmobile-website
   ```

2. **Navigate to Branches**
   - Click "branches" link (next to branch dropdown)
   - Or go to: `https://github.com/favianyip/iboxmobile-website/branches`

3. **Delete Merged Branches**
   - Find each branch in the list
   - Click the trash icon 🗑️ next to the branch name
   - Confirm deletion

4. **Verify Deletion**
   - Branch should disappear from the list
   - Check "Deleted branches" tab if you need to restore

### Method 2: GitHub CLI (Command Line)

If you have GitHub CLI installed:

```bash
# Delete branches one by one
gh api repos/favianyip/iboxmobile-website/git/refs/heads/claude/cleanup-phone-buyback-t38D9 -X DELETE
gh api repos/favianyip/iboxmobile-website/git/refs/heads/claude/fix-mobile-pricing-models-vnnNq -X DELETE
gh api repos/favianyip/iboxmobile-website/git/refs/heads/claude/review-buyback-system-Rdf7h -X DELETE
gh api repos/favianyip/iboxmobile-website/git/refs/heads/claude/debug-buyback-system-emLLr -X DELETE
```

### Method 3: Git Command Line (From Windows)

```cmd
:: Make sure you're on main branch first
git checkout main

:: Delete remote branches
git push origin --delete claude/cleanup-phone-buyback-t38D9
git push origin --delete claude/fix-mobile-pricing-models-vnnNq
git push origin --delete claude/review-buyback-system-Rdf7h
git push origin --delete claude/debug-buyback-system-emLLr

:: Delete local branches (if they exist)
git branch -d claude/cleanup-phone-buyback-t38D9
git branch -d claude/fix-mobile-pricing-models-vnnNq
git branch -d claude/review-buyback-system-Rdf7h
git branch -d claude/debug-buyback-system-emLLr
```

---

## 🔍 Branches to Review (6 unmerged)

These branches were not merged to main. Review before deleting:

1. **claude/audit-debug-repo-hIhWH** - Audit work
2. **claude/fix-admin-panel-2V1Li** - Admin fixes
3. **claude/fix-pricing-system-Y824B** - Pricing fixes
4. **claude/github-repo-management-2YYUi** - GitHub management
5. **claude/review-phone-pricing-A4gHH** - Pricing review
6. **copilot/sub-pr-21** - Copilot PR

### How to Review Unmerged Branches

1. **Check Branch Contents**
   ```cmd
   git checkout branch-name
   git log --oneline -10
   git diff main
   ```

2. **Decide: Merge or Delete?**
   - **If contains useful changes:** Create PR and merge to main
   - **If already fixed in main:** Delete the branch
   - **If obsolete/test work:** Delete the branch

3. **Check if Changes Already in Main**
   ```cmd
   git checkout branch-name
   git log --cherry-pick --oneline main...branch-name
   ```
   - If output is empty, branch has no unique commits → safe to delete

---

## ✅ Recommended Action Plan

### Phase 1: Merge Latest Work (PRIORITY)

1. **Create Pull Request for Current Branch**
   - Go to: `https://github.com/favianyip/iboxmobile-website/compare/main...claude/debug-buyback-system-emLLr`
   - Click "Create Pull Request"
   - Title: "Complete buyback system fixes and cleanup"
   - Add description of all fixes
   - Click "Create Pull Request"

2. **Review and Merge PR**
   - Review changes
   - Click "Merge Pull Request"
   - Click "Confirm Merge"

### Phase 2: Delete Merged Branches

After merging the PR, delete these 4 branches:
1. claude/cleanup-phone-buyback-t38D9
2. claude/fix-mobile-pricing-models-vnnNq
3. claude/review-buyback-system-Rdf7h
4. claude/debug-buyback-system-emLLr

### Phase 3: Review Unmerged Branches

For each of the 6 unmerged branches:
1. Check what changes they contain
2. Determine if changes are already in main
3. Delete if obsolete/already merged
4. Or create PR if contains useful changes

---

## 📊 Before & After

### Current State (11 branches):
```
main
claude/debug-buyback-system-emLLr (current)
claude/cleanup-phone-buyback-t38D9 (merged)
claude/fix-mobile-pricing-models-vnnNq (merged)
claude/review-buyback-system-Rdf7h (merged)
claude/audit-debug-repo-hIhWH (unmerged)
claude/fix-admin-panel-2V1Li (unmerged)
claude/fix-pricing-system-Y824B (unmerged)
claude/github-repo-management-2YYUi (unmerged)
claude/review-phone-pricing-A4gHH (unmerged)
copilot/sub-pr-21 (unmerged)
```

### After Cleanup (1-2 branches):
```
main
[optional: one active development branch]
```

---

## 🚨 Safety Reminders

### ✅ Safe to Delete:
- Branches already merged to main
- Branches with no unique commits
- Old test/experimental branches

### ⚠️ Check Before Deleting:
- Branches with unmerged commits
- Recent branches (created < 1 week ago)
- Branches you're actively working on

### 🛡️ Recovery Options:
- GitHub keeps deleted branches for 90 days
- Can restore from "Deleted branches" tab
- Or use `git reflog` to find commit hash

---

## 📞 Quick Commands Reference

```cmd
:: List all branches
git branch -a

:: Check if branch is merged
git branch -r --merged main

:: Compare branch to main
git diff main..branch-name

:: Delete remote branch
git push origin --delete branch-name

:: Delete local branch
git branch -d branch-name

:: Force delete local branch
git branch -D branch-name
```

---

## ✅ Cleanup Verification Checklist

After cleanup:
- [ ] Only main branch exists (or main + 1 active dev branch)
- [ ] All merged branches deleted
- [ ] Reviewed all unmerged branches
- [ ] No obsolete branches remaining
- [ ] Repository looks clean and organized

---

## 🎯 Expected Final State

After complete cleanup:

**Branches:** 1-2 total
- main (production code)
- [optional: current development branch]

**Documentation:** 3 essential files
- README.md
- CONDITION_MODIFIER_FIX_REPORT.md
- data/README.md

**Status:** ✨ Clean, organized, easy to maintain

---

**Ready for manual cleanup on GitHub! 🧹**
