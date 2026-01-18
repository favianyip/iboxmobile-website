// ============================================================================
// SMART IMAGE MAPPER - Intelligent image fallback system
// ============================================================================
// Maps product models to existing images with smart fallbacks
// Eliminates 404 errors by using similar product images
// ============================================================================

const SMART_IMAGE_MAPPER = {
    // ========================================================================
    // EXACT IMAGE MAPPINGS - Models with actual image files
    // ========================================================================
    exact: {
        // iPhones with existing images
        'iPhone 16 Pro Max': 'images/phones/iphone-16-pro-max.jpg',
        'iPhone 16 Pro': 'images/phones/iphone-16-pro.jpg',
        'iPhone 16 Plus': 'images/phones/iphone-16-plus.jpg',
        'iPhone 16': 'images/phones/iphone-16.jpg',
        'iPhone 15 Pro Max': 'images/phones/iphone-15-pro-max.jpg',
        'iPhone 15 Pro': 'images/phones/iphone-15-pro.jpg',
        'iPhone 15 Plus': 'images/phones/iphone-15-plus.jpg',
        'iPhone 15': 'images/phones/iphone-15.jpg',
        'iPhone 14 Pro Max': 'images/phones/iphone-14-pro-max.jpg',
        'iPhone 14 Pro': 'images/phones/iphone-14-pro.jpg',
        'iPhone 14 Plus': 'images/phones/iphone-14-plus.jpg',
        'iPhone 14': 'images/phones/iphone-14.jpg',
        'iPhone 13 Pro Max': 'images/phones/iphone-13-pro-max.jpg',
        'iPhone 13 Pro': 'images/phones/iphone-13-pro.jpg',
        'iPhone 13 Mini': 'images/phones/iphone-13-mini.jpg',
        'iPhone 13': 'images/phones/iphone-13.jpg',
        'iPhone 12 Pro Max': 'images/phones/iphone-12-pro-max.jpg',
        'iPhone 12 Pro': 'images/phones/iphone-12-pro.jpg',
        'iPhone 12 Mini': 'images/phones/iphone-12-mini.jpg',
        'iPhone 12': 'images/phones/iphone-12.jpg',
        'iPhone 11 Pro Max': 'images/phones/iphone-11-pro-max.jpg',
        'iPhone 11 Pro': 'images/phones/iphone-11-pro.jpg',
        'iPhone 11': 'images/phones/iphone-11.jpg',
        'iPhone SE (2022)': 'images/phones/iphone-se-3rd-gen.jpg',
        'iPhone SE (2020)': 'images/phones/iphone-se-3rd-gen.jpg',
        'iPhone XS Max': 'images/phones/iphone-xs-max.jpg',
        'iPhone XS': 'images/phones/iphone-xs.jpg',
        'iPhone XR': 'images/phones/iphone-xr.jpg',
        'iPhone X': 'images/phones/iphone-xs.jpg',

        // Samsung phones with existing images
        'Galaxy S24 Ultra 5G': 'images/phones/galaxy-s24-ultra.jpg',
        'Galaxy S24+ 5G': 'images/phones/galaxy-s24-plus.jpg',
        'Galaxy S24 Plus 5G': 'images/phones/galaxy-s24-plus.jpg',
        'Galaxy S24 5G': 'images/phones/galaxy-s24.jpg',
        'Galaxy S23 Ultra 5G': 'images/phones/galaxy-s23-ultra.jpg',
        'Galaxy S23+ 5G': 'images/phones/galaxy-s23-plus.jpg',
        'Galaxy S23 5G': 'images/phones/galaxy-s23.jpg',
        'Galaxy S22 Ultra 5G': 'images/phones/galaxy-s22-ultra.jpg',
        'Galaxy S22+ 5G': 'images/phones/galaxy-s22-plus.jpg',
        'Galaxy S22 5G': 'images/phones/galaxy-s22.jpg',
        'Galaxy S21 Ultra 5G': 'images/phones/galaxy-s21-ultra.jpg',
        'Galaxy S21+ 5G': 'images/phones/galaxy-s21-plus.jpg',
        'Galaxy S21 5G': 'images/phones/galaxy-s21.jpg',
        'Galaxy Z Flip5 5G': 'images/phones/galaxy-z-flip5.jpg',
        'Galaxy Z Flip4 5G': 'images/phones/galaxy-z-flip4.jpg',
        'Galaxy Z Flip3 5G': 'images/phones/galaxy-z-flip3.jpg',
        'Galaxy Z Fold5 5G': 'images/phones/galaxy-z-fold5.jpg',
        'Galaxy Z Fold4 5G': 'images/phones/galaxy-z-fold4.jpg',
        'Galaxy Z Fold3 5G': 'images/phones/galaxy-z-fold3.jpg',
        'Galaxy A54 5G': 'images/phones/galaxy-a54.jpg',
        'Galaxy A34 5G': 'images/phones/galaxy-a34.jpg',
        'Galaxy Note20 Ultra 5G': 'images/phones/galaxy-note20-ultra.jpg',
        'Galaxy Note20 5G': 'images/phones/galaxy-note20.jpg'
    },

    // ========================================================================
    // SMART FALLBACK PATTERNS - Use similar existing images
    // ========================================================================
    patterns: [
        // iPhone 17 series -> Use iPhone 16 equivalents
        { match: /iPhone 17 Pro Max/i, fallback: 'images/phones/iphone-16-pro-max.jpg' },
        { match: /iPhone 17 Pro/i, fallback: 'images/phones/iphone-16-pro.jpg' },
        { match: /iPhone Air/i, fallback: 'images/phones/iphone-16.jpg' },
        { match: /iPhone 17/i, fallback: 'images/phones/iphone-16.jpg' },
        { match: /iPhone 16E/i, fallback: 'images/phones/iphone-16.jpg' },

        // iPhone 8, 7, 6 series -> Use iPhone XS/XR
        { match: /iPhone 8 Plus/i, fallback: 'images/phones/iphone-xs-max.jpg' },
        { match: /iPhone 8/i, fallback: 'images/phones/iphone-xs.jpg' },
        { match: /iPhone 7/i, fallback: 'images/phones/iphone-xs.jpg' },

        // iPads -> Use iPad Pro image
        { match: /iPad Pro.*M[45]/i, fallback: 'images/phones/iphone-16-pro-max.jpg' },
        { match: /iPad Air/i, fallback: 'images/phones/iphone-16-plus.jpg' },
        { match: /iPad.*10th Gen/i, fallback: 'images/phones/iphone-16.jpg' },
        { match: /iPad Mini/i, fallback: 'images/phones/iphone-13-mini.jpg' },
        { match: /iPad/i, fallback: 'images/phones/iphone-16.jpg' },

        // Apple Watch -> Use iPhone as placeholder
        { match: /Apple Watch Ultra/i, fallback: 'images/phones/iphone-16-pro-max.jpg' },
        { match: /Apple Watch/i, fallback: 'images/phones/iphone-16.jpg' },

        // AirPods -> Use iPhone as placeholder
        { match: /AirPods Max/i, fallback: 'images/phones/iphone-16-pro.jpg' },
        { match: /AirPods Pro/i, fallback: 'images/phones/iphone-16.jpg' },
        { match: /AirPods/i, fallback: 'images/phones/iphone-16.jpg' },

        // Samsung S25 series -> Use S24 equivalents
        { match: /Galaxy S25 Ultra/i, fallback: 'images/phones/galaxy-s24-ultra.jpg' },
        { match: /Galaxy S25\+/i, fallback: 'images/phones/galaxy-s24-plus.jpg' },
        { match: /Galaxy S25 FE/i, fallback: 'images/phones/galaxy-s24.jpg' },
        { match: /Galaxy S25/i, fallback: 'images/phones/galaxy-s24.jpg' },

        // Samsung S23 FE -> Use S23
        { match: /Galaxy S23 FE/i, fallback: 'images/phones/galaxy-s23.jpg' },
        { match: /Galaxy S21 FE/i, fallback: 'images/phones/galaxy-s21.jpg' },
        { match: /Galaxy S20 FE/i, fallback: 'images/phones/galaxy-s21.jpg' },

        // Samsung S20 series -> Use S21 equivalents
        { match: /Galaxy S20 Ultra/i, fallback: 'images/phones/galaxy-s21-ultra.jpg' },
        { match: /Galaxy S20\+/i, fallback: 'images/phones/galaxy-s21-plus.jpg' },
        { match: /Galaxy S20/i, fallback: 'images/phones/galaxy-s21.jpg' },

        // Samsung Z Fold 7, 6 -> Use Z Fold 5
        { match: /Galaxy Z Fold 7/i, fallback: 'images/phones/galaxy-z-fold5.jpg' },
        { match: /Galaxy Z Fold 6/i, fallback: 'images/phones/galaxy-z-fold5.jpg' },

        // Samsung Z Flip 7, 6 -> Use Z Flip 5
        { match: /Galaxy Z Flip 7/i, fallback: 'images/phones/galaxy-z-flip5.jpg' },
        { match: /Galaxy Z Flip 6/i, fallback: 'images/phones/galaxy-z-flip5.jpg' },

        // Samsung A series -> Use A54
        { match: /Galaxy A[0-9]{2}/i, fallback: 'images/phones/galaxy-a54.jpg' },

        // Samsung Tablets -> Use S24
        { match: /Galaxy Tab/i, fallback: 'images/phones/galaxy-s24.jpg' },

        // Samsung Watches -> Use S24
        { match: /Galaxy Watch/i, fallback: 'images/phones/galaxy-s24.jpg' },

        // Samsung Buds -> Use S24
        { match: /Galaxy Buds/i, fallback: 'images/phones/galaxy-s24.jpg' }
    ],

    // ========================================================================
    // DEFAULT FALLBACKS by Brand
    // ========================================================================
    brandDefaults: {
        'Apple': 'images/phones/iphone-16-pro-max.jpg',
        'Samsung': 'images/phones/galaxy-s24-ultra.jpg'
    }
};

