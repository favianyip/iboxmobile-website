# -*- coding: utf-8 -*-
"""
Download Final Missing Images - Verified Working URLs from Web Research
"""
import os
import requests
from pathlib import Path
import time

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'

# Verified working URLs from web research
IMAGES = {
    # iPhones - GSMArena
    'apple-iphone-11.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg',
    'apple-iphone-12.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg',
    'apple-iphone-12-pro.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro--.jpg',

    # Samsung Galaxy S Series - GSMArena
    'samsung-galaxy-s21-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-ultra-5g-.jpg',
    'samsung-galaxy-s24-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g-sm-s921.jpg',
    'samsung-galaxy-s24-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-plus-5g-sm-s926.jpg',
    'samsung-galaxy-s24-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928.jpg',
    'samsung-galaxy-s23-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-ultra-5g.jpg',

    # Samsung Galaxy A Series
    'samsung-galaxy-a36-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a36.jpg',

    # Samsung Galaxy Note
    'samsung-galaxy-note20-5g.jpg': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-note20-1.jpg',
    'samsung-galaxy-note20-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-note20-ultra-.jpg',

    # Samsung Buds - Official Samsung CDN
    'samsung-galaxy-buds-3.jpg': 'https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3/07222024/JellyMLP-HD01-HomeKVCarousel-Buds3-KV-D-1440x810-V2.jpg',
    'samsung-galaxy-buds-3-pro.jpg': 'https://images.samsung.com/is/image/samsung/assets/us/mobile-audio/galaxy-buds3-pro/07222024/JellyMLP-HD01-HomeKVCarousel-Buds3Pro-KV-D-1440x810-V2.jpg',
}

def download(url, filepath, name):
    print(f"\n[{name}]")
    print(f"  URL: {url[:80]}...")

    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=30, stream=True)
        r.raise_for_status()

        with open(filepath, 'wb') as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

        size = os.path.getsize(filepath) / 1024
        print(f"  [OK] Downloaded {size:.1f} KB")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        if filepath.exists():
            filepath.unlink()
        return False

def main():
    print("=" * 80)
    print("DOWNLOADING FINAL 13 MISSING IMAGES")
    print("=" * 80)
    print(f"Output: {OUTPUT_DIR}\n")

    success = 0
    failed = 0
    failed_list = []

    for filename, url in IMAGES.items():
        filepath = OUTPUT_DIR / filename
        name = filename.replace('.jpg', '').replace('-', ' ').title()

        if download(url, filepath, name):
            success += 1
        else:
            failed += 1
            failed_list.append(filename)

        time.sleep(0.5)

    print("\n" + "=" * 80)
    print("FINAL SUMMARY")
    print("=" * 80)
    print(f"Successfully downloaded: {success}/{len(IMAGES)}")
    print(f"Failed: {failed}")

    if failed_list:
        print("\nFailed files:")
        for f in failed_list:
            print(f"  - {f}")
    else:
        print("\n[SUCCESS] All images downloaded!")

    print("\n[NEXT STEP] Reset prices in admin panel to load new images")

if __name__ == '__main__':
    main()
