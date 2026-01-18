/**
 * Updated Bulk Import Utility for Phone Prices
 * Combines WhyMobile and RedWhite competitor analysis
 * Takes the HIGHER price between the two sources for better buyback rates
 * Date: January 2026
 * Focus: Apple and Samsung phones only
 *
 * Usage:
 * 1. Open admin panel in browser
 * 2. Click "Import Prices" button
 * 3. This function will be automatically loaded and executed
 */

/**
 * Parse and normalize model names to match storage format
 */
function parseModelStorage(productName) {
    // Extract storage from product name (e.g., "Apple iPhone 17 Pro Max 256GB" -> "256GB")
    const storageMatch = productName.match(/(\d+(?:GB|TB))/);
    return storageMatch ? storageMatch[1] : null;
}

function normalizeModelName(productName) {
    // Remove storage, brand prefix, and extra notes
    let model = productName
        .replace(/^(Apple|Samsung)\s+/i, '')
        .replace(/\s*\d+(?:GB|TB)\s*/g, ' ')
        .replace(/\s*5G\s*/g, ' ')
        .replace(/\s*Cellular\s*/g, ' ')
        .replace(/\s*WiFi\s*/g, ' ')
        .replace(/\([^)]*\)/g, '') // Remove parenthetical notes
        .trim()
        .replace(/\s+/g, ' '); // Normalize whitespace

    return model;
}

/**
 * WhyMobile Used Phone Buyback Prices
 * Parsed from the provided price list
 */
const whyMobileUsedPrices = {
    // iPhone 17 Series
    "iPhone 17": {
        "256GB": 900,
        "512GB": 1000
    },
    "iPhone 17 Pro": {
        "256GB": 1300,
        "512GB": 1520,
        "1TB": 1700
    },
    "iPhone 17 Pro Max": {
        "256GB": 1500,
        "512GB": 1700,
        "1TB": 2000,
        "2TB": 2250
    },

    // iPhone 16 Series
    "iPhone 16e": {
        "128GB": 460,
        "256GB": 560,
        "512GB": 650
    },
    "iPhone 16": {
        "128GB": 600,
        "256GB": 720,
        "512GB": 760
    },
    "iPhone 16 Plus": {
        "128GB": 670,
        "256GB": 800,
        "512GB": 830
    },
    "iPhone 16 Pro": {
        "128GB": 720,
        "256GB": 860,
        "512GB": 970,
        "1TB": 1020
    },
    "iPhone 16 Pro Max": {
        "256GB": 1000,
        "512GB": 1100,
        "1TB": 1150
    },

    // iPhone 15 Series
    "iPhone 15": {
        "128GB": 460,
        "256GB": 530,
        "512GB": 580
    },
    "iPhone 15 Plus": {
        "128GB": 530,
        "256GB": 580,
        "512GB": 630
    },
    "iPhone 15 Pro": {
        "128GB": 580,
        "256GB": 660,
        "512GB": 750,
        "1TB": 800
    },
    "iPhone 15 Pro Max": {
        "256GB": 760,
        "512GB": 830,
        "1TB": 900
    },

    // iPhone 14 Series
    "iPhone 14": {
        "128GB": 330,
        "256GB": 380,
        "512GB": 430
    },
    "iPhone 14 Plus": {
        "128GB": 400,
        "256GB": 450,
        "512GB": 520
    },
    "iPhone 14 Pro": {
        "128GB": 460,
        "256GB": 520,
        "512GB": 560,
        "1TB": 600
    },
    "iPhone 14 Pro Max": {
        "128GB": 520,
        "256GB": 600,
        "512GB": 680,
        "1TB": 750
    },

    // iPhone 13 Series
    "iPhone 13 mini": {
        "128GB": 200,
        "256GB": 250,
        "512GB": 300
    },
    "iPhone 13": {
        "128GB": 260,
        "256GB": 300,
        "512GB": 360
    },
    "iPhone 13 Pro": {
        "128GB": 320,
        "256GB": 380,
        "512GB": 430,
        "1TB": 480
    },
    "iPhone 13 Pro Max": {
        "128GB": 420,
        "256GB": 460,
        "512GB": 500
    },

    // iPhone 12 Series
    "iPhone 12 mini": {
        "128GB": 130,
        "256GB": 160
    },
    "iPhone 12": {
        "128GB": 200,
        "256GB": 260
    },
    "iPhone 12 Pro": {
        "128GB": 280,
        "256GB": 330,
        "512GB": 380
    },
    "iPhone 12 Pro Max": {
        "128GB": 330,
        "256GB": 380,
        "512GB": 420
    },

    // iPhone 11 Series
    "iPhone 11": {
        "128GB": 160,
        "256GB": 200
    },
    "iPhone 11 Pro": {
        "256GB": 220,
        "512GB": 250
    },
    "iPhone 11 Pro Max": {
        "256GB": 260,
        "512GB": 300
    },

    // Samsung Galaxy S25 Series
    "Galaxy S25": {
        "256GB": 560,
        "512GB": 650
    },
    "Galaxy S25+": {
        "256GB": 680,
        "512GB": 760
    },
    "Galaxy S25 Ultra": {
        "256GB": 800,
        "512GB": 920,
        "1TB": 1020
    },

    // Samsung Galaxy S24 Series
    "Galaxy S24": {
        "256GB": 380,
        "512GB": 450
    },
    "Galaxy S24 Plus": {
        "256GB": 480,
        "512GB": 530
    },
    "Galaxy S24 Ultra": {
        "256GB": 580,
        "512GB": 650,
        "1TB": 700
    },
    "Galaxy S24 FE": {
        "256GB": 300,
        "512GB": 360
    },

    // Samsung Galaxy S23 Series
    "Galaxy S23": {
        "256GB": 250
    },
    "Galaxy S23+": {
        "256GB": 330,
        "512GB": 370
    },
    "Galaxy S23 Ultra": {
        "256GB": 400,
        "512GB": 450
    },
    "Galaxy S23 FE": {
        "256GB": 200
    },

    // Samsung Galaxy Z Fold Series
    "Galaxy Z Fold 7": {
        "256GB": 1220,
        "512GB": 1350,
        "1TB": 1450
    },

    // Samsung Galaxy Z Flip Series
    "Galaxy Z Flip 7": {
        "256GB": 550,
        "512GB": 650
    },
    "Galaxy Z Flip 7 FE": {
        "128GB": 300,
        "256GB": 450
    }
};

