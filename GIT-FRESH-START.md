# Start Git from scratch – steps

Do this in a terminal (e.g. Git Bash or PowerShell) in your project folder.

---

## 1. Go to project folder

```bash
cd /d/Projects/Ncets
```

---

## 2. Remove existing Git history

```bash
rm -rf .git
```

(This deletes all local Git history. Your files stay as they are.)

---

## 3. Start a new repo

```bash
git init
git branch -M main
```

---

## 4. One clean commit

```bash
git add -A
git status
```

Check that **node_modules** and **.next** do NOT appear in the list.  
If they do, your `.gitignore` is wrong – fix it before committing.

Then:

```bash
git commit -m "Initial commit"
```

---

## 5. Connect to GitHub and push

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If the repo is **empty** on GitHub, this push will be fast (one commit, no node_modules).

---

## 6. If push is slow or times out (408)

Increase Git’s buffer:

```bash
git config --global http.postBuffer 524288000
```

Then run again:

```bash
git push -u origin main
```

---

## Summary

| Step | Command |
|------|--------|
| 1 | `cd /d/Projects/Ncets` |
| 2 | `rm -rf .git` |
| 3 | `git init` then `git branch -M main` |
| 4 | `git add -A` then `git commit -m "Initial commit"` |
| 5 | `git remote add origin https://github.com/USER/REPO.git` |
| 6 | `git push -u origin main` |

After this you’ll have one clean commit and no old history.
