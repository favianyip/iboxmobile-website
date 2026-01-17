// Phone Database with prices matching SellUp market rates
// Using LOCAL images for reliability
// Make it globally available for admin.js
// ============================================================
// REAL PRICES FROM COMPETITOR RESEARCH (January 2026)
// These are USED phone prices (Grade A, highest storage)
// Prices are loaded dynamically from price_data.json
// ============================================================

// Dynamic price loading from price_data.json
let dynamicPrices = null;
let directPriceLookup = null; // DIRECT PRICES - no calculations!

async function loadDynamicPrices() {
    try {
        const response = await fetch('price_data.json');
        if (response.ok) {
            const data = await response.json();
            dynamicPrices = data.prices;
            console.log('Dynamic prices loaded from price_data.json');
            
            // Update phoneDatabase with dynamic prices
            if (dynamicPrices) {
                updatePhoneDatabaseWithDynamicPrices();
            }
        }
    } catch (error) {
        console.log('Using default prices (price_data.json not found)');
    }
    
    // Load direct price lookup - ACTUAL PRICES, no calculations!
    try {
        let response = await fetch('direct_prices.json');
        if (!response.ok) {
            // Try alternate location
            response = await fetch('price-scraper/direct_prices.json');
        }
        if (response.ok) {
            directPriceLookup = await response.json();
            console.log('Direct price lookup loaded - using ACTUAL prices');
        }
    } catch (error) {
        console.log('Direct prices not found, using calculated prices as fallback');
    }
}

// DIRECT PRICE LOOKUP - Returns actual price, no calculation!
function getDirectPrice(model, storage, color, country, body, screen, battery, issues, accessories) {
    if (!directPriceLookup || !directPriceLookup.models) {
        return null; // Fallback to calculation if not available
    }
    
    const modelData = directPriceLookup.models[model];
    if (!modelData || !modelData.conditions || !modelData.conditions[storage]) {
        return null;
    }
    
    // Build condition key: Country_GradeBody_GradeScreen_Battery%
    const countryKey = country === 'local' ? 'Local' : 'Export';
    const bodyKey = 'Grade' + body;
    const screenKey = 'Grade' + screen;
    const batteryKey = battery === '91-100' ? '91-100%' :
                       battery === '86-90' ? '86-90%' :
                       battery === '81-85' ? '81-85%' : '80%';
    
    const condKey = `${countryKey}_${bodyKey}_${screenKey}_${batteryKey}`;
    
    console.log('Looking up condition:', condKey);
    
    // Get base price for condition
    let price = modelData.conditions[storage][condKey];
    
    if (price !== undefined) {
        // Add accessory bonus
        if (accessories.includes('cable') || accessories.includes('Cable')) price += 15;
        if (accessories.includes('box') || accessories.includes('Box')) price += 20;
        console.log('Direct price found:', price);
        return price;
    }
    
    console.log('No direct price for:', condKey);
    return null; // Fall back to calculation
}

function updatePhoneDatabaseWithDynamicPrices() {
    if (!dynamicPrices) return;
    
    for (const brand of ['Apple', 'Samsung']) {
        if (dynamicPrices[brand]) {
            for (const [model, priceData] of Object.entries(dynamicPrices[brand])) {
                if (phoneDatabase[brand] && phoneDatabase[brand][model]) {
                    // Update base price
                    if (priceData.basePrice) {
                        phoneDatabase[brand][model].basePrice = priceData.basePrice;
                    }
                    // Update storage prices if available
                    if (priceData.storagePrices) {
                        // Convert storage prices to delta format
                        const storages = Object.keys(priceData.storagePrices);
                        if (storages.length > 0) {
                            const baseStorage = storages[0];
                            const baseStoragePrice = priceData.storagePrices[baseStorage];
                            phoneDatabase[brand][model].storage = {};
                            for (const [storage, price] of Object.entries(priceData.storagePrices)) {
                                phoneDatabase[brand][model].storage[storage] = price - baseStoragePrice;
                            }
                        }
                    }
                    // Store device type prices
                    phoneDatabase[brand][model].new_sealed = priceData.new_sealed || priceData.basePrice * 1.1;
                    phoneDatabase[brand][model].new_activated = priceData.new_activated || priceData.basePrice * 1.05;
                    phoneDatabase[brand][model].used = priceData.used || priceData.basePrice;
                }
            }
        }
    }
    console.log('Phone database updated with dynamic prices');
}

// Load prices on page load
document.addEventListener('DOMContentLoaded', loadDynamicPrices);

