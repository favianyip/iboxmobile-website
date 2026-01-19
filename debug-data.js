// ============================================================================
// DEBUG DATA SCRIPT - Run this in browser console to diagnose issues
// ============================================================================

console.log('='.repeat(80));
console.log('🔍 DIAGNOSTIC REPORT - IBOX MOBILE PRICING SYSTEM');
console.log('='.repeat(80));

// 1. Check localStorage data
console.log('\n📦 1. LOCALSTORAGE DATA:');
const storedPhones = localStorage.getItem('ktmobile_phones');
if (storedPhones) {
    const phones = JSON.parse(storedPhones);
    console.log(`✅ Found ${phones.length} phones in localStorage`);

    // Check iPhone 15 Pro Max specifically
    const iPhone15ProMax = phones.find(p => p.model === 'iPhone 15 Pro Max');
    if (iPhone15ProMax) {
        console.log('\n📱 iPhone 15 Pro Max localStorage data:');
        console.log('   Brand:', iPhone15ProMax.brand);
        console.log('   Storages:', iPhone15ProMax.storages);
        console.log('   storagePrices (USED):', JSON.stringify(iPhone15ProMax.storagePrices));
        console.log('   newPhonePrices (NEW):', JSON.stringify(iPhone15ProMax.newPhonePrices));
        console.log('   basePrice:', iPhone15ProMax.basePrice);
        console.log('   display:', iPhone15ProMax.display);
        console.log('   available:', iPhone15ProMax.available);
    } else {
        console.error('❌ iPhone 15 Pro Max NOT found in localStorage!');
    }

    // Count phones by display status
    const displayed = phones.filter(p => p.display !== false).length;
    const hidden = phones.filter(p => p.display === false).length;
    console.log(`\n👁️  Display status: ${displayed} displayed, ${hidden} hidden`);

    // Count phones with USED prices
    const withUsedPrices = phones.filter(p => p.storagePrices && Object.keys(p.storagePrices).length > 0).length;
    console.log(`💰 Phones with USED prices: ${withUsedPrices}`);

    // Count phones with NEW prices
    const withNewPrices = phones.filter(p => p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0).length;
    console.log(`💰 Phones with NEW prices: ${withNewPrices}`);

} else {
    console.error('❌ NO localStorage data found!');
    console.error('💡 Run "Clear All & Fresh Import" in admin panel');
}

// 2. Check adminManager
console.log('\n📦 2. ADMINMANAGER:');
if (typeof adminManager !== 'undefined' && adminManager) {
    console.log(`✅ adminManager exists with ${adminManager.phones ? adminManager.phones.length : 0} phones`);

    if (adminManager.phones && adminManager.phones.length > 0) {
        const iPhone15ProMax = adminManager.phones.find(p => p.model === 'iPhone 15 Pro Max');
        if (iPhone15ProMax) {
            console.log('\n📱 iPhone 15 Pro Max adminManager data:');
            console.log('   storagePrices (USED):', JSON.stringify(iPhone15ProMax.storagePrices));
            console.log('   newPhonePrices (NEW):', JSON.stringify(iPhone15ProMax.newPhonePrices));
            console.log('   display:', iPhone15ProMax.display);
        }
    }
} else {
    console.error('❌ adminManager NOT defined!');
    console.error('💡 This means quote.js has not loaded or loadAdminDataForCustomerPages() has not run');
}

// 3. Check phoneDatabase
console.log('\n📦 3. PHONEDATABASE (legacy hardcoded):');
if (typeof phoneDatabase !== 'undefined' && phoneDatabase) {
    console.log('✅ phoneDatabase exists');

    if (phoneDatabase.Apple && phoneDatabase.Apple['iPhone 15 Pro Max']) {
        const dbPhone = phoneDatabase.Apple['iPhone 15 Pro Max'];
        console.log('\n📱 iPhone 15 Pro Max phoneDatabase data:');
        console.log('   basePrice:', dbPhone.basePrice);
        console.log('   storage (modifiers):', JSON.stringify(dbPhone.storage));
        console.log('   ⚠️  Note: phoneDatabase uses MODIFIERS, not absolute prices');
    }
} else {
    console.warn('⚠️  phoneDatabase NOT defined (expected on customer pages)');
}

// 4. Check page type
console.log('\n📄 4. CURRENT PAGE:');
console.log('   URL:', window.location.href);
console.log('   Path:', window.location.pathname);

const isSellPage = window.location.pathname.includes('sell-phones.html');
const isQuotePage = window.location.pathname.includes('quote.html');
const isAdminPage = window.location.pathname.includes('admin.html');

if (isSellPage) {
    console.log('   Type: SELL PHONES PAGE');
    console.log('   ✅ Should use adminManager.phones');
    console.log('   ❌ Should NOT use phoneDatabase');
}

if (isQuotePage) {
    console.log('   Type: QUOTE PAGE');
    console.log('   ✅ Should use adminManager.phones + phoneDatabase');
}

if (isAdminPage) {
    console.log('   Type: ADMIN PANEL');
    console.log('   ✅ Should use adminManager.phones from localStorage');
}

// 5. Recommendations
console.log('\n💡 5. RECOMMENDATIONS:');

if (!storedPhones) {
    console.error('❌ CRITICAL: No localStorage data!');
    console.log('   ACTION REQUIRED:');
    console.log('   1. Open admin.html');
    console.log('   2. Click "Import Prices" → "Clear All & Fresh Import"');
    console.log('   3. Verify alert shows ~39 phones imported');
    console.log('   4. Refresh this page');
}

if (typeof adminManager === 'undefined' && isSellPage) {
    console.error('❌ CRITICAL: adminManager not loaded on sell-phones page!');
    console.log('   ACTION REQUIRED:');
    console.log('   1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)');
    console.log('   2. Check browser console for quote.js load errors');
    console.log('   3. Verify quote.js is included with defer attribute');
}

console.log('\n='.repeat(80));
console.log('✅ DIAGNOSTIC COMPLETE');
console.log('='.repeat(80));
