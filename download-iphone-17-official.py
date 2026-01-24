# -*- coding: utf-8 -*-
"""
Download Official iPhone 17 Series Images
Released: September 19, 2025
"""
import os
import requests
from pathlib import Path
import time

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'

# Official iPhone 17 images from Apple and GSMArena
IPHONE_17_IMAGES = {
    # Try GSMArena first (usually most reliable)
    'apple-iphone-17.jpg': [
        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17.jpg',
        'https://www.apple.com/sg/iphone-17/images/overview/welcome/hero_startframe__fslo8k8lane6_large_2x.jpg',
    ],

    'apple-iphone-17-pro.jpg': [
        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro.jpg',
        'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero_startframe__bg2u4qgmsrki_xlarge.jpg',
    ],

    'apple-iphone-17-pro-max.jpg': [
        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro-max.jpg',
        'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg',
    ],
}

def download(urls, filepath, name):
    print(f"\n[{name}]")

    # Try each URL until one works
    for i, url in enumerate(urls):
        print(f"  Trying URL {i+1}/{len(urls)}: {url[:70]}...")

        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            r = requests.get(url, headers=headers, timeout=30, stream=True)
            r.raise_for_status()

            # Backup existing file
            if filepath.exists():
                backup = filepath.with_suffix('.jpg.backup')
                filepath.rename(backup)
                print(f"  [BACKUP] Saved old to {backup.name}")

            with open(filepath, 'wb') as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)

            size = os.path.getsize(filepath) / 1024
            print(f"  [OK] Downloaded official {name} image ({size:.1f} KB)")

            # Remove backup on success
            if backup.exists():
                backup.unlink()

            return True

        except Exception as e:
            print(f"  [FAIL] {str(e)[:60]}...")
            if filepath.exists():
                filepath.unlink()
            continue

    # If all URLs failed, restore backup
    backup = filepath.with_suffix('.jpg.backup')
    if backup.exists():
        backup.rename(filepath)
        print(f"  [RESTORED] Kept old image")

    return False

def main():
    print("=" * 80)
    print("DOWNLOADING OFFICIAL iPHONE 17 SERIES IMAGES")
    print("=" * 80)
    print("Released: September 19, 2025")
    print()

    success = 0
    failed = 0

    for filename, urls in IPHONE_17_IMAGES.items():
        filepath = OUTPUT_DIR / filename
        name = filename.replace('apple-', '').replace('.jpg', '').replace('-', ' ').title()

        if download(urls, filepath, name):
            success += 1
        else:
            failed += 1

        time.sleep(0.5)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Downloaded: {success}/{len(IPHONE_17_IMAGES)}")
    print(f"Failed: {failed}")

    if failed == 0:
        print("\n[SUCCESS] All iPhone 17 official images downloaded!")
        print("\nNext: Reset prices in admin panel to load new images")

if __name__ == '__main__':
    main()
