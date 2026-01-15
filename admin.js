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
     */
    loadPhones() {
        const stored = localStorage.getItem('ktmobile_phones');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize from existing quote.js data structure
        return this.initializePhones();
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
                    
                    phones.push({
                        id: `${brand}-${model.replace(/\s+/g, '-')}-${Date.now()}`,
                        brand: brand,
                        model: model,
                        image: data.image || this.getDefaultImage(brand),
                        storages: storages.length > 0 ? storages : ['128GB', '256GB'],
                        colors: data.colors ? data.colors.map(c => typeof c === 'string' ? c : c.name) : [],
                        basePrice: data.basePrice || 0,
                        storagePrices: storagePrices,
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
                colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium'],
                basePrice: 1800,
                storagePrices: { '256GB': 1800, '512GB': 1900, '1TB': 2000 },
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
                colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium'],
                basePrice: 1600,
                storagePrices: { '128GB': 1550, '256GB': 1600, '512GB': 1680, '1TB': 1750 },
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
                colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
                basePrice: 1500,
                storagePrices: { '256GB': 1500, '512GB': 1600, '1TB': 1700 },
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
                model: 'Galaxy S24 Ultra',
                image: 'images/phones/galaxy-s24-ultra.jpg',
                storages: ['256GB', '512GB', '1TB'],
                colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
                basePrice: 1200,
                storagePrices: { '256GB': 1200, '512GB': 1300, '1TB': 1400 },
                buyPrices: {
                    '256GB': { excellent: 1200, good: 1140, fair: 1020 },
                    '512GB': { excellent: 1300, good: 1235, fair: 1105 },
                    '1TB': { excellent: 1400, good: 1330, fair: 1190 }
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
                model: 'Galaxy S24',
                image: 'images/phones/galaxy-s24.jpg',
                storages: ['128GB', '256GB'],
                colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
                basePrice: 800,
                storagePrices: { '128GB': 800, '256GB': 850 },
                buyPrices: {
                    '128GB': { excellent: 800, good: 760, fair: 680 },
                    '256GB': { excellent: 850, good: 808, fair: 723 }
                },
                quantities: {
                    '128GB': { excellent: 0, good: 0, fair: 0 },
                    '256GB': { excellent: 0, good: 0, fair: 0 }
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
        
        return {
            Apple: { image: 'images/phones/iphone-16-pro-max.jpg', color: '#333333' },
            Samsung: { image: 'images/phones/galaxy-s23-ultra.jpg', color: '#1428A0' },
            Google: { image: 'images/phones/pixel-8-pro.jpg', color: '#EA4335' },
            OnePlus: { image: 'images/phones/oneplus-12.jpg', color: '#F5010C' },
            Xiaomi: { image: 'images/phones/xiaomi-14.jpg', color: '#FF6900' },
            OPPO: { image: 'images/phones/xiaomi-14.jpg', color: '#1E5128' },
            Vivo: { image: 'images/phones/xiaomi-14.jpg', color: '#1E3A8A' }
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
        
        // Default modifiers
        return {
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
        const modifiers = this.loadConditionModifiers();
        
        if (!modifiers[conditionType]) {
            modifiers[conditionType] = {};
        }
        
        modifiers[conditionType][grade] = value;
        localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(modifiers));
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
        const brandImages = {
            Apple: 'images/phones/iphone-16-pro-max.jpg',
            Samsung: 'images/phones/galaxy-s23-ultra.jpg',
            Google: 'images/phones/pixel-8-pro.jpg',
            OnePlus: 'images/phones/oneplus-12.jpg',
            Xiaomi: 'images/phones/xiaomi-14.jpg',
            OPPO: 'images/phones/xiaomi-14.jpg',
            Vivo: 'images/phones/xiaomi-14.jpg'
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

const adminManager = new AdminDataManager();

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

    // Initialize phones from quote.js if available
    if (typeof phoneDatabase !== 'undefined') {
        try {
            if (adminManager.phones.length === 0) {
                adminManager.phones = adminManager.initializePhones();
                adminManager.savePhones();
            } else {
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
            console.error('Error initializing phones:', e);
        }
    }

    // Initialize sections - don't require phonesGrid to exist
    console.log('Initializing admin sections...');
    try {
        // Always initialize menu navigation first - multiple times for reliability
        initializeMenuNavigation();
        setTimeout(() => initializeMenuNavigation(), 100);
        setTimeout(() => initializeMenuNavigation(), 500);
        
        // Initialize other sections
        const phonesGrid = document.getElementById('phonesGrid');
        if (phonesGrid) {
            initializePhonesSection();
        }
        
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

    addPhoneBtn.addEventListener('click', () => openPhoneModal());

    // Brand filter change - update model dropdown and render phones
    brandFilter.addEventListener('change', function() {
        updateModelDropdown(this.value);
        renderPhones();
    });

    // Model filter change - render phones
    modelFilter.addEventListener('change', () => renderPhones());
    
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
    
    console.log('Total phones:', phones.length);
    
    // If no phones, try to initialize
    if (phones.length === 0) {
        console.log('No phones found, initializing...');
        adminManager.phones = adminManager.initializePhones();
        phones = adminManager.phones || [];
        console.log('After initialization:', phones.length);
    }

    // Filter by brand
    if (brandFilter) {
        phones = phones.filter(p => p.brand === brandFilter);
    }

    // Filter by model
    if (modelFilter) {
        phones = phones.filter(p => p.model === modelFilter);
    }

    // Filter by search query
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        phones = phones.filter(p => 
            p.model.toLowerCase().includes(lowerQuery) ||
            p.brand.toLowerCase().includes(lowerQuery)
        );
    }

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
        
        return `
        <div class="phone-card-admin">
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
            <img src="${phone.image}" alt="${phone.model}" class="phone-card-image" onerror="this.src='images/phones/iphone-16-pro-max.jpg'">
            <div class="phone-card-info">
                <h4>${phone.model}</h4>
                <p><strong>Storage:</strong> ${phone.storages.join(', ') || 'N/A'}</p>
                <p><strong>Base Price:</strong> SGD $${phone.basePrice}</p>
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

function renderPriceTable() {
    console.log('=== renderPriceTable called ===');
    
    // Try both possible IDs for backward compatibility
    const tbody = document.getElementById('buybackPriceTableBody') || document.getElementById('priceTableBody');
    const brandFilter = document.getElementById('buybackPriceBrandFilter')?.value || document.getElementById('priceBrandFilter')?.value || '';
    
    if (!tbody) {
        console.error('Price table body not found! Looking for: buybackPriceTableBody or priceTableBody');
        return;
    }
    
    // Filter to Apple and Samsung only
    let phones = adminManager.phones || [];
    phones = phones.filter(p => p.brand === 'Apple' || p.brand === 'Samsung');

    // Filter by brand if selected
    if (brandFilter) {
        phones = phones.filter(p => p.brand === brandFilter);
    }

    console.log('Phones to display:', phones.length);

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
            // Get price from storagePrices or fallback to basePrice
            const price = phone.storagePrices && phone.storagePrices[storage] 
                ? phone.storagePrices[storage] 
                : (phone.basePrice || 0);
            
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
                               onchange="updatePrice('${phone.id}', '${storage}', this.value)"
                               min="0" 
                               step="10"
                               style="width: 120px; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" 
                                onclick="savePrice('${phone.id}', '${storage}')"
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

    if (!phone.storagePrices) {
        phone.storagePrices = {};
    }
    const priceValue = parseFloat(newPrice) || 0;
    phone.storagePrices[storage] = priceValue;
    phone.updatedAt = new Date().toISOString();
    adminManager.savePhones();
    
    // Update buy prices proportionally if they exist
    if (phone.buyPrices && phone.buyPrices[storage]) {
        const oldBasePrice = phone.storagePrices[storage] || phone.basePrice;
        const priceDiff = priceValue - oldBasePrice;
        Object.keys(phone.buyPrices[storage]).forEach(condition => {
            phone.buyPrices[storage][condition] = Math.max(0, (phone.buyPrices[storage][condition] || 0) + priceDiff);
        });
    }
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

    // Storage checkboxes handler
    brandSelect.addEventListener('change', function() {
        updateStoragePrices();
    });

    // Image file preview
    imageFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
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

    if (phoneId) {
        // Edit mode
        const phone = adminManager.getPhone(phoneId);
        if (!phone) return;

        modalTitle.textContent = 'Edit Phone';
        document.getElementById('phoneBrand').value = phone.brand;
        document.getElementById('phoneModel').value = phone.model;
        document.getElementById('phoneImageUrl').value = phone.image;
        document.getElementById('phoneBasePrice').value = phone.basePrice;
        document.getElementById('phoneColors').value = phone.colors.join(', ');
        
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
        updateStoragePrices();
        updateBuyPricesStockSection(null);
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
    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);

    container.innerHTML = checkedStorages.map(storage => `
        <div class="storage-price-item">
            <label>${storage}:</label>
            <input type="number" class="form-control storage-price-input" 
                   data-storage="${storage}" placeholder="Price modifier" 
                   value="${adminManager.currentEditingPhone ? 
                       (adminManager.getPhone(adminManager.currentEditingPhone)?.storagePrices?.[storage] || 0) : 0}">
        </div>
    `).join('');
    
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
});

function savePhone() {
    // Check permission
    if (!auth.hasPermission('canManagePhones')) {
        alert('You do not have permission to manage phones.');
        return;
    }

    const brand = document.getElementById('phoneBrand').value;
    const model = document.getElementById('phoneModel').value;
    const imageUrl = document.getElementById('phoneImageUrl').value;
    const basePrice = document.getElementById('phoneBasePrice').value;
    const colors = document.getElementById('phoneColors').value;
    
    const checkedStorages = Array.from(document.querySelectorAll('.storage-checkboxes input:checked'))
        .map(cb => cb.value);

    const storagePrices = {};
    checkedStorages.forEach(storage => {
        const input = document.querySelector(`.storage-price-input[data-storage="${storage}"]`);
        if (input) {
            storagePrices[storage] = parseFloat(input.value) || 0;
        }
    });

    if (!brand || !model || !basePrice || checkedStorages.length === 0) {
        alert('Please fill in all required fields');
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
                // Default pricing if not set
                const storagePrice = storagePrices[storage] || parseFloat(basePrice) || 0;
                const conditionModifiers = {
                    'excellent': 0,
                    'good': -50,
                    'fair': -150
                };
                buyPrices[storage][condition] = storagePrice + conditionModifiers[condition];
            }
            
            if (quantityInput) {
                quantities[storage][condition] = parseInt(quantityInput.value) || 0;
            } else {
                quantities[storage][condition] = 0;
            }
        });
    });

    const phoneData = {
        brand,
        model,
        image: imageUrl || adminManager.getDefaultImage(brand),
        storages: checkedStorages,
        colors: colors ? colors.split(',').map(c => c.trim()) : [],
        basePrice: parseFloat(basePrice) || 0,
        storagePrices: storagePrices,
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

    if (adminManager.currentEditingPhone) {
        adminManager.updatePhone(adminManager.currentEditingPhone, phoneData);
        alert('Phone updated successfully!');
    } else {
        adminManager.addPhone(phoneData);
        alert('Phone added successfully!');
    }

    closePhoneModal();
    
    // Update model dropdown if brand filter is active
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        updateModelDropdown(brandFilter.value);
    }
    
    renderPhones();
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
        
        // Update base price
        phone.basePrice = Math.max(0, (phone.basePrice || 0) + amount);
        
        // Update storage prices if they exist
        if (phone.storagePrices) {
            Object.keys(phone.storagePrices).forEach(storage => {
                phone.storagePrices[storage] = Math.max(0, (phone.storagePrices[storage] || 0) + amount);
            });
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
    const action = amount >= 0 ? 'increased' : 'decreased';
    alert(`Success! ${affectedCount} phone prices ${action} by SGD $${Math.abs(amount)}`);
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
 * Export all admin data to a JSON file
 * This allows admins to save their changes and commit to git
 */
function exportAllData() {
    try {
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            data: {
                phones: JSON.parse(localStorage.getItem('ktmobile_phones') || '[]'),
                brands: JSON.parse(localStorage.getItem('ktmobile_brands') || '[]'),
                conditionModifiers: JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}'),
                heroImage: JSON.parse(localStorage.getItem('ktmobile_hero_image') || '{}'),
                appointments: JSON.parse(localStorage.getItem('ktmobile_appointments') || '[]'),
                generalSettings: JSON.parse(localStorage.getItem('ibox_general_settings') || '{}')
            }
        };

        // Create blob and download
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('✅ Data exported successfully! \n\nNext steps:\n1. Save this file to /data/ folder\n2. Commit to git: git add data/admin-data-*.json\n3. Your changes will persist forever!');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Error exporting data: ' + error.message);
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

            alert('✅ Data imported successfully! \n\nReloading admin panel to apply changes...');
            location.reload();
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