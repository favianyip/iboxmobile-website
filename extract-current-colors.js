// ============================================================================
// COLOR DATABASE EXTRACTOR
// Extracts all models and their current colors from localStorage
// ============================================================================

function extractCurrentColorDatabase() {
    console.log('🎨 EXTRACTING CURRENT COLOR DATABASE...');
    console.log('='.repeat(80));

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');

    const appleModels = {};
    const samsungModels = {};
    const otherModels = {};

    phones.forEach(phone => {
        const entry = {
            model: phone.model,
            colors: phone.colors || [],
            brand: phone.brand,
            storages: phone.storages || [],
            hasUsedPrices: !!(phone.storagePrices && Object.keys(phone.storagePrices).length > 0),
            hasNewPrices: !!(phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0)
        };

        if (phone.brand === 'Apple') {
            appleModels[phone.model] = entry;
        } else if (phone.brand === 'Samsung') {
            samsungModels[phone.model] = entry;
        } else {
            otherModels[phone.model] = entry;
        }
    });

    console.log('');
    console.log('APPLE MODELS:', Object.keys(appleModels).length);
    console.log('SAMSUNG MODELS:', Object.keys(samsungModels).length);
    console.log('OTHER MODELS:', Object.keys(otherModels).length);
    console.log('');
    console.log('='.repeat(80));
    console.log('APPLE COLOR DATABASE:');
    console.log('='.repeat(80));
    Object.entries(appleModels).sort().forEach(([model, data]) => {
        const colorStr = data.colors.length > 0 ? data.colors.join(', ') : 'NO COLORS';
        console.log(`"${model}": [${data.colors.map(c => `'${c}'`).join(', ')}],`);
    });

    console.log('');
    console.log('='.repeat(80));
    console.log('SAMSUNG COLOR DATABASE:');
    console.log('='.repeat(80));
    Object.entries(samsungModels).sort().forEach(([model, data]) => {
        const colorStr = data.colors.length > 0 ? data.colors.join(', ') : 'NO COLORS';
        console.log(`"${model}": [${data.colors.map(c => `'${c}'`).join(', ')}],`);
    });

    if (Object.keys(otherModels).length > 0) {
        console.log('');
        console.log('='.repeat(80));
        console.log('OTHER BRANDS:');
        console.log('='.repeat(80));
        Object.entries(otherModels).sort().forEach(([model, data]) => {
            console.log(`"${model}": [${data.colors.map(c => `'${c}'`).join(', ')}],`);
        });
    }

    console.log('');
    console.log('='.repeat(80));
    console.log('EXPORT COMPLETE - Copy the output above to create master color database');
    console.log('='.repeat(80));

    return {
        apple: appleModels,
        samsung: samsungModels,
        other: otherModels
    };
}

// Auto-run when loaded
if (typeof window !== 'undefined') {
    window.extractCurrentColorDatabase = extractCurrentColorDatabase;
    console.log('✅ Color Database Extractor loaded');
    console.log('📝 Run: extractCurrentColorDatabase()');
}
