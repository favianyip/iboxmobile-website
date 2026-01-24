/**
 * Import Prices Directly from Excel Files
 *
 * This script reads the actual Excel files and converts them to phone objects
 * Source files:
 * - data/excel-reference/Apple_USED_NEW_FULL_REVIEW.xlsx
 * - data/excel-reference/Samsung_USED_NEW_FULL_REVIEW.xlsx
 *
 * Requires: SheetJS (xlsx library) to be loaded
 */

async function importFromExcelDirect() {
    console.log('🎯 IMPORTING PRICES DIRECTLY FROM EXCEL FILES');
    console.log('📁 Loading Excel files...');

    try {
        // Check if XLSX library is available
        if (typeof XLSX === 'undefined') {
            throw new Error('XLSX library not loaded. Include SheetJS library first.');
        }

        const phones = [];
        let appleCount = 0;
        let samsungCount = 0;

        // ============================================
        // LOAD APPLE EXCEL FILE
        // ============================================
        console.log('📱 Loading Apple data from Excel...');

        const appleResponse = await fetch('data/excel-reference/Apple_USED_NEW_FULL_REVIEW.xlsx');
        if (!appleResponse.ok) {
            throw new Error(`Failed to load Apple Excel file: ${appleResponse.status}`);
        }

        const appleArrayBuffer = await appleResponse.arrayBuffer();
        const appleWorkbook = XLSX.read(appleArrayBuffer, { type: 'array' });
        const appleSheet = appleWorkbook.Sheets[appleWorkbook.SheetNames[0]];
        const appleData = XLSX.utils.sheet_to_json(appleSheet);

        console.log(`✅ Loaded ${appleData.length} rows from Apple Excel`);

        // Process Apple data
        const applePhones = {};
        appleData.forEach(row => {
            const model = row['Model'] || row['model'];
            const storage = row['Storage'] || row['storage'];
            const usedPrice = parseFloat(row['USED'] || row['used'] || 0);
            const newPrice = parseFloat(row['NEW'] || row['new'] || 0);

            if (!model || !storage) return;

            if (!applePhones[model]) {
                applePhones[model] = {
                    brand: 'Apple',
                    model: model,
                    storages: [],
                    storagePrices: {},
                    newPhonePrices: {},
                    basePrice: usedPrice // First storage is base price
                };
            }

            applePhones[model].storages.push(storage);
            applePhones[model].storagePrices[storage] = usedPrice;
            if (newPrice > 0) {
                applePhones[model].newPhonePrices[storage] = newPrice;
            }

            // Update base price to lowest storage
            if (usedPrice < applePhones[model].basePrice) {
                applePhones[model].basePrice = usedPrice;
            }
        });

        // ============================================
        // LOAD SAMSUNG EXCEL FILE
        // ============================================
        console.log('📱 Loading Samsung data from Excel...');

        const samsungResponse = await fetch('data/excel-reference/Samsung_USED_NEW_FULL_REVIEW.xlsx');
        if (!samsungResponse.ok) {
            throw new Error(`Failed to load Samsung Excel file: ${samsungResponse.status}`);
        }

        const samsungArrayBuffer = await samsungResponse.arrayBuffer();
        const samsungWorkbook = XLSX.read(samsungArrayBuffer, { type: 'array' });
        const samsungSheet = samsungWorkbook.Sheets[samsungWorkbook.SheetNames[0]];
        const samsungData = XLSX.utils.sheet_to_json(samsungSheet);

        console.log(`✅ Loaded ${samsungData.length} rows from Samsung Excel`);

        // Process Samsung data
        const samsungPhones = {};
        samsungData.forEach(row => {
            const model = row['Model'] || row['model'];
            const storage = row['Storage'] || row['storage'];
            const usedPrice = parseFloat(row['USED'] || row['used'] || 0);
            const newPrice = parseFloat(row['NEW'] || row['new'] || 0);

            if (!model || !storage) return;

            if (!samsungPhones[model]) {
                samsungPhones[model] = {
                    brand: 'Samsung',
                    model: model,
                    storages: [],
                    storagePrices: {},
                    newPhonePrices: {},
                    basePrice: usedPrice
                };
            }

            samsungPhones[model].storages.push(storage);
            samsungPhones[model].storagePrices[storage] = usedPrice;
            if (newPrice > 0) {
                samsungPhones[model].newPhonePrices[storage] = newPrice;
            }

            if (usedPrice < samsungPhones[model].basePrice) {
                samsungPhones[model].basePrice = usedPrice;
            }
        });

        // ============================================
        // CONVERT TO ADMIN FORMAT
        // ============================================
        console.log('🔄 Converting to admin format with buyPrices...');

        const allPhoneModels = { ...applePhones, ...samsungPhones };

        Object.values(allPhoneModels).forEach(phoneData => {
            const phoneId = `${phoneData.brand.toLowerCase()}-${phoneData.model.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`;

            // Calculate buyPrices for each storage
            const buyPrices = {};
            const quantities = {};

            phoneData.storages.forEach(storage => {
                const usedPrice = phoneData.storagePrices[storage];

                // BuyPrices (what we pay customers for USED phones)
                buyPrices[storage] = {
                    excellent: usedPrice,
                    good: Math.round(usedPrice * 0.95),
                    fair: Math.round(usedPrice * 0.85)
                };

                // Initialize quantities
                quantities[storage] = {
                    excellent: 0,
                    good: 0,
                    fair: 0
                };
            });

            // Get colors from phoneDatabase if available
            let colors = [];
            if (typeof phoneDatabase !== 'undefined') {
                const dbPhone = phoneDatabase[phoneData.brand]?.[phoneData.model];
                if (dbPhone && dbPhone.colors) {
                    colors = dbPhone.colors;
                }
            }

            // Get image from phoneDatabase if available
            let image = `images/phones/${phoneId}.jpg`;
            if (typeof phoneDatabase !== 'undefined') {
                const dbPhone = phoneDatabase[phoneData.brand]?.[phoneData.model];
                if (dbPhone && dbPhone.image) {
                    image = dbPhone.image;
                }
            }

            const phone = {
                id: phoneId,
                brand: phoneData.brand,
                model: phoneData.model,
                image: image,
                colors: colors,
                storages: phoneData.storages,
                basePrice: phoneData.basePrice,
                storagePrices: phoneData.storagePrices,
                newPhonePrices: phoneData.newPhonePrices,
                buyPrices: buyPrices,
                quantities: quantities,
                display: true,
                available: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            phones.push(phone);

            if (phoneData.brand === 'Apple') appleCount++;
            if (phoneData.brand === 'Samsung') samsungCount++;
        });

        // ============================================
        // SAVE TO LOCALSTORAGE
        // ============================================
        console.log('💾 Saving to localStorage...');

        localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
        localStorage.setItem('ktmobile_last_update', new Date().toISOString());

        console.log('✅ EXCEL IMPORT COMPLETE');
        console.log(`   📱 Apple: ${appleCount} models`);
        console.log(`   📱 Samsung: ${samsungCount} models`);
        console.log(`   📦 Total: ${phones.length} models`);

        const result = {
            added: phones.length,
            updated: 0,
            total: phones.length,
            appleCount,
            samsungCount
        };

        alert(`✅ EXCEL IMPORT SUCCESSFUL!\n\n` +
              `📱 Apple: ${appleCount} models\n` +
              `📱 Samsung: ${samsungCount} models\n` +
              `📦 Total: ${phones.length} models\n\n` +
              `✨ All prices loaded directly from Excel files\n` +
              `✨ All phones set to display=true\n` +
              `✨ BuyPrices calculated (Excellent/Good/Fair)`);

        return result;

    } catch (error) {
        console.error('❌ Excel import error:', error);
        alert('❌ Error importing from Excel: ' + error.message);
        return { added: 0, updated: 0, total: 0, error: error.message };
    }
}

// Make function globally available
if (typeof window !== 'undefined') {
    window.importFromExcelDirect = importFromExcelDirect;
}
