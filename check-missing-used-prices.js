// ============================================================================
// CHECK MISSING USED PRICES
// ============================================================================
// This script identifies which models have NEW prices but no USED prices
// So you can add the missing USED prices from your Excel sheets
// ============================================================================

console.log('='.repeat(80));
console.log('🔍 CHECKING FOR MISSING USED PRICES');
console.log('='.repeat(80));

// Models that have NEW prices in import-exact-prices.js
const modelsWithNEW = [
    "iPhone 14",
    "iPhone 14 Plus",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
    "iPhone 16",
    "iPhone 16 Plus",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 16E",
    "iPhone 17",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
    "iPhone Air"
];

// Models that have USED prices in import-exact-prices.js (lines 15-38)
const modelsWithUSED = [
    "iPhone 11",
    "iPhone 11 Pro",
    "iPhone 11 Pro Max",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone 16",
    "iPhone 16 Plus",
    "iPhone 16E",
    "iPhone 17",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
    "iPhone Air",
    "iPhone SE (2022)",
    "iPhone XR",
    "iPhone XS",
    "iPhone XS Max"
];

// Find models with NEW but no USED
const missingUSED = modelsWithNEW.filter(model => !modelsWithUSED.includes(model));

console.log('\n📱 MODELS WITH NEW PRICES BUT NO USED PRICES:');
console.log('='.repeat(80));

if (missingUSED.length === 0) {
    console.log('✅ All models with NEW prices also have USED prices!');
} else {
    console.log(`❌ Found ${missingUSED.length} models missing USED prices:\n`);

    missingUSED.forEach((model, index) => {
        console.log(`${index + 1}. ${model}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('📋 INSTRUCTIONS TO FIX:');
    console.log('='.repeat(80));
    console.log('1. Open your Excel file with USED prices sheet');
    console.log('2. Find the USED prices for the models listed above');
    console.log('3. Add them to import-exact-prices.js in the appleUsedPrices object');
    console.log('\n📝 FORMAT TO ADD (copy this template):');
    console.log('='.repeat(80));
    console.log('\n// In import-exact-prices.js, add to appleUsedPrices (around line 15-38):\n');

    missingUSED.forEach(model => {
        console.log(`    "${model}": { "128GB": XXX, "256GB": XXX, "512GB": XXX, "1TB": XXX },`);
    });

    console.log('\n// Replace XXX with actual prices from your Excel USED sheet\n');
    console.log('='.repeat(80));
}

// Check current localStorage data
console.log('\n\n💾 CURRENT LOCALSTORAGE DATA:');
console.log('='.repeat(80));

const stored = localStorage.getItem('ktmobile_phones');
if (stored) {
    const phones = JSON.parse(stored);

    console.log('\n🔍 Checking which models have buyPrices in backend:');

    missingUSED.forEach(model => {
        const phone = phones.find(p => p.model === model);
        if (phone) {
            const hasBuyPrices = phone.buyPrices && Object.keys(phone.buyPrices).length > 0;
            const hasUsedPrices = phone.storagePrices && Object.keys(phone.storagePrices).length > 0;
            const hasNewPrices = phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0;

            console.log(`\n${model}:`);
            console.log(`  buyPrices: ${hasBuyPrices ? '✅ YES' : '❌ NO'} (${Object.keys(phone.buyPrices || {}).length} storage options)`);
            console.log(`  storagePrices (USED from Excel): ${hasUsedPrices ? '✅ YES' : '❌ NO'}`);
            console.log(`  newPhonePrices: ${hasNewPrices ? '✅ YES' : '❌ NO'}`);

            if (hasBuyPrices) {
                console.log(`  Current buyPrices:`, JSON.stringify(phone.buyPrices, null, 2));
            }
        } else {
            console.log(`\n${model}: ❌ NOT FOUND in localStorage`);
        }
    });
} else {
    console.log('❌ No localStorage data found!');
}

console.log('\n\n' + '='.repeat(80));
console.log('✅ ANALYSIS COMPLETE');
console.log('='.repeat(80));
console.log('\n💡 NEXT STEPS:');
console.log('1. Check your Excel file for USED prices of the missing models');
console.log('2. Update import-exact-prices.js with the missing USED prices');
console.log('3. Run "Clear All & Fresh Import" in admin panel');
console.log('4. Verify sell-phones.html?type=used shows all models');
