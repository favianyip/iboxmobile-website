"""
Generate direct_prices.json for website lookup
Maps all model+storage+condition combinations to prices
"""

import json
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Load the updated price_data.json
with open("../price_data.json", 'r') as f:
    price_data = json.load(f)

# Build direct lookup dictionary
direct_prices = {
    "note": "Direct price lookup for website - model_storage_color_country_body_screen_battery_issues_accessories",
    "prices": {}
}

# Colors for each brand
APPLE_COLORS = {
    "iPhone 17 Pro Max": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
    "iPhone 17 Pro": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
    "iPhone 17": ["Black", "White", "Pink", "Blue", "Green"],
    "iPhone 16 Pro Max": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
    "iPhone 16 Pro": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
    "iPhone 16 Plus": ["Black", "White", "Pink", "Ultramarine", "Teal"],
    "iPhone 16": ["Black", "White", "Pink", "Ultramarine", "Teal"],
    "iPhone 15 Pro Max": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    "iPhone 15 Pro": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    "iPhone 15 Plus": ["Black", "Blue", "Green", "Yellow", "Pink"],
    "iPhone 15": ["Black", "Blue", "Green", "Yellow", "Pink"],
    "default": ["Black", "White", "Gold", "Silver"]
}

SAMSUNG_COLORS = {
    "Galaxy S24 Ultra": ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    "Galaxy S24 Plus": ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    "Galaxy S24": ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    "Galaxy Z Fold5": ["Phantom Black", "Icy Blue", "Cream"],
    "Galaxy Z Flip5": ["Mint", "Graphite", "Cream", "Lavender"],
    "default": ["Black", "White", "Gray", "Blue"]
}

total_entries = 0

for brand in ["Apple", "Samsung"]:
    models = price_data["prices"].get(brand, {})
    colors_dict = APPLE_COLORS if brand == "Apple" else SAMSUNG_COLORS
    
    for model, model_data in models.items():
        colors = colors_dict.get(model, colors_dict["default"])
        
        for storage, storage_data in model_data.get("storage", {}).items():
            # New prices
            for color in colors:
                key_sealed = f"{model}_{storage}_{color}_new_sealed"
                key_activated = f"{model}_{storage}_{color}_new_activated"
                direct_prices["prices"][key_sealed] = storage_data.get("new_sealed", 0)
                direct_prices["prices"][key_activated] = storage_data.get("new_activated", 0)
                total_entries += 2
        
        # Condition-based prices (used)
        conditions = model_data.get("conditions", {})
        for storage, cond_data in conditions.items():
            for color in colors:
                for cond_key, price in cond_data.items():
                    # cond_key format: Local_GradeA_GradeA_91-100%
                    parts = cond_key.split("_")
                    if len(parts) >= 4:
                        country, body, screen, battery = parts[0], parts[1], parts[2], parts[3]
                        
                        # Generate keys for different accessory combinations
                        for issues in ["None"]:
                            for accessories in ["None", "Cable", "Box", "CableBox"]:
                                # Accessory bonus
                                acc_bonus = {"None": 0, "Cable": 15, "Box": 20, "CableBox": 35}
                                final_price = price + acc_bonus.get(accessories, 0)
                                
                                full_key = f"{model}_{storage}_{color}_{country}_{body}_{screen}_{battery}_{issues}_{accessories}"
                                direct_prices["prices"][full_key] = max(50, final_price)
                                total_entries += 1

direct_prices["total_entries"] = total_entries

# Save
with open("../direct_prices.json", 'w', encoding='utf-8') as f:
    json.dump(direct_prices, f, indent=2)

print(f"Generated {total_entries} price lookup entries")
print("Saved to: ../direct_prices.json")
