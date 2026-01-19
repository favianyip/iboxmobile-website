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

    // =========================================================================
    // SYNC CONDITION MODIFIERS (deductions for body, screen, battery, etc.)
    // IMPORTANT: Only set defaults if no existing modifiers (preserve admin changes!)
    // =========================================================================
    const existingModifiers = localStorage.getItem('ktmobile_condition_modifiers');
    if (!existingModifiers) {
        const defaultConditionModifiers = {
            receipt: { yes: 30, no: 0 },
            country: { local: 0, export: -50 },
            deviceType: { 'new-sealed': 0, 'new-activated': -150 },
            body: { A: 0, B: -20, C: -60, D: -120 },
            screen: { A: 0, B: 0, C: -40, D: -150 },
            battery: { '91-100': 0, '86-90': -20, '81-85': -50, '80-below': -100 },
            issue: {
                power: -300,
                faceid: -150,
                display: -200,
                touch: -180,
                camera: -120,
                speaker: -80,
                wifi: -100,
                charging: -90
            },
            accessory: {
                cable: 10,
                box: 20
            }
        };
        localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(defaultConditionModifiers));
        console.log('✅ Condition modifiers initialized with defaults');
    } else {
        console.log('✅ Condition modifiers preserved (admin has custom settings)');
    }

    // =========================================================================
    // SYNC BRAND SETTINGS
    // IMPORTANT: Only set defaults if no existing settings (preserve admin changes!)
    // =========================================================================
    const existingBrandSettings = localStorage.getItem('ktmobile_brand_settings');
    if (!existingBrandSettings) {
        const defaultBrandSettings = {
            Apple: { enabled: true, displayOrder: 1 },
            Samsung: { enabled: true, displayOrder: 2 }
        };
        localStorage.setItem('ktmobile_brand_settings', JSON.stringify(defaultBrandSettings));
        console.log('✅ Brand settings initialized with defaults');
    } else {
        console.log('✅ Brand settings preserved (admin has custom settings)');
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ EXACT PRICE IMPORT COMPLETE!');
    console.log(`📊 Updated: ${updated} phones`);
    console.log(`➕ Added: ${added} phones`);
    console.log(`📦 Total: ${phones.length} phones in database`);
    console.log('='.repeat(80));

    alert(`✅ Full Data Sync Complete!\n\n` +
          `📊 Source:\n` +
          `• Apple_USED_NEW_FULL_REVIEW.xlsx\n` +
          `• Samsung_USED_NEW_FULL_REVIEW.xlsx\n\n` +
          `📱 Updated: ${updated} phones\n` +
          `➕ Added: ${added} phones\n` +
          `📦 Total: ${phones.length} phones\n\n` +
          `✅ Synced:\n` +
          `• Phone prices (USED & NEW)\n` +
          `• Storage options\n` +
          `• Condition modifiers (body/screen/battery)\n` +
          `• Brand settings`);

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

// ============================================================================
// SAVE ALL CONDITION MODIFIERS & SYNC TO ALL DEVICES
// ============================================================================
function saveAllConditionModifiersAndSync() {
    console.log('💾 Saving all condition modifiers...');

    // Collect all modifier values from the DOM
    const modifiers = {
        receipt: { yes: 30, no: 0 },
        country: { local: 0, export: -50 },
        deviceType: { 'new-sealed': 0, 'new-activated': -150 },
        body: {},
        screen: {},
        battery: {},
        issue: {},
        accessory: {}
    };

    // Get all modifier inputs
    const inputs = document.querySelectorAll('.modifier-input');
    inputs.forEach(input => {
        const condition = input.dataset.condition;
        const grade = input.dataset.grade;
        const value = parseInt(input.value) || 0;

        if (condition && grade) {
            if (!modifiers[condition]) modifiers[condition] = {};
            modifiers[condition][grade] = value;
        }
    });

    // Save to localStorage
    localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(modifiers));
    localStorage.setItem('ktmobile_last_modifier_update', new Date().toISOString());

    console.log('✅ Condition modifiers saved:', modifiers);

    alert('✅ All Condition Modifiers Saved & Synced!\n\n' +
          'Changes will automatically sync to:\n' +
          '• Desktop web version\n' +
          '• Mobile web version\n\n' +
          'Other devices will get updated data on next page load.');

    return modifiers;
}

