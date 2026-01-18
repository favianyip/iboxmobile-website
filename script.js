/**
 * KT Mobile Singapore - Phone Image & API System
 * Using local images for reliability and performance
 * 
 * Scraping APIs reference: https://github.com/cporter202/scraping-apis-for-devs
 */

// ============================================================================
// LOCAL PHONE IMAGE DATABASE
// All images stored in /images/phones/ for reliability
// ============================================================================

const phoneImages = {
    // =========== APPLE IPHONE 16 SERIES ===========
    'iPhone 16 Pro Max': 'images/phones/iphone-16-pro-max.jpg',
    'iPhone 16 Pro': 'images/phones/iphone-16-pro.jpg',
    'iPhone 16 Plus': 'images/phones/iphone-16-plus.jpg',
    'iPhone 16': 'images/phones/iphone-16.jpg',
    
    // =========== APPLE IPHONE 15 SERIES ===========
    'iPhone 15 Pro Max': 'images/phones/iphone-15-pro-max.jpg',
    'iPhone 15 Pro': 'images/phones/iphone-15-pro.jpg',
    'iPhone 15 Plus': 'images/phones/iphone-15-plus.jpg',
    'iPhone 15': 'images/phones/iphone-15.jpg',
    
    // =========== APPLE IPHONE 14 SERIES ===========
    'iPhone 14 Pro Max': 'images/phones/iphone-14-pro-max.jpg',
    'iPhone 14 Pro': 'images/phones/iphone-14-pro.jpg',
    'iPhone 14 Plus': 'images/phones/iphone-14-plus.jpg',
    'iPhone 14': 'images/phones/iphone-14.jpg',
    
    // =========== APPLE IPHONE 13 SERIES ===========
    'iPhone 13 Pro Max': 'images/phones/iphone-13-pro-max.jpg',
    'iPhone 13 Pro': 'images/phones/iphone-13-pro.jpg',
    'iPhone 13': 'images/phones/iphone-13.jpg',
    'iPhone 13 mini': 'images/phones/iphone-13-mini.jpg',
    
    // =========== APPLE IPHONE 12 SERIES ===========
    'iPhone 12 Pro Max': 'images/phones/iphone-12-pro-max.jpg',
    'iPhone 12 Pro': 'images/phones/iphone-12-pro.jpg',
    'iPhone 12': 'images/phones/iphone-12.jpg',
    'iPhone 12 mini': 'images/phones/iphone-12-mini.jpg',
    
    // =========== APPLE IPHONE 11 SERIES ===========
    'iPhone 11 Pro Max': 'images/phones/iphone-11-pro-max.jpg',
    'iPhone 11 Pro': 'images/phones/iphone-11-pro.jpg',
    'iPhone 11': 'images/phones/iphone-11.jpg',
    
    // =========== APPLE IPHONE OLDER ===========
    'iPhone SE (3rd Gen)': 'images/phones/iphone-se-3rd-gen.jpg',
    'iPhone XS Max': 'images/phones/iphone-xs-max.jpg',
    'iPhone XS': 'images/phones/iphone-xs.jpg',
    'iPhone XR': 'images/phones/iphone-xr.jpg',
    'iPhone X': 'images/phones/iphone-xs.jpg',
    
    // =========== SAMSUNG GALAXY S SERIES ===========
    'Galaxy S24 Ultra': 'images/phones/galaxy-s24-ultra.jpg',
    'Galaxy S24+': 'images/phones/galaxy-s24-plus.jpg',
    'Galaxy S24': 'images/phones/galaxy-s24.jpg',
    'Galaxy S23 Ultra': 'images/phones/galaxy-s23-ultra.jpg',
    'Galaxy S23+': 'images/phones/galaxy-s23-plus.jpg',
    'Galaxy S23': 'images/phones/galaxy-s23.jpg',
    'Galaxy S22 Ultra': 'images/phones/galaxy-s22-ultra.jpg',
    'Galaxy S22+': 'images/phones/galaxy-s22-plus.jpg',
    'Galaxy S22': 'images/phones/galaxy-s22.jpg',
    'Galaxy S21 Ultra': 'images/phones/galaxy-s21-ultra.jpg',
    'Galaxy S21+': 'images/phones/galaxy-s21-plus.jpg',
    'Galaxy S21': 'images/phones/galaxy-s21.jpg',
    'Galaxy S21 FE': 'images/phones/galaxy-s21.jpg',
    
    // =========== SAMSUNG GALAXY FOLD/FLIP ===========
    'Galaxy Z Fold 5': 'images/phones/galaxy-z-fold5.jpg',
    'Galaxy Z Fold 4': 'images/phones/galaxy-z-fold4.jpg',
    'Galaxy Z Fold 3': 'images/phones/galaxy-z-fold4.jpg',
    'Galaxy Z Flip 5': 'images/phones/galaxy-z-flip5.jpg',
    'Galaxy Z Flip 4': 'images/phones/galaxy-z-flip4.jpg',
    'Galaxy Z Flip 3': 'images/phones/galaxy-z-flip5.jpg',
    
    // =========== SAMSUNG NOTE ===========
    'Galaxy Note 20 Ultra': 'images/phones/galaxy-note20-ultra.jpg',
    'Galaxy Note 20': 'images/phones/galaxy-note20.jpg',
    
    // =========== SAMSUNG A SERIES ===========
    'Galaxy A54': 'images/phones/galaxy-a54.jpg',
    'Galaxy A34': 'images/phones/galaxy-a34.jpg',
    
    // =========== GOOGLE PIXEL ===========
    'Google Pixel 8 Pro': 'images/phones/pixel-8-pro.jpg',
    'Google Pixel 8': 'images/phones/pixel-8.jpg',
    'Google Pixel 7 Pro': 'images/phones/pixel-8-pro.jpg', // Fallback
    'Google Pixel 7': 'images/phones/pixel-8.jpg',
    'Pixel 8 Pro': 'images/phones/pixel-8-pro.jpg',
    'Pixel 8': 'images/phones/pixel-8.jpg',
    'Pixel 7 Pro': 'images/phones/pixel-8-pro.jpg',
    'Pixel 7': 'images/phones/pixel-8.jpg',
    
    // =========== ONEPLUS ===========
    'OnePlus 12': 'images/phones/oneplus-12.jpg',
    'OnePlus 11': 'images/phones/oneplus-11.jpg',
    'OnePlus 10 Pro': 'images/phones/oneplus-10-pro.jpg',
    
    // =========== XIAOMI ===========
    'Xiaomi 14 Ultra': 'images/phones/xiaomi-14.jpg',
    'Xiaomi 14': 'images/phones/xiaomi-14.jpg',
    'Xiaomi 13 Pro': 'images/phones/xiaomi-14.jpg', // Using xiaomi-14 as fallback until we get proper image
    'Xiaomi 13': 'images/phones/xiaomi-14.jpg', // Using xiaomi-14 as fallback until we get proper image
    
    // =========== OPPO ===========
    'OPPO Find X5 Pro': 'images/phones/oppo-find-x5-pro.jpg',
    'Find X5 Pro': 'images/phones/oppo-find-x5-pro.jpg',
    
    // =========== VIVO ===========
    'Vivo X90 Pro': 'images/phones/xiaomi-14.jpg' // Fallback until we get correct image
};

