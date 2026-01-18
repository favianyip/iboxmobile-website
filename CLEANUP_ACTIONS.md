# 🧹 Repository Cleanup Actions

**Date:** 2026-01-18
**Status:** Ready for execution

## Files to DELETE (Confirmed Obsolete)

### 1. price-manager.html
- **Reason:** Not referenced anywhere, duplicate of admin panel functionality
- **Action:** DELETE

### 2. UPLOAD_YOUR_LOGO_HERE.md
- **Reason:** Replaced by LOGO_UPLOAD_GUIDE.md
- **Action:** DELETE

### 3. apple-products-prices.csv
- **Reason:** Temporary export file, can be regenerated
- **Action:** DELETE

### 4. update-prices.js
- **Reason:** Functionality covered by import-exact-prices.js
- **Action:** DELETE

## Files to KEEP (Essential)

### Core Pages (7 files):
✅ index.html
✅ sell-phones.html
✅ quote.html
✅ product.html
✅ buy.html
✅ login.html
✅ admin.html

### Core JavaScript (11 files):
✅ script.js
✅ quote.js
✅ admin.js
✅ product.js
✅ buy.js
✅ auth.js
✅ smart-image-mapper.js
✅ master-color-database.js
✅ import-exact-prices.js
✅ import-benchmark-prices.js
✅ scripts/parse-competitor-prices.js

### Core CSS (5 files):
✅ styles.css
✅ quote.css
✅ admin.css
✅ product.css
✅ login.css

### Data Import Scripts (3 files):
✅ bulk-import-apple-prices.js
✅ bulk-import-updated-prices.js
✅ import-benchmark-prices.js

### Utilities (3 files):
✅ diagnose-missing-images.js
✅ diagnose-colors.js
✅ extract-current-colors.js

### Generators (3 files):
✅ generate-apple-prices-excel.js
✅ image-scraper-solution.js
✅ background-remover.js

### Excel Data (5 files):
✅ Apple_USED_NEW_FULL_REVIEW.xlsx
✅ Samsung_USED_NEW_FULL_REVIEW.xlsx
✅ Apple_Official_Colors_UPDATED.xlsx
✅ Samsung_ALL_Models_Official_Colors_MERGED.xlsx
✅ iPhone_Benchmark_Price_List.xlsx

### JSON Data (5 files):
✅ price_data.json
✅ competitor_prices.json
✅ direct_prices.json
✅ data/admin-data.json

### Documentation (Keep All 11 .md files):
✅ ADMIN_GUIDE.md
✅ DATA_PERSISTENCE_GUIDE.md
✅ PRICE_MANAGEMENT_GUIDE.md
✅ DEPLOYMENT_GUIDE.md
✅ LOGO_UPLOAD_GUIDE.md
✅ SYSTEM_ANALYSIS_REPORT.md
✅ FIXES_COMPLETED_SUMMARY.md
✅ COMPETITIVE_PRICING_INTEGRATION.md
✅ SCRAPING_APIS.md
✅ DEPLOYMENT_FIX.md
✅ README.md (NEW)
✅ RESTRUCTURING_PLAN.md (NEW)

### Configuration:
✅ CNAME
✅ .nojekyll
✅ .gitignore (NEW)

### Images:
✅ All images/ folder contents (50+ phone images + 2 logos)

### Python Tools:
✅ price-scraper/ folder (all contents)

## Summary:
- **DELETE:** 4 files
- **KEEP:** 100+ files
- **NEW:** 3 files (README.md, .gitignore, RESTRUCTURING_PLAN.md)
