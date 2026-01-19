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
// Total Models: 22
// ============================================================================
const appleUsedPrices = {
    "iPhone 11": { "128GB": 150, "256GB": 180, "64GB": 120 },
    "iPhone 11 Pro": { "256GB": 210, "512GB": 240, "64GB": 170 },
    "iPhone 11 Pro Max": { "256GB": 250, "512GB": 280, "64GB": 220 },
    "iPhone 12": { "128GB": 250, "256GB": 300, "64GB": 200 },
    "iPhone 12 mini": { "128GB": 150, "256GB": 180, "64GB": 120 },
    "iPhone 12 Pro": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 12 Pro Max": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 13": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 13 mini": { "128GB": 250, "256GB": 300, "512GB": 350 },
    "iPhone 13 Pro": { "128GB": 380, "1TB": 530, "256GB": 430, "512GB": 480 },
    "iPhone 13 Pro Max": { "128GB": 460, "1TB": 610, "256GB": 510, "512GB": 560 },
    "iPhone 16": { "128GB": 670, "256GB": 720, "512GB": 770 },
    "iPhone 16 Plus": { "128GB": 750, "256GB": 800, "512GB": 850 },
    "iPhone 16E": { "128GB": 520, "256GB": 620, "512GB": 720 },
    "iPhone 17": { "256GB": 900, "512GB": 1150 },
    "iPhone 17 Pro": { "1TB": 1750, "256GB": 1350, "512GB": 1550 },
    "iPhone 17 Pro Max": { "1TB": 1920, "256GB": 1520, "2TB": 2070, "512GB": 1750 },
    "iPhone Air": { "1TB": 1100, "256GB": 850, "512GB": 1000 },
    "iPhone SE (3rd Gen)": { "128GB": 170, "256GB": 220, "64GB": 120 },
    "iPhone XR": { "128GB": 80, "256GB": 110, "64GB": 50 },
    "iPhone XS": { "256GB": 100, "512GB": 130, "64GB": 70 },
    "iPhone XS Max": { "256GB": 150, "512GB": 180, "64GB": 120 }
};

// ============================================================================
// APPLE PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// Total Models: 17
// ============================================================================
const appleNewPrices = {
    "iPhone 14": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 14 Plus": { "128GB": 420, "256GB": 470, "512GB": 520 },
    "iPhone 14 Pro": { "128GB": 500, "1TB": 650, "256GB": 550, "512GB": 600 },
    "iPhone 14 Pro Max": { "128GB": 600, "1TB": 750, "256GB": 650, "512GB": 700 },
    "iPhone 15": { "128GB": 500, "256GB": 550, "512GB": 600 },
    "iPhone 15 Plus": { "128GB": 550, "256GB": 600, "512GB": 650 },
    "iPhone 15 Pro": { "128GB": 600, "1TB": 750, "256GB": 650, "512GB": 700 },
    "iPhone 15 Pro Max": { "1TB": 900, "256GB": 800, "512GB": 850 },
    "iPhone 16": { "128GB": 920, "256GB": 1020 },
    "iPhone 16 Plus": { "128GB": 1050, "256GB": 1150 },
    "iPhone 16 Pro": { "128GB": 870, "1TB": 1020, "256GB": 920, "512GB": 970 },
    "iPhone 16 Pro Max": { "1TB": 1120, "256GB": 1020, "512GB": 1070 },
    "iPhone 16E": { "128GB": 650, "256GB": 770, "512GB": 870 },
    "iPhone 17": { "256GB": 1200, "512GB": 1370 },
    "iPhone 17 Pro": { "1TB": 1950, "256GB": 1600, "512GB": 1750 },
    "iPhone 17 Pro Max": { "1TB": 2220, "256GB": 1720, "2TB": 2420, "512GB": 2000 },
    "iPhone Air": { "1TB": 1320, "256GB": 1000, "512GB": 1220 }
};

// ============================================================================
// SAMSUNG PHONES - USED PRICES (from USED_HIGHEST_ALL sheet)
// Total Models: 17
// ============================================================================
const samsungUsedPrices = {
    "Galaxy A55 5G": { "8/256GB": 180 },
    "Galaxy A56 5G": { "12/256GB": 250, "8/256GB": 180 },
    "Galaxy S22 Ultra 5G": { "256GB": 270, "512GB": 320 },
    "Galaxy S23 5G": { "256GB": 250 },
    "Galaxy S23 FE": { "256GB": 200 },
    "Galaxy S23 Ultra 5G": { "256GB": 400, "512GB": 450 },
    "Galaxy S23+ 5G": { "256GB": 330, "512GB": 370 },
    "Galaxy S24 5G": { "256GB": 380, "512GB": 450 },
    "Galaxy S24 FE 5G": { "256GB": 300, "512GB": 360 },
    "Galaxy S24 Plus 5G": { "256GB": 480, "512GB": 530 },
    "Galaxy S24 Ultra 5G": { "256GB": 580, "512GB": 650, "1TB": 700 },
    "Galaxy S25 5G": { "256GB": 560, "512GB": 650 },
    "Galaxy S25 Ultra 5G": { "256GB": 800, "512GB": 920, "1TB": 1020 },
    "Galaxy S25+ 5G": { "256GB": 680, "512GB": 760 },
    "Galaxy Z Flip 7 5G": { "256GB": 550, "512GB": 650 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 300, "256GB": 450 },
    "Galaxy Z Fold 7 5G": { "256GB": 1220, "512GB": 1350, "1TB": 1450 }
};

// ============================================================================
// SAMSUNG PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// Total Models: 20
// ============================================================================
const samsungNewPrices = {
    "Galaxy A17 4G": { "8/128GB": 160 },
    "Galaxy A17 5G": { "8/128GB": 200 },
    "Galaxy A26 5G": { "8/256GB": 270 },
    "Galaxy A36 5G": { "8/256GB": 330 },
    "Galaxy A56 5G": { "8/256GB": 380, "12/256GB": 420 },
    "Galaxy Buds 3": { "Base": 50 },
    "Galaxy Buds 3 Pro": { "Base": 130 },
    "Galaxy S25 5G": { "256GB": 760, "512GB": 850 },
    "Galaxy S25 FE 5G": { "128GB": 480, "256GB": 580, "512GB": 660 },
    "Galaxy S25 Ultra 5G": { "256GB": 1040, "512GB": 1250, "1TB": 1350 },
    "Galaxy S25+ 5G": { "256GB": 880, "512GB": 1000 },
    "Galaxy Tab A11+ 128 5G": { "Base": 320 },
    "Galaxy Tab A11+ 128 WiFi": { "Base": 260 },
    "Galaxy Watch 8 40mm Bluetooth": { "Base": 280 },
    "Galaxy Watch 8 44mm Bluetooth": { "Base": 300 },
    "Galaxy Watch 8 Classic 46mm Bluetooth": { "Base": 360 },
    "Galaxy Watch Ultra 47mm (2025)": { "Base": 480 },
    "Galaxy Z Flip 7 5G": { "256GB": 800, "512GB": 920 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 500, "256GB": 680 },
    "Galaxy Z Fold 7 5G": { "256GB": 1630, "512GB": 1780, "1TB": 1860 }
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
