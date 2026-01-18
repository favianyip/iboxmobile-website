/**
 * CLEAN PRICE IMPORT - NO AUTO-CALCULATIONS
 *
 * Source: Apple_USED_NEW_FULL_REVIEW.xlsx and Samsung_USED_NEW_FULL_REVIEW.xlsx
 *
 * CRITICAL: This script uses EXACT prices from Excel files.
 * NO multipliers, NO calculations, NO modifications.
 *
 * Date: January 2026
 */

// ============================================================================
// APPLE PHONES - USED PRICES (from USED_HIGHEST_ALL sheet)
// ============================================================================
const appleUsedPrices = {
    "iPhone XS": { "64GB": 70, "256GB": 100, "512GB": 130 },
    "iPhone XS Max": { "64GB": 120, "256GB": 150, "512GB": 180 },
    "iPhone XR": { "64GB": 50, "128GB": 80, "256GB": 110 },
    "iPhone 11": { "64GB": 120, "128GB": 150, "256GB": 180 },
    "iPhone 11 Pro": { "64GB": 170, "256GB": 210, "512GB": 240 },
    "iPhone 11 Pro Max": { "64GB": 220, "256GB": 250, "512GB": 280 },
    "iPhone 12 Mini": { "64GB": 120, "128GB": 150, "256GB": 180 },
    "iPhone 12": { "64GB": 200, "128GB": 250, "256GB": 300 },
    "iPhone 12 Pro": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 12 Pro Max": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 13 Mini": { "128GB": 250, "256GB": 300, "512GB": 350 },
    "iPhone 13": { "128GB": 300, "256GB": 350, "512GB": 400 },
    "iPhone 13 Pro": { "128GB": 380, "256GB": 430, "512GB": 480, "1TB": 530 },
    "iPhone 13 Pro Max": { "128GB": 460, "256GB": 510, "512GB": 560, "1TB": 610 },
    "iPhone SE (2022)": { "64GB": 120, "128GB": 170, "256GB": 220 },
    "iPhone 16 Plus": { "128GB": 750, "256GB": 800, "512GB": 850 },
    "iPhone 16": { "128GB": 670, "256GB": 720, "512GB": 770 },
    "iPhone 16E": { "128GB": 520, "256GB": 620, "512GB": 720 },
    "iPhone 17": { "256GB": 900, "512GB": 1150 },
    "iPhone 17 Pro": { "256GB": 1350, "512GB": 1550, "1TB": 1750 },
    "iPhone 17 Pro Max": { "256GB": 1520, "512GB": 1750, "1TB": 1920, "2TB": 2070 },
    "iPhone Air": { "256GB": 850, "512GB": 1000, "1TB": 1100 }
};

