# Windows Extraction Guide
**How to Extract Repository to Your Windows Machine**

---

## 📁 Target Location
`C:\Users\favia\hp web`

---

## 🚀 Method 1: Git Clone (Recommended)

### Prerequisites:
- Git for Windows installed ([download here](https://git-scm.com/download/win))
- GitHub account access

### Steps:

1. **Open Command Prompt or PowerShell**
   ```cmd
   Windows Key + R → type "cmd" → Enter
   ```

2. **Navigate to Your User Folder**
   ```cmd
   cd C:\Users\favia
   ```

3. **Clone the Repository**
   ```cmd
   git clone https://github.com/favianyip/iboxmobile-website.git "hp web"
   ```

4. **Navigate to the Folder**
   ```cmd
   cd "hp web"
   ```

5. **Verify Files**
   ```cmd
   dir
   ```

✅ **Done!** All files are now in `C:\Users\favia\hp web`

---

## 📦 Method 2: Download ZIP (No Git Required)

### Steps:

1. **Go to Your GitHub Repository**
   ```
   https://github.com/favianyip/iboxmobile-website
   ```

2. **Click Green "Code" Button**
   - Select "Download ZIP"

3. **Extract the ZIP File**
   - Right-click the downloaded file
   - Select "Extract All..."
   - Choose destination: `C:\Users\favia\hp web`

4. **Rename Folder** (if needed)
   - GitHub adds "-main" or "-master" to folder name
   - Rename to just "hp web"

✅ **Done!** All files extracted to target location

---

## 🔄 Method 3: Pull Latest Changes (If Already Cloned)

### If you already have the repo on Windows:

1. **Open Command Prompt**
   ```cmd
   cd "C:\Users\favia\hp web"
   ```

2. **Pull Latest Changes**
   ```cmd
   git pull origin main
   ```

3. **Verify Update**
   ```cmd
   git log -1
   ```

✅ **Done!** Repository updated with latest changes

---

## 📂 Expected Folder Structure

After extraction, you should have:

```
C:\Users\favia\hp web\
├── index.html
├── quote.html
├── sell-phones.html
├── product.html
├── buy.html
├── admin.html
├── login.html
├── styles.css
├── quote.css
├── product.css
├── admin.css
├── login.css
├── script.js
├── quote.js
├── product.js
├── buy.js
├── admin.js
├── auth.js
├── README.md
├── CONDITION_MODIFIER_FIX_REPORT.md
├── REPO_CLEANUP_PLAN.md
├── data\
│   ├── admin-data.json
│   ├── README.md
│   └── excel-reference\
│       ├── Apple_USED_NEW_FULL_REVIEW.xlsx
│       ├── Samsung_USED_NEW_FULL_REVIEW.xlsx
│       ├── Apple_Official_Colors_From_Your_Models_UPDATED.xlsx
│       └── Samsung_ALL_Models_Official_Colors_MERGED.xlsx
└── images\
    ├── logos\
    └── phones\
```

---

## 🛠️ Working Locally & Pushing Back

### 1. Make Your Changes Locally
```cmd
cd "C:\Users\favia\hp web"
:: Edit files with your preferred editor
```

### 2. Check What Changed
```cmd
git status
git diff
```

### 3. Stage Your Changes
```cmd
git add .
:: or specific files
git add admin.js quote.html
```

### 4. Commit Your Changes
```cmd
git commit -m "Your commit message describing changes"
```

### 5. Push to GitHub
```cmd
git push origin main
```

---

## 🔧 Recommended Tools for Windows

### Code Editors:
- **Visual Studio Code** (Free, recommended)
  - Download: https://code.visualstudio.com/
  - Extensions: GitLens, Live Server, Prettier

- **Notepad++** (Free, lightweight)
  - Download: https://notepad-plus-plus.org/

- **Sublime Text** (Free trial, fast)
  - Download: https://www.sublimetext.com/

### Git GUI Clients:
- **GitHub Desktop** (Free, easy)
  - Download: https://desktop.github.com/

- **Sourcetree** (Free, powerful)
  - Download: https://www.sourcetreeapp.com/

- **GitKraken** (Free for public repos)
  - Download: https://www.gitkraken.com/

---

## 🌐 Testing Locally

### Option 1: VS Code Live Server
1. Install VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Opens at `http://localhost:5500`

### Option 2: Python Simple Server
```cmd
cd "C:\Users\favia\hp web"
python -m http.server 8000
```
Open browser: `http://localhost:8000`

### Option 3: Node.js http-server
```cmd
npm install -g http-server
cd "C:\Users\favia\hp web"
http-server
```
Open browser: `http://localhost:8080`

---

## ⚠️ Important Notes

### Git Configuration (First Time Setup)
```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Branch Management
- Always work on a feature branch, not main directly
- Create branch: `git checkout -b feature-name`
- Push branch: `git push origin feature-name`
- Create Pull Request on GitHub to merge

### File Permissions
- Make sure you have write permissions to `C:\Users\favia\hp web`
- Run Command Prompt as Administrator if needed

---

## 🆘 Troubleshooting

### Problem: Git not recognized
**Solution:** Install Git for Windows or add to PATH
```cmd
setx PATH "%PATH%;C:\Program Files\Git\cmd"
```

### Problem: Permission denied
**Solution:** Run Command Prompt as Administrator
- Right-click Command Prompt → "Run as administrator"

### Problem: Folder already exists
**Solution:** Rename or delete existing folder
```cmd
ren "hp web" "hp web old"
:: or
rmdir /s "hp web"
```

### Problem: Authentication failed
**Solution:** Use personal access token instead of password
- GitHub → Settings → Developer settings → Personal access tokens
- Generate token with repo permissions
- Use token as password when prompted

---

## 📞 Quick Reference Commands

```cmd
:: Clone repo
git clone https://github.com/favianyip/iboxmobile-website.git "hp web"

:: Update repo
git pull origin main

:: Check status
git status

:: Create branch
git checkout -b my-feature

:: Add all changes
git add .

:: Commit changes
git commit -m "Description of changes"

:: Push changes
git push origin my-feature

:: Switch branches
git checkout main
git checkout my-feature

:: View commit history
git log --oneline -10
```

---

## ✅ Verification Checklist

After extraction, verify:
- [ ] All HTML files present (7 files)
- [ ] All JS files present (7 files)
- [ ] All CSS files present (5 files)
- [ ] `/data/` folder with Excel files
- [ ] `/images/` folder with assets
- [ ] README.md and documentation files
- [ ] Can open `index.html` in browser
- [ ] Git repository initialized (`.git` folder exists)

---

## 🎯 Next Steps After Extraction

1. **Test the Website Locally**
   - Open `index.html` in browser
   - Test buyback flow
   - Verify admin panel works

2. **Make Your Enhancements**
   - Edit files in your preferred editor
   - Test changes locally
   - Commit incrementally

3. **Push Changes Back to GitHub**
   - Create feature branch
   - Commit changes with clear messages
   - Push to GitHub
   - Create Pull Request for review

4. **Deploy Updates**
   - Once merged to main
   - GitHub Pages auto-deploys
   - Verify live site

---

**Ready to enhance your website! 🚀**

*For questions or issues, check Git documentation or GitHub guides.*
