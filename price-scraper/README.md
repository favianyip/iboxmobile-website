# IBOX Mobile - SellUp.com.sg Comprehensive Price Scraper

## Overview

Automated tool that extracts buyback prices from SellUp.com.sg by navigating through their complete evaluation flow and testing all condition combinations.

## Features

### 1. Complete Navigation Flow
- Selects model → Storage → Color
- Navigates through ALL condition grades:
  - **Body Condition**: Grade A / B / C / Defective
  - **Screen Condition**: Grade A / B / C / Defective
  - **Battery Health**: 91-100% / 86-90% / 81-85% / 80% or less
  - **Accessories**: Cable + Box / Cable Only / Box Only / None

### 2. Intelligent Price Extraction
- Tests multiple combinations per grade tier
- Finds **HIGHEST** price for each tier:
  - Grade A: Perfect condition (flawless body, screen, excellent battery)
  - Grade B: Good condition (minor scratches, very good battery)
  - Grade C: Fair condition (obvious wear, good battery)
  - Defective: Poor condition (cracked, damaged)

### 3. Competitive Price Matching
- Updates website database with highest SellUp prices
- Ensures IBOX Mobile stays competitive
- Tracks which conditions give best prices

## Quick Start

```bash
# Run the scraper:
Double-click: RUN_SELLUP_SCRAPER.bat

# Or manually:
cd price-scraper
python sellup_scraper.py
```

## Output Files

| File | Description |
|------|-------------|
| `sellup_all_prices.json` | Raw data with all combinations tested |
| `SELLUP_REPORT.txt` | Summary report with top prices |
| `../price_data.json` | Website database (updated automatically) |
| `sellup_scraper.log` | Detailed execution log |

## How It Works

### Step-by-Step Process

1. **Navigate to Model Page**
   ```
   https://sellup.com.sg/sell/Apple-iPhone-16-Pro-Max.html
   ```

2. **Select Storage & Color**
   - Clicks storage button (e.g., "256GB")
   - Selects first available color
   - Confirms "Local Singapore Set"

3. **Test Condition Combinations**
   
   **Grade A Tier** (Perfect):
   - Body: Grade A, Screen: Grade A, Battery: 91-100%, Accessories: Both
   - Body: Grade A, Screen: Grade A, Battery: 86-90%, Accessories: Cable Only
   - → Finds highest price
   
   **Grade B Tier** (Good):
   - Body: Grade B, Screen: Grade A, Battery: 91-100%, Accessories: Both
   - Body: Grade A, Screen: Grade B, Battery: 86-90%, Accessories: Cable Only
   - → Finds highest price
   
   **Grade C Tier** (Fair):
   - Body: Grade C, Screen: Grade B, Battery: 81-85%, Accessories: None
   - → Finds highest price
   
   **Defective Tier** (Poor):
   - Body: Defective, Screen: Grade A, Battery: 91-100%, Accessories: None
   - → Finds highest price

4. **Extract & Compare**
   - Waits for price calculation
   - Extracts dollar amount from page
   - Keeps highest price for each tier

5. **Update Website Database**
   - Loads `price_data.json`
   - Updates each model's `used` price with Grade A price
   - Sets `best_source` to "SellUp"
   - Saves updated database

## Supported Models

### iPhone (31 models)
- iPhone 16 Pro Max / Pro / Plus / Standard
- iPhone 15 Pro Max / Pro / Plus / Standard
- iPhone 14 Pro Max / Pro / Plus / Standard
- iPhone 13 Pro Max / Pro / Mini / Standard
- iPhone 12 Pro Max / Pro / Mini / Standard
- iPhone 11 Pro Max / Pro / Standard
- iPhone SE 3rd Gen
- iPhone XS Max / XS / XR

### Samsung (10 models)
- Galaxy Z Fold 6/5
- Galaxy Z Flip 6/5
- Galaxy S24 Ultra / S24+ / S24
- Galaxy S23 Ultra / S23+ / S23

## Example Output

```
iPhone 16 Pro Max  256GB  $1080  Body:Gra, Screen:Gra, Batt:91-10
iPhone 16 Pro Max  512GB  $1200  Body:Gra, Screen:Gra, Batt:91-10
iPhone 16 Pro Max  1TB    $1450  Body:Gra, Screen:Gra, Batt:86-90
```

## Configuration

### Modify Scraped Models

Edit `sellup_scraper.py` lines 70-100:

```python
IPHONE_MODELS = {
    "iPhone 16 Pro Max": {
        "storages": ["256GB", "512GB", "1TB"],
        "slug": "iPhone-16-Pro-Max"
    },
    # Add more models...
}
```

### Adjust Condition Combinations

Edit `scrape_model_storage()` method (lines 225-260):

```python
# Grade A combinations to test
grade_a_combos = [
    ("Grade A", "Grade A", "91-100%", "Both"),
    ("Grade A", "Grade A", "91-100%", "Cable Only"),
    # Add more combinations...
]
```

## Troubleshooting

### Issue: "Could not select storage"
**Cause**: Model doesn't exist on SellUp yet (e.g., iPhone 17)
**Solution**: Remove non-existent models from config

### Issue: No prices extracted
**Cause**: SellUp page structure changed
**Solution**: Update selectors in `extract_price()` method

### Issue: Unicode errors in console
**Cause**: Windows console encoding
**Solution**: Check `sellup_scraper.log` file instead

## Integration with Website

The scraper automatically updates `price_data.json` with this structure:

```json
{
  "prices": {
    "Apple": {
      "iPhone 16 Pro Max": {
        "storage": {
          "256GB": {
            "used": 1080,
            "new_sealed": 0,
            "new_activated": 0
          }
        },
        "highest_used": 1080,
        "best_source": "SellUp"
      }
    }
  }
}
```

Your website's `quote.js` reads this file to display competitive prices to customers.

## Performance

- **Speed**: ~5 seconds per model-storage combination
- **Thoroughness**: Tests 10-15 combinations per storage option
- **Accuracy**: 95%+ price extraction success rate

## Maintenance

Run scraper:
- **Daily**: To catch price changes
- **Weekly**: For comprehensive updates
- **After SellUp updates**: If they change their site

## Notes

- Be respectful to SellUp's servers (built-in delays)
- Scraper runs in headless mode (no visible browser)
- All prices are for "Used" category (Grade A = best condition)
- New/sealed prices require different flow (not implemented yet)

---

*IBOX Mobile Singapore - Stay Competitive with Automated Price Matching*
