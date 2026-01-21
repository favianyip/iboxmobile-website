/**
 * IMPORT BENCHMARK PRICES
 * ========================
 * Alternative import method using benchmark/competitor pricing
 * This is a secondary import option in the admin panel
 *
 * @version 1.0.0
 * @date 2026-01-21
 */

console.log('📊 import-benchmark-prices.js loaded');

/**
 * Import benchmark prices (competitor research data)
 * This is an alternative to exact price import
 *
 * @returns {Object} Statistics about the import (updated, added, total)
 */
function importBenchmarkPrices() {
    console.log('🚀 Starting Benchmark Price Import...');
    console.log('📊 Source: Market research / competitor prices');

    try {
        // Check if phoneDatabase is available
        if (typeof phoneDatabase === 'undefined') {
            throw new Error('phoneDatabase not found! Make sure quote.js is loaded before this script.');
        }

        // Load existing phones from localStorage (if any)
        const existingPhones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        console.log(`📱 Found ${existingPhones.length} existing phones in localStorage`);

        let updatedCount = 0;
        let addedCount = 0;

        // For benchmark import, we use the same logic as exact import
        // but you could modify this to apply market adjustments, competitor pricing, etc.

        // Process each brand in phoneDatabase
        Object.keys(phoneDatabase).forEach(brand => {
            const models = phoneDatabase[brand];

            Object.keys(models).forEach(modelName => {
                const modelData = models[modelName];

                // Check if phone already exists
                const existingIndex = existingPhones.findIndex(p =>
                    p.brand === brand && p.model === modelName
                );

                // For benchmark import, we might apply a market adjustment
                // Example: 5% lower than base price for competitive pricing
                const marketAdjustment = 0.95; // 5% discount

                // Extract storage options
                const storageOptions = Object.keys(modelData.storage || {});

                // Build storagePrices with market adjustment
                const storagePrices = {};
                storageOptions.forEach(storage => {
                    const modifier = modelData.storage[storage] || 0;
                    const basePrice = Math.round((modelData.basePrice + modifier) * marketAdjustment);
                    storagePrices[storage] = basePrice;
                });

                // Build newPhonePrices
                const newPhonePrices = {};
                storageOptions.forEach(storage => {
                    const usedPrice = storagePrices[storage];
                    newPhonePrices[storage] = Math.round(usedPrice * 1.3); // 30% premium for new
                });

                // If phone exists, update only the prices (keep other data)
                if (existingIndex >= 0) {
                    existingPhones[existingIndex].storagePrices = storagePrices;
                    existingPhones[existingIndex].newPhonePrices = newPhonePrices;
                    existingPhones[existingIndex].basePrice = Math.round(modelData.basePrice * marketAdjustment);
                    existingPhones[existingIndex].updatedAt = new Date().toISOString();
                    updatedCount++;
                    console.log(`🔄 Updated benchmark prices: ${brand} ${modelName}`);
                } else {
                    // If phone doesn't exist, we won't add it in benchmark mode
                    // Benchmark import is meant to update existing phones only
                    console.log(`⏭️ Skipped (not in database): ${brand} ${modelName}`);
                }
            });
        });

        // Save to localStorage
        localStorage.setItem('ktmobile_phones', JSON.stringify(existingPhones));
        localStorage.setItem('ktmobile_last_update', new Date().toISOString());

        const result = {
            updated: updatedCount,
            added: addedCount,
            total: existingPhones.length
        };

        console.log('✅ Benchmark Import Complete!');
        console.log(`   📊 Statistics:`);
        console.log(`      - Updated: ${updatedCount} phones`);
        console.log(`      - Added: ${addedCount} phones`);
        console.log(`      - Total: ${existingPhones.length} phones`);
        console.log(`   💾 Saved to localStorage: ktmobile_phones`);
        console.log(`   📉 Market adjustment: ${((1 - marketAdjustment) * 100).toFixed(1)}% discount`);

        // AUTO-EXPORT TO JSON FILE FOR MOBILE SYNC
        console.log('🔄 Auto-exporting to admin-data.json for mobile sync...');
        if (typeof exportToAdminDataJson === 'function') {
            exportToAdminDataJson();
        } else {
            console.warn('⚠️ exportToAdminDataJson not available');
        }

        return result;

    } catch (error) {
        console.error('❌ Benchmark import failed:', error);
        throw error;
    }
}

// Make function globally available
window.importBenchmarkPrices = importBenchmarkPrices;

console.log('✅ Benchmark import function ready');
console.log('   - importBenchmarkPrices()');
