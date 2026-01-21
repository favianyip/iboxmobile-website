/**
 * SMART IMAGE MAPPER
 * ==================
 * Automatically maps phone models to their image paths
 * Uses consistent naming conventions for image files
 *
 * @version 1.0.0
 * @date 2026-01-21
 */

console.log('🖼️ smart-image-mapper.js loaded');

/**
 * Get image path for a phone model
 * @param {string} brand - Brand name (Apple, Samsung, etc.)
 * @param {string} model - Model name (iPhone 16 Pro Max, Galaxy S24 Ultra, etc.)
 * @returns {string} Image path
 */
function getPhoneImage(brand, model) {
    if (!brand || !model) {
        return 'images/phones/placeholder.jpg';
    }

    // Convert model name to URL-friendly format
    const modelSlug = model.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    // Build image path
    const imagePath = `images/phones/${modelSlug}.jpg`;

    return imagePath;
}

/**
 * Get default/placeholder image for a brand
 * @param {string} brand - Brand name
 * @returns {string} Image path
 */
function getDefaultImage(brand) {
    const brandImages = {
        'Apple': 'images/phones/iphone-placeholder.jpg',
        'Samsung': 'images/phones/samsung-placeholder.jpg'
    };

    return brandImages[brand] || 'images/phones/placeholder.jpg';
}

/**
 * Validate if image exists (client-side check)
 * @param {string} imagePath - Path to image
 * @returns {Promise<boolean>} True if image exists
 */
async function imageExists(imagePath) {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Get image with fallback
 * Tries the specific model image first, falls back to brand default
 * @param {string} brand - Brand name
 * @param {string} model - Model name
 * @returns {Promise<string>} Image path (with fallback if needed)
 */
async function getPhoneImageWithFallback(brand, model) {
    const primaryImage = getPhoneImage(brand, model);

    // Try primary image
    const exists = await imageExists(primaryImage);
    if (exists) {
        return primaryImage;
    }

    // Fall back to brand default
    console.warn(`⚠️ Image not found: ${primaryImage}, using default for ${brand}`);
    return getDefaultImage(brand);
}

/**
 * Image mapping for specific models (overrides)
 * Use this for models with non-standard naming
 */
const imageOverrides = {
    // Apple overrides
    'iPhone 16E': 'images/phones/iphone-se-3rd-gen.jpg',
    'iPhone Air': 'images/phones/iphone-16.jpg',
    'iPhone 17 Pro Max': 'images/phones/iphone-16-pro-max.jpg',
    'iPhone 17 Pro': 'images/phones/iphone-16-pro.jpg',
    'iPhone 17': 'images/phones/iphone-16.jpg',

    // Samsung overrides (if needed)
    'Galaxy S24 Ultra': 'images/phones/samsung-s24-ultra.jpg',
    'Galaxy S24+': 'images/phones/samsung-s24-plus.jpg',
    'Galaxy S24': 'images/phones/samsung-s24.jpg'
};

/**
 * Get image with overrides
 * Checks override map first, then uses standard mapping
 * @param {string} brand - Brand name
 * @param {string} model - Model name
 * @returns {string} Image path
 */
function getPhoneImageWithOverrides(brand, model) {
    // Check overrides first
    if (imageOverrides[model]) {
        return imageOverrides[model];
    }

    // Use standard mapping
    return getPhoneImage(brand, model);
}

// Make functions globally available
window.getPhoneImage = getPhoneImage;
window.getDefaultImage = getDefaultImage;
window.imageExists = imageExists;
window.getPhoneImageWithFallback = getPhoneImageWithFallback;
window.getPhoneImageWithOverrides = getPhoneImageWithOverrides;
window.imageOverrides = imageOverrides;

console.log('✅ Smart image mapper ready');
console.log(`   🖼️ Image overrides: ${Object.keys(imageOverrides).length} models`);
