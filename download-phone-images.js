/**
 * Automated Phone Image Downloader
 *
 * This script downloads high-quality product images for all phone models
 * from official sources and free stock photo APIs.
 *
 * Sources:
 * - Unsplash API (free stock photos)
 * - Direct URLs to official images
 *
 * Run: node download-phone-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'images', 'phones');
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_KEY'; // Optional: Get from https://unsplash.com/developers

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Phone models that need images (from audit)
const phonesToDownload = [
    // Apple - Real Products Missing Images
    { model: 'iPhone XR', filename: 'apple-iphone-xr.jpg', search: 'iphone xr product official' },
    { model: 'iPhone XS', filename: 'apple-iphone-xs.jpg', search: 'iphone xs product official' },
    { model: 'iPhone XS Max', filename: 'apple-iphone-xs-max.jpg', search: 'iphone xs max product official' },
    { model: 'iPhone SE 2022', filename: 'apple-iphone-se-2022.jpg', search: 'iphone se 2022 product official' },

    // Samsung - Real Products Missing Images
    { model: 'Galaxy S21 FE', filename: 'samsung-galaxy-s21-fe-5g.jpg', search: 'samsung galaxy s21 fe product official' },
    { model: 'Galaxy S23 FE', filename: 'samsung-galaxy-s23-fe-5g.jpg', search: 'samsung galaxy s23 fe product official' },
    { model: 'Galaxy S24 FE', filename: 'samsung-galaxy-s24-fe-5g.jpg', search: 'samsung galaxy s24 fe product official' },
    { model: 'Galaxy Z Fold 6', filename: 'samsung-galaxy-z-fold-6-5g.jpg', search: 'samsung galaxy z fold 6 product official' },
    { model: 'Galaxy Z Flip 6', filename: 'samsung-galaxy-z-flip-6-5g.jpg', search: 'samsung galaxy z flip 6 product official' },
    { model: 'Galaxy A36', filename: 'samsung-galaxy-a36-5g.jpg', search: 'samsung galaxy a36 product official' },
    { model: 'Galaxy A55', filename: 'samsung-galaxy-a55-5g.jpg', search: 'samsung galaxy a55 product official' },
    { model: 'Galaxy A73', filename: 'samsung-galaxy-a73-5g.jpg', search: 'samsung galaxy a73 product official' },
    { model: 'Galaxy Buds 3', filename: 'samsung-galaxy-buds-3.jpg', search: 'samsung galaxy buds 3 product official' },
    { model: 'Galaxy Buds 3 Pro', filename: 'samsung-galaxy-buds-3-pro.jpg', search: 'samsung galaxy buds 3 pro product official' },
];

// Direct image URLs (curated high-quality sources)
const directImageURLs = {
    'apple-iphone-xr.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP781/SP781-iphone-xr.jpg',
    'apple-iphone-xs.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP779/SP779-iphone-xs.jpg',
    'apple-iphone-xs-max.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP780/SP780-iPhone-Xs-Max.jpg',
    'apple-iphone-se-2022.jpg': 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP867/sp867-iphone-se-3rd-gen_2x.png',
};

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        console.log(`📥 Downloading: ${path.basename(filepath)}`);
        console.log(`   URL: ${url}`);

        const file = fs.createWriteStream(filepath);

        protocol.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                console.log(`   🔀 Redirect to: ${response.headers.location}`);
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                const stats = fs.statSync(filepath);
                const sizeKB = (stats.size / 1024).toFixed(2);
                console.log(`   ✅ Downloaded: ${sizeKB} KB`);
                resolve(filepath);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete partial file
            reject(err);
        });
    });
}

/**
 * Search and download from Unsplash
 */
