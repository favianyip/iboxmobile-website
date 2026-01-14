# Competitive Pricing Integration

## Overview
This document explains how competitive pricing from WhyMobile and RedWhiteMobile is integrated into the IBOX Mobile website.

## System Components

### 1. Price Data Parser (`scripts/parse-competitor-prices.js`)
- Contains parsed competitor pricing data from WhyMobile and RedWhiteMobile
- Organized by condition (used/new), brand (iPhone/Samsung), and model
- Automatically calculates highest competitive price for each model
- Structure:
  ```javascript
  competitorData = {
    used: {
      iphone: { "iPhone 17 Pro Max 256GB": { whymobile: 1500, redwhite: 1520, highest: 1520 } },
      samsung: { ... }
    },
    new: { ... }
  }
  ```

### 2. Website Integration (`sell-phones.html`)
- Loads competitor price data via `<script src="scripts/parse-competitor-prices.js"></script>`
- `phoneModels` object contains all device listings with competitive prices
- Prices are set to match or beat the highest competitor prices
- Helper functions available for dynamic price lookups:
  - `getCompetitivePrice(modelName, storage, condition)` - Gets highest price for specific model/storage
  - `getStartingPrice(modelName, storageOptions, condition)` - Gets base price for model display

### 3. Price Display Logic
- Each model card shows "Get up to $X" based on highest competitive price
- Prices automatically switch between used/new when user toggles condition
- Uses competitive data to ensure IBOX prices are always competitive

## Pricing Models

### Current Models with Competitive Pricing

**iPhone Models:**
- iPhone 17 Series (Pro Max, Pro, Air, standard)
- iPhone 16 Series (Pro Max, Pro, Plus, standard, e)
- iPhone 15 Series (Pro Max, Pro, Plus, standard)
- iPhone 14 Series (Pro Max, Pro, Plus, standard)
- iPhone 13 Series (Pro Max, Pro, mini, standard)
- iPhone 12 Series (Pro Max, Pro, mini, standard)
- iPhone 11 Series (Pro Max, Pro, standard)

**Samsung Models:**
- Galaxy S25 Series (Ultra, Plus, standard, Edge, FE)
- Galaxy S24 Series (Ultra, Plus, standard, FE)
- Galaxy S23 Series (Ultra, Plus, standard, FE)
- Galaxy S22 Series (Ultra, Plus, standard)
- Galaxy Z Fold Series (7, 6, 5, 4)
- Galaxy Z Flip Series (7, 7 FE, 6, 5, 4)
- Samsung TriFold (512GB)
- Galaxy A Series (A56, A55, A36, A26, A17)

## Price Update Process

### Manual Update Process
1. Visit competitor websites:
   - WhyMobile: https://www.whymobile.com/sell/used and /sell/new
   - RedWhiteMobile: https://redwhitemobile.com/trade-in-or-sell/

2. Update `scripts/parse-competitor-prices.js` with new prices

3. Optionally update `sell-phones.html` phoneModels if new models are added

4. Test the website to verify prices display correctly

5. Commit and push changes

### Admin Interface (`price-manager.html`)
- Visual interface for comparing competitor prices
- Allows manual entry of competitor prices
- Automatically calculates highest prices
- Exports updated `competitor_prices.json` file
- Use this for quick price comparisons and updates

## Pricing Strategy

**Current Strategy: Match Highest Competitor**
- IBOX prices are set to match the highest competitor price
- This ensures competitive positioning without leaving money on the table
- Can be adjusted to beat competitors by $20-50 by editing phoneModels

**Alternative Strategies:**
1. **Beat by Fixed Amount**: Add $20-50 to highest competitor price
2. **Match Lowest**: Match lowest competitor to be most competitive
3. **Custom Margin**: Set custom margins based on device condition/demand

## Data Sources

### Last Updated: 2026-01-14

**WhyMobile Pricing:**
- Used phones: https://www.whymobile.com/sell/used
- New phones: https://www.whymobile.com/sell/new

**RedWhiteMobile Pricing:**
- Combined page: https://redwhitemobile.com/trade-in-or-sell/
- Left column: Used prices
- Right column: New prices

## Technical Notes

### Price Lookup Process
1. User lands on sell-phones.html with ?type=used or ?type=new
2. Page loads competitorData from parse-competitor-prices.js
3. phoneModels array contains pre-calculated competitive prices
4. When user toggles used/new, display switches to show appropriate prices
5. Each model card shows highest competitive price for base storage

### Fallback Handling
- If competitive data unavailable, uses fallback prices in phoneModels
- Helper functions return null if price not found, allowing graceful degradation
- Missing prices logged to console for debugging

### Performance Considerations
- Competitor data loaded once on page load (< 50KB)
- No external API calls for pricing (fast, reliable)
- Prices cached in JavaScript object for instant access

## Future Enhancements

### Planned Features
1. **Automated Price Scraping** (via Firecrawl API)
   - Daily/weekly automated price checks
   - Email notifications when competitors change prices
   - Automatic price adjustments based on rules

2. **Price History Tracking**
   - Track competitor price changes over time
   - Identify pricing trends and patterns
   - Historical comparison charts

3. **Dynamic Pricing Rules**
   - Auto-adjust IBOX prices based on competitor changes
   - Set minimum margins and maximum prices
   - Model-specific pricing strategies

4. **Price Alerts**
   - Notify admin when competitor prices change significantly
   - Alert when IBOX prices fall below competitors
   - Weekly pricing summary emails

## Troubleshooting

### Prices Not Displaying
- Check browser console for errors
- Verify parse-competitor-prices.js is loading
- Confirm phoneModels array has valid usedPrice/newPrice values

### Prices Don't Match Competitors
- Update parse-competitor-prices.js with latest competitor data
- Ensure phoneModels prices match competitorData.highest values
- Check condition (used vs new) is correct

### New Models Not Showing
- Add model to phoneModels array in sell-phones.html
- Add competitive prices to parse-competitor-prices.js
- Ensure image path is correct in phoneModels

## Support

For questions or issues with competitive pricing:
1. Review this documentation
2. Check `PRICE_MANAGEMENT_GUIDE.md` for admin interface help
3. Inspect browser console for JavaScript errors
4. Verify competitor data is up to date

## File Locations

- Competitor data: `/scripts/parse-competitor-prices.js`
- Website integration: `/sell-phones.html`
- Admin interface: `/price-manager.html`
- Legacy JSON format: `/competitor_prices.json`
- Admin guide: `/PRICE_MANAGEMENT_GUIDE.md`
