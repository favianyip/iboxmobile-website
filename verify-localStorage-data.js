// ============================================================================
// VERIFY LOCALSTORAGE DATA - Run in browser console
// ============================================================================
// This script verifies what's actually stored in localStorage
// to diagnose if import corrupted the data
// ============================================================================

console.log('='.repeat(80));
console.log('🔍 VERIFYING LOCALSTORAGE DATA');
console.log('='.repeat(80));

const stored = localStorage.getItem('ktmobile_phones');
if (!stored) {
    console.error('❌ No localStorage data found!');
    console.log('💡 Run "Clear All & Fresh Import" in admin panel');
} else {
    const phones = JSON.parse(stored);
    console.log(`✅ Loaded ${phones.length} phones from localStorage\n`);

    // Check iPhone 15 Pro Max specifically
    const iPhone15ProMax = phones.find(p => p.model === 'iPhone 15 Pro Max');

    if (iPhone15ProMax) {
        console.log('📱 iPhone 15 Pro Max ACTUAL STORAGE DATA:');
        console.log('='.repeat(80));
        console.log('Model:', iPhone15ProMax.model);
        console.log('Brand:', iPhone15ProMax.brand);
        console.log('');
        console.log('🟢 USED PRICES (storagePrices):');
        console.log('  Object:', iPhone15ProMax.storagePrices);
        console.log('  Type:', typeof iPhone15ProMax.storagePrices);
        console.log('  Keys:', Object.keys(iPhone15ProMax.storagePrices || {}));
        console.log('  Values:', Object.values(iPhone15ProMax.storagePrices || {}));
        console.log('  Length:', Object.keys(iPhone15ProMax.storagePrices || {}).length);
        console.log('  JSON:', JSON.stringify(iPhone15ProMax.storagePrices, null, 2));
        console.log('');
        console.log('🆕 NEW PRICES (newPhonePrices):');
        console.log('  Object:', iPhone15ProMax.newPhonePrices);
        console.log('  Type:', typeof iPhone15ProMax.newPhonePrices);
        console.log('  Keys:', Object.keys(iPhone15ProMax.newPhonePrices || {}));
        console.log('  Values:', Object.values(iPhone15ProMax.newPhonePrices || {}));
        console.log('  Length:', Object.keys(iPhone15ProMax.newPhonePrices || {}).length);
        console.log('  JSON:', JSON.stringify(iPhone15ProMax.newPhonePrices, null, 2));
        console.log('');
        console.log('📊 OTHER DATA:');
        console.log('  Storages:', iPhone15ProMax.storages);
        console.log('  basePrice:', iPhone15ProMax.basePrice);
        console.log('  display:', iPhone15ProMax.display);
        console.log('  available:', iPhone15ProMax.available);

        // Check each NEW storage option to see if prices are same/different
        if (iPhone15ProMax.newPhonePrices && Object.keys(iPhone15ProMax.newPhonePrices).length > 0) {
            console.log('');
            console.log('🔍 CHECKING EACH NEW STORAGE PRICE:');
            Object.entries(iPhone15ProMax.newPhonePrices).forEach(([storage, price]) => {
                console.log(`  ${storage}: $${price} (type: ${typeof price})`);
            });

            const newPriceValues = Object.values(iPhone15ProMax.newPhonePrices);
            const allSame = newPriceValues.every(p => p === newPriceValues[0]);

            if (allSame) {
                console.error(`\n❌ BUG FOUND: All NEW prices are $${newPriceValues[0]} (should be different!)`);
            } else {
                console.log(`\n✅ NEW prices are DIFFERENT (correct!)`);
            }
        }
    } else {
        console.error('❌ iPhone 15 Pro Max NOT found in localStorage!');
    }

    // Check iPhone 14 series (should have ONLY NEW prices)
    console.log('\n\n📱 iPhone 14 ACTUAL STORAGE DATA:');
    console.log('='.repeat(80));
    const iPhone14 = phones.find(p => p.model === 'iPhone 14');

    if (iPhone14) {
        console.log('Model:', iPhone14.model);
        console.log('USED prices (storagePrices):', JSON.stringify(iPhone14.storagePrices));
        console.log('NEW prices (newPhonePrices):', JSON.stringify(iPhone14.newPhonePrices));
        console.log('Expected: USED = {} (empty), NEW = {"128GB":350,"256GB":400,"512GB":450}');
    } else {
        console.error('❌ iPhone 14 NOT found in localStorage!');
    }

    // Check Galaxy S25 Ultra (working example with USED prices)
    console.log('\n\n📱 Galaxy S25 Ultra 5G ACTUAL STORAGE DATA (WORKING EXAMPLE):');
    console.log('='.repeat(80));
    const galaxyS25 = phones.find(p => p.model === 'Galaxy S25 Ultra 5G');

    if (galaxyS25) {
        console.log('Model:', galaxyS25.model);
        console.log('USED prices (storagePrices):', JSON.stringify(galaxyS25.storagePrices));
        console.log('NEW prices (newPhonePrices):', JSON.stringify(galaxyS25.newPhonePrices));
        console.log('Expected: USED = {"256GB":800,"512GB":920,"1TB":1020}, NEW = {"256GB":1040,"512GB":1250,"1TB":1350}');
    } else {
        console.error('❌ Galaxy S25 Ultra 5G NOT found in localStorage!');
    }

    // Summary of all phones
    console.log('\n\n📊 SUMMARY OF ALL PHONES:');
    console.log('='.repeat(80));

    const withUsedPrices = phones.filter(p => p.storagePrices && Object.keys(p.storagePrices).length > 0);
    const withNewPrices = phones.filter(p => p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0);
    const withBoth = phones.filter(p =>
        p.storagePrices && Object.keys(p.storagePrices).length > 0 &&
        p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0
    );
    const withOnlyUsed = phones.filter(p =>
        p.storagePrices && Object.keys(p.storagePrices).length > 0 &&
        (!p.newPhonePrices || Object.keys(p.newPhonePrices).length === 0)
    );
    const withOnlyNew = phones.filter(p =>
        p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0 &&
        (!p.storagePrices || Object.keys(p.storagePrices).length === 0)
    );
    const withNeither = phones.filter(p =>
        (!p.storagePrices || Object.keys(p.storagePrices).length === 0) &&
        (!p.newPhonePrices || Object.keys(p.newPhonePrices).length === 0)
    );

    console.log(`Total phones: ${phones.length}`);
    console.log(`With USED prices: ${withUsedPrices.length}`);
    console.log(`With NEW prices: ${withNewPrices.length}`);
    console.log(`With BOTH: ${withBoth.length}`);
    console.log(`With ONLY USED: ${withOnlyUsed.length}`);
    console.log(`With ONLY NEW: ${withOnlyNew.length}`);
    console.log(`With NEITHER: ${withNeither.length}`);

    if (withOnlyNew.length > 0) {
        console.log('\n🔍 PHONES WITH ONLY NEW PRICES (no USED):');
        withOnlyNew.forEach(p => {
            console.log(`  - ${p.brand} ${p.model}`);
        });
        console.log(`\n⚠️  These ${withOnlyNew.length} phones will NOT appear on sell-phones.html?type=used`);
        console.log(`✅ But they WILL appear on sell-phones.html?type=new`);
    }

    if (withOnlyUsed.length > 0) {
        console.log('\n🔍 PHONES WITH ONLY USED PRICES (no NEW):');
        withOnlyUsed.forEach(p => {
            console.log(`  - ${p.brand} ${p.model}`);
        });
        console.log(`\n✅ These ${withOnlyUsed.length} phones WILL appear on sell-phones.html?type=used`);
        console.log(`⚠️  But they will NOT appear on sell-phones.html?type=new`);
    }

    // Check for identical prices (potential bug)
    console.log('\n\n🔍 CHECKING FOR IDENTICAL PRICES (potential bugs):');
    console.log('='.repeat(80));

    let identicalUsedCount = 0;
    let identicalNewCount = 0;

    phones.forEach(phone => {
        // Check USED prices
        if (phone.storagePrices && Object.keys(phone.storagePrices).length > 1) {
            const usedValues = Object.values(phone.storagePrices);
            const allSame = usedValues.every(p => p === usedValues[0]);
            if (allSame) {
                console.error(`❌ ${phone.brand} ${phone.model}: All USED prices are $${usedValues[0]}`);
                console.log(`   storagePrices: ${JSON.stringify(phone.storagePrices)}`);
                identicalUsedCount++;
            }
        }

        // Check NEW prices
        if (phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 1) {
            const newValues = Object.values(phone.newPhonePrices);
            const allSame = newValues.every(p => p === newValues[0]);
            if (allSame) {
                console.error(`❌ ${phone.brand} ${phone.model}: All NEW prices are $${newValues[0]}`);
                console.log(`   newPhonePrices: ${JSON.stringify(phone.newPhonePrices)}`);
                identicalNewCount++;
            }
        }
    });

    if (identicalUsedCount === 0 && identicalNewCount === 0) {
        console.log('✅ No identical price bugs found! All phones have different prices per storage.');
    } else {
        console.error(`\n❌ FOUND BUGS:`);
        console.error(`   ${identicalUsedCount} phones with identical USED prices`);
        console.error(`   ${identicalNewCount} phones with identical NEW prices`);
        console.error(`\n💡 This indicates import or calculation bug!`);
    }
}

console.log('\n' + '='.repeat(80));
console.log('✅ VERIFICATION COMPLETE');
console.log('='.repeat(80));
