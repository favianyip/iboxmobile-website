# 📱 IBOX MOBILE SINGAPORE

> **Professional Mobile Phone Buyback & Refurbished Phones E-Commerce Platform**

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-success)]()

A complete web application for mobile phone buyback services and refurbished phone sales in Singapore. Features intelligent price calculation, comprehensive admin panel, and real-time inventory management.

---

## ✨ Features

### 🔄 **Buyback System**
- **Multi-Step Quote Wizard** - Interactive 4-step buyback flow
- **40+ Phone Models** - iPhone, Samsung Galaxy, and more
- **Intelligent Pricing** - Dynamic pricing based on condition, storage, color
- **Condition Assessment** - Body, screen, battery health, functional issues
- **Instant Quotes** - Real-time price calculation
- **Appointment Booking** - Store visit scheduling

### 🛍️ **Refurbished Phone Store**
- **Product Catalog** - Browse refurbished phones by brand/model
- **Variant Selection** - Storage, color, cosmetic grade options
- **Stock Management** - Real-time availability tracking
- **Financing Options** - Installment payment display
- **Trade-In Integration** - Direct link to buyback for same model

### 🎛️ **Admin Panel**
- **Price Management** - Import from Excel, bulk updates
- **Inventory Control** - Stock levels, visibility toggles
- **Color Database** - 200+ official factory colors synced
- **Condition Modifiers** - Configure deduction rules
- **Data Export/Import** - JSON backup & restore
- **User Management** - Admin authentication

### 📊 **Data Management**
- **Excel Integration** - Import pricing from spreadsheets
- **LocalStorage Persistence** - Browser-based data storage
- **Git-Persisted Backups** - Version-controlled JSON exports
- **Master Color Database** - Official Apple/Samsung colors
- **Smart Image Mapping** - Automatic fallback for missing images

---

## 🚀 Quick Start

### **For Customers:**
1. Visit the homepage: `index.html`
2. Click **"Sell Phones"** → Choose **Used** or **New**
3. Select your device brand and model
4. Complete the condition assessment
5. Get instant quote and book appointment

### **For Admins:**
1. Navigate to `admin.html`
2. Login with admin credentials
3. Click **"Import Exact Prices"** to load Excel data
4. Manage inventory, prices, and bookings
5. Export data for backup

---

## 📂 Project Structure

```
iboxmobile-website/
├── 📄 Customer Pages
│   ├── index.html              # Homepage
│   ├── sell-phones.html        # Buyback model selection
│   ├── quote.html              # Quote wizard
│   ├── product.html            # Refurbished catalog
│   └── buy.html                # Purchase page
│
├── 🔐 Admin Pages
│   ├── admin.html              # Admin panel
│   └── login.html              # Authentication
│
├── 🎨 Assets
│   ├── CSS                     # Styling (5 files)
│   ├── JavaScript              # Logic (11 core files)
│   └── Images                  # Phone images, logos
│
├── 📊 Data
│   ├── Excel Files             # Price reference (5 files)
│   ├── JSON Data               # Runtime data
│   └── admin-data.json         # Persistent storage
│
├── 🐍 Tools
│   ├── price-scraper/          # Python scrapers
│   ├── data-imports/           # Excel import scripts
│   └── diagnostics/            # Debug utilities
│
└── 📚 Documentation
    ├── ADMIN_GUIDE.md          # Admin panel guide
    ├── DATA_PERSISTENCE_GUIDE.md
    ├── SYSTEM_ANALYSIS_REPORT.md
    └── FIXES_COMPLETED_SUMMARY.md
```

---

## 💻 Technology Stack

### **Frontend:**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence

### **Admin Tools:**
- **Excel Integration** - XLSX price imports
- **JSON Export/Import** - Data backup system
- **Git Version Control** - Data persistence across deployments

### **Price Scrapers (Optional):**
- **Python 3** - Web scraping scripts
- **Competitor Analysis** - WhyMobile, RedWhite, SellUp

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EXCEL FILES                          │
│  (Source of Truth - Manual Updates)                     │
│  • Apple_USED_NEW_FULL_REVIEW.xlsx                      │
│  • Samsung_USED_NEW_FULL_REVIEW.xlsx                    │
│  • Official Colors (Apple/Samsung)                       │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Import via Admin Panel
                 ▼
┌─────────────────────────────────────────────────────────┐
│              IMPORT SCRIPTS                              │
│  • import-exact-prices.js → importExactPrices()         │
│  • master-color-database.js → updateAllColors()         │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Save to
                 ▼
┌─────────────────────────────────────────────────────────┐
│         BROWSER LOCALSTORAGE                            │
│  ktmobile_phones, ktmobile_conditions, etc.             │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Export/Backup
                 ▼
┌─────────────────────────────────────────────────────────┐
│         GIT REPOSITORY                                   │
│  /data/admin-data.json (version controlled)             │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Read by
                 ▼
┌─────────────────────────────────────────────────────────┐
│      CUSTOMER-FACING PAGES                              │
│  index.html → sell-phones.html → quote.html             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/favianyip/iboxmobile-website.git
cd iboxmobile-website
```

### **2. No Build Required!**
This is a static website - just open `index.html` in a browser or deploy to any static host.

### **3. Admin Panel Setup**
```bash
# Open admin panel
open admin.html  # or navigate in browser

