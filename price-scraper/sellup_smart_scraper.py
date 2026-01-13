"""
Smart SellUp Scraper - Uses Playwright to extract REAL prices
Samples key combinations to verify patterns, then extracts all
"""

import json
import csv
import time
import sys
from datetime import datetime

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Installing playwright...")
    import os
    os.system('pip install playwright')
    os.system('playwright install chromium')
    from playwright.sync_api import sync_playwright

# SellUp option IDs for iPhone 16 Pro Max
OPTIONS = {
    "storage": {"256GB": "116411", "512GB": "116412", "1TB": "116413"},
    "color": {"Desert Titanium": "116414", "Natural Titanium": "116415", "White Titanium": "116416", "Black Titanium": "116417"},
    "country": {"Local": "116365", "Export": "116366"},
    "body": {"GradeA": "116357", "GradeB": "116358", "GradeC": "116359", "Defective": "116360"},
    "screen": {"GradeA": "116361", "GradeB": "116362", "GradeC": "116363", "Defective": "116364"},
    "battery": {"91-100%": "116367", "86-90%": "116368", "81-85%": "116369", "80%": "116370"},
    "accessories": {"Cable": "116371", "Box": "116372"}
}

BASE_URL = "https://sellup.com.sg/sell/Apple-iPhone-16-Pro-Max-6746.html"

# Key test combinations to verify
TEST_COMBINATIONS = [
    # Your verified case
    {"country": "Export", "body": "GradeC", "screen": "GradeA", "battery": "81-85%", "acc": "None", "expected": 810},
    # Screenshot case - Grade C/C
    {"country": "Export", "body": "GradeC", "screen": "GradeC", "battery": "91-100%", "acc": "None", "expected": 760},
    # Best condition
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "91-100%", "acc": "CableBox", "expected": None},
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "91-100%", "acc": "None", "expected": None},
    # Export Grade A
    {"country": "Export", "body": "GradeA", "screen": "GradeA", "battery": "91-100%", "acc": "None", "expected": None},
    # Grade B
    {"country": "Local", "body": "GradeB", "screen": "GradeA", "battery": "91-100%", "acc": "None", "expected": None},
    {"country": "Local", "body": "GradeB", "screen": "GradeB", "battery": "91-100%", "acc": "None", "expected": None},
    # Grade C
    {"country": "Local", "body": "GradeC", "screen": "GradeA", "battery": "91-100%", "acc": "None", "expected": None},
    {"country": "Local", "body": "GradeC", "screen": "GradeC", "battery": "91-100%", "acc": "None", "expected": None},
    # Defective
    {"country": "Local", "body": "Defective", "screen": "GradeA", "battery": "91-100%", "acc": "None", "expected": None},
    {"country": "Local", "body": "Defective", "screen": "Defective", "battery": "91-100%", "acc": "None", "expected": None},
    {"country": "Export", "body": "Defective", "screen": "Defective", "battery": "80%", "acc": "None", "expected": None},
    # Battery variations
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "86-90%", "acc": "None", "expected": None},
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "81-85%", "acc": "None", "expected": None},
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "80%", "acc": "None", "expected": None},
    # Accessory variations
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "91-100%", "acc": "Cable", "expected": None},
    {"country": "Local", "body": "GradeA", "screen": "GradeA", "battery": "91-100%", "acc": "Box", "expected": None},
]