// ============================================================================
// VERSION HISTORY SYSTEM
// ============================================================================
function saveCurrentVersion() {
    const versionName = prompt('Enter a name for this version (e.g., "Before price update"):',
                               'Backup ' + new Date().toLocaleString());
    if (!versionName) return;

    // Get all current data
    const versionData = {
        id: Date.now(),
        name: versionName,
        timestamp: new Date().toISOString(),
        data: {
            phones: JSON.parse(localStorage.getItem('ktmobile_phones') || '[]'),
            conditionModifiers: JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}'),
            brandSettings: JSON.parse(localStorage.getItem('ktmobile_brand_settings') || '{}')
        }
    };

    // Get existing versions
    const versions = JSON.parse(localStorage.getItem('ktmobile_version_history') || '[]');

    // Add new version at the beginning
    versions.unshift(versionData);

    // Keep only last 10 versions to save space
    if (versions.length > 10) {
        versions.pop();
    }

    // Save versions
    localStorage.setItem('ktmobile_version_history', JSON.stringify(versions));

    console.log('📸 Version saved:', versionName);
    alert('✅ Version Saved!\n\n' + versionName);

    // Refresh version list
    loadVersionHistory();
}

function loadVersionHistory() {
    const container = document.getElementById('versionHistoryList');
    if (!container) return;

    const versions = JSON.parse(localStorage.getItem('ktmobile_version_history') || '[]');

    if (versions.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No saved versions yet. Click "Save Current as New Version" to create one.</p>';
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';

    versions.forEach((version, index) => {
        const date = new Date(version.timestamp).toLocaleString();
        const phoneCount = version.data.phones ? version.data.phones.length : 0;

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: white; border-radius: 8px; border: 1px solid #ddd;">
                <div>
                    <strong style="color: #333;">${version.name}</strong>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #666;">
                        ${date} • ${phoneCount} phones
                    </p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-sm btn-primary" onclick="restoreVersion(${version.id})" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                        🔄 Restore
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVersion(${version.id})" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: #dc3545; border: none;">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function restoreVersion(versionId) {
    const versions = JSON.parse(localStorage.getItem('ktmobile_version_history') || '[]');
    const version = versions.find(v => v.id === versionId);

    if (!version) {
        alert('Version not found!');
        return;
    }

    if (!confirm(`Are you sure you want to restore "${version.name}"?\n\nThis will overwrite current data.`)) {
        return;
    }

    // Restore data
    if (version.data.phones) {
        localStorage.setItem('ktmobile_phones', JSON.stringify(version.data.phones));
    }
    if (version.data.conditionModifiers) {
        localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(version.data.conditionModifiers));
    }
    if (version.data.brandSettings) {
        localStorage.setItem('ktmobile_brand_settings', JSON.stringify(version.data.brandSettings));
    }
    localStorage.setItem('ktmobile_last_update', new Date().toISOString());

    console.log('🔄 Version restored:', version.name);
    alert('✅ Version Restored!\n\n' + version.name + '\n\nPage will reload to apply changes.');

    // Reload page to apply changes
    location.reload();
}

function deleteVersion(versionId) {
    if (!confirm('Delete this version? This cannot be undone.')) return;

    let versions = JSON.parse(localStorage.getItem('ktmobile_version_history') || '[]');
    versions = versions.filter(v => v.id !== versionId);
    localStorage.setItem('ktmobile_version_history', JSON.stringify(versions));

    loadVersionHistory();
}

// ============================================================================
// EXPORT ALL DATA TO EXCEL (CSV FORMAT)
// ============================================================================
function exportAllDataToExcel() {
    console.log('📊 Exporting all data to Excel...');

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    const modifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}');
    const brandSettings = JSON.parse(localStorage.getItem('ktmobile_brand_settings') || '{}');

    // Create CSV content for phones
    let phonesCSV = 'Brand,Model,Storage,USED Price,NEW Price,Colors,Available,Display\n';

    phones.forEach(phone => {
        const storages = phone.storages || Object.keys(phone.storagePrices || {});
        storages.forEach(storage => {
            const usedPrice = phone.storagePrices ? (phone.storagePrices[storage] || 0) : 0;
            const newPrice = phone.newPhonePrices ? (phone.newPhonePrices[storage] || 0) : 0;
            const colors = (phone.colors || []).join('; ');

            phonesCSV += `"${phone.brand}","${phone.model}","${storage}",${usedPrice},${newPrice},"${colors}",${phone.available !== false},${phone.display !== false}\n`;
        });
    });

    // Create CSV content for condition modifiers
    let modifiersCSV = '\n\n=== CONDITION MODIFIERS ===\n';
    modifiersCSV += 'Category,Grade/Type,Value (SGD)\n';

    Object.entries(modifiers).forEach(([category, grades]) => {
        Object.entries(grades).forEach(([grade, value]) => {
            modifiersCSV += `"${category}","${grade}",${value}\n`;
        });
    });

    // Create CSV content for brand settings
    let settingsCSV = '\n\n=== BRAND SETTINGS ===\n';
    settingsCSV += 'Brand,Enabled,Display Order\n';

    Object.entries(brandSettings).forEach(([brand, settings]) => {
        settingsCSV += `"${brand}",${settings.enabled !== false},${settings.displayOrder || 0}\n`;
    });

    // Combine all CSV content
    const fullCSV = phonesCSV + modifiersCSV + settingsCSV;

    // Create and download file
    const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `ibox_mobile_backup_${dateStr}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ Export complete!');
    alert('✅ Export Complete!\n\n' +
          'Downloaded: ibox_mobile_backup_' + dateStr + '.csv\n\n' +
          'Contains:\n' +
          '• ' + phones.length + ' phone models with prices\n' +
          '• Condition modifiers\n' +
          '• Brand settings');
}

// ============================================================================
// CROSS-DEVICE SYNC - Export/Import Settings as JSON
// This allows admin to sync settings between different devices
// ============================================================================

/**
 * Export all settings to a JSON file for cross-device sync
 * Admin can download this from one device and import on another
 */
function exportSettingsForSync() {
    console.log('📤 Exporting settings for cross-device sync...');

    const syncData = {
        exportDate: new Date().toISOString(),
        exportDevice: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
        version: '2.0',
        data: {
            conditionModifiers: JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}'),
            brandSettings: JSON.parse(localStorage.getItem('ktmobile_brand_settings') || '{}'),
            phones: JSON.parse(localStorage.getItem('ktmobile_phones') || '[]')
        }
    };

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(syncData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `ibox_sync_${dateStr}.json`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ Settings exported for sync');
    alert('✅ Settings Exported!\n\n' +
          'Downloaded: ' + filename + '\n\n' +
          '📱 To sync to another device:\n' +
          '1. Transfer this file to the other device\n' +
          '2. Open Admin Panel on that device\n' +
          '3. Click "Import Settings" and select this file\n\n' +
          'This will sync:\n' +
          '• Condition modifiers\n' +
          '• Brand settings\n' +
          '• All phone prices');
}

/**
 * Import settings from a JSON file for cross-device sync
 * Admin can upload a file exported from another device
 */
function importSettingsForSync() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const syncData = JSON.parse(event.target.result);

                // Validate format
                if (!syncData.data || !syncData.version) {
                    throw new Error('Invalid sync file format');
                }

                // Confirm import
                const exportDate = new Date(syncData.exportDate).toLocaleString();
                const exportDevice = syncData.exportDevice || 'Unknown';

                if (!confirm(`Import settings from:\n\n` +
                            `📅 Exported: ${exportDate}\n` +
                            `📱 Device: ${exportDevice}\n\n` +
                            `This will overwrite your current settings.\n` +
                            `Continue?`)) {
                    return;
                }

                // Import data
                if (syncData.data.conditionModifiers) {
                    localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(syncData.data.conditionModifiers));
                    console.log('✅ Condition modifiers imported');
                }

                if (syncData.data.brandSettings) {
                    localStorage.setItem('ktmobile_brand_settings', JSON.stringify(syncData.data.brandSettings));
                    console.log('✅ Brand settings imported');
                }

                if (syncData.data.phones && syncData.data.phones.length > 0) {
                    localStorage.setItem('ktmobile_phones', JSON.stringify(syncData.data.phones));
                    console.log('✅ Phone data imported: ' + syncData.data.phones.length + ' phones');
                }

                localStorage.setItem('ktmobile_last_sync', new Date().toISOString());
                localStorage.setItem('ktmobile_last_sync_source', exportDevice);

                alert('✅ Settings Imported Successfully!\n\n' +
                      'Imported from: ' + exportDevice + '\n\n' +
                      '• Condition modifiers: ✅\n' +
                      '• Brand settings: ✅\n' +
                      '• Phones: ' + (syncData.data.phones ? syncData.data.phones.length : 0) + '\n\n' +
                      'Page will reload to apply changes.');

                location.reload();

            } catch (error) {
                console.error('Import error:', error);
                alert('❌ Import Failed!\n\n' + error.message + '\n\nMake sure you selected a valid sync file.');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

/**
 * Update the default condition modifiers in memory (for this session)
 * These will be used when new devices first load the page
 */
function publishConditionModifiersAsDefault() {
    const currentModifiers = localStorage.getItem('ktmobile_condition_modifiers');
    if (!currentModifiers) {
        alert('No condition modifiers found to publish!');
        return;
    }

    const modifiers = JSON.parse(currentModifiers);

    // Show the user what they need to update in import-exact-prices.js
    const codeSnippet = `const defaultConditionModifiers = ${JSON.stringify(modifiers, null, 4)};`;

    console.log('📋 To make your condition modifiers the new default for all devices:');
    console.log(codeSnippet);

    // Copy to clipboard if possible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(codeSnippet).then(() => {
            alert('✅ Condition Modifiers Code Copied!\n\n' +
                  'To make these the DEFAULT for all devices:\n\n' +
                  '1. Open import-exact-prices.js\n' +
                  '2. Find "defaultConditionModifiers"\n' +
                  '3. Replace with the copied code\n' +
                  '4. Save and deploy\n\n' +
                  '(Code has been copied to clipboard)');
        }).catch(() => {
            alert('📋 Check browser console for the code to update default modifiers.');
        });
    } else {
        alert('📋 Check browser console for the code to update default modifiers.\n\n' +
              'Copy the code and update import-exact-prices.js to make these the new defaults.');
    }
}

// Initialize version history on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(loadVersionHistory, 500);
    });
}

// Export functions
if (typeof window !== 'undefined') {
    window.importExactPrices = importExactPrices;
    window.updateAllPhoneColors = updateAllPhoneColors;
    window.saveAllConditionModifiersAndSync = saveAllConditionModifiersAndSync;
    window.saveCurrentVersion = saveCurrentVersion;
    window.loadVersionHistory = loadVersionHistory;
    window.restoreVersion = restoreVersion;
    window.deleteVersion = deleteVersion;
    window.exportAllDataToExcel = exportAllDataToExcel;
    // Cross-device sync functions
    window.exportSettingsForSync = exportSettingsForSync;
    window.importSettingsForSync = importSettingsForSync;
    window.publishConditionModifiersAsDefault = publishConditionModifiersAsDefault;
}

console.log('✅ Clean Price Import Utility loaded');
console.log('📝 Run importExactPrices() to import EXACT prices from Excel');
console.log('🎨 Run updateAllPhoneColors() to update ALL phone colors to official factory colors');
console.log('📤 Run exportSettingsForSync() to export settings for another device');
console.log('📥 Run importSettingsForSync() to import settings from another device');
console.log('⚠️  NO AUTO-CALCULATIONS - All prices are exact from source files');
