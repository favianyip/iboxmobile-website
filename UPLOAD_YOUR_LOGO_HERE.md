# IMPORTANT: Upload Your Logo

## Your Logo File: "githubibox"

I've increased the logo size to **70px height x 200px max-width** (much bigger!).

### To Upload Your Logo:

**Step 1:** Locate your renamed logo file
- File name: `githubibox` (or `githubibox.png`)
- Location: Your Downloads folder

**Step 2:** Copy to repository
```bash
# Option A: If file has extension
cp ~/Downloads/githubibox.png /home/user/iboxmobile-website/images/ibox-logo.png

# Option B: If file has no extension
cp ~/Downloads/githubibox /home/user/iboxmobile-website/images/ibox-logo.png
```

**Step 3:** Commit and push
```bash
cd /home/user/iboxmobile-website
git add images/ibox-logo.png
git commit -m "Upload company logo"
git push
```

### Quick Command (All-in-One):
```bash
# Copy your logo (adjust path if needed)
cp ~/Downloads/githubibox* /home/user/iboxmobile-website/images/ibox-logo.png

# Commit and push
cd /home/user/iboxmobile-website && git add images/ibox-logo.png && git commit -m "Upload company logo" && git push
```

## Current Logo Settings:
- **Size:** 70px height (was 50px)
- **Max Width:** 200px (was 120px)
- **Format:** PNG with transparent background
- **Position:** Next to gold "IBox Mobile Singapore" text

The logo is now **40% bigger** than before!

Once you upload your `githubibox` file to `images/ibox-logo.png`, it will display automatically across all pages.
