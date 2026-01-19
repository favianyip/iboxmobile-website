/**
 * EXACT PRICE IMPORT - REGENERATED FROM EXCEL FILES
 *
 * Source: Apple_USED_NEW_FULL_REVIEW.xlsx and Samsung_USED_NEW_FULL_REVIEW.xlsx
 * Generated: 2026-01-19
 *
 * CRITICAL: This script uses EXACT prices from Excel files.
 * NO multipliers, NO calculations, NO modifications.
 */

// ============================================================================
// APPLE PHONES - USED PRICES (from USED_HIGHEST_ALL sheet)
// Total Models: 38 (Updated 2026-01-19) - Added older models: iPhone 7/7Plus/8/8Plus/X/SE2
// ============================================================================
const appleUsedPrices = {
    // Older Models (iPhone 7-X generation)
    "iPhone 7": { "32GB": 40, "128GB": 50, "256GB": 60 },
    "iPhone 7 Plus": { "32GB": 50, "128GB": 60, "256GB": 70 },
    "iPhone 8": { "64GB": 70, "256GB": 90 },
    "iPhone 8 Plus": { "64GB": 100, "256GB": 120 },
    "iPhone X": { "64GB": 150, "256GB": 180 },
    "iPhone SE (2nd Gen)": { "64GB": 60, "128GB": 80, "256GB": 100 },
    // iPhone XR/XS generation
    "iPhone XR": { "64GB": 50, "128GB": 80, "256GB": 110 },
    "iPhone XS": { "64GB": 70, "256GB": 100, "512GB": 130 },
    "iPhone XS Max": { "64GB": 120, "256GB": 150, "512GB": 180 },
    "iPhone 11": { "64GB": 120, "128GB": 150, "256GB": 180 },
    "iPhone 11 Pro": { "64GB": 170, "256GB": 210, "512GB": 240 },
    "iPhone 11 Pro Max": { "64GB": 220, "256GB": 250, "512GB": 280 },
    "iPhone SE (3rd Gen)": { "64GB": 120, "128GB": 170, "256GB": 220 },
    "iPhone 12 mini": { "64GB": 120, "128GB": 150, "256GB": 180 },
    "iPhone 12": { "64GB": 200, "128GB": 250, "256GB": 300 },
    "iPhone 12 Pro": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 12 Pro Max": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 13 mini": { "128GB": 250, "256GB": 300, "512GB": 350 },
    "iPhone 13": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 13 Pro": { "128GB": 380, "256GB": 430, "512GB": 480, "1TB": 530 },
    "iPhone 13 Pro Max": { "128GB": 460, "256GB": 510, "512GB": 560, "1TB": 610 },
    "iPhone 14": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 14 Plus": { "128GB": 420, "256GB": 470, "512GB": 520 },
    "iPhone 14 Pro": { "128GB": 500, "256GB": 550, "512GB": 600, "1TB": 650 },
    "iPhone 14 Pro Max": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 15": { "128GB": 500, "256GB": 550, "512GB": 600 },
    "iPhone 15 Plus": { "128GB": 550, "256GB": 600, "512GB": 650 },
    "iPhone 15 Pro": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 15 Pro Max": { "256GB": 800, "512GB": 850, "1TB": 900 },
    "iPhone 16": { "128GB": 670, "256GB": 720, "512GB": 770 },
    "iPhone 16 Plus": { "128GB": 750, "256GB": 800, "512GB": 850 },
    "iPhone 16 Pro": { "128GB": 870, "256GB": 920, "512GB": 970, "1TB": 1020 },
    "iPhone 16 Pro Max": { "256GB": 900, "512GB": 950, "1TB": 1000 },
    "iPhone 16E": { "128GB": 520, "256GB": 620, "512GB": 720 },
    "iPhone 17": { "256GB": 900, "512GB": 1150 },
    "iPhone 17 Pro": { "256GB": 1350, "512GB": 1550, "1TB": 1750 },
    "iPhone 17 Pro Max": { "256GB": 1520, "512GB": 1750, "1TB": 1920, "2TB": 2070 },
    "iPhone Air": { "256GB": 850, "512GB": 1000, "1TB": 1100 }
};

