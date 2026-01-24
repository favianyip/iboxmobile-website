# -*- coding: utf-8 -*-
"""
Fix Remaining Failed Images - Alternative URLs
"""
import os
import requests
from pathlib import Path
import time

OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'

# Alternative working URLs for failed downloads
IMAGES = {
    # Apple iPhones - Alternative sources
    'apple-iphone-11.jpg': 'https://support.apple.com/content/dam/edam/applecare/images/en_US/iphone/iphone-11/iphone-11.png',
    'apple-iphone-12.jpg': 'https://support.apple.com/content/dam/edam/applecare/images/en_US/iphone/iphone-12-iphone-12-mini/iphone-12.png',
    'apple-iphone-12-pro.jpg': 'https://support.apple.com/content/dam/edam/applecare/images/en_US/iphone/iphone-12-pro-iphone-12-pro-max/iphone-12-pro.png',

    # Samsung S21 series - GSMArena alternative format
    'samsung-galaxy-s21-5g.jpg': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg',
    'samsung-galaxy-s21-plus-5g.jpg': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-plus-5g-1.jpg',
    'samsung-galaxy-s21-ultra-5g.jpg': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-ultra-1.jpg',

    # Samsung S24 series
    'samsung-galaxy-s24-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/za/sm-s921bzadeuc/gallery/za-galaxy-s24-s921-sm-s921bzadeuc-539486058',
    'samsung-galaxy-s24-plus-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/za/sm-s926bzadeuc/gallery/za-galaxy-s24-plus-s926-sm-s926bzadeuc-539491291',
    'samsung-galaxy-s24-ultra-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/za/sm-s928bzadeuc/gallery/za-galaxy-s24-ultra-s928-sm-s928bzadeuc-539498399',

    # Samsung S23 Ultra
    'samsung-galaxy-s23-ultra-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/za/2302/gallery/za-galaxy-s23-ultra-s918-sm-s918bzadeuc-534851480',

    # Samsung A-series
    'samsung-galaxy-a36-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a346elgamea/gallery/levant-galaxy-a34-5g-sm-a346-sm-a346elgamea-535416470',

    # Samsung Buds - Official Samsung
    'samsung-galaxy-buds-3.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-r530nzaaeua/gallery/uk-galaxy-buds3-r530-sm-r530nzaaeua-542654256',
    'samsung-galaxy-buds-3-pro.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/sm-r630nzaaeua/gallery/uk-galaxy-buds3-pro-r630-sm-r630nzaaeua-542654396',

    # Samsung Note 20
    'samsung-galaxy-note20-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-n980fzgdxfe/gallery/africa-en-galaxy-note20-5g-n980-sm-n980fzgdxfe-233443086',
    'samsung-galaxy-note20-ultra-5g.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-n986bzsdxfe/gallery/africa-en-galaxy-note20-ultra-5g-n986-sm-n986bzsdxfe-233443085',
}

def download(url, filepath, name):
    print(f"\n[DOWNLOAD] {name}")
    print(f"   URL: {url[:75]}...")

    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=30, stream=True)
        r.raise_for_status()

        with open(filepath, 'wb') as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

        size = os.path.getsize(filepath) / 1024
        print(f"   [OK] {size:.1f} KB")
        return True
    except Exception as e:
        print(f"   [FAIL] {str(e)}")
        if filepath.exists():
            filepath.unlink()
        return False

def main():
    print("=" * 80)
    print("FIXING REMAINING 15 IMAGES")
    print("=" * 80)

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
            failed_list.append((name, filename))

        time.sleep(0.5)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Success: {success}/{len(IMAGES)}")
    print(f"Failed: {failed}")

    if failed_list:
        print("\nSTILL FAILED:")
        for name, filename in failed_list:
            print(f"  - {name} ({filename})")

    print("\n[DONE]")

if __name__ == '__main__':
    main()
