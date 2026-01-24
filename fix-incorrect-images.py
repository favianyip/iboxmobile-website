# -*- coding: utf-8 -*-
"""
Fix Incorrect Phone Images
Downloads correct official product images for mismatched models
"""
import os
import requests
from pathlib import Path
import time

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Correct image URLs for models with wrong images
CORRECT_IMAGES = {
    # Apple - Fix actual wrong images
    'apple-iphone-xr.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP781/SP781-iphone-xr.jpg',
    'apple-iphone-11.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP804/sp804-iphone-11_2x.png',
    'apple-iphone-12.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP830/sp830-iphone-12-ios14_2x.png',
    'apple-iphone-12-pro.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP831/iphone-12-pro_2x.png',

    # Samsung Galaxy S-series - Fix wrong models
    'samsung-galaxy-s21-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-5g.jpg',
    'samsung-galaxy-s22-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg',
    'samsung-galaxy-s23-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-5g.jpg',
    'samsung-galaxy-s24-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g-s921.jpg',

    # Samsung Galaxy S Plus - Fix wrong models
    'samsung-galaxy-s21-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-plus-5g.jpg',
    'samsung-galaxy-s22-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-plus-5g.jpg',
    'samsung-galaxy-s23-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-plus-5g.jpg',
    'samsung-galaxy-s24-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-plus-5g-s926.jpg',

    # Samsung Galaxy S Ultra - Fix wrong models
    'samsung-galaxy-s21-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-ultra-5g.jpg',
    'samsung-galaxy-s22-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-ultra-5g.jpg',
    'samsung-galaxy-s23-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-ultra.jpg',
    'samsung-galaxy-s24-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5928.jpg',

    # Samsung A-series - Fix duplicates
    'samsung-galaxy-a36-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a34-5g.jpg',
    'samsung-galaxy-a55-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
    'samsung-galaxy-a73-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg',

    # Samsung Flip - Fix duplicates
    'samsung-galaxy-z-flip-4-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip4-5g.jpg',
    'samsung-galaxy-z-flip-5-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip5.jpg',
    'samsung-galaxy-z-flip-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg',

    # Samsung Fold - Fix duplicates
    'samsung-galaxy-z-fold-3-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold3-5g.jpg',
    'samsung-galaxy-z-fold-4-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold4.jpg',
    'samsung-galaxy-z-fold-5-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5.jpg',
    'samsung-galaxy-z-fold-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg',

    # Samsung Buds - Need actual product images
    'samsung-galaxy-buds-3.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds3.jpg',
    'samsung-galaxy-buds-3-pro.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds3-pro.jpg',

    # Samsung Note - Fix duplicates
    'samsung-galaxy-note20-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-note20-5g.jpg',
    'samsung-galaxy-note20-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-note20-ultra.jpg',
}

def download_image(url, filepath, model_name):
    """Download image from URL"""
    print(f"\n[FIXING] {model_name}")
    print(f"   URL: {url[:70]}...")

    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        response = requests.get(url, headers=headers, timeout=30, stream=True)
        response.raise_for_status()

        # Save image
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        # Get file size
        size_kb = os.path.getsize(filepath) / 1024
        print(f"   [OK] Downloaded: {size_kb:.1f} KB")
        return True

    except requests.exceptions.RequestException as e:
        print(f"   [FAIL] {str(e)}")
        if filepath.exists():
            filepath.unlink()
        return False

def main():
    print("=" * 80)
    print("FIXING INCORRECT PHONE IMAGES")
    print("=" * 80)
    print(f"Output: {OUTPUT_DIR}")
    print(f"Total fixes: {len(CORRECT_IMAGES)}")
    print()

    success = 0
    failed = 0
    failed_list = []

    for filename, url in CORRECT_IMAGES.items():
        filepath = OUTPUT_DIR / filename
        model_name = filename.replace('.jpg', '').replace('-', ' ').title()

        # Backup existing file
        if filepath.exists():
            backup_path = filepath.with_suffix('.jpg.backup')
            if backup_path.exists():
                backup_path.unlink()
            filepath.rename(backup_path)
            print(f"   [BACKUP] Saved original to {backup_path.name}")

        if download_image(url, filepath, model_name):
            success += 1
            # Remove backup if download successful
            backup_path = filepath.with_suffix('.jpg.backup')
            if backup_path.exists():
                backup_path.unlink()
        else:
            failed += 1
            failed_list.append((model_name, filename, url))
            # Restore backup if download failed
            backup_path = filepath.with_suffix('.jpg.backup')
            if backup_path.exists():
                backup_path.rename(filepath)
                print(f"   [RESTORED] Kept original image")

        time.sleep(0.5)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Fixed: {success}")
    print(f"Failed: {failed}")

    if failed_list:
        print("\nFAILED DOWNLOADS:")
        for model, filename, url in failed_list:
            print(f"  - {model}")
            print(f"    File: {filename}")
            print(f"    URL: {url[:70]}...")

    print("\n[DONE] Image fix complete!")
    print(f"Next: Reset prices in admin panel to reload images")

if __name__ == '__main__':
    main()
