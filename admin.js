/**
 * Admin Dashboard - Phone Model Management System
 * Full CRUD operations for phones, prices, and settings
 */

// ============================================================================
// ADMIN DATA STORAGE (In production, use backend API)
// ============================================================================

class AdminDataManager {
    constructor() {
        this.phones = this.loadPhones();
        this.brands = this.loadBrands();
        this.currentEditingPhone = null;
    }

    /**
     * Load phones from localStorage or initialize from quote.js data
     * CRITICAL FIX: Always sync with phoneDatabase to get ALL models
     */
    loadPhones() {
        console.log('🔄 Loading phones...');

        // Check if phoneDatabase exists and count models
        let db = window.phoneDatabase || (typeof phoneDatabase !== 'undefined' ? phoneDatabase : null);
        let phoneDatabaseCount = 0;

        if (db) {
            Object.values(db).forEach(brand => {
                phoneDatabaseCount += Object.keys(brand).length;
            });
            console.log(`📱 phoneDatabase has ${phoneDatabaseCount} models`);
        }

        const stored = localStorage.getItem('ktmobile_phones');
        if (stored) {
            const phones = JSON.parse(stored);
            console.log(`💾 localStorage has ${phones.length} models`);

            // DISABLED: Don't re-initialize from phoneDatabase if localStorage has import data
            // Reason: Excel import (62 models) is SOURCE OF TRUTH, not phoneDatabase (69 hardcoded models)
            // phoneDatabase has old/test models that aren't in current Excel files
            // if (phoneDatabaseCount > phones.length) {
            //     console.warn(`⚠️  phoneDatabase has ${phoneDatabaseCount} models but localStorage only has ${phones.length}`);
            //     console.log('🔄 Re-initializing from phoneDatabase to get ALL models...');
            //     return this.initializePhones();
            // }

            if (phoneDatabaseCount !== phones.length) {
                console.log(`ℹ️  phoneDatabase: ${phoneDatabaseCount} hardcoded models, localStorage: ${phones.length} imported models from Excel`);
                console.log(`ℹ️  Using localStorage (Excel import) as source of truth`);
            }

            // DISABLED: Don't run ensureStoragePrices() on imported Excel data
            // Reason: Excel import already has correct storagePrices from Excel files
            // Running this would OVERWRITE Excel prices with hardcoded phoneDatabase prices!
            // Only run if localStorage was initialized from phoneDatabase (not imported)
            // this.ensureStoragePrices(phones, db);

            // Run migration to add missing fields
            this.migratePhoneData(phones);
            return phones;
        }

        // Initialize from existing quote.js data structure
        console.log('📦 No localStorage data, initializing from phoneDatabase...');
        return this.initializePhones();
    }

    /**
     * Ensure all phones have proper storagePrices populated from phoneDatabase
     * CRITICAL: Fixes issue where edit modal shows 0 prices
     */
    ensureStoragePrices(phones, db) {
        if (!db) return;

        let fixed = 0;
        phones.forEach(phone => {
            // Check if this phone exists in phoneDatabase
            const brandData = db[phone.brand];
            if (!brandData) return;

            const modelData = brandData[phone.model];
            if (!modelData) return;

            // Check if storagePrices is missing or incomplete
            let needsFix = false;
            if (!phone.storagePrices || Object.keys(phone.storagePrices).length === 0) {
                needsFix = true;
            } else {
                // Check if any storage is missing from storagePrices
                phone.storages.forEach(storage => {
                    if (!phone.storagePrices[storage] || phone.storagePrices[storage] === 0) {
                        needsFix = true;
                    }
                });
            }

            if (needsFix) {
                console.log(`🔧 Fixing storagePrices for ${phone.brand} ${phone.model}...`);

                // Rebuild storagePrices from phoneDatabase
                const storagePrices = {};
                Object.entries(modelData.storage || {}).forEach(([storage, modifier]) => {
                    storagePrices[storage] = (modelData.basePrice || 0) + (modifier || 0);
                });

                phone.storagePrices = storagePrices;
                phone.basePrice = modelData.basePrice || 0;
                fixed++;
            }
        });

        if (fixed > 0) {
            console.log(`✅ Fixed storagePrices for ${fixed} phones`);
            localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
        }
    }

    /**
     * Migrate phone data to add missing newPhonePrices field
     * Runs automatically on load to ensure all phones have required fields
     * CRITICAL: NEVER recalculate existing prices - only add missing fields as empty
     */
    migratePhoneData(phones) {
        console.log('🔄 Running phone data migration...');
        let migrated = 0;

        phones.forEach(phone => {
            let needsUpdate = false;

            // Add newPhonePrices if missing - LEAVE EMPTY, don't calculate!
            if (!phone.newPhonePrices) {
                phone.newPhonePrices = {};
                needsUpdate = true;
                migrated++;
                console.log(`📦 Added empty newPhonePrices field to ${phone.brand} ${phone.model}`);
            }

            // NO RECALCULATION! Exact prices come from import only.

            if (needsUpdate) {
                phone.updatedAt = new Date().toISOString();
                migrated++;
            }
        });

        if (migrated > 0) {
            localStorage.setItem('ktmobile_phones', JSON.stringify(phones));
            console.log(`✅ Migration complete: ${migrated} phones updated (NO auto-calculations)`);
            console.log(`💡 To rollback: localStorage.setItem('ktmobile_phones', localStorage.getItem('ktmobile_phones_backup'))`);
        } else {
            console.log('✅ No migration needed - all prices correct');
        }

        return migrated;
    }

