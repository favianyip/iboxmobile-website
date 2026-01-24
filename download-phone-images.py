#!/usr/bin/env python3
"""
Automated Phone Image Downloader

Downloads high-quality product images for all phone models from multiple sources.

Requirements:
    pip install requests beautifulsoup4 pillow

Run:
    python download-phone-images.py
"""

import os
import requests
from pathlib import Path
import time
import json

# Configuration
OUTPUT_DIR = Path(__file__).parent / 'images' / 'phones'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Direct image URLs from official sources
DIRECT_URLS = {
    # Apple iPhones - Official Support Pages
    'apple-iphone-xr.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP781/SP781-iphone-xr.jpg',
    'apple-iphone-xs.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP779/SP779-iphone-xs.jpg',
    'apple-iphone-xs-max.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP780/SP780-iPhone-Xs-Max.jpg',
    'apple-iphone-se-2022.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP867/sp867-iphone-se-3rd-gen_2x.png',

    # Samsung Galaxy - GSMArena high-res images (fallback)
    'samsung-galaxy-s21-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-fe-5g.jpg',
    'samsung-galaxy-s23-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-fe.jpg',
    'samsung-galaxy-s24-fe-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-fe.jpg',
    'samsung-galaxy-z-fold-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg',
    'samsung-galaxy-z-flip-6-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg',
    'samsung-galaxy-a36-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a36-5g.jpg',
    'samsung-galaxy-a55-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
    'samsung-galaxy-a73-5g.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg',
    'samsung-galaxy-buds-3.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds3.jpg',
    'samsung-galaxy-buds-3-pro.jpg': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds3-pro.jpg',
}

# Placeholder mappings for future/unreleased models
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
    'samsung-galaxy-s25-fe-5g.jpg': 'galaxy-s24-fe.jpg',
    'samsung-galaxy-z-fold-7-5g.jpg': 'samsung-galaxy-z-fold-6-5g.jpg',
    'samsung-galaxy-z-flip-7-5g.jpg': 'samsung-galaxy-z-flip-6-5g.jpg',
    'samsung-galaxy-z-flip-7-fe-5g.jpg': 'samsung-galaxy-z-flip-6-5g.jpg',
    'samsung-galaxy-a56-5g.jpg': 'samsung-galaxy-a55-5g.jpg',
}


def download_image(url, filepath, model_name):
    """Download image from URL to filepath"""
    print(f"\n[PHONE] {model_name}")
    print(f"   [DOWNLOAD] Downloading from: {url}")

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
        print(f"     Downloaded: {size_kb:.2f} KB")
        return True

    except requests.exceptions.RequestException as e:
        print(f"     Failed: {str(e)}")
        if filepath.exists():
            filepath.unlink()
        return False


def create_placeholder(source_filename, target_filename, model_name):
    """Copy existing image as placeholder"""
    source_path = OUTPUT_DIR / source_filename
    target_path = OUTPUT_DIR / target_filename

    if source_path.exists() and not target_path.exists():
        print(f"\n ã {model_name}")
        print(f"   Using placeholder from: {source_filename}")

        try:
            import shutil
            shutil.copy2(source_path, target_path)
            print(f"     Created placeholder")
            return True
        except Exception as e:
            print(f"     Failed to create placeholder: {e}")
            return False

    return False


def main():
    print(" Ä Starting Phone Image Download")
    print(f" Å Output directory: {OUTPUT_DIR}")
    print("=" * 60)

    success_count = 0
    failed_count = 0
    placeholder_count = 0
    skipped_count = 0
    failed_models = []

    # Download images from direct URLs
    print("\n • DOWNLOADING IMAGES FROM OFFICIAL SOURCES")
    print("=" * 60)

    for filename, url in DIRECT_URLS.items():
        filepath = OUTPUT_DIR / filename
        model_name = filename.replace('.jpg', '').replace('.png', '').replace('-', ' ').title()

        # Skip if already exists
        if filepath.exists():
            print(f"\n[PHONE] {model_name}")
            print(f"       Already exists, skipping")
            skipped_count += 1
            continue

        if download_image(url, filepath, model_name):
            success_count += 1
        else:
            failed_count += 1
            failed_models.append((model_name, filename, url))

        # Be nice to servers - wait between requests
        time.sleep(0.5)

    # Create placeholders for future models
    print("\n\n ã CREATING PLACEHOLDERS FOR FUTURE MODELS")
    print("=" * 60)

    for target_filename, source_filename in PLACEHOLDERS.items():
        model_name = target_filename.replace('.jpg', '').replace('-', ' ').title()

        if create_placeholder(source_filename, target_filename, model_name):
            placeholder_count += 1

    # Print summary
    print("\n\n" + "=" * 60)
    print(" ä DOWNLOAD SUMMARY")
    print("=" * 60)
    print(f"  Successfully downloaded: {success_count}")
    print(f" ã Placeholders created: {placeholder_count}")
    print(f"    Already existed: {skipped_count}")
    print(f"  Failed downloads: {failed_count}")
    print(f" ¶ Total images available: {success_count + placeholder_count + skipped_count}")

    if failed_models:
        print("\n    MANUAL DOWNLOAD REQUIRED:")
        for model_name, filename, url in failed_models:
            print(f"\n     {model_name}")
            print(f"      File: {filename}")
            print(f"      URL: {url}")

    print("\n  Image download complete!")
    print(f" Å Images saved to: {OUTPUT_DIR}")

    print("\n ° NEXT STEPS:")
    print("   1. Check images/phones/ folder")
    print("   2. Manually download any failed images")
    print("   3. Open admin.html   Data Management")
    print("   4. Click 'Reset to Default Prices'")
    print("   5. Verify images display on buy.html")

    # Create report file
    report_path = Path(__file__).parent / 'IMAGE_DOWNLOAD_REPORT.txt'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("Phone Image Download Report\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Downloaded: {success_count}\n")
        f.write(f"Placeholders: {placeholder_count}\n")
        f.write(f"Skipped: {skipped_count}\n")
        f.write(f"Failed: {failed_count}\n\n")

        if failed_models:
            f.write("Failed Downloads:\n")
            f.write("-" * 60 + "\n")
            for model_name, filename, url in failed_models:
                f.write(f"\n{model_name}\n")
                f.write(f"  File: {filename}\n")
                f.write(f"  URL: {url}\n")

    print(f"\n Ñ Report saved to: {report_path}")


if __name__ == '__main__':
    main()
