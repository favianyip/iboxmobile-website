// ============================================================================
// DIAGNOSE PRICE DATA STRUCTURE - Run in browser console
// ============================================================================

console.log('🔍 DIAGNOSING PRICE DATA STRUCTURE');
console.log('='.repeat(80));

const stored = localStorage.getItem('ktmobile_phones');
if (!stored) {
    console.error('❌ No localStorage data');
} else {
    const phones = JSON.parse(stored);

    // Check iPhone 15 Pro Max specifically
    const iPhone15ProMax = phones.find(p => p.model === 'iPhone 15 Pro Max');

    if (iPhone15ProMax) {
        console.log('\n📱 iPhone 15 Pro Max RAW DATA:');
        console.log('Model:', iPhone15ProMax.model);
        console.log('Brand:', iPhone15ProMax.brand);
        console.log('Storages array:', iPhone15ProMax.storages);
        console.log('storagePrices object:', iPhone15ProMax.storagePrices);
        console.log('storagePrices type:', typeof iPhone15ProMax.storagePrices);
        console.log('storagePrices is null?', iPhone15ProMax.storagePrices === null);
        console.log('storagePrices is undefined?', iPhone15ProMax.storagePrices === undefined);
        console.log('storagePrices keys:', Object.keys(iPhone15ProMax.storagePrices || {}));
        console.log('storagePrices values:', Object.values(iPhone15ProMax.storagePrices || {}));
        console.log('storagePrices JSON:', JSON.stringify(iPhone15ProMax.storagePrices, null, 2));

        // Check each storage option
        if (iPhone15ProMax.storages && iPhone15ProMax.storagePrices) {
            console.log('\n🔍 CHECKING EACH STORAGE:');
            iPhone15ProMax.storages.forEach(storage => {
                const price = iPhone15ProMax.storagePrices[storage];
                console.log(`  ${storage}:`, price, `(type: ${typeof price})`);
            });
        }
    }

    // Check Galaxy S25 Ultra (working example)
    const galaxyS25 = phones.find(p => p.model === 'Galaxy S25 Ultra 5G');

    if (galaxyS25) {
        console.log('\n📱 Galaxy S25 Ultra 5G RAW DATA (WORKING EXAMPLE):');
        console.log('Model:', galaxyS25.model);
        console.log('Brand:', galaxyS25.brand);
        console.log('Storages array:', galaxyS25.storages);
        console.log('storagePrices object:', galaxyS25.storagePrices);
        console.log('storagePrices JSON:', JSON.stringify(galaxyS25.storagePrices, null, 2));

        if (galaxyS25.storages && galaxyS25.storagePrices) {
            console.log('\n🔍 CHECKING EACH STORAGE:');
            galaxyS25.storages.forEach(storage => {
                const price = galaxyS25.storagePrices[storage];
                console.log(`  ${storage}:`, price, `(type: ${typeof price})`);
            });
        }
    }

    // Check ALL phones for empty storagePrices
    console.log('\n📊 SUMMARY OF ALL PHONES:');
    let withPrices = 0;
    let withoutPrices = 0;
    let emptyPrices = 0;

    phones.forEach(phone => {
        if (!phone.storagePrices) {
            withoutPrices++;
        } else if (Object.keys(phone.storagePrices).length === 0) {
            emptyPrices++;
            console.log(`  ⚠️  ${phone.brand} ${phone.model}: storagePrices is EMPTY {}`);
        } else {
            const values = Object.values(phone.storagePrices);
            const hasValidPrices = values.some(v => v !== null && v !== undefined && v > 0);
            if (hasValidPrices) {
                withPrices++;
            } else {
                console.log(`  ⚠️  ${phone.brand} ${phone.model}: storagePrices has NO VALID VALUES`, phone.storagePrices);
            }
        }
    });

    console.log('\n📈 TOTALS:');
    console.log(`  With valid prices: ${withPrices}`);
    console.log(`  With empty {} storagePrices: ${emptyPrices}`);
    console.log(`  With null/undefined storagePrices: ${withoutPrices}`);
}

console.log('\n' + '='.repeat(80));
console.log('✅ DIAGNOSIS COMPLETE');