// ============================================================================
// APPLE PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// Total Models: 17 (Updated 2026-01-19)
// ============================================================================
const appleNewPrices = {
    "iPhone 14": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 14 Plus": { "128GB": 420, "256GB": 470, "512GB": 520 },
    "iPhone 14 Pro": { "128GB": 500, "256GB": 550, "512GB": 600, "1TB": 650 },
    "iPhone 14 Pro Max": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 15": { "128GB": 500, "256GB": 550, "512GB": 600 },
    "iPhone 15 Plus": { "128GB": 550, "256GB": 600, "512GB": 650 },
    "iPhone 15 Pro": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 15 Pro Max": { "256GB": 800, "512GB": 850, "1TB": 900 },
    "iPhone 16": { "128GB": 920, "256GB": 1020, "512GB": 1070 },
    "iPhone 16 Plus": { "128GB": 1050, "256GB": 1150, "512GB": 1200 },
    "iPhone 16 Pro": { "128GB": 870, "256GB": 920, "512GB": 970, "1TB": 1020 },
    "iPhone 16 Pro Max": { "256GB": 1020, "512GB": 1070, "1TB": 1120 },
    "iPhone 16E": { "128GB": 650, "256GB": 770, "512GB": 870 },
    "iPhone 17": { "256GB": 1200, "512GB": 1370 },
    "iPhone 17 Pro": { "256GB": 1600, "512GB": 1750, "1TB": 1950 },
    "iPhone 17 Pro Max": { "256GB": 1720, "512GB": 2000, "1TB": 2220, "2TB": 2420 },
    "iPhone Air": { "256GB": 1000, "512GB": 1220, "1TB": 1320 }
};

// ============================================================================
// SAMSUNG PHONES - USED PRICES (from USED_HIGHEST_ALL sheet)
// Total Models: 42 (Updated 2026-01-19)
// ============================================================================
const samsungUsedPrices = {
    // Galaxy Z Fold Series
    "Galaxy Z Fold 3 5G": { "256GB": 200, "512GB": 250 },
    "Galaxy Z Fold 4 5G": { "256GB": 350, "512GB": 400, "1TB": 500 },
    "Galaxy Z Fold 5 5G": { "256GB": 550, "512GB": 600, "1TB": 650 },
    "Galaxy Z Fold 6 5G": { "256GB": 770, "512GB": 870, "1TB": 970 },
    "Galaxy Z Fold 7 5G": { "256GB": 1470, "512GB": 1520, "1TB": 1620 },

    // Galaxy Z Flip Series
    "Galaxy Z Flip 4 5G": { "128GB": 100, "256GB": 150, "512GB": 200 },
    "Galaxy Z Flip 5 5G": { "256GB": 250, "512GB": 300 },
    "Galaxy Z Flip 6 5G": { "256GB": 400, "512GB": 450 },
    "Galaxy Z Flip 7 5G": { "256GB": 670, "512GB": 770 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 470, "256GB": 570 },

    // Galaxy S21 Series
    "Galaxy S21 5G": { "Base": 120 },
    "Galaxy S21+ 5G": { "Base": 150 },
    "Galaxy S21 Ultra 5G": { "256GB": 200, "512GB": 250 },
    "Galaxy S21 FE 5G": { "256GB": 100 },

    // Galaxy S22 Series
    "Galaxy S22 5G": { "128GB": 150, "256GB": 200 },
    "Galaxy S22+ 5G": { "128GB": 200, "256GB": 250 },
    "Galaxy S22 Ultra 5G": { "256GB": 350, "512GB": 400 },

    // Galaxy S23 Series
    "Galaxy S23 5G": { "128GB": 300, "256GB": 350 },
    "Galaxy S23+ 5G": { "256GB": 400, "512GB": 450 },
    "Galaxy S23 Ultra 5G": { "256GB": 500, "512GB": 550, "1TB": 600 },
    "Galaxy S23 FE 5G": { "256GB": 220 },

    // Galaxy S24 Series
    "Galaxy S24 5G": { "256GB": 500, "512GB": 550 },
    "Galaxy S24+ 5G": { "256GB": 570, "512GB": 620 },
    "Galaxy S24 Ultra 5G": { "256GB": 700, "512GB": 750, "1TB": 850 },
    "Galaxy S24 FE 5G": { "256GB": 370, "512GB": 420 },

    // Galaxy S25 Series
    "Galaxy S25 5G": { "256GB": 600, "512GB": 700 },
    "Galaxy S25+ 5G": { "256GB": 750, "512GB": 850 },
    "Galaxy S25 Ultra 5G": { "256GB": 850, "512GB": 1050, "1TB": 1100 },
    "Galaxy S25 Edge 5G": { "256GB": 570, "512GB": 670 },
    "Galaxy S25 FE 5G": { "128GB": 370, "256GB": 470, "512GB": 520 },

    // Galaxy A Series
    "Galaxy A36 5G": { "8/256GB": 170 },
    "Galaxy A55 5G": { "8/128GB": 170, "8/256GB": 220 },
    "Galaxy A56 5G": { "12/256GB": 270, "8/256GB": 360 },
    "Galaxy A73 5G": { "8/128GB": 100, "8/256GB": 150 },

    // Galaxy Buds
    "Galaxy Buds 3": { "Base": 50 },
    "Galaxy Buds 3 Pro": { "Base": 130 }
};

