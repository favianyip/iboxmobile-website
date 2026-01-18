// ============================================================================
// MISSING IMAGE DIAGNOSTIC TOOL
// Run this in browser console to see which product images are missing
// ============================================================================

function diagnoseMissingImages() {
    console.log('🖼️  MISSING IMAGE DIAGNOSTIC REPORT');
    console.log('='.repeat(80));

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');

    const missingImages = [];
    const existingImages = [];
    const imageCategories = {
        iPhones: [],
        iPads: [],
        AppleWatches: [],
        AirPods: [],
        SamsungPhones: [],
        SamsungWatches: [],
        SamsungBuds: [],
        SamsungTablets: []
    };

    phones.forEach(phone => {
        const imagePath = phone.image || '';
        const model = phone.model || '';
        const brand = phone.brand || '';

        // Check if image exists by trying to load it
        const img = new Image();
        img.onerror = () => {
            missingImages.push({
                model: model,
                brand: brand,
                imagePath: imagePath,
                category: categorizeProduct(brand, model)
            });
        };
        img.onload = () => {
            existingImages.push({
                model: model,
                brand: brand,
                imagePath: imagePath
            });
        };
        img.src = imagePath;
    });

    // Wait for images to load/fail
    setTimeout(() => {
        console.log('');
        console.log(`📊 TOTAL PRODUCTS: ${phones.length}`);
        console.log(`✅ EXISTING IMAGES: ${existingImages.length}`);
        console.log(`❌ MISSING IMAGES: ${missingImages.length}`);
        console.log('');
        console.log('='.repeat(80));
        console.log('MISSING IMAGES BY CATEGORY:');
        console.log('='.repeat(80));

        // Group by category
        const grouped = {};
        missingImages.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });

        Object.entries(grouped).forEach(([category, items]) => {
            console.log('');
            console.log(`📱 ${category.toUpperCase()} (${items.length} missing):`);
            items.forEach(item => {
                console.log(`   ❌ ${item.brand} ${item.model}`);
                console.log(`      Path: ${item.imagePath}`);
            });
        });

        console.log('');
        console.log('='.repeat(80));
        console.log('RECOMMENDED ACTIONS:');
        console.log('='.repeat(80));
        console.log('1. Create category-specific placeholder images');
        console.log('2. Download actual product images for high-priority models');
        console.log('3. Update fallback system to use category placeholders');
        console.log('='.repeat(80));

        return {
            total: phones.length,
            existing: existingImages.length,
            missing: missingImages.length,
            missingByCategory: grouped
        };
    }, 2000);
}

function categorizeProduct(brand, model) {
    const modelLower = model.toLowerCase();

    if (brand === 'Apple') {
        if (modelLower.includes('iphone')) return 'iPhones';
        if (modelLower.includes('ipad')) return 'iPads';
        if (modelLower.includes('watch')) return 'AppleWatches';
        if (modelLower.includes('airpod')) return 'AirPods';
    }

    if (brand === 'Samsung') {
        if (modelLower.includes('galaxy s') || modelLower.includes('galaxy z') || modelLower.includes('galaxy a') || modelLower.includes('galaxy note')) {
            return 'SamsungPhones';
        }
        if (modelLower.includes('watch')) return 'SamsungWatches';
        if (modelLower.includes('buds')) return 'SamsungBuds';
        if (modelLower.includes('tab')) return 'SamsungTablets';
    }

    return 'Other';
}

// Auto-run when loaded
if (typeof window !== 'undefined') {
    window.diagnoseMissingImages = diagnoseMissingImages;
    console.log('✅ Missing Image Diagnostic Tool loaded');
    console.log('📝 Run: diagnoseMissingImages()');
}