    /**
     * Initialize phones from quote.js structure
     */
    initializePhones() {
        // Convert quote.js phoneDatabase to admin format
        const phones = [];
        
        // Check if phoneDatabase exists (global from quote.js)
        // Use window.phoneDatabase or direct reference
        let db = window.phoneDatabase || (typeof phoneDatabase !== 'undefined' ? phoneDatabase : null);
        
        // If still no phoneDatabase, create default phones
        if (!db) {
            console.warn('phoneDatabase not found, creating default phones');
            return this.createDefaultPhones();
        }
        
        console.log('Found phoneDatabase with', Object.keys(db).length, 'brands');
        
        // Process phoneDatabase
        if (db) {
            Object.entries(db).forEach(([brand, models]) => {
                Object.entries(models).forEach(([model, data]) => {
                    const storages = Object.keys(data.storage || {});
                    const storagePrices = {};
                    
                    // Convert storage price modifiers to absolute prices
                    Object.entries(data.storage || {}).forEach(([storage, modifier]) => {
                        storagePrices[storage] = (data.basePrice || 0) + (modifier || 0);
                    });
                    
                    // Initialize buy prices and quantities
                    const buyPrices = {};
                    const quantities = {};
                    
                    // For each storage, create condition-based pricing
                    storages.forEach(storage => {
                        const basePrice = storagePrices[storage] || data.basePrice || 0;
                        buyPrices[storage] = {
                            excellent: basePrice,
                            good: Math.round(basePrice * 0.95),
                            fair: Math.round(basePrice * 0.85)
                        };
                        quantities[storage] = {
                            excellent: 0,
                            good: 0,
                            fair: 0
                        };
                    });
                    
                    // FIXED: Use provided newPhonePrices, don't auto-calculate
                    const newPhonePrices = data.newPhonePrices || {};

                    phones.push({
                        id: `${brand}-${model.replace(/\s+/g, '-')}-${Date.now()}`,
                        brand: brand,
                        model: model,
                        image: data.image || this.getDefaultImage(brand),
                        storages: storages.length > 0 ? storages : ['128GB', '256GB'],
                        colors: data.colors ? data.colors.map(c => typeof c === 'string' ? c : c.name) : [],
                        basePrice: data.basePrice || 0,
                        storagePrices: storagePrices,        // USED prices
                        newPhonePrices: newPhonePrices,      // NEW SEALED prices
                        // Buy prices for refurbished phones
                        buyPrices: buyPrices,
                        quantities: quantities,
                        available: true,
                        display: true, // Display toggle - default to visible
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                });
            });
        }
        
        // If no phones were created, return default phones
        if (phones.length === 0) {
            console.warn('No phones from phoneDatabase, using defaults');
            return this.createDefaultPhones();
        }
        
        return phones;
    }
    
    /**
     * Create default phones if phoneDatabase is not available
     */
    createDefaultPhones() {
        console.log('Creating default phones...');
        const defaultPhones = [
            {
                id: 'apple-iphone-16-pro-max-1',
                brand: 'Apple',
                model: 'iPhone 16 Pro Max',
                image: 'images/phones/iphone-16-pro-max.jpg',
                storages: ['256GB', '512GB', '1TB'],
                colors: ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
                basePrice: 1800,
                storagePrices: { '256GB': 1800, '512GB': 1900, '1TB': 2000 },
                newPhonePrices: { '256GB': 2070, '512GB': 2185, '1TB': 2300 },
                buyPrices: {
                    '256GB': { excellent: 1800, good: 1710, fair: 1530 },
                    '512GB': { excellent: 1900, good: 1805, fair: 1615 },
                    '1TB': { excellent: 2000, good: 1900, fair: 1700 }
                },
                quantities: {
                    '256GB': { excellent: 0, good: 0, fair: 0 },
                    '512GB': { excellent: 0, good: 0, fair: 0 },
                    '1TB': { excellent: 0, good: 0, fair: 0 }
                },
                available: true,
                display: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'apple-iphone-16-pro-2',
                brand: 'Apple',
                model: 'iPhone 16 Pro',
                image: 'images/phones/iphone-16-pro.jpg',
                storages: ['128GB', '256GB', '512GB', '1TB'],
                colors: ['Black Titanium', 'Natural Titanium', 'White Titanium', 'Desert Titanium'],
                basePrice: 1600,
                storagePrices: { '128GB': 1550, '256GB': 1600, '512GB': 1680, '1TB': 1750 },
                newPhonePrices: { '128GB': 1783, '256GB': 1840, '512GB': 1932, '1TB': 2013 },
                buyPrices: {
                    '128GB': { excellent: 1550, good: 1473, fair: 1318 },
                    '256GB': { excellent: 1600, good: 1520, fair: 1360 },
                    '512GB': { excellent: 1680, good: 1596, fair: 1428 },
                    '1TB': { excellent: 1750, good: 1663, fair: 1488 }
                },
                quantities: {
                    '128GB': { excellent: 0, good: 0, fair: 0 },
                    '256GB': { excellent: 0, good: 0, fair: 0 },
                    '512GB': { excellent: 0, good: 0, fair: 0 },
                    '1TB': { excellent: 0, good: 0, fair: 0 }
                },
                available: true,
                display: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'apple-iphone-15-pro-max-3',
                brand: 'Apple',
                model: 'iPhone 15 Pro Max',
                image: 'images/phones/iphone-15-pro-max.jpg',
                storages: ['256GB', '512GB', '1TB'],
                colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
                basePrice: 1500,
                storagePrices: { '256GB': 1500, '512GB': 1600, '1TB': 1700 },
                newPhonePrices: { '256GB': 1725, '512GB': 1840, '1TB': 1955 },
                buyPrices: {
                    '256GB': { excellent: 1500, good: 1425, fair: 1275 },
                    '512GB': { excellent: 1600, good: 1520, fair: 1360 },
                    '1TB': { excellent: 1700, good: 1615, fair: 1445 }
                },
                quantities: {
                    '256GB': { excellent: 0, good: 0, fair: 0 },
                    '512GB': { excellent: 0, good: 0, fair: 0 },
                    '1TB': { excellent: 0, good: 0, fair: 0 }
                },
                available: true,
                display: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'samsung-galaxy-s24-ultra-4',
                brand: 'Samsung',
                model: 'Galaxy S24 Ultra 5G', // FIXED: Added "5G" to match import
                image: 'images/phones/galaxy-s24-ultra.jpg',
                storages: ['256GB', '512GB', '1TB'],
                colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
                basePrice: 580,
                storagePrices: { '256GB': 580, '512GB': 650, '1TB': 700 }, // Exact USED prices from Excel
                newPhonePrices: {}, // S24 not available as NEW - only USED/refurbished
                buyPrices: {
                    '256GB': { excellent: 580, good: 551, fair: 493 },
                    '512GB': { excellent: 650, good: 618, fair: 553 },
                    '1TB': { excellent: 700, good: 665, fair: 595 }
                },
                quantities: {
                    '256GB': { excellent: 0, good: 0, fair: 0 },
                    '512GB': { excellent: 0, good: 0, fair: 0 },
                    '1TB': { excellent: 0, good: 0, fair: 0 }
                },
                available: true,
                display: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'samsung-galaxy-s24-5',
                brand: 'Samsung',
                model: 'Galaxy S24 5G', // FIXED: Added "5G" to match import
                image: 'images/phones/galaxy-s24.jpg',
                storages: ['256GB', '512GB'],
                colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow', 'Jade Green', 'Sapphire Blue', 'Sandstone Orange'],
                basePrice: 380,
                storagePrices: { '256GB': 380, '512GB': 450 }, // Exact USED prices from Excel
                newPhonePrices: {}, // S24 not available as NEW - only USED/refurbished
                buyPrices: {
                    '256GB': { excellent: 380, good: 361, fair: 323 },
                    '512GB': { excellent: 450, good: 428, fair: 383 }
                },
                quantities: {
                    '256GB': { excellent: 0, good: 0, fair: 0 },
                    '512GB': { excellent: 0, good: 0, fair: 0 }
                },
                available: true,
                display: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        
        // Save default phones
        localStorage.setItem('ktmobile_phones', JSON.stringify(defaultPhones));
        console.log('Created', defaultPhones.length, 'default phones');
        return defaultPhones;
    }

    /**
     * Save phones to localStorage
     */
    savePhones() {
        localStorage.setItem('ktmobile_phones', JSON.stringify(this.phones));
    }

    /**
     * Load brand settings
     */
    loadBrands() {
        const stored = localStorage.getItem('ktmobile_brands');
        if (stored) {
            return JSON.parse(stored);
        }

        // FOCUS: Apple and Samsung only (as per business requirements)
        return {
            Apple: { image: 'images/phones/iphone-16-pro-max.jpg', color: '#333333' },
            Samsung: { image: 'images/phones/galaxy-s23-ultra.jpg', color: '#1428A0' }
        };
    }

    /**
     * Save brand settings
     */
    saveBrands() {
        localStorage.setItem('ktmobile_brands', JSON.stringify(this.brands));
    }

    /**
     * Load condition modifiers
     */
    loadConditionModifiers() {
        const stored = localStorage.getItem('ktmobile_condition_modifiers');
        if (stored) {
            return JSON.parse(stored);
        }

        // Default modifiers (including NEW phone modifiers)
        return {
            // NEW Phone Modifiers
            receipt: {
                'yes': 30,
                'no': 0
            },
            country: {
                'local': 0,
                'export': -50
            },
            deviceType: {
                'new-sealed': 0,
                'new-activated': -150
            },
            // USED Phone Modifiers
            body: {
                'A': 0,
                'B': -30,
                'C': -80,
                'D': -150
            },
            screen: {
                'A': 0,
                'B': -20,
                'C': -50,
                'D': -200
            },
            battery: {
                '91-100': 0,
                '86-90': -30,
                '81-85': -60,
                '80-below': -100
            },
            issue: {
                'power': -300,
                'faceid': -150,
                'display': -200,
                'touch': -180,
                'camera': -120
            },
            accessory: {
                'cable': 10,
                'box': 20
            }
        };
    }

    /**
     * Save condition modifier
     */
    saveConditionModifier(conditionType, grade, value) {
        console.log(`💾 Saving condition modifier: ${conditionType}.${grade} = ${value}`);

        const modifiers = this.loadConditionModifiers();
        console.log('📦 Current modifiers before save:', modifiers);

        if (!modifiers[conditionType]) {
            modifiers[conditionType] = {};
        }

        modifiers[conditionType][grade] = value;
        console.log('✅ Updated modifiers:', modifiers);

        localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(modifiers));
        console.log('💾 Saved to localStorage successfully');

        // Verify the save
        const verification = localStorage.getItem('ktmobile_condition_modifiers');
        console.log('🔍 Verification - localStorage contains:', verification);
    }

    /**
     * Get condition modifier
     */
    getConditionModifier(conditionType, grade) {
        const modifiers = this.loadConditionModifiers();
        return modifiers[conditionType]?.[grade] || 0;
    }

    /**
     * Add new phone
     */
    addPhone(phoneData) {
        const phone = {
            id: Date.now().toString(),
            brand: phoneData.brand,
            model: phoneData.model,
            image: phoneData.image || this.getDefaultImage(phoneData.brand),
            storages: phoneData.storages || [],
            colors: phoneData.colors ? phoneData.colors.split(',').map(c => c.trim()) : [],
            basePrice: parseFloat(phoneData.basePrice) || 0,
            storagePrices: phoneData.storagePrices || {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.phones.push(phone);
        this.savePhones();
        return phone;
    }

    /**
     * Update phone
     */
    updatePhone(id, phoneData) {
        const index = this.phones.findIndex(p => p.id === id);
        if (index === -1) return null;

        this.phones[index] = {
            ...this.phones[index],
            ...phoneData,
            updatedAt: new Date().toISOString()
        };

        this.savePhones();
        return this.phones[index];
    }

    /**
     * Toggle phone display
     */
    togglePhoneDisplay(id, display) {
        const phone = this.getPhone(id);
        if (!phone) return;
        
        phone.display = display;
        phone.updatedAt = new Date().toISOString();
        this.savePhones();
        return phone;
    }

    /**
     * Delete phone
     */
    deletePhone(id) {
        this.phones = this.phones.filter(p => p.id !== id);
        this.savePhones();
    }

    /**
     * Get phone by ID
     */
    getPhone(id) {
        return this.phones.find(p => p.id === id);
    }

    /**
     * Get phones by brand
     */
    getPhonesByBrand(brand) {
        if (!brand) return this.phones;
        return this.phones.filter(p => p.brand === brand);
    }

    /**
     * Search phones
     */
    searchPhones(query) {
        if (!query) return this.phones;
        const lowerQuery = query.toLowerCase();
        return this.phones.filter(p => 
            p.model.toLowerCase().includes(lowerQuery) ||
            p.brand.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get default image for brand
     */
    getDefaultImage(brand) {
        // FOCUS: Apple and Samsung only (as per business requirements)
        const brandImages = {
            Apple: 'images/phones/iphone-16-pro-max.jpg',
            Samsung: 'images/phones/galaxy-s23-ultra.jpg'
        };
        return brandImages[brand] || 'images/phones/iphone-16-pro-max.jpg';
    }

    /**
     * Update brand image
     */
    updateBrandImage(brand, imagePath) {
        if (!this.brands[brand]) {
            this.brands[brand] = {};
        }
        this.brands[brand].image = imagePath;
        this.saveBrands();
    }

    /**
     * Load hero image settings
     */
    loadHeroImage() {
        const stored = localStorage.getItem('ktmobile_hero_image');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing hero image settings:', e);
            }
        }
        // Default hero image
        return {
            imagePath: 'images/phones/iphone-16-pro-max-best.jpg',
            removeBackground: true
        };
    }

    /**
     * Save hero image settings
     */
    saveHeroImage(imagePath, removeBackground = true) {
        const settings = {
            imagePath: imagePath,
            removeBackground: removeBackground,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('ktmobile_hero_image', JSON.stringify(settings));
        
        // Update main page hero image if it exists
        if (typeof updateMainPageHeroImage === 'function') {
            updateMainPageHeroImage(imagePath, removeBackground);
        }
    }
}

// ============================================================================
// INITIALIZE ADMIN MANAGER
// ============================================================================

// CRITICAL FIX: Only create adminManager on admin pages
// This prevents creating default 5 phones on customer-facing pages
let adminManager;

// Check if we're on admin page BEFORE initializing
function isOnAdminPage() {
    // Check for admin page indicators
    return document.querySelector('.admin-page') !== null ||
           document.querySelector('.admin-main') !== null ||
           window.location.pathname.includes('admin.html') ||
           window.location.href.includes('admin.html');
}

if (isOnAdminPage()) {
    adminManager = new AdminDataManager();
    console.log('✅ Full adminManager created for admin page');

    // Clean up any cache-busting parameters from stored image URLs
    function cleanupImageUrls() {
        let needsSave = false;

        // Clean phone images
        if (adminManager.phones && adminManager.phones.length > 0) {
            adminManager.phones.forEach(phone => {
                if (phone.image && phone.image.indexOf('?t=') !== -1) {
                    // Remove cache-busting parameter
                    phone.image = phone.image.split('?t=')[0];
                    needsSave = true;
                }
            });

            if (needsSave) {
                adminManager.savePhones();
                console.log('🧹 Cleaned up cache-busting parameters from phone images');
            }
        }

        // Clean hero image
        const heroSettings = localStorage.getItem('ktmobile_hero_image');
        if (heroSettings) {
            try {
                const settings = JSON.parse(heroSettings);
                if (settings.imagePath && settings.imagePath.indexOf('?t=') !== -1) {
                    settings.imagePath = settings.imagePath.split('?t=')[0];
                    localStorage.setItem('ktmobile_hero_image', JSON.stringify(settings));
                    console.log('🧹 Cleaned up cache-busting parameter from hero image');
                }
            } catch (e) {
                console.error('Error cleaning hero image:', e);
            }
        }

        // Clean brand images
        const brandsData = localStorage.getItem('ktmobile_brands');
        if (brandsData) {
            try {
                const brands = JSON.parse(brandsData);
                let brandNeedsSave = false;
                Object.keys(brands).forEach(brandName => {
                    if (brands[brandName].image && brands[brandName].image.indexOf('?t=') !== -1) {
                        brands[brandName].image = brands[brandName].image.split('?t=')[0];
                        brandNeedsSave = true;
                    }
                });
                if (brandNeedsSave) {
                    localStorage.setItem('ktmobile_brands', JSON.stringify(brands));
                    console.log('🧹 Cleaned up cache-busting parameters from brand images');
                }
            } catch (e) {
                console.error('Error cleaning brand images:', e);
            }
        }
    }

    // Run cleanup on page load
    cleanupImageUrls();
} else {
    // On customer pages (sell-phones.html, quote.html), create minimal adminManager
    // Just to expose phones array from localStorage without initializing phoneDatabase
    adminManager = {
        get phones() {
            const stored = localStorage.getItem('ktmobile_phones');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error('Failed to parse phones from localStorage:', e);
                    return [];
                }
            }
            return [];
        }
    };
    console.log('✅ Minimal adminManager created for customer page (read-only access to localStorage)');
}

// ============================================================================
// GLOBAL COLOR MANAGEMENT
// ============================================================================

// Load available colors from localStorage or use defaults
function loadAvailableColors() {
    const stored = localStorage.getItem('ktmobile_available_colors');
    if (stored) {
        return JSON.parse(stored);
    }
    // Official factory colors - Updated 2026-01-18
    return [
        // iPhone 17 series (2025)
        'Cosmic Orange',
        'Deep Blue',
        'Silver',

        // iPhone 16 Pro/Pro Max (2024)
        'Desert Titanium',
        'Natural Titanium',
        'White Titanium',
        'Black Titanium',

        // iPhone 16/16 Plus (2024)
        'Black',
        'White',
        'Pink',
        'Teal',
        'Ultramarine',

        // iPhone 15 series
        'Blue Titanium',
        'Green',
        'Yellow',

        // iPhone 14 series
        'Space Black',
        'Deep Purple',

        // iPhone 13 series & earlier
        'Midnight',
        'Starlight',
        'Gold',
        'Sierra Blue',
        'Alpine Green',
        'Pacific Blue',
        'Graphite',
        'Midnight Green',
        'Purple',
        'Coral',
        '(PRODUCT)RED',
        'Space Gray',

        // Samsung Galaxy S25 Ultra (2025)
        'Titanium Silverblue',
        'Titanium Black',
        'Titanium Gray',
        'Titanium Whitesilver',
        'Titanium Jetblack',
        'Titanium Jadegreen',
        'Titanium Pinkgold',

        // Samsung Galaxy S25/S25+ (2025)
        'Icy Blue',
        'Mint',
        'Navy',
        'Silver Shadow',
        'Coral Red',
        'Blue Black',
        'Pink Gold',

        // Samsung Galaxy S24 series
        'Onyx Black',
        'Marble Gray',
        'Cobalt Violet',
        'Amber Yellow',
        'Titanium Violet',
        'Titanium Yellow',

        // Samsung Galaxy older series
        'Phantom Black',
        'Phantom Silver',
        'Phantom White',
        'Phantom Gray',
        'Phantom Violet',
        'Phantom Pink',
        'Cream',
        'Lavender',
        'Burgundy',
        'Beige',
        'Graygreen',

        // Samsung Z Fold/Flip
        'Phantom Green',
        'Icy Blue',
        'Crafted Black',
        'Bora Purple',
        'Pink Gold'
    ].sort();
}

function saveAvailableColors(colors) {
    localStorage.setItem('ktmobile_available_colors', JSON.stringify(colors));
}

// Global colors list
let availableColors = loadAvailableColors();

// Add new color to global list
function addNewColor() {
    const colorName = prompt('Enter new color name:');
    if (!colorName || colorName.trim() === '') return;

    const trimmedName = colorName.trim();

    // Check if color already exists (case-insensitive)
    if (availableColors.some(c => c.toLowerCase() === trimmedName.toLowerCase())) {
        alert('This color already exists!');
        return;
    }

    // Add to list
    availableColors.push(trimmedName);
    availableColors.sort();
    saveAvailableColors(availableColors);

    // Refresh color dropdown
    populateColorDropdown();

    // Select the newly added color
    const select = document.getElementById('phoneColorsSelect');
    const options = Array.from(select.options);
    const newOption = options.find(opt => opt.value === trimmedName);
    if (newOption) {
        newOption.selected = true;
    }

    updateSelectedColorsList();
}

// Remove selected color from global list
function removeSelectedColor() {
    const select = document.getElementById('phoneColorsSelect');
    const selectedOptions = Array.from(select.selectedOptions);

    if (selectedOptions.length === 0) {
        alert('Please select a color to remove from the list.');
        return;
    }

    const colorsToRemove = selectedOptions.map(opt => opt.value);
    const confirmMsg = `Are you sure you want to remove ${colorsToRemove.join(', ')} from the global color list?\n\nNote: This will not affect existing phones that already have these colors.`;

    if (!confirm(confirmMsg)) return;

    // Remove from list
    availableColors = availableColors.filter(c => !colorsToRemove.includes(c));
    saveAvailableColors(availableColors);

    // Refresh color dropdown
    populateColorDropdown();
    updateSelectedColorsList();
}

// Populate the color dropdown
function populateColorDropdown() {
    const select = document.getElementById('phoneColorsSelect');
    if (!select) return;

    const currentSelections = Array.from(select.selectedOptions).map(opt => opt.value);

    select.innerHTML = availableColors.map(color =>
        `<option value="${color}" ${currentSelections.includes(color) ? 'selected' : ''}>${color}</option>`
    ).join('');
}

// Update selected colors list display
function updateSelectedColorsList() {
    const select = document.getElementById('phoneColorsSelect');
    const listContainer = document.getElementById('selectedColorsList');
    if (!select || !listContainer) return;

    const selectedColors = Array.from(select.selectedOptions).map(opt => opt.value);

    if (selectedColors.length === 0) {
        listContainer.innerHTML = '<small style="color: var(--text-light);">No colors selected</small>';
        return;
    }

    listContainer.innerHTML = selectedColors.map(color =>
        `<span style="display: inline-flex; align-items: center; padding: 0.25rem 0.75rem; background: var(--gold); color: white; border-radius: 16px; font-size: 0.875rem; font-weight: 600;">
            ${color}
        </span>`
    ).join('');
}

// ============================================================================
// ADMIN UI FUNCTIONS
// ============================================================================

// Wait for phoneDatabase to load, then initialize
function initializeAdmin() {
    console.log('Initializing admin panel...');
    
    // Set admin user name
    const currentUser = auth.getStoredUser();
    console.log('Current user:', currentUser);
    
    if (currentUser && document.getElementById('adminUserName')) {
        document.getElementById('adminUserName').textContent = currentUser.name || 'Admin';
        
        // Show User Management menu only for Master Admin
        if (auth.isMasterAdmin()) {
            const usersMenuItem = document.getElementById('usersMenuItem');
            if (usersMenuItem) {
                usersMenuItem.style.display = 'flex';
            }
        }
    }

    // Ensure modals are closed
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });

    // Initialize hero image settings
    try {
        initializeHeroImageSettings();
    } catch (e) {
        console.error('Error initializing hero image:', e);
    }

    // DISABLED: Don't auto-initialize from phoneDatabase on page load!
    // REASON: Excel import data in localStorage is source of truth, NOT hardcoded phoneDatabase
    // User requirement: "no hardcoded mock data is allowed must strictly follow backend prices"
    // if (typeof phoneDatabase !== 'undefined') {
    //     try {
    //         if (adminManager.phones.length === 0) {
    //             adminManager.phones = adminManager.initializePhones();
    //             adminManager.savePhones();
    //         } else {

    // FIXED: Only migrate existing phones, don't initialize from phoneDatabase
    if (adminManager.phones.length > 0) {
        try {
            {
                // Ensure buyPrices and quantities exist for existing phones
                let needsSave = false;
                adminManager.phones.forEach(phone => {
                    if (!phone.buyPrices || !phone.quantities) {
                        const buyPrices = {};
                        const quantities = {};
                        (phone.storages || ['128GB']).forEach(storage => {
                            const basePrice = phone.storagePrices?.[storage] || phone.basePrice || 0;
                            buyPrices[storage] = {
                                excellent: basePrice,
                                good: Math.round(basePrice * 0.95),
                                fair: Math.round(basePrice * 0.85)
                            };
                            quantities[storage] = {
                                excellent: 0,
                                good: 0,
                                fair: 0
                            };
                        });
                        phone.buyPrices = buyPrices;
                        phone.quantities = quantities;
                        needsSave = true;
                    }
                });
                if (needsSave) {
                    adminManager.savePhones();
                }
            }
        } catch (e) {
            console.error('Error migrating phone data:', e);
        }
    }
    // End of phone migration block

    // Initialize sections - don't require phonesGrid to exist
    console.log('Initializing admin sections...');
    try {
        // Always initialize menu navigation first - multiple times for reliability
        initializeMenuNavigation();
        setTimeout(() => initializeMenuNavigation(), 100);
        setTimeout(() => initializeMenuNavigation(), 500);
        
        // Initialize other sections - always run to attach event listeners
        initializePhonesSection();
        initializePricesSection();
        initializeBrandsSection();
        initializeUsersSection();
        initializeAppointmentsSection();
        initializePhoneModal();
        initializeAdminModal();
        
        // Apply permission restrictions
        applyPermissionRestrictions();
        
        // Render initial active section content
        const activeSection = document.querySelector('.admin-section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            const sectionName = sectionId.replace('-section', '');
            setTimeout(() => {
                // Use window.renderSectionContent which is set by initializeMenuNavigation
                if (typeof window.renderSectionContent === 'function') {
                    window.renderSectionContent(sectionName);
                } else {
                    console.log('renderSectionContent not yet available, will be called by menu navigation');
                }
            }, 300);
        }
        
        console.log('Admin panel initialized successfully');
    } catch (e) {
        console.error('Error initializing sections:', e);
        // Even if initialization fails, ensure menu navigation works
        setTimeout(() => {
            try {
                initializeMenuNavigation();
            } catch (e2) {
                console.error('Failed to initialize menu navigation:', e2);
            }
        }, 500);
    }
}

// Initialize when DOM is ready and phoneDatabase is loaded
function startAdminInit() {
    // Double-check we're on admin page
    const isAdminPage = document.body && document.body.classList.contains('admin-page');
    const isAdminUrl = window.location.pathname.includes('admin.html') || window.location.href.includes('admin.html');
    
    if (!isAdminPage && !isAdminUrl) {
        console.log('Not an admin page, aborting admin initialization');
        return;
    }
    
    console.log('Starting admin initialization...');
    console.log('Document ready state:', document.readyState);
    
    // Check if auth is loaded
    if (typeof auth === 'undefined') {
        console.log('Auth not loaded, retrying...');
        setTimeout(startAdminInit, 50);
        return;
    }
    
    console.log('Auth loaded, checking authentication...');
    
    // Check authentication (only if auth methods exist and are callable)
    try {
        if (typeof auth !== 'undefined' && typeof auth.isAuthenticated === 'function' && typeof auth.isAdmin === 'function') {
            const isAuth = auth.isAuthenticated();
            const isAdmin = auth.isAdmin();
            console.log('Auth check:', { isAuth, isAdmin });
            
            if (!isAuth || !isAdmin) {
                console.log('Not authenticated, redirecting...');
                // Only redirect if we're sure auth is working
                setTimeout(() => {
                    if (typeof auth !== 'undefined' && auth.isAuthenticated && !auth.isAuthenticated()) {
                        alert('Access denied. Admin login required.');
                        window.location.href = 'login.html';
                    }
                }, 1000);
                // Continue initialization anyway to prevent blocking
            }
        } else {
            console.log('Auth methods not available, proceeding without strict check');
        }
    } catch (e) {
        console.error('Error checking authentication:', e);
        console.log('Proceeding without strict auth check');
    }
    
    console.log('Authenticated, initializing admin panel...');
    
    // Initialize admin panel
    function doInit() {
        try {
            initializeAdmin();
        } catch (e) {
            console.error('Error in initializeAdmin:', e);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(doInit, 200);
        });
    } else {
        setTimeout(doInit, 200);
    }
}

// Start initialization only on admin pages
function checkAndStartAdminInit() {
    const isAdminPage = document.body && document.body.classList.contains('admin-page');
    const isAdminUrl = window.location.pathname.includes('admin.html') || window.location.href.includes('admin.html');
    
    if (isAdminPage || isAdminUrl) {
        startAdminInit();
    } else {
        console.log('Not an admin page, skipping admin initialization');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndStartAdminInit);
} else {
    checkAndStartAdminInit();
}

/**
 * Menu Navigation - Direct and simple approach
 */
function initializeMenuNavigation() {
    console.log('=== Initializing menu navigation ===');
    
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Found', menuItems.length, 'menu items');
    
    if (menuItems.length === 0) {
        console.error('No menu items found!');
        return false;
    }
    
    // Function to switch sections
    function switchSection(targetSection) {
        console.log('Switching to section:', targetSection);
        
        // Update active menu item
        menuItems.forEach(m => {
            m.classList.remove('active');
        });
        const activeMenuItem = document.querySelector(`.menu-item[data-section="${targetSection}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
        
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });
        
        // Show target section
        const targetEl = document.getElementById(`${targetSection}-section`);
        if (targetEl) {
            targetEl.classList.add('active');
            targetEl.style.display = 'block';
            console.log('✓ Section switched to:', targetSection);
            
            // Render content for the active section
            setTimeout(() => {
                renderSectionContent(targetSection);
            }, 100);
            
            return true;
        } else {
            console.error('✗ Section not found:', `${targetSection}-section`);
            return false;
        }
    }
    
    // Function to render content for each section
    function renderSectionContent(sectionName) {
        console.log('Rendering content for section:', sectionName);
        
        try {
            switch(sectionName) {
                // Buyback Management Sections
                case 'buyback-phones':
                    if (typeof renderPhones === 'function') {
                        renderPhones();
                    }
                    break;
                case 'buyback-prices':
                    renderPriceTable();
                    // Also set up brand filter listener if not already set
                    setTimeout(() => {
                        const priceBrandFilter = document.getElementById('buybackPriceBrandFilter') || document.getElementById('priceBrandFilter');
                        if (priceBrandFilter && !priceBrandFilter.hasAttribute('data-listener-added')) {
                            priceBrandFilter.addEventListener('change', () => renderPriceTable());
                            priceBrandFilter.setAttribute('data-listener-added', 'true');
                        }
                    }, 100);
                    break;
                case 'buyback-conditions':
                    // Condition modifiers are static HTML, just ensure they're visible
                    break;
                case 'buyback-colors':
                    renderColorsStorage();
                    break;
                
                // Refurbishment Management Sections
                case 'refurbish-phones':
                    renderRefurbishPhones();
                    break;
                case 'refurbish-prices':
                    if (typeof renderBuyPricesTable === 'function') {
                        renderBuyPricesTable();
                    } else if (typeof initializeBuyPricesSection === 'function') {
                        initializeBuyPricesSection();
                        renderBuyPricesTable();
                    }
                    break;
                case 'refurbish-display':
                    renderDisplaySettings();
                    break;
                
                // Legacy sections (for backward compatibility)
                case 'phones':
                    if (typeof renderPhones === 'function') {
                        renderPhones();
                    }
                    break;
                case 'prices':
                    if (typeof renderPriceTable === 'function') {
                        renderPriceTable();
                    }
                    break;
                
                // System Sections
                case 'brands':
                    if (typeof renderBrands === 'function') {
                        renderBrands();
                    }
                    break;
                case 'users':
                    if (typeof renderUsers === 'function') {
                        renderUsers();
                    }
                    break;
                case 'appointments':
                    if (typeof renderAppointments === 'function') {
                        renderAppointments();
                    }
                    if (typeof updateAppointmentStats === 'function') {
                        updateAppointmentStats();
                    }
                    break;
                case 'settings':
                    // Settings section doesn't need rendering
                    break;
                default:
                    console.log('No render function for section:', sectionName);
            }
        } catch (error) {
            console.error('Error rendering section content:', error);
        }
    }
    
    // Add click listeners directly to each menu item
    menuItems.forEach((item, index) => {
        const section = item.dataset.section;
        console.log(`Setting up menu item ${index + 1}:`, section);
        
        // Remove any existing listeners
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Force styles
        newItem.style.pointerEvents = 'auto';
        newItem.style.cursor = 'pointer';
        newItem.style.userSelect = 'none';
        newItem.style.position = 'relative';
        newItem.style.zIndex = '1000';
        
        // Add click listener
        newItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('CLICKED:', section);
            switchSection(section);
        });
        
        // Also add mousedown as backup
        newItem.addEventListener('mousedown', function(e) {
            e.preventDefault();
            console.log('MOUSEDOWN:', section);
            switchSection(section);
        });
    });
    
    // Export renderSectionContent globally so it can be called from other functions
    window.renderSectionContent = renderSectionContent;
    
    console.log('=== Menu navigation initialized ===');
    return true;
}

/**
 * Phones Section
 */
function initializePhonesSection() {
    const addPhoneBtn = document.getElementById('addPhoneBtn');
    const brandFilter = document.getElementById('brandFilter');
    const modelFilter = document.getElementById('modelFilter');
    const searchInput = document.getElementById('searchPhones');

    // Add Phone button with null check
    if (addPhoneBtn) {
        addPhoneBtn.addEventListener('click', () => openPhoneModal());
        console.log('✅ Add Phone button initialized successfully');
    } else {
        console.error('❌ Add Phone button not found in DOM');
    }

    // Brand filter change - update model dropdown and render phones
    if (brandFilter) {
        brandFilter.addEventListener('change', function() {
            updateModelDropdown(this.value);
            renderPhones();
        });
    }

    // Model filter change - render phones
    if (modelFilter) {
        modelFilter.addEventListener('change', () => renderPhones());
    }
    
    // Search input change - render phones
    searchInput.addEventListener('input', () => renderPhones());

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            brandFilter.value = '';
            modelFilter.value = '';
            searchInput.value = '';
            updateModelDropdown('');
            renderPhones();
        });
    }

    // Initial render - only if phones section is active
    if (document.getElementById('phones-section')?.classList.contains('active')) {
        updateModelDropdown('');
        renderPhones();
    }
}

/**
 * Update model dropdown based on selected brand
 */
function updateModelDropdown(selectedBrand) {
    const modelFilter = document.getElementById('modelFilter');
    if (!modelFilter) return;

    // Get all phones
    const phones = adminManager.phones || [];
    
    // Filter phones by brand if brand is selected
    let filteredPhones = phones;
    if (selectedBrand) {
        filteredPhones = phones.filter(p => p.brand === selectedBrand);
    }

    // Get unique models
    const uniqueModels = [...new Set(filteredPhones.map(p => p.model))].sort();

    // Clear and populate model dropdown
    modelFilter.innerHTML = '<option value="">All Models</option>';
    
    if (uniqueModels.length === 0) {
        // If no models found, add a disabled option
        const option = document.createElement('option');
        option.value = '';
        option.textContent = selectedBrand ? 'No models found' : 'Select a brand first';
        option.disabled = true;
        modelFilter.appendChild(option);
    } else {
        uniqueModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelFilter.appendChild(option);
        });
    }

    // Reset model filter when brand changes (unless it's initial load)
    if (selectedBrand !== '') {
        modelFilter.value = '';
    }
}

function renderPhones() {
    console.log('=== renderPhones called ===');
    // Check for buyback phones grid first, then fallback to phonesGrid
    let grid = document.getElementById('buybackPhonesGrid');
    if (!grid) {
        grid = document.getElementById('phonesGrid');
    }
    
    if (!grid) {
        console.error('Phone grid element not found!');
        return;
    }
    
    const brandFilter = document.getElementById('brandFilter')?.value || '';
    const modelFilter = document.getElementById('modelFilter')?.value || '';
    const searchQuery = document.getElementById('searchPhones')?.value || '';

    // Start with all phones
    let phones = adminManager.phones || [];

    console.log('📱 renderPhones() - Total phones in memory:', phones.length);
    console.log('🔍 Current filters:', {
        brand: brandFilter || '(none)',
        model: modelFilter || '(none)',
        search: searchQuery || '(none)',
        priceType: currentBuybackType || 'used'
    });

    // CRITICAL FIX: If no phones in memory, reload from localStorage FIRST
    // DO NOT call initializePhones() which falls back to hardcoded phoneDatabase!
    // User imported data is in localStorage, not phoneDatabase
    if (phones.length === 0) {
        console.log('⚠️  No phones in memory, reloading from localStorage...');
        adminManager.phones = adminManager.loadPhones(); // Load from localStorage, NOT initializePhones()!
        phones = adminManager.phones || [];
        console.log(`✅ Reloaded ${phones.length} phones from localStorage`);

        // Only if localStorage is ALSO empty, show error message
        if (phones.length === 0) {
            console.error('❌ No phones in localStorage! User needs to import data.');
        }
    }

    const originalCount = phones.length;

    // Filter by brand
    if (brandFilter) {
        const beforeFilter = phones.length;
        phones = phones.filter(p => p.brand === brandFilter);
        console.log(`🔍 Brand filter "${brandFilter}": ${beforeFilter} → ${phones.length} phones`);
    }

    // Filter by model
    if (modelFilter) {
        const beforeFilter = phones.length;
        phones = phones.filter(p => p.model === modelFilter);
        console.log(`🔍 Model filter "${modelFilter}": ${beforeFilter} → ${phones.length} phones`);
    }

    // Filter by search query
    if (searchQuery) {
        const beforeFilter = phones.length;
        const lowerQuery = searchQuery.toLowerCase();
        phones = phones.filter(p =>
            p.model.toLowerCase().includes(lowerQuery) ||
            p.brand.toLowerCase().includes(lowerQuery)
        );
        console.log(`🔍 Search filter "${searchQuery}": ${beforeFilter} → ${phones.length} phones`);
    }

    // FILTER: If viewing NEW phone prices, hide phones that don't have NEW prices
    if (currentBuybackType === 'new') {
        const beforeFilter = phones.length;
        const phonesWithoutNewPrices = [];

        phones = phones.filter(p => {
            // Check if phone has at least one NEW price greater than 0
            if (p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0) {
                const hasNonZeroPrice = Object.values(p.newPhonePrices).some(price => price > 0);
                if (!hasNonZeroPrice) {
                    phonesWithoutNewPrices.push(`${p.brand} ${p.model}`);
                }
                return hasNonZeroPrice;
            }
            phonesWithoutNewPrices.push(`${p.brand} ${p.model}`);
            return false; // No NEW prices, hide this phone
        });

        console.log(`🔍 NEW price filter: ${beforeFilter} → ${phones.length} phones`);
        if (phonesWithoutNewPrices.length > 0) {
            console.log('⚠️  Hidden (no NEW prices):', phonesWithoutNewPrices.join(', '));
        }
    }

    console.log(`📊 FINAL: Showing ${phones.length} of ${originalCount} total phones`);

    if (phones.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="color: var(--text-light); font-size: 1.1rem;">
                    ${brandFilter || modelFilter || searchQuery ? 
                        'No phones found matching your filters.' : 
                        'No phones found. Click "Add New Phone" to get started.'}
                </p>
            </div>
        `;
        return;
    }

    grid.innerHTML = phones.map(phone => {
        // Ensure display property exists (default to true)
        if (phone.display === undefined) {
            phone.display = true;
        }

        // Get price based on currentBuybackType toggle
        let displayPrice;
        let priceLabel;
        if (currentBuybackType === 'new') {
            // FIXED: No auto-calculation! Use exact NEW prices from database
            displayPrice = phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0
                ? Math.max(...Object.values(phone.newPhonePrices))
                : 0;
            priceLabel = 'New Sealed';
        } else {
            // USED device - use ONLY storagePrices from Excel import
            // NO FALLBACK to basePrice - user requirement: "i rather theres error no price then given mock data inaccurately"
            if (phone.storagePrices && Object.keys(phone.storagePrices).length > 0) {
                displayPrice = Math.max(...Object.values(phone.storagePrices));
            } else {
                displayPrice = 0; // No price data - show $0 instead of hardcoded fallback
            }
            priceLabel = 'Used';
        }

        // CRITICAL FIX: Add cache-busting to image display
        let imageUrl = phone.image || 'images/phones/iphone-16-pro-max.jpg';
        // If NOT base64 and doesn't already have timestamp, add one
        if (!imageUrl.startsWith('data:') && imageUrl.indexOf('?t=') === -1) {
            imageUrl = `${imageUrl}?t=${Date.now()}`;
        }

        // CRITICAL FIX: Detect missing prices and add warning badge
        const hasMissingPrice = displayPrice === 0;
        const warningBadge = hasMissingPrice ?
            '<span class="badge badge-warning" style="background: #dc3545; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem;">⚠️ Missing Price</span>' : '';

        return `
        <div class="phone-card-admin" style="${hasMissingPrice ? 'border: 2px solid #dc3545; background: #fff5f5;' : ''}">
            <div class="phone-card-header">
                <span class="brand-badge">${phone.brand}</span>
                <div class="phone-card-actions">
                    ${auth.hasPermission('canManagePhones') ? `
                        <button class="btn-icon btn-edit" onclick="editPhone('${phone.id}')" title="Edit">✏️</button>
                    ` : ''}
                    ${auth.hasPermission('canDelete') ? `
                        <button class="btn-icon btn-delete" onclick="deletePhone('${phone.id}')" title="Delete">🗑️</button>
                    ` : ''}
                </div>
            </div>
            <img src="${imageUrl}" alt="${phone.model}" class="phone-card-image" onerror="this.src='images/phones/iphone-16-pro-max.jpg'">
            <div class="phone-card-info">
                <h4>${phone.model}${warningBadge}</h4>
                <p><strong>Storage:</strong> ${phone.storages.join(', ') || 'N/A'}</p>
                <p><strong>${priceLabel} Price:</strong> <span style="color: ${hasMissingPrice ? '#dc3545' : 'inherit'}; font-weight: ${hasMissingPrice ? 'bold' : 'normal'};">Up to SGD $${Math.round(displayPrice).toLocaleString()}${hasMissingPrice ? ' ⚠️' : ''}</span></p>
                ${hasMissingPrice ? '<p style="color: #dc3545; font-size: 0.85rem; margin-top: 0.5rem;"><strong>⚠️ Action Required:</strong> Import prices from Excel to activate this model</p>' : ''}
                <p><strong>Colors:</strong> ${phone.colors.length > 0 ? phone.colors.join(', ') : 'N/A'}</p>
                <div class="display-toggle" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                        <input type="checkbox" ${phone.display ? 'checked' : ''}
                               onchange="togglePhoneDisplay('${phone.id}', this.checked)"
                               style="width: 20px; height: 20px; cursor: pointer;">
                        <span style="font-weight: 600; color: ${phone.display ? '#10B981' : '#EF4444'};">
                            ${phone.display ? '✓ Displayed' : '✗ Hidden'}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

/**
 * Prices Section
 */
function initializePricesSection() {
    initializePriceTabs();
    // Initialize buy prices section if tab exists
    try {
        if (document.getElementById('buy-prices-tab')) {
            initializeBuyPricesSection();
            // Render table immediately
            renderBuyPricesTable();
        }
    } catch (e) {
        console.error('Error initializing buy prices section:', e);
    }
    initializeConditionModifiers();
    renderPriceTable();
    
    // Brand filter for prices - try both IDs
    const priceBrandFilter = document.getElementById('buybackPriceBrandFilter') || document.getElementById('priceBrandFilter');
    if (priceBrandFilter) {
        priceBrandFilter.addEventListener('change', () => renderPriceTable());
    }
}

/**
 * Initialize price tabs
 */
function initializePriceTabs() {
    const tabs = document.querySelectorAll('.price-tab');
    const tabContents = document.querySelectorAll('.price-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show target content
            tabContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // If buy-prices tab is clicked, render the table
                if (targetTab === 'buy-prices') {
                    renderBuyPricesTable();
                }
            }
        });
    });
}

/**
 * Initialize Buy Prices Section
 */
function initializeBuyPricesSection() {
    try {
        populateBuyPriceFilters();
        renderBuyPricesTable();
        
        // Add event listeners for filters
        const brandFilter = document.getElementById('buyPriceBrandFilter');
        const modelFilter = document.getElementById('buyPriceModelFilter');
        
        if (brandFilter) {
            brandFilter.addEventListener('change', () => {
                updateBuyPriceModelFilter(brandFilter.value);
                renderBuyPricesTable();
            });
        }
        
        if (modelFilter) {
            modelFilter.addEventListener('change', () => {
                renderBuyPricesTable();
            });
        }
    } catch (e) {
        console.error('Error initializing buy prices section:', e);
    }
}

/**
 * Populate buy price filters
 */
function populateBuyPriceFilters() {
    const brandFilter = document.getElementById('buyPriceBrandFilter');
    const modelFilter = document.getElementById('buyPriceModelFilter');
    
    if (!brandFilter || !modelFilter) return;
    
    // Get unique brands
    const brands = [...new Set(adminManager.phones.map(p => p.brand))];
    brandFilter.innerHTML = '<option value="">All Brands</option>';
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
    
    // Update model filter when brand changes
    brandFilter.addEventListener('change', function() {
        updateBuyPriceModelFilter(this.value);
    });
    
    // Initial model filter population
    updateBuyPriceModelFilter('');
}

/**
 * Update model filter based on selected brand
 */
function updateBuyPriceModelFilter(brand) {
    const modelFilter = document.getElementById('buyPriceModelFilter');
    if (!modelFilter) return;
    
    const models = brand 
        ? [...new Set(adminManager.phones.filter(p => p.brand === brand).map(p => p.model))]
        : [...new Set(adminManager.phones.map(p => p.model))];
    
    modelFilter.innerHTML = '<option value="">All Models</option>';
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
    });
}

/**
 * Render buy prices table
 */
function renderBuyPricesTable() {
    const tbody = document.getElementById('buyPricesTable');
    if (!tbody) {
        console.error('buyPricesTable not found');
        return;
    }
    
    const brandFilter = document.getElementById('buyPriceBrandFilter')?.value || '';
    const modelFilter = document.getElementById('buyPriceModelFilter')?.value || '';
    
    let filteredPhones = adminManager.phones || [];
    if (brandFilter) {
        filteredPhones = filteredPhones.filter(p => p.brand === brandFilter);
    }
    if (modelFilter) {
        filteredPhones = filteredPhones.filter(p => p.model === modelFilter);
    }
    
    if (filteredPhones.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    ${brandFilter || modelFilter ? 'No phones found for selected filters.' : 'No phones available. Add phones first.'}
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    
    filteredPhones.forEach(phone => {
        const storages = phone.storages || ['128GB'];
        storages.forEach(storage => {
            const conditions = ['excellent', 'good', 'fair'];
            conditions.forEach(condition => {
                // Initialize buyPrices and quantities if not exist
                if (!phone.buyPrices) phone.buyPrices = {};
                if (!phone.buyPrices[storage]) phone.buyPrices[storage] = {};
                if (!phone.quantities) phone.quantities = {};
                if (!phone.quantities[storage]) phone.quantities[storage] = {};
                
                const price = phone.buyPrices[storage][condition] || (phone.storagePrices?.[storage] || phone.basePrice || 0);
                const quantity = phone.quantities[storage][condition] || 0;
                const available = phone.available !== false && quantity > 0;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${phone.brand}</td>
                    <td>${phone.model}</td>
                    <td>${storage}</td>
                    <td><span class="condition-badge ${condition}">${condition.charAt(0).toUpperCase() + condition.slice(1)}</span></td>
                    <td>
                        <input type="number" class="form-control buy-price-input" 
                               value="${price}" 
                               data-phone-id="${phone.id}" 
                               data-storage="${storage}" 
                               data-condition="${condition}"
                               min="0" step="10" style="width: 120px;">
                    </td>
                    <td>
                        <input type="number" class="form-control buy-quantity-input" 
                               value="${quantity}" 
                               data-phone-id="${phone.id}" 
                               data-storage="${storage}" 
                               data-condition="${condition}"
                               min="0" step="1" style="width: 100px;">
                    </td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" class="buy-available-toggle"
                                   ${available ? 'checked' : ''}
                                   data-phone-id="${phone.id}"
                                   data-storage="${storage}"
                                   data-condition="${condition}">
                            <span class="slider"></span>
                        </label>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" 
                                onclick="saveBuyPrice('${phone.id}', '${storage}', '${condition}')">
                            Save
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
    });
}

/**
 * Save buy price and quantity
 */
function saveBuyPrice(phoneId, storage, condition) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }
    
    const phone = adminManager.getPhone(phoneId);
    if (!phone) {
        alert('Phone not found');
        return;
    }
    
    const priceInput = document.querySelector(
        `.buy-price-input[data-phone-id="${phoneId}"][data-storage="${storage}"][data-condition="${condition}"]`
    );
    const quantityInput = document.querySelector(
        `.buy-quantity-input[data-phone-id="${phoneId}"][data-storage="${storage}"][data-condition="${condition}"]`
    );
    const availableToggle = document.querySelector(
        `.buy-available-toggle[data-phone-id="${phoneId}"][data-storage="${storage}"][data-condition="${condition}"]`
    );
    
    if (!priceInput || !quantityInput) {
        alert('Input fields not found');
        return;
    }
    
    const price = parseFloat(priceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    const available = availableToggle ? availableToggle.checked : false;
    
    // Initialize buyPrices and quantities if not exist
    if (!phone.buyPrices) phone.buyPrices = {};
    if (!phone.buyPrices[storage]) phone.buyPrices[storage] = {};
    if (!phone.quantities) phone.quantities = {};
    if (!phone.quantities[storage]) phone.quantities[storage] = {};
    
    phone.buyPrices[storage][condition] = price;
    phone.quantities[storage][condition] = quantity;
    
    // Update availability
    if (quantity > 0 && available) {
        phone.available = true;
    }
    
    phone.updatedAt = new Date().toISOString();
    adminManager.savePhones();
    
    alert('Buy price and quantity saved successfully!');
}

/**
 * Filter buy prices
 */
function filterBuyPrices() {
    renderBuyPricesTable();
}

/**
 * Clear buy price filters
 */
function clearBuyPriceFilters() {
    const brandFilter = document.getElementById('buyPriceBrandFilter');
    const modelFilter = document.getElementById('buyPriceModelFilter');
    if (brandFilter) brandFilter.value = '';
    if (modelFilter) modelFilter.value = '';
    updateBuyPriceModelFilter('');
    renderBuyPricesTable();
}

/**
 * Initialize condition modifiers from storage
 */
function initializeConditionModifiers() {
    const modifiers = adminManager.loadConditionModifiers();
    
    // Update all input fields with saved values
    Object.keys(modifiers).forEach(conditionType => {
        Object.keys(modifiers[conditionType]).forEach(grade => {
            const input = document.querySelector(
                `input[data-condition="${conditionType}"][data-grade="${grade}"]`
            );
            if (input) {
                input.value = modifiers[conditionType][grade];
                updateModifierInputStyle(input);
            }
        });
    });
}

/**
 * Update modifier input style based on value
 */
function updateModifierInputStyle(input) {
    const value = parseFloat(input.value) || 0;
    input.classList.remove('positive', 'negative');
    if (value > 0) {
        input.classList.add('positive');
    } else if (value < 0) {
        input.classList.add('negative');
    }
}

/**
 * Load condition modifiers from localStorage into input fields
 */
function loadConditionModifierInputs() {
    console.log('📥 Loading condition modifiers into admin panel inputs...');

    const modifiers = adminManager.loadConditionModifiers();
    console.log('📦 Loaded modifiers:', modifiers);

    // Get all modifier inputs
    const inputs = document.querySelectorAll('input.modifier-input[data-condition][data-grade]');
    console.log(`🔍 Found ${inputs.length} modifier input fields`);

    inputs.forEach(input => {
        const conditionType = input.getAttribute('data-condition');
        const grade = input.getAttribute('data-grade');

        if (modifiers[conditionType] && modifiers[conditionType][grade] !== undefined) {
            const value = modifiers[conditionType][grade];
            input.value = value;
            updateModifierInputStyle(input);
            console.log(`✅ Loaded ${conditionType}.${grade} = ${value}`);
        }
    });

    console.log('✅ All condition modifier inputs loaded from localStorage');
}

/**
 * Save condition modifier
 */
function saveConditionModifier(conditionType, grade) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    const input = document.querySelector(
        `input[data-condition="${conditionType}"][data-grade="${grade}"]`
    );

    if (!input) return;

    const modifierValue = parseFloat(input.value) || 0;

    adminManager.saveConditionModifier(conditionType, grade, modifierValue);
    updateModifierInputStyle(input);

    alert('Condition modifier saved successfully!');
}

/**
 * Save ALL condition modifiers at once and sync
 * Collects all modifier input values and saves to localStorage
 */
function saveAllConditionModifiersAndSync() {
    console.log('💾 Saving all condition modifiers...');

    // Check permission
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    try {
        // Collect all modifier inputs
        const allInputs = document.querySelectorAll('.modifier-input');

        if (allInputs.length === 0) {
            alert('⚠️ No modifier inputs found on page. Make sure you are on the Settings tab.');
            return;
        }

        console.log(`📝 Found ${allInputs.length} modifier inputs`);

        // Build complete modifiers object
        const modifiers = {};
        let savedCount = 0;

        allInputs.forEach(input => {
            const conditionType = input.dataset.condition;
            const grade = input.dataset.grade;
            const value = parseFloat(input.value) || 0;

            if (conditionType && grade) {
                // Initialize condition type object if needed
                if (!modifiers[conditionType]) {
                    modifiers[conditionType] = {};
                }

                // Save value
                modifiers[conditionType][grade] = value;
                savedCount++;

                console.log(`  ✅ ${conditionType}.${grade} = ${value}`);
            }
        });

        // Save to localStorage
        localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(modifiers));

        console.log('💾 Saved to localStorage:', modifiers);
        console.log(`✅ Successfully saved ${savedCount} condition modifiers`);

        // Update all input styles
        allInputs.forEach(input => {
            updateModifierInputStyle(input);
        });

        // Show success message
        alert(`✅ Success!\n\nSaved ${savedCount} condition modifiers to localStorage.\n\nAll changes will be immediately reflected in:\n• Customer quote page (quote.html)\n• Buyback interface (buy.html)\n• Mobile app (if synced)`);

        // Log for verification
        const verification = localStorage.getItem('ktmobile_condition_modifiers');
        console.log('🔍 Verification - localStorage contains:', verification);

    } catch (error) {
        console.error('❌ Error saving all modifiers:', error);
        alert('❌ Error saving modifiers: ' + error.message);
    }
}

function renderPriceTable() {
    console.log('=== renderPriceTable called ===');

    // Try both possible IDs for backward compatibility
    const tbody = document.getElementById('buybackPriceTableBody') || document.getElementById('priceTableBody');
    const brandFilter = document.getElementById('buybackPriceBrandFilter')?.value || document.getElementById('priceBrandFilter')?.value || '';

    if (!tbody) {
        console.error('Price table body not found! Looking for: buybackPriceTableBody or priceTableBody');
        return;
    }

    // REMOVED FILTER: Don't filter to Apple/Samsung only - show ALL phones
    let phones = adminManager.phones || [];
    const allPhonesCount = phones.length;
    console.log('📱 Total phones in localStorage:', allPhonesCount);

    // List all brands available
    const allBrands = [...new Set(phones.map(p => p.brand))];
    console.log('📦 Brands in database:', allBrands.join(', '));

    // Filter by brand if selected
    if (brandFilter) {
        const beforeFilter = phones.length;
        phones = phones.filter(p => p.brand === brandFilter);
        console.log(`🔍 Brand filter "${brandFilter}": ${beforeFilter} → ${phones.length} phones`);
    }

    console.log('📊 Phones to display in table:', phones.length);

    if (phones.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    ${brandFilter ? 'No phones found for selected brand.' : 'No phones available. Add phones first in Phone Models section.'}
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = phones.flatMap(phone => {
        // Get storages from phone, or default to common storages
        const storages = phone.storages && phone.storages.length > 0 
            ? phone.storages 
            : (phone.storagePrices ? Object.keys(phone.storagePrices) : ['128GB', '256GB']);
        
        return storages.map(storage => {
            // Get price based on currentPriceType toggle - NO CALCULATIONS!
            let price;
            if (currentPriceType === 'new') {
                // Show NEW phone prices - EXACT from database only
                price = phone.newPhonePrices && phone.newPhonePrices[storage]
                    ? phone.newPhonePrices[storage]
                    : 0; // Show 0 if no exact NEW price exists
            } else {
                // Show USED phone prices (default)
                price = phone.storagePrices && phone.storagePrices[storage]
                    ? phone.storagePrices[storage]
                    : (phone.basePrice || 0);
            }

            // FILTER: Skip this row if viewing NEW prices and price is 0 (model doesn't have NEW pricing)
            if (currentPriceType === 'new' && price === 0) {
                return ''; // Return empty string to skip this row
            }

            return `
                <tr>
                    <td><strong>${phone.brand}</strong></td>
                    <td>${phone.model}</td>
                    <td><span style="font-weight: 500;">${storage}</span></td>
                    <td style="color: var(--text-dark); font-weight: 600;">SGD $${price.toLocaleString()}</td>
                    <td>
                        <input type="number"
                               class="price-input"
                               value="${price}"
                               data-phone-id="${phone.id}"
                               data-storage="${storage}"
                               data-price-type="${currentPriceType}"
                               onchange="updateSinglePrice(this)"
                               min="0"
                               step="10"
                               style="width: 120px; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm"
                                onclick="saveSinglePrice('${phone.id}', '${storage}', '${currentPriceType}')"
                                style="pointer-events: auto;">
                            Save
                        </button>
                    </td>
                </tr>
            `;
        });
    }).join('');
    
    console.log('Price table rendered successfully');
}

/**
 * Update price in memory when input changes (supports both used and new prices)
 */
function updateSinglePrice(input) {
    const phoneId = input.dataset.phoneId;
    const storage = input.dataset.storage;
    const priceType = input.dataset.priceType;
    const newPrice = parseFloat(input.value) || 0;

    const phone = adminManager.getPhone(phoneId);
    if (!phone) return;

    // Update the appropriate price field
    if (priceType === 'new') {
        if (!phone.newPhonePrices) phone.newPhonePrices = {};
        phone.newPhonePrices[storage] = newPrice;
    } else {
        if (!phone.storagePrices) phone.storagePrices = {};
        phone.storagePrices[storage] = newPrice;
        // Also update basePrice if this is the lowest
        if (!phone.basePrice || newPrice < phone.basePrice) {
            phone.basePrice = newPrice;
        }
    }
}

// Keep old function for backward compatibility
function updatePrice(phoneId, storage, newPrice) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    const phone = adminManager.getPhone(phoneId);
    if (!phone) {
        console.error('Phone not found:', phoneId);
        return;
    }

    const priceValue = parseFloat(newPrice) || 0;

    // Update the correct price field based on currentPriceType
    if (currentPriceType === 'new') {
        // Update new phone prices
        if (!phone.newPhonePrices) {
            phone.newPhonePrices = {};
        }
        phone.newPhonePrices[storage] = priceValue;
    } else {
        // Update used phone prices
        if (!phone.storagePrices) {
            phone.storagePrices = {};
        }
        const oldBasePrice = phone.storagePrices[storage] || phone.basePrice;
        phone.storagePrices[storage] = priceValue;

        // Update buy prices proportionally if they exist (only for used phones)
        if (phone.buyPrices && phone.buyPrices[storage]) {
            const priceDiff = priceValue - oldBasePrice;
            Object.keys(phone.buyPrices[storage]).forEach(condition => {
                phone.buyPrices[storage][condition] = Math.max(0, (phone.buyPrices[storage][condition] || 0) + priceDiff);
            });
        }
    }

    phone.updatedAt = new Date().toISOString();
    adminManager.savePhones();
}

function savePrice(phoneId, storage) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    const input = document.querySelector(`input[data-phone-id="${phoneId}"][data-storage="${storage}"]`);
    if (!input) {
        alert('Price input not found');
        return;
    }

    updatePrice(phoneId, storage, input.value);
    alert('Price saved successfully!');
}

/**
 * Save single price (supports both used and new prices)
 */
function saveSinglePrice(phoneId, storage, priceType) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    const phone = adminManager.getPhone(phoneId);
    if (!phone) {
        alert('Phone not found');
        return;
    }

    // Save to localStorage
    phone.updatedAt = new Date().toISOString();
    adminManager.updatePhone(phoneId, phone);

    // Show success message
    const priceTypeLabel = priceType === 'new' ? 'New' : 'Used';
    showNotification(`${priceTypeLabel} price updated for ${phone.model} ${storage}`, 'success');
}

/**
 * Save ALL Buyback Prices (NEW or USED based on current toggle)
 * Saves all visible prices and refreshes the table to reflect changes
 */
function saveAllBuybackPrices() {
    console.log('💾 Saving all buyback prices...');

    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManagePrices')) {
        alert('You do not have permission to update prices.');
        return;
    }

    try {
        // Collect all price inputs
        const allPriceInputs = document.querySelectorAll('.price-input');

        if (allPriceInputs.length === 0) {
            alert('⚠️ No price inputs found. Make sure you are viewing the Buyback Base Prices table.');
            return;
        }

        console.log(`📝 Found ${allPriceInputs.length} price inputs`);

        // Group updates by phone
        const phoneUpdates = {};
        let updatedCount = 0;

        allPriceInputs.forEach(input => {
            const phoneId = input.dataset.phoneId;
            const storage = input.dataset.storage;
            const priceType = input.dataset.priceType; // 'new' or 'used'
            const price = parseFloat(input.value) || 0;

            if (!phoneId || !storage || !priceType) {
                console.warn('Skipping input with missing data:', { phoneId, storage, priceType });
                return;
            }

            if (!phoneUpdates[phoneId]) {
                phoneUpdates[phoneId] = adminManager.getPhone(phoneId);
            }

            const phone = phoneUpdates[phoneId];
            if (!phone) {
                console.warn(`Phone not found for ID: ${phoneId}`);
                return;
            }

            // Update based on price type
            if (priceType === 'new') {
                if (!phone.newPhonePrices) phone.newPhonePrices = {};
                phone.newPhonePrices[storage] = price;
            } else {
                if (!phone.storagePrices) phone.storagePrices = {};
                phone.storagePrices[storage] = price;
            }

            phone.updatedAt = new Date().toISOString();
            updatedCount++;

            console.log(`  ✅ ${phone.model} ${storage} (${priceType}): ${price}`);
        });

        // Save all updated phones to localStorage
        Object.keys(phoneUpdates).forEach(phoneId => {
            adminManager.updatePhone(phoneId, phoneUpdates[phoneId]);
        });

        console.log(`✅ Successfully updated ${updatedCount} prices across ${Object.keys(phoneUpdates).length} phone models`);

        // Re-render the table to reflect saved changes
        renderPriceTable();

        // Show success message
        const priceTypeLabel = currentPriceType === 'new' ? 'NEW' : 'USED';
        alert(`✅ Success!\n\nSaved ${updatedCount} ${priceTypeLabel} buyback prices.\n\nAffected ${Object.keys(phoneUpdates).length} phone models.\n\nTable refreshed to show saved values.`);

        // Show notification if available
        if (typeof showNotification === 'function') {
            showNotification(`Saved ${updatedCount} ${priceTypeLabel} prices successfully`, 'success');
        }

    } catch (error) {
        console.error('❌ Error saving all prices:', error);
        alert('❌ Error saving prices: ' + error.message);
    }
}

/**
 * Brands Section
 */
function initializeBrandsSection() {
    renderBrands();
}

function renderBrands() {
    const grid = document.getElementById('brandsGrid');
    const brands = adminManager.brands;

    grid.innerHTML = Object.entries(brands).map(([brandName, brandData]) => `
        <div class="brand-card">
            <img src="${brandData.image}" alt="${brandName}" class="brand-card-image" 
                 id="brand-preview-${brandName}"
                 onerror="this.src='images/phones/iphone-16-pro-max.jpg'">
            <h4>${brandName}</h4>
            <div class="brand-image-upload-section">
                <input type="file" id="brand-file-${brandName}" accept="image/*" 
                       class="brand-file-input" style="display: none;"
                       onchange="handleBrandFileUpload('${brandName}', this.files[0])">
                <button type="button" class="btn btn-secondary btn-sm" style="width: 100%; margin-bottom: 0.5rem;"
                        onclick="document.getElementById('brand-file-${brandName}').click()">
                    📁 Upload Image
                </button>
                <input type="text" class="form-control" value="${brandData.image}" 
                       id="brand-image-${brandName}" placeholder="Or enter image URL">
                <button class="btn btn-primary btn-sm" style="margin-top: 0.5rem; width: 100%;"
                        onclick="saveBrandImage('${brandName}')">Save Image</button>
            </div>
        </div>
    `).join('');
}

async function handleBrandFileUpload(brandName, file) {
    if (!file) return;
    
    // Validate file
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Image file is too large. Maximum size is 5MB.');
        return;
    }
    
    const input = document.getElementById(`brand-image-${brandName}`);
    const preview = document.getElementById(`brand-preview-${brandName}`);
    
    // Show loading
    if (preview) {
        preview.style.opacity = '0.5';
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        const originalDataUrl = e.target.result;
        
        // Automatically remove background for brand images
        if (typeof backgroundRemover !== 'undefined') {
            try {
                const processedDataUrl = await backgroundRemover.autoRemoveBackground(originalDataUrl);
                
                if (input) {
                    input.value = processedDataUrl;
                }
                
                if (preview) {
                    preview.src = processedDataUrl;
                    preview.style.opacity = '1';
                }
            } catch (error) {
                console.error('Background removal failed for brand image:', error);
                // Use original if removal fails
                if (input) {
                    input.value = originalDataUrl;
                }
                if (preview) {
                    preview.src = originalDataUrl;
                    preview.style.opacity = '1';
                }
            }
        } else {
            // Fallback if background remover not available
            if (input) {
                input.value = originalDataUrl;
            }
            if (preview) {
                preview.src = originalDataUrl;
                preview.style.opacity = '1';
            }
        }
    };
    reader.onerror = function() {
        alert('Error reading file. Please try again.');
        if (preview) {
            preview.style.opacity = '1';
        }
    };
    reader.readAsDataURL(file);
}

function selectBrandImage(brandName) {
    const input = document.getElementById(`brand-image-${brandName}`);
    if (input) input.focus();
}

function saveBrandImage(brandName) {
    // Check permission (only if auth is available)
    if (typeof auth !== 'undefined' && auth.hasPermission && !auth.hasPermission('canManageBrands')) {
        alert('You do not have permission to manage brand settings.');
        return;
    }

    const input = document.getElementById(`brand-image-${brandName}`);
    if (!input) {
        alert('Input field not found');
        return;
    }
    
    const imagePath = input.value.trim();
    
    if (!imagePath) {
        alert('Please upload an image file or enter an image URL');
        return;
    }
    
    adminManager.updateBrandImage(brandName, imagePath);
    alert('Brand image updated!');
    
    // Update preview
    const preview = document.getElementById(`brand-preview-${brandName}`);
    if (preview) {
        preview.src = imagePath;
    }
}

/**
 * Phone Modal Functions
 */
function initializePhoneModal() {
    const modal = document.getElementById('phoneModal');
    const form = document.getElementById('phoneForm');
    const brandSelect = document.getElementById('phoneBrand');
    const imageFileInput = document.getElementById('phoneImageFile');
    const imagePreview = document.getElementById('imagePreview');

    // Add null checks for critical elements
    if (!form || !brandSelect || !imageFileInput) {
        console.warn('Phone modal elements not found, skipping initialization');
        return;
    }

    // Storage checkboxes handler
    brandSelect.addEventListener('change', function() {
        updateStoragePrices();
    });

    // Image file preview and auto-fill URL field
    imageFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('📷 ========================================');
            console.log('📷 IMAGE UPLOAD STARTED');
            console.log('📷 ========================================');
            console.log('   File name:', file.name);
            console.log('   File size:', Math.round(file.size / 1024), 'KB');
            console.log('   File type:', file.type);

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                const sizeKB = Math.round(base64Image.length / 1024);

                console.log('✅ IMAGE CONVERTED TO BASE64');
                console.log('   Base64 size:', sizeKB, 'KB');
                console.log('   Base64 preview:', base64Image.substring(0, 100) + '...');

                // Show preview
                imagePreview.innerHTML = `<img src="${base64Image}" alt="Preview">`;
                console.log('✅ Image preview displayed in modal');

                // CRITICAL FIX: Auto-fill the image URL field with base64 data
                // This ensures the image is saved when the form is submitted
                const imageUrlInput = document.getElementById('phoneImageUrl');
                if (imageUrlInput) {
                    imageUrlInput.value = base64Image;
                    console.log('✅ Image data saved to phoneImageUrl field');
                    console.log('   Field value length:', imageUrlInput.value.length, 'characters');
                    console.log('');
                    console.log('📝 READY TO SAVE!');
                    console.log('   Click "Save Phone" button to store this image to localStorage.');
                    console.log('📷 ========================================');
                } else {
                    console.error('❌ CRITICAL ERROR: phoneImageUrl field not found!');
                }
            };
            reader.onerror = function() {
                console.error('❌ Error reading image file');
                alert('Error reading image file. Please try again.');
            };
            reader.readAsDataURL(file);
        } else {
            console.log('⚠️  No file selected');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        savePhone();
    });
}

function openPhoneModal(phoneId = null) {
    const modal = document.getElementById('phoneModal');
    const form = document.getElementById('phoneForm');
    const modalTitle = document.getElementById('modalTitle');

    adminManager.currentEditingPhone = phoneId;

    // Populate color dropdown
    populateColorDropdown();

    if (phoneId) {
        // Edit mode
        const phone = adminManager.getPhone(phoneId);
        if (!phone) return;

        modalTitle.textContent = 'Edit Phone';
        document.getElementById('phoneBrand').value = phone.brand;
        document.getElementById('phoneModel').value = phone.model;
        document.getElementById('phoneImageUrl').value = phone.image;

        // CRITICAL FIX: Show image preview when editing
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview && phone.image) {
            // Add cache-busting to preview image to force reload
            let previewImageUrl = phone.image;
            if (!previewImageUrl.startsWith('data:') && previewImageUrl.indexOf('?t=') === -1) {
                previewImageUrl = `${previewImageUrl}?t=${Date.now()}`;
            }
            imagePreview.innerHTML = `<img src="${previewImageUrl}" alt="Current Image">`;
            console.log('📷 Loaded existing image for editing:', phone.image.substring(0, 50) + '...');
        }

        // Set selected colors in dropdown
        const colorSelect = document.getElementById('phoneColorsSelect');
        if (colorSelect && phone.colors) {
            Array.from(colorSelect.options).forEach(option => {
                option.selected = phone.colors.includes(option.value);
            });
        }
        updateSelectedColorsList();

        // Display toggle for refurbishment page
        const displayCheckbox = document.getElementById('phoneDisplay');
        if (displayCheckbox) {
            displayCheckbox.checked = phone.display !== false; // Default to true
        }

        // Check storage checkboxes
        phone.storages.forEach(storage => {
            const checkbox = document.querySelector(`input[type="checkbox"][value="${storage}"]`);
            if (checkbox) checkbox.checked = true;
        });

        updateStoragePrices();
        updateBuyPricesStockSection(phone);
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Phone';
        form.reset();
        document.getElementById('imagePreview').innerHTML = '<span>No image selected</span>';
        const displayCheckbox = document.getElementById('phoneDisplay');
        if (displayCheckbox) displayCheckbox.checked = true;

        // Clear color selection
        const colorSelect = document.getElementById('phoneColorsSelect');
        if (colorSelect) {
            Array.from(colorSelect.options).forEach(option => {
                option.selected = false;
            });
        }
        updateSelectedColorsList();

        updateStoragePrices();
        updateBuyPricesStockSection(null);
    }

    // ISSUE FIX #1: Show only relevant price section based on current buyback type
    // Hide the toggle buttons and show only the section that matches the current view
    const modalToggleContainer = document.querySelector('#phoneModal .modal-body > div[style*="justify-content: center"]');
    const usedSection = document.querySelector('.modal-used-section');
    const newSection = document.querySelector('.modal-new-section');

    if (modalToggleContainer && usedSection && newSection) {
        // Hide the toggle buttons
        modalToggleContainer.style.display = 'none';

        // Show only the section that matches current buyback type
        if (currentBuybackType === 'used') {
            usedSection.style.display = 'block';
            newSection.style.display = 'none';
            modalTitle.textContent = phoneId ? 'Edit Phone - Used Prices' : 'Add New Phone - Used Prices';
        } else if (currentBuybackType === 'new') {
            usedSection.style.display = 'none';
            newSection.style.display = 'block';
            modalTitle.textContent = phoneId ? 'Edit Phone - New Prices' : 'Add New Phone - New Prices';
        }
    }

    modal.classList.add('active');
}

function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    modal.classList.remove('active');
    adminManager.currentEditingPhone = null;
}

function updateStoragePrices() {
    const container = document.getElementById('storagePrices');
    const newPriceContainer = document.getElementById('newPhonePrices');
    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);

    if (checkedStorages.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); font-size: 0.875rem;">Select storage options above</p>';
        if (newPriceContainer) newPriceContainer.innerHTML = '';
        return;
    }

    // Get current phone with fallback logic
    let currentPhone = null;
    if (adminManager.currentEditingPhone) {
        currentPhone = adminManager.getPhone(adminManager.currentEditingPhone);
    }

    // Used prices section - read from buyPrices (backend-editable)
    container.innerHTML = checkedStorages.map(storage => {
        let usedPrice = 0;

        if (currentPhone) {
            // Read from buyPrices (backend, admin-editable)
            if (currentPhone.buyPrices && currentPhone.buyPrices[storage]) {
                usedPrice = currentPhone.buyPrices[storage].excellent || 0;
            }
            // Fallback: Try storagePrices (Excel import)
            else if (currentPhone.storagePrices && currentPhone.storagePrices[storage]) {
                usedPrice = currentPhone.storagePrices[storage];
            }
            // Last resort: basePrice
            else if (currentPhone.basePrice) {
                usedPrice = currentPhone.basePrice;
                console.warn(`⚠️  ${currentPhone.model} no buyPrices[${storage}], using basePrice: $${usedPrice}`);
            }
        }

        return `
        <div class="storage-price-item" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
            <label style="min-width: 80px; font-weight: 600; color: var(--text-dark);">${storage}:</label>
            <div style="flex: 1; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: var(--text-light); font-size: 0.875rem;">SGD</span>
                <input type="number" class="form-control storage-price-input"
                       data-storage="${storage}"
                       placeholder="Enter base price"
                       value="${usedPrice}"
                       min="0"
                       step="10"
                       required
                       style="max-width: 200px;">
            </div>
        </div>
    `;
    }).join('');

    // New phone prices section - with intelligent fallback
    if (newPriceContainer) {
        newPriceContainer.innerHTML = checkedStorages.map(storage => {
            let newPrice = 0;

            if (currentPhone) {
                // Use exact NEW price if available
                if (currentPhone.newPhonePrices && currentPhone.newPhonePrices[storage]) {
                    newPrice = currentPhone.newPhonePrices[storage];
                }
                // NO AUTO-CALCULATION - Leave as 0 if no exact NEW price exists
            }

            return `
                <div class="new-price-item" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
                    <label style="min-width: 80px; font-weight: 600; color: var(--text-dark);">${storage}:</label>
                    <div style="flex: 1; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--text-light); font-size: 0.875rem;">SGD</span>
                        <input type="number" class="form-control new-price-input"
                               data-storage="${storage}"
                               value="${newPrice}"
                               min="0" step="10"
                               placeholder="Enter new/sealed price"
                               style="max-width: 200px;">
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update buy prices section when storages change
    if (adminManager.currentEditingPhone) {
        const phone = adminManager.getPhone(adminManager.currentEditingPhone);
        if (phone) {
            updateBuyPricesStockSection(phone);
        }
    } else {
        updateBuyPricesStockSection(null);
    }
}

/**
 * Update buy prices and stock section in modal (For Refurbished Phone Sales)
 */
function updateBuyPricesStockSection(phone) {
    const container = document.getElementById('buyPricesStockSection');
    if (!container) return;
    
    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);
    
    if (checkedStorages.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">Select storage options first</p>';
        return;
    }
    
    const conditions = ['excellent', 'good', 'fair'];
    const conditionLabels = {
        'excellent': 'Excellent',
        'good': 'Good',
        'fair': 'Fair'
    };
    
    container.innerHTML = checkedStorages.map(storage => {
        const basePrice = phone ? (phone.storagePrices?.[storage] || phone.basePrice || 0) : 0;
        
        return `
            <div class="buy-price-storage-group" style="margin-bottom: 2rem; padding: 1rem; background: var(--gray); border-radius: 8px;">
                <h5 style="margin-bottom: 1rem; color: var(--text-dark);">${storage}</h5>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <th style="padding: 0.5rem; text-align: left; font-size: 0.875rem;">Condition</th>
                            <th style="padding: 0.5rem; text-align: left; font-size: 0.875rem;">Sale Price (SGD)</th>
                            <th style="padding: 0.5rem; text-align: left; font-size: 0.875rem;">Stock Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${conditions.map(condition => {
                            const price = phone?.buyPrices?.[storage]?.[condition] || basePrice;
                            const quantity = phone?.quantities?.[storage]?.[condition] || 0;
                            
                            return `
                                <tr>
                                    <td style="padding: 0.5rem;">
                                        <span class="condition-badge ${condition}" style="padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ${conditionLabels[condition]}
                                        </span>
                                    </td>
                                    <td style="padding: 0.5rem;">
                                        <input type="number" 
                                               class="form-control buy-price-modal-input" 
                                               data-storage="${storage}" 
                                               data-condition="${condition}"
                                               value="${price}" 
                                               min="0" 
                                               step="10" 
                                               style="width: 120px; padding: 0.5rem;">
                                    </td>
                                    <td style="padding: 0.5rem;">
                                        <input type="number" 
                                               class="form-control buy-quantity-modal-input" 
                                               data-storage="${storage}" 
                                               data-condition="${condition}"
                                               value="${quantity}" 
                                               min="0" 
                                               step="1" 
                                               style="width: 100px; padding: 0.5rem;">
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }).join('');
}

// Add event listener to storage checkboxes
document.addEventListener('change', function(e) {
    if (e.target.matches('.storage-checkboxes input[type="checkbox"]')) {
        updateStoragePrices();
    }
    // Update selected colors display when color dropdown changes
    if (e.target.id === 'phoneColorsSelect') {
        updateSelectedColorsList();
    }
});

/**
 * Get hex color code for common phone colors
 * Based on official Apple and Samsung color data from Excel files
 *
 * @param {string} colorName - Name of the color
 * @param {string} brand - Brand name (Apple or Samsung)
 * @returns {string} Hex color code
 */
function getCommonColorHex(colorName, brand) {
    // Comprehensive color mapping from Excel reference files
    const colorDatabase = {
        // Apple Official Colors (from Apple_Official_Colors_From_Your_Models_UPDATED.xlsx)
        Apple: {
            // iPhone 16/17 Series Colors
            'Black': '#000000',
            'White': '#FFFFFF',
            'Pink': '#FFB6C1',
            'Teal': '#008080',
            'Ultramarine': '#4169E1',

            // iPhone Pro Titanium Colors
            'Desert Titanium': '#8B7355',
            'Natural Titanium': '#A8A8A0',
            'White Titanium': '#F5F5F0',
            'Black Titanium': '#2C2C2C',
            'Blue Titanium': '#4A6B8A',

            // iPhone 17 New Colors
            'Cosmic Orange': '#FF6B35',
            'Deep Blue': '#003D82',

            // Standard Apple Colors
            'Space Gray': '#52514D',
            'Space Grey': '#52514D',
            'Space Black': '#1C1C1E',
            'Silver': '#C0C0C0',
            'Gold': '#FFD700',
            'Rose Gold': '#B76E79',
            'Midnight': '#2C2C2E',
            'Starlight': '#F5F5DC',
            'Blue': '#1E3A8A',
            'Purple': '#9333EA',
            'Deep Purple': '#5B4B8A',
            'Red': '#DC2626',
            '(PRODUCT)RED': '#DC2626',
            'Product Red': '#DC2626',
            'Green': '#059669',
            'Alpine Green': '#576856',
            'Midnight Green': '#4E5851',
            'Yellow': '#EAB308',
            'Coral': '#FF6B6B',
            'Graphite': '#54524F',
            'Sierra Blue': '#A7C1D9',
            'Pacific Blue': '#2D4E5C',

            // iPhone 15 Colors
            'Black (iPhone 15)': '#3C3C3C',
            'Blue (iPhone 15)': '#D4E4ED',
            'Green (iPhone 15)': '#CAD6C3',
            'Yellow (iPhone 15)': '#F6E64C',
            'Pink (iPhone 15)': '#F9D1CF',

            // iPhone 14/13 Colors
            'Midnight (iPhone 14)': '#1C1C1E',
            'Starlight (iPhone 14)': '#F5F5DC',
            'Pink (iPhone 13)': '#FADDD7',
            'Blue (iPhone 13)': '#447792',
            'Midnight (iPhone 13)': '#3E4042',
            'Starlight (iPhone 13)': '#FAF6F2',
            'Red (iPhone 13)': '#BF0013',
            'Green (iPhone 13)': '#394C38'
        },

        // Samsung Official Colors (from Samsung_ALL_Models_Official_Colors_MERGED.xlsx)
        Samsung: {
            // Galaxy S24 Ultra Colors
            'Titanium Black': '#1C1C1C',
            'Titanium Gray': '#8E8E93',
            'Titanium Violet': '#C9B3D8',
            'Titanium Yellow': '#FFD60A',
            'Titanium Green': '#30D158',
            'Titanium Orange': '#FF9500',
            'Titanium Blue': '#0A84FF',

            // Galaxy S24+ / S24 Colors
            'Onyx Black': '#000000',
            'Marble Gray': '#B4B4B8',
            'Cobalt Violet': '#8E7CC3',
            'Amber Yellow': '#FFD60A',
            'Jade Green': '#32D74B',
            'Sapphire Blue': '#0A84FF',
            'Sandstone Orange': '#FF9F0A',

            // Galaxy S23 Series Colors
            'Phantom Black': '#1C1C1C',
            'Phantom White': '#F5F5F5',
            'Cloud Navy': '#2C3E50',
            'Cloud White': '#F8F8F8',
            'Lavender': '#E6E6FA',
            'Mint': '#98FF98',
            'Cream': '#FFFDD0',
            'Burgundy': '#800020',
            'Bronze': '#CD7F32',
            'Graphite': '#383838',
            'Icy Blue': '#B0E0E6',

            // Phantom Series (older models)
            'Phantom Silver': '#D1D1D6',
            'Phantom Gray': '#8E8E93',
            'Phantom Violet': '#8E7CC3',

            // Standard Samsung Colors
            'Black': '#000000',
            'White': '#FFFFFF',
            'Gray': '#808080',
            'Blue': '#0A84FF',
            'Green': '#32D74B',
            'Purple': '#AF52DE',
            'Pink': '#FF2D55',
            'Red': '#FF3B30',
            'Yellow': '#FFD60A',
            'Orange': '#FF9F0A'
        },

        // Generic fallback colors (for any brand)
        Generic: {
            'Black': '#000000',
            'White': '#FFFFFF',
            'Gray': '#808080',
            'Grey': '#808080',
            'Silver': '#C0C0C0',
            'Gold': '#FFD700',
            'Blue': '#0A84FF',
            'Red': '#FF3B30',
            'Green': '#32D74B',
            'Yellow': '#FFD60A',
            'Orange': '#FF9F0A',
            'Purple': '#AF52DE',
            'Pink': '#FF2D55',
            'Brown': '#A52A2A',
            'Beige': '#F5F5DC'
        }
    };

    // Try to find color in brand-specific database
    if (colorDatabase[brand] && colorDatabase[brand][colorName]) {
        return colorDatabase[brand][colorName];
    }

    // Try generic color database
    if (colorDatabase.Generic[colorName]) {
        return colorDatabase.Generic[colorName];
    }

    // Default to gray if color not found
    console.warn(`⚠️ Color not found: ${colorName} (${brand}), using default gray`);
    return '#CCCCCC';
}

function savePhone() {
    // Check permission
    if (!auth.hasPermission('canManagePhones')) {
        alert('You do not have permission to manage phones.');
        return;
    }

    const brand = document.getElementById('phoneBrand').value;
    const model = document.getElementById('phoneModel').value;
    const imageUrl = document.getElementById('phoneImageUrl').value;

    // Get colors from dropdown with hex values
    const colorSelect = document.getElementById('phoneColorsSelect');
    const selectedColorNames = colorSelect ? Array.from(colorSelect.selectedOptions).map(opt => opt.value) : [];

    // Convert color names to objects with hex values
    // Load from phoneDatabase if available, otherwise use default hex mapping
    const colors = selectedColorNames.map(colorName => {
        // Try to find hex from phoneDatabase for this brand's models
        let hexValue = null;

        // Check if we have phoneDatabase available
        if (typeof phoneDatabase !== 'undefined' && phoneDatabase[brand]) {
            // Look through existing models of this brand to find the hex value
            for (const modelName in phoneDatabase[brand]) {
                const model = phoneDatabase[brand][modelName];
                if (model.colors && Array.isArray(model.colors)) {
                    const existingColor = model.colors.find(c =>
                        (typeof c === 'object' && c.name === colorName) ||
                        c === colorName
                    );
                    if (existingColor && typeof existingColor === 'object' && existingColor.hex) {
                        hexValue = existingColor.hex;
                        break;
                    }
                }
            }
        }

        // If no hex found in phoneDatabase, use common color mapping
        if (!hexValue) {
            hexValue = getCommonColorHex(colorName, brand);
        }

        return {
            name: colorName,
            hex: hexValue
        };
    });

    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);

    // ISSUE FIX #1: Only collect prices for the current section being edited
    let storagePrices = {};
    let newPhonePrices = {};
    let basePrice = 0;

    // Get existing phone data if editing
    const existingPhone = adminManager.currentEditingPhone ? adminManager.getPhone(adminManager.currentEditingPhone) : null;

    if (currentBuybackType === 'used') {
        // USED PRICES MODE: Only collect and validate used prices
        checkedStorages.forEach(storage => {
            const input = document.querySelector(`.storage-price-input[data-storage="${storage}"]`);
            if (input) {
                storagePrices[storage] = parseFloat(input.value) || 0;
            }
        });

        // Validate that all used storage prices are set
        const missingPrices = checkedStorages.filter(storage => !storagePrices[storage] || storagePrices[storage] <= 0);
        if (missingPrices.length > 0) {
            alert(`Please set used prices for: ${missingPrices.join(', ')}`);
            return;
        }

        // Preserve existing new phone prices if editing, otherwise leave empty
        if (existingPhone && existingPhone.newPhonePrices) {
            newPhonePrices = existingPhone.newPhonePrices;
        } else {
            // FIXED: Don't auto-calculate! Leave empty - prices should come from import
            newPhonePrices = {};
        }

        basePrice = Math.min(...Object.values(storagePrices));

    } else if (currentBuybackType === 'new') {
        // NEW PRICES MODE: Only collect and validate new prices
        checkedStorages.forEach(storage => {
            const input = document.querySelector(`.new-price-input[data-storage="${storage}"]`);
            if (input) {
                newPhonePrices[storage] = parseFloat(input.value) || 0;
            }
        });

        // Validate that all new storage prices are set
        const missingPrices = checkedStorages.filter(storage => !newPhonePrices[storage] || newPhonePrices[storage] <= 0);
        if (missingPrices.length > 0) {
            alert(`Please set new prices for: ${missingPrices.join(', ')}`);
            return;
        }

        // Preserve existing used phone prices if editing, otherwise leave empty
        if (existingPhone && existingPhone.storagePrices) {
            storagePrices = existingPhone.storagePrices;
        } else {
            // FIXED: Don't auto-calculate! Leave empty - prices should come from import
            storagePrices = {};
        }

        // Calculate basePrice safely, handling empty storagePrices
        basePrice = Object.values(storagePrices).length > 0
            ? Math.min(...Object.values(storagePrices))
            : (Object.values(newPhonePrices).length > 0 ? Math.min(...Object.values(newPhonePrices)) : 0);
    }

    // Validate required fields
    if (!brand || !model || checkedStorages.length === 0) {
        alert('Please fill in all required fields (Brand, Model, and at least one Storage option with price)');
        return;
    }

    // Get display toggle for refurbishment page
    const displayCheckbox = document.getElementById('phoneDisplay');
    const display = displayCheckbox ? displayCheckbox.checked : true;
    
    // Get buy prices and quantities (for refurbished phone SALES only, not buyback)
    const buyPrices = {};
    const quantities = {};
    
    checkedStorages.forEach(storage => {
        buyPrices[storage] = {};
        quantities[storage] = {};
        
        ['excellent', 'good', 'fair'].forEach(condition => {
            const priceInput = document.querySelector(`.buy-price-modal-input[data-storage="${storage}"][data-condition="${condition}"]`);
            const quantityInput = document.querySelector(`.buy-quantity-modal-input[data-storage="${storage}"][data-condition="${condition}"]`);

            if (priceInput) {
                buyPrices[storage][condition] = parseFloat(priceInput.value) || 0;
            } else {
                // Calculate buyPrices from the ACTUAL storage price entered by admin
                // This comes from the storage price input field that admin just edited
                const storagePrice = storagePrices[storage] || 0;
                const conditionMultipliers = {
                    'excellent': 1.0,    // 100% of storage price
                    'good': 0.95,        // 95% of storage price
                    'fair': 0.85         // 85% of storage price
                };
                buyPrices[storage][condition] = Math.round(storagePrice * conditionMultipliers[condition]);
            }

            if (quantityInput) {
                quantities[storage][condition] = parseInt(quantityInput.value) || 0;
            } else {
                quantities[storage][condition] = 0;
            }
        });
    });

    // Don't add cache-busting when saving - only add it when rendering/displaying
    let finalImageUrl = imageUrl || adminManager.getDefaultImage(brand);

    const phoneData = {
        brand,
        model,
        image: finalImageUrl,
        storages: checkedStorages,
        colors: colors, // Already an array from dropdown
        basePrice: basePrice, // Calculated from minimum storage price
        storagePrices: storagePrices, // USED prices
        newPhonePrices: newPhonePrices, // NEW SEALED prices
        display: display, // For refurbishment/buy page visibility
        buyPrices: buyPrices, // For REFURBISHED PHONE SALES (not buyback)
        quantities: quantities, // Stock for REFURBISHED PHONE SALES (not buyback)
        available: true,
        updatedAt: new Date().toISOString()
    };
    
    // If editing, preserve createdAt
    if (adminManager.currentEditingPhone) {
        const existingPhone = adminManager.getPhone(adminManager.currentEditingPhone);
        if (existingPhone && existingPhone.createdAt) {
            phoneData.createdAt = existingPhone.createdAt;
        }
    } else {
        phoneData.createdAt = new Date().toISOString();
    }

    console.log('💾 SAVING PHONE TO LOCALSTORAGE...');
    console.log('Phone Data:', {
        brand: phoneData.brand,
        model: phoneData.model,
        storages: phoneData.storages,
        usedPrices: phoneData.storagePrices,
        newPrices: phoneData.newPhonePrices
    });

    if (adminManager.currentEditingPhone) {
        console.log('📝 UPDATING existing phone ID:', adminManager.currentEditingPhone);
        adminManager.updatePhone(adminManager.currentEditingPhone, phoneData);

        // Set a flag to indicate phone data was updated (for customer pages to detect changes)
        localStorage.setItem('ktmobile_last_update', new Date().toISOString());

        // Verify save
        const savedPhones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        console.log('✅ SAVED! Total phones in localStorage:', savedPhones.length);
        console.log('✅ Updated phone:', savedPhones.find(p => p.id === adminManager.currentEditingPhone));

        alert('Phone updated successfully! Customer pages will show the new image on next load.');
    } else {
        console.log('➕ ADDING new phone...');
        const newPhone = adminManager.addPhone(phoneData);

        // Set a flag to indicate phone data was updated
        localStorage.setItem('ktmobile_last_update', new Date().toISOString());

        // Verify save
        const savedPhones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        console.log('✅ SAVED! Total phones in localStorage:', savedPhones.length);
        console.log('✅ New phone added:', newPhone);
        console.log('🔍 Can find in localStorage?', savedPhones.some(p => p.model === phoneData.model && p.brand === phoneData.brand));

        alert(`Phone added successfully!\n\nBrand: ${phoneData.brand}\nModel: ${phoneData.model}\nTotal phones: ${savedPhones.length}\n\nCheck console (F12) for detailed logs.`);
    }

    closePhoneModal();

    // Force reload from localStorage before rendering
    console.log('🔄 Reloading phones from localStorage before render...');
    adminManager.phones = adminManager.loadPhones();
    console.log('📱 Loaded phones:', adminManager.phones.length);

    // Update model dropdown if brand filter is active
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        updateModelDropdown(brandFilter.value);
    }

    console.log('🖼️  Rendering phones grid...');
    renderPhones();
    console.log('📊 Rendering price table...');
    renderPriceTable();
}

function editPhone(id) {
    openPhoneModal(id);
}

function deletePhone(id) {
    // Check permission
    if (!auth.hasPermission('canDelete')) {
        alert('You do not have permission to delete phones.');
        return;
    }

    if (confirm('Are you sure you want to delete this phone?')) {
        adminManager.deletePhone(id);
        
        // Update model dropdown if brand filter is active
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            updateModelDropdown(brandFilter.value);
        }
        
        renderPhones();
        renderPriceTable();
        alert('Phone deleted successfully!');
    }
}

