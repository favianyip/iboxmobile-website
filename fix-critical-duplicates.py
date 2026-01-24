# -*- coding: utf-8 -*-
"""
Fix Critical Duplicate Images - Real Products Using Same Images
"""
import os
import requests
from pathlib import Path
import time

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'

# Correct unique images for models currently using duplicates
CORRECT_IMAGES = {
    # iPhone XR should NOT use iPhone 11 image
    'apple-iphone-xr.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr.jpg',

    # Galaxy S23 should NOT be same as S24 FE
    # Keep S23 as is, fix S24 FE
    'samsung-galaxy-s24-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-fe.jpg',

    # Galaxy Buds 3 Pro should have its own image
    'samsung-galaxy-buds-3-pro.jpg': 'https://images.samsung.com/is/image/samsung/assets/us/smartphones/galaxy-s24-ultra/buy/Accessories_Carousel_Buds2Pro_Graphite_1600x1200.jpg',
}

def download(url, filepath, name):
    print(f"\n[FIXING] {name}")
    print(f"  URL: {url[:80]}...")

    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=30, stream=True)
        r.raise_for_status()

        # Backup existing
        if filepath.exists():
            backup = filepath.with_suffix('.jpg.old')
            if backup.exists():
                backup.unlink()
            filepath.rename(backup)
            print(f"  [BACKUP] Saved old to {backup.name}")

        with open(filepath, 'wb') as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

        size = os.path.getsize(filepath) / 1024
        print(f"  [OK] Downloaded {size:.1f} KB")

        # Remove backup on success
        if backup.exists():
            backup.unlink()

        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")

        # Restore backup on failure
        if backup.exists():
            backup.rename(filepath)
            print(f"  [RESTORED] Kept old image")

        return False

def main():
    print("=" * 80)
    print("FIXING CRITICAL DUPLICATE IMAGES")
    print("=" * 80)
    print("Issue: Real products using same images as other models")
    print()

    success = 0
    failed = 0

    for filename, url in CORRECT_IMAGES.items():
        filepath = OUTPUT_DIR / filename
        name = filename.replace('.jpg', '').replace('-', ' ').title()

        if download(url, filepath, name):
            success += 1
        else:
            failed += 1

        time.sleep(0.5)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Fixed: {success}/{len(CORRECT_IMAGES)}")
    print(f"Failed: {failed}")

    if failed == 0:
        print("\n[SUCCESS] All critical duplicates fixed!")

    print("\n[NEXT] Verify images are now unique")

if __name__ == '__main__':
    main()
