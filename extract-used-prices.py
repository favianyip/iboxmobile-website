#!/usr/bin/env python3
"""
Extract USED prices from Apple_USED_NEW_FULL_REVIEW.xlsx
"""

try:
    import openpyxl
    import json
    import sys

    # Open the workbook
    wb = openpyxl.load_workbook('Apple_USED_NEW_FULL_REVIEW.xlsx', data_only=True)

    print("=" * 80)
    print("📊 EXCEL FILE ANALYSIS")
    print("=" * 80)
    print(f"\n📋 Available sheets: {wb.sheetnames}\n")

    # Find USED sheet (might be named differently)
    used_sheet_names = [name for name in wb.sheetnames if 'USED' in name.upper()]

    if not used_sheet_names:
        print("❌ No USED sheet found!")
        print("Available sheets:", wb.sheetnames)
        sys.exit(1)

    print(f"🔍 Found USED sheets: {used_sheet_names}\n")

    # Process each USED sheet
    for sheet_name in used_sheet_names:
        print(f"\n{'=' * 80}")
        print(f"📄 SHEET: {sheet_name}")
        print("=" * 80)

        ws = wb[sheet_name]

        # Print first 20 rows to understand structure
        print("\n📝 First 20 rows (showing structure):\n")
        for i, row in enumerate(ws.iter_rows(max_row=20, values_only=True), 1):
            print(f"Row {i}: {row}")

        print(f"\n\n🔍 Looking for iPhone 14, 15, 16 Pro models...\n")

        # Try to find models (assuming model name is in first column)
        target_models = [
            "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
            "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
            "iPhone 16 Pro", "iPhone 16 Pro Max"
        ]

        found_models = {}

        for row in ws.iter_rows(min_row=2, values_only=True):
            if row[0]:  # If first column has value
                model_name = str(row[0]).strip()

                # Check if this is one of our target models
                for target in target_models:
                    if target.lower() in model_name.lower():
                        if model_name not in found_models:
                            found_models[model_name] = row
                        print(f"✅ Found: {model_name}")
                        print(f"   Row data: {row}\n")

        if found_models:
            print(f"\n✅ Found {len(found_models)} target models in this sheet")
        else:
            print(f"\n⚠️  No target models found in this sheet")

    print("\n" + "=" * 80)
    print("✅ EXTRACTION COMPLETE")
    print("=" * 80)

except ImportError:
    print("❌ openpyxl not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "openpyxl", "-q"])
    print("✅ Installed openpyxl. Please run the script again.")

except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
