// ============================================================================
// FIX DISPLAY ISSUES - Run this in admin panel browser console
// ============================================================================
// This script fixes common issues:
// 1. Phones with display: false (hidden from sell-phones page)
// 2. Missing storagePrices
// 3. Data inconsistencies
// ============================================================================

console.log('='.repeat(80));
console.log('🔧 FIXING DISPLAY ISSUES');
console.log('='.repeat(80));

// Load phones from localStorage
const stored = localStorage.getItem('ktmobile_phones');
if (!stored) {
    console.error('❌ No localStorage data found!');
    console.log('💡 Run "Clear All & Fresh Import" in admin panel first');
} else {
    const phones = JSON.parse(stored);
    console.log(`✅ Loaded ${phones.length} phones from localStorage\n`);

    let fixCount = 0;
    let issues = [];

    phones.forEach((phone, index) => {
        let phoneIssues = [];

        // FIX 1: Ensure display is true
        if (phone.display === false || phone.display === undefined) {
            phone.display = true;
            phoneIssues.push('display set to true');
            fixCount++;
        }

        // FIX 2: Ensure available is true
        if (phone.available === false || phone.available === undefined) {
            phone.available = true;
            phoneIssues.push('available set to true');
            fixCount++;
        }

        // CHECK 3: Verify storagePrices exist for USED
        if (!phone.storagePrices || Object.keys(phone.storagePrices).length === 0) {
            phoneIssues.push('⚠️  NO storagePrices (USED)');
        }

        // CHECK 4: Verify newPhonePrices exist for NEW
        if (!phone.newPhonePrices || Object.keys(phone.newPhonePrices).length === 0) {
            phoneIssues.push('⚠️  NO newPhonePrices (NEW)');
        }

        // CHECK 5: Verify storage options match prices
        if (phone.storages && phone.storagePrices) {
            const missingPrices = phone.storages.filter(s => !phone.storagePrices[s]);
            if (missingPrices.length > 0) {
                phoneIssues.push(`⚠️  Missing USED prices for: ${missingPrices.join(', ')}`);
            }
        }

        if (phoneIssues.length > 0) {
            issues.push({
                index: index,
                model: `${phone.brand} ${phone.model}`,
                issues: phoneIssues
            });
        }
    });

    // Save back to localStorage
    if (fixCount > 0) {
        localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
        console.log(`✅ Fixed ${fixCount} issues and saved to localStorage\n`);
    } else {
        console.log('✅ No fixes needed\n');
    }

    // Display summary
    if (issues.length > 0) {
        console.log('📋 PHONE STATUS REPORT:\n');
        issues.forEach(item => {
            console.log(`${item.index + 1}. ${item.model}`);
            item.issues.forEach(issue => {
                console.log(`   ${issue}`);
            });
            console.log('');
        });
    }

    // Display counts
    console.log('\n📊 SUMMARY:');
    const withUsed = phones.filter(p => p.storagePrices && Object.keys(p.storagePrices).length > 0).length;
    const withNew = phones.filter(p => p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0).length;
    const displayed = phones.filter(p => p.display !== false).length;
    const available = phones.filter(p => p.available !== false).length;

    console.log(`   Total phones: ${phones.length}`);
    console.log(`   With USED prices: ${withUsed}`);
    console.log(`   With NEW prices: ${withNew}`);
    console.log(`   Displayed: ${displayed}`);
    console.log(`   Available: ${available}`);

    if (displayed < phones.length) {
        console.warn(`\n⚠️  WARNING: ${phones.length - displayed} phones are HIDDEN!`);
        console.log('   These phones will NOT appear on sell-phones.html');
    }

    if (withUsed < phones.length) {
        console.warn(`\n⚠️  WARNING: ${phones.length - withUsed} phones missing USED prices!`);
        console.log('   These phones will NOT appear in USED section');
    }

    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Refresh admin panel to see changes');
    console.log('   2. Refresh sell-phones.html to test');
    console.log('   3. Check browser console for errors');
}

console.log('\n' + '='.repeat(80));
console.log('✅ FIX COMPLETE');
console.log('='.repeat(80));