/**
 * WhyMobile New Phone Buyback Prices (Unactivated)
 */
const whyMobileNewPrices = {
    // iPhone 17 Series
    "iPhone 17": {
        "256GB": 1170,
        "512GB": 1450
    },
    "iPhone 17 Pro": {
        "256GB": 1570,
        "512GB": 1840,
        "1TB": 2050
    },
    "iPhone 17 Pro Max": {
        "256GB": 1730, // Taking highest among color variants (Silver)
        "512GB": 1960,
        "1TB": 2230,
        "2TB": 2450
    },

    // iPhone 16 Series
    "iPhone 16e": {
        "128GB": 660,
        "256GB": 770
    },
    "iPhone 16": {
        "128GB": 860,
        "256GB": 1000
    },
    "iPhone 16 Pro": {
        "256GB": 1300,
        "512GB": 1500
    },
    "iPhone 16 Pro Max": {
        "256GB": 1430,
        "512GB": 1630
    },

    // Samsung Galaxy S25 Series
    "Galaxy S25": {
        "256GB": 760,
        "512GB": 850
    },
    "Galaxy S25+": {
        "256GB": 880,
        "512GB": 1000
    },
    "Galaxy S25 Ultra": {
        "256GB": 1040,
        "512GB": 1250,
        "1TB": 1350
    },

    // Samsung Galaxy A Series
    "Galaxy A56": {
        "256GB": 420 // 12GB RAM variant
    },
    "Galaxy A36": {
        "256GB": 330
    },

    // Samsung Galaxy Z Fold Series
    "Galaxy Z Fold 7": {
        "256GB": 1630,
        "512GB": 1780,
        "1TB": 1860
    },

    // Samsung Galaxy Z Flip Series
    "Galaxy Z Flip 7": {
        "256GB": 800,
        "512GB": 920
    },
    "Galaxy Z Flip 7 FE": {
        "128GB": 500,
        "256GB": 680
    }
};