async function downloadFromUnsplash(query, filename) {
    if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_KEY') {
        console.log(`   ⚠️  Skipping Unsplash (no API key)`);
        return null;
    }

    const searchURL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

    return new Promise((resolve, reject) => {
        https.get(searchURL, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                try {
                    const result = JSON.parse(data);

                    if (result.results && result.results.length > 0) {
                        const imageUrl = result.results[0].urls.regular;
                        const filepath = path.join(OUTPUT_DIR, filename);
                        await downloadImage(imageUrl, filepath);
                        resolve(filepath);
                    } else {
                        resolve(null);
                    }
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

/**
 * Copy existing similar image as placeholder
 */
function createPlaceholder(sourceFilename, targetFilename) {
    const sourcePath = path.join(OUTPUT_DIR, sourceFilename);
    const targetPath = path.join(OUTPUT_DIR, targetFilename);

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`   📋 Created placeholder from: ${sourceFilename}`);
        return true;
    }

    return false;
}

/**
 * Main download function
 */
async function downloadAllImages() {
    console.log('🚀 Starting Phone Image Download');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    console.log(`📦 Total images to download: ${phonesToDownload.length}`);
    console.log('');

    let successCount = 0;
    let failedCount = 0;
    const failed = [];

    for (const phone of phonesToDownload) {
        console.log(`\n📱 Processing: ${phone.model}`);

        const filepath = path.join(OUTPUT_DIR, phone.filename);

        // Skip if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`   ⏭️  Already exists, skipping`);
            successCount++;
            continue;
        }

        let downloaded = false;

        // Try direct URL first
        if (directImageURLs[phone.filename]) {
            try {
                await downloadImage(directImageURLs[phone.filename], filepath);
                downloaded = true;
                successCount++;
            } catch (err) {
                console.log(`   ❌ Direct download failed: ${err.message}`);
            }
        }

        // Try Unsplash if direct URL failed
        if (!downloaded) {
            try {
                const result = await downloadFromUnsplash(phone.search, phone.filename);
                if (result) {
                    downloaded = true;
                    successCount++;
                }
            } catch (err) {
                console.log(`   ❌ Unsplash failed: ${err.message}`);
            }
        }

        // If still failed, mark for manual download
        if (!downloaded) {
            console.log(`   ⚠️  Could not download automatically`);
            failed.push(phone);
            failedCount++;
        }

        // Be nice to APIs - wait 500ms between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Create placeholders for future/unreleased models
    console.log('\n\n📋 Creating placeholders for future models...');

    const placeholders = [
        { source: 'iphone-16.jpg', target: 'apple-iphone-17.jpg' },
        { source: 'iphone-16-pro.jpg', target: 'apple-iphone-17-pro.jpg' },
        { source: 'iphone-16-pro-max.jpg', target: 'apple-iphone-17-pro-max.jpg' },
        { source: 'iphone-se-3rd-gen.jpg', target: 'apple-iphone-16e.jpg' },
        { source: 'iphone-15.jpg', target: 'apple-iphone-air.jpg' },
        { source: 'galaxy-s24.jpg', target: 'samsung-galaxy-s25-5g.jpg' },
        { source: 'galaxy-s24-plus.jpg', target: 'samsung-galaxy-s25-plus-5g.jpg' },
        { source: 'galaxy-s24-ultra.jpg', target: 'samsung-galaxy-s25-ultra-5g.jpg' },
        { source: 'galaxy-s24.jpg', target: 'samsung-galaxy-s25-edge-5g.jpg' },
        { source: 'galaxy-s24-fe.jpg', target: 'samsung-galaxy-s25-fe-5g.jpg' },
        { source: 'galaxy-z-fold-6-5g.jpg', target: 'samsung-galaxy-z-fold-7-5g.jpg' },
        { source: 'galaxy-z-flip-6-5g.jpg', target: 'samsung-galaxy-z-flip-7-5g.jpg' },
        { source: 'galaxy-z-flip-6-5g.jpg', target: 'samsung-galaxy-z-flip-7-fe-5g.jpg' },
        { source: 'samsung-galaxy-a55-5g.jpg', target: 'samsung-galaxy-a56-5g.jpg' },
    ];

    let placeholderCount = 0;
    for (const placeholder of placeholders) {
        const targetPath = path.join(OUTPUT_DIR, placeholder.target);

        if (!fs.existsSync(targetPath)) {
            if (createPlaceholder(placeholder.source, placeholder.target)) {
                placeholderCount++;
            }
        }
    }

    // Summary
    console.log('\n');
    console.log('='.repeat(60));
    console.log('📊 DOWNLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully downloaded: ${successCount}`);
    console.log(`📋 Placeholders created: ${placeholderCount}`);
    console.log(`❌ Failed downloads: ${failedCount}`);
    console.log(`📦 Total images: ${successCount + placeholderCount}`);

    if (failed.length > 0) {
        console.log('\n⚠️  MANUAL DOWNLOAD REQUIRED:');
        failed.forEach(phone => {
            console.log(`   - ${phone.model} → ${phone.filename}`);
            console.log(`     Search: ${phone.search}`);
        });
    }

    console.log('\n✅ Image download complete!');
    console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Check images/phones/ folder');
    console.log('   2. Manually download any failed images');
    console.log('   3. Run "Reset to Default Prices" in admin panel');
    console.log('   4. Verify images on buy.html');
}

// Run the script
if (require.main === module) {
    downloadAllImages().catch(err => {
        console.error('❌ Fatal error:', err);
        process.exit(1);
    });
}

module.exports = { downloadAllImages, downloadImage };
