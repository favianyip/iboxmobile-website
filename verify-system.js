/**
 * Automated System Verification Script
 * Run in browser console on admin.html or buy.html
 *
 * Usage: Copy this entire script and paste into browser console
 */

(function() {
    console.log('='.repeat(80));
    console.log('iBox Mobile System Verification');
    console.log('='.repeat(80));
    console.log('');

    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    // Test 1: Check localStorage keys exist
    console.log('Test 1: Checking localStorage keys...');
    const requiredKeys = ['ktmobile_phones', 'ktmobile_condition_modifiers'];
    requiredKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            results.passed.push(`✅ localStorage['${key}'] exists`);
            console.log(`  ✅ ${key}: ${value.length} bytes`);
        } else {
            results.failed.push(`❌ localStorage['${key}'] missing`);
            console.log(`  ❌ ${key}: MISSING`);
        }
    });

    // Test 2: Verify phone database structure
    console.log('\nTest 2: Verifying phone database...');
    try {
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        if (phones.length === 68) {
            results.passed.push(`✅ Phone database has 68 models`);
            console.log(`  ✅ Found 68 phone models`);
        } else {
            results.warnings.push(`⚠️  Phone database has ${phones.length} models (expected 68)`);
            console.log(`  ⚠️  Found ${phones.length} phone models (expected 68)`);
        }

        // Check if phones have required fields
        const samplePhone = phones[0];
        if (samplePhone) {
            const requiredFields = ['id', 'brand', 'model', 'image', 'storages', 'basePrice'];
            const hasAllFields = requiredFields.every(field => samplePhone.hasOwnProperty(field));
            if (hasAllFields) {
                results.passed.push(`✅ Phone objects have correct structure`);
                console.log(`  ✅ Phone structure valid`);
            } else {
                results.failed.push(`❌ Phone objects missing required fields`);
                console.log(`  ❌ Phone structure invalid`);
            }
        }
    } catch (e) {
        results.failed.push(`❌ Phone database parse error: ${e.message}`);
        console.log(`  ❌ Parse error: ${e.message}`);
    }

    // Test 3: Verify condition modifiers
    console.log('\nTest 3: Verifying condition modifiers...');
    try {
        const modifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}');
        if (modifiers.refurbCondition) {
            const { excellent, good, fair } = modifiers.refurbCondition;
            results.passed.push(`✅ Condition modifiers exist`);
            console.log(`  ✅ Excellent: ${excellent >= 0 ? '+' : ''}${excellent}`);
            console.log(`  ✅ Good: ${good >= 0 ? '+' : ''}${good}`);
            console.log(`  ✅ Fair: ${fair >= 0 ? '+' : ''}${fair}`);
        } else {
            results.warnings.push(`⚠️  Condition modifiers using defaults`);
            console.log(`  ⚠️  Using default modifiers (not set in admin)`);
        }
    } catch (e) {
        results.failed.push(`❌ Condition modifiers parse error`);
        console.log(`  ❌ Parse error: ${e.message}`);
    }

    // Test 4: Check for NEW prices
    console.log('\nTest 4: Checking NEW vs USED prices...');
    try {
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        const phonesWithNew = phones.filter(p => p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0);
        results.passed.push(`✅ ${phonesWithNew.length} phones have NEW prices`);
        console.log(`  ✅ ${phonesWithNew.length} phones have NEW prices`);
        console.log(`  ✅ ${phones.length - phonesWithNew.length} phones are USED only`);
    } catch (e) {
        console.log(`  ❌ Error checking NEW prices`);
    }

    // Test 5: Verify no hardcoded prices in current page
    console.log('\nTest 5: Checking for hardcoded prices...');
    const scriptContent = Array.from(document.scripts)
        .map(s => s.textContent)
        .join('\n');

    const hardcodedPatterns = [
        /basePrice\s*:\s*\d{3,}/,
        /price\s*:\s*\d{3,}/,
        /conditionModifiers\s*=\s*\{[^}]*excellent[^}]*:\s*\d+/
    ];

    let hasHardcoded = false;
    hardcodedPatterns.forEach(pattern => {
        if (pattern.test(scriptContent)) {
            hasHardcoded = true;
        }
    });

    if (!hasHardcoded) {
        results.passed.push(`✅ No hardcoded prices found in page scripts`);
        console.log(`  ✅ No hardcoded prices detected`);
    } else {
        results.warnings.push(`⚠️  Possible hardcoded values detected (may be false positive)`);
        console.log(`  ⚠️  Possible hardcoded values (check manually)`);
    }

    // Test 6: Check image files
    console.log('\nTest 6: Verifying phone images...');
    try {
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        const imagesSet = new Set(phones.map(p => p.image));
        results.passed.push(`✅ ${imagesSet.size} unique images referenced`);
        console.log(`  ✅ ${imagesSet.size} unique images in database`);
    } catch (e) {
        console.log(`  ❌ Error checking images`);
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ Passed: ${results.passed.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log(`⚠️  Warnings: ${results.warnings.length}`);
    console.log('');

    if (results.failed.length > 0) {
        console.log('FAILED TESTS:');
        results.failed.forEach(f => console.log(`  ${f}`));
        console.log('');
    }

    if (results.warnings.length > 0) {
        console.log('WARNINGS:');
        results.warnings.forEach(w => console.log(`  ${w}`));
        console.log('');
    }

    if (results.failed.length === 0) {
        console.log('✅ ALL CRITICAL TESTS PASSED');
        console.log('');
        console.log('System Status: READY');
        console.log('');
        console.log('Next Steps:');
        console.log('1. Test condition modifier changes in admin panel');
        console.log('2. Verify changes appear on buy.html');
        console.log('3. Test complete quote flow');
    } else {
        console.log('❌ SYSTEM HAS ISSUES - See failed tests above');
    }

    console.log('='.repeat(80));

    return {
        passed: results.passed.length,
        failed: results.failed.length,
        warnings: results.warnings.length,
        details: results
    };
})();