/**
 * RedWhite Used Phone Buyback Prices
 */
const redWhiteUsedPrices = {
    // iPhone 17 Series
    "iPhone 17 Pro Max": {
        "256GB": 1520,
        "512GB": 1750,
        "1TB": 1920,
        "2TB": 2070
    },
    "iPhone 17 Pro": {
        "256GB": 1350,
        "512GB": 1550,
        "1TB": 1750
    },
    "iPhone 17 Air": {
        "256GB": 850,
        "512GB": 1000,
        "1TB": 1100
    },
    "iPhone 17": {
        "256GB": 900,
        "512GB": 1150
    },

    // iPhone 16 Series
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
    "iPhone 16e": {
        "128GB": 520,
        "256GB": 620,
        "512GB": 720
    },

    // iPhone 13 Series
    "iPhone 13 Pro Max": {
        "128GB": 460,
        "256GB": 510,
        "512GB": 560,
        "1TB": 610
    },
    "iPhone 13 Pro": {
        "128GB": 380,
        "256GB": 430,
        "512GB": 480,
        "1TB": 530
    },
    "iPhone 13": {
        "128GB": 300,
        "256GB": 350,
        "512GB": 400
    },
    "iPhone 13 Mini": {
        "128GB": 250,
        "256GB": 300,
        "512GB": 350
    },

    // iPhone 12 Series
    "iPhone 12 Pro Max": {
        "128GB": 350,
        "256GB": 400,
        "512GB": 450
    },
    "iPhone 12 Pro": {
        "128GB": 300,
        "256GB": 350,
        "512GB": 400
    },
    "iPhone 12": {
        "64GB": 200,
        "128GB": 250,
        "256GB": 300
    },
    "iPhone 12 Mini": {
        "64GB": 120,
        "128GB": 150,
        "256GB": 180
    },

    // iPhone 11 Series
    "iPhone 11 Pro Max": {
        "64GB": 220,
        "256GB": 250,
        "512GB": 280
    },
    "iPhone 11 Pro": {
        "64GB": 170,
        "256GB": 210,
        "512GB": 240
    },
    "iPhone 11": {
        "64GB": 120,
        "128GB": 150,
        "256GB": 180
    },

    // Older iPhone Models
    "iPhone SE (2022)": {
        "64GB": 120,
        "128GB": 170,
        "256GB": 220
    },
    "iPhone XS Max": {
        "64GB": 120,
        "256GB": 150,
        "512GB": 180
    },
    "iPhone XS": {
        "64GB": 70,
        "256GB": 100,
        "512GB": 130
    },
    "iPhone XR": {
        "64GB": 50,
        "128GB": 80,
        "256GB": 110
    }
};

/**
 * RedWhite New Phone Buyback Prices
 */
const redWhiteNewPrices = {
    // iPhone 17 Series
    "iPhone 17 Pro Max": {
        "256GB": 1720,
        "512GB": 2000,
        "1TB": 2220,
        "2TB": 2420
    },
    "iPhone 17 Pro": {
        "256GB": 1600,
        "512GB": 1750,
        "1TB": 1950
    },
    "iPhone 17 Air": {
        "256GB": 1000,
        "512GB": 1220,
        "1TB": 1320
    },
    "iPhone 17": {
        "256GB": 1200,
        "512GB": 1370
    },

    // iPhone 16 Series
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
    "iPhone 16e": {
        "128GB": 650,
        "256GB": 770,
        "512GB": 870
    }
};

/**
 * Merge prices from multiple sources, taking the HIGHER value
 */