/**
 * Users Section
 */
function initializeUsersSection() {
    const addAdminBtn = document.getElementById('addAdminBtn');
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', () => openAdminModal());
    }
    renderUsers();
}

function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const admins = auth.getAllAdmins();

    if (admins.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    No admin users found.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = admins.map(admin => {
        const permissionType = admin.permissionType || 'admin';
        const permission = PERMISSIONS[permissionType];
        const permissionClass = permissionType.replace('_', '-');
        
        return `
            <tr>
                <td><strong>${admin.name}</strong></td>
                <td>${admin.email}</td>
                <td>
                    <span class="permission-badge ${permissionClass}">${permission.name}</span>
                </td>
                <td>${new Date(admin.createdAt).toLocaleDateString()}</td>
                <td>${admin.createdBy || 'System'}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editAdmin('${admin.id}')" title="Edit">Edit</button>
                    ${admin.permissionType !== PERMISSION_TYPES.MASTER_ADMIN && admin.id !== auth.currentUser?.id ? 
                        `<button class="btn btn-secondary btn-sm" onclick="deleteAdmin('${admin.id}')" title="Delete" style="background: #dc3545; color: white; margin-left: 0.5rem;">Delete</button>` : 
                        '<span style="color: var(--text-light); font-size: 0.875rem;">Protected</span>'
                    }
                </td>
            </tr>
        `;
    }).join('');
}