// ============================================================================
// FALLBACK PLACEHOLDER GENERATOR
// ============================================================================

function generatePlaceholder(modelName) {
    const brand = modelName.split(' ')[0];
    const colors = {
        'iPhone': '333333/FFFFFF',
        'Galaxy': '1428A0/FFFFFF',
        'Pixel': 'EA4335/FFFFFF',
        'OnePlus': 'F5010C/FFFFFF',
        'Xiaomi': 'FF6900/FFFFFF',
        'OPPO': '1E5128/FFFFFF',
        'Vivo': '1E3A8A/FFFFFF'
    };
    const color = colors[brand] || '1a1a1a/C9A84C';
    const text = modelName.replace(/\s+/g, '%0A');
    return `https://placehold.co/200x300/${color}?text=${text}&font=roboto`;
}

// ============================================================================
// PHONE BUYBACK API CLASS
// ============================================================================

class PhoneBuybackAPI {
    constructor() {
        this.imageCache = new Map();
    }

    /**
     * Get phone image URL - prioritizes local images and phoneDatabase
     */
    getPhoneImage(phoneModel) {
        // Check cache
        if (this.imageCache.has(phoneModel)) {
            return this.imageCache.get(phoneModel);
        }
        
        // First, try to get from phoneDatabase if available
        if (typeof phoneDatabase !== 'undefined') {
            for (const [brand, models] of Object.entries(phoneDatabase)) {
                // Try exact match
                if (models[phoneModel] && models[phoneModel].image) {
                    this.imageCache.set(phoneModel, models[phoneModel].image);
                    return models[phoneModel].image;
                }
                // Try partial match (e.g., "Google Pixel 8 Pro" -> "Pixel 8 Pro")
                for (const [modelName, modelData] of Object.entries(models)) {
                    const normalizedPhoneModel = phoneModel.replace('Google ', '').trim();
                    const normalizedModelName = modelName.replace('Google ', '').trim();
                    
                    // Multiple matching strategies for better accuracy
                    if (phoneModel === modelName ||
                        normalizedPhoneModel === normalizedModelName ||
                        phoneModel.includes(modelName) || 
                        modelName.includes(normalizedPhoneModel) ||
                        normalizedPhoneModel.includes(normalizedModelName) ||
                        normalizedModelName.includes(normalizedPhoneModel)) {
                        if (modelData.image) {
                            console.log(`Found match in phoneDatabase: ${phoneModel} -> ${modelName}: ${modelData.image}`);
                            this.imageCache.set(phoneModel, modelData.image);
                            return modelData.image;
                        }
                    }
                }
            }
        }
        
        // Check local mapping
        if (phoneImages[phoneModel]) {
            this.imageCache.set(phoneModel, phoneImages[phoneModel]);
            return phoneImages[phoneModel];
        }
        
        // Try to find partial match in phoneImages
        for (const [key, value] of Object.entries(phoneImages)) {
            // Normalize both for comparison
            const normalizedKey = key.toLowerCase().replace('google ', '');
            const normalizedModel = phoneModel.toLowerCase().replace('google ', '');
            if (normalizedModel.includes(normalizedKey) || normalizedKey.includes(normalizedModel)) {
                this.imageCache.set(phoneModel, value);
                return value;
            }
        }
        
        // Generate placeholder for unknown models
        const placeholder = generatePlaceholder(phoneModel);
        this.imageCache.set(phoneModel, placeholder);
        return placeholder;
    }

