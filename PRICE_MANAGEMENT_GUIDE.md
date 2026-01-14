# Competitive Price Management System

## 🎯 Overview
This system helps you track competitor prices and automatically set your buyback prices to match or beat the competition.

## 📋 How It Works

### Step 1: Collect Competitor Prices
Visit these websites and note their prices:
- **WhyMobile**: https://www.whymobile.com/sell/used and /sell/new
- **RedWhiteMobile**: https://redwhitemobile.com/trade-in-or-sell/

### Step 2: Update Prices
1. Open `price-manager.html` in your browser
2. Enter competitor prices for each model
3. The system automatically calculates the highest price
4. Set your IBOX price (recommended: match or beat by $20)
5. Click "Save & Update Website Prices"

### Step 3: Deploy
1. Upload the downloaded `competitor_prices.json` file
2. The website will automatically use these prices
3. Commit and push to GitHub

## 📊 Price Structure

```json
{
  "iPhone 17 Pro Max": {
    "256GB": {
      "used": {
        "WhyMobile": 1250,      // Competitor 1 price
        "RedWhiteMobile": 1230,  // Competitor 2 price
        "highest": 1250,         // Auto-calculated
        "iboxPrice": 1230        // Your price (set this)
      }
    }
  }
}
```

## 🔄 Quick Update Process

### Manual Update (Current)
1. Visit competitor websites
2. Note prices in a spreadsheet
3. Update `competitor_prices.json`
4. Commit to GitHub

### Future: Automated (Coming Soon)
- API integration with Firecrawl
- Scheduled price checks (daily/weekly)
- Automatic price updates
- Email notifications when competitors change prices

## 💡 Pricing Strategy

### Option 1: Match Highest
```
If WhyMobile = $1200, RedWhite = $1180
Set IBOX = $1200 (match highest)
```

### Option 2: Beat by $20
```
If highest = $1200
Set IBOX = $1220 (beat by $20)
```

### Option 3: Custom Margin
```
Set your own competitive pricing based on your margins
```

## 📁 Files

- `competitor_prices.json` - Price database
- `price-manager.html` - Admin interface to update prices
- `sell-phones.html` - Customer-facing page (reads from JSON)

## 🚀 Next Steps

1. Collect current market prices from competitors
2. Update `competitor_prices.json` with real data
3. Test the price-manager.html interface
4. Set up a weekly price review schedule
5. Monitor competitor price changes

## 🔐 Security Note

The price-manager.html should be password-protected or only accessible to admin users. Consider adding authentication before deploying to production.

## 📞 Support

For questions about price management:
- Check the admin panel documentation
- Review competitor pricing trends weekly
- Adjust margins based on market conditions
