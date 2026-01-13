"""
Final Real Prices - Uses DIRECT values where available, estimates gaps
Prioritizes accuracy over calculation
"""

import json
import csv
import sys
from itertools import product

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ============================================================
# DIRECT REAL PRICES FROM SELLUP (USE THESE AS-IS!)
# ============================================================
REAL_PRICES = {
    # Local Grade A
    "Local_GradeA_GradeA_91-100%_None": 1070,
    "Local_GradeA_GradeA_86-90%_None": 1040,
    "Local_GradeA_GradeA_81-85%_None": 1010,
    "Local_GradeA_GradeA_80%_None": 990,
    
    # Export Grade A
    "Export_GradeA_GradeA_91-100%_None": 1010,
    
    # Local Grade B
    "Local_GradeB_GradeA_91-100%_None": 970,
    "Local_GradeB_GradeB_91-100%_None": 910,
    
    # Local Grade C
    "Local_GradeC_GradeA_91-100%_None": 920,
    "Local_GradeC_GradeC_91-100%_None": 790,
    
    # Export Grade C (USER VERIFIED!)
    "Export_GradeC_GradeC_91-100%_None": 760,
    "Export_GradeC_GradeC_86-90%_None": 720,
    "Export_GradeC_GradeC_81-85%_None": 680,
    "Export_GradeC_GradeC_80%_None": 640,
    
    # Local Defective
    "Local_Defective_GradeA_91-100%_None": 790,
    "Local_Defective_GradeA_86-90%_None": 750,
    "Local_Defective_GradeA_81-85%_None": 710,
    "Local_Defective_GradeA_80%_None": 670,
    "Local_Defective_GradeB_91-100%_None": 730,
    "Local_Defective_Defective_91-100%_None": 550,
    
    # Export Defective
    "Export_Defective_Defective_80%_None": 400,
}

# ============================================================
# Generate all combinations using real data + smart estimates
# ============================================================

countries = ["Local", "Export"]
bodies = ["GradeA", "GradeB", "GradeC", "Defective"]
screens = ["GradeA", "GradeB", "GradeC", "Defective"]
batteries = ["91-100%", "86-90%", "81-85%", "80%"]
accessories = ["None", "Cable", "Box", "CableBox"]

# Accessory bonuses
ACC_BONUS = {"None": 0, "Cable": 15, "Box": 20, "CableBox": 35}

# Battery reduction ratios (from real data)
BATTERY_RATIOS = {"91-100%": 1.0, "86-90%": 0.95, "81-85%": 0.89, "80%": 0.84}

all_prices = {}
real_count = 0
estimated_count = 0

for country, body, screen, battery, acc in product(countries, bodies, screens, batteries, accessories):
    base_key = f"{country}_{body}_{screen}_{battery}_None"
    final_key = f"{country}_{body}_{screen}_{battery}_{acc}"
    
    # Try to find exact match or similar
    if base_key in REAL_PRICES:
        # Use real price directly!
        price = REAL_PRICES[base_key] + ACC_BONUS[acc]
        real_count += 1
    else:
        # Estimate based on patterns
        # Find closest match in real data
        estimated = False
        
        # Try same body/screen with 91-100% battery
        ref_key = f"{country}_{body}_{screen}_91-100%_None"
        if ref_key in REAL_PRICES:
            base = REAL_PRICES[ref_key]
            price = int(base * BATTERY_RATIOS[battery]) + ACC_BONUS[acc]
            estimated = True
        else:
            # Try Local version first
            local_key = f"Local_{body}_{screen}_91-100%_None"
            if local_key in REAL_PRICES:
                base = REAL_PRICES[local_key]
                export_discount = 30 if body in ["GradeC", "Defective"] else 60
                if country == "Export":
                    base -= export_discount
                price = int(base * BATTERY_RATIOS[battery]) + ACC_BONUS[acc]
                estimated = True
            else:
                # Fallback calculation
                base = 1070  # Start from best
                # Country
                if country == "Export":
                    base -= 60
                # Body
                if body == "GradeB": base -= 100
                elif body == "GradeC": base -= 150
                elif body == "Defective": base -= 280
                # Screen
                if screen == "GradeB": base -= 60
                elif screen == "GradeC": base -= 130
                elif screen == "Defective": base -= 240
                # Battery
                price = int(base * BATTERY_RATIOS[battery]) + ACC_BONUS[acc]
                estimated = True
        
        estimated_count += 1
    
    # Minimum floor
    price = max(100, price)
    all_prices[final_key] = price

print("="*80)
print("  FINAL REAL PRICES - 512 Combinations")
print("="*80)
print(f"\n  Real prices used: {real_count}")
print(f"  Estimated prices: {estimated_count}")
print(f"  Total: {len(all_prices)}")

# Verify user case
user_key = "Export_GradeC_GradeC_91-100%_None"
print(f"\n  USER VERIFIED CASE:")
print(f"    {user_key}")
print(f"    Generated: ${all_prices[user_key]}")
print(f"    Expected:  $760")
print(f"    Match: {'YES!' if all_prices[user_key] == 760 else 'NO'}")

# Save JSON
output = {
    "model": "iPhone 16 Pro Max",
    "storage": "256GB",
    "note": "Uses REAL SellUp prices directly where available",
    "real_prices_used": real_count,
    "estimated_prices": estimated_count,
    "total": len(all_prices),
    "prices": all_prices
}

with open("FINAL_512_REAL_PRICES.json", 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2)

# Save CSV sorted by price
with open("FINAL_512_REAL_PRICES.csv", 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["#", "Country", "Body", "Screen", "Battery", "Accessories", "Price", "Key"])
    for i, (key, price) in enumerate(sorted(all_prices.items(), key=lambda x: -x[1]), 1):
        parts = key.split("_")
        writer.writerow([i] + parts + [price, key])

print(f"\n  Saved: FINAL_512_REAL_PRICES.json")
print(f"  Saved: FINAL_512_REAL_PRICES.csv")

# Show top/bottom
sorted_prices = sorted(all_prices.items(), key=lambda x: -x[1])
print(f"\n  TOP 5 HIGHEST:")
for k, v in sorted_prices[:5]:
    print(f"    ${v}: {k}")

print(f"\n  BOTTOM 5 LOWEST:")
for k, v in sorted_prices[-5:]:
    print(f"    ${v}: {k}")

print("\n" + "="*80)
