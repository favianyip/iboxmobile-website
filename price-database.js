/**
 * PRICE DATABASE SYSTEM - THE BRAIN OF PRICING
 * =============================================
 * This is the SINGLE SOURCE OF TRUTH for all prices, colors, and storage
 *
 * Admin Panel controls everything here
 * Customer pages READ ONLY from here
 * No Excel imports - Admin UI manages all data
 *
 * Author: Senior Engineer
 * Date: January 21, 2026
 */

// ============================================================================
// DATABASE MANAGER - Controls all pricing data
// ============================================================================

class PriceDatabase {
    constructor() {
        this.DB_KEY = 'iboxmobile_price_database';
        this.VERSION_KEY = 'iboxmobile_db_version';
        this.CURRENT_VERSION = '1.0.0';

        this.initializeDatabase();
    }

    /**
     * Initialize database structure
     */
    initializeDatabase() {
        const existing = this.loadDatabase();

        if (!existing || !existing.version) {
            console.log('🔧 Initializing new price database...');
            const initialDb = {
                version: this.CURRENT_VERSION,
                lastUpdate: new Date().toISOString(),
                phones: [],
                brands: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'OPPO'],
                conditionModifiers: this.getDefaultConditionModifiers()
            };

            this.saveDatabase(initialDb);
            console.log('✅ Price database initialized');
        } else {
            console.log('✅ Price database loaded:', {
                version: existing.version,
                phones: existing.phones?.length || 0,
                lastUpdate: existing.lastUpdate
            });
        }
    }

    /**
     * Load entire database from localStorage
     */
    loadDatabase() {
        try {
            const data = localStorage.getItem(this.DB_KEY);
            if (!data) return null;

            return JSON.parse(data);
        } catch (e) {
            console.error('❌ Failed to load database:', e);
            return null;
        }
    }

    /**
     * Save entire database to localStorage
     */
    saveDatabase(database) {
        try {
            database.lastUpdate = new Date().toISOString();
            database.version = this.CURRENT_VERSION;

            localStorage.setItem(this.DB_KEY, JSON.stringify(database));
            localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
            localStorage.setItem('ktmobile_last_update', database.lastUpdate);

            console.log('✅ Database saved successfully');
            return true;
        } catch (e) {
            console.error('❌ Failed to save database:', e);
            return false;
        }
    }

    /**
     * Get all phones
     */
    getAllPhones() {
        const db = this.loadDatabase();
        return db?.phones || [];
    }

    /**
     * Get phone by ID
     */
    getPhoneById(id) {
        const phones = this.getAllPhones();
        return phones.find(p => p.id === id);
    }

    /**
     * Get phones by brand
     */
    getPhonesByBrand(brand) {
        const phones = this.getAllPhones();
        return phones.filter(p => p.brand === brand);
    }

    /**
     * Add or update phone
     */
    savePhone(phoneData) {
        const db = this.loadDatabase();
        if (!db) return false;

        const phones = db.phones || [];
        const existingIndex = phones.findIndex(p => p.id === phoneData.id);

        if (existingIndex >= 0) {
            // Update existing
            phones[existingIndex] = {
                ...phones[existingIndex],
                ...phoneData,
                updatedAt: new Date().toISOString()
            };
            console.log('📝 Updated phone:', phoneData.model);
        } else {
            // Add new
            phoneData.createdAt = new Date().toISOString();
            phoneData.updatedAt = phoneData.createdAt;
            phones.push(phoneData);
            console.log('➕ Added new phone:', phoneData.model);
        }

        db.phones = phones;
        return this.saveDatabase(db);
    }

    /**
     * Delete phone
     */
    deletePhone(id) {
        const db = this.loadDatabase();
        if (!db) return false;

        const phones = db.phones || [];
        const filtered = phones.filter(p => p.id !== id);

        if (filtered.length < phones.length) {
            db.phones = filtered;
            console.log('🗑️ Deleted phone:', id);
            return this.saveDatabase(db);
        }

        return false;
    }

    /**
     * Get condition modifiers
     */
    getConditionModifiers() {
        const db = this.loadDatabase();
        return db?.conditionModifiers || this.getDefaultConditionModifiers();
    }

    /**
     * Update condition modifiers
     */
    updateConditionModifiers(modifiers) {
        const db = this.loadDatabase();
        if (!db) return false;

        db.conditionModifiers = modifiers;
        console.log('📊 Updated condition modifiers');
        return this.saveDatabase(db);
    }

    /**
     * Default condition modifiers (deductions from base price)
     */
    getDefaultConditionModifiers() {
        return {
            // Body condition deductions
            bodyGrade: {
                A: 0,      // Perfect condition - no deduction
                B: -50,    // Minor scratches
                C: -100,   // Moderate wear
                D: -200    // Heavy wear/dents
            },

            // Screen condition deductions
            screenGrade: {
                A: 0,      // Perfect - no scratches
                B: -30,    // Minor scratches
                C: -80,    // Noticeable scratches
                D: -150    // Cracked or major damage
            },

            // Battery health deductions
            batteryHealth: {
                '91-100': 0,      // Excellent
                '86-90': -20,     // Good
                '81-85': -40,     // Fair
                '76-80': -60,     // Acceptable
                '70-75': -80,     // Poor
                'below-70': -120  // Very poor
            },

            // Functional issues deductions
            functionalIssues: {
                powerButton: -80,
                volumeButton: -60,
                homeButton: -60,
                faceId: -100,
                touchId: -80,
                camera: -100,
                frontCamera: -60,
                speaker: -50,
                microphone: -50,
                wifi: -100,
                bluetooth: -50,
                cellular: -150,
                charging: -100,
                touchscreen: -150,
                faceTime: -60
            },

            // Accessories bonuses (adds to price)
            accessories: {
                originalBox: 20,
                originalCable: 15,
                originalCharger: 25,
                originalEarphones: 30,
                originalManual: 5
            },

            // Market type (local vs export)
            market: {
                local: 0,       // Singapore local market
                export: -50     // Export market (lower price)
            }
        };
    }

    /**
     * Calculate final price based on conditions
     */
    calculateFinalPrice(phone, conditions) {
        if (!phone || !phone.basePrice) {
            console.warn('⚠️ Invalid phone data for price calculation');
            return 0;
        }

        let finalPrice = phone.basePrice;
        const modifiers = this.getConditionModifiers();

        // Add storage modifier
        if (conditions.storage && phone.storage && phone.storage[conditions.storage]) {
            finalPrice += phone.storage[conditions.storage];
        }

        // Apply body condition
        if (conditions.bodyGrade && modifiers.bodyGrade[conditions.bodyGrade] !== undefined) {
            finalPrice += modifiers.bodyGrade[conditions.bodyGrade];
        }

        // Apply screen condition
        if (conditions.screenGrade && modifiers.screenGrade[conditions.screenGrade] !== undefined) {
            finalPrice += modifiers.screenGrade[conditions.screenGrade];
        }

        // Apply battery health
        if (conditions.batteryHealth && modifiers.batteryHealth[conditions.batteryHealth] !== undefined) {
            finalPrice += modifiers.batteryHealth[conditions.batteryHealth];
        }

        // Apply functional issues (sum all selected issues)
        if (conditions.functionalIssues && Array.isArray(conditions.functionalIssues)) {
            conditions.functionalIssues.forEach(issue => {
                if (modifiers.functionalIssues[issue] !== undefined) {
                    finalPrice += modifiers.functionalIssues[issue];
                }
            });
        }

        // Apply accessories (sum all selected accessories)
        if (conditions.accessories && Array.isArray(conditions.accessories)) {
            conditions.accessories.forEach(accessory => {
                if (modifiers.accessories[accessory] !== undefined) {
                    finalPrice += modifiers.accessories[accessory];
                }
            });
        }

        // Apply market type
        if (conditions.market && modifiers.market[conditions.market] !== undefined) {
            finalPrice += modifiers.market[conditions.market];
        }

        // Ensure price doesn't go below minimum (e.g., $50)
        return Math.max(finalPrice, 50);
    }

    /**
     * Get database statistics
     */
    getStatistics() {
        const db = this.loadDatabase();
        if (!db) return null;

        const phones = db.phones || [];
        const stats = {
            totalPhones: phones.length,
            byBrand: {},
            withPrices: 0,
            withoutPrices: 0,
            withColors: 0,
            withoutColors: 0,
            lastUpdate: db.lastUpdate,
            version: db.version
        };

        phones.forEach(phone => {
            // Count by brand
            if (!stats.byBrand[phone.brand]) {
                stats.byBrand[phone.brand] = 0;
            }
            stats.byBrand[phone.brand]++;

            // Count pricing status
            if (phone.basePrice && phone.basePrice > 0) {
                stats.withPrices++;
            } else {
                stats.withoutPrices++;
            }

            // Count color status
            if (phone.colors && phone.colors.length > 0) {
                stats.withColors++;
            } else {
                stats.withoutColors++;
            }
        });

        return stats;
    }

    /**
     * Export database for backup
     */
    exportDatabase() {
        const db = this.loadDatabase();
        if (!db) return null;

        return {
            exportDate: new Date().toISOString(),
            version: this.CURRENT_VERSION,
            data: db
        };
    }

    /**
     * Import database from backup
     */
    importDatabase(importData) {
        if (!importData || !importData.data) {
            console.error('❌ Invalid import data');
            return false;
        }

        try {
            this.saveDatabase(importData.data);
            console.log('✅ Database imported successfully');
            return true;
        } catch (e) {
            console.error('❌ Import failed:', e);
            return false;
        }
    }

    /**
     * Clear entire database (use with caution!)
     */
    clearDatabase() {
        localStorage.removeItem(this.DB_KEY);
        localStorage.removeItem(this.VERSION_KEY);
        localStorage.removeItem('ktmobile_last_update');
        console.log('🗑️ Database cleared');
        this.initializeDatabase();
    }
}

// ============================================================================
// GLOBAL INSTANCE - Use this throughout the app
// ============================================================================

window.priceDB = new PriceDatabase();

// ============================================================================
// HELPER FUNCTIONS FOR COMPATIBILITY
// ============================================================================

/**
 * Get phone data for customer pages (backwards compatible)
 */
window.getPhoneData = function(brand, model) {
    const phones = window.priceDB.getAllPhones();
    return phones.find(p => p.brand === brand && p.model === model);
};

/**
 * Get all phones for a brand (backwards compatible)
 */
window.getBrandPhones = function(brand) {
    return window.priceDB.getPhonesByBrand(brand);
};

/**
 * Calculate quote price (for customer pages)
 */
window.calculateQuotePrice = function(brand, model, conditions) {
    const phone = window.getPhoneData(brand, model);
    if (!phone) {
        console.error('❌ Phone not found:', brand, model);
        return 0;
    }

    return window.priceDB.calculateFinalPrice(phone, conditions);
};

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('✅ Price Database System Loaded');
console.log('📊 Database stats:', window.priceDB.getStatistics());