function openAdminModal(adminId = null) {
    const modal = document.getElementById('adminModal');
    const form = document.getElementById('adminForm');
    const modalTitle = document.getElementById('adminModalTitle');
    const permissionSelect = document.getElementById('adminPermissionType');
    const descriptionDiv = document.getElementById('permissionDescription');

    if (adminId) {
        // Edit mode
        const admins = auth.getAllAdmins();
        const admin = admins.find(a => a.id === adminId);
        if (!admin) return;

        modalTitle.textContent = 'Edit Admin User';
        document.getElementById('adminName').value = admin.name;
        document.getElementById('adminEmail').value = admin.email;
        document.getElementById('adminEmail').disabled = true; // Don't allow email change
        document.getElementById('adminPassword').required = false;
        document.getElementById('adminPasswordConfirm').required = false;
        permissionSelect.value = admin.permissionType;
        updatePermissionDescription(admin.permissionType);
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Admin';
        form.reset();
        document.getElementById('adminEmail').disabled = false;
        document.getElementById('adminPassword').required = true;
        document.getElementById('adminPasswordConfirm').required = true;
    }

    // Permission description handler
    permissionSelect.addEventListener('change', function() {
        updatePermissionDescription(this.value);
    });

    modal.classList.add('active');
}

function updatePermissionDescription(permissionType) {
    const descriptionDiv = document.getElementById('permissionDescription');
    if (permissionType && PERMISSIONS[permissionType]) {
        descriptionDiv.textContent = PERMISSIONS[permissionType].description;
        descriptionDiv.style.display = 'block';
    } else {
        descriptionDiv.style.display = 'none';
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    modal.classList.remove('active');
    document.getElementById('adminForm').reset();
    document.getElementById('permissionDescription').style.display = 'none';
}

function editAdmin(id) {
    openAdminModal(id);
}

function deleteAdmin(id) {
    if (!confirm('Are you sure you want to delete this admin user?')) {
        return;
    }

    const result = auth.deleteAdmin(id);
    if (result.success) {
        alert('Admin user deleted successfully!');
        renderUsers();
    } else {
        alert(result.message);
    }
}

function initializeAdminModal() {
    const form = document.getElementById('adminForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAdmin();
    });
}