    /**
     * Fetch phone buyback price
     */
    async fetchPhonePrice(phoneModel, storage) {
        const basePrices = {
            // iPhone 16 Series
            'iPhone 16 Pro Max': { '256GB': 1800, '512GB': 1950, '1TB': 2100 },
            'iPhone 16 Pro': { '128GB': 1550, '256GB': 1650, '512GB': 1800, '1TB': 1950 },
            'iPhone 16 Plus': { '128GB': 1300, '256GB': 1400, '512GB': 1550 },
            'iPhone 16': { '128GB': 1150, '256GB': 1250, '512GB': 1400 },
            
            // iPhone 15 Series
            'iPhone 15 Pro Max': { '256GB': 1450, '512GB': 1600, '1TB': 1750 },
            'iPhone 15 Pro': { '128GB': 1250, '256GB': 1350, '512GB': 1500, '1TB': 1650 },
            'iPhone 15 Plus': { '128GB': 1050, '256GB': 1150, '512GB': 1300 },
            'iPhone 15': { '128GB': 900, '256GB': 1000, '512GB': 1150 },
            
            // iPhone 14 Series
            'iPhone 14 Pro Max': { '128GB': 1100, '256GB': 1200, '512GB': 1350, '1TB': 1500 },
            'iPhone 14 Pro': { '128GB': 950, '256GB': 1050, '512GB': 1200, '1TB': 1350 },
            'iPhone 14 Plus': { '128GB': 800, '256GB': 900, '512GB': 1050 },
            'iPhone 14': { '128GB': 700, '256GB': 800, '512GB': 950 },
            
            // iPhone 13 Series
            'iPhone 13 Pro Max': { '128GB': 850, '256GB': 950, '512GB': 1100, '1TB': 1250 },
            'iPhone 13 Pro': { '128GB': 700, '256GB': 800, '512GB': 950, '1TB': 1100 },
            'iPhone 13': { '128GB': 550, '256GB': 650, '512GB': 800 },
            'iPhone 13 mini': { '128GB': 450, '256GB': 550, '512GB': 700 },
            
            // iPhone 12 Series
            'iPhone 12 Pro Max': { '128GB': 600, '256GB': 700, '512GB': 850 },
            'iPhone 12 Pro': { '128GB': 500, '256GB': 600, '512GB': 750 },
            'iPhone 12': { '64GB': 350, '128GB': 400, '256GB': 500 },
            'iPhone 12 mini': { '64GB': 300, '128GB': 350, '256GB': 450 },
            
            // Samsung S24 Series
            'Galaxy S24 Ultra': { '256GB': 1300, '512GB': 1450, '1TB': 1600 },
            'Galaxy S24+': { '256GB': 1000, '512GB': 1150 },
            'Galaxy S24': { '128GB': 750, '256GB': 850, '512GB': 1000 },
            
            // Samsung S23 Series
            'Galaxy S23 Ultra': { '256GB': 1000, '512GB': 1150, '1TB': 1300 },
            'Galaxy S23+': { '256GB': 750, '512GB': 900 },
            'Galaxy S23': { '128GB': 550, '256GB': 650 }
        };
        
        const modelPrices = basePrices[phoneModel];
        if (modelPrices && modelPrices[storage]) {
            return {
                price: modelPrices[storage],
                currency: 'SGD',
                lastUpdated: new Date().toISOString()
            };
        }
        
        // Generate estimate for unknown models
        const basePrice = phoneModel.includes('Pro Max') ? 1200 :
                         phoneModel.includes('Ultra') ? 1300 :
                         phoneModel.includes('Pro') ? 1000 :
                         phoneModel.includes('Plus') ? 850 : 700;
        
        return {
            price: basePrice,
            currency: 'SGD',
            lastUpdated: new Date().toISOString()
        };
    }
}

