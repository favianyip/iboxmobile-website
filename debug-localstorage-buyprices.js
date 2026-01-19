// ============================================================================
// DEBUG: Check what's actually in localStorage after import
// ============================================================================
// Run this in browser console to see the actual stored data

console.log('='.repeat(80));
console.log('🔍 CHECKING LOCALSTORAGE AFTER IMPORT');
console.log('='.repeat(80));

const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
const iPhone15ProMax = phones.find(p => p.model === 'iPhone 15 Pro Max');

if (iPhone15ProMax) {
    console.log('\n📱 iPhone 15 Pro Max Data Structure:');
    console.log('='.repeat(80));

    console.log('\n1️⃣ STORAGE OPTIONS:');
    console.log(iPhone15ProMax.storages);

    console.log('\n2️⃣ BASE PRICE (lowest price):');
    console.log(iPhone15ProMax.basePrice);

    console.log('\n3️⃣ STORAGE PRICES (USED from Excel):');
    console.log(JSON.stringify(iPhone15ProMax.storagePrices, null, 2));

    console.log('\n4️⃣ NEW PHONE PRICES (NEW from Excel):');
    console.log(JSON.stringify(iPhone15ProMax.newPhonePrices, null, 2));

    console.log('\n5️⃣ BUY PRICES (Backend-editable, shown in admin):');
    console.log(JSON.stringify(iPhone15ProMax.buyPrices, null, 2));

    console.log('\n' + '='.repeat(80));
    console.log('🔍 CHECKING EACH STORAGE OPTION IN buyPrices:');
    console.log('='.repeat(80));

    if (iPhone15ProMax.buyPrices) {
        for (const [storage, conditions] of Object.entries(iPhone15ProMax.buyPrices)) {
            console.log(`\n${storage}:`);
            console.log(`  Excellent: $${conditions.excellent}`);
            console.log(`  Good: $${conditions.good}`);
            console.log(`  Fair: $${conditions.fair}`);
        }

        // Check if all excellent prices are same
        const excellentPrices = Object.values(iPhone15ProMax.buyPrices).map(c => c.excellent);
        const uniquePrices = [...new Set(excellentPrices)];

        console.log('\n' + '='.repeat(80));
        if (uniquePrices.length === 1) {
            console.error(`❌ BUG FOUND: All buyPrices.excellent are the SAME: $${uniquePrices[0]}`);
            console.error('This is why admin panel shows 800 for all storage options!');
        } else {
            console.log(`✅ buyPrices are DIFFERENT: $${Math.min(...excellentPrices)} - $${Math.max(...excellentPrices)}`);
        }
    } else {
        console.error('❌ No buyPrices found!');
    }

    console.log('\n' + '='.repeat(80));
    console.log('💡 DIAGNOSIS:');
    console.log('='.repeat(80));
    console.log('If all buyPrices are $800, the problem is in import logic.');
    console.log('If buyPrices are different but admin shows same, problem is in admin panel.');

} else {
    console.error('❌ iPhone 15 Pro Max not found in localStorage!');
    console.log('Run "Clear All & Fresh Import" in admin panel first.');
}

console.log('\n✅ DIAGNOSTIC COMPLETE');
