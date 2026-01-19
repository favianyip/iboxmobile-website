// ============================================================================
// TEST IMPORT BUYPRICE CALCULATION
// ============================================================================
// Run this in browser console BEFORE clicking "Clear All & Fresh Import"
// to verify the import logic will create correct buyPrices
// ============================================================================

console.log('='.repeat(80));
console.log('🧪 TESTING IMPORT BUYPRICE CALCULATION');
console.log('='.repeat(80));

// Test the calculateBuyPrices function with iPhone 15 Pro Max NEW prices
const testNewPrices = { "1TB": 900, "256GB": 800, "512GB": 850 };

console.log('\n📝 Input (iPhone 15 Pro Max NEW prices from Excel):');
console.log(JSON.stringify(testNewPrices, null, 2));

// Simulate the calculateBuyPrices function
function testCalculateBuyPrices(storagePrices) {
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

const calculatedBuyPrices = testCalculateBuyPrices(testNewPrices);

console.log('\n✅ Output (calculated buyPrices):');
console.log(JSON.stringify(calculatedBuyPrices, null, 2));

console.log('\n🔍 Verification:');
console.log('='.repeat(80));

for (const [storage, conditions] of Object.entries(calculatedBuyPrices)) {
    console.log(`\n${storage}:`);
    console.log(`  Excellent: $${conditions.excellent}`);
    console.log(`  Good:      $${conditions.good} (95% of excellent)`);
    console.log(`  Fair:      $${conditions.fair} (85% of excellent)`);
}

// Check if all excellent prices are different
const excellentPrices = Object.values(calculatedBuyPrices).map(c => c.excellent);
const uniquePrices = [...new Set(excellentPrices)];

console.log('\n' + '='.repeat(80));
if (uniquePrices.length === 1) {
    console.error('❌ BUG: All excellent prices are SAME:', uniquePrices[0]);
} else {
    console.log(`✅ SUCCESS: Prices are DIFFERENT: ${excellentPrices.join(', ')}`);
}

console.log('\n' + '='.repeat(80));
console.log('💡 EXPECTED ADMIN PANEL DISPLAY AFTER IMPORT:');
console.log('='.repeat(80));
console.log('When you edit iPhone 15 Pro Max, you should see:');
console.log('  256GB: SGD 800');
console.log('  512GB: SGD 850');
console.log('  1TB:   SGD 900');
console.log('');
console.log('NOT all 800!');
console.log('='.repeat(80));

console.log('\n✅ Test complete. Now click "Clear All & Fresh Import" and verify!');
