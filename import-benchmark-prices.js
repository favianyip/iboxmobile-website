/**
 * iPhone Benchmark Price Import Utility
 * Reads from iPhone_Benchmark_Price_List.xlsx
 * Updates database with exact benchmark prices for NEW and USED phones
 *
 * Data Source: iPhone_Benchmark_Price_List.xlsx
 * - Sheet 1: NEW_SET (new/sealed phone prices)
 * - Sheet 2: USED_SET (used phone prices)
 *
 * Date: January 2026
 */

/**
 * Benchmark Prices from Excel - NEW_SET Sheet
 * These are prices for NEW/SEALED/UNACTIVATED phones
 */
const benchmarkNewPrices = {
    "iPhone 16 Plus": {
        "128GB": 1050,
        "256GB": 1150,
        "512GB": 1350
    },
    "iPhone 16": {
        "128GB": 920,
        "256GB": 1020,
        "512GB": 1120
    },
    "iPhone 16E": {
        "128GB": 650,
        "256GB": 770,
        "512GB": 870
    },
    "iPhone 17": {
        "256GB": 1200,
        "512GB": 1370
    },
    "iPhone 17 Pro": {
        "256GB": 1600,
        "512GB": 1750,
        "1TB": 1950
    },
    "iPhone 17 Pro Max": {
        "256GB": 1720,
        "512GB": 2000,
        "1TB": 2220,
        "2TB": 2420
    },
    "iPhone Air": {
        "256GB": 1000,
        "512GB": 1220,
        "1TB": 1320
    }
};

/**
 * Benchmark Prices from Excel - USED_SET Sheet
 * These are prices for USED/PRE-OWNED phones
 */
const benchmarkUsedPrices = {
    "iPhone 16 Plus": {
        "128GB": 750,
        "256GB": 800,
        "512GB": 850
    },
    "iPhone 16": {
        "128GB": 670,
        "256GB": 720,
        "512GB": 770
    },
    "iPhone 16E": {
        "128GB": 520,
        "256GB": 620,
        "512GB": 720
    },
    "iPhone 17": {
        "256GB": 900,
        "512GB": 1150
    },
    "iPhone 17 Pro": {
        "256GB": 1350,
        "512GB": 1550,
        "1TB": 1750
    },
    "iPhone 17 Pro Max": {
        "256GB": 1520,
        "512GB": 1750,
        "1TB": 1920,
        "2TB": 2070
    },
    "iPhone Air": {
        "256GB": 850,
        "512GB": 1000,
        "1TB": 1100
    }
};

/**
 * Helper function to get default image path
 */
function getImagePath(brand, model) {
    const modelLower = model.toLowerCase().replace(/\s+/g, '-');
    return `images/phones/${modelLower}.jpg`;
}

/**
 * Helper function to calculate buy prices for refurbished sales
 */
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

/**
 * Helper function to initialize quantities
 */
function initializeQuantities(storages) {
    const quantities = {};
    storages.forEach(storage => {
        quantities[storage] = {
            excellent: 0,
            good: 0,
            fair: 0
        };
    });
    return quantities;
}

/**
 * Main import function - Imports benchmark prices from Excel data
 */
