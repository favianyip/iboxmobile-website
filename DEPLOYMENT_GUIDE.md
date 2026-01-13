# IBOX MOBILE - Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `iboxmobile-website`
3. Description: `IBOX MOBILE SINGAPORE - Phone Buyback Platform`
4. Click "Create repository"
5. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/iboxmobile-website.git`)

## Step 2: Push Code to GitHub

Open Command Prompt/PowerShell in the project folder and run:

```bash
cd "C:\Users\favia\hp web"
git remote add origin https://github.com/YOUR_USERNAME/iboxmobile-website.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to iboxmobile.net

### Option A: Netlify (Recommended - Easiest)

1. Go to https://netlify.com and sign in with GitHub
2. Click "Add new site" > "Import an existing project"
3. Select your `iboxmobile-website` repository
4. Click "Deploy site"
5. Once deployed, go to "Domain settings"
6. Click "Add custom domain" and enter `iboxmobile.net`
7. Follow Netlify's DNS instructions

### Option B: GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" > "Pages"
3. Source: "Deploy from a branch"
4. Branch: `main`, folder: `/(root)`
5. Click "Save"
6. Under "Custom domain", enter `iboxmobile.net`
7. Update your domain DNS:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `YOUR_USERNAME.github.io`

### Option C: Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import `iboxmobile-website`
4. Click "Deploy"
5. Go to "Settings" > "Domains"
6. Add `iboxmobile.net`
7. Follow Vercel's DNS instructions

## DNS Configuration (for iboxmobile.net)

Go to your domain registrar's DNS settings and add:

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**For GitHub Pages:**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

## After Deployment

- Site will be live at https://iboxmobile.net
- SSL certificate will be automatically provisioned
- Updates: Push changes to GitHub, site auto-updates

## Admin Access

- URL: https://iboxmobile.net/login.html
- Username: admin
- Password: admin123

**Remember to change the admin password after launch!**