function saveAdmin() {
    const name = document.getElementById('adminName').value.trim();
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;
    const passwordConfirm = document.getElementById('adminPasswordConfirm').value;
    const permissionType = document.getElementById('adminPermissionType').value;

    // Validation
    if (!name || !email || !permissionType) {
        alert('Please fill in all required fields');
        return;
    }

    // Check if editing or creating
    const isEditing = document.getElementById('adminEmail').disabled;
    
    if (!isEditing) {
        // Creating new admin - password required
        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        if (password !== passwordConfirm) {
            alert('Passwords do not match');
            return;
        }
    }

    // Map permission type to full constant
    const fullPermissionType = PERMISSION_TYPES[permissionType.toUpperCase()] || permissionType;

    if (isEditing) {
        // Update existing admin
        const admins = auth.getAllAdmins();
        const admin = admins.find(a => a.email === email);
        if (!admin) {
            alert('Admin not found');
            return;
        }

        const updates = {
            name: name,
            permissionType: fullPermissionType
        };

        // Only update password if provided
        if (password && password.length >= 6) {
            if (password !== passwordConfirm) {
                alert('Passwords do not match');
                return;
            }
            updates.password = password;
        }

        const result = auth.updateAdmin(admin.id, updates);
        if (result.success) {
            alert('Admin updated successfully!');
            closeAdminModal();
            renderUsers();
        } else {
            alert(result.message);
        }
    } else {
        // Create new admin
        const result = auth.createAdmin(email, password, name, fullPermissionType);
        if (result.success) {
            alert('Admin created successfully!');
            closeAdminModal();
            renderUsers();
        } else {
            alert(result.message);
        }
    }
}

/**
 * Apply permission restrictions throughout the UI
 */
function applyPermissionRestrictions() {
    // Hide delete buttons if user can't delete
    if (!auth.hasPermission('canDelete')) {
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.style.display = 'none';
        });
    }

    // Hide add buttons if user can't manage phones
    if (!auth.hasPermission('canManagePhones')) {
        const addPhoneBtn = document.getElementById('addPhoneBtn');
        if (addPhoneBtn) addPhoneBtn.style.display = 'none';
    }

    // Hide brand settings if user can't manage brands
    if (!auth.hasPermission('canManageBrands')) {
        const brandsMenuItem = document.querySelector('.menu-item[data-section="brands"]');
        if (brandsMenuItem) brandsMenuItem.style.display = 'none';
    }

    // Hide settings if user can't manage settings
    if (!auth.hasPermission('canManageSettings')) {
        // Initialize appointments section
        try {
            initializeAppointmentsSection();
        } catch (e) {
            console.error('Error initializing appointments section:', e);
        }
        
        const settingsMenuItem = document.querySelector('.menu-item[data-section="settings"]');
        if (settingsMenuItem) settingsMenuItem.style.display = 'none';
    }
}

// Close modal on outside click
document.getElementById('phoneModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closePhoneModal();
    }
});

// Add event listeners for modifier inputs to update style
document.addEventListener('input', function(e) {
    if (e.target.matches('.modifier-input')) {
        updateModifierInputStyle(e.target);
    }
});

/**
 * Hero Image Management
 */
function initializeHeroImageSettings() {
    const heroSettings = adminManager.loadHeroImage();
    const previewImg = document.getElementById('currentHeroPreview');
    const pathText = document.getElementById('currentHeroPath');
    const urlInput = document.getElementById('heroImageUrl');
    const fileInput = document.getElementById('heroImageFile');
    const removeBgCheckbox = document.getElementById('removeBackground');

    if (previewImg) {
        // Ensure image path is valid
        const imagePath = heroSettings.imagePath || 'images/phones/iphone-16-pro-max-best.jpg';
        previewImg.src = imagePath;
        previewImg.style.display = 'block';
        previewImg.style.maxWidth = '200px';
        previewImg.style.maxHeight = '300px';
        previewImg.style.objectFit = 'contain';
        previewImg.style.border = '1px solid var(--border)';
        previewImg.style.borderRadius = '8px';
        previewImg.style.background = 'var(--gray)';
        previewImg.style.padding = '0.5rem';
        
        previewImg.onerror = function() {
            console.error('Hero image failed to load:', imagePath);
            this.src = 'images/phones/iphone-16-pro-max-best.jpg';
            this.onerror = null; // Prevent infinite loop
        };
        
        previewImg.onload = function() {
            console.log('Hero image loaded successfully:', imagePath);
        };
    }

    if (pathText) {
        // Hide long base64 strings - show friendly text instead
        const imagePath = heroSettings.imagePath || '';
        if (imagePath.startsWith('data:')) {
            pathText.textContent = 'Custom uploaded image';
        } else {
            pathText.textContent = imagePath.length > 50 ? imagePath.substring(0, 50) + '...' : imagePath;
        }
    }

    if (urlInput) {
        // Don't show base64 in URL input field
        const imagePath = heroSettings.imagePath || '';
        if (imagePath.startsWith('data:')) {
            urlInput.value = '';
            urlInput.placeholder = 'Custom image uploaded - enter new URL to replace';
        } else {
            urlInput.value = imagePath;
        }
    }

    if (removeBgCheckbox) {
        removeBgCheckbox.checked = heroSettings.removeBackground !== false;
    }

    // File input handler with automatic background removal
    if (fileInput) {
        fileInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image file');
                    this.value = '';
                    return;
                }
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Image file is too large. Maximum size is 5MB.');
                    this.value = '';
                    return;
                }
                
                // Show loading state
                if (previewImg) {
                    previewImg.style.opacity = '0.5';
                    previewImg.alt = 'Processing...';
                }
                
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const originalDataUrl = e.target.result;
                    
                    // Check if background removal is enabled
                    const removeBg = removeBgCheckbox ? removeBgCheckbox.checked : true;
                    
                    if (removeBg && typeof backgroundRemover !== 'undefined') {
                        try {
                            // Show processing message
                            if (pathText) {
                                pathText.textContent = 'Processing: Removing background...';
                            }
                            
                            // Remove background automatically
                            const processedDataUrl = await backgroundRemover.autoRemoveBackground(originalDataUrl);
                            
                            // Update preview and input
                            if (previewImg) {
                                previewImg.src = processedDataUrl;
                                previewImg.style.opacity = '1';
                                previewImg.alt = 'Current Hero Image';
                            }
                            if (urlInput) {
                                urlInput.value = processedDataUrl;
                            }
                            if (pathText) {
                                pathText.textContent = `Current: ${file.name} (Background removed)`;
                            }
                        } catch (error) {
                            console.error('Background removal failed:', error);
                            // Fallback to original image
                            if (previewImg) {
                                previewImg.src = originalDataUrl;
                                previewImg.style.opacity = '1';
                            }
                            if (urlInput) {
                                urlInput.value = originalDataUrl;
                            }
                            if (pathText) {
                                pathText.textContent = `Current: ${file.name} (Background removal failed)`;
                            }
                            alert('Background removal failed. Using original image.');
                        }
                    } else {
                        // No background removal, use original
                        if (previewImg) {
                            previewImg.src = originalDataUrl;
                            previewImg.style.opacity = '1';
                            previewImg.alt = 'Current Hero Image';
                        }
                        if (urlInput) {
                            urlInput.value = originalDataUrl;
                        }
                        if (pathText) {
                            pathText.textContent = `Current: ${file.name}`;
                        }
                    }
                };
                reader.onerror = function() {
                    alert('Error reading file. Please try again.');
                    if (previewImg) {
                        previewImg.style.opacity = '1';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

async function saveHeroImage() {
    // Check permission
    if (!auth.hasPermission('canManageSettings')) {
        alert('You do not have permission to manage settings.');
        return;
    }

    const urlInput = document.getElementById('heroImageUrl');
    const fileInput = document.getElementById('heroImageFile');
    const removeBgCheckbox = document.getElementById('removeBackground');
    const previewImg = document.getElementById('currentHeroPreview');

    if (!urlInput || !removeBgCheckbox) {
        alert('Required elements not found');
        return;
    }

    let imagePath = urlInput.value.trim();
    const removeBackground = removeBgCheckbox.checked;

    // Check if file was uploaded
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Create a local file path or use data URL
        const reader = new FileReader();
        reader.onload = async function(e) {
            let dataUrl = e.target.result;
            
            // Process background removal if enabled
            if (removeBackground && typeof backgroundRemover !== 'undefined') {
                try {
                    const pathText = document.getElementById('currentHeroPath');
                    if (pathText) {
                        pathText.textContent = 'Processing: Removing background...';
                    }
                    
                    dataUrl = await backgroundRemover.autoRemoveBackground(dataUrl);
                    
                    if (pathText) {
                        pathText.textContent = `Current: ${file.name} (Background removed)`;
                    }
                } catch (error) {
                    console.error('Background removal failed during save:', error);
                    // Continue with original image
                }
            }
            
            // Save as data URL
            adminManager.saveHeroImage(dataUrl, removeBackground);
            
            // Update preview
            if (previewImg) {
                previewImg.src = dataUrl;
            }
            
            // Update path text
            const pathText = document.getElementById('currentHeroPath');
            if (pathText && !pathText.textContent.includes('Processing')) {
                pathText.textContent = `Current: ${file.name}${removeBackground ? ' (Background removed)' : ''}`;
            }
            
            // Update URL input
            urlInput.value = dataUrl;
            
            alert('Hero image saved successfully! The main page will be updated.');
        };
        reader.onerror = function() {
            alert('Error reading file. Please try again.');
        };
        reader.readAsDataURL(file);
        return;
    }

    // If no file, use URL input
    if (!imagePath) {
        alert('Please choose an image file or enter an image URL');
        return;
    }

    // If URL input and background removal is enabled, process it
    let finalImagePath = imagePath;
    if (removeBackground && typeof backgroundRemover !== 'undefined' && !imagePath.startsWith('data:')) {
        try {
            const pathText = document.getElementById('currentHeroPath');
            if (pathText) {
                pathText.textContent = 'Processing: Removing background...';
            }

            finalImagePath = await backgroundRemover.autoRemoveBackground(imagePath);

            // Update URL input with processed image
            urlInput.value = finalImagePath;
        } catch (error) {
            console.error('Background removal failed:', error);
            // Continue with original URL
        }
    }

    // Don't add cache-busting when saving - only add it when rendering/displaying
    // Save settings
    adminManager.saveHeroImage(finalImagePath, removeBackground);

    // Update preview
    if (previewImg) {
        previewImg.src = finalImagePath;
        previewImg.onerror = function() {
            alert('Image failed to load. Please check the URL or file.');
        };
    }

    // Update path text
    const pathText = document.getElementById('currentHeroPath');
    if (pathText && !pathText.textContent.includes('Processing')) {
        pathText.textContent = `Current: ${imagePath}`;
    }

    alert('Hero image saved successfully! The main page will be updated.');
}

/**
 * Toggle phone display on/off
 */
function togglePhoneDisplay(id, display) {
    if (!auth.hasPermission('canManagePhones')) {
        alert('You do not have permission to manage phones.');
        return;
    }
    
    try {
        adminManager.togglePhoneDisplay(id, display);
        renderPhones();
        
        // Show success message
        const message = display ? 'Phone is now displayed on the buy page.' : 'Phone is now hidden from the buy page.';
        alert(message);
    } catch (error) {
        console.error('Error toggling phone display:', error);
        alert('Error updating phone display status.');
    }
}

/**
 * Appointments Section
 */
function initializeAppointmentsSection() {
    const typeFilter = document.getElementById('appointmentTypeFilter');
    const statusFilter = document.getElementById('appointmentStatusFilter');
    const dateFilter = document.getElementById('appointmentDateFilter');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', () => {
            renderAppointments();
            updateAppointmentStats();
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            renderAppointments();
            updateAppointmentStats();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', () => {
            renderAppointments();
        });
    }
    
    renderAppointments();
    updateAppointmentStats();
}

