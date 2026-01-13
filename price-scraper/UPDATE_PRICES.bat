@echo off
echo ============================================
echo   IBOX MOBILE - Price Update Tool
echo ============================================
echo.
echo This will update prices for all models.
echo.

cd /d "%~dp0"

echo Step 1: Updating model prices...
python update_all_prices.py

echo.
echo Step 2: Generating direct price lookup...
python generate_direct_prices.py

echo.
echo ============================================
echo   Price update complete!
echo ============================================
echo.
echo Updated files:
echo   - price_data.json (52 models)
echo   - direct_prices.json (price lookup)
echo.
pause