def get_price_for_combination(page, country, body, screen, battery, acc, storage="256GB", color="Black Titanium"):
    """Navigate SellUp and extract the highest dealer price for a combination"""
    
    try:
        # Navigate to fresh page
        page.goto(BASE_URL, wait_until="networkidle", timeout=15000)
        time.sleep(0.5)
        
        # Select Storage
        page.click(f"#option_id_{OPTIONS['storage'][storage]}")
        time.sleep(0.2)
        
        # Select Color  
        page.click(f"#option_id_{OPTIONS['color'][color]}")
        time.sleep(0.2)
        
        # Select Country
        page.click(f"#option_id_{OPTIONS['country'][country]}")
        time.sleep(0.2)
        
        # Select Body
        page.click(f"#option_id_{OPTIONS['body'][body]}")
        time.sleep(0.2)
        
        # Select Screen
        page.click(f"#option_id_{OPTIONS['screen'][screen]}")
        time.sleep(0.2)
        
        # Select Battery
        page.click(f"#option_id_{OPTIONS['battery'][battery]}")
        time.sleep(0.2)
        
        # Select Accessories (checkboxes)
        if "Cable" in acc:
            page.click(f"#option_id_{OPTIONS['accessories']['Cable']}")
            time.sleep(0.1)
        if "Box" in acc:
            page.click(f"#option_id_{OPTIONS['accessories']['Box']}")
            time.sleep(0.1)
        
        # Click Get Quotes
        page.click("a[href='#calculate']")
        time.sleep(1.5)
        
        # Wait for dealer offers to load
        page.wait_for_selector("[class*='dealer'], [class*='offer']", timeout=5000)
        
        # Extract ALL prices from the page
        content = page.content()
        
        # Find price patterns like "$760" or "$810"
        import re
        prices = []
        price_matches = re.findall(r'\$(\d{3,4})', content)
        for p in price_matches:
            price_num = int(p)
            if 100 <= price_num <= 2000:  # Valid price range
                prices.append(price_num)
        
        if prices:
            highest = max(prices)
            return highest, sorted(set(prices), reverse=True)[:5]  # Return top 5 unique prices
        
        return None, []
        
    except Exception as e:
        print(f"      Error: {e}")
        return None, []

def main():
    print("="*100)
    print("  SELLUP SMART SCRAPER - Extracting REAL Prices")
    print("  Model: iPhone 16 Pro Max 256GB")
    print("="*100)
    
    results = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Show browser for debugging
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        )
        page = context.new_page()
        
        print(f"\nScraping {len(TEST_COMBINATIONS)} test combinations...\n")
        
        for i, combo in enumerate(TEST_COMBINATIONS, 1):
            key = f"{combo['country']}_{combo['body']}_{combo['screen']}_{combo['battery']}_{combo['acc']}"
            print(f"[{i}/{len(TEST_COMBINATIONS)}] {key}")
            
            price, all_prices = get_price_for_combination(
                page,
                combo["country"],
                combo["body"],
                combo["screen"],
                combo["battery"],
                combo["acc"]
            )
            
            if price:
                print(f"    HIGHEST: ${price}")
                print(f"    All dealers: {all_prices}")
                
                if combo["expected"]:
                    match = "YES" if price == combo["expected"] else f"NO (expected ${combo['expected']})"
                    print(f"    Expected: ${combo['expected']} - Match: {match}")
                
                results.append({
                    "key": key,
                    "country": combo["country"],
                    "body": combo["body"],
                    "screen": combo["screen"],
                    "battery": combo["battery"],
                    "accessories": combo["acc"],
                    "highest_price": price,
                    "all_dealer_prices": all_prices
                })
            else:
                print(f"    FAILED to extract price")
            
            print()
        
        browser.close()
    
    # Save results
    if results:
        output = {
            "model": "iPhone 16 Pro Max",
            "storage": "256GB",
            "timestamp": datetime.now().isoformat(),
            "source": "SellUp - REAL Scraped",
            "combinations_tested": len(results),
            "results": results,
            "prices": {r["key"]: r["highest_price"] for r in results}
        }
        
        with open("REAL_PRICES_VERIFIED.json", "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2)
        print(f"\n[SAVED] REAL_PRICES_VERIFIED.json")
        
        # Print summary table
        print("\n" + "="*100)
        print("  VERIFIED PRICES FROM SELLUP")
        print("="*100)
        print(f"\n{'Key':<50} {'Price':>10}")
        print("-"*62)
        for r in sorted(results, key=lambda x: -x["highest_price"]):
            print(f"{r['key']:<50} ${r['highest_price']:>8}")
        
        print("\n" + "="*100)

if __name__ == "__main__":
    main()
