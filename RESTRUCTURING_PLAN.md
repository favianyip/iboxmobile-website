# 🏗️ IBOX MOBILE SINGAPORE - Repository Restructuring Plan

**Date:** 2026-01-18
**Analyst:** Senior Data Analyst + Software Developer

---

## 📋 CURRENT STATE ANALYSIS

### Files Inventory (150+ files):
- **HTML Pages:** 7 files (index, quote, sell-phones, admin, buy, product, login, price-manager)
- **JavaScript:** 20+ files (core, utilities, imports, scrapers)
- **CSS:** 5 files (styles, quote, admin, product, login)
- **Excel Data:** 5 files (Apple/Samsung pricing & colors)
- **JSON Data:** 5+ files (prices, competitor data, admin data)
- **Documentation:** 11 MD files (guides, analysis, summaries)
- **Images:** 50+ phone images, 2 logos
- **Python Scripts:** 5+ price scrapers
- **Miscellaneous:** CSV, bat files, CNAME

---

## 🗂️ PROPOSED NEW STRUCTURE

```
iboxmobile-website/
├── README.md                          # Main GitHub README
├── .gitignore                         # Git ignore rules
├── CNAME                              # Domain config
├── .nojekyll                          # GitHub Pages config
│
├── 📄 PUBLIC PAGES (Root - Web Accessible)
│   ├── index.html                     # Homepage
│   ├── sell-phones.html               # Buyback browsing page
│   ├── quote.html                     # Quote wizard
│   ├── product.html                   # Refurbished phones catalog
│   ├── buy.html                       # Purchase page
│   └── login.html                     # Admin login
│
├── 🎨 ASSETS/
│   ├── css/
│   │   ├── styles.css                 # Global styles
│   │   ├── quote.css                  # Quote page styles
│   │   ├── admin.css                  # Admin panel styles
│   │   ├── product.css                # Product page styles
│   │   └── login.css                  # Login page styles
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── script.js              # Main app logic
│   │   │   ├── quote.js               # Quote wizard logic
│   │   │   ├── product.js             # Product page logic
│   │   │   ├── buy.js                 # Purchase logic
│   │   │   └── auth.js                # Authentication
│   │   │
│   │   ├── admin/
│   │   │   └── admin.js               # Admin panel logic
│   │   │
│   │   └── utils/
│   │       ├── smart-image-mapper.js  # Image fallback system
│   │       └── master-color-database.js # Official factory colors
│   │
│   └── images/
│       ├── logos/
│       │   ├── apple-logo.svg
│       │   └── samsung-logo.svg
│       │
│       └── phones/                    # 50+ phone images
│           ├── iphone-*.jpg
│           └── galaxy-*.jpg
│
├── 🔧 ADMIN/
│   ├── admin.html                     # Admin panel UI
│   ├── price-manager.html             # Price management (legacy/unused?)
│   │
│   └── data-imports/
│       ├── import-exact-prices.js     # Main Excel → DB import
│       ├── bulk-import-updated-prices.js
│       ├── bulk-import-apple-prices.js
│       └── import-benchmark-prices.js
│
├── 📊 DATA/
│   ├── reference/                     # Excel source files
│   │   ├── Apple_USED_NEW_FULL_REVIEW.xlsx
│   │   ├── Samsung_USED_NEW_FULL_REVIEW.xlsx
│   │   ├── Apple_Official_Colors_UPDATED.xlsx
│   │   ├── Samsung_ALL_Models_Official_Colors_MERGED.xlsx
│   │   └── iPhone_Benchmark_Price_List.xlsx
│   │
│   ├── runtime/                       # Generated/cached data
│   │   ├── admin-data.json           # Persistent storage export
│   │   ├── price_data.json           # Dynamic prices
│   │   ├── competitor_prices.json    # Competitor data
│   │   ├── direct_prices.json        # Direct price lookup
│   │   └── apple-products-prices.csv
│   │
│   └── README.md                      # Data folder documentation
│
├── 🐍 TOOLS/
│   ├── price-scraper/                 # Python price scrapers
│   │   ├── README.md
│   │   ├── sellup_smart_scraper.py
│   │   ├── update_all_prices.py
│   │   ├── optimize_prices.py
│   │   ├── final_real_prices.py
│   │   ├── generate_direct_prices.py
│   │   ├── UPDATE_PRICES.bat
│   │   └── FINAL_512_REAL_PRICES.json
│   │
│   ├── diagnostics/                   # Debug utilities
│   │   ├── diagnose-missing-images.js
│   │   ├── diagnose-colors.js
│   │   └── extract-current-colors.js
│   │
│   └── generators/                    # Data generators
│       ├── generate-apple-prices-excel.js
│       ├── image-scraper-solution.js
│       └── background-remover.js
│
├── 📚 DOCS/
│   ├── guides/
│   │   ├── ADMIN_GUIDE.md            # How to use admin panel
│   │   ├── DATA_PERSISTENCE_GUIDE.md # Data management
│   │   ├── PRICE_MANAGEMENT_GUIDE.md # Pricing workflows
│   │   ├── DEPLOYMENT_GUIDE.md       # Deployment instructions
│   │   └── LOGO_UPLOAD_GUIDE.md      # Logo customization
│   │
│   ├── technical/
│   │   ├── SYSTEM_ANALYSIS_REPORT.md      # Full system audit
│   │   ├── FIXES_COMPLETED_SUMMARY.md     # Recent fixes log
│   │   ├── COMPETITIVE_PRICING_INTEGRATION.md
│   │   ├── SCRAPING_APIS.md               # API documentation
│   │   └── DEPLOYMENT_FIX.md              # Deployment issues
│   │
│   └── legacy/                        # Obsolete documentation
│       └── UPLOAD_YOUR_LOGO_HERE.md   # (Replace with LOGO_UPLOAD_GUIDE)
│
└── 🧪 SCRIPTS/                        # Utility scripts
    ├── parse-competitor-prices.js     # Competitor data parser
    └── update-prices.js               # Price update utility
```

