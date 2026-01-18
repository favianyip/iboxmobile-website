// DIAGNOSTIC TOOL - Run this in browser console to see what models need colors
function diagnoseColorIssues() {
    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');

    console.log('='.repeat(80));
    console.log('COLOR DIAGNOSTIC REPORT');
    console.log('='.repeat(80));
    console.log(`Total phones in database: ${phones.length}`);
    console.log('');

    // Group by brand
    const byBrand = {};
    const withColors = [];
    const withoutColors = [];

    phones.forEach(phone => {
        if (!byBrand[phone.brand]) {
            byBrand[phone.brand] = [];
        }
        byBrand[phone.brand].push(phone.model);

        if (phone.colors && phone.colors.length > 0) {
            withColors.push({ brand: phone.brand, model: phone.model, colors: phone.colors });
        } else {
            withoutColors.push({ brand: phone.brand, model: phone.model });
        }
    });

    console.log('PHONES WITH COLORS:', withColors.length);
    withColors.forEach(p => {
        console.log(`  ✅ ${p.brand} ${p.model}: ${p.colors.join(', ')}`);
    });

    console.log('');
    console.log('PHONES WITHOUT COLORS (N/A):', withoutColors.length);
    withoutColors.forEach(p => {
        console.log(`  ❌ ${p.brand} ${p.model}`);
    });

    console.log('');
    console.log('SUMMARY BY BRAND:');
    Object.entries(byBrand).forEach(([brand, models]) => {
        console.log(`  ${brand}: ${models.length} models`);
        models.forEach(model => {
            const phone = phones.find(p => p.brand === brand && p.model === model);
            const hasColors = phone.colors && phone.colors.length > 0;
            console.log(`    ${hasColors ? '✅' : '❌'} ${model}`);
        });
    });

    console.log('');
    console.log('UNIQUE MODELS NEEDING COLORS:');
    const uniqueWithoutColors = [...new Set(withoutColors.map(p => `${p.brand}|${p.model}`))];
    uniqueWithoutColors.forEach(entry => {
        const [brand, model] = entry.split('|');
        console.log(`    "${model}": [],  // ${brand}`);
    });

    console.log('='.repeat(80));

    return {
        total: phones.length,
        withColors: withColors.length,
        withoutColors: withoutColors.length,
        byBrand: byBrand
    };
}

// Auto-run
diagnoseColorIssues();