/**
 * Load appointments from localStorage
 */
function loadAppointments() {
    try {
        const stored = localStorage.getItem('ktmobile_appointments');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error loading appointments:', e);
        return [];
    }
}

/**
 * Save appointments to localStorage
 */
function saveAppointments(appointments) {
    try {
        localStorage.setItem('ktmobile_appointments', JSON.stringify(appointments));
    } catch (e) {
        console.error('Error saving appointments:', e);
    }
}

/**
 * Render appointments table
 */
function renderAppointments() {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;
    
    let appointments = loadAppointments();
    
    // Apply filters
    const typeFilter = document.getElementById('appointmentTypeFilter')?.value || '';
    const statusFilter = document.getElementById('appointmentStatusFilter')?.value || '';
    const dateFilter = document.getElementById('appointmentDateFilter')?.value || '';
    
    if (typeFilter) {
        appointments = appointments.filter(a => a.bookingType === typeFilter);
    }
    
    if (statusFilter) {
        appointments = appointments.filter(a => a.status === statusFilter);
    }
    
    if (dateFilter) {
        appointments = appointments.filter(a => a.date === dateFilter);
    }
    
    // Sort by date/time (newest first)
    appointments.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    
    if (appointments.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 3rem; color: var(--text-light);">
                    ${typeFilter || statusFilter || dateFilter ? 
                        'No appointments found matching your filters.' : 
                        'No appointments scheduled yet.'}
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = appointments.map(appointment => {
        const statusColors = {
            'pending': '#F59E0B',
            'confirmed': '#3B82F6',
            'completed': '#10B981',
            'cancelled': '#EF4444'
        };
        
        const typeLabels = {
            'pickup': 'Doorstep Pickup',
            'store': 'Store Visit'
        };
        
        const typeIcons = {
            'pickup': '🚚',
            'store': '🏪'
        };
        
        const dateTime = new Date(appointment.datetime);
        const formattedDate = dateTime.toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        const formattedTime = dateTime.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const location = appointment.bookingType === 'pickup' 
            ? (appointment.address?.fullAddress || 'N/A')
            : 'Henderson Industrial Park';
        
        return `
            <tr>
                <td><strong style="color: var(--gold);">${appointment.id}</strong></td>
                <td>
                    <div style="font-weight: 600;">${appointment.customer.fullName}</div>
                    <div style="font-size: 0.875rem; color: var(--text-light);">${appointment.customer.email}</div>
                </td>
                <td>
                    <div style="font-weight: 600;">${appointment.device.model}</div>
                    <div style="font-size: 0.875rem; color: var(--text-light);">
                        ${appointment.device.storage} • ${appointment.device.color}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--gold); margin-top: 0.25rem;">
                        ${appointment.device.deviceType === 'new-sealed' ? '🆕 New (Sealed)' :
                          appointment.device.deviceType === 'new-activated' ? '🆕 New (Activated)' :
                          appointment.device.deviceType === 'used' ? '📱 Used' : ''}
                    </div>
                </td>
                <td>
                    <strong style="color: var(--gold); font-size: 1.125rem;">
                        S$${appointment.quote.amount.toLocaleString()}
                    </strong>
                </td>
                <td>
                    <span style="font-size: 1.25rem;">${typeIcons[appointment.bookingType]}</span>
                    <div style="font-size: 0.875rem; margin-top: 0.25rem;">
                        ${typeLabels[appointment.bookingType]}
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600;">${formattedDate}</div>
                    <div style="font-size: 0.875rem; color: var(--text-light);">${formattedTime}</div>
                </td>
                <td>
                    <div style="max-width: 200px; font-size: 0.875rem;">
                        ${location}
                    </div>
                </td>
                <td>
                    <div style="font-size: 0.875rem;">
                        <div>📱 ${appointment.customer.mobile}</div>
                    </div>
                </td>
                <td>
                    <select class="form-control appointment-status-select" 
                            data-appointment-id="${appointment.id}"
                            style="width: 120px; padding: 0.5rem; border: 2px solid ${statusColors[appointment.status]}; background: ${statusColors[appointment.status]}20; color: ${statusColors[appointment.status]}; font-weight: 600;">
                        <option value="pending" ${appointment.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${appointment.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="completed" ${appointment.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${appointment.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="viewAppointmentDetails('${appointment.id}')" title="View Details">
                        👁️ View
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Add event listeners to status selects
    document.querySelectorAll('.appointment-status-select').forEach(select => {
        select.addEventListener('change', function() {
            updateAppointmentStatus(this.dataset.appointmentId, this.value);
        });
    });
}

/**
 * Update appointment status
 */
function updateAppointmentStatus(appointmentId, newStatus) {
    const appointments = loadAppointments();
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!appointment) {
        alert('Appointment not found');
        return;
    }
    
    appointment.status = newStatus;
    appointment.updatedAt = new Date().toISOString();
    
    saveAppointments(appointments);
    renderAppointments();
    updateAppointmentStats();
    
    alert(`Appointment ${appointmentId} status updated to ${newStatus}`);
}

/**
 * Update appointment statistics
 */
function updateAppointmentStats() {
    const appointments = loadAppointments();
    
    const total = appointments.length;
    const pickup = appointments.filter(a => a.bookingType === 'pickup').length;
    const store = appointments.filter(a => a.bookingType === 'store').length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    
    const totalEl = document.getElementById('totalAppointments');
    const pickupEl = document.getElementById('pickupAppointments');
    const storeEl = document.getElementById('storeAppointments');
    const pendingEl = document.getElementById('pendingAppointments');
    
    if (totalEl) totalEl.textContent = total;
    if (pickupEl) pickupEl.textContent = pickup;
    if (storeEl) storeEl.textContent = store;
    if (pendingEl) pendingEl.textContent = pending;
}

/**
 * View appointment details
 */
function viewAppointmentDetails(appointmentId) {
    const appointments = loadAppointments();
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!appointment) {
        alert('Appointment not found');
        return;
    }
    
    // Format date and time
    const bookingDate = appointment.date ? new Date(appointment.date) : (appointment.datetime ? new Date(appointment.datetime) : new Date(appointment.createdAt));
    const formattedDate = bookingDate.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const formattedTime = appointment.time || (appointment.datetime ? new Date(appointment.datetime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'Not specified');
    const createdDate = new Date(appointment.createdAt);
    const formattedCreated = createdDate.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Populate modal fields
    document.getElementById('modalRef').textContent = appointment.ref || appointment.id;
    
    // Status badge
    const statusEl = document.getElementById('modalStatus');
    const status = appointment.status || 'pending';
    statusEl.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    statusEl.className = 'detail-value status-badge status-' + status;
    
    document.getElementById('modalCreated').textContent = formattedCreated;
    
    // Customer information
    const customer = appointment.customer || {};
    document.getElementById('modalCustomerName').textContent = customer.fullName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'N/A';
    document.getElementById('modalCustomerMobile').textContent = customer.mobile || 'N/A';
    document.getElementById('modalCustomerEmail').textContent = customer.email || 'N/A';
    
    // Appointment details
    const bookingType = appointment.bookingType === 'pickup' ? 'Doorstep Pickup' : 'Store Visit';
    document.getElementById('modalBookingType').textContent = bookingType;
    document.getElementById('modalBookingDate').textContent = formattedDate;
    document.getElementById('modalBookingTime').textContent = formattedTime;
    
    let locationText = '';
    if (appointment.bookingType === 'pickup') {
        if (appointment.address) {
            if (typeof appointment.address === 'string') {
                locationText = appointment.address;
            } else {
                locationText = appointment.address.fullAddress || `${appointment.address.street || ''}${appointment.address.unit ? ', ' + appointment.address.unit : ''}, Singapore ${appointment.address.postal || ''}`.trim();
            }
        }
        if (!locationText) locationText = 'N/A';
    } else {
        locationText = 'Henderson Industrial Park, Singapore';
    }
    document.getElementById('modalLocation').textContent = locationText;
    
    // Device information
    const device = appointment.device || {};
    document.getElementById('modalDeviceBrand').textContent = device.brand || 'N/A';
    document.getElementById('modalDeviceModel').textContent = device.model || 'N/A';

    // Display device type with proper formatting
    let deviceTypeDisplay = 'N/A';
    if (device.deviceType) {
        if (device.deviceType === 'new-sealed') {
            deviceTypeDisplay = 'New (Factory Sealed)';
        } else if (device.deviceType === 'new-activated') {
            deviceTypeDisplay = 'New (Activated)';
        } else if (device.deviceType === 'used') {
            deviceTypeDisplay = 'Used';
        } else {
            deviceTypeDisplay = device.deviceType;
        }
    }
    document.getElementById('modalDeviceType').textContent = deviceTypeDisplay;

    document.getElementById('modalDeviceStorage').textContent = device.storage || 'N/A';
    document.getElementById('modalDeviceColor').textContent = device.color || 'N/A';
    
    const condition = device.condition || {};
    document.getElementById('modalBodyCondition').textContent = condition.body ? `Grade ${condition.body}` : 'N/A';
    document.getElementById('modalScreenCondition').textContent = condition.screen ? `Grade ${condition.screen}` : 'N/A';
    document.getElementById('modalBatteryHealth').textContent = condition.battery ? `${condition.battery}%` : 'N/A';
    
    // Quote information
    const quote = appointment.quote || {};
    const quoteAmount = quote.amount || 0;
    document.getElementById('modalQuoteAmount').textContent = `SGD $${quoteAmount.toLocaleString()}`;
    
    // Price breakdown
    const breakdown = quote.breakdown || [];
    let breakdownHtml = 'N/A';
    if (breakdown.length > 0) {
        breakdownHtml = '<ul style="margin: 0.5rem 0; padding-left: 1.5rem; list-style: none;">';
        breakdown.forEach(item => {
            const label = typeof item === 'string' ? item : (item.label || item.description || '');
            const value = typeof item === 'object' && item.value ? `: ${item.value}` : '';
            const amount = typeof item === 'object' && item.amount ? ` (${item.amount > 0 ? '+' : ''}SGD $${Math.abs(item.amount).toLocaleString()})` : '';
            breakdownHtml += `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">${label}${value}${amount}</li>`;
        });
        breakdownHtml += '</ul>';
    }
    document.getElementById('modalPriceBreakdown').innerHTML = breakdownHtml;
    
    // Remarks
    if (appointment.remarks) {
        document.getElementById('remarksSection').style.display = 'block';
        document.getElementById('modalRemarks').textContent = appointment.remarks;
    } else {
        document.getElementById('remarksSection').style.display = 'none';
    }
    
    // Show modal
    openAppointmentDetailsModal();
}

function openAppointmentDetailsModal() {
    const modal = document.getElementById('appointmentDetailsModal');
    if (modal) {
        modal.classList.add('active');
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAppointmentDetailsModal();
            }
        });
    }
}

function closeAppointmentDetailsModal() {
    const modal = document.getElementById('appointmentDetailsModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Clear appointment filters
 */
function clearAppointmentFilters() {
    const typeFilter = document.getElementById('appointmentTypeFilter');
    const statusFilter = document.getElementById('appointmentStatusFilter');
    const dateFilter = document.getElementById('appointmentDateFilter');
    
    if (typeFilter) typeFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    
    renderAppointments();
    updateAppointmentStats();
}

/**
 * Render Colors & Storage Options Management
 */
function renderColorsStorage() {
    console.log('=== renderColorsStorage called ===');
    
    const contentDiv = document.getElementById('colorsStorageContent');
    if (!contentDiv) {
        console.error('colorsStorageContent div not found!');
        return;
    }
    
    const brandFilter = document.getElementById('colorsBrandFilter')?.value || '';
    const modelFilter = document.getElementById('colorsModelFilter')?.value || '';
    
    // Get phones - filter to Apple and Samsung only
    let phones = adminManager.phones || [];
    phones = phones.filter(p => p.brand === 'Apple' || p.brand === 'Samsung');
    
    // Filter by brand
    if (brandFilter) {
        phones = phones.filter(p => p.brand === brandFilter);
    }
    
    // Filter by model
    if (modelFilter) {
        phones = phones.filter(p => p.model === modelFilter);
    }
    
    if (phones.length === 0) {
        contentDiv.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 3rem;">
                <p style="color: var(--text-light); font-size: 1rem;">No phones found. ${brandFilter || modelFilter ? 'Try adjusting filters.' : 'Add phones first in Phone Models section.'}</p>
            </div>
        `;
        return;
    }
    
    // Build HTML for each phone
    let html = '<div style="display: flex; flex-direction: column; gap: 2rem;">';
    
    phones.forEach(phone => {
        const storages = phone.storages || [];
        const colors = phone.colors || [];
        const storagePrices = phone.storagePrices || {};
        
        html += `
            <div class="phone-colors-storage-card" style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                    <div>
                        <h3 style="color: var(--text-dark); font-size: 1.25rem; margin-bottom: 0.5rem;">${phone.brand} ${phone.model}</h3>
                        <p style="color: var(--text-light); font-size: 0.875rem;">Base Price: SGD $${(phone.basePrice || 0).toLocaleString()}</p>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="openPhoneModal('${phone.id}')">Edit Phone</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <!-- Storage Options -->
                    <div>
                        <h4 style="color: var(--text-dark); font-size: 1rem; margin-bottom: 1rem; font-weight: 600;">Storage Options</h4>
                        ${storages.length > 0 ? `
                            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                ${storages.map(storage => {
                                    const price = storagePrices[storage] || phone.basePrice || 0;
                                    const adjustment = price - (phone.basePrice || 0);
                                    return `
                                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray); border-radius: 8px;">
                                            <span style="font-weight: 500; color: var(--text-dark);">${storage}</span>
                                            <div style="text-align: right;">
                                                <span style="color: var(--text-dark); font-weight: 600;">SGD $${price.toLocaleString()}</span>
                                                ${adjustment !== 0 ? `<span style="color: ${adjustment > 0 ? 'var(--success)' : 'var(--danger)'}; font-size: 0.875rem; margin-left: 0.5rem;">${adjustment > 0 ? '+' : ''}$${adjustment}</span>` : ''}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        ` : `
                            <p style="color: var(--text-light); font-size: 0.875rem;">No storage options configured. Edit phone to add storage options.</p>
                        `}
                    </div>
                    
                    <!-- Color Options -->
                    <div>
                        <h4 style="color: var(--text-dark); font-size: 1rem; margin-bottom: 1rem; font-weight: 600;">Color Options</h4>
                        ${colors.length > 0 ? `
                            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                                ${colors.map(color => {
                                    // Try to find color hex from phoneDatabase
                                    let colorHex = '#C9A84C'; // default gold
                                    if (typeof phoneDatabase !== 'undefined' && phoneDatabase[phone.brand] && phoneDatabase[phone.brand][phone.model]) {
                                        const dbColors = phoneDatabase[phone.brand][phone.model].colors || [];
                                        const dbColor = dbColors.find(c => c.name === color || c.name.toLowerCase() === color.toLowerCase());
                                        if (dbColor) colorHex = dbColor.hex;
                                    }
                                    
                                    return `
                                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--gray); border-radius: 8px;">
                                            <div style="width: 20px; height: 20px; border-radius: 50%; background: ${colorHex}; border: 2px solid var(--border);"></div>
                                            <span style="font-weight: 500; color: var(--text-dark); font-size: 0.875rem;">${color}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        ` : `
                            <p style="color: var(--text-light); font-size: 0.875rem;">No color options configured. Edit phone to add color options.</p>
                        `}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contentDiv.innerHTML = html;
    
    // Update model filter when brand changes
    updateColorsModelFilter();
}

/**
 * Update model filter dropdown for colors/storage section
 */
function updateColorsModelFilter() {
    const brandFilter = document.getElementById('colorsBrandFilter');
    const modelFilter = document.getElementById('colorsModelFilter');
    
    if (!brandFilter || !modelFilter) return;
    
    const selectedBrand = brandFilter.value;
    let phones = adminManager.phones || [];
    phones = phones.filter(p => p.brand === 'Apple' || p.brand === 'Samsung');
    
    if (selectedBrand) {
        phones = phones.filter(p => p.brand === selectedBrand);
    }
    
    const uniqueModels = [...new Set(phones.map(p => p.model))].sort();
    
    modelFilter.innerHTML = '<option value="">All Models</option>';
    uniqueModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
    });
}

// Export for global access
window.adminManager = adminManager;
window.saveHeroImage = saveHeroImage;
window.openPhoneModal = openPhoneModal;
window.closePhoneModal = closePhoneModal;
window.editPhone = editPhone;
window.deletePhone = deletePhone;
window.updatePrice = updatePrice;
window.savePrice = savePrice;
window.selectBrandImage = selectBrandImage;
window.saveBrandImage = saveBrandImage;
window.handleBrandFileUpload = handleBrandFileUpload;
window.saveBuyPrice = saveBuyPrice;
window.filterBuyPrices = filterBuyPrices;
window.clearBuyPriceFilters = clearBuyPriceFilters;
window.togglePhoneDisplay = togglePhoneDisplay;
window.updateAppointmentStatus = updateAppointmentStatus;
window.clearAppointmentFilters = clearAppointmentFilters;
window.viewAppointmentDetails = viewAppointmentDetails;
window.openAppointmentDetailsModal = openAppointmentDetailsModal;
window.closeAppointmentDetailsModal = closeAppointmentDetailsModal;
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.editAdmin = editAdmin;
window.deleteAdmin = deleteAdmin;
window.renderUsers = renderUsers;
window.updateModelDropdown = updateModelDropdown;
window.renderPhones = renderPhones;
window.saveConditionModifier = saveConditionModifier;
window.saveAllConditionModifiersAndSync = saveAllConditionModifiersAndSync;
window.saveAllBuybackPrices = saveAllBuybackPrices;
window.updateModifierInputStyle = updateModifierInputStyle;
window.togglePhoneDisplay = togglePhoneDisplay;
// ============================================================================
// REFURBISHMENT MANAGEMENT FUNCTIONS
// ============================================================================

function renderRefurbishPhones() {
    console.log('=== renderRefurbishPhones called ===');
    const grid = document.getElementById('refurbishPhonesGrid');
    if (!grid) {
        console.error('refurbishPhonesGrid element not found!');
        return;
    }
    
    const phones = adminManager.phones || [];
    console.log('Refurbish phones - Total phones in adminManager:', phones.length);
    
    const refurbishPhones = phones.filter(p => p.display !== false);
    console.log('Refurbish phones - Filtered phones (display enabled):', refurbishPhones.length);
    
    if (refurbishPhones.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;"><p style="color: var(--text-light); font-size: 1.1rem;">No refurbished phones available. Add phones and enable display in phone settings.</p></div>';
        console.log('Showing empty state');
        return;
    }
    
    const html = refurbishPhones.map(phone => {
        let totalStock = 0;
        if (phone.quantities) {
            Object.values(phone.quantities).forEach(storageQty => {
                if (typeof storageQty === 'object') {
                    Object.values(storageQty).forEach(qty => {
                        totalStock += (parseInt(qty) || 0);
                    });
                } else {
                    totalStock += (parseInt(storageQty) || 0);
                }
            });
        }
        const isAvailable = totalStock > 0;
        return `
            <div class="phone-card-admin" data-phone-id="${phone.id}">
                <div class="phone-card-header">
                    <span class="brand-badge">${phone.brand}</span>
                    <div class="phone-card-actions">
                        <button class="btn-icon btn-edit" onclick="editRefurbishPhone('${phone.id}')" title="Edit">✏️</button>
                    </div>
                </div>
                <img src="${phone.image}" alt="${phone.model}" class="phone-card-image" onerror="this.src='images/phones/iphone-16-pro-max.jpg'">
                <div class="phone-card-info">
                    <h4>${phone.model}</h4>
                    <p><strong>Stock:</strong> ${totalStock} units</p>
                    <p class="${isAvailable ? 'text-success' : 'text-muted'}">${isAvailable ? '✓ In Stock' : '✗ Out of Stock'}</p>
                </div>
            </div>
        `;
    }).join('');
    
    grid.innerHTML = html;
    console.log('Rendered', refurbishPhones.length, 'refurbish phone cards');
}

function renderDisplaySettings() {
    console.log('=== renderDisplaySettings called ===');
    const grid = document.getElementById('displaySettingsGrid');
    if (!grid) {
        console.error('displaySettingsGrid element not found!');
        return;
    }
    const phones = adminManager.phones || [];
    if (phones.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No phones found. Add phones first.</p></div>';
        return;
    }
    grid.innerHTML = phones.map(phone => {
        const isDisplayed = phone.display !== false;
        return `<div class="display-setting-card"><div class="display-setting-info"><h4>${phone.brand} ${phone.model}</h4><p class="display-status ${isDisplayed ? 'visible' : 'hidden'}">${isDisplayed ? '✓ Visible on Buy Refurbished page' : '✗ Hidden from Buy Refurbished page'}</p></div><div class="display-setting-toggle"><label class="toggle-switch"><input type="checkbox" ${isDisplayed ? 'checked' : ''} onchange="toggleRefurbishDisplay('${phone.id}', this.checked)"><span class="toggle-slider"></span></label></div></div>`;
    }).join('');
}

function renderDisplaySettingsFallback() {
    renderDisplaySettings();
}

function toggleRefurbishDisplay(phoneId, display) {
    const phone = adminManager.phones.find(p => p.id === phoneId);
    if (phone) {
        phone.display = display;
        phone.updatedAt = new Date().toISOString();
        adminManager.savePhones();
        renderDisplaySettings();
        console.log(`Display ${display ? 'enabled' : 'disabled'} for ${phone.brand} ${phone.model}`);
    }
}

function editRefurbishPhone(phoneId) {
    const phone = adminManager.phones.find(p => p.id === phoneId);
    if (phone) {
        openPhoneModal(phone);
    }
}

window.renderRefurbishPhones = renderRefurbishPhones;
window.renderDisplaySettings = renderDisplaySettings;
window.renderDisplaySettingsFallback = renderDisplaySettingsFallback;
window.toggleRefurbishDisplay = toggleRefurbishDisplay;
window.editRefurbishPhone = editRefurbishPhone;
window.renderBuyPricesTable = renderBuyPricesTable;
window.renderPriceTable = renderPriceTable;
window.renderBrands = renderBrands;
window.renderAppointments = renderAppointments;
window.updateAppointmentStats = updateAppointmentStats;
window.initializeBuyPricesSection = initializeBuyPricesSection;
window.populateBuyPriceFilters = populateBuyPriceFilters;
window.updateBuyPriceModelFilter = updateBuyPriceModelFilter;
window.clearRefurbishPriceFilters = clearBuyPriceFilters;
window.renderColorsStorage = renderColorsStorage;
window.updateColorsModelFilter = updateColorsModelFilter;
window.renderPriceTable = renderPriceTable;

// ============================================================================
// BULK PRICE UPDATE FUNCTIONS
// ============================================================================

function openBulkPriceModal() {
    const modal = document.getElementById('bulkPriceModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('bulkPriceAmount').value = 0;
        document.getElementById('bulkPriceBrand').value = '';
        updateBulkPricePreview();
    }
}

function closeBulkPriceModal() {
    const modal = document.getElementById('bulkPriceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setBulkPriceValue(amount) {
    const input = document.getElementById('bulkPriceAmount');
    if (input) {
        input.value = amount;
        updateBulkPricePreview();
    }
}

function updateBulkPricePreview() {
    const brand = document.getElementById('bulkPriceBrand')?.value || '';
    const amount = parseInt(document.getElementById('bulkPriceAmount')?.value) || 0;
    const preview = document.getElementById('bulkPricePreview');
    
    if (!preview) return;
    
    let phones = adminManager.phones || [];
    if (brand) {
        phones = phones.filter(p => p.brand === brand);
    }
    
    // Filter to only Apple and Samsung
    phones = phones.filter(p => p.brand === 'Apple' || p.brand === 'Samsung');
    
    const action = amount >= 0 ? 'increase' : 'decrease';
    const absAmount = Math.abs(amount);
    
    preview.innerHTML = `
        <strong>${phones.length}</strong> phones will be affected<br>
        All prices will ${action} by <strong>SGD $${absAmount}</strong>
        ${brand ? ` (${brand} only)` : ' (All brands)'}
    `;
}

function applyBulkPriceUpdate() {
    const brand = document.getElementById('bulkPriceBrand')?.value || '';
    const amount = parseInt(document.getElementById('bulkPriceAmount')?.value) || 0;

    if (amount === 0) {
        alert('Please enter a price adjustment amount.');
        return;
    }

    let phones = adminManager.phones || [];
    let affectedCount = 0;

    phones.forEach(phone => {
        // Only update Apple and Samsung
        if (phone.brand !== 'Apple' && phone.brand !== 'Samsung') return;

        // Filter by brand if selected
        if (brand && phone.brand !== brand) return;

        // Update prices based on currentPriceType (used vs new)
        if (currentPriceType === 'new') {
            // Update new phone prices
            if (!phone.newPhonePrices) {
                phone.newPhonePrices = {};
            }

            // Get all available storages
            const storages = phone.storages && phone.storages.length > 0
                ? phone.storages
                : (phone.storagePrices ? Object.keys(phone.storagePrices) : ['128GB', '256GB']);

            storages.forEach(storage => {
                const currentPrice = phone.newPhonePrices[storage] || 0;
                phone.newPhonePrices[storage] = Math.max(0, currentPrice + amount);
            });
        } else {
            // Update used phone prices
            phone.basePrice = Math.max(0, (phone.basePrice || 0) + amount);

            if (phone.storagePrices) {
                Object.keys(phone.storagePrices).forEach(storage => {
                    phone.storagePrices[storage] = Math.max(0, (phone.storagePrices[storage] || 0) + amount);
                });
            }
        }

        phone.updatedAt = new Date().toISOString();
        affectedCount++;
    });

    // Save changes
    adminManager.savePhones();

    // Refresh the price table
    renderPriceTable();

    // Close modal
    closeBulkPriceModal();

    // Show success message
    const priceTypeLabel = currentPriceType === 'new' ? 'new' : 'used';
    const action = amount >= 0 ? 'increased' : 'decreased';
    alert(`Success! ${affectedCount} ${priceTypeLabel} phone prices ${action} by SGD $${Math.abs(amount)}`);
}

// Add event listener for bulk price button
document.addEventListener('DOMContentLoaded', function() {
    const bulkBtn = document.getElementById('bulkUpdateBuybackPricesBtn');
    if (bulkBtn) {
        bulkBtn.addEventListener('click', openBulkPriceModal);
    }
    
    // Add change listeners for preview update
    const brandSelect = document.getElementById('bulkPriceBrand');
    const amountInput = document.getElementById('bulkPriceAmount');
    
    if (brandSelect) {
        brandSelect.addEventListener('change', updateBulkPricePreview);
    }
    if (amountInput) {
        amountInput.addEventListener('input', updateBulkPricePreview);
    }
});

window.openBulkPriceModal = openBulkPriceModal;
window.closeBulkPriceModal = closeBulkPriceModal;
window.setBulkPriceValue = setBulkPriceValue;
window.updateBulkPricePreview = updateBulkPricePreview;
window.applyBulkPriceUpdate = applyBulkPriceUpdate;

// ============================================================================
// GENERAL SETTINGS FUNCTIONS
// ============================================================================

function loadGeneralSettings() {
    const settings = JSON.parse(localStorage.getItem('ibox_general_settings') || '{}');
    
    // Populate form fields
    if (document.getElementById('settingCompanyName')) {
        document.getElementById('settingCompanyName').value = settings.companyName || 'IBOX MOBILE SINGAPORE';
    }
    if (document.getElementById('settingCompanyAddress')) {
        document.getElementById('settingCompanyAddress').value = settings.companyAddress || '203 Henderson Rd, #09-09 Wing B, Henderson Industrial Park, Singapore 159239';
    }
    if (document.getElementById('settingContactPhone')) {
        document.getElementById('settingContactPhone').value = settings.contactPhone || '+65 9699 9744';
    }
    if (document.getElementById('settingContactEmail')) {
        document.getElementById('settingContactEmail').value = settings.contactEmail || 'sales@iboxmobile.sg';
    }
    if (document.getElementById('settingWhatsApp')) {
        document.getElementById('settingWhatsApp').value = settings.whatsApp || '+65 8919 0776';
    }
}

function saveGeneralSettings() {
    const settings = {
        companyName: document.getElementById('settingCompanyName')?.value || '',
        companyAddress: document.getElementById('settingCompanyAddress')?.value || '',
        contactPhone: document.getElementById('settingContactPhone')?.value || '',
        contactEmail: document.getElementById('settingContactEmail')?.value || '',
        whatsApp: document.getElementById('settingWhatsApp')?.value || '',
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('ibox_general_settings', JSON.stringify(settings));
    alert('General settings saved successfully!');
    console.log('General settings saved:', settings);
}

// Load settings when settings section is shown
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadGeneralSettings, 500);
    // Load condition modifiers from localStorage into input fields
    setTimeout(loadConditionModifierInputs, 600);
});

window.loadGeneralSettings = loadGeneralSettings;
window.saveGeneralSettings = saveGeneralSettings;

// ============================================================================
// FIX BRAND/MODEL DROPDOWN
// ============================================================================

function updateModelFilter() {
    const brandFilter = document.getElementById('brandFilter');
    const modelFilter = document.getElementById('modelFilter');
    
    if (!brandFilter || !modelFilter) return;
    
    const selectedBrand = brandFilter.value;
    
    // Clear model options
    modelFilter.innerHTML = '<option value="">All Models</option>';
    
    if (!selectedBrand) {
        return;
    }
    
    // Get models for selected brand
    const phones = adminManager.phones || [];
    const models = [...new Set(phones.filter(p => p.brand === selectedBrand).map(p => p.model))];
    
    models.sort().forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
    });
}