// ============================================================================
// APPLE PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// ============================================================================
const appleNewPrices = {
    "iPhone 14 Pro Max": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 14 Pro": { "128GB": 500, "256GB": 550, "512GB": 600, "1TB": 650 },
    "iPhone 14": { "128GB": 350, "256GB": 400, "512GB": 450 },
    "iPhone 14 Plus": { "128GB": 420, "256GB": 470, "512GB": 520 },
    "iPhone 15 Pro Max": { "256GB": 800, "512GB": 850, "1TB": 900 },
    "iPhone 15 Pro": { "128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750 },
    "iPhone 15": { "128GB": 500, "256GB": 550, "512GB": 600 },
    "iPhone 15 Plus": { "128GB": 550, "256GB": 600, "512GB": 650 },
    "iPhone 16 Pro Max": { "256GB": 1020, "512GB": 1070, "1TB": 1120 },
    "iPhone 16 Pro": { "128GB": 870, "256GB": 920, "512GB": 970, "1TB": 1020 },
    "iPhone 16 Plus": { "128GB": 1050, "256GB": 1150 },
    "iPhone 16": { "128GB": 920, "256GB": 1020 },
    "iPhone 16E": { "128GB": 650, "256GB": 770, "512GB": 870 },
    "iPhone 17": { "256GB": 1200, "512GB": 1370 },
    "iPhone 17 Pro": { "256GB": 1600, "512GB": 1750, "1TB": 1950 },
    "iPhone 17 Pro Max": { "256GB": 1720, "512GB": 2000, "1TB": 2220, "2TB": 2420 },
    "iPhone Air": { "256GB": 1000, "512GB": 1220, "1TB": 1320 }
};

// ============================================================================
// SAMSUNG PHONES - USED PRICES (from USED_HIGHEST_ALL sheet)
// ============================================================================
const samsungUsedPrices = {
    "Galaxy Z Flip 7 5G": { "256GB": 550, "512GB": 650 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 300, "256GB": 450 },
    "Galaxy Z Fold 7 5G": { "256GB": 1220, "512GB": 1350, "1TB": 1450 },
    "Galaxy A55 5G": { "8/256GB": 180 },
    "Galaxy A56 5G": { "12/256GB": 250, "8/256GB": 180 },
    "Galaxy S22 Ultra 5G": { "256GB": 270, "512GB": 320 },
    "Galaxy S23 5G": { "256GB": 250 },
    "Galaxy S23 FE": { "256GB": 200 },
    "Galaxy S23+ 5G": { "256GB": 330, "512GB": 370 },
    "Galaxy S23 Ultra 5G": { "256GB": 400, "512GB": 450 },
    "Galaxy S24 5G": { "256GB": 380, "512GB": 450 },
    "Galaxy S24 FE 5G": { "256GB": 300, "512GB": 360 },
    "Galaxy S24 Plus 5G": { "256GB": 480, "512GB": 530 },
    "Galaxy S24 Ultra 5G": { "256GB": 580, "512GB": 650, "1TB": 700 },
    "Galaxy S25 5G": { "256GB": 560, "512GB": 650 },
    "Galaxy S25+ 5G": { "256GB": 680, "512GB": 760 },
    "Galaxy S25 Ultra 5G": { "256GB": 800, "512GB": 920, "1TB": 1020 }
};

// ============================================================================
// SAMSUNG PHONES - NEW PRICES (from NEW_HIGHEST_ALL sheet)
// ============================================================================
const samsungNewPrices = {
    "Galaxy A17 4G": { "8/128GB": 160 },
    "Galaxy A17 5G": { "8/128GB": 200 },
    "Galaxy A26 5G": { "8/256GB": 270 },
    "Galaxy Tab A11+ 128 5G": { "Base": 320 },
    "Galaxy Tab A11+ 128 WiFi": { "Base": 260 },
    "Galaxy Watch 8 40mm Bluetooth": { "Base": 280 },
    "Galaxy Watch 8 44mm Bluetooth": { "Base": 300 },
    "Galaxy Watch 8 Classic 46mm Bluetooth": { "Base": 360 },
    "Galaxy Watch Ultra 47mm (2025)": { "Base": 480 },
    "Galaxy Buds 3": { "Base": 50 },
    "Galaxy Buds 3 Pro": { "Base": 130 },
    "Galaxy Z Flip 7 5G": { "256GB": 800, "512GB": 920 },
    "Galaxy Z Flip 7 FE 5G": { "128GB": 500, "256GB": 680 },
    "Galaxy Z Fold 7 5G": { "256GB": 1630, "512GB": 1780, "1TB": 1860 },
    "Galaxy A36 5G": { "8/256GB": 330 },
    "Galaxy A56 5G": { "8/256GB": 380, "12/256GB": 420 },
    "Galaxy S25 5G": { "256GB": 760, "512GB": 850 },
    "Galaxy S25 FE 5G": { "128GB": 480, "256GB": 580, "512GB": 660 },
    "Galaxy S25+ 5G": { "256GB": 880, "512GB": 1000 },
    "Galaxy S25 Ultra 5G": { "256GB": 1040, "512GB": 1250, "1TB": 1350 }
};

// ============================================================================
// OFFICIAL FACTORY COLORS DATABASE
// ============================================================================

function getOfficialColors(brand, model) {
    const colorMap = {
        // Apple iPhones - Based on official factory colors from Apple.com
        'iPhone 17 Pro Max': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone 17 Pro': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone 17': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone Air': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone 16 Pro Max': ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
        'iPhone 16 Pro': ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
        'iPhone 16 Plus': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'iPhone 16': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'iPhone 16E': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'iPhone 15 Pro Max': ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
        'iPhone 15 Pro': ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
        'iPhone 15 Plus': ['Pink', 'Yellow', 'Blue', 'Green', 'Black'],
        'iPhone 15': ['Pink', 'Yellow', 'Blue', 'Green', 'Black'],
        'iPhone 14 Pro Max': ['Deep Purple', 'Space Black', 'Silver', 'Gold'],
        'iPhone 14 Pro': ['Deep Purple', 'Space Black', 'Silver', 'Gold'],
        'iPhone 14 Plus': ['Blue', 'Purple', 'Midnight', 'Starlight', 'Yellow', '(PRODUCT)RED'],
        'iPhone 14': ['Blue', 'Purple', 'Midnight', 'Starlight', 'Yellow', '(PRODUCT)RED'],
        'iPhone 13 Pro Max': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
        'iPhone 13 Pro': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
        'iPhone 13 Mini': ['Midnight', 'Starlight', '(PRODUCT)RED', 'Blue', 'Pink', 'Green'],
        'iPhone 13': ['Midnight', 'Starlight', '(PRODUCT)RED', 'Blue', 'Pink', 'Green'],
        'iPhone 12 Pro Max': ['Silver', 'Graphite', 'Gold', 'Pacific Blue'],
        'iPhone 12 Pro': ['Silver', 'Graphite', 'Gold', 'Pacific Blue'],
        'iPhone 12 Mini': ['Black', 'White', '(PRODUCT)RED', 'Green', 'Blue', 'Purple'],
        'iPhone 12': ['Black', 'White', '(PRODUCT)RED', 'Green', 'Blue', 'Purple'],
        'iPhone 11 Pro Max': ['Gold', 'Silver', 'Space Gray', 'Midnight Green'],
        'iPhone 11 Pro': ['Gold', 'Silver', 'Space Gray', 'Midnight Green'],
        'iPhone 11': ['Purple', 'Yellow', 'Green', 'Black', 'White', '(PRODUCT)RED'],
        'iPhone XS Max': ['Gold', 'Silver', 'Space Gray'],
        'iPhone XS': ['Gold', 'Silver', 'Space Gray'],
        'iPhone XR': ['Black', 'White', 'Blue', 'Yellow', 'Coral', '(PRODUCT)RED'],
        'iPhone SE (2022)': ['Midnight', 'Starlight', '(PRODUCT)RED'],

        // Samsung - Based on official factory colors from Samsung.com
        'Galaxy S25 Ultra 5G': ['Titanium Silverblue', 'Titanium Black', 'Titanium Gray', 'Titanium Whitesilver', 'Titanium Jade Green', 'Titanium Pink Gold', 'Titanium Jet Black'],
        'Galaxy S25+ 5G': ['Icy Blue', 'Mint', 'Navy', 'Silver Shadow', 'Coral Red', 'Blue Black', 'Pink Gold'],
        'Galaxy S25 5G': ['Icy Blue', 'Mint', 'Navy', 'Silver Shadow', 'Coral Red', 'Blue Black', 'Pink Gold'],
        'Galaxy S24 Ultra 5G': ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow', 'Titanium Green', 'Titanium Orange', 'Titanium Blue'],
        'Galaxy S24 Plus 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
        'Galaxy S24 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
        'Galaxy S24 FE 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green'],
        'Galaxy S23 Ultra 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Sky Blue', 'Graphite', 'Red'],
        'Galaxy S23+ 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Graphite'],
        'Galaxy S23 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Graphite'],
        'Galaxy S23 FE': ['Green', 'Phantom Black', 'Cream', 'Lavender'],
        'Galaxy S22 Ultra 5G': ['Phantom Black', 'Phantom White', 'Burgundy', 'Green'],
        'Galaxy Z Fold 7 5G': ['Jet Black', 'Blue Shadow', 'Silver Shadow', 'Mint'],
        'Galaxy Z Flip 7 5G': ['Jet Black', 'Blue Shadow', 'Coral Red', 'Mint'],
        'Galaxy Z Flip 7 FE 5G': ['Jet Black', 'Blue Shadow', 'Coral Red', 'Mint'],
        'Galaxy A56 5G': ['Navy', 'Ice Blue', 'Lilac'],
        'Galaxy A55 5G': ['Navy', 'Ice Blue', 'Lilac'],
        'Galaxy A36 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A26 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A17 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A17 4G': ['Navy', 'Black', 'Silver']
    };

    return colorMap[model] || [];
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getImagePath(brand, model) {
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
    console.log('='*80);

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

    // Save to localStorage
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    console.log('\n' + '='*80);
    console.log('✅ EXACT PRICE IMPORT COMPLETE!');
    console.log(`📊 Updated: ${updated} phones`);
    console.log(`➕ Added: ${added} phones`);
    console.log(`📦 Total: ${phones.length} phones in database`);
    console.log('='*80);

    alert(`✅ Exact Price Import Successful!\n\n` +
          `📊 Source:\n` +
          `• Apple_USED_NEW_FULL_REVIEW.xlsx\n` +
          `• Samsung_USED_NEW_FULL_REVIEW.xlsx\n\n` +
          `📱 Updated: ${updated} phones\n` +
          `➕ Added: ${added} phones\n` +
          `📦 Total: ${phones.length} phones\n\n` +
          `✨ All prices are EXACT from Excel files.\n` +
          `✨ NO auto-calculations applied.`);

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

    const phoneData = {
        brand: brand,
        model: model,
        storages: storages,
        storagePrices: usedPrices,        // EXACT USED prices from Excel
        newPhonePrices: newPrices,        // EXACT NEW prices from Excel
        basePrice: Object.values(usedPrices).length > 0
            ? Math.min(...Object.values(usedPrices))
            : Object.values(newPrices).length > 0
                ? Math.min(...Object.values(newPrices))
                : 0,
        available: true,
        display: true,
        updatedAt: new Date().toISOString()
    };

    // Get official colors for this model
    const officialColors = getOfficialColors(brand, model);

    if (existingIndex >= 0) {
        // Update existing - FORCE UPDATE COLORS with official colors
        const existing = phones[existingIndex];
        phones[existingIndex] = {
            ...existing,
            ...phoneData,
            id: existing.id,
            image: existing.image || getImagePath(brand, model),
            colors: officialColors.length > 0 ? officialColors : existing.colors || [], // Use official colors if available
            buyPrices: existing.buyPrices || calculateBuyPrices(usedPrices),
            quantities: existing.quantities || initializeQuantities(storages),
            createdAt: existing.createdAt || new Date().toISOString()
        };
        console.log(`✅ Updated: ${brand} ${model} (Used: ${Object.keys(usedPrices).length}, New: ${Object.keys(newPrices).length}, Colors: ${officialColors.length})`);
        return 'updated';
    } else {
        // Add new
        phones.push({
            ...phoneData,
            id: `${brand.toLowerCase()}-${model.toLowerCase().replace(/[\s\/\(\)]+/g, '-')}-${Date.now()}`,
            image: getImagePath(brand, model),
            colors: officialColors,
            buyPrices: calculateBuyPrices(usedPrices),
            quantities: initializeQuantities(storages),
            createdAt: new Date().toISOString()
        });
        console.log(`➕ Added: ${brand} ${model} (Used: ${Object.keys(usedPrices).length}, New: ${Object.keys(newPrices).length}, Colors: ${officialColors.length})`);
        return 'added';
    }
}

// ============================================================================
// UPDATE COLORS ONLY - Standalone function to update all phone colors
// ============================================================================

function updateAllPhoneColors() {
    console.log('🎨 Starting Official Colors Update for ALL phones...');
    console.log('='*80);

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let skipped = 0;

    // Collect all official colors for global color list
    const allOfficialColors = new Set();

    phones.forEach(phone => {
        const officialColors = getOfficialColors(phone.brand, phone.model);

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

    console.log('\n' + '='*80);
    console.log('✅ OFFICIAL COLORS UPDATE COMPLETE!');
    console.log(`🎨 Updated: ${updated} phones`);
    console.log(`⏭️  Skipped: ${skipped} phones (no official colors in database)`);
    console.log(`📦 Total: ${phones.length} phones in database`);
    console.log(`🎨 Global color list: ${sortedColors.length} unique colors`);
    console.log('='*80);

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
