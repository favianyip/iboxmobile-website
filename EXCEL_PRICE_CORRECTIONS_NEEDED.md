# Excel Price Corrections Needed for phoneDatabase

## Summary
The phoneDatabase in `quote.js` has **significant price discrepancies** compared to the Excel reference files.

**Total affected**: 29 models
- **Apple**: 26 models need price corrections
- **Samsung**: 3 models need price corrections

## Immediate Action Required

You have two options to fix this:

### Option 1: Use the Correct Excel Prices (RECOMMENDED)

Since the Excel files (`Apple_USED_NEW_FULL_REVIEW.xlsx` and `Samsung_USED_NEW_FULL_REVIEW.xlsx`) are your source of truth, I recommend updating the phoneDatabase in `quote.js` to match them.

I can create a corrected `quote.js` file with all the accurate prices from Excel. This will fix the "Reset to Default Prices" function to load correct prices.

**Do you want me to:**
1. Update the phoneDatabase in quote.js with ALL the correct Excel prices?
2. This will fix ~600 lines of code with accurate pricing

### Option 2: Update the Excel Files

If the current phoneDatabase prices are correct and Excel is outdated, then the Excel files need to be updated to match quote.js.

## Detailed Price Corrections Needed (if updating phoneDatabase)

### Apple iPhone Corrections

**iPhone XR** - Reduce prices by $60-$100:
- 64GB: Change from $150 → $50
- 128GB: Change from $160 → $80
- 256GB: Change from $170 → $110

**iPhone XS** - Reduce prices by $100-$130:
- 64GB: Change from $200 → $70
- 256GB: Change from $215 → $100
- 512GB: Change from $230 → $130

**iPhone XS Max** - Reduce prices by $110-$130:
- 64GB: Change from $250 → $120
- 256GB: Change from $270 → $150
- 512GB: Change from $290 → $180

**iPhone 11** - Reduce prices by $152-$192:
- 64GB: Change from $272 → $120
- 128GB: Change from $322 → $150
- 256GB: Change from $372 → $180

**iPhone 11 Pro** - Reduce prices by $180-$210:
- 64GB: Change from $350 → $170
- 256GB: Change from $400 → $210
- 512GB: Change from $450 → $240

**iPhone 11 Pro Max** - Reduce prices by $160-$200:
- 64GB: Change from $380 → $220
- 256GB: Change from $430 → $250
- 512GB: Change from $480 → $280

**iPhone 12** - Reduce prices by $140:
- 64GB: Change from $340 → $200
- 128GB: Change from $390 → $250
- 256GB: Change from $440 → $300

**iPhone 12 Mini** - Reduce prices by $155-$185:
- 64GB: Change from $305 → $120
- 128GB: Change from $320 → $150
- 256GB: Change from $335 → $180

**iPhone 12 Pro** - Reduce prices by $140-$190:
- 128GB: Change from $440 → $300
- 256GB: Change from $515 → $350
- 512GB: Change from $590 → $400

**iPhone 12 Pro Max** - Reduce prices by $150-$200:
- 128GB: Change from $500 → $350
- 256GB: Change from $575 → $400
- 512GB: Change from $650 → $450

**iPhone 13** - Reduce prices by $160:
- 128GB: Change from $460 → $300
- 256GB: Change from $510 → $350
- 512GB: Change from $560 → $400

**iPhone 13 Mini** - Reduce prices by $235:
- 128GB: Change from $485 → $250
- 256GB: Change from $535 → $300
- 512GB: Change from $585 → $350

**iPhone 13 Pro** - Reduce prices by $200-$250:
- 128GB: Change from $580 → $380
- 256GB: Change from $680 → $430
- 512GB: Change from $730 → $480
- 1TB: Change from $780 → $530

**iPhone 13 Pro Max** - Reduce prices by $210-$260:
- 128GB: Change from $670 → $460
- 256GB: Change from $770 → $510
- 512GB: Change from $820 → $560
- 1TB: Change from $870 → $610

**iPhone 14** - Reduce prices by $210-$310:
- 128GB: Change from $560 → $350
- 256GB: Change from $660 → $400
- 512GB: Change from $760 → $450

**iPhone 14 Plus** - Reduce prices by $220-$320:
- 128GB: Change from $640 → $420
- 256GB: Change from $740 → $470
- 512GB: Change from $840 → $520

**iPhone 14 Pro** - Reduce prices by $260-$310:
- 128GB: Change from $760 → $500
- 256GB: Change from $860 → $550
- 512GB: Change from $910 → $600
- 1TB: Change from $960 → $650

**iPhone 14 Pro Max** - Reduce prices by $250-$300:
- 128GB: Change from $850 → $600
- 256GB: Change from $950 → $650
- 512GB: Change from $1000 → $700
- 1TB: Change from $1050 → $750

**iPhone 15** - Reduce prices by $255-$355:
- 128GB: Change from $755 → $500
- 256GB: Change from $855 → $550
- 512GB: Change from $955 → $600

**iPhone 15 Plus** - Reduce prices by $250-$350:
- 128GB: Change from $800 → $550
- 256GB: Change from $900 → $600
- 512GB: Change from $1000 → $650

**iPhone 15 Pro** - Reduce prices by $255-$405:
- 128GB: Change from $855 → $600
- 256GB: Change from $955 → $650
- 512GB: Change from $1055 → $700
- 1TB: Change from $1155 → $750

**iPhone 15 Pro Max** - Reduce prices by $160-$260:
- 256GB: Change from $960 → $800
- 512GB: Change from $1060 → $850
- 1TB: Change from $1160 → $900

**iPhone 16 Pro** - Reduce prices by $255-$405:
- 128GB: Change from $1125 → $870
- 256GB: Change from $1225 → $920
- 512GB: Change from $1325 → $970
- 1TB: Change from $1425 → $1020

**iPhone 16 Pro Max** - Reduce prices by $15-$115:
- 256GB: Change from $1035 → $1020
- 512GB: Change from $1135 → $1070
- 1TB: Change from $1235 → $1120

### Samsung Galaxy Corrections

**Galaxy S22 Ultra 5G** - INCREASE prices by $80:
- 256GB: Change from $270 → $350
- 512GB: Change from $320 → $400

**Galaxy Z Flip 5 5G** - REDUCE prices by $80:
- 256GB: Change from $330 → $250
- 512GB: Change from $380 → $300

**Galaxy Z Fold 5 5G** - REDUCE prices by $100-$150:
- 256GB: Change from $650 → $550
- 512GB: Change from $725 → $600
- 1TB: Change from $800 → $650

## Next Steps

**Please confirm:**
1. Should I update the phoneDatabase in quote.js with all these correct Excel prices?
2. OR are the Excel files outdated and need to be updated to match quote.js?

Once you confirm, I can make the necessary updates.

---

**Created**: 2026-01-22
**Source**: Comparison between Excel reference files and phoneDatabase in quote.js
**Status**: ⚠️ AWAITING USER DECISION