// Add event listeners for brand/model dropdowns
document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brandFilter');
    const modelFilter = document.getElementById('modelFilter');
    const searchInput = document.getElementById('searchPhones');
    const clearBtn = document.getElementById('clearFiltersBtn');
    
    if (brandFilter) {
        brandFilter.addEventListener('change', function() {
            updateModelFilter();
            renderPhones();
        });
    }
    
    if (modelFilter) {
        modelFilter.addEventListener('change', renderPhones);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', renderPhones);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (brandFilter) brandFilter.value = '';
            if (modelFilter) {
                modelFilter.innerHTML = '<option value="">All Models</option>';
                modelFilter.value = '';
            }
            if (searchInput) searchInput.value = '';
            renderPhones();
        });
    }
});

window.updateModelFilter = updateModelFilter;

// ============================================
// DATA EXPORT/IMPORT SYSTEM
// Ensures admin changes persist across git updates
// ============================================

/**
 * Export all admin data to CSV files (CSP-compliant, no eval)
 * Creates a ZIP-like download with multiple CSV files
 */
function exportAllData() {
    try {
        console.log('📊 Starting CSV export (CSP-compliant)...');

        // Get all data from localStorage
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');

        // Helper function to convert array to CSV
        function arrayToCSV(data) {
            return data.map(row =>
                row.map(cell => {
                    // Escape quotes and wrap in quotes if contains comma, quote, or newline
                    const cellStr = String(cell ?? '');
                    if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                        return '"' + cellStr.replace(/"/g, '""') + '"';
                    }
                    return cellStr;
                }).join(',')
            ).join('\n');
        }

        // Helper function to download CSV
        function downloadCSV(content, filename) {
            const BOM = '\uFEFF'; // UTF-8 BOM for Excel compatibility
            const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // ========================================
        // CSV 1: USED Prices
        // ========================================
        const usedData = [];
        usedData.push(['Brand', 'Model', 'Storage', 'Used Price (SGD)', 'Display', 'Available', 'Colors']);

        phones.forEach(phone => {
            if (phone.storages && phone.storagePrices) {
                phone.storages.forEach(storage => {
                    usedData.push([
                        phone.brand,
                        phone.model,
                        storage,
                        phone.storagePrices[storage] || 0,
                        phone.display ? 'YES' : 'NO',
                        phone.available ? 'YES' : 'NO',
                        (phone.colors || []).join('; ')
                    ]);
                });
            }
        });

        // ========================================
        // CSV 2: NEW Prices
        // ========================================
        const newData = [];
        newData.push(['Brand', 'Model', 'Storage', 'New Price (SGD)', 'Display', 'Available', 'Colors']);

        phones.forEach(phone => {
            if (phone.storages && phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0) {
                phone.storages.forEach(storage => {
                    if (phone.newPhonePrices[storage]) {
                        newData.push([
                            phone.brand,
                            phone.model,
                            storage,
                            phone.newPhonePrices[storage] || 0,
                            phone.display ? 'YES' : 'NO',
                            phone.available ? 'YES' : 'NO',
                            (phone.colors || []).join('; ')
                        ]);
                    }
                });
            }
        });

        // ========================================
        // CSV 3: Complete Database
        // ========================================
        const completeData = [];
        completeData.push(['Brand', 'Model', 'Storage', 'Used Price', 'New Price', 'Colors', 'Display', 'Available']);

        phones.forEach(phone => {
            if (phone.storages) {
                phone.storages.forEach(storage => {
                    completeData.push([
                        phone.brand,
                        phone.model,
                        storage,
                        phone.storagePrices ? (phone.storagePrices[storage] || 0) : 0,
                        phone.newPhonePrices ? (phone.newPhonePrices[storage] || 0) : 0,
                        (phone.colors || []).join('; '),
                        phone.display ? 'YES' : 'NO',
                        phone.available ? 'YES' : 'NO'
                    ]);
                });
            }
        });

        // Generate filenames with date
        const dateStr = new Date().toISOString().split('T')[0];

        // Download all CSVs
        downloadCSV(arrayToCSV(usedData), `IBOX-USED-Prices-${dateStr}.csv`);

        setTimeout(() => {
            downloadCSV(arrayToCSV(newData), `IBOX-NEW-Prices-${dateStr}.csv`);
        }, 500);

        setTimeout(() => {
            downloadCSV(arrayToCSV(completeData), `IBOX-Complete-Database-${dateStr}.csv`);
        }, 1000);

        console.log('✅ CSV export complete!');

        const usedCount = phones.filter(p => p.storagePrices && Object.keys(p.storagePrices).length > 0).length;
        const newCount = phones.filter(p => p.newPhonePrices && Object.keys(p.newPhonePrices).length > 0).length;

        alert(`✅ CSV Export Successful!\n\n📊 3 CSV Files Downloaded:\n` +
              `1️⃣ USED Prices (${usedCount} models)\n` +
              `2️⃣ NEW Prices (${newCount} models)\n` +
              `3️⃣ Complete Database (${phones.length} models)\n\n` +
              `💾 Files saved to Downloads folder\n` +
              `📁 Date: ${dateStr}\n\n` +
              `✅ CSP-Compliant (No security errors)\n` +
              `✅ Excel/Google Sheets compatible\n\n` +
              `💡 TIP: Open CSV files in Excel or Google Sheets!`);

        if (typeof showNotification === 'function') {
            showNotification('✓ All prices exported to CSV files!', 'success');
        }
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Error exporting data: ' + error.message + '\n\nPlease check the console for details.');
    }
}

/**
 * Import data from a JSON file
 * Loads previously exported admin data
 */
function importAllData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);

            if (!importData.version || !importData.data) {
                throw new Error('Invalid data file format');
            }

            // Import all data to localStorage
            if (importData.data.phones) {
                localStorage.setItem('ktmobile_phones', JSON.stringify(importData.data.phones));
            }
            if (importData.data.brands) {
                localStorage.setItem('ktmobile_brands', JSON.stringify(importData.data.brands));
            }
            if (importData.data.conditionModifiers) {
                localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(importData.data.conditionModifiers));
            }
            if (importData.data.heroImage) {
                localStorage.setItem('ktmobile_hero_image', JSON.stringify(importData.data.heroImage));
            }
            if (importData.data.appointments) {
                localStorage.setItem('ktmobile_appointments', JSON.stringify(importData.data.appointments));
            }
            if (importData.data.generalSettings) {
                localStorage.setItem('ibox_general_settings', JSON.stringify(importData.data.generalSettings));
            }

            showNotification('✓ All prices and settings restored successfully!', 'success');
            alert('✅ Data Restored Successfully!\n\n📊 Imported:\n• All phone models and prices\n• Used and new phone prices\n• Buyback base prices\n• Condition modifiers\n• All settings\n\n🔄 Reloading admin panel to apply changes...');
            setTimeout(() => location.reload(), 1500);
        } catch (error) {
            console.error('Import error:', error);
            alert('❌ Error importing data: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Make functions globally available
window.exportAllData = exportAllData;
window.importAllData = importAllData;

// ============================================
// USED/NEW PHONE TOGGLE FOR BUYBACK PRICES
// ============================================

let currentBuybackType = 'used'; // Default to used phones

/**
 * Switch between Used and New phone price views
 */
function switchBuybackConditionType(type) {
    currentBuybackType = type;

    // Update button styles with animation
    const usedBtn = document.getElementById('usedPhoneToggle');
    const newBtn = document.getElementById('newPhoneToggle');
    const phonesGrid = document.getElementById('buybackPhonesGrid');

    // Add transition for smooth animation
    usedBtn.style.transition = 'all 0.3s ease';
    newBtn.style.transition = 'all 0.3s ease';

    if (type === 'used') {
        // Active style for used button with scale animation
        usedBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        usedBtn.style.color = 'white';
        usedBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
        usedBtn.style.transform = 'scale(1.05)';
        usedBtn.classList.add('active');

        // Inactive style for new button
        newBtn.style.background = '#e9ecef';
        newBtn.style.color = '#666';
        newBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        newBtn.style.transform = 'scale(1)';
        newBtn.classList.remove('active');
    } else {
        // Active style for new button with scale animation
        newBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        newBtn.style.color = 'white';
        newBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
        newBtn.style.transform = 'scale(1.05)';
        newBtn.classList.add('active');

        // Inactive style for used button
        usedBtn.style.background = '#e9ecef';
        usedBtn.style.color = '#666';
        usedBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        usedBtn.style.transform = 'scale(1)';
        usedBtn.classList.remove('active');
    }

    // Animate the grid change
    if (phonesGrid) {
        phonesGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        phonesGrid.style.opacity = '0';
        phonesGrid.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Re-render the phones grid with the new type
            renderPhones();

            // Fade back in
            phonesGrid.style.opacity = '1';
            phonesGrid.style.transform = 'translateY(0)';
        }, 300);
    } else {
        renderPhones();
    }

    // Show notification of change
    showNotification(`Switched to ${type === 'used' ? 'Used' : 'New'} Phone Prices`, 'success');

    console.log(`Switched to ${type} phone prices view`);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)' : '#333'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make function globally available
window.switchBuybackConditionType = switchBuybackConditionType;
window.currentBuybackType = currentBuybackType;

// ============================================
// BUYBACK BASE PRICES TOGGLE & BULK UPDATE
// ============================================

let currentPriceType = 'used'; // Default to used phone prices

/**
 * Switch between Used and New price views in Buyback Base Prices
 */
function switchPriceConditionType(type) {
    currentPriceType = type;

    // Update button styles with animation
    const usedBtn = document.getElementById('usedPriceToggle');
    const newBtn = document.getElementById('newPriceToggle');
    const priceTable = document.getElementById('buybackPriceTableBody');

    // Add transition for smooth animation
    if (usedBtn && newBtn) {
        usedBtn.style.transition = 'all 0.3s ease';
        newBtn.style.transition = 'all 0.3s ease';

        if (type === 'used') {
            // Active style for used button
            usedBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
            usedBtn.style.color = 'white';
            usedBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
            usedBtn.style.transform = 'scale(1.05)';
            usedBtn.classList.add('active');

            // Inactive style for new button
            newBtn.style.background = '#e9ecef';
            newBtn.style.color = '#666';
            newBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            newBtn.style.transform = 'scale(1)';
            newBtn.classList.remove('active');
        } else {
            // Active style for new button
            newBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
            newBtn.style.color = 'white';
            newBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
            newBtn.style.transform = 'scale(1.05)';
            newBtn.classList.add('active');

            // Inactive style for used button
            usedBtn.style.background = '#e9ecef';
            usedBtn.style.color = '#666';
            usedBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            usedBtn.style.transform = 'scale(1)';
            usedBtn.classList.remove('active');
        }
    }

    // Animate table change
    if (priceTable) {
        priceTable.style.transition = 'opacity 0.3s ease';
        priceTable.style.opacity = '0';

        setTimeout(() => {
            renderPriceTable();
            priceTable.style.opacity = '1';
        }, 300);
    } else {
        renderPriceTable();
    }

    // Show notification
    showNotification(`Switched to ${type === 'used' ? 'Used' : 'New'} Phone Base Prices`, 'success');
}

/**
 * Open bulk update modal
 */