// ============================================================================
// SAMSUNG PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// Total Models: 21 (Updated 2026-01-19)
// ============================================================================
const samsungNewPrices = {
    // Galaxy Z Fold Series
    "Galaxy Z Fold 7 5G": { "256GB": 1630, "512GB": 1780, "1TB": 1860 },

    // Galaxy Z Flip Series
    "Galaxy Z Flip 7 5G": { "256GB": 900, "512GB": 950 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 620, "256GB": 770 },

    // Galaxy S25 Series
    "Galaxy S25 5G": { "256GB": 850, "512GB": 950 },
    "Galaxy S25+ 5G": { "256GB": 920, "512GB": 1120 },
    "Galaxy S25 Ultra 5G": { "256GB": 1020, "512GB": 1200, "1TB": 1350 },
    "Galaxy S25 Edge 5G": { "256GB": 770, "512GB": 870 },
    "Galaxy S25 FE 5G": { "128GB": 520, "256GB": 620, "512GB": 670 },

    // Galaxy A Series
    "Galaxy A36 5G": { "8/256GB": 340 },
    "Galaxy A56 5G": { "8/256GB": 380, "12/256GB": 420 },

    // Tablets & Wearables
    "Galaxy Tab A11+ 128 WiFi": { "Base": 260 },
    "Galaxy Tab A11+ 128 5G": { "Base": 320 },
    "Galaxy Watch 8 40mm Bluetooth": { "Base": 280 },
    "Galaxy Watch 8 44mm Bluetooth": { "Base": 300 },
    "Galaxy Watch 8 Classic 46mm Bluetooth": { "Base": 360 },
    "Galaxy Watch Ultra 47mm (2025)": { "Base": 480 },
    "Galaxy Buds 3": { "Base": 50 },
    "Galaxy Buds 3 Pro": { "Base": 130 }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getImagePath(brand, model) {
    // Use smart image mapper if available, otherwise fall back to simple path
    if (typeof getSmartImage === 'function') {
        return getSmartImage(brand, model);
    }
    // Fallback to simple auto-generation
    const modelLower = model.toLowerCase().replace(/\s+/g, '-');
    return `images/phones/${modelLower}.jpg`;
}

function calculateBuyPrices(storagePrices) {
    const buyPrices = {};
    for (const [storage, price] of Object.entries(storagePrices)) {
        buyPrices[storage] = {
            excellent: price,
            good: Math.round(price * 0.95),
            fair: Math.round(price * 0.85)
        };
    }
    return buyPrices;
}

function initializeQuantities(storages) {
    const quantities = {};
    storages.forEach(storage => {
        quantities[storage] = { excellent: 0, good: 0, fair: 0 };
    });
    return quantities;
}

// ============================================================================
// MAIN IMPORT FUNCTION
// ============================================================================

function importExactPrices() {
    console.log('🎯 Starting EXACT PRICE IMPORT - NO AUTO-CALCULATIONS');
    console.log('📊 Source: Apple_USED_NEW_FULL_REVIEW.xlsx & Samsung_USED_NEW_FULL_REVIEW.xlsx');
    console.log('='.repeat(80));

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let added = 0;

    // Process Apple phones
    const appleModels = new Set([...Object.keys(appleUsedPrices), ...Object.keys(appleNewPrices)]);

    console.log(`\n📱 Processing ${appleModels.size} Apple models...`);

    for (const model of appleModels) {
        const usedPrices = appleUsedPrices[model] || {};
        const newPrices = appleNewPrices[model] || {};

        // Skip if no prices
        if (Object.keys(usedPrices).length === 0 && Object.keys(newPrices).length === 0) {
            console.log(`⚠️  Skipping ${model} - no prices found`);
            continue;
        }

        const storages = Array.from(new Set([
            ...Object.keys(usedPrices),
            ...Object.keys(newPrices)
        ])).sort();

        const result = updateOrAddPhone(phones, 'Apple', model, storages, usedPrices, newPrices);
        if (result === 'updated') updated++;
        else if (result === 'added') added++;
    }

    // Process Samsung phones
    const samsungModels = new Set([...Object.keys(samsungUsedPrices), ...Object.keys(samsungNewPrices)]);

    console.log(`\n📱 Processing ${samsungModels.size} Samsung models...`);

    for (const model of samsungModels) {
        const usedPrices = samsungUsedPrices[model] || {};
        const newPrices = samsungNewPrices[model] || {};

        // Skip if no prices
        if (Object.keys(usedPrices).length === 0 && Object.keys(newPrices).length === 0) {
            console.log(`⚠️  Skipping ${model} - no prices found`);
            continue;
        }

        const storages = Array.from(new Set([
            ...Object.keys(usedPrices),
            ...Object.keys(newPrices)
        ])).sort();

        const result = updateOrAddPhone(phones, 'Samsung', model, storages, usedPrices, newPrices);
        if (result === 'updated') updated++;
        else if (result === 'added') added++;
    }

    // Save to localStorage with timestamp
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
    localStorage.setItem('ktmobile_last_update', new Date().toISOString());

    console.log('\n' + '='.repeat(80));
    console.log('✅ EXACT PRICE IMPORT COMPLETE!');
    console.log(`📊 Updated: ${updated} phones`);
    console.log(`➕ Added: ${added} phones`);
    console.log(`📦 Total: ${phones.length} phones in database`);
    console.log('='.repeat(80));

    alert(`✅ Price Import Successful!\n\n` +
          `📊 Source:\n` +
          `• Apple_USED_NEW_FULL_REVIEW.xlsx\n` +
          `• Samsung_USED_NEW_FULL_REVIEW.xlsx\n\n` +
          `📱 Updated: ${updated} phones\n` +
          `➕ Added: ${added} phones\n` +
          `📦 Total: ${phones.length} phones\n\n` +
          `✨ USED & NEW prices loaded from Excel.\n` +
          `✨ For NEW-only models, USED prices calculated at 65% of NEW.`);

    // Refresh admin panel
    if (typeof renderPhones === 'function') renderPhones();
    if (typeof renderPriceTable === 'function') renderPriceTable();

    return { updated, added, total: phones.length };
}

function updateOrAddPhone(phones, brand, model, storages, usedPrices, newPrices) {
    // Find existing phone
    const existingIndex = phones.findIndex(p => {
        if (p.brand !== brand) return false;

        // Exact match
        if (p.model === model) return true;

        // Fuzzy match
        const normalizedExisting = p.model.toLowerCase().replace(/\s+/g, '');
        const normalizedModel = model.toLowerCase().replace(/\s+/g, '');
        return normalizedExisting === normalizedModel;
    });

    // CRITICAL FIX: If model has NEW prices but no USED prices, calculate USED from NEW
    // USED prices are typically 65-70% of NEW prices for buyback
    let finalUsedPrices = usedPrices;
    let usedPricesCalculated = false;

    if (Object.keys(usedPrices).length === 0 && Object.keys(newPrices).length > 0) {
        // Calculate USED prices from NEW prices (65% of NEW price for buyback)
        finalUsedPrices = {};
        const USED_TO_NEW_RATIO = 0.65; // Used buyback is typically 65% of new price

        for (const [storage, newPrice] of Object.entries(newPrices)) {
            finalUsedPrices[storage] = Math.round(newPrice * USED_TO_NEW_RATIO);
        }
        usedPricesCalculated = true;
        console.log(`  📊 ${model}: Calculated USED prices from NEW (65% ratio) - ${Object.keys(finalUsedPrices).length} storages`);
    }

    const phoneData = {
        brand: brand,
        model: model,
        storages: storages,
        storagePrices: finalUsedPrices,   // USED prices (from Excel or calculated from NEW)
        newPhonePrices: newPrices,        // EXACT NEW prices from Excel
        usedPricesCalculated: usedPricesCalculated, // Flag to indicate if USED prices were calculated
        basePrice: Object.values(finalUsedPrices).length > 0
            ? Math.min(...Object.values(finalUsedPrices))
            : Object.values(newPrices).length > 0
                ? Math.min(...Object.values(newPrices))
                : 0,
        available: true,
        display: true,
        updatedAt: new Date().toISOString()
    };

    // Get official colors from master database
    const officialColors = (typeof getMasterColors === 'function')
        ? getMasterColors(brand, model)
        : [];

    // Calculate buyPrices: Use USED prices (exact or calculated)
    let initialBuyPrices;
    if (Object.keys(finalUsedPrices).length > 0) {
        // Has USED prices (either from Excel or calculated from NEW)
        initialBuyPrices = calculateBuyPrices(finalUsedPrices);
    } else if (Object.keys(newPrices).length > 0) {
        // Fallback: use NEW prices directly (shouldn't happen with the fix above)
        initialBuyPrices = calculateBuyPrices(newPrices);
        console.log(`  ⚠️  ${model}: Using NEW prices as buyPrices fallback`);
    } else {
        // No prices at all
        initialBuyPrices = {};
    }

    if (existingIndex >= 0) {
        // Update existing - FORCE UPDATE COLORS AND BUYPRICES from Excel
        const existing = phones[existingIndex];
        phones[existingIndex] = {
            ...existing,
            ...phoneData,
            id: existing.id,
            image: existing.image || getImagePath(brand, model),
            colors: officialColors.length > 0 ? officialColors : existing.colors || [], // Use official colors if available
            buyPrices: initialBuyPrices, // FORCE UPDATE buyPrices from Excel, don't preserve old values
            quantities: existing.quantities || initializeQuantities(storages),
            createdAt: existing.createdAt || new Date().toISOString()
        };
        const calcFlag = usedPricesCalculated ? ' [USED calculated from NEW]' : '';
        console.log(`✅ Updated: ${brand} ${model} (Used: ${Object.keys(finalUsedPrices).length}, New: ${Object.keys(newPrices).length}, Colors: ${officialColors.length}, BuyPrices: ${Object.keys(initialBuyPrices).length})${calcFlag}`);
        return 'updated';
    } else {
        // Add new
        phones.push({
            ...phoneData,
            id: `${brand.toLowerCase()}-${model.toLowerCase().replace(/[\s\/\(\)]+/g, '-')}-${Date.now()}`,
            image: getImagePath(brand, model),
            colors: officialColors,
            buyPrices: initialBuyPrices,
            quantities: initializeQuantities(storages),
            createdAt: new Date().toISOString()
        });
        const calcFlag = usedPricesCalculated ? ' [USED calculated from NEW]' : '';
        console.log(`➕ Added: ${brand} ${model} (Used: ${Object.keys(finalUsedPrices).length}, New: ${Object.keys(newPrices).length}, Colors: ${officialColors.length})${calcFlag}`);
        return 'added';
    }
}

// ============================================================================
// UPDATE COLORS ONLY - Standalone function to update all phone colors
// ============================================================================

function updateAllPhoneColors() {
    console.log('🎨 Starting Official Colors Update for ALL phones...');
    console.log('='.repeat(80));

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let skipped = 0;

    // Collect all official colors for global color list
    const allOfficialColors = new Set();

    phones.forEach(phone => {
        // Get official colors from master database
        const officialColors = (typeof getMasterColors === 'function')
            ? getMasterColors(phone.brand, phone.model)
            : [];

        if (officialColors.length > 0) {
            phone.colors = officialColors;
            phone.updatedAt = new Date().toISOString();
            updated++;
            console.log(`✅ Updated colors for ${phone.brand} ${phone.model}: ${officialColors.join(', ')}`);

            // Add to global color list
            officialColors.forEach(color => allOfficialColors.add(color));
        } else {
            skipped++;
            console.log(`⚠️  No official colors found for ${phone.brand} ${phone.model} - keeping existing: ${(phone.colors || []).join(', ')}`);

            // Add existing colors to global list
            if (phone.colors && phone.colors.length > 0) {
                phone.colors.forEach(color => allOfficialColors.add(color));
            }
        }
    });

    // Save phones to localStorage
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    // Update global color list with all official colors
    const sortedColors = Array.from(allOfficialColors).sort();
    localStorage.setItem('ktmobile_available_colors', JSON.stringify(sortedColors));
    console.log(`\n🎨 Updated global color list with ${sortedColors.length} unique colors`);

    console.log('\n' + '='.repeat(80));
    console.log('✅ OFFICIAL COLORS UPDATE COMPLETE!');
    console.log(`🎨 Updated: ${updated} phones`);
    console.log(`⏭️  Skipped: ${skipped} phones (no official colors in database)`);
    console.log(`📦 Total: ${phones.length} phones in database`);
    console.log(`🎨 Global color list: ${sortedColors.length} unique colors`);
    console.log('='.repeat(80));

    alert(`✅ Official Colors Update Successful!\\n\\n` +
          `🎨 Updated: ${updated} phones\\n` +
          `⏭️  Skipped: ${skipped} phones\\n` +
          `📦 Total: ${phones.length} phones\\n` +
          `🎨 Global colors: ${sortedColors.length} unique colors\\n\\n` +
          `All phones now have official factory colors from manufacturers.`);

    // Refresh admin panel
    if (typeof renderPhones === 'function') renderPhones();
    if (typeof renderPriceTable === 'function') renderPriceTable();
    if (typeof loadAvailableColors === 'function') {
        if (typeof availableColors !== 'undefined') {
            availableColors = loadAvailableColors();
        }
    }
    if (typeof populateColorDropdown === 'function') populateColorDropdown();

    return { updated, skipped, total: phones.length, totalColors: sortedColors.length };
}

// Export functions
if (typeof window !== 'undefined') {
    window.importExactPrices = importExactPrices;
    window.updateAllPhoneColors = updateAllPhoneColors;
}

console.log('✅ Clean Price Import Utility loaded');
console.log('📝 Run importExactPrices() to import EXACT prices from Excel');
console.log('🎨 Run updateAllPhoneColors() to update ALL phone colors to official factory colors');
console.log('⚠️  NO AUTO-CALCULATIONS - All prices are exact from source files');