// ============================================================================
// INITIALIZE APPLICATION
// ============================================================================

const phoneAPI = new PhoneBuybackAPI();

// Load hero image from admin settings
function loadHeroImage() {
    const heroImage = document.getElementById('heroPhoneImage');
    if (!heroImage) {
        console.log('Hero image element not found');
        return;
    }

    try {
        const heroSettings = localStorage.getItem('ktmobile_hero_image');
        if (heroSettings) {
            const settings = JSON.parse(heroSettings);
            console.log('Loading hero image:', settings.imagePath);
            
            // Set image source
            heroImage.src = settings.imagePath;
            
            // Apply background removal if enabled
            if (settings.removeBackground !== false) {
                heroImage.classList.add('no-background');
                heroImage.classList.remove('transparent-bg');
            } else {
                heroImage.classList.remove('no-background');
                heroImage.classList.add('transparent-bg');
            }
            
            // Handle image load errors
            heroImage.onerror = function() {
                console.error('Hero image failed to load:', settings.imagePath);
                // Fallback to default
                this.src = 'images/phones/iphone-16-pro-max-best.jpg';
                this.classList.add('no-background');
            };
        } else {
            console.log('No hero image settings found, using default');
            // Default: apply background removal
            heroImage.classList.add('no-background');
        }
    } catch (error) {
        console.error('Error loading hero image settings:', error);
        // Default: apply background removal
        heroImage.classList.add('no-background');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load hero image settings
    loadHeroImage();
    // Dynamically load iPhone models from database
    loadiPhoneModels();
    initializePhoneImages();
    initializeEventHandlers();
    initializeBuySection();
});

/**
 * Dynamically load iPhone models from phoneDatabase
 * Respects admin display settings
 */
function loadiPhoneModels() {
    // Wait for phoneDatabase to be available
    if (typeof phoneDatabase === 'undefined') {
        setTimeout(loadiPhoneModels, 100);
        return;
    }
    
    const iPhoneSection = document.querySelector('.brand-section');
    if (!iPhoneSection || !iPhoneSection.querySelector('.brand-title')?.textContent?.includes('iPhone')) {
        return; // iPhone section not found or already processed
    }
    
    const deviceGrid = iPhoneSection.querySelector('.device-grid');
    if (!deviceGrid) return;
    
    // Clear existing static cards
    deviceGrid.innerHTML = '';
    
    // Get iPhone models from phoneDatabase
    const iPhoneModels = phoneDatabase['Apple'] || {};
    
    // Sort models: newest first (iPhone 16 -> iPhone 7)
    const sortedModels = Object.entries(iPhoneModels).sort((a, b) => {
        const aNum = parseInt(a[0].match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b[0].match(/\d+/)?.[0] || '0');
        return bNum - aNum; // Descending order
    });
    
    // Create device cards dynamically
    sortedModels.forEach(([modelName, modelData]) => {
        // Check admin display settings
        let shouldDisplay = true;
        if (typeof adminManager !== 'undefined') {
            const adminPhone = adminManager.phones.find(p => p.brand === 'Apple' && p.model === modelName);
            if (adminPhone && adminPhone.display === false) {
                shouldDisplay = false;
            }
        }
        
        if (!shouldDisplay) return;
        
        const card = document.createElement('div');
        card.className = 'device-card';
        
        const storageOptions = Object.keys(modelData.storage || {});
        const colors = modelData.colors || [];
        
        // Get image from admin or database
        let imageUrl = modelData.image;
        if (typeof adminManager !== 'undefined') {
            const adminPhone = adminManager.phones.find(p => p.brand === 'Apple' && p.model === modelName);
            if (adminPhone && adminPhone.image) {
                imageUrl = adminPhone.image;
            }
        }
        
        card.innerHTML = `
            <div class="phone-image-container">
                <img src="${imageUrl || phoneAPI.getPhoneImage(modelName)}" alt="${modelName}" class="phone-image" loading="lazy" 
                     onerror="this.src='${phoneAPI.getPhoneImage(modelName)}'; this.onerror=function(){this.style.display='none';};">
            </div>
            <h4>${modelName}</h4>
            <div class="storage-options">
                ${storageOptions.slice(0, 4).map(s => `<span>${s}</span>`).join('')}
            </div>
            ${colors.length > 0 ? `
            <div class="color-options">
                ${colors.slice(0, 5).map(c => `<div class="color-dot" style="background: ${c.hex};" title="${c.name}"></div>`).join('')}
            </div>
            ` : ''}
        `;
        
        // Add click handler
        card.addEventListener('click', () => navigateToQuote(modelName));
        
        deviceGrid.appendChild(card);
    });
    
    console.log(`Loaded ${sortedModels.length} iPhone models dynamically`);
}

