"""
Create optimized, smaller direct_prices.json
Only includes essential condition combinations (not every color variant)
"""

import json
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Load the full price data
with open("../price_data.json", 'r') as f:
    price_data = json.load(f)

# Build compact lookup - prices by model/storage/condition (color doesn't affect price)
compact_prices = {
    "note": "Compact price lookup - color independent",
    "models": {}
}

for brand in ["Apple", "Samsung"]:
    models = price_data["prices"].get(brand, {})
    
    for model, model_data in models.items():
        compact_prices["models"][model] = {
            "brand": brand,
            "storage": {},
            "conditions": {}
        }
        
        # Storage prices (new)
        for storage, storage_data in model_data.get("storage", {}).items():
            compact_prices["models"][model]["storage"][storage] = {
                "new_sealed": storage_data.get("new_sealed", 0),
                "new_activated": storage_data.get("new_activated", 0),
                "used_base": storage_data.get("used_base", 0)
            }
        
        # Condition-based prices (used) - only need one entry per condition combo
        conditions = model_data.get("conditions", {})
        for storage, cond_data in conditions.items():
            if storage not in compact_prices["models"][model]["conditions"]:
                compact_prices["models"][model]["conditions"][storage] = {}
            
            for cond_key, price in cond_data.items():
                compact_prices["models"][model]["conditions"][storage][cond_key] = price

# Save compact version
with open("../direct_prices.json", 'w', encoding='utf-8') as f:
    json.dump(compact_prices, f, separators=(',', ':'))  # Compact JSON

# Check size
import os
size_kb = os.path.getsize("../direct_prices.json") / 1024
print(f"Optimized direct_prices.json: {size_kb:.1f} KB")
print(f"Models included: {len(compact_prices['models'])}")
