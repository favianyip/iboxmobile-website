# Logo Upload Instructions

## Current Status
The logo text "IBox Mobile Singapore" is now styled in **gold color (#C9A84C)** to match your website design.

## How to Upload Your New Logo

Your website is configured to use `images/ibox-logo.png` as the primary logo file.

### Step 1: Prepare Your Logo
1. Make sure your logo file has a **transparent background** (PNG format)
2. Recommended size: **400px width x 200px height** (or similar proportions)
3. The logo should be in PNG format for best transparency support

### Step 2: Upload to Repository
You have two options:

#### Option A: Manual Upload
1. Locate your logo file in your computer's Downloads folder
2. Rename it to: `ibox-logo.png`
3. Copy/upload this file to the `/images/` folder in your repository
4. The website will automatically use this logo

#### Option B: Git Command
```bash
# Navigate to your project directory
cd /home/user/iboxmobile-website

# Copy your logo from Downloads
cp ~/Downloads/your-logo-file.png images/ibox-logo.png

# Commit and push
git add images/ibox-logo.png
git commit -m "Upload new company logo"
git push
```

### Step 3: Verify
1. Open your website in a browser
2. Check that the logo displays correctly with transparent background
3. Verify "IBox Mobile Singapore" text appears in gold color next to the logo

## Current Logo Configuration

The logo appears on all pages:
- **index.html** (main page)
- **sell-phones.html**
- **quote.html**
- **login.html**

All pages use the same structure:
```html
<img src="images/ibox-logo.png" alt="IBOX MOBILE SINGAPORE">
<span class="logo-text">IBox Mobile Singapore</span>
```

## Styling

- **Logo Image**: 50px height, auto width, max 120px
- **Logo Text**: 1.3rem font size, **gold color #C9A84C**, bold weight
- **Gap**: 1rem between image and text

## Fallback System

If `ibox-logo.png` doesn't load:
1. System tries to load `ibox-logo.svg` as backup
2. Text is always visible as final fallback

## Need Help?

If you encounter any issues:
1. Check that the PNG file has transparency (no white/colored background)
2. Verify file name is exactly: `ibox-logo.png`
3. Confirm file is in the `/images/` directory
4. Clear browser cache and refresh

Your logo is ready to be uploaded! Just replace the file at `images/ibox-logo.png`.