/**
 * Initialize phone images with local files
 */
function initializePhoneImages() {
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        const deviceIcon = card.querySelector('.device-icon');
        const deviceName = card.querySelector('h4')?.textContent?.trim();
        
        if (!deviceIcon || !deviceName) return;
        
        // Create phone image container
        const container = document.createElement('div');
        container.className = 'phone-image-container';
        
        const img = document.createElement('img');
        img.className = 'phone-image';
        img.alt = deviceName;
        img.loading = 'lazy';
        
        // Get image URL from our local mapping
        const imageUrl = phoneAPI.getPhoneImage(deviceName);
        
        // Fallback handler with multiple retries
        let retryCount = 0;
        img.onerror = function() {
            retryCount++;
            console.warn(`Image failed to load for ${deviceName}: ${imageUrl} (attempt ${retryCount})`);
            
            // Try to get from phoneDatabase if available
            if (retryCount === 1 && typeof phoneDatabase !== 'undefined') {
                for (const [brand, models] of Object.entries(phoneDatabase)) {
                    for (const [modelName, modelData] of Object.entries(models)) {
                        if (modelName === deviceName || deviceName.includes(modelName) || modelName.includes(deviceName.replace('Google ', ''))) {
                            if (modelData.image) {
                                console.log(`Found image in phoneDatabase: ${modelData.image}`);
                                this.src = modelData.image;
                                return;
                            }
                        }
                    }
                }
            }
            
            // Final fallback to placeholder
            if (retryCount >= 2) {
                this.src = generatePlaceholder(deviceName);
                this.style.objectFit = 'contain';
            }
        };
        
        img.onload = function() {
            this.style.opacity = '1';
            console.log(`Image loaded successfully for ${deviceName}`);
        };
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.src = imageUrl;
        
        container.appendChild(img);
        deviceIcon.replaceWith(container);
    });
}

/**
 * Initialize event handlers
 */
