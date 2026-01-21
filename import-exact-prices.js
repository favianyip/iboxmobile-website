/**
 * IMPORT EXACT PRICES
 * ====================
 * This script imports phone pricing data into localStorage for the buyback system.
 * It serves as the bridge between the hardcoded phoneDatabase and the admin panel.
 *
 * CRITICAL FIX FOR MOBILE SYNC ISSUE:
 * - Mobile browsers have separate localStorage from desktop browsers
 * - This script exports data to /data/admin-data.json for cross-browser sync
 * - Customer pages auto-load from admin-data.json if localStorage is empty
 *
 * Data Structure:
 * - storagePrices: USED phone prices (for buyback)
 * - newPhonePrices: NEW sealed phone prices (for buyback)
 * - buyPrices: Refurbished phone selling prices (for product page)
 *
 * @version 2.0.0 - Mobile Sync Fix
 * @date 2026-01-21
 */

console.log('📦 import-exact-prices.js loaded');

/**
 * Main import function - imports exact prices from phoneDatabase to localStorage
 * This function is called by the admin panel's "Import Exact Prices" button
 *
 * @returns {Object} Statistics about the import (updated, added, total)
 */
function importExactPrices() {
    console.log('🚀 Starting Exact Price Import...');
    console.log('📊 Source: phoneDatabase (hardcoded in quote.js)');

    try {
        // Check if phoneDatabase is available
        if (typeof phoneDatabase === 'undefined') {
            throw new Error('phoneDatabase not found! Make sure quote.js is loaded before this script.');
        }

        // Load existing phones from localStorage (if any)
        const existingPhones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        console.log(`📱 Found ${existingPhones.length} existing phones in localStorage`);

        // Load existing condition modifiers
        let conditionModifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || 'null');

        // If no modifiers exist, create default ones
        if (!conditionModifiers) {
            console.log('🔧 Creating default condition modifiers...');
            conditionModifiers = {
                body: { A: 0, B: -50, C: -150, D: -300 },
                screen: { A: 0, B: -30, C: -100, D: -200 },
                battery: { '91-100%': 0, '86-90%': -15, '81-85%': -25, '76-80%': -50, '75% or below': -100 },
                country: { local: 0, export: -50 },
                receipt: { yes: 30, no: -20 },
                activation: { sealed: 0, activated: -50 },
                deviceType: { 'new-activated': -50 },
                issues: {
                    powerButton: -50,
                    faceId: -100,
                    touchId: -75,
                    display: -200,
                    camera: -100,
                    speaker: -50,
                    microphone: -50,
                    wifi: -75,
                    bluetooth: -50,
                    cellular: -100
                },
                accessories: {
                    cable: 15,
                    box: 20
                }
            };
            localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(conditionModifiers));
            console.log('✅ Default condition modifiers created');
        }

        let updatedCount = 0;
        let addedCount = 0;
        const processedPhones = [];

        // Process each brand in phoneDatabase
        Object.keys(phoneDatabase).forEach(brand => {
            const models = phoneDatabase[brand];

            Object.keys(models).forEach(modelName => {
                const modelData = models[modelName];

                // Generate unique ID
                const phoneId = `${brand.toLowerCase()}-${modelName.toLowerCase().replace(/\s+/g, '-')}`;

                // Check if phone already exists
                const existingIndex = existingPhones.findIndex(p =>
                    p.brand === brand && p.model === modelName
                );

                // Extract storage options
                const storageOptions = Object.keys(modelData.storage || {});

                // Build storagePrices (USED prices)
                const storagePrices = {};
                storageOptions.forEach(storage => {
                    const modifier = modelData.storage[storage] || 0;
                    storagePrices[storage] = modelData.basePrice + modifier;
                });

                // Build newPhonePrices (NEW sealed prices - estimate 30% higher than used)
                const newPhonePrices = {};
                storageOptions.forEach(storage => {
                    const usedPrice = storagePrices[storage];
                    newPhonePrices[storage] = Math.round(usedPrice * 1.3); // 30% premium for new
                });

                // Build buyPrices (refurbished selling prices - not used for buyback)
                const buyPrices = {};
                const conditions = ['excellent', 'good', 'fair'];
                storageOptions.forEach(storage => {
                    buyPrices[storage] = {};
                    conditions.forEach(condition => {
                        const usedPrice = storagePrices[storage];
                        // Refurbished selling price is higher than buyback price
                        const markup = condition === 'excellent' ? 1.4 : condition === 'good' ? 1.3 : 1.2;
                        buyPrices[storage][condition] = Math.round(usedPrice * markup);
                    });
                });

                // Build quantities (stock - initialize to 0)
                const quantities = {};
                storageOptions.forEach(storage => {
                    quantities[storage] = {};
                    conditions.forEach(condition => {
                        quantities[storage][condition] = 0;
                    });
                });

                // Extract colors
                const colors = (modelData.colors || []).map(c => ({
                    name: c.name || 'Unknown',
                    hex: c.hex || '#000000'
                }));

                // Build phone object
                const phoneObj = {
                    id: phoneId,
                    brand: brand,
                    model: modelName,
                    image: modelData.image || `images/phones/${modelName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                    storages: storageOptions,
                    colors: colors,
                    basePrice: modelData.basePrice,
                    storagePrices: storagePrices,
                    newPhonePrices: newPhonePrices,
                    display: true, // Show on product pages by default
                    buyPrices: buyPrices,
                    quantities: quantities,
                    available: true,
                    createdAt: existingIndex >= 0 ? existingPhones[existingIndex].createdAt : new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                if (existingIndex >= 0) {
                    // Update existing phone
                    existingPhones[existingIndex] = phoneObj;
                    updatedCount++;
                    console.log(`🔄 Updated: ${brand} ${modelName}`);
                } else {
                    // Add new phone
                    existingPhones.push(phoneObj);
                    addedCount++;
                    console.log(`➕ Added: ${brand} ${modelName}`);
                }

                processedPhones.push(phoneObj);
            });
        });

        // Save to localStorage
        localStorage.setItem('ktmobile_phones', JSON.stringify(existingPhones));
        localStorage.setItem('ktmobile_last_update', new Date().toISOString());
        localStorage.setItem('quote_js_version', '2.2.0');

        const result = {
            updated: updatedCount,
            added: addedCount,
            total: existingPhones.length
        };

        console.log('✅ Import Complete!');
        console.log(`   📊 Statistics:`);
        console.log(`      - Updated: ${updatedCount} phones`);
        console.log(`      - Added: ${addedCount} phones`);
        console.log(`      - Total: ${existingPhones.length} phones`);
        console.log(`   💾 Saved to localStorage: ktmobile_phones`);

        // AUTO-EXPORT TO JSON FILE FOR MOBILE SYNC
        console.log('🔄 Auto-exporting to admin-data.json for mobile sync...');
        exportToAdminDataJson();

        return result;

    } catch (error) {
        console.error('❌ Import failed:', error);
        throw error;
    }
}

/**
 * Export localStorage data to admin-data.json file
 * This enables mobile browsers to sync data from desktop admin panel
 *
 * HOW IT WORKS:
 * 1. Admin imports prices on desktop → saves to localStorage
 * 2. This function exports localStorage → admin-data.json
 * 3. Mobile browser loads admin-data.json → syncs to mobile localStorage
 * 4. Mobile and desktop now show the same prices! ✅
 */
function exportToAdminDataJson() {
    try {
        console.log('📤 Exporting data to admin-data.json...');

        // Collect all data from localStorage
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        const conditionModifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}');
        const lastUpdate = localStorage.getItem('ktmobile_last_update');

        // Build export object
        const exportData = {
            version: '2.0',
            exportDate: new Date().toISOString(),
            lastUpdate: lastUpdate,
            note: 'Auto-exported from admin panel. This file enables mobile sync.',
            data: {
                phones: phones,
                brands: [...new Set(phones.map(p => p.brand))],
                conditionModifiers: conditionModifiers,
                heroImage: {},
                appointments: [],
                generalSettings: {
                    autoExport: true,
                    mobileSync: true
                }
            }
        };

        // Convert to JSON string
        const jsonString = JSON.stringify(exportData, null, 2);

        // Create download link
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'admin-data.json';

        // Auto-download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('✅ Exported to admin-data.json');
        console.log(`   📱 Total phones: ${phones.length}`);
        console.log(`   📅 Last update: ${lastUpdate}`);
        console.log('');
        console.log('📋 NEXT STEPS FOR MOBILE SYNC:');
        console.log('   1. Save the downloaded admin-data.json file');
        console.log('   2. Upload it to /data/admin-data.json on your server');
        console.log('   3. Mobile browsers will auto-load from this file');
        console.log('   4. Mobile and desktop will show the same prices! ✅');

        // Show user notification
        if (typeof alert !== 'undefined') {
            alert('✅ Data exported to admin-data.json!\n\n📋 Next Steps:\n1. Save the downloaded file\n2. Upload to /data/admin-data.json on server\n3. Mobile will auto-sync! 🎉');
        }

        return exportData;

    } catch (error) {
        console.error('❌ Export to admin-data.json failed:', error);
        console.error('   Error details:', error.message);
        return null;
    }
}

/**
 * Import data from admin-data.json file
 * This is called automatically by customer pages (quote.html, etc.) when localStorage is empty
 *
 * @returns {Promise<boolean>} True if import successful, false otherwise
 */
async function importFromAdminDataJson() {
    try {
        console.log('📥 Loading data from admin-data.json...');

        // Fetch the JSON file
        const response = await fetch('data/admin-data.json?v=' + Date.now());

        if (!response.ok) {
            console.warn(`⚠️ admin-data.json not found (${response.status}). Using hardcoded fallback.`);
            return false;
        }

        const data = await response.json();

        if (!data || !data.data || !data.data.phones) {
            console.warn('⚠️ admin-data.json has invalid format');
            return false;
        }

        // Import phones to localStorage
        const phones = data.data.phones;
        localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
        console.log(`✅ Imported ${phones.length} phones from admin-data.json`);

        // Import condition modifiers
        if (data.data.conditionModifiers) {
            localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(data.data.conditionModifiers));
            console.log('✅ Imported condition modifiers');
        }

        // Set last update timestamp
        if (data.lastUpdate) {
            localStorage.setItem('ktmobile_last_update', data.lastUpdate);
        } else {
            localStorage.setItem('ktmobile_last_update', data.exportDate || new Date().toISOString());
        }

        console.log('✅ Mobile sync successful! Data loaded from admin-data.json');
        console.log(`   📅 Data timestamp: ${data.lastUpdate || data.exportDate}`);

        return true;

    } catch (error) {
        console.error('❌ Failed to import from admin-data.json:', error);
        console.error('   Will use hardcoded phoneDatabase fallback');
        return false;
    }
}

// Make functions globally available
window.importExactPrices = importExactPrices;
window.exportToAdminDataJson = exportToAdminDataJson;
window.importFromAdminDataJson = importFromAdminDataJson;

console.log('✅ Import functions ready:');
console.log('   - importExactPrices()');
console.log('   - exportToAdminDataJson()');
console.log('   - importFromAdminDataJson()');
