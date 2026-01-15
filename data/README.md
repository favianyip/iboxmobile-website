# Data Persistence System

## Overview
This directory contains JSON files that store all dynamic data from the admin panel. These files are tracked by git, ensuring that any admin changes persist across code updates and deployments.

## Data Files

### 1. `admin-data.json`
Stores all admin panel data including:
- Phone models and prices
- Brand settings
- Condition modifiers
- System settings
- Buyback prices for different conditions (excellent, good, fair)

## How It Works

### For Admins
1. Make changes in the admin panel (prices, conditions, etc.)
2. Click "Export Data" button at the top of the admin panel
3. Download the `admin-data.json` file
4. Commit this file to git: `git add data/admin-data.json && git commit -m "Update prices"`
5. Push to repository

### For Developers
The system automatically:
1. Loads data from `data/admin-data.json` on page load
2. Falls back to default values if file doesn't exist
3. Admin changes update localStorage immediately
4. Export function generates updated JSON file

## Initial Setup

1. Default data is pre-populated in `/data/admin-data.json`
2. Admin panel loads this data on first load
3. Any changes can be exported and committed

## Important Notes

- **Always commit data files after admin changes**
- Data file changes should be tracked in git
- Export data regularly to avoid losing changes
- Keep backups of data files before major updates

## File Structure

```
data/
├── README.md           # This file
└── admin-data.json     # Main data file (tracked by git)
```

## Data Sync Process

```
Admin Panel Changes → localStorage → Export JSON → Git Commit → Persists Forever
```

This ensures all price updates, condition changes, and admin modifications survive code updates!