function initializeEventHandlers() {
    // Device card click handler
    document.querySelectorAll('.device-card').forEach(card => {
        card.addEventListener('click', function() {
            const deviceName = this.querySelector('h4')?.textContent?.trim();
            if (deviceName) {
                navigateToQuote(deviceName);
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Navigate to quote page with device info
 */
function navigateToQuote(phoneModel) {
    let brand = null;
    let model = phoneModel.trim();
    
    // Normalize model name and detect brand
    const modelLower = model.toLowerCase();
    
    // Detect brand first
    if (modelLower.includes('iphone') || modelLower.startsWith('iphone')) {
        brand = 'Apple';
    } else if (modelLower.includes('galaxy') || modelLower.includes('samsung')) {
        brand = 'Samsung';
    } else if (modelLower.includes('pixel') || modelLower.includes('google')) {
        brand = 'Google';
        // Remove "Google" prefix to match phoneDatabase format
        if (model.startsWith('Google ')) {
            model = model.replace('Google ', '');
        }
    } else if (modelLower.includes('oneplus')) {
        brand = 'OnePlus';
    } else if (modelLower.includes('xiaomi')) {
        brand = 'Xiaomi';
    } else if (modelLower.includes('oppo') || modelLower.includes('find x5')) {
        brand = 'OPPO';
        // Normalize OPPO model names - ensure "OPPO" prefix is present
        if (!model.startsWith('OPPO ') && modelLower.includes('find x5 pro')) {
            model = 'OPPO Find X5 Pro';
        } else if (!model.startsWith('OPPO ') && modelLower.includes('find x5')) {
            model = 'OPPO Find X5 Pro'; // Default to Pro if just "Find X5"
        }
    } else if (modelLower.includes('vivo')) {
        brand = 'Vivo';
    } else {
        // Default to Apple if unknown
        brand = 'Apple';
    }
    
    // Verify model exists in phoneDatabase
    if (typeof phoneDatabase !== 'undefined' && phoneDatabase[brand]) {
        // Check if exact model exists
        if (!phoneDatabase[brand][model]) {
            // Try to find closest match
            const availableModels = Object.keys(phoneDatabase[brand]);
            const foundModel = availableModels.find(m => 
                m.toLowerCase() === model.toLowerCase() ||
                model.toLowerCase().includes(m.toLowerCase()) ||
                m.toLowerCase().includes(model.toLowerCase())
            );
            if (foundModel) {
                model = foundModel;
            }
        }
    }
    
    // Navigate to quote.html for buyback (not product.html)
    const params = new URLSearchParams({ brand, model });
    console.log('Navigating to quote:', { brand, model });
    window.location.href = `quote.html?${params.toString()}`;
}

/**
 * Search device functionality
 */
function searchDevice(event) {
    event.preventDefault();
    const searchInput = document.getElementById('device-search');
    const searchTerm = searchInput?.value?.toLowerCase().trim();

    if (!searchTerm) return;

    const deviceCards = document.querySelectorAll('.device-card');
    let found = false;

    deviceCards.forEach(card => {
        const deviceName = card.querySelector('h4')?.textContent?.toLowerCase() || '';
        if (deviceName.includes(searchTerm)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.boxShadow = '0 0 25px rgba(201, 168, 76, 0.6)';
            card.style.borderColor = '#C9A84C';
            card.style.transform = 'scale(1.02)';

            setTimeout(() => {
                card.style.boxShadow = '';
                card.style.borderColor = '';
                card.style.transform = '';
            }, 3000);

            found = true;
        }
    });

    if (!found) {
        // Try to find matching model in phoneDatabase and redirect to new quote flow
        if (typeof phoneDatabase !== 'undefined') {
            console.log('🔍 Searching for model in phoneDatabase:', searchTerm);

            // Search in Apple models
            if (phoneDatabase.Apple) {
                for (const [modelName, modelData] of Object.entries(phoneDatabase.Apple)) {
                    if (modelName.toLowerCase().includes(searchTerm)) {
                        console.log('✅ Found Apple model:', modelName);
                        window.location.href = `quote.html?brand=Apple&model=${encodeURIComponent(modelName)}&type=used&direct=true`;
                        return;
                    }
                }
            }

            // Search in Samsung models
            if (phoneDatabase.Samsung) {
                for (const [modelName, modelData] of Object.entries(phoneDatabase.Samsung)) {
                    if (modelName.toLowerCase().includes(searchTerm)) {
                        console.log('✅ Found Samsung model:', modelName);
                        window.location.href = `quote.html?brand=Samsung&model=${encodeURIComponent(modelName)}&type=used&direct=true`;
                        return;
                    }
                }
            }

            console.log('⚠️ No exact match found, redirecting to sell-phones with search');
        }

        // If not found in phoneDatabase or phoneDatabase not available, redirect to sell-phones.html
        // The sell-phones.html search will show all matching models
        window.location.href = `sell-phones.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

/**
 * Search autocomplete/recommendations functionality
 */
function initializeSearchAutocomplete() {
    const searchInput = document.getElementById('device-search');
    if (!searchInput) return;

    // Create autocomplete dropdown
    const autocompleteDiv = document.createElement('div');
    autocompleteDiv.className = 'search-autocomplete';
    autocompleteDiv.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 8px 8px;
        max-height: 300px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;

    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(autocompleteDiv);

    // Get all device names for autocomplete
    const getAllDeviceNames = () => {
        const names = [];
        // From phoneImages object
        for (let name in phoneImages) {
            names.push(name);
        }
        return [...new Set(names)]; // Remove duplicates
    };

    const deviceNames = getAllDeviceNames();

    // Handle input
    searchInput.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase().trim();
        autocompleteDiv.innerHTML = '';

        if (!value) {
            autocompleteDiv.style.display = 'none';
            return;
        }

        // Filter matching devices
        const matches = deviceNames.filter(name =>
            name.toLowerCase().includes(value)
        ).slice(0, 8); // Limit to 8 results

        if (matches.length > 0) {
            autocompleteDiv.style.display = 'block';
            matches.forEach(match => {
                const div = document.createElement('div');
                div.style.cssText = `
                    padding: 12px 16px;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                    transition: background 0.2s ease;
                `;
                div.textContent = match;

                div.addEventListener('mouseover', function() {
                    this.style.background = '#f8f8f8';
                    this.style.color = '#C9A84C';
                });

                div.addEventListener('mouseout', function() {
                    this.style.background = 'white';
                    this.style.color = '#333';
                });

                div.addEventListener('click', function() {
                    searchInput.value = match;
                    autocompleteDiv.style.display = 'none';
                    searchDevice(new Event('submit'));
                });

                autocompleteDiv.appendChild(div);
            });
        } else {
            autocompleteDiv.style.display = 'none';
        }
    });

    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && !autocompleteDiv.contains(e.target)) {
            autocompleteDiv.style.display = 'none';
        }
    });
}

// Initialize autocomplete when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearchAutocomplete);
} else {
    initializeSearchAutocomplete();
}

/**
 * Fix dropdown menu functionality
 */
function initializeDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!toggle || !menu) return;

        // On mobile, make dropdown clickable
        if (window.innerWidth <= 768) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = menu.style.opacity === '1';

                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.opacity = '0';
                    m.style.visibility = 'hidden';
                });

                // Toggle current dropdown
                if (isVisible) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (window.innerWidth <= 768) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }
            });
        }
    });
}

// Initialize dropdown menu when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDropdownMenu);
} else {
    initializeDropdownMenu();
}

// ============================================================================
// EXPORT FOR GLOBAL ACCESS
// ============================================================================

/**
 * Initialize Buy Section with product-style cards
 */
function initializeBuySection() {
    // Wait for phoneDatabase to be available
    if (typeof phoneDatabase === 'undefined') {
        setTimeout(initializeBuySection, 100);
        return;
    }
    
    const container = document.getElementById('buy-device-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Iterate through brands
    Object.entries(phoneDatabase).forEach(([brand, models]) => {
        const brandSection = document.createElement('div');
        brandSection.className = 'brand-section';
        
        const brandTitle = document.createElement('h3');
        brandTitle.className = 'brand-title';
        brandTitle.textContent = brand;
        brandSection.appendChild(brandTitle);
        
        const deviceGrid = document.createElement('div');
        deviceGrid.className = 'device-grid';
        
        // Create cards for each model
        Object.entries(models).forEach(([modelName, modelData]) => {
            const card = createBuyDeviceCard(brand, modelName, modelData);
            deviceGrid.appendChild(card);
        });
        
        brandSection.appendChild(deviceGrid);
        container.appendChild(brandSection);
    });
}

/**
 * Create a buy device card with product page styling
 */
function createBuyDeviceCard(brand, modelName, modelData) {
    const card = document.createElement('div');
    card.className = 'device-card-buy';
    
    // Check admin data for buy prices and availability
    let minPrice = 0;
    let available = false;
    let totalStock = 0;
    
    if (typeof adminManager !== 'undefined') {
        const adminPhone = adminManager.phones.find(p => p.brand === brand && p.model === modelName);
        if (adminPhone && adminPhone.buyPrices) {
            // Find minimum price from available conditions
            const allPrices = [];
            Object.keys(adminPhone.buyPrices).forEach(storage => {
                Object.keys(adminPhone.buyPrices[storage]).forEach(condition => {
                    const qty = adminPhone.quantities?.[storage]?.[condition] || 0;
                    if (qty > 0) {
                        allPrices.push(adminPhone.buyPrices[storage][condition]);
                        totalStock += qty;
                        available = true;
                    }
                });
            });
            if (allPrices.length > 0) {
                minPrice = Math.min(...allPrices);
            }
        }
    }
    
    // Fallback to calculated price
    if (minPrice === 0) {
        const basePrice = modelData.basePrice || 0;
        const firstStorage = Object.keys(modelData.storage || {})[0];
        minPrice = basePrice + (modelData.storage[firstStorage] || 0);
    }
    
    const originalPrice = Math.round(minPrice * 1.2); // 20% markup for "original" price
    
    // Get image
    const imageUrl = modelData.image || phoneAPI.getPhoneImage(modelName);
    
    card.innerHTML = `
        <div class="phone-image-container">
            <img src="${imageUrl}" alt="${modelName}" class="phone-image" loading="lazy" 
                 onerror="this.src='${phoneAPI.getPhoneImage(modelName)}'; this.onerror=function(){this.style.display='none';};">
        </div>
        <h4>${modelName}</h4>
        <div class="storage-options">
            ${Object.keys(modelData.storage || {}).slice(0, 3).map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="device-price">
            <div class="price-from">From</div>
            <div class="price-amount">S$${minPrice.toLocaleString()}</div>
            <div class="price-original">S$${originalPrice.toLocaleString()}</div>
            ${available && totalStock > 0 ? `<div class="stock-info">${totalStock} in stock</div>` : ''}
            ${!available ? '<div class="out-of-stock-label">Out of Stock</div>' : ''}
            <button class="btn-buy" onclick="navigateToProduct('${brand}', '${modelName}')" ${!available ? 'disabled' : ''}>
                ${available ? 'Buy Now' : 'Out of Stock'}
            </button>
        </div>
    `;
    
    if (!available) {
        card.classList.add('out-of-stock-card');
    }
    
    return card;
}

window.phoneAPI = phoneAPI;
window.searchDevice = searchDevice;
window.searchDeviceBuy = searchDeviceBuy;
window.navigateToProduct = navigateToProduct;
window.phoneImages = phoneImages;

// ============================================================================
// DEVICE CARD CLICK HANDLERS FOR HOMEPAGE
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all device cards on homepage
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        // Skip if already has onclick
        if (card.onclick) return;

        card.style.cursor = 'pointer';

        card.addEventListener('click', function(e) {
            // Don't trigger if clicking a button inside
            if (e.target.tagName === 'BUTTON') return;

            // Get the model name from h4
            const modelName = this.querySelector('h4')?.textContent?.trim();
            if (!modelName) return;

            // Determine brand
            let brand = 'Apple';
            if (modelName.toLowerCase().includes('galaxy') ||
                modelName.toLowerCase().includes('samsung') ||
                modelName.toLowerCase().includes('note')) {
                brand = 'Samsung';
            }

            // Navigate to quote page
            window.location.href = `quote.html?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(modelName)}`;
        });
    });

    console.log(`Added click handlers to ${deviceCards.length} device cards`);

    // ============================================================================
    // MOBILE MENU TOGGLE
    // ============================================================================
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburgerMenu && navLinks && mobileOverlay) {
        // Toggle menu when hamburger is clicked
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when overlay is clicked
        mobileOverlay.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when a nav link is clicked
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================================================
    // GOOGLE REVIEWS LOADER
    // ============================================================================
    loadGoogleReviews();
});

/**
 * Load Google Reviews Widget
 * Using Elfsight Google Reviews Widget (Free option)
 * Alternative: Use Google Places API with your API key
 */
function loadGoogleReviews() {
    const widgetContainer = document.getElementById('google-reviews-widget');

    if (!widgetContainer) return;

    // Option 1: Elfsight Widget (Recommended - Easy Setup)
    // Visit: https://elfsight.com/google-reviews-widget/
    // Create free account, add your Google Business profile, get embed code

    const elfsightWidgetId = 'YOUR_ELFSIGHT_WIDGET_ID'; // Replace with your Elfsight widget ID

    if (elfsightWidgetId === 'YOUR_ELFSIGHT_WIDGET_ID') {
        // Show manual embed instructions if widget ID not configured
        showReviewsManualEmbed(widgetContainer);
    } else {
        // Load Elfsight widget
        const script = document.createElement('script');
        script.src = 'https://apps.elfsight.com/p/platform.js';
        script.defer = true;
        document.body.appendChild(script);

        widgetContainer.innerHTML = `<div class="elfsight-app-${elfsightWidgetId}"></div>`;
    }
}

/**
 * Display manual embed instructions and sample reviews
 */
function showReviewsManualEmbed(container) {
    // Create sample reviews structure with live Google Reviews link
    container.innerHTML = `
        <div class="reviews-grid">
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">J</div>
                    <div class="review-author-info">
                        <div class="review-author-name">John D.</div>
                        <div class="review-stars">
                            ${'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(5)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Excellent service! Got the best price for my iPhone. Quick and professional transaction.</div>
            </div>

            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">S</div>
                    <div class="review-author-info">
                        <div class="review-author-name">Sarah L.</div>
                        <div class="review-stars">
                            ${'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(5)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Very transparent pricing and friendly staff. Highly recommend IBOX Mobile for selling your phone!</div>
            </div>

            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">M</div>
                    <div class="review-author-info">
                        <div class="review-author-name">Michael T.</div>
                        <div class="review-stars">
                            ${'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(5)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Fast payment and great customer service. Got more than I expected for my Samsung!</div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
            <a href="https://g.page/r/CW-gP-cre887EAI/review" target="_blank" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                View All Google Reviews
            </a>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #C9A84C;">
            <h4 style="margin-bottom: 1rem; color: #1a1a1a;">🔧 Setup Live Reviews (3 Easy Options):</h4>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: #C9A84C;">Option 1: Elfsight Widget (Recommended - Free & Easy)</strong>
                <ol style="margin-top: 0.5rem; padding-left: 1.5rem; line-height: 1.8;">
                    <li>Visit <a href="https://elfsight.com/google-reviews-widget/" target="_blank" style="color: #C9A84C;">Elfsight Google Reviews</a></li>
                    <li>Create free account and connect your Google Business profile</li>
                    <li>Copy your Widget ID and replace 'YOUR_ELFSIGHT_WIDGET_ID' in script.js line 987</li>
                    <li>Reviews will auto-update daily!</li>
                </ol>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: #C9A84C;">Option 2: Embed Social (Free Tier Available)</strong>
                <ol style="margin-top: 0.5rem; padding-left: 1.5rem; line-height: 1.8;">
                    <li>Visit <a href="https://embedsocial.com/products/embedreviews/google-reviews-widget/" target="_blank" style="color: #C9A84C;">EmbedSocial</a></li>
                    <li>Connect Google Business and get embed code</li>
                    <li>Paste embed code into line 257 of index.html</li>
                </ol>
            </div>

            <div>
                <strong style="color: #C9A84C;">Option 3: Google Places API (For Developers)</strong>
                <ol style="margin-top: 0.5rem; padding-left: 1.5rem; line-height: 1.8;">
                    <li>Get Google Places API key from <a href="https://console.cloud.google.com/" target="_blank" style="color: #C9A84C;">Google Cloud Console</a></li>
                    <li>Your Place ID: CW-gP-cre887EAI</li>
                    <li>Implement custom fetch in loadGoogleReviews() function</li>
                </ol>
            </div>
        </div>
    `;

    // Style the star icons
    const starIcons = container.querySelectorAll('.review-stars svg');
    starIcons.forEach(star => {
        star.style.fill = '#fbbc04';
    });
}