# Login with credentials
# Click "Import Exact Prices" to load data from Excel
# Click "Update All Colors" to sync 200+ official colors
# Click "Export Data" to backup to /data/admin-data.json
```

### **4. Excel Data Preparation**
Place your Excel pricing files in `/data/reference/`:
- `Apple_USED_NEW_FULL_REVIEW.xlsx`
- `Samsung_USED_NEW_FULL_REVIEW.xlsx`
- `Apple_Official_Colors_UPDATED.xlsx`
- `Samsung_ALL_Models_Official_Colors_MERGED.xlsx`

### **5. Deploy to GitHub Pages**
```bash
# Already configured! Just push to main branch
git add .
git commit -m "Update pricing data"
git push origin main

# Website auto-deploys to: https://favianyip.github.io/iboxmobile-website/
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [ADMIN_GUIDE.md](docs/guides/ADMIN_GUIDE.md) | Complete admin panel guide |
| [DATA_PERSISTENCE_GUIDE.md](docs/guides/DATA_PERSISTENCE_GUIDE.md) | Data management & backup |
| [PRICE_MANAGEMENT_GUIDE.md](docs/guides/PRICE_MANAGEMENT_GUIDE.md) | Pricing workflows |
| [SYSTEM_ANALYSIS_REPORT.md](docs/technical/SYSTEM_ANALYSIS_REPORT.md) | Full system audit |
| [FIXES_COMPLETED_SUMMARY.md](docs/technical/FIXES_COMPLETED_SUMMARY.md) | Recent fixes log |
| [DEPLOYMENT_GUIDE.md](docs/guides/DEPLOYMENT_GUIDE.md) | Deployment instructions |

---

## 📱 Supported Devices

### **Apple (21 Models)**
- iPhone 17 series (Pro Max, Pro, Air, Standard)
- iPhone 16 series (Pro Max, Pro, Plus, Standard, E)
- iPhone 15 series (Pro Max, Pro, Plus, Standard)
- iPhone 14 series (Pro Max, Pro, Plus, Standard)
- iPhone 13 series (Pro Max, Pro, Mini, Standard)
- iPhone 12 series (Pro Max, Pro, Mini, Standard)
- iPhone 11 series (Pro Max, Pro, Standard)
- iPhone SE (3rd Gen), XS Max, XS, XR

### **Samsung (19 Models)**
- Galaxy S25 series (Ultra, Plus, Standard)
- Galaxy S24 series (Ultra, Plus, Standard, FE)
- Galaxy S23 series (Ultra, Plus, Standard, FE)
- Galaxy S22 Ultra
- Galaxy Z Fold series (7, 6, 5)
- Galaxy Z Flip series (7, 7 FE, 6, 5)
- Galaxy A series (A56, A55)

**Total:** 40 models with 100+ storage/color variants

---

## 🔒 Security

- **Admin Authentication** - Password-protected admin panel
- **Input Validation** - Form validation on all user inputs
- **No Server-Side Code** - Static site, no backend vulnerabilities
- **LocalStorage Only** - No external databases
- **Git-Versioned Data** - Backup and audit trail

---

## 🚧 Roadmap

### **Completed ✅**
- [x] Full buyback quote wizard
- [x] 40-model coverage (Apple + Samsung)
- [x] Admin panel with Excel import
- [x] Master color database (200+ colors)
- [x] Data persistence system
- [x] Smart image fallback

### **In Progress 🔄**
- [ ] NEW phone pricing integration (data exists, logic needs update)
- [ ] Refurbished inventory management
- [ ] Email notifications for bookings
- [ ] SMS integration for appointment reminders

### **Planned 📋**
- [ ] Multi-language support (English, Chinese, Malay)
- [ ] Dark mode toggle
- [ ] WhatsApp integration for quotes
- [ ] Competitor price comparison widget
- [ ] Customer testimonials section
- [ ] Blog/news section

---

## 🤝 Contributing

This is a private repository for IBOX Mobile Singapore. For internal contributions:

1. **Create a branch:** `git checkout -b feature/your-feature`
2. **Make changes** and test thoroughly
3. **Commit:** `git commit -m "Add your feature"`
4. **Push:** `git push origin feature/your-feature`
5. **Create Pull Request** on GitHub

---

## 📞 Support

### **Technical Support:**
- **Documentation:** See `/docs/` folder
- **Issues:** Report via GitHub Issues
- **Email:** [contact@iboxmobile.sg]

### **Business Inquiries:**
- **WhatsApp:** +65 9699 9744
- **Address:** 203 Henderson Rd, #09-09 Wing B, Singapore 159239
- **Hours:** Mon-Fri 10am-8pm, Sat 9am-12pm, Sun Closed

---

## 📄 License

Copyright © 2024-2026 IBOX Mobile Singapore. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

## 🙏 Acknowledgments

- **Data Analysis & Restructuring:** Senior Data Analyst + Harvard Web Developer
- **System Architecture:** Claude AI (Anthropic)
- **Price Data Sources:** WhyMobile, RedWhite, SellUp (competitive analysis)
- **Official Colors:** Apple Inc., Samsung Electronics

---

## 📊 Project Stats

- **Files:** 150+ files
- **Code Lines:** ~15,000 lines
- **Phone Models:** 40 models
- **Storage Variants:** 100+ unique SKUs
- **Color Database:** 200+ official colors
- **Documentation:** 11 guides
- **Commit History:** Full audit trail
- **Last Updated:** January 18, 2026

---

<p align="center">
  <strong>Built with ❤️ for mobile phone enthusiasts in Singapore</strong>
</p>

<p align="center">
  <a href="index.html">🏠 Homepage</a> •
  <a href="sell-phones.html">📱 Sell Phone</a> •
  <a href="product.html">🛍️ Buy Refurbished</a> •
  <a href="admin.html">🎛️ Admin Panel</a>
</p>