function importBenchmarkPrices() {
    console.log('🚀 Starting Benchmark Price Import...');
    console.log('📊 Source: iPhone_Benchmark_Price_List.xlsx');

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let added = 0;

    // Get all models from benchmark data
    const allModels = Object.keys(benchmarkUsedPrices);

    console.log(`📱 Processing ${allModels.length} iPhone models...`);

    for (const model of allModels) {
        const usedPrices = benchmarkUsedPrices[model] || {};
        const newPrices = benchmarkNewPrices[model] || {};

        // Get all available storages
        const storages = Array.from(new Set([
            ...Object.keys(usedPrices),
            ...Object.keys(newPrices)
        ])).sort();

        const brand = 'Apple';

        // Find existing phone
        const existingIndex = phones.findIndex(p => {
            // Exact match
            if (p.brand === brand && p.model === model) return true;

            // Fuzzy match (handle variations like "iPhone 16e" vs "iPhone 16E")
            const normalizedExisting = p.model.toLowerCase().replace(/\s+/g, '');
            const normalizedModel = model.toLowerCase().replace(/\s+/g, '');
            if (p.brand === brand && normalizedExisting === normalizedModel) return true;

            return false;
        });

        const phoneData = {
            brand: brand,
            model: model,
            storages: storages,
            storagePrices: usedPrices,
            newPhonePrices: newPrices,
            basePrice: Object.values(usedPrices).length > 0
                ? Math.min(...Object.values(usedPrices))
                : Math.min(...Object.values(newPrices)),
            available: true,
            display: true,
            updatedAt: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            // Update existing phone
            const existing = phones[existingIndex];
            phones[existingIndex] = {
                ...existing,
                ...phoneData,
                id: existing.id, // Preserve ID
                image: existing.image || getImagePath(brand, model),
                colors: existing.colors || [],
                buyPrices: existing.buyPrices || calculateBuyPrices(usedPrices),
                quantities: existing.quantities || initializeQuantities(storages),
                createdAt: existing.createdAt || new Date().toISOString()
            };
            updated++;
            console.log(`✅ Updated: ${model}`);
            console.log(`   Used prices: ${Object.keys(usedPrices).length} storage variants`);
            console.log(`   New prices: ${Object.keys(newPrices).length} storage variants`);
        } else {
            // Add new phone
            const newPhone = {
                ...phoneData,
                id: `apple-${model.toLowerCase().replace(/[\s\/\(\)]+/g, '-')}-${Date.now()}`,
                image: getImagePath(brand, model),
                colors: [],
                buyPrices: calculateBuyPrices(usedPrices),
                quantities: initializeQuantities(storages),
                createdAt: new Date().toISOString()
            };
            phones.push(newPhone);
            added++;
            console.log(`➕ Added: ${model}`);
            console.log(`   Used prices: ${Object.keys(usedPrices).length} storage variants`);
            console.log(`   New prices: ${Object.keys(newPrices).length} storage variants`);
        }
    }

    // Save to localStorage
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    console.log('\n✅ Benchmark Import Complete!');
    console.log('='*60);
    console.log(`📊 Summary:`);
    console.log(`   Updated: ${updated} phones`);
    console.log(`   Added: ${added} phones`);
    console.log(`   Total: ${phones.length} phones in database`);
    console.log('='*60);

    // Show detailed breakdown
    console.log('\n📋 Imported Models:');
    allModels.forEach(model => {
        const used = Object.keys(benchmarkUsedPrices[model] || {}).join(', ');
        const newSet = Object.keys(benchmarkNewPrices[model] || {}).join(', ');
        console.log(`   • ${model}`);
        console.log(`     Used: ${used}`);
        console.log(`     New: ${newSet}`);
    });

    // Alert user
    alert(`✅ Benchmark Price Import Successful!\n\n` +
          `📊 Imported from: iPhone_Benchmark_Price_List.xlsx\n\n` +
          `📱 Updated: ${updated} phones\n` +
          `➕ Added: ${added} phones\n` +
          `📦 Total: ${phones.length} phones in database\n\n` +
          `Models imported:\n` +
          `${allModels.map(m => `• ${m}`).join('\n')}\n\n` +
          `Each model has both USED and NEW prices configured.`);

    // Refresh admin panel if available
    if (typeof renderPhones === 'function') renderPhones();
    if (typeof renderPriceTable === 'function') renderPriceTable();

    return { updated, added, total: phones.length };
}

// Make function globally available
if (typeof window !== 'undefined') {
    window.importBenchmarkPrices = importBenchmarkPrices;
}

console.log('📦 Benchmark Price Import Utility loaded.');
console.log('💡 Source: iPhone_Benchmark_Price_List.xlsx');
console.log('💡 Run importBenchmarkPrices() to import exact benchmark prices');