// ============================================================================
// GET SMART IMAGE - Main function with intelligent fallback
// ============================================================================
function getSmartImage(brand, model) {
    if (!model) {
        return SMART_IMAGE_MAPPER.brandDefaults[brand] || 'images/phones/iphone-16-pro-max.jpg';
    }

    // Try exact match first
    if (SMART_IMAGE_MAPPER.exact[model]) {
        return SMART_IMAGE_MAPPER.exact[model];
    }

    // Try pattern matching
    for (const pattern of SMART_IMAGE_MAPPER.patterns) {
        if (pattern.match.test(model)) {
            return pattern.fallback;
        }
    }

    // Try auto-generated path (might exist for some models)
    const autoPath = `images/phones/${model.toLowerCase().replace(/\s+/g, '-')}.jpg`;

    // Fall back to brand default
    return SMART_IMAGE_MAPPER.brandDefaults[brand] || 'images/phones/iphone-16-pro-max.jpg';
}

// ============================================================================
// EXPORT
// ============================================================================
if (typeof window !== 'undefined') {
    window.SMART_IMAGE_MAPPER = SMART_IMAGE_MAPPER;
    window.getSmartImage = getSmartImage;
    console.log('✅ Smart Image Mapper loaded');
    console.log(`   📸 ${Object.keys(SMART_IMAGE_MAPPER.exact).length} exact mappings`);
    console.log(`   🎯 ${SMART_IMAGE_MAPPER.patterns.length} smart patterns`);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SMART_IMAGE_MAPPER, getSmartImage };
}
