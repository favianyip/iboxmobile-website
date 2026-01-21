/**
 * MASTER COLOR DATABASE
 * =====================
 * Centralized color definitions for all phone models
 * Used by import scripts and admin panel for consistent color mapping
 *
 * @version 1.0.0
 * @date 2026-01-21
 */

console.log('🎨 master-color-database.js loaded');

const masterColorDatabase = {
    // Apple colors
    Apple: {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Silver': '#C0C0C0',
        'Gold': '#FFD700',
        'Rose Gold': '#B76E79',
        'Space Gray': '#52514D',
        'Space Black': '#1C1C1E',
        'Midnight': '#2C2C2E',
        'Starlight': '#F5F5DC',
        'Blue': '#1E3A8A',
        'Purple': '#9333EA',
        'Red': '#DC2626',
        'Green': '#059669',
        'Pink': '#EC4899',
        'Yellow': '#EAB308',
        'Coral': '#FF6B6B',

        // iPhone 16 Pro colors
        'Black Titanium': '#1C1C1E',
        'White Titanium': '#F5F5F0',
        'Natural Titanium': '#D4C4B0',
        'Blue Titanium': '#2C5282',
        'Desert Titanium': '#C19A6B',

        // iPhone 17 colors
        'Cosmic Orange': '#FF6B35',
        'Deep Blue': '#003D82'
    },

    // Samsung colors
    Samsung: {
        'Phantom Black': '#1C1C1C',
        'Phantom Silver': '#D1D1D6',
        'Phantom Gray': '#8E8E93',
        'Phantom White': '#F5F5F5',
        'Phantom Violet': '#8E7CC3',
        'Titanium Black': '#1C1C1C',
        'Titanium Gray': '#8E8E93',
        'Titanium Violet': '#C9B3D8',
        'Titanium Yellow': '#FFD60A',
        'Titanium Green': '#30D158',
        'Titanium Orange': '#FF9500',
        'Titanium Blue': '#0A84FF',
        'Onyx Black': '#000000',
        'Marble Gray': '#B4B4B8',
        'Cobalt Violet': '#8E7CC3',
        'Amber Yellow': '#FFD60A',
        'Jade Green': '#32D74B',
        'Sapphire Blue': '#0A84FF',
        'Sandstone Orange': '#FF9F0A',
        'Cloud Navy': '#2C3E50',
        'Cloud White': '#F8F8F8',
        'Lavender': '#E6E6FA',
        'Mint': '#98FF98',
        'Cream': '#FFFDD0',
        'Burgundy': '#800020',
        'Bronze': '#CD7F32',
        'Graphite': '#383838',
        'Icy Blue': '#B0E0E6'
    },

    // Generic fallback colors
    Generic: {
        'Gray': '#808080',
        'Dark Gray': '#404040',
        'Light Gray': '#D3D3D3',
        'Beige': '#F5F5DC',
        'Brown': '#964B00',
        'Navy': '#000080',
        'Turquoise': '#40E0D0',
        'Orange': '#FF8C00',
        'Teal': '#008080',
        'Ultramarine': '#4169E1'
    }
};

/**
 * Get color hex code by name and brand
 * @param {string} colorName - Name of the color
 * @param {string} brand - Brand name (Apple, Samsung, etc.)
 * @returns {string} Hex color code
 */
function getColorHex(colorName, brand = 'Generic') {
    if (!colorName) return '#000000';

    // Try brand-specific colors first
    if (masterColorDatabase[brand] && masterColorDatabase[brand][colorName]) {
        return masterColorDatabase[brand][colorName];
    }

    // Try generic colors
    if (masterColorDatabase.Generic[colorName]) {
        return masterColorDatabase.Generic[colorName];
    }

    // Default to black
    console.warn(`⚠️ Color not found: ${colorName} (${brand}), using black`);
    return '#000000';
}

/**
 * Get all colors for a brand
 * @param {string} brand - Brand name
 * @returns {Object} Object with color names as keys and hex codes as values
 */
function getBrandColors(brand) {
    return masterColorDatabase[brand] || masterColorDatabase.Generic;
}

// Make functions globally available
window.masterColorDatabase = masterColorDatabase;
window.getColorHex = getColorHex;
window.getBrandColors = getBrandColors;

console.log('✅ Master color database ready');
console.log(`   📱 Apple colors: ${Object.keys(masterColorDatabase.Apple).length}`);
console.log(`   📱 Samsung colors: ${Object.keys(masterColorDatabase.Samsung).length}`);