const phoneDatabase = {
    Apple: {
        'iPhone 17 Pro Max': {
            basePrice: 1230, // SellUp market rate
            image: 'images/phones/iphone-16-pro-max.jpg',
            storage: { '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Desert Titanium', hex: '#8B7355' },
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 17 Pro': {
            basePrice: 1125, // SellUp market rate
            image: 'images/phones/iphone-16-pro.jpg',
            storage: { '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Desert Titanium', hex: '#8B7355' },
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 17': {
            basePrice: 910, // SellUp market rate
            image: 'images/phones/iphone-16.jpg',
            storage: { '256GB': 0, '512GB': 100 },
            colors: [
                { name: 'Black', hex: '#1C1C1E' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Pink', hex: '#FFB6C1' },
                { name: 'Blue', hex: '#4169E1' },
                { name: 'Green', hex: '#2E7D32' }
            ]
        },
        'iPhone Air': {
            basePrice: 1330, // SellUp: $1,330
            image: 'images/phones/iphone-16.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Starlight', hex: '#F5F5DC' },
                { name: 'Midnight', hex: '#1C1C1E' },
                { name: 'Blue', hex: '#4169E1' }
            ]
        },
        'iPhone 16e': {
            basePrice: 730, // SellUp: $730
            image: 'images/phones/iphone-se-3rd-gen.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Blue', hex: '#4169E1' }
            ]
        },
        'iPhone 16 Pro Max': {
            basePrice: 1035, // SellUp Verified: $1,035 (Grade A, Local, No Accessories) + $35 with Cable+Box = $1,070
            image: 'images/phones/iphone-16-pro-max.jpg',
            storage: { '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Desert Titanium', hex: '#8B7355' },
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 16 Pro': {
            basePrice: 1225, // SellUp: $1,225
            image: 'images/phones/iphone-16-pro.jpg',
            storage: { '128GB': -100, '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Desert Titanium', hex: '#8B7355' },
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 16 Plus': {
            basePrice: 1040, // SellUp: $1,040
            image: 'images/phones/iphone-16-plus.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Ultramarine', hex: '#4169E1' },
                { name: 'Teal', hex: '#008080' },
                { name: 'Pink', hex: '#FFB6C1' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Black', hex: '#000000' }
            ]
        },
        'iPhone 16': {
            basePrice: 960, // SellUp: $960
            image: 'images/phones/iphone-16.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Ultramarine', hex: '#4169E1' },
                { name: 'Teal', hex: '#008080' },
                { name: 'Pink', hex: '#FFB6C1' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Black', hex: '#000000' }
            ]
        },
        'iPhone 15 Pro Max': {
            basePrice: 960, // SellUp: $960
            image: 'images/phones/iphone-15-pro-max.jpg',
            storage: { '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'Blue Titanium', hex: '#4A6B8A' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 15 Pro': {
            basePrice: 955, // SellUp: $955
            image: 'images/phones/iphone-15-pro.jpg',
            storage: { '128GB': -100, '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Natural Titanium', hex: '#A8A8A0' },
                { name: 'Blue Titanium', hex: '#4A6B8A' },
                { name: 'White Titanium', hex: '#F5F5F0' },
                { name: 'Black Titanium', hex: '#2C2C2C' }
            ]
        },
        'iPhone 15 Plus': {
            basePrice: 800, // SellUp: $800
            image: 'images/phones/iphone-15-plus.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Black', hex: '#3C3C3C' },
                { name: 'Blue', hex: '#D4E4ED' },
                { name: 'Green', hex: '#CAD6C3' },
                { name: 'Yellow', hex: '#F6E64C' },
                { name: 'Pink', hex: '#F9D1CF' }
            ]
        },
        'iPhone 15': {
            basePrice: 755, // SellUp: $755
            image: 'images/phones/iphone-15.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Black', hex: '#3C3C3C' },
                { name: 'Blue', hex: '#D4E4ED' },
                { name: 'Green', hex: '#CAD6C3' },
                { name: 'Yellow', hex: '#F6E64C' },
                { name: 'Pink', hex: '#F9D1CF' }
            ]
        },
        'iPhone 14 Pro Max': {
            basePrice: 850, // SellUp: $850
            image: 'images/phones/iphone-14-pro-max.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 150, '1TB': 200 },
            colors: [
                { name: 'Deep Purple', hex: '#5B4B8A' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Black', hex: '#1C1C1E' }
            ]
        },
        'iPhone 14 Pro': {
            basePrice: 760, // SellUp: $760
            image: 'images/phones/iphone-14-pro.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 150, '1TB': 200 },
            colors: [
                { name: 'Deep Purple', hex: '#5B4B8A' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Black', hex: '#1C1C1E' }
            ]
        },
        'iPhone 14 Plus': {
            basePrice: 640, // SellUp: $640
            image: 'images/phones/iphone-14-plus.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Blue', hex: '#007AFF' },
                { name: 'Purple', hex: '#AF52DE' },
                { name: 'Yellow', hex: '#FFCC00' },
                { name: 'Midnight', hex: '#1C1C1E' },
                { name: 'Starlight', hex: '#F5F5DC' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone 14': {
            basePrice: 560, // SellUp: $560
            image: 'images/phones/iphone-14.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Blue', hex: '#007AFF' },
                { name: 'Purple', hex: '#AF52DE' },
                { name: 'Yellow', hex: '#FFCC00' },
                { name: 'Midnight', hex: '#1C1C1E' },
                { name: 'Starlight', hex: '#F5F5DC' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone 13 Pro Max': {
            basePrice: 670, // SellUp: $670
            image: 'images/phones/iphone-13-pro-max.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 150, '1TB': 200 },
            colors: [
                { name: 'Graphite', hex: '#54524F' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Sierra Blue', hex: '#A7C1D9' },
                { name: 'Alpine Green', hex: '#576856' }
            ]
        },
        'iPhone 13 Pro': {
            basePrice: 580, // SellUp: $580
            image: 'images/phones/iphone-13-pro.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 150, '1TB': 200 },
            colors: [
                { name: 'Graphite', hex: '#54524F' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Sierra Blue', hex: '#A7C1D9' },
                { name: 'Alpine Green', hex: '#576856' }
            ]
        },
        'iPhone 13': {
            basePrice: 460, // SellUp: $460
            image: 'images/phones/iphone-13.jpg',
            storage: { '128GB': 0, '256GB': 50, '512GB': 100 },
            colors: [
                { name: 'Pink', hex: '#FADDD7' },
                { name: 'Blue', hex: '#447792' },
                { name: 'Midnight', hex: '#3E4042' },
                { name: 'Starlight', hex: '#FAF6F2' },
                { name: 'Red', hex: '#BF0013' },
                { name: 'Green', hex: '#394C38' }
            ]
        },
        'iPhone 13 mini': {
            basePrice: 485, // SellUp: $485
            image: 'images/phones/iphone-13-mini.jpg',
            storage: { '128GB': 0, '256GB': 50, '512GB': 100 },
            colors: [
                { name: 'Pink', hex: '#FADDD7' },
                { name: 'Blue', hex: '#447792' },
                { name: 'Midnight', hex: '#3E4042' },
                { name: 'Starlight', hex: '#FAF6F2' },
                { name: 'Red', hex: '#BF0013' },
                { name: 'Green', hex: '#394C38' }
            ]
        },
        'iPhone 12 Pro Max': {
            basePrice: 500, // SellUp: $500
            image: 'images/phones/iphone-12-pro-max.jpg',
            storage: { '128GB': 0, '256GB': 75, '512GB': 150 },
            colors: [
                { name: 'Graphite', hex: '#54524F' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Pacific Blue', hex: '#2D4E5C' }
            ]
        },
        'iPhone 12 Pro': {
            basePrice: 440, // SellUp: $440
            image: 'images/phones/iphone-12-pro.jpg',
            storage: { '128GB': 0, '256GB': 75, '512GB': 150 },
            colors: [
                { name: 'Graphite', hex: '#54524F' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Pacific Blue', hex: '#2D4E5C' }
            ]
        },
        'iPhone 12': {
            basePrice: 340, // SellUp: $340
            image: 'images/phones/iphone-12-pro.jpg',
            storage: { '64GB': 0, '128GB': 50, '256GB': 100 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Red', hex: '#BF0013' },
                { name: 'Green', hex: '#D8EFD7' },
                { name: 'Blue', hex: '#134E8C' },
                { name: 'Purple', hex: '#B4A7C9' }
            ]
        },
        'iPhone 12 mini': {
            basePrice: 320,
            image: 'images/phones/iphone-12-mini.jpg',
            storage: { '64GB': -15, '128GB': 0, '256GB': 15 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Red', hex: '#BF0013' },
                { name: 'Green', hex: '#D8EFD7' },
                { name: 'Blue', hex: '#134E8C' },
                { name: 'Purple', hex: '#B4A7C9' }
            ]
        },
        'iPhone 11 Pro Max': {
            basePrice: 380, // SellUp: $380
            image: 'images/phones/iphone-11-pro.jpg',
            storage: { '64GB': 0, '256GB': 50, '512GB': 100 },
            colors: [
                { name: 'Space Gray', hex: '#535150' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Midnight Green', hex: '#4E5851' }
            ]
        },
        'iPhone 11 Pro': {
            basePrice: 350, // SellUp: $350
            image: 'images/phones/iphone-11-pro.jpg',
            storage: { '64GB': 0, '256GB': 50, '512GB': 100 },
            colors: [
                { name: 'Space Gray', hex: '#535150' },
                { name: 'Silver', hex: '#F5F5F0' },
                { name: 'Gold', hex: '#FAE7CF' },
                { name: 'Midnight Green', hex: '#4E5851' }
            ]
        },
        'iPhone 11': {
            basePrice: 272, // SellUp: $272
            image: 'images/phones/iphone-11.jpg',
            storage: { '64GB': 0, '128GB': 50, '256GB': 100 },
            colors: [
                { name: 'Black', hex: '#1F2020' },
                { name: 'White', hex: '#F9F6EF' },
                { name: 'Red', hex: '#BF0013' },
                { name: 'Yellow', hex: '#FFDD4D' },
                { name: 'Green', hex: '#AEE1CD' },
                { name: 'Purple', hex: '#D1CDDB' }
            ]
        },
        'iPhone SE (3rd Gen)': {
            basePrice: 200,
            image: 'images/phones/iphone-se-3rd-gen.jpg',
            storage: { '64GB': 0, '128GB': 15, '256GB': 30 },
            colors: [
                { name: 'Midnight', hex: '#1C1C1E' },
                { name: 'Starlight', hex: '#F5F5DC' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone XS Max': {
            basePrice: 250,
            image: 'images/phones/iphone-xs-max.jpg',
            storage: { '64GB': 0, '256GB': 20, '512GB': 40 },
            colors: [
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Gray', hex: '#1C1C1E' }
            ]
        },
        'iPhone XS': {
            basePrice: 200,
            image: 'images/phones/iphone-xs.jpg',
            storage: { '64GB': 0, '256GB': 15, '512GB': 30 },
            colors: [
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Gray', hex: '#1C1C1E' }
            ]
        },
        'iPhone XR': {
            basePrice: 150,
            image: 'images/phones/iphone-xr.jpg',
            storage: { '64GB': 0, '128GB': 10, '256GB': 20 },
            colors: [
                { name: 'Black', hex: '#1C1C1E' },
                { name: 'White', hex: '#F5F5F0' },
                { name: 'Blue', hex: '#007AFF' },
                { name: 'Yellow', hex: '#FFCC00' },
                { name: 'Coral', hex: '#FF6B6B' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone X': {
            basePrice: 180,
            image: 'images/phones/iphone-xs.jpg', // Using XS image as fallback
            storage: { '64GB': 0, '256GB': 15 },
            colors: [
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Gray', hex: '#1C1C1E' }
            ]
        },
        'iPhone 8 Plus': {
            basePrice: 120,
            image: 'images/phones/iphone-11.jpg', // Using iPhone 11 as fallback
            storage: { '64GB': 0, '256GB': 10 },
            colors: [
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Gray', hex: '#1C1C1E' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone 8': {
            basePrice: 100,
            image: 'images/phones/iphone-11.jpg', // Using iPhone 11 as fallback
            storage: { '64GB': 0, '256GB': 10 },
            colors: [
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Space Gray', hex: '#1C1C1E' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone SE (2nd Gen)': {
            basePrice: 80,
            image: 'images/phones/iphone-se-3rd-gen.jpg', // Using 3rd gen as fallback
            storage: { '64GB': 0, '128GB': 8, '256GB': 15 },
            colors: [
                { name: 'Black', hex: '#1C1C1E' },
                { name: 'White', hex: '#F5F5F0' },
                { name: 'Red', hex: '#FF3B30' }
            ]
        },
        'iPhone 7 Plus': {
            basePrice: 70,
            image: 'images/phones/iphone-11.jpg', // Using iPhone 11 as fallback
            storage: { '32GB': 0, '128GB': 8, '256GB': 15 },
            colors: [
                { name: 'Black', hex: '#1C1C1E' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Rose Gold', hex: '#E8B4B8' },
                { name: 'Red', hex: '#FF3B30' },
                { name: 'Jet Black', hex: '#000000' }
            ]
        },
        'iPhone 7': {
            basePrice: 60,
            image: 'images/phones/iphone-11.jpg', // Using iPhone 11 as fallback
            storage: { '32GB': 0, '128GB': 8, '256GB': 15 },
            colors: [
                { name: 'Black', hex: '#1C1C1E' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Rose Gold', hex: '#E8B4B8' },
                { name: 'Red', hex: '#FF3B30' },
                { name: 'Jet Black', hex: '#000000' }
            ]
        }
    },
    Samsung: {
        'Galaxy S24 Ultra': {
            basePrice: 870, // SellUp: $870
            image: 'images/phones/galaxy-s24-ultra.jpg',
            storage: { '256GB': 0, '512GB': 100, '1TB': 200 },
            colors: [
                { name: 'Titanium Gray', hex: '#8E8E93' },
                { name: 'Titanium Black', hex: '#1C1C1E' },
                { name: 'Titanium Violet', hex: '#967BB6' },
                { name: 'Titanium Yellow', hex: '#F4D03F' }
            ]
        },
        'Galaxy S24+': {
            basePrice: 700, // SellUp: $700
            image: 'images/phones/galaxy-s24-plus.jpg',
            storage: { '256GB': 0, '512GB': 100 },
            colors: [
                { name: 'Onyx Black', hex: '#1C1C1E' },
                { name: 'Marble Gray', hex: '#8E8E93' },
                { name: 'Cobalt Violet', hex: '#967BB6' },
                { name: 'Amber Yellow', hex: '#F4D03F' }
            ]
        },
        'Galaxy S24': {
            basePrice: 600, // SellUp: $600
            image: 'images/phones/galaxy-s24.jpg',
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 },
            colors: [
                { name: 'Onyx Black', hex: '#1C1C1E' },
                { name: 'Marble Gray', hex: '#8E8E93' },
                { name: 'Cobalt Violet', hex: '#967BB6' },
                { name: 'Amber Yellow', hex: '#F4D03F' }
            ]
        },
        'Galaxy S23 Ultra': {
            basePrice: 670, // SellUp: $670
            image: 'images/phones/galaxy-s23-ultra.jpg',
            storage: { '256GB': 0, '512GB': 75, '1TB': 150 },
            colors: [
                { name: 'Phantom Black', hex: '#1C1C1E' },
                { name: 'Cream', hex: '#F5F5DC' },
                { name: 'Green', hex: '#2E8B57' },
                { name: 'Lavender', hex: '#967BB6' }
            ]
        },
        'Galaxy S23+': {
            basePrice: 445, // SellUp: $445
            image: 'images/phones/galaxy-s23-plus.jpg',
            storage: { '256GB': 0, '512GB': 50 },
            colors: [
                { name: 'Phantom Black', hex: '#1C1C1E' },
                { name: 'Cream', hex: '#F5F5DC' },
                { name: 'Green', hex: '#2E8B57' },
                { name: 'Lavender', hex: '#967BB6' }
            ]
        },
        'Galaxy S23': {
            basePrice: 400, // SellUp: $400
            image: 'images/phones/galaxy-s23.jpg',
            storage: { '128GB': 0, '256GB': 50, '512GB': 100 },
            colors: [
                { name: 'Phantom Black', hex: '#1C1C1E' },
                { name: 'Cream', hex: '#F5F5DC' },
                { name: 'Green', hex: '#2E8B57' },
                { name: 'Lavender', hex: '#967BB6' }
            ]
        },
        'Galaxy Z Fold 5': {
            basePrice: 650, // SellUp: $650
            image: 'images/phones/galaxy-z-fold5.jpg',
            storage: { '256GB': 0, '512GB': 75, '1TB': 150 },
            colors: [
                { name: 'Icy Blue', hex: '#B0C4DE' },
                { name: 'Phantom Black', hex: '#1C1C1E' },
                { name: 'Cream', hex: '#F5F5DC' }
            ]
        },
        'Galaxy Z Flip 5': {
            basePrice: 330, // SellUp: $330
            image: 'images/phones/galaxy-z-flip5.jpg',
            storage: { '256GB': 0, '512GB': 50 },
            colors: [
                { name: 'Mint', hex: '#98FB98' },
                { name: 'Graphite', hex: '#54524F' },
                { name: 'Cream', hex: '#F5F5DC' },
                { name: 'Lavender', hex: '#967BB6' }
            ]
        }
    },
    Xiaomi: {
        'Xiaomi 14 Ultra': {
            basePrice: 1200,
            image: 'images/phones/xiaomi-14.jpg',
            storage: { '256GB': 0, '512GB': 60, '1TB': 120 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' }
            ]
        },
        'Xiaomi 14': {
            basePrice: 800,
            image: 'images/phones/xiaomi-14.jpg',
            storage: { '256GB': 0, '512GB': 50 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Green', hex: '#2E8B57' }
            ]
        },
        'Xiaomi 13 Pro': {
            basePrice: 700,
            image: 'images/phones/xiaomi-14.jpg', // Using xiaomi-14 as fallback until we get proper image
            storage: { '256GB': 0, '512GB': 40 },
            colors: [
                { name: 'Ceramic Black', hex: '#1C1C1E' },
                { name: 'Ceramic White', hex: '#F5F5F0' },
                { name: 'Flora Green', hex: '#2E8B57' }
            ]
        },
        'Xiaomi 13': {
            basePrice: 550,
            image: 'images/phones/xiaomi-14.jpg', // Using xiaomi-14 as fallback until we get proper image
            storage: { '128GB': 0, '256GB': 30 },
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Flora Green', hex: '#2E8B57' }
            ]
        }
    },
    Google: {
        'Pixel 8 Pro': {
            basePrice: 900,
            image: 'images/phones/pixel-8-pro.jpg',
            storage: { '128GB': 0, '256GB': 40, '512GB': 80, '1TB': 150 },
            colors: [
                { name: 'Obsidian', hex: '#1C1C1E' },
                { name: 'Porcelain', hex: '#F5F5F0' },
                { name: 'Bay', hex: '#87CEEB' }
            ]
        },
        'Pixel 8': {
            basePrice: 650,
            image: 'images/phones/pixel-8.jpg',
            storage: { '128GB': 0, '256GB': 30 },
            colors: [
                { name: 'Obsidian', hex: '#1C1C1E' },
                { name: 'Hazel', hex: '#8B7355' },
                { name: 'Rose', hex: '#FFB6C1' }
            ]
        },
        'Pixel 7 Pro': {
            basePrice: 550,
            image: 'images/phones/pixel-8-pro.jpg',
            storage: { '128GB': 0, '256GB': 30, '512GB': 60 },
            colors: [
                { name: 'Obsidian', hex: '#1C1C1E' },
                { name: 'Snow', hex: '#F5F5F0' },
                { name: 'Hazel', hex: '#8B7355' }
            ]
        },
        'Pixel 7': {
            basePrice: 400,
            image: 'images/phones/pixel-8.jpg',
            storage: { '128GB': 0, '256GB': 25 },
            colors: [
                { name: 'Obsidian', hex: '#1C1C1E' },
                { name: 'Snow', hex: '#F5F5F0' },
                { name: 'Lemongrass', hex: '#9ACD32' }
            ]
        }
    },
    OnePlus: {
        'OnePlus 12': {
            basePrice: 800,
            image: 'images/phones/oneplus-12.jpg',
            storage: { '256GB': 0, '512GB': 60 },
            colors: [
                { name: 'Flowy Emerald', hex: '#2E8B57' },
                { name: 'Silky Black', hex: '#1C1C1E' }
            ]
        },
        'OnePlus 11': {
            basePrice: 550,
            image: 'images/phones/oneplus-11.jpg',
            storage: { '128GB': 0, '256GB': 40 },
            colors: [
                { name: 'Titan Black', hex: '#1C1C1E' },
                { name: 'Eternal Green', hex: '#2E8B57' }
            ]
        },
        'OnePlus 10 Pro': {
            basePrice: 450,
            image: 'images/phones/oneplus-10-pro.jpg',
            storage: { '128GB': 0, '256GB': 30, '512GB': 50 },
            colors: [
                { name: 'Volcanic Black', hex: '#1C1C1E' },
                { name: 'Emerald Forest', hex: '#2E8B57' }
            ]
        }
    },
    OPPO: {
        'OPPO Find X5 Pro': {
            basePrice: 600,
            image: 'images/phones/oppo-find-x5-pro.jpg',
            storage: { '256GB': 0, '512GB': 50 },
            colors: [
                { name: 'Ceramic Black', hex: '#1C1C1E' },
                { name: 'Ceramic White', hex: '#F5F5F0' },
                { name: 'Blue', hex: '#4169E1' }
            ]
        }
    }
};

// Make phoneDatabase globally available for admin.js
window.phoneDatabase = phoneDatabase;

// Define selectBrand function IMMEDIATELY (before DOM loads) so inline onclick handlers work
window.selectBrand = function(brand) {
    console.log('=== selectBrand called ===', brand);
    
    try {
        // Validate brand
        if (!brand) {
            console.error('No brand provided');
            alert('Please select a valid brand.');
            return false;
        }
        
        // Check if phoneDatabase exists
        if (typeof phoneDatabase === 'undefined' || !phoneDatabase) {
            console.error('phoneDatabase not available');
            alert('Phone database not loaded. Please refresh the page.');
            return false;
        }
        
        // Check if brand exists in database
        if (!phoneDatabase[brand]) {
            console.error('Brand not found in database:', brand, 'Available:', Object.keys(phoneDatabase));
            alert(`Brand "${brand}" not found. Available brands: ${Object.keys(phoneDatabase).join(', ')}`);
            return false;
        }
        
        // Update UI - add selected styling
        document.querySelectorAll('[data-brand]').forEach(b => {
            b.style.borderColor = '#e0e0e0';
            b.style.background = 'white';
        });
        
        const clickedBtn = document.querySelector(`[data-brand="${brand}"]`);
        if (clickedBtn) {
            clickedBtn.style.borderColor = '#C9A84C';
            clickedBtn.style.background = 'rgba(201, 168, 76, 0.1)';
        } else {
            console.warn('Clicked button not found for brand:', brand);
        }
        
        // Update state
        if (typeof quoteState === 'undefined') {
            quoteState = { brand: null, model: null };
        }
        quoteState.brand = brand;
        console.log('Brand set to:', quoteState.brand);
        
        // Show models - check if function exists
        if (typeof showModels === 'function') {
            showModels(quoteState.brand);
        } else {
            console.error('showModels function not available yet');
            // Retry after a short delay
            setTimeout(() => {
                if (typeof showModels === 'function') {
                    showModels(quoteState.brand);
                } else {
                    alert('Page is still loading. Please try again in a moment.');
                }
            }, 500);
        }
        
        return false; // Prevent default
    } catch (error) {
        console.error('Error in selectBrand:', error);
        alert('An error occurred. Please check the console for details.');
        return false;
    }
};

// State management
let quoteState = {
    brand: null,
    model: null,
    deviceType: null, // 'new-sealed', 'new-activated', 'used'
    storage: null,
    storageAdjustment: 0,
    color: null,
    hasReceipt: null, // 'yes' or 'no'
    country: 'local',
    bodyCondition: null,
    screenCondition: null,
    batteryHealth: null,
    issues: [],
    accessories: [],
    bookingType: null,
    finalPrice: 0,
    priceBreakdown: []
};

// Initialize - Only run quote-specific code on the quote page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the quote page by looking for key elements
    const quoteWizard = document.querySelector('.quote-wizard');
    const brandSelectorExists = document.querySelector('[data-brand]');
    
    // Exit early if not on quote page (phoneDatabase is still available for admin.js)
    if (!quoteWizard && !brandSelectorExists) {
        console.log('Quote.js: Not on quote page, skipping initialization');
        return;
    }
    
    console.log('=== Quote page detected, initializing ===');
    console.log('phoneDatabase available:', typeof phoneDatabase !== 'undefined', 'Brands:', phoneDatabase ? Object.keys(phoneDatabase) : 'N/A');
    console.log('window.selectBrand available:', typeof window.selectBrand !== 'undefined');
    
    // Ensure selectBrand is available globally
    if (typeof window.selectBrand === 'undefined') {
        console.error('window.selectBrand is not defined! This will cause button clicks to fail.');
    } else {
        console.log('✓ window.selectBrand is available');
    }
    
    // Force enable pointer events on all interactive elements
    setTimeout(() => {
        const interactiveElements = [
            '[data-brand]',
            '.model-card',
            '.brand-buttons',
            '.model-grid',
            '.brand-selector',
            '.model-selector',
            '.wizard-step.active'
        ];
        
        interactiveElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = el.hasAttribute('data-brand') || el.classList.contains('model-card') ? 'pointer' : '';
            });
        });
        
        console.log('Pointer events force-enabled on all interactive elements');
    }, 100);
    
    // Initialize brand selector with click handlers
    initBrandSelector();
    
    // Check for URL parameters (coming from main page)
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    const modelParam = urlParams.get('model');
    const typeParam = urlParams.get('type'); // new or used
    const directParam = urlParams.get('direct'); // skip device type selection

    // Store the type preference for later use in Step 2
    if (typeParam) {
        window.preferredDeviceType = typeParam === 'new' ? 'new-sealed' : 'used';
        window.isDirect = directParam === 'true';
        console.log('Trade-in type preference:', window.preferredDeviceType);
        console.log('Direct evaluation mode:', window.isDirect);

        // If direct mode, auto-select device type immediately
        if (window.isDirect && typeParam) {
            quoteState.deviceType = typeParam === 'new' ? 'new-sealed' : 'used';
            console.log('Auto-selected device type:', quoteState.deviceType);
        }
    }
    
    // Auto-select Apple brand if no URL params (iPhone only focus)
    if (!brandParam && !modelParam) {
        setTimeout(() => {
            const appleBtn = document.querySelector('[data-brand="Apple"]');
            if (appleBtn) {
                appleBtn.click();
            }
        }, 200);
    }
    
    if (brandParam && modelParam) {
        // Both brand and model provided - skip directly to Step 2
        console.log('Direct link detected:', { brand: brandParam, model: modelParam });
        
        // Normalize model name (remove "Google" prefix if present, ensure OPPO prefix)
        let normalizedModel = modelParam.trim();
        if (brandParam === 'Google' && normalizedModel.startsWith('Google ')) {
            normalizedModel = normalizedModel.replace('Google ', '');
        } else if (brandParam === 'OPPO' && !normalizedModel.startsWith('OPPO ')) {
            // Ensure OPPO models have "OPPO" prefix
            if (normalizedModel.toLowerCase().includes('find x5 pro')) {
                normalizedModel = 'OPPO Find X5 Pro';
            } else if (normalizedModel.toLowerCase().includes('find x5')) {
                normalizedModel = 'OPPO Find X5 Pro';
            }
        }
        
        console.log('Normalized model:', normalizedModel);
        
        // Try exact match first
        let foundModel = null;
        if (phoneDatabase[brandParam] && phoneDatabase[brandParam][normalizedModel]) {
            foundModel = normalizedModel;
        } else {
            // Try to find closest match
            if (phoneDatabase[brandParam]) {
                const availableModels = Object.keys(phoneDatabase[brandParam]);
                console.log('Available models for', brandParam + ':', availableModels);
                foundModel = availableModels.find(m => 
                    m.toLowerCase() === normalizedModel.toLowerCase() ||
                    normalizedModel.toLowerCase().includes(m.toLowerCase()) ||
                    m.toLowerCase().includes(normalizedModel.toLowerCase())
                );
            }
        }
        
        if (foundModel) {
            // Set state directly
            quoteState.brand = brandParam;
            quoteState.model = foundModel;
            
            console.log('Model matched:', { original: modelParam, matched: foundModel });
            
            // Hide brand selector and model selector - skip directly to Step 2
            const brandSelector = document.querySelector('.brand-selector');
            const modelSelector = document.getElementById('model-selector');
            
            if (brandSelector) brandSelector.style.display = 'none';
            if (modelSelector) modelSelector.style.display = 'none';
            
            // Directly populate Step 2 and go to it (skip model selection)
            console.log('Skipping to Step 2 with model:', foundModel);
            populateStep2();
            
            // Update progress bar
            setTimeout(() => {
                goToStep(2);
            }, 100);
        } else {
            console.warn('Model not found in database:', { brand: brandParam, model: modelParam, normalized: normalizedModel });
            console.log('Available models for', brandParam + ':', phoneDatabase[brandParam] ? Object.keys(phoneDatabase[brandParam]) : 'none');
            // Fallback: try to select brand and show models
            const brandBtn = document.querySelector(`[data-brand="${brandParam}"]`);
            if (brandBtn) {
                brandBtn.click();
            }
        }
    } else if (brandParam) {
        // Only brand provided - select brand and show models
        const brandBtn = document.querySelector(`[data-brand="${brandParam}"]`);
        if (brandBtn) {
            brandBtn.click();
        }
    }
});

// selectBrand is defined at the top of the file (lines 608-676) for immediate availability
// Do NOT define it again here - it causes duplicate definition bugs!

// Brand Selection
function initBrandSelector() {
    console.log('=== initBrandSelector called ===');
    const brandBtns = document.querySelectorAll('.brand-btn');
    console.log('Found brand buttons:', brandBtns.length);
    
    if (brandBtns.length === 0) {
        console.warn('No brand buttons found!');
        return;
    }
    
    brandBtns.forEach((btn, index) => {
        const brand = btn.dataset.brand;
        console.log(`Setting up brand button ${index + 1}:`, brand);
        
        // Ensure button is clickable
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
        btn.style.position = 'relative';
        btn.style.zIndex = '10';
        
        // Add event listener (backup to inline onclick)
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Brand button clicked (event listener):', brand);
            window.selectBrand(brand);
        });
        
        // Also add mousedown for better compatibility
        btn.addEventListener('mousedown', function(e) {
            console.log('Brand button mousedown:', brand);
        });
        
        // Add touchstart for mobile
        btn.addEventListener('touchstart', function(e) {
            console.log('Brand button touchstart:', brand);
            window.selectBrand(brand);
        });
    });
    
    console.log('=== initBrandSelector completed ===');
}

// Show Models for Selected Brand
function showModels(brand) {
    console.log('=== showModels called ===', { brand, phoneDatabaseExists: !!phoneDatabase });
    
    const modelSelector = document.getElementById('model-selector');
    const modelGrid = document.getElementById('model-grid');
    
    if (!modelSelector || !modelGrid) {
        console.error('Model selector elements not found!', { modelSelector: !!modelSelector, modelGrid: !!modelGrid });
        return;
    }
    
    if (!phoneDatabase || !phoneDatabase[brand]) {
        console.error('Brand not found in database:', brand, 'Available brands:', Object.keys(phoneDatabase || {}));
        modelSelector.style.display = 'none';
        return;
    }

    // Get models from database
    let modelsToDisplay = Object.keys(phoneDatabase[brand]);
    console.log('Models found in database:', modelsToDisplay.length, modelsToDisplay);
    
    // Filter by admin display settings if available
    if (typeof adminManager !== 'undefined' && adminManager && adminManager.phones && adminManager.phones.length > 0) {
        console.log('Admin manager available, filtering models');
        const adminPhones = adminManager.phones.filter(p => p.brand === brand && p.display !== false);
        console.log('Admin phones for brand:', adminPhones.map(p => p.model));
        
        // Only show models that are enabled in admin panel
        modelsToDisplay = modelsToDisplay.filter(modelName => {
            // If admin has this model, check display setting
            const adminPhone = adminPhones.find(p => p.model === modelName);
            if (adminPhone !== undefined) {
                return adminPhone.display !== false;
            }
            // If admin doesn't have this model, show it by default (for backward compatibility)
            return true;
        });
        console.log('Filtered models:', modelsToDisplay.length, modelsToDisplay);
    } else {
        console.log('Admin manager not available, showing all models');
    }
    
    if (modelsToDisplay.length === 0) {
        console.warn('No models to display after filtering');
        modelGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light);">No models available for this brand.</p>';
        modelSelector.style.display = 'block';
        return;
    }
    
    modelGrid.innerHTML = '';

    modelsToDisplay.forEach((modelName, index) => {
        const model = phoneDatabase[brand][modelName];
        
        if (!model) {
            console.warn('Model data not found:', modelName);
            return;
        }
        
        // Get image from admin if available, otherwise use database image
        let imageUrl = model.image || 'images/phones/iphone-16-pro-max.jpg';
        if (typeof adminManager !== 'undefined' && adminManager && adminManager.phones) {
            const adminPhone = adminManager.phones.find(p => p.brand === brand && p.model === modelName);
            if (adminPhone && adminPhone.image) {
                imageUrl = adminPhone.image;
            }
        }
        
        // Get base price from admin if available
        let basePrice = model.basePrice || 0;
        if (typeof adminManager !== 'undefined' && adminManager && adminManager.phones) {
            const adminPhone = adminManager.phones.find(p => p.brand === brand && p.model === modelName);
            if (adminPhone && adminPhone.basePrice !== undefined) {
                basePrice = adminPhone.basePrice;
            }
        }
        
        // Create card with inline onclick (works reliably)
        const card = document.createElement('button');
        card.dataset.model = modelName;
        card.setAttribute('onclick', `window.selectModel('${modelName.replace(/'/g, "\\'")}', this); return false;`);
        
        // Apply styling inline to avoid CSS conflicts
        card.style.cssText = `
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        `;
        
        card.onmouseover = function() {
            this.style.borderColor = '#C9A84C';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        };
        
        card.onmouseout = function() {
            if (!this.classList.contains('selected')) {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = '';
            }
        };
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${modelName}" 
                 style="width: 70px; height: 90px; object-fit: contain; margin-bottom: 0.8rem; pointer-events: none;"
                 onerror="this.onerror=null; this.src='images/phones/iphone-16-pro-max.jpg';">
            <h4 style="color: #2c2c2c; font-size: 0.9rem; margin-bottom: 0.3rem; pointer-events: none;">${modelName}</h4>
            <p style="color: #C9A84C; font-size: 0.85rem; font-weight: 600; pointer-events: none;">From $${basePrice}</p>
        `;
        
        modelGrid.appendChild(card);
        console.log(`Added model card ${index + 1}/${modelsToDisplay.length}:`, modelName);
    });

    // Force show the model selector
    modelSelector.style.display = 'block';
    modelSelector.style.visibility = 'visible';
    modelSelector.classList.add('show');
    
    // Scroll to model selector smoothly
    setTimeout(() => {
        modelSelector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    console.log('=== showModels completed ===', { modelsDisplayed: modelsToDisplay.length });
}

// Make selectModel globally available for inline onclick
window.selectModel = selectModel;

// Select Model
function selectModel(modelName, cardElement) {
    console.log('=== selectModel called ===', { 
        modelName, 
        currentBrand: quoteState.brand,
        cardElement: !!cardElement 
    });
    
    // Ensure brand is set (should be set when brand button is clicked)
    if (!quoteState.brand) {
        console.error('Brand not set! Trying to detect from context...');
        // Try to get brand from the clicked card's parent context
        if (cardElement) {
            const brandBtn = document.querySelector('.brand-btn.selected');
            if (brandBtn) {
                quoteState.brand = brandBtn.dataset.brand;
                console.log('Detected brand from selected button:', quoteState.brand);
            }
        }
        
        if (!quoteState.brand) {
            alert('Please select a brand first.');
            return;
        }
    }
    
    // Validate model exists
    if (!phoneDatabase || !phoneDatabase[quoteState.brand] || !phoneDatabase[quoteState.brand][modelName]) {
        console.error('Model not found:', { 
            brand: quoteState.brand, 
            model: modelName,
            availableBrands: Object.keys(phoneDatabase || {}),
            availableModels: phoneDatabase?.[quoteState.brand] ? Object.keys(phoneDatabase[quoteState.brand]) : []
        });
        alert('Model not found. Please try again.');
        return;
    }
    
    quoteState.model = modelName;
    
    // Update selected state
    document.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
    
    // If cardElement provided (programmatic call), use it; otherwise try to find it
    if (cardElement) {
        cardElement.classList.add('selected');
    } else {
        // Find the card by model name
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            const h4 = card.querySelector('h4');
            if (h4 && h4.textContent.trim() === modelName) {
                card.classList.add('selected');
            }
        });
    }

    // Populate Step 2
    try {
        populateStep2();
        console.log('Step 2 populated successfully');
    } catch (error) {
        console.error('Error populating Step 2:', error);
        console.error('Error details:', {
            brand: quoteState.brand,
            model: quoteState.model,
            errorMessage: error.message,
            errorStack: error.stack
        });
        alert('Error loading device options: ' + error.message + '\n\nPlease try selecting the model again or refresh the page.');
        return;
    }
    
    // Go to Step 2
    setTimeout(() => {
        try {
            goToStep(2);
            console.log('Navigated to Step 2');
        } catch (error) {
            console.error('Error navigating to Step 2:', error);
            alert('Error navigating to next step. Please try again.');
        }
    }, 300);
}

// Populate Step 2 with device options
function populateStep2() {
    console.log('populateStep2 called:', { brand: quoteState.brand, model: quoteState.model });
    
    // Validate required data
    if (!quoteState.brand || !quoteState.model) {
        throw new Error('Brand or model not set');
    }
    
    if (!phoneDatabase[quoteState.brand] || !phoneDatabase[quoteState.brand][quoteState.model]) {
        throw new Error(`Model ${quoteState.model} not found in database`);
    }
    
    let model = phoneDatabase[quoteState.brand][quoteState.model];
    
    // Check admin data for updated prices and images
    if (typeof adminManager !== 'undefined' && adminManager.phones) {
        const adminPhone = adminManager.phones.find(p => p.brand === quoteState.brand && p.model === quoteState.model);
        if (adminPhone) {
            console.log('Found admin phone data:', adminPhone);
            
            // Convert admin format to quote format
            // Admin uses: storages (array), storagePrices (object), colors (array of strings)
            // Quote needs: storage (object with modifiers), colors (array of objects with name/hex)
            
            let storageObj = model.storage; // Default from database
            if (adminPhone.storages && adminPhone.storages.length > 0) {
                // Convert admin storagePrices to storage modifiers
                storageObj = {};
                const basePrice = adminPhone.basePrice !== undefined ? adminPhone.basePrice : model.basePrice;
                
                adminPhone.storages.forEach(storage => {
                    if (adminPhone.storagePrices && adminPhone.storagePrices[storage] !== undefined) {
                        // Calculate modifier from absolute price
                        storageObj[storage] = adminPhone.storagePrices[storage] - basePrice;
                    } else if (model.storage && model.storage[storage] !== undefined) {
                        // Use original modifier if admin doesn't have this storage
                        storageObj[storage] = model.storage[storage];
                    } else {
                        // Default modifier
                        storageObj[storage] = 0;
                    }
                });
            }
            
            // Convert admin colors (strings) to quote format (objects with name/hex)
            let colorsArray = model.colors; // Default from database
            if (adminPhone.colors && adminPhone.colors.length > 0) {
                colorsArray = adminPhone.colors.map(colorName => {
                    // Try to find color in original model colors
                    const originalColor = model.colors.find(c => 
                        (typeof c === 'string' ? c : c.name) === colorName
                    );
                    
                    if (originalColor) {
                        // Return original format (with hex)
                        return typeof originalColor === 'string' 
                            ? { name: originalColor, hex: '#CCCCCC' }
                            : originalColor;
                    } else {
                        // Create new color object
                        return { name: colorName, hex: '#CCCCCC' };
                    }
                });
            }
            
            // Merge admin data with database model
            model = {
                ...model,
                basePrice: adminPhone.basePrice !== undefined ? adminPhone.basePrice : model.basePrice,
                image: adminPhone.image || model.image,
                storage: storageObj,
                colors: colorsArray
            };
        }
    }
    
    // Validate model data
    if (!model.storage || Object.keys(model.storage).length === 0) {
        throw new Error('No storage options available');
    }
    
    if (!model.colors || model.colors.length === 0) {
        throw new Error('No color options available');
    }
    
    // Set device info
    const deviceNameEl = document.getElementById('selected-device-name');
    const deviceImageEl = document.getElementById('selected-device-image');
    
    if (!deviceNameEl || !deviceImageEl) {
        throw new Error('Step 2 elements not found');
    }
    
    deviceNameEl.textContent = quoteState.model;
    deviceImageEl.src = model.image;
    deviceImageEl.onerror = function() {
        this.onerror = null;
        this.src = 'images/phones/iphone-16-pro-max.jpg';
    };

    // Storage options
    const storageOptions = document.getElementById('storage-options');
    if (!storageOptions) {
        throw new Error('Storage options container not found');
    }
    
    storageOptions.innerHTML = '';
    Object.keys(model.storage).forEach(storage => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.value = storage;
        btn.dataset.adjustment = model.storage[storage];
        btn.textContent = storage;
        btn.addEventListener('click', () => selectOption('storage', storage, model.storage[storage], btn));
        storageOptions.appendChild(btn);
    });

    // Color options
    const colorOptions = document.getElementById('color-options');
    if (!colorOptions) {
        throw new Error('Color options container not found');
    }
    
    colorOptions.innerHTML = '';
    model.colors.forEach(color => {
        const colorName = typeof color === 'string' ? color : color.name;
        const colorHex = typeof color === 'string' ? '#CCCCCC' : (color.hex || '#CCCCCC');
        
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.value = colorName;
        btn.innerHTML = `
            <span class="color-swatch" style="background: ${colorHex}; border: 2px solid ${colorHex === '#FFFFFF' || colorHex === '#F5F5F0' ? 'rgba(0,0,0,0.2)' : 'transparent'}"></span>
            ${colorName}
        `;
        btn.addEventListener('click', () => selectOption('color', colorName, 0, btn));
        colorOptions.appendChild(btn);
    });
    
    console.log('populateStep2 completed successfully');

    // Initialize device type selection
    initDeviceTypeSelection();

    // Auto-select device type if coming from Trade In buttons
    if (window.preferredDeviceType) {
        setTimeout(() => {
            const deviceTypeBtn = document.querySelector(`[data-value="${window.preferredDeviceType}"]`);
            if (deviceTypeBtn) {
                deviceTypeBtn.click();
                console.log('Auto-selected device type:', window.preferredDeviceType);

                // Hide device type section if in direct mode (coming from sell-phones.html)
                if (window.isDirect) {
                    const deviceTypeSection = document.querySelector('.device-type-section');
                    if (deviceTypeSection) {
                        deviceTypeSection.style.display = 'none';
                        console.log('Hidden device type section (direct mode)');
                    }
                }
            }
        }, 100);
    }
    
    // Receipt options
    initOptionButtons('receipt-options', 'hasReceipt');
    
    // Country options
    initOptionButtons('country-options', 'country');
    initOptionButtons('body-options', 'bodyCondition');
    initOptionButtons('screen-options', 'screenCondition');
    initOptionButtons('battery-options', 'batteryHealth');
    initCheckboxButtons('issue-options', 'issues');
    initCheckboxButtons('accessory-options', 'accessories');
    
    // Initialize navigation buttons (Get Quote, Back, etc.)
    initNavigationButtons();
    
    // Initialize live price estimate
    updateLivePriceEstimate();
}

// Initialize Device Type Selection (New/Used)
function initDeviceTypeSelection() {
    const deviceTypeContainer = document.getElementById('device-type-options');
    const usedConditionsContainer = document.getElementById('used-device-conditions');
    
    if (!deviceTypeContainer) return;
    
    deviceTypeContainer.querySelectorAll('.device-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update selection visual
            deviceTypeContainer.querySelectorAll('.device-type-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update state
            quoteState.deviceType = this.dataset.value;
            
            // Show/hide used device conditions
            if (usedConditionsContainer) {
                if (quoteState.deviceType === 'used') {
                    usedConditionsContainer.classList.add('visible');
                    // Reset used device conditions when switching to used
                    quoteState.bodyCondition = null;
                    quoteState.screenCondition = null;
                    quoteState.batteryHealth = null;
                    quoteState.issues = [];
                    // For used devices, receipt is not required - set to 'no' automatically
                    quoteState.hasReceipt = 'no';
                } else {
                    usedConditionsContainer.classList.remove('visible');
                    // For new devices, set best conditions automatically
                    quoteState.bodyCondition = 'A';
                    quoteState.screenCondition = 'A';
                    quoteState.batteryHealth = '91-100';
                    quoteState.issues = [];
                    // Reset receipt selection for new devices
                    quoteState.hasReceipt = null;
                }
            }
            
            // Show/hide receipt section (only for NEW phones - sealed/activated)
            const receiptSection = document.getElementById('receipt-section');
            if (receiptSection) {
                if (quoteState.deviceType === 'used') {
                    receiptSection.style.display = 'none';
                } else {
                    receiptSection.style.display = 'block';
                }
            }
            
            // Update live price estimate
            updateLivePriceEstimate();
        });
    });
}

// Check if all required fields are selected
function areRequiredFieldsSelected() {
    // Check basic required fields
    if (!quoteState.brand || !quoteState.model) return false;
    if (!quoteState.deviceType) return false;
    if (!quoteState.storage) return false;
    if (!quoteState.color) return false;
    if (!quoteState.country) return false;
    
    // For NEW devices (sealed/activated), receipt is required
    if (quoteState.deviceType !== 'used') {
        if (quoteState.hasReceipt === undefined || quoteState.hasReceipt === null) return false;
    }
    
    // For USED devices, check condition fields
    if (quoteState.deviceType === 'used') {
        if (!quoteState.bodyCondition) return false;
        if (!quoteState.screenCondition) return false;
        if (!quoteState.batteryHealth) return false;
    }
    
    return true;
}

// Update Live Price Estimate
function updateLivePriceEstimate() {
    const estimatePriceEl = document.getElementById('estimate-price');
    const estimateContainer = document.getElementById('live-price-estimate');
    if (!estimatePriceEl || !estimateContainer) return;
    
    // Only show and calculate if we have all required selections
    if (!areRequiredFieldsSelected()) {
        estimateContainer.classList.remove('visible');
        estimatePriceEl.textContent = '$0';
        return;
    }
    
    // Show the price estimate container
    estimateContainer.classList.add('visible');
    
    let model = phoneDatabase[quoteState.brand]?.[quoteState.model];
    if (!model) {
        estimatePriceEl.textContent = '$0';
        return;
    }
    
    let price = 0;
    
    // For USED devices, try DIRECT PRICE LOOKUP first (no calculations!)
    if (quoteState.deviceType === 'used') {
        const accessories = quoteState.accessories.map(a => a.value);
        const issues = quoteState.issues.map(i => i.value);
        const directPrice = getDirectPrice(
            quoteState.model,
            quoteState.storage,
            quoteState.color || 'Black',
            quoteState.country,
            quoteState.bodyCondition,
            quoteState.screenCondition,
            quoteState.batteryHealth,
            issues,
            accessories
        );
        
        if (directPrice !== null) {
            price = directPrice;
            
            // Ensure minimum price
            price = Math.max(50, price);
            
            // Animate price update
            estimatePriceEl.textContent = '$' + price.toLocaleString();
            estimatePriceEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                estimatePriceEl.style.transform = 'scale(1)';
            }, 150);
            return; // Exit early - used direct lookup!
        }
    }
    
    // FALLBACK: Calculate price if direct lookup not available
    // Check admin data for updated base price
    if (typeof adminManager !== 'undefined' && adminManager.phones) {
        const adminPhone = adminManager.phones.find(p => p.brand === quoteState.brand && p.model === quoteState.model);
        if (adminPhone && adminPhone.basePrice !== undefined) {
            model = { ...model, basePrice: adminPhone.basePrice };
        }
    }
    
    price = model.basePrice;
    
    // Device type bonus for NEW phones
    if (quoteState.deviceType === 'new-sealed') {
        // Try direct lookup for new sealed
        const modelLookup = directPriceLookup?.models?.[quoteState.model];
        if (modelLookup?.storage?.[quoteState.storage]?.new_sealed) {
            price = modelLookup.storage[quoteState.storage].new_sealed;
        } else {
            price += 200;
            if (quoteState.storage && model.storage[quoteState.storage]) {
                price += model.storage[quoteState.storage];
            }
        }
    } else if (quoteState.deviceType === 'new-activated') {
        // Try direct lookup for new activated
        const modelLookup = directPriceLookup?.models?.[quoteState.model];
        if (modelLookup?.storage?.[quoteState.storage]?.new_activated) {
            price = modelLookup.storage[quoteState.storage].new_activated;
        } else {
            price += 100;
            if (quoteState.storage && model.storage[quoteState.storage]) {
                price += model.storage[quoteState.storage];
            }
        }
    } else {
        // Used device - fallback calculation
        if (quoteState.storage && model.storage[quoteState.storage] !== undefined) {
            price += model.storage[quoteState.storage];
        }
        
        // Country deduction
        if (quoteState.country === 'export') {
            price -= 50;
        }
        
        // Body condition
        const bodyDeduction = getDeduction('body-options', quoteState.bodyCondition);
        price -= bodyDeduction;
        
        // Screen condition
        const screenDeduction = getDeduction('screen-options', quoteState.screenCondition);
        price -= screenDeduction;
        
        // Battery health
        const batteryDeduction = getDeduction('battery-options', quoteState.batteryHealth);
        price -= batteryDeduction;
        
        // Issues
        quoteState.issues.forEach(issue => {
            price -= issue.deduction;
        });
    }
    
    // Receipt bonus (for new phones)
    if (quoteState.hasReceipt === 'yes' && quoteState.deviceType !== 'used') {
        price += 30;
    }
    
    // Accessories bonus
    quoteState.accessories.forEach(acc => {
        price += acc.bonus;
    });
    
    // Ensure minimum price
    price = Math.max(50, price);
    
    // Animate price update
    estimatePriceEl.textContent = '$' + price.toLocaleString();
    estimatePriceEl.style.transform = 'scale(1.1)';
    setTimeout(() => {
        estimatePriceEl.style.transform = 'scale(1)';
    }, 150);
}

// Initialize option buttons
function initOptionButtons(containerId, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            quoteState[stateKey] = this.dataset.value;
            
            // Update live price estimate
            updateLivePriceEstimate();
        });
    });
}

// Initialize checkbox buttons
function initCheckboxButtons(containerId, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('selected');
            const value = this.dataset.value;
            
            if (this.classList.contains('selected')) {
                quoteState[stateKey].push({
                    value: value,
                    deduction: parseInt(this.dataset.deduction) || 0,
                    bonus: parseInt(this.dataset.bonus) || 0
                });
            } else {
                quoteState[stateKey] = quoteState[stateKey].filter(item => item.value !== value);
            }
            
            // Update live price estimate
            updateLivePriceEstimate();
        });
    });
}

// Select option
function selectOption(key, value, adjustment, btn) {
    const container = btn.parentElement;
    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    quoteState[key] = value;
    if (key === 'storage') {
        quoteState.storageAdjustment = adjustment;
    }
    
    // Update live price estimate
    updateLivePriceEstimate();
}

// Calculate Quote
function calculateQuote() {
    let model = phoneDatabase[quoteState.brand][quoteState.model];

    // Get admin phone data for accurate pricing
    let adminPhone = null;
    if (typeof adminManager !== 'undefined') {
        adminPhone = adminManager.phones.find(p => p.brand === quoteState.brand && p.model === quoteState.model);
    }

    let price = 0;
    const breakdown = [];

    // Calculate base price based on device type and storage
    if (quoteState.deviceType === 'new-sealed') {
        // Use NEW SEALED price from admin data
        if (adminPhone && adminPhone.newPhonePrices && adminPhone.newPhonePrices[quoteState.storage]) {
            price = adminPhone.newPhonePrices[quoteState.storage];
            breakdown.push({ label: `${quoteState.model} ${quoteState.storage} (New Sealed)`, value: price, type: 'base' });
        } else if (adminPhone && adminPhone.storagePrices && adminPhone.storagePrices[quoteState.storage]) {
            // Fallback: Use used price * 1.15
            price = Math.round(adminPhone.storagePrices[quoteState.storage] * 1.15);
            breakdown.push({ label: `${quoteState.model} ${quoteState.storage} (New Sealed)`, value: price, type: 'base' });
        } else {
            // Final fallback: Use old base price + 200
            price = (adminPhone?.basePrice || model.basePrice) + 200;
            breakdown.push({ label: `${quoteState.model} Base Price`, value: price, type: 'base' });
        }
    } else if (quoteState.deviceType === 'new-activated') {
        // Use NEW SEALED price - $150
        if (adminPhone && adminPhone.newPhonePrices && adminPhone.newPhonePrices[quoteState.storage]) {
            const sealedPrice = adminPhone.newPhonePrices[quoteState.storage];
            price = sealedPrice - 150;
            breakdown.push({ label: `${quoteState.model} ${quoteState.storage} (New Sealed)`, value: sealedPrice, type: 'base' });
            breakdown.push({ label: 'Activated Deduction', value: -150, type: 'deduction' });
        } else if (adminPhone && adminPhone.storagePrices && adminPhone.storagePrices[quoteState.storage]) {
            // Fallback: Use used price * 1.15 - 150
            const sealedPrice = Math.round(adminPhone.storagePrices[quoteState.storage] * 1.15);
            price = sealedPrice - 150;
            breakdown.push({ label: `${quoteState.model} ${quoteState.storage} (New Sealed)`, value: sealedPrice, type: 'base' });
            breakdown.push({ label: 'Activated Deduction', value: -150, type: 'deduction' });
        } else {
            // Final fallback: Use old base price + 100
            price = (adminPhone?.basePrice || model.basePrice) + 100;
            breakdown.push({ label: `${quoteState.model} Base Price`, value: price, type: 'base' });
        }
    } else {
        // USED device - use storage-specific used price
        if (adminPhone && adminPhone.storagePrices && adminPhone.storagePrices[quoteState.storage]) {
            price = adminPhone.storagePrices[quoteState.storage];
            breakdown.push({ label: `${quoteState.model} ${quoteState.storage} (Used)`, value: price, type: 'base' });
        } else {
            // Fallback to old base price
            price = adminPhone?.basePrice || model.basePrice;
            breakdown.push({ label: `${quoteState.model} Base Price`, value: price, type: 'base' });
        }
    }

    // Receipt bonus
    if (quoteState.hasReceipt === 'yes') {
        price += 30;
        breakdown.push({ label: 'Official Receipt Available', value: 30, type: 'bonus' });
    }

    // Country adjustment
    if (quoteState.country === 'export') {
        price -= 50;
        breakdown.push({ label: 'Export Set', value: -50, type: 'deduction' });
    }

    // Only apply condition deductions for used devices
    if (quoteState.deviceType === 'used') {
        // Body condition
        const bodyDeduction = getDeduction('body-options', quoteState.bodyCondition);
        if (bodyDeduction > 0) {
            price -= bodyDeduction;
            breakdown.push({ label: `Body: Grade ${quoteState.bodyCondition}`, value: -bodyDeduction, type: 'deduction' });
        }

        // Screen condition
        const screenDeduction = getDeduction('screen-options', quoteState.screenCondition);
        if (screenDeduction > 0) {
            price -= screenDeduction;
            breakdown.push({ label: `Screen: Grade ${quoteState.screenCondition}`, value: -screenDeduction, type: 'deduction' });
        }

        // Battery health
        const batteryDeduction = getDeduction('battery-options', quoteState.batteryHealth);
        if (batteryDeduction > 0) {
            price -= batteryDeduction;
            breakdown.push({ label: `Battery: ${quoteState.batteryHealth}%`, value: -batteryDeduction, type: 'deduction' });
        }

        // Issues
        quoteState.issues.forEach(issue => {
            price -= issue.deduction;
            breakdown.push({ label: `Issue: ${issue.value}`, value: -issue.deduction, type: 'deduction' });
        });
    }

    // Accessories
    quoteState.accessories.forEach(acc => {
        price += acc.bonus;
        breakdown.push({ label: `Accessory: ${acc.value}`, value: acc.bonus, type: 'bonus' });
    });

    quoteState.finalPrice = Math.max(50, price);
    quoteState.priceBreakdown = breakdown;

    return quoteState.finalPrice;
}

// Get deduction from button
function getDeduction(containerId, value) {
    const container = document.getElementById(containerId);
    const btn = container.querySelector(`[data-value="${value}"]`);
    return btn ? parseInt(btn.dataset.deduction) || 0 : 0;
}

// Display Quote Result
function displayQuoteResult() {
    const model = phoneDatabase[quoteState.brand][quoteState.model];
    
    // Format device type for display
    let deviceTypeDisplay = 'Used';
    if (quoteState.deviceType === 'new-sealed') deviceTypeDisplay = 'New Sealed';
    else if (quoteState.deviceType === 'new-activated') deviceTypeDisplay = 'New Activated';
    
    document.getElementById('quote-device-name').textContent = quoteState.model;
    document.getElementById('quote-device-image').src = model.image;
    
    // Show device type, storage, color, and condition (only for used)
    let specsText = `${deviceTypeDisplay} - ${quoteState.storage} - ${quoteState.color}`;
    if (quoteState.deviceType === 'used' && quoteState.bodyCondition) {
        specsText += ` - Grade ${quoteState.bodyCondition}`;
    }
    document.getElementById('quote-device-specs').textContent = specsText;
    document.getElementById('quote-amount').textContent = `$${quoteState.finalPrice}`;

    // Price breakdown
    const breakdownContainer = document.getElementById('price-breakdown');
    breakdownContainer.innerHTML = '';
    
    quoteState.priceBreakdown.forEach(item => {
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        const valueClass = item.type === 'deduction' ? 'deduction' : item.type === 'bonus' ? 'bonus' : '';
        const valuePrefix = item.value >= 0 ? '+' : '';
        div.innerHTML = `
            <span>${item.label}</span>
            <span class="${valueClass}">${valuePrefix}$${item.value}</span>
        `;
        breakdownContainer.appendChild(div);
    });

    // Total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'breakdown-item total';
    totalDiv.innerHTML = `
        <span>Final Quote</span>
        <span>SGD $${quoteState.finalPrice}</span>
    `;
    breakdownContainer.appendChild(totalDiv);
}

// Navigation
function goToStep(step) {
    console.log('goToStep called:', step);
    
    try {
        // Update progress
        const progressSteps = document.querySelectorAll('.progress-step');
        if (progressSteps.length > 0) {
            progressSteps.forEach((el, index) => {
                el.classList.remove('active', 'completed');
                if (index + 1 < step) el.classList.add('completed');
                if (index + 1 === step) el.classList.add('active');
            });
        }

        // Show step
        const allSteps = document.querySelectorAll('.wizard-step');
        if (allSteps.length === 0) {
            console.error('No wizard steps found!');
            return;
        }
        
        allSteps.forEach(el => el.classList.remove('active'));
        
        const targetStep = document.getElementById(`step-${step}`);
        if (!targetStep) {
            console.error(`Step ${step} element not found!`);
            return;
        }
        
        targetStep.classList.add('active');
        console.log(`Step ${step} activated`);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error in goToStep:', error);
        alert('Error navigating. Please refresh the page and try again.');
    }
}

function initNavigationButtons() {
    // Only run on quote page - check if elements exist first
    const backToStep1 = document.getElementById('back-to-step-1');
    const backToStep2 = document.getElementById('back-to-step-2');
    const backToStep3 = document.getElementById('back-to-step-3');
    const getQuoteBtn = document.getElementById('get-quote-btn');
    const proceedBooking = document.getElementById('proceed-booking');
    
    // Exit early if not on quote page
    if (!backToStep1 && !backToStep2 && !backToStep3) {
        return;
    }
    
    if (backToStep1) backToStep1.addEventListener('click', () => goToStep(1));
    if (backToStep2) backToStep2.addEventListener('click', () => goToStep(2));
    if (backToStep3) backToStep3.addEventListener('click', () => goToStep(3));

    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', function() {
            // Validate device type first
            if (!quoteState.deviceType) {
                alert('Please select your device condition type (New Sealed, New Activated, or Used).');
                return;
            }
            
            // Validate basic selections
            if (!quoteState.storage || !quoteState.color) {
                alert('Please select storage and color options.');
                return;
            }
            
            // Validate receipt selection (only required for NEW phones)
            if (quoteState.deviceType !== 'used' && !quoteState.hasReceipt) {
                alert('Please indicate if you have the official receipt.');
                return;
            }
            
            // Validate country selection
            if (!quoteState.country) {
                alert('Please select the country of purchase.');
                return;
            }
            
            // Validate used device conditions only if device is used
            if (quoteState.deviceType === 'used') {
                if (!quoteState.bodyCondition || !quoteState.screenCondition || !quoteState.batteryHealth) {
                    alert('Please complete all device condition selections (Body, Screen, Battery).');
                    return;
                }
            }
            
            calculateQuote();
            displayQuoteResult();
            goToStep(3);
        });
    }

    if (proceedBooking) proceedBooking.addEventListener('click', () => goToStep(4));
}

// Booking
function initBookingForm() {
    const bookingOptions = document.querySelectorAll('.booking-option');
    const bookingForm = document.getElementById('booking-form');
    const addressGroup = document.getElementById('address-group');
    const postalGroup = document.getElementById('postal-group');

    // Set store visit as default (pickup is disabled)
    quoteState.bookingType = 'store';
    if (bookingForm) {
        bookingForm.style.display = 'block';
    }
    if (addressGroup) {
        addressGroup.style.display = 'none';
    }
    if (postalGroup) {
        postalGroup.style.display = 'none';
    }

    bookingOptions.forEach(option => {
        // Skip pickup option (it's hidden)
        if (option.dataset.type === 'pickup') {
            return;
        }

        option.addEventListener('click', function() {
            // Only allow store visit
            if (this.dataset.type === 'pickup') {
                alert('Doorstep pickup is temporarily unavailable. Please visit our office to complete your sale.');
                return;
            }
            
            bookingOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            quoteState.bookingType = this.dataset.type;
            
            bookingForm.style.display = 'block';
            
            if (this.dataset.type === 'store') {
                document.getElementById('booking-form-title').textContent = 'Store Visit Details';
                if (addressGroup) addressGroup.style.display = 'none';
                if (postalGroup) postalGroup.style.display = 'none';
            } else {
                document.getElementById('booking-form-title').textContent = 'Pickup Details';
                if (addressGroup) addressGroup.style.display = 'block';
                if (postalGroup) postalGroup.style.display = 'block';
            }
        });
    });

    document.getElementById('confirm-booking').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        const form = bookingForm;
        // Only validate visible required inputs (exclude address fields for store visits)
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            // Skip address fields if store visit
            if (quoteState.bookingType === 'store' && 
                (input.id === 'booking-address' || input.id === 'booking-postal' || input.id === 'booking-unit')) {
                return;
            }
            
            if (!input.value && input.type !== 'checkbox') {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else if (input.type === 'checkbox' && !input.checked) {
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }

        // Generate booking reference
        const bookingRef = 'KT-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Collect booking data
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const address = document.getElementById('booking-address').value;
        const postal = document.getElementById('booking-postal').value;
        const unit = document.getElementById('booking-unit').value;
        const firstName = document.getElementById('booking-firstname').value;
        const lastName = document.getElementById('booking-lastname').value;
        const mobile = document.getElementById('booking-mobile').value;
        const email = document.getElementById('booking-email').value;
        const remarks = document.getElementById('booking-remarks').value;
        
        // Create appointment object
        const appointment = {
            id: bookingRef,
            bookingType: quoteState.bookingType, // 'pickup' or 'store'
            status: 'pending', // pending, confirmed, completed, cancelled
            date: date,
            time: time,
            datetime: new Date(date + 'T' + time).toISOString(),
            customer: {
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                mobile: mobile,
                email: email
            },
            address: quoteState.bookingType === 'pickup' ? {
                street: address,
                postal: postal,
                unit: unit,
                fullAddress: `${address}${unit ? ', ' + unit : ''}, Singapore ${postal}`
            } : null,
            device: {
                brand: quoteState.brand,
                model: quoteState.model,
                storage: quoteState.storage,
                color: quoteState.color,
                condition: {
                    body: quoteState.bodyCondition,
                    screen: quoteState.screenCondition,
                    battery: quoteState.batteryHealth
                },
                issues: quoteState.issues,
                accessories: quoteState.accessories
            },
            quote: {
                amount: quoteState.finalPrice,
                breakdown: quoteState.priceBreakdown
            },
            remarks: remarks,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save appointment to localStorage
        const appointments = JSON.parse(localStorage.getItem('ktmobile_appointments') || '[]');
        appointments.push(appointment);
        localStorage.setItem('ktmobile_appointments', JSON.stringify(appointments));
        
        // Show confirmation
        document.getElementById('booking-ref').textContent = bookingRef;
        document.getElementById('confirm-device').textContent = `${quoteState.model} ${quoteState.storage}`;
        document.getElementById('confirm-amount').textContent = `SGD $${quoteState.finalPrice}`;
        document.getElementById('confirm-datetime').textContent = `${new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${time}`;
        document.getElementById('confirm-location').textContent = 
            quoteState.bookingType === 'pickup' ? 'Doorstep Pickup' : 'Store Visit - Henderson Industrial Park';

        goToStep(5);
    });
}

function setMinBookingDate() {
    const dateInput = document.getElementById('booking-date');
    if (!dateInput) return;
    
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 10); // Limit to 10 days due to price fluctuations
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
}