---

## 🗑️ FILES TO DELETE (Unnecessary/Redundant)

### 1. Obsolete Documentation:
- ❌ `UPLOAD_YOUR_LOGO_HERE.md` - Replaced by LOGO_UPLOAD_GUIDE.md
- ❌ `DEPLOYMENT_FIX.md` - Merged into DEPLOYMENT_GUIDE.md

### 2. Unused HTML Pages:
- ⚠️ `price-manager.html` - Check if used by admin panel
  - If NOT referenced anywhere, DELETE
  - If referenced, KEEP but move to /admin/

### 3. Duplicate/Redundant Scripts:
- ❌ `update-prices.js` - Functionality covered by import scripts
- ⚠️ Check all bulk-import-*.js - May have overlapping functionality

### 4. Temporary/Debug Files:
- ❌ `apple-products-prices.csv` - Temp file, regenerate as needed

### 5. Obsolete Data Files:
- ⚠️ Review all JSON files in root - Move to /data/runtime/

---

## ✅ FILES TO KEEP (Essential)

### Core HTML Pages:
✅ index.html, sell-phones.html, quote.html, product.html, buy.html, login.html, admin.html

### Core JavaScript:
✅ script.js, quote.js, admin.js, product.js, buy.js, auth.js
✅ smart-image-mapper.js, master-color-database.js
✅ import-exact-prices.js (main data import)

### Core CSS:
✅ styles.css, quote.css, admin.css, product.css, login.css

### Essential Data:
✅ All 5 Excel files (source of truth)
✅ admin-data.json (persistent storage)
✅ All phone images (50+ files)

### Key Documentation:
✅ ADMIN_GUIDE.md
✅ DATA_PERSISTENCE_GUIDE.md
✅ SYSTEM_ANALYSIS_REPORT.md
✅ FIXES_COMPLETED_SUMMARY.md

---

## 📝 ACTION ITEMS

### Phase 1: Create New Folder Structure (No file moves yet)
1. Create `/assets/css/`, `/assets/js/core/`, `/assets/js/admin/`, `/assets/js/utils/`
2. Create `/admin/`, `/admin/data-imports/`
3. Create `/data/reference/`, `/data/runtime/`
4. Create `/tools/diagnostics/`, `/tools/generators/`
5. Create `/docs/guides/`, `/docs/technical/`, `/docs/legacy/`
6. Create `/scripts/`

### Phase 2: Move Files to New Structure
1. Move CSS files → `/assets/css/`
2. Move JS files → `/assets/js/{core,admin,utils}/`
3. Move Excel files → `/data/reference/`
4. Move JSON files → `/data/runtime/`
5. Move documentation → `/docs/{guides,technical}/`
6. Move Python scripts → `/tools/price-scraper/`
7. Move diagnostics → `/tools/diagnostics/`

### Phase 3: Update HTML References
1. Update ALL <script src="..."> paths in HTML files
2. Update ALL <link href="..."> paths in HTML files
3. Update ALL image src="..." paths

### Phase 4: Delete Obsolete Files
1. Remove redundant documentation
2. Remove temporary files
3. Clean up unused scripts

### Phase 5: Create README.md
1. Professional project overview
2. Quick start guide
3. Feature list
4. Deployment instructions
5. License and contact info

---

## 🚨 RISKS & MITIGATION

### Risk 1: Breaking Links
**Mitigation:** Test every page after restructuring

### Risk 2: Lost Files
**Mitigation:** Git commit before any deletions

### Risk 3: Production Downtime
**Mitigation:** Do restructuring on branch, test, then merge

---

## 📊 ESTIMATED IMPACT

- **Files to Move:** ~80 files
- **HTML Files to Update:** 7 files
- **Links to Update:** ~50+ script/css references
- **Files to Delete:** 5-10 files
- **New Folders:** 15+ folders
- **Documentation:** 1 new README.md

---

**Status:** PLAN READY - Awaiting approval to execute
