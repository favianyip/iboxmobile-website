# -*- coding: utf-8 -*-
import os
import requests
from pathlib import Path
import time
import shutil

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Direct image URLs (updated with working URLs)
URLS = {
    # Apple - Using alternative sources
    'apple-iphone-xr.jpg': 'https://images.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-xr_colors_10032018.jpg.landing-big_2x.jpg',
    'apple-iphone-xs.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP779/SP779-iphone-xs.jpg',
    'apple-iphone-xs-max.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP780/SP780-iPhone-Xs-Max.jpg',
    'apple-iphone-se-2022.jpg': 'https://images.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-se-hero_03082022.jpg.landing-big_2x.jpg',

    # Samsung - Using GSMArena as primary source
    'samsung-galaxy-s21-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-fe-5g.jpg',
    'samsung-galaxy-s23-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-fe.jpg',
    'samsung-galaxy-s24-fe-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-s721blbceub/gallery/uk-galaxy-s24-fe-sm-s721-sm-s721blbceub-543858842',
    'samsung-galaxy-z-fold-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg',
    'samsung-galaxy-z-flip-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg',
    'samsung-galaxy-a36-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a346elgamea/gallery/levant-galaxy-a34-5g-sm-a346-sm-a346elgamea-535416470',
    'samsung-galaxy-a55-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
    'samsung-galaxy-a73-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg',
    'samsung-galaxy-buds-3.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-r530nzaaeua/gallery/uk-galaxy-buds3-r530-sm-r530nzaaeua-542654256',
    'samsung-galaxy-buds-3-pro.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-r630nzaaeua/gallery/uk-galaxy-buds3-pro-r630-sm-r630nzaaeua-542654396',
}

PLACEHOLDERS = {
    'apple-iphone-17.jpg': 'iphone-16.jpg',
    'apple-iphone-17-pro.jpg': 'iphone-16-pro.jpg',
    'apple-iphone-17-pro-max.jpg': 'iphone-16-pro-max.jpg',
    'apple-iphone-16e.jpg': 'iphone-se-3rd-gen.jpg',
    'apple-iphone-air.jpg': 'iphone-15.jpg',
    'samsung-galaxy-s25-5g.jpg': 'galaxy-s24.jpg',
    'samsung-galaxy-s25-plus-5g.jpg': 'galaxy-s24-plus.jpg',
    'samsung-galaxy-s25-ultra-5g.jpg': 'galaxy-s24-ultra.jpg',
    'samsung-galaxy-s25-edge-5g.jpg': 'galaxy-s24.jpg',
    'samsung-galaxy-s25-fe-5g.jpg': 'samsung-galaxy-s24-fe-5g.jpg',
    'samsung-galaxy-z-fold-7-5g.jpg': 'samsung-galaxy-z-fold-6-5g.jpg',
    'samsung-galaxy-z-flip-7-5g.jpg': 'samsung-galaxy-z-flip-6-5g.jpg',
    'samsung-galaxy-z-flip-7-fe-5g.jpg': 'samsung-galaxy-z-flip-6-5g.jpg',
    'samsung-galaxy-a56-5g.jpg': 'samsung-galaxy-a55-5g.jpg',
}

def download(url, filepath):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=30, stream=True)
        r.raise_for_status()

        with open(filepath, 'wb') as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

        size = os.path.getsize(filepath) / 1024
        print(f"  [OK] {filepath.name} ({size:.1f} KB)")
        return True
    except Exception as e:
        print(f"  [FAIL] {filepath.name}: {e}")
        if filepath.exists():
            filepath.unlink()
        return False

print("Starting Phone Image Download")
print(f"Output: {OUTPUT_DIR}\n")

success = 0
failed = 0
skipped = 0

print("DOWNLOADING IMAGES...")
for filename, url in URLS.items():
    filepath = OUTPUT_DIR / filename

    if filepath.exists():
        print(f"  [SKIP] {filename} (already exists)")
        skipped += 1
        continue

    print(f"\n{filename}")
    print(f"  URL: {url}")

    if download(url, filepath):
        success += 1
    else:
        failed += 1

    time.sleep(0.5)

print("\n\nCREATING PLACEHOLDERS...")
placeholders = 0
for target, source in PLACEHOLDERS.items():
    src_path = OUTPUT_DIR / source
    tgt_path = OUTPUT_DIR / target

    if tgt_path.exists():
        continue

    if src_path.exists():
        shutil.copy2(src_path, tgt_path)
        print(f"  [OK] {target} <- {source}")
        placeholders += 1

print("\n" + "="*60)
print("SUMMARY")
print("="*60)
print(f"Downloaded: {success}")
print(f"Placeholders: {placeholders}")
print(f"Skipped: {skipped}")
print(f"Failed: {failed}")
print(f"Total: {success + placeholders + skipped}")
print(f"\nImages saved to: {OUTPUT_DIR}")
print("\nNEXT STEPS:")
print("1. Check images/phones/ folder")
print("2. Open admin.html > Data Management")
print("3. Click 'Reset to Default Prices'")
print("4. Verify images on buy.html")