function openBulkUpdateModal() {
    const brand = document.getElementById('buybackPriceBrandFilter').value || 'All';
    const currentType = currentPriceType === 'used' ? 'Used' : 'New';

    const modalHTML = `
        <div class="modal-overlay" id="bulkUpdateModal" onclick="if(event.target === this) closeBulkUpdateModal()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: fadeIn 0.3s ease;">
            <div class="modal-content" style="max-width: 500px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); position: relative; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s ease;">
                <div class="modal-header">
                    <h3>Bulk Update ${currentType} Phone Prices</h3>
                    <button onclick="closeBulkUpdateModal()" class="btn btn-secondary btn-sm">✕</button>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 1.5rem; color: #666;">
                        Update all ${brand} ${currentType.toLowerCase()} phone prices by a fixed amount.
                    </p>

                    <div class="form-group">
                        <label>Brand Selection</label>
                        <select id="bulkUpdateBrand" class="form-control">
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Phone Condition</label>
                        <select id="bulkUpdateCondition" class="form-control">
                            <option value="used" ${currentPriceType === 'used' ? 'selected' : ''}>Used Phones</option>
                            <option value="new" ${currentPriceType === 'new' ? 'selected' : ''}>New Phones</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Price Change Amount (SGD)</label>
                        <input type="number" id="bulkPriceChange" class="form-control" placeholder="e.g., -20 to decrease by $20, or 50 to increase by $50" step="1">
                        <small style="color: #888; display: block; margin-top: 0.5rem;">
                            Enter a negative number to decrease prices, or positive to increase.
                        </small>
                    </div>

                    <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                        <strong>⚠️ Warning:</strong> This will update ALL base prices for the selected brand and condition.
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="closeBulkUpdateModal()" class="btn btn-secondary">Cancel</button>
                    <button onclick="performBulkUpdate()" class="btn btn-primary">Update Prices</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Close bulk update modal
 */
function closeBulkUpdateModal() {
    const modal = document.getElementById('bulkUpdateModal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Perform bulk price update
 */
function performBulkUpdate() {
    const brand = document.getElementById('bulkUpdateBrand').value;
    const condition = document.getElementById('bulkUpdateCondition').value;
    const priceChange = parseFloat(document.getElementById('bulkPriceChange').value);

    if (isNaN(priceChange)) {
        alert('Please enter a valid price change amount.');
        return;
    }

    if (!confirm(`Are you sure you want to ${priceChange > 0 ? 'increase' : 'decrease'} all ${brand} ${condition} phone prices by $${Math.abs(priceChange)}?`)) {
        return;
    }

    // Get all phones
    const phones = adminManager.phones || [];
    let updatedCount = 0;

    // Update prices for matching phones
    phones.forEach(phone => {
        if (phone.brand === brand) {
            // Update base price (this is for used phones typically)
            if (condition === 'used') {
                phone.basePrice = Math.max(0, phone.basePrice + priceChange);

                // Update storage prices if they exist
                if (phone.storagePrices) {
                    Object.keys(phone.storagePrices).forEach(storage => {
                        phone.storagePrices[storage] = Math.max(0, phone.storagePrices[storage] + priceChange);
                    });
                }

                // Update buy prices for all conditions
                if (phone.buyPrices) {
                    Object.keys(phone.buyPrices).forEach(storage => {
                        Object.keys(phone.buyPrices[storage]).forEach(cond => {
                            phone.buyPrices[storage][cond] = Math.max(0, phone.buyPrices[storage][cond] + priceChange);
                        });
                    });
                }
            } else {
                // For new phones - ONLY update if newPhonePrices already exists
                // CRITICAL: Never create newPhonePrices from storagePrices!
                if (phone.newPhonePrices && Object.keys(phone.newPhonePrices).length > 0) {
                    Object.keys(phone.newPhonePrices).forEach(storage => {
                        phone.newPhonePrices[storage] = Math.max(0, phone.newPhonePrices[storage] + priceChange);
                    });
                } else {
                    // Skip phones without NEW prices - they should be added via import
                    console.warn(`Skipping ${phone.brand} ${phone.model} - no NEW prices to update. Use import instead.`);
                    return; // Skip this phone
                }
            }

            phone.updatedAt = new Date().toISOString();
            updatedCount++;
        }
    });

    // Save to localStorage
    adminManager.savePhones();

    // Close modal and refresh
    closeBulkUpdateModal();
    renderPriceTable();

    // Show success notification
    showNotification(`✓ Updated ${updatedCount} ${brand} ${condition} phone models`, 'success');
    alert(`Successfully updated ${updatedCount} ${brand} ${condition} phone models by ${priceChange > 0 ? '+' : ''}$${priceChange}`);
}

// ============================================
// PRICE IMPORT MODAL FUNCTIONS
// ============================================

function showImportModal() {
    const modal = document.getElementById('importModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

function closeImportModal() {
    const modal = document.getElementById('importModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

async function runBulkImport() {
    try {
        console.log('🚀 Starting bulk import with updated WhyMobile + RedWhite prices...');

        // Show loading indicator
        const importButton = event.target;
        const originalText = importButton.innerHTML;
        importButton.innerHTML = '⏳ Importing...';
        importButton.disabled = true;

        // ISSUE FIX #2: Load the updated price import script
        const response = await fetch('bulk-import-updated-prices.js');
        if (!response.ok) {
            throw new Error(`Failed to load import script: ${response.status}`);
        }

        const scriptText = await response.text();
        console.log('📥 Loaded updated bulk import script (WhyMobile + RedWhite)');

        // Execute the script (this will define the importUpdatedPrices function)
        eval(scriptText);

        // Run the import function if it exists
        if (typeof importUpdatedPrices === 'function') {
            console.log('▶️ Running importUpdatedPrices()...');
            importUpdatedPrices();

            // Reload phone data from localStorage
            adminManager.phones = adminManager.loadPhones();

            // Refresh the UI
            renderPhones();
            renderPriceTable();

            // Close modal
            closeImportModal();

            // Show success notification
            alert('✅ Successfully imported updated prices!\n\n📊 Prices from:\n• WhyMobile (Used & New)\n• RedWhite (Used & New)\n\n💰 Higher prices automatically selected for best buyback rates.\n\nPlease check the phone models list to verify all products were imported correctly.');
            console.log('✅ Import completed successfully');
        } else {
            throw new Error('importUpdatedPrices function not found in script');
        }

    } catch (error) {
        console.error('❌ Import failed:', error);
        alert('Import failed: ' + error.message + '\n\nPlease check the browser console for more details.');

        // Reset button
        if (importButton) {
            importButton.innerHTML = originalText;
            importButton.disabled = false;
        }
    }
}

async function runBenchmarkImport() {
    try {
        console.log('🎯 Starting Benchmark Price Import...');
        console.log('📊 Source: iPhone_Benchmark_Price_List.xlsx');

        // Show loading indicator
        const importButton = event.target;
        const originalText = importButton.innerHTML;
        importButton.innerHTML = '⏳ Importing Benchmark Prices...';
        importButton.disabled = true;

        // Load the benchmark import script
        const response = await fetch('import-benchmark-prices.js');
        if (!response.ok) {
            throw new Error(`Failed to load benchmark import script: ${response.status}`);
        }

        const scriptText = await response.text();
        console.log('📥 Loaded benchmark import script');

        // Execute the script (this will define the importBenchmarkPrices function)
        eval(scriptText);

        // Run the import function if it exists
        if (typeof importBenchmarkPrices === 'function') {
            console.log('▶️ Running importBenchmarkPrices()...');
            const result = importBenchmarkPrices();

            // Reload phone data from localStorage
            adminManager.phones = adminManager.loadPhones();

            // Refresh the UI
            renderPhones();
            renderPriceTable();

            // Close modal
            closeImportModal();

            console.log('✅ Benchmark import completed successfully');
        } else {
            throw new Error('importBenchmarkPrices function not found in script');
        }

        // Reset button (in case modal didn't close)
        importButton.innerHTML = originalText;
        importButton.disabled = false;

    } catch (error) {
        console.error('❌ Benchmark import failed:', error);
        alert('Benchmark import failed: ' + error.message + '\n\nPlease check the browser console for more details.');

        // Reset button
        const importButton = event.target;
        if (importButton) {
            importButton.innerHTML = '📊 Import Benchmark Prices';
            importButton.disabled = false;
        }
    }
}

async function runExactPriceImport() {
    try {
        console.log('🎯 Starting EXACT PRICE IMPORT - NO AUTO-CALCULATIONS');
        console.log('📊 Source: Apple_USED_NEW_FULL_REVIEW.xlsx & Samsung_USED_NEW_FULL_REVIEW.xlsx');

        // Show loading indicator
        const importButton = event.target;
        const originalText = importButton.innerHTML;
        importButton.innerHTML = '⏳ Importing Exact Prices...';
        importButton.disabled = true;

        // Load the exact price import script with cache-busting
        const cacheBuster = Date.now();
        const response = await fetch(`import-exact-prices.js?v=${cacheBuster}`);
        if (!response.ok) {
            throw new Error(`Failed to load exact price import script: ${response.status}`);
        }

        const scriptText = await response.text();
        console.log('📥 Loaded exact price import script, length:', scriptText.length);

        // Execute the script (this will define the importExactPrices function)
        try {
            eval(scriptText);
            console.log('✅ Import script executed successfully');
        } catch (error) {
            console.error('❌ Import script syntax error:', error);
            throw new Error(`Import script has syntax error: ${error.message}`);
        }

        // Run the import function if it exists
        if (typeof importExactPrices === 'function') {
            console.log('▶️ Running importExactPrices()...');
            const result = importExactPrices();

            // Update timestamp (in case import script didn't set it)
            localStorage.setItem('ktmobile_last_update', new Date().toISOString());

            // Reload phone data from localStorage
            adminManager.phones = adminManager.loadPhones();

            // Refresh the UI
            renderPhones();
            renderPriceTable();

            // Close modal
            closeImportModal();

            console.log('✅ Price import completed successfully');
            console.log(`   Updated: ${result.updated}, Added: ${result.added}, Total: ${result.total}`);
        } else {
            throw new Error('importExactPrices function not found in script');
        }

        // Reset button (in case modal didn't close)
        importButton.innerHTML = originalText;
        importButton.disabled = false;

    } catch (error) {
        console.error('❌ Exact price import failed:', error);
        alert('Exact price import failed: ' + error.message + '\n\nPlease check the browser console for more details.');

        // Reset button
        const importButton = event.target;
        if (importButton) {
            importButton.innerHTML = '🎯 Import Exact Prices Now';
            importButton.disabled = false;
        }
    }
}

async function clearAndReimport() {
    const confirmed = confirm(
        '🧹 CLEAR ALL PHONE DATA & FRESH IMPORT\n\n' +
        '⚠️ WARNING: This will:\n' +
        '1. Delete ALL phones from database\n' +
        '2. Clear all localStorage data\n' +
        '3. Import fresh data from Excel files\n\n' +
        '✅ Use this if:\n' +
        '- Samsung prices are still showing calculated values\n' +
        '- You see duplicate phone entries\n' +
        '- Prices don\'t match Excel files\n\n' +
        'Continue with complete reset?'
    );

    if (!confirmed) return;

    try {
        console.log('🧹 Starting complete database reset...');

        // Clear ALL localStorage data
        localStorage.removeItem('ktmobile_phones');
        localStorage.removeItem('ktmobile_phones_backup');
        console.log('✅ Cleared localStorage');

        // Reset admin manager
        adminManager.phones = [];
        console.log('✅ Reset admin manager');

        // Now run fresh import
        console.log('📥 Running fresh import...');

        const importButton = event.target;
        const originalText = importButton.innerHTML;
        importButton.innerHTML = '⏳ Clearing & Importing...';
        importButton.disabled = true;

        // Load the exact price import script with cache-busting
        const cacheBuster = Date.now();
        const response = await fetch(`import-exact-prices.js?v=${cacheBuster}`);
        if (!response.ok) {
            throw new Error(`Failed to load import script: ${response.status}`);
        }

        const scriptText = await response.text();
        console.log('📄 Loaded import script, length:', scriptText.length);

        // Check for syntax errors before eval
        try {
            eval(scriptText);
            console.log('✅ Import script executed successfully');
        } catch (error) {
            console.error('❌ Import script syntax error:', error);
            throw new Error(`Import script has syntax error: ${error.message}`);
        }

        if (typeof importExactPrices === 'function') {
            const result = importExactPrices();

            // Update timestamp (in case import script didn't set it)
            localStorage.setItem('ktmobile_last_update', new Date().toISOString());

            // Reload from localStorage
            adminManager.phones = adminManager.loadPhones();

            // Refresh UI
            renderPhones();
            renderPriceTable();

            closeImportModal();

            alert(`✅ COMPLETE RESET & IMPORT SUCCESSFUL!\n\n` +
                  `🗑️  Cleared all old data\n` +
                  `➕ Added: ${result.added} phones\n` +
                  `📦 Total: ${result.total} phones\n\n` +
                  `✨ USED & NEW prices loaded from Excel.\n` +
                  `✨ For NEW-only models, USED prices calculated at 65%.`);

            console.log('✅ Complete reset and import successful');
        } else {
            throw new Error('importExactPrices function not found');
        }

        importButton.innerHTML = originalText;
        importButton.disabled = false;

    } catch (error) {
        console.error('❌ Clear and reimport failed:', error);
        alert('Clear and reimport failed: ' + error.message);

        const importButton = event.target;
        if (importButton) {
            importButton.innerHTML = '🧹 Clear All & Fresh Import';
            importButton.disabled = false;
        }
    }
}

// ============================================
// MODAL PRICE TYPE TOGGLE (USED vs NEW)
// ============================================

function switchModalPriceType(type) {
    const usedToggle = document.getElementById('modalUsedToggle');
    const newToggle = document.getElementById('modalNewToggle');
    const usedSection = document.querySelector('.modal-used-section');
    const newSection = document.querySelector('.modal-new-section');

    // Add null checks
    if (!usedToggle || !newToggle || !usedSection || !newSection) {
        console.warn('Modal toggle elements not found');
        return;
    }

    if (type === 'used') {
        // Switch to Used prices
        usedToggle.classList.add('active');
        newToggle.classList.remove('active');
        usedToggle.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        usedToggle.style.color = 'white';
        usedToggle.style.boxShadow = '0 2px 8px rgba(201, 168, 76, 0.3)';
        newToggle.style.background = '#e9ecef';
        newToggle.style.color = '#666';
        newToggle.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';

        if (usedSection) usedSection.style.display = 'block';
        if (newSection) newSection.style.display = 'none';
    } else {
        // Switch to New prices
        newToggle.classList.add('active');
        usedToggle.classList.remove('active');
        newToggle.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        newToggle.style.color = 'white';
        newToggle.style.boxShadow = '0 2px 8px rgba(201, 168, 76, 0.3)';
        usedToggle.style.background = '#e9ecef';
        usedToggle.style.color = '#666';
        usedToggle.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';

        if (usedSection) usedSection.style.display = 'none';
        if (newSection) newSection.style.display = 'block';
    }
}

function recalculateModalNewPrices() {
    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);

    let recalculated = 0;
    checkedStorages.forEach(storage => {
        const usedInput = document.querySelector(`.storage-price-input[data-storage="${storage}"]`);
        const newInput = document.querySelector(`.new-price-input[data-storage="${storage}"]`);

        if (usedInput && newInput) {
            const usedPrice = parseFloat(usedInput.value) || 0;
            const calculatedNewPrice = Math.round(usedPrice * 1.15);
            newInput.value = calculatedNewPrice;
            recalculated++;
        }
    });

    if (recalculated > 0) {
        showNotification(`✅ Recalculated ${recalculated} new phone prices from used prices`, 'success');
    } else {
        showNotification('⚠️ No prices to recalculate. Please select storage options and set used prices first.', 'warning');
    }
}

// Make functions globally available
window.switchPriceConditionType = switchPriceConditionType;
window.openBulkUpdateModal = openBulkUpdateModal;
window.closeBulkUpdateModal = closeBulkUpdateModal;
window.performBulkUpdate = performBulkUpdate;
window.showImportModal = showImportModal;
window.closeImportModal = closeImportModal;
window.runBulkImport = runBulkImport;
window.runBenchmarkImport = runBenchmarkImport;
window.runExactPriceImport = runExactPriceImport;
window.clearAndReimport = clearAndReimport;
window.currentPriceType = currentPriceType;
window.switchModalPriceType = switchModalPriceType;
// REMOVED: recalculateModalNewPrices - Auto-calculation disabled to preserve exact Excel prices

// ============================================
// CONDITION MODIFIER TOGGLE (USED vs NEW)
// ============================================

let currentModifierType = 'used'; // Default to used phone modifiers

function switchConditionModifierType(type) {
    currentModifierType = type;

    const usedBtn = document.getElementById('usedModifierToggle');
    const newBtn = document.getElementById('newModifierToggle');
    const usedSection = document.getElementById('usedConditionModifiers');
    const newSection = document.getElementById('newConditionModifiers');

    if (!usedBtn || !newBtn || !usedSection || !newSection) {
        console.warn('Condition modifier toggle elements not found');
        return;
    }

    usedBtn.style.transition = 'all 0.3s ease';
    newBtn.style.transition = 'all 0.3s ease';

    if (type === 'used') {
        usedBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        usedBtn.style.color = 'white';
        usedBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
        usedBtn.style.transform = 'scale(1.05)';
        usedBtn.classList.add('active');

        newBtn.style.background = '#e9ecef';
        newBtn.style.color = '#666';
        newBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        newBtn.style.transform = 'scale(1)';
        newBtn.classList.remove('active');

        usedSection.style.transition = 'opacity 0.3s ease';
        newSection.style.transition = 'opacity 0.3s ease';

        newSection.style.opacity = '0';
        setTimeout(() => {
            newSection.style.display = 'none';
            usedSection.style.display = 'block';
            setTimeout(() => {
                usedSection.style.opacity = '1';
            }, 50);
        }, 300);
    } else {
        newBtn.style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8973B 100%)';
        newBtn.style.color = 'white';
        newBtn.style.boxShadow = '0 4px 12px rgba(201, 168, 76, 0.4)';
        newBtn.style.transform = 'scale(1.05)';
        newBtn.classList.add('active');

        usedBtn.style.background = '#e9ecef';
        usedBtn.style.color = '#666';
        usedBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        usedBtn.style.transform = 'scale(1)';
        usedBtn.classList.remove('active');

        usedSection.style.transition = 'opacity 0.3s ease';
        newSection.style.transition = 'opacity 0.3s ease';

        usedSection.style.opacity = '0';
        setTimeout(() => {
            usedSection.style.display = 'none';
            newSection.style.display = 'block';
            setTimeout(() => {
                newSection.style.opacity = '1';
            }, 50);
        }, 300);
    }

    showNotification(`Switched to ${type === 'used' ? 'Used' : 'New'} Phone Condition Modifiers`, 'success');
}

// ============================================
// DATA MANAGEMENT FUNCTIONS
// ============================================

/**
 * Update data status display
 */
function updateDataStatus() {
    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    const lastUpdate = localStorage.getItem('ktmobile_last_update');

    const totalPhonesEl = document.getElementById('totalPhonesCount');
    const lastUpdateEl = document.getElementById('lastUpdateTime');

    if (totalPhonesEl) {
        totalPhonesEl.textContent = phones.length;
    }

    if (lastUpdateEl && lastUpdate) {
        const date = new Date(lastUpdate);
        lastUpdateEl.textContent = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

/**
 * Save current data to backup file
 */
function saveCurrentData() {
    try {
        console.log('💾 Saving current data to backup...');

        // Get all data from localStorage
        const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
        const brands = JSON.parse(localStorage.getItem('ktmobile_brands') || '[]');
        const conditionModifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}');
        const appointments = JSON.parse(localStorage.getItem('ktmobile_appointments') || '[]');
        const heroImage = JSON.parse(localStorage.getItem('ktmobile_hero_image') || 'null');
        const generalSettings = JSON.parse(localStorage.getItem('ibox_general_settings') || '{}');

        // Create backup object
        const backupData = {
            version: '2.0',
            timestamp: new Date().toISOString(),
            data: {
                phones,
                brands,
                conditionModifiers,
                appointments,
                heroImage,
                generalSettings
            },
            metadata: {
                totalPhones: phones.length,
                brands: [...new Set(phones.map(p => p.brand))],
                exportedBy: 'IBOX Mobile Admin Panel'
            }
        };

        // Create filename with timestamp
        const dateStr = new Date().toISOString().split('T')[0];
        const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `ibox-backup-${dateStr}-${timeStr}.json`;

        // Create download
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Backup saved:', filename);
        alert(`✅ Data Backup Saved Successfully!\n\n` +
              `📦 File: ${filename}\n` +
              `📱 Total Phones: ${phones.length}\n` +
              `📅 Appointments: ${appointments.length}\n\n` +
              `💾 File saved to Downloads folder`);

        showNotification('✓ Backup saved successfully!', 'success');

    } catch (error) {
        console.error('❌ Save backup error:', error);
        alert('❌ Error saving backup: ' + error.message);
    }
}

/**
 * Load previous data from backup file
 */
function loadPreviousData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);

            if (!backupData.version || !backupData.data) {
                throw new Error('Invalid backup file format');
            }

            // Confirm before loading
            const confirmed = confirm(
                `⚠️ RESTORE FROM BACKUP\n\n` +
                `This will REPLACE all current data with:\n\n` +
                `📱 ${backupData.data.phones?.length || 0} phone models\n` +
                `📅 ${backupData.data.appointments?.length || 0} appointments\n` +
                `🏷️ ${backupData.data.brands?.length || 0} brands\n\n` +
                `Backup Date: ${new Date(backupData.timestamp).toLocaleString()}\n\n` +
                `Continue with restore?`
            );

            if (!confirmed) {
                event.target.value = ''; // Reset file input
                return;
            }

            // Import all data to localStorage
            if (backupData.data.phones) {
                localStorage.setItem('ktmobile_phones', JSON.stringify(backupData.data.phones));
            }
            if (backupData.data.brands) {
                localStorage.setItem('ktmobile_brands', JSON.stringify(backupData.data.brands));
            }
            if (backupData.data.conditionModifiers) {
                localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(backupData.data.conditionModifiers));
            }
            if (backupData.data.heroImage) {
                localStorage.setItem('ktmobile_hero_image', JSON.stringify(backupData.data.heroImage));
            }
            if (backupData.data.appointments) {
                localStorage.setItem('ktmobile_appointments', JSON.stringify(backupData.data.appointments));
            }
            if (backupData.data.generalSettings) {
                localStorage.setItem('ibox_general_settings', JSON.stringify(backupData.data.generalSettings));
            }

            // Update timestamp
            localStorage.setItem('ktmobile_last_update', new Date().toISOString());

            alert(`✅ DATA RESTORED SUCCESSFULLY!\n\n` +
                  `📱 Restored ${backupData.data.phones?.length || 0} phone models\n` +
                  `📅 Restored ${backupData.data.appointments?.length || 0} appointments\n\n` +
                  `🔄 Reloading page to apply changes...`);

            console.log('✅ Data restored from backup');
            setTimeout(() => location.reload(), 1500);

        } catch (error) {
            console.error('❌ Load backup error:', error);
            alert('❌ Error loading backup: ' + error.message);
        }
    };
    reader.readAsText(file);
}

/**
 * Reset to default prices from Excel data (phoneDatabase)
 */
function resetToDefaultPrices() {
    const confirmed = confirm(
        `⚠️ RESET TO DEFAULT PRICES\n\n` +
        `This will:\n` +
        `1. DELETE all current phone data\n` +
        `2. Load all 40+ models from Excel reference data\n` +
        `3. Reset all prices to default values\n` +
        `4. Set all phones to display=true\n\n` +
        `⚠️ This cannot be undone!\n\n` +
        `Continue?`
    );

    if (!confirmed) return;

    try {
        console.log('🔄 Resetting to default prices...');

        // Clear existing data
        localStorage.removeItem('ktmobile_phones');
        localStorage.removeItem('ktmobile_phones_backup');
        console.log('✅ Cleared existing phone data');

        // Load import script and run it
        const scriptUrl = `import-exact-prices.js?v=${Date.now()}`;

        fetch(scriptUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load import script: ${response.status}`);
                }
                return response.text();
            })
            .then(scriptText => {
                // Execute the script
                eval(scriptText);

                if (typeof importExactPrices !== 'function') {
                    throw new Error('importExactPrices function not found in script');
                }

                // Run the import
                const result = importExactPrices();

                // Update timestamp
                localStorage.setItem('ktmobile_last_update', new Date().toISOString());

                // Reload admin manager
                adminManager.phones = adminManager.loadPhones();

                // Refresh UI
                renderPhones();
                renderPriceTable();
                updateDataStatus();

                alert(`✅ RESET TO DEFAULT PRICES SUCCESSFUL!\n\n` +
                      `📦 Total Phones: ${result.total}\n` +
                      `➕ Added: ${result.added}\n` +
                      `✏️ Updated: ${result.updated}\n\n` +
                      `✨ All prices loaded from Excel reference data\n` +
                      `✨ All phones set to display=true`);

                console.log('✅ Reset to default prices complete');

            })
            .catch(error => {
                console.error('❌ Reset failed:', error);
                alert('❌ Error resetting to default prices: ' + error.message);
            });

    } catch (error) {
        console.error('❌ Reset to default prices failed:', error);
        alert('❌ Error: ' + error.message);
    }
}

// Make functions globally available
window.updateDataStatus = updateDataStatus;
window.saveCurrentData = saveCurrentData;
window.loadPreviousData = loadPreviousData;
window.resetToDefaultPrices = resetToDefaultPrices;

// Update data status when data management section is viewed
document.addEventListener('DOMContentLoaded', function() {
    // Update status every time we switch to data management section
    const dataManagementLink = document.querySelector('[data-section="data-management"]');
    if (dataManagementLink) {
        dataManagementLink.addEventListener('click', updateDataStatus);
    }

    // Initial update
    setTimeout(updateDataStatus, 500);
});

window.switchConditionModifierType = switchConditionModifierType;