function mergeUsedPrices(model) {
    const whyMobile = whyMobileUsedPrices[model] || {};
    const redWhite = redWhiteUsedPrices[model] || {};

    const allStorages = new Set([...Object.keys(whyMobile), ...Object.keys(redWhite)]);
    const merged = {};

    for (const storage of allStorages) {
        const whyPrice = whyMobile[storage] || 0;
        const redPrice = redWhite[storage] || 0;
        merged[storage] = Math.max(whyPrice, redPrice);
    }

    return merged;
}

function mergeNewPrices(model) {
    const whyMobile = whyMobileNewPrices[model] || {};
    const redWhite = redWhiteNewPrices[model] || {};

    const allStorages = new Set([...Object.keys(whyMobile), ...Object.keys(redWhite)]);
    const merged = {};

    for (const storage of allStorages) {
        const whyPrice = whyMobile[storage] || 0;
        const redPrice = redWhite[storage] || 0;
        merged[storage] = Math.max(whyPrice, redPrice);
    }

    return merged;
}

/**
 * Get default image path based on model name
 */
function getImagePath(brand, model) {
    const modelLower = model.toLowerCase().replace(/\s+/g, '-');
    return `images/phones/${modelLower}.jpg`;
}

/**
 * Main import function
 */
function importUpdatedPrices() {
    console.log('🚀 Starting updated price import (WhyMobile + RedWhite)...');

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let added = 0;

    // Get all unique models from both sources
    const allModels = new Set([
        ...Object.keys(whyMobileUsedPrices),
        ...Object.keys(whyMobileNewPrices),
        ...Object.keys(redWhiteUsedPrices),
        ...Object.keys(redWhiteNewPrices)
    ]);

    for (const model of allModels) {
        // Merge prices from both sources (taking higher values)
        const usedPrices = mergeUsedPrices(model);
        const newPrices = mergeNewPrices(model);

        // Skip if no prices found
        if (Object.keys(usedPrices).length === 0 && Object.keys(newPrices).length === 0) {
            continue;
        }

        // Determine brand
        const brand = model.includes('Galaxy') ? 'Samsung' : 'Apple';

        // Get all available storages
        const storages = Array.from(new Set([
            ...Object.keys(usedPrices),
            ...Object.keys(newPrices)
        ])).sort();

        // Find existing phone or create new
        const existingIndex = phones.findIndex(p =>
            p.brand === brand &&
            (p.model === model || p.model.includes(model) || model.includes(p.model))
        );

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
            console.log(`✅ Updated: ${brand} ${model}`);
        } else {
            // Add new phone
            const newPhone = {
                ...phoneData,
                id: `${brand.toLowerCase()}-${model.toLowerCase().replace(/[\s\/\(\)]+/g, '-')}-${Date.now()}`,
                image: getImagePath(brand, model),
                colors: [],
                buyPrices: calculateBuyPrices(usedPrices),
                quantities: initializeQuantities(storages),
                createdAt: new Date().toISOString()
            };
            phones.push(newPhone);
            added++;
            console.log(`➕ Added: ${brand} ${model}`);
        }
    }

    // Save to localStorage
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    console.log('✅ Import complete!');
    console.log(`   Updated: ${updated} products`);
    console.log(`   Added: ${added} products`);
    console.log(`   Total: ${phones.length} products in database`);

    alert(`✅ Price Import Successful!\n\nUpdated: ${updated} phones\nAdded: ${added} phones\nTotal: ${phones.length} phones\n\nPrices compared from WhyMobile and RedWhite.\nHigher prices selected for best buyback rates.`);

    // Refresh admin panel if available
    if (typeof renderPhones === 'function') renderPhones();
    if (typeof renderPriceTable === 'function') renderPriceTable();

    return { updated, added, total: phones.length };
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
        quantities[storage] = {
            excellent: 0,
            good: 0,
            fair: 0
        };
    });
    return quantities;
}

// Make function globally available
if (typeof window !== 'undefined') {
    window.importUpdatedPrices = importUpdatedPrices;
}

console.log('📦 Updated Price Import Utility loaded.');
console.log('💡 Run importUpdatedPrices() to import latest prices from WhyMobile + RedWhite');
