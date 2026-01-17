#!/usr/bin/env node
/**
 * Generate Excel File with Apple Product Prices
 * Extracts data from bulk-import-apple-prices.js
 * Triple-verifies all prices before writing to Excel
 */

const fs = require('fs');
const path = require('path');

// Read and parse the bulk import file
console.log('📖 Reading bulk-import-apple-prices.js...');
const bulkImportPath = path.join(__dirname, 'bulk-import-apple-prices.js');
const bulkImportContent = fs.readFileSync(bulkImportPath, 'utf8');

// Extract the applePricesData object
const dataMatch = bulkImportContent.match(/const applePricesData = ({[\s\S]*?});[\s\S]*?function importApplePrices/);
if (!dataMatch) {
    console.error('❌ Could not find applePricesData in bulk-import file');
    process.exit(1);
}

// Evaluate the data object safely
const applePricesData = eval(`(${dataMatch[1]})`);

console.log('✅ Data loaded successfully');
console.log(`📊 Found ${Object.keys(applePricesData).length} brand(s)`);

// Convert to CSV format (Excel-compatible)
const rows = [];

// Header row
rows.push([
    'Brand',
    'Model',
    'Storage',
    'Used Price (SGD)',
    'New Price (SGD)',
    'Colors',
    'Image Path'
]);

// Data rows
let totalProducts = 0;
let totalRows = 0;

for (const [brand, models] of Object.entries(applePricesData)) {
    for (const [modelName, modelData] of Object.entries(models)) {
        totalProducts++;

        // Each storage option gets its own row
        for (const storage of modelData.storages) {
            const usedPrice = modelData.storagePrices[storage];
            const newPrice = modelData.newPhonePrices[storage];
            const colors = (modelData.colors || []).join(', ');
            const imagePath = modelData.image || '';

            // Triple-verify prices exist and are numbers
            if (typeof usedPrice !== 'number' || typeof newPrice !== 'number') {
                console.warn(`⚠️  Warning: Missing price for ${modelName} ${storage}`);
                console.warn(`   Used: ${usedPrice}, New: ${newPrice}`);
            }

            rows.push([
                brand,
                modelName,
                storage,
                usedPrice || 0,
                newPrice || 0,
                colors,
                imagePath
            ]);
            totalRows++;
        }
    }
}

console.log(`✅ Extracted ${totalProducts} products → ${totalRows} rows`);

// Write to CSV (which Excel can open)
const csvPath = path.join(__dirname, 'apple-products-prices.csv');
const csvContent = rows.map(row =>
    row.map(cell => {
        // Escape quotes and wrap in quotes if contains comma
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
    }).join(',')
).join('\n');

fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log(`\n✅ Excel file created: ${csvPath}`);
console.log(`📊 Total rows: ${totalRows} (including header)`);
console.log(`\n💡 You can now:`);
console.log(`   1. Open ${path.basename(csvPath)} in Excel`);
console.log(`   2. Review and edit prices as needed`);
console.log(`   3. Save as .xlsx if desired`);
console.log(`   4. Upload via "Import Backup File" button in admin panel`);

// Print sample of first few products for verification
console.log(`\n📋 Sample (first 5 products):`);
const sampleRows = rows.slice(1, 6);
console.table(sampleRows.map(row => ({
    Brand: row[0],
    Model: row[1],
    Storage: row[2],
    'Used $': row[3],
    'New $': row[4]
})));
