// ============================================================================
// MASTER COLOR DATABASE - Apple & Samsung Official Factory Colors
// ============================================================================
// LAST UPDATED: 2026-01-18
// SOURCES: Apple.com, Samsung.com, Official Product Pages
// FOCUS: Apple and Samsung only (as per business requirements)
// ============================================================================

const MASTER_COLOR_DATABASE = {
    // ========================================================================
    // APPLE PRODUCTS - Official Factory Colors
    // ========================================================================
    Apple: {
        // iPhone 17 Series (2025)
        'iPhone 17 Pro Max': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone 17 Pro': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone 17': ['Cosmic Orange', 'Deep Blue', 'Silver'],
        'iPhone Air': ['Cosmic Orange', 'Deep Blue', 'Silver'],

        // iPhone 16 Series (2024)
        'iPhone 16 Pro Max': ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
        'iPhone 16 Pro': ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
        'iPhone 16 Plus': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'iPhone 16': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'iPhone 16E': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],

        // iPhone 15 Series (2023)
        'iPhone 15 Pro Max': ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
        'iPhone 15 Pro': ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
        'iPhone 15 Plus': ['Pink', 'Yellow', 'Blue', 'Green', 'Black'],
        'iPhone 15': ['Pink', 'Yellow', 'Blue', 'Green', 'Black'],

        // iPhone 14 Series (2022)
        'iPhone 14 Pro Max': ['Deep Purple', 'Space Black', 'Silver', 'Gold'],
        'iPhone 14 Pro': ['Deep Purple', 'Space Black', 'Silver', 'Gold'],
        'iPhone 14 Plus': ['Blue', 'Purple', 'Midnight', 'Starlight', 'Yellow', '(PRODUCT)RED'],
        'iPhone 14': ['Blue', 'Purple', 'Midnight', 'Starlight', 'Yellow', '(PRODUCT)RED'],

        // iPhone 13 Series (2021)
        'iPhone 13 Pro Max': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
        'iPhone 13 Pro': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
        'iPhone 13 Mini': ['Midnight', 'Starlight', '(PRODUCT)RED', 'Blue', 'Pink', 'Green'],
        'iPhone 13': ['Midnight', 'Starlight', '(PRODUCT)RED', 'Blue', 'Pink', 'Green'],

        // iPhone 12 Series (2020)
        'iPhone 12 Pro Max': ['Silver', 'Graphite', 'Gold', 'Pacific Blue'],
        'iPhone 12 Pro': ['Silver', 'Graphite', 'Gold', 'Pacific Blue'],
        'iPhone 12 Mini': ['Black', 'White', '(PRODUCT)RED', 'Green', 'Blue', 'Purple'],
        'iPhone 12': ['Black', 'White', '(PRODUCT)RED', 'Green', 'Blue', 'Purple'],

        // iPhone 11 Series (2019)
        'iPhone 11 Pro Max': ['Gold', 'Silver', 'Space Gray', 'Midnight Green'],
        'iPhone 11 Pro': ['Gold', 'Silver', 'Space Gray', 'Midnight Green'],
        'iPhone 11': ['Purple', 'Yellow', 'Green', 'Black', 'White', '(PRODUCT)RED'],

        // iPhone X Series
        'iPhone XS Max': ['Gold', 'Silver', 'Space Gray'],
        'iPhone XS': ['Gold', 'Silver', 'Space Gray'],
        'iPhone XR': ['Black', 'White', 'Blue', 'Yellow', 'Coral', '(PRODUCT)RED'],
        'iPhone X': ['Silver', 'Space Gray'],

        // iPhone SE
        'iPhone SE (2022)': ['Midnight', 'Starlight', '(PRODUCT)RED'],
        'iPhone SE (2020)': ['Black', 'White', '(PRODUCT)RED'],

        // iPhone 8 & 7
        'iPhone 8 Plus': ['Silver', 'Space Gray', 'Gold'],
        'iPhone 8': ['Silver', 'Space Gray', 'Gold'],
        'iPhone 7 Plus': ['Rose Gold', 'Gold', 'Silver', 'Black', 'Jet Black'],
        'iPhone 7': ['Rose Gold', 'Gold', 'Silver', 'Black', 'Jet Black'],

        // iPads
        'iPad Pro 13-inch M4': ['Silver', 'Space Black'],
        'iPad Pro 11-inch M4': ['Silver', 'Space Black'],
        'iPad Air 13-inch M2': ['Space Gray', 'Starlight', 'Purple', 'Blue'],
        'iPad Air 11-inch M2': ['Space Gray', 'Starlight', 'Purple', 'Blue'],
        'iPad 10.9-inch 10th Gen': ['Silver', 'Blue', 'Pink', 'Yellow'],
        'iPad Mini 8.3-inch 6th Gen': ['Space Gray', 'Pink', 'Purple', 'Starlight'],

        // Apple Watch
        'Apple Watch Ultra 2': ['Titanium'],
        'Apple Watch Ultra': ['Titanium'],
        'Apple Watch Series 9': ['Midnight', 'Starlight', 'Silver', 'Pink', '(PRODUCT)RED'],
        'Apple Watch Series 8': ['Midnight', 'Starlight', 'Silver', '(PRODUCT)RED'],
        'Apple Watch SE': ['Midnight', 'Starlight', 'Silver'],

        // AirPods
        'AirPods Max': ['Silver', 'Space Gray', 'Sky Blue', 'Green', 'Pink'],
        'AirPods Pro 2nd Gen': ['White'],
        'AirPods Pro': ['White'],
        'AirPods 3rd Gen': ['White'],
        'AirPods 2nd Gen': ['White']
    },

    // ========================================================================
    // SAMSUNG PRODUCTS - Official Factory Colors
    // ========================================================================
    Samsung: {
        // Galaxy S25 Series (2025)
        'Galaxy S25 Ultra 5G': ['Titanium Silverblue', 'Titanium Black', 'Titanium Gray', 'Titanium Whitesilver', 'Titanium Jade Green', 'Titanium Pink Gold', 'Titanium Jet Black'],
        'Galaxy S25+ 5G': ['Icy Blue', 'Mint', 'Navy', 'Silver Shadow', 'Coral Red', 'Blue Black', 'Pink Gold'],
        'Galaxy S25 5G': ['Icy Blue', 'Mint', 'Navy', 'Silver Shadow', 'Coral Red', 'Blue Black', 'Pink Gold'],
        'Galaxy S25 FE 5G': ['Icy Blue', 'Mint', 'Navy', 'Silver Shadow'],

        // Galaxy S24 Series (2024)
        'Galaxy S24 Ultra 5G': ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow', 'Titanium Green', 'Titanium Orange', 'Titanium Blue'],
        'Galaxy S24+ 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
        'Galaxy S24 Plus 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
        'Galaxy S24 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
        'Galaxy S24 FE 5G': ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green'],

        // Galaxy S23 Series (2023)
        'Galaxy S23 Ultra 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Sky Blue', 'Graphite', 'Red'],
        'Galaxy S23+ 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Graphite'],
        'Galaxy S23 5G': ['Green', 'Phantom Black', 'Cream', 'Lavender', 'Lime', 'Graphite'],
        'Galaxy S23 FE': ['Green', 'Phantom Black', 'Cream', 'Lavender'],

        // Galaxy S22 Series (2022)
        'Galaxy S22 Ultra 5G': ['Phantom Black', 'Phantom White', 'Burgundy', 'Green'],
        'Galaxy S22+ 5G': ['Phantom Black', 'Phantom White', 'Green', 'Pink Gold'],
        'Galaxy S22 5G': ['Phantom Black', 'Phantom White', 'Green', 'Pink Gold'],

        // Galaxy S21 Series (2021)
        'Galaxy S21 Ultra 5G': ['Phantom Black', 'Phantom Silver', 'Phantom Brown', 'Phantom Navy'],
        'Galaxy S21+ 5G': ['Phantom Black', 'Phantom Silver', 'Phantom Violet', 'Phantom Pink', 'Phantom Gold'],
        'Galaxy S21 5G': ['Phantom Gray', 'Phantom White', 'Phantom Violet', 'Phantom Pink'],
        'Galaxy S21 FE 5G': ['Graphite', 'White', 'Lavender', 'Olive'],

        // Galaxy S20 Series (2020)
        'Galaxy S20 Ultra 5G': ['Cosmic Black', 'Cosmic Gray'],
        'Galaxy S20+ 5G': ['Cosmic Black', 'Cosmic Gray', 'Cloud Blue'],
        'Galaxy S20 5G': ['Cosmic Gray', 'Cloud Blue', 'Cloud Pink'],
        'Galaxy S20 FE 5G': ['Cloud Navy', 'Cloud Lavender', 'Cloud Mint', 'Cloud Red', 'Cloud White'],

        // Galaxy Z Fold Series
        'Galaxy Z Fold 7 5G': ['Jet Black', 'Blue Shadow', 'Silver Shadow', 'Mint'],
        'Galaxy Z Fold 6 5G': ['Phantom Black', 'Silver Shadow', 'Pink'],
        'Galaxy Z Fold 5 5G': ['Phantom Black', 'Cream', 'Icy Blue'],
        'Galaxy Z Fold 4 5G': ['Phantom Black', 'Graygreen', 'Beige'],

        // Galaxy Z Flip Series
        'Galaxy Z Flip 7 5G': ['Jet Black', 'Blue Shadow', 'Coral Red', 'Mint'],
        'Galaxy Z Flip 7 FE 5G': ['Jet Black', 'Blue Shadow', 'Coral Red', 'Mint'],
        'Galaxy Z Flip 6 5G': ['Mint', 'Silver Shadow', 'Yellow', 'Blue', 'Peach'],
        'Galaxy Z Flip 5 5G': ['Mint', 'Graphite', 'Cream', 'Lavender'],
        'Galaxy Z Flip 4 5G': ['Bora Purple', 'Graphite', 'Pink Gold', 'Blue'],

        // Galaxy A Series
        'Galaxy A56 5G': ['Navy', 'Ice Blue', 'Lilac'],
        'Galaxy A55 5G': ['Navy', 'Ice Blue', 'Lilac'],
        'Galaxy A54 5G': ['Awesome Violet', 'Awesome Graphite', 'Awesome Lime', 'Awesome White'],
        'Galaxy A36 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A35 5G': ['Awesome Navy', 'Awesome Lilac', 'Awesome Lemon'],
        'Galaxy A26 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A25 5G': ['Blue Black', 'Blue', 'Yellow'],
        'Galaxy A17 5G': ['Navy', 'Black', 'Silver'],
        'Galaxy A17 4G': ['Navy', 'Black', 'Silver'],
        'Galaxy A15 5G': ['Blue Black', 'Blue', 'Yellow'],
        'Galaxy A14 5G': ['Black', 'Dark Red', 'Silver', 'Light Green'],

        // Galaxy Tablets
        'Galaxy Tab A11+ 128 5G': ['Silver', 'Dark Gray'],
        'Galaxy Tab A11+ 128 WiFi': ['Silver', 'Dark Gray'],
        'Galaxy Tab S9 Ultra': ['Graphite', 'Beige'],
        'Galaxy Tab S9+': ['Graphite', 'Beige'],
        'Galaxy Tab S9': ['Graphite', 'Beige'],

        // Galaxy Watches
        'Galaxy Watch 8 40mm Bluetooth': ['Silver', 'Pink Gold', 'Graphite'],
        'Galaxy Watch 8 44mm Bluetooth': ['Silver', 'Black', 'Green'],
        'Galaxy Watch 8 Classic 46mm Bluetooth': ['Black', 'Silver'],
        'Galaxy Watch Ultra 47mm (2025)': ['Titanium Gray', 'Titanium White', 'Titanium Black'],
        'Galaxy Watch 6': ['Graphite', 'Gold'],
        'Galaxy Watch 6 Classic': ['Black', 'Silver'],

        // Galaxy Buds
        'Galaxy Buds 3': ['Silver', 'White'],
        'Galaxy Buds 3 Pro': ['Silver', 'White'],
        'Galaxy Buds 2 Pro': ['Graphite', 'White', 'Bora Purple'],
        'Galaxy Buds 2': ['Graphite', 'White', 'Olive', 'Lavender']
    }
};

// ============================================================================
// GET OFFICIAL COLORS - Simple lookup function
// ============================================================================
function getMasterColors(brand, model) {
    if (!brand || !model) {
        console.warn('getMasterColors: Missing brand or model');
        return [];
    }

    // Direct lookup
    const brandColors = MASTER_COLOR_DATABASE[brand];
    if (brandColors && brandColors[model]) {
        return brandColors[model];
    }

    // No match found
    console.log(`⚠️  No official colors found for: ${brand} ${model}`);
    return [];
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.MASTER_COLOR_DATABASE = MASTER_COLOR_DATABASE;
    window.getMasterColors = getMasterColors;
    console.log('✅ Master Color Database loaded');
    console.log(`   📱 Apple models: ${Object.keys(MASTER_COLOR_DATABASE.Apple).length}`);
    console.log(`   📱 Samsung models: ${Object.keys(MASTER_COLOR_DATABASE.Samsung).length}`);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MASTER_COLOR_DATABASE, getMasterColors };
}
