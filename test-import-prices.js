/**
 * Test script to verify import-exact-prices.js functionality
 * Run with: node test-import-prices.js
 */

// Mock browser APIs
const localStorage = {
    storage: {},
    getItem: function(key) { return this.storage[key] || null; },
    setItem: function(key, value) { this.storage[key] = value; },
    removeItem: function(key) { delete this.storage[key]; }
};

// Mock window object
global.window = { localStorage };
global.localStorage = localStorage;

// Mock helper functions
global.getSmartImage = function(brand, model) {
    return 'images/phones/' + model.toLowerCase().replace(/\s+/g, '-') + '.jpg';
};
global.getMasterColors = function(brand, model) {
    return ['Black', 'Silver', 'Gold']; // Mock colors
};
global.renderPhones = function() {};
global.renderPriceTable = function() {};
global.alert = function(msg) { console.log('[ALERT] ' + msg.substring(0, 100) + '...'); };

console.log('='.repeat(80));
console.log('TESTING IMPORT-EXACT-PRICES.JS');
console.log('='.repeat(80));

// Load and execute the import script
const fs = require('fs');
const scriptContent = fs.readFileSync('import-exact-prices.js', 'utf8');
eval(scriptContent);

// Run the import
console.log('\n📥 Running importExactPrices()...\n');
const result = importExactPrices();

console.log('\n' + '='.repeat(80));
console.log('VERIFICATION RESULTS');
console.log('='.repeat(80));

// Parse the stored data
const phones = JSON.parse(localStorage.getItem('ktmobile_phones'));
console.log('\n📦 Total phones imported: ' + phones.length);

// Check for models that should have calculated USED prices
const modelsWithCalculatedUsed = phones.filter(p => p.usedPricesCalculated === true);
console.log('\n📊 Models with USED prices calculated from NEW: ' + modelsWithCalculatedUsed.length);
if (modelsWithCalculatedUsed.length > 0) {
    modelsWithCalculatedUsed.forEach(p => {
        console.log('   - ' + p.brand + ' ' + p.model);
    });
} else {
    console.log('   ✅ All models have USED prices from Excel!');
}

// Verify key models have both USED and NEW prices
console.log('\n🔍 VERIFICATION OF KEY MODELS:');

const testModels = [
    { brand: 'Apple', model: 'iPhone 16 Pro Max', expectedUsedPrice: { '256GB': 900, '512GB': 950, '1TB': 1000 } },
    { brand: 'Apple', model: 'iPhone 16 Pro', expectedUsedPrice: { '128GB': 870, '256GB': 920, '512GB': 970, '1TB': 1020 } },
    { brand: 'Apple', model: 'iPhone 15 Pro Max', expectedUsedPrice: { '256GB': 800, '512GB': 850, '1TB': 900 } },
    { brand: 'Apple', model: 'iPhone 14 Pro Max', expectedUsedPrice: { '128GB': 600, '256GB': 650, '512GB': 700, '1TB': 750 } },
    { brand: 'Apple', model: 'iPhone 16', expectedUsedPrice: { '128GB': 670, '256GB': 720, '512GB': 770 } },
    { brand: 'Samsung', model: 'Galaxy S25 Ultra 5G', expectedUsedPrice: { '256GB': 850, '512GB': 1050, '1TB': 1100 } },
    { brand: 'Samsung', model: 'Galaxy Z Fold 7 5G', expectedUsedPrice: { '256GB': 1470, '512GB': 1520, '1TB': 1620 } },
    { brand: 'Samsung', model: 'Galaxy Z Flip 7 5G', expectedUsedPrice: { '256GB': 670, '512GB': 770 } }
];

let allTestsPassed = true;

testModels.forEach(test => {
    const phone = phones.find(p => p.brand === test.brand && p.model === test.model);
    if (!phone) {
        console.log('   ❌ ' + test.brand + ' ' + test.model + ': NOT FOUND');
        allTestsPassed = false;
        return;
    }

    const hasUsedPrices = phone.storagePrices && Object.keys(phone.storagePrices).length > 0;
    const hasNewPrices = phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0;
    const usedCalculated = phone.usedPricesCalculated === true;

    // Check if prices match expected
    let pricesMatch = true;
    if (test.expectedUsedPrice && hasUsedPrices) {
        for (const [storage, expectedPrice] of Object.entries(test.expectedUsedPrice)) {
            if (phone.storagePrices[storage] !== expectedPrice) {
                pricesMatch = false;
                console.log('      ⚠️  ' + storage + ': Expected $' + expectedPrice + ', got $' + phone.storagePrices[storage]);
            }
        }
    }

    const testPassed = hasUsedPrices && pricesMatch;

    console.log('   ' + (testPassed ? '✅' : '❌') + ' ' + test.brand + ' ' + test.model + ':');
    console.log('      USED: ' + (hasUsedPrices ? '✅' : '❌') + ' ' + Object.keys(phone.storagePrices || {}).length + ' storages' + (usedCalculated ? ' (calculated)' : ' (from Excel)'));
    console.log('      NEW: ' + (hasNewPrices ? '✅' : '❌') + ' ' + Object.keys(phone.newPhonePrices || {}).length + ' storages');

    if (hasUsedPrices) {
        const storages = Object.keys(phone.storagePrices);
        console.log('      USED Prices: ' + storages.map(s => s + '=$' + phone.storagePrices[s]).join(', '));
    }

    if (!testPassed) allTestsPassed = false;
});

// Verify timestamp is set
const lastUpdate = localStorage.getItem('ktmobile_last_update');
console.log('\n⏰ Last Update Timestamp: ' + (lastUpdate ? '✅ Set' : '❌ NOT SET'));
if (!lastUpdate) allTestsPassed = false;

console.log('\n' + '='.repeat(80));
console.log(allTestsPassed ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED');
console.log('='.repeat(80));

process.exit(allTestsPassed ? 0 : 1);
