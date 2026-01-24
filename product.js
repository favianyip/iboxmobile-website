/**
 * Product Page JavaScript
 * Handles product display, variant selection, and pricing
 */

// Product state
let productState = {
    brand: null,
    model: null,
    color: null,
    storage: null,
    condition: 'excellent',
    extendedWarranty: false,
    warrantyMonths: 0,
    batteryUpgrade: false,
    currentPrice: 0,
    basePrice: 0
};

// Condition descriptions (CompAsia style)
const conditionDescriptions = {
    excellent: {
        screen: "Scratches that are barely noticeable when the screen is on",
        body: "Minor signs of wear such as minor scratches and stains, along with possible minor dents/dings, not noticeable from 1 arm distance",
        expectation: "Expected to have subtle signs of use, barely noticeable during normal use.",
        note: "*this is a worst case scenario for this grade"
    },
    good: {
        screen: "Minor but visible scratches that are barely noticeable if you turn on the screen",
        body: "Visible scratches, and stains, along with possible visible dents/dings on the body",
        expectation: "Visible signs of use, fully functional with slight cosmetic imperfections.",
        note: "*this is a worst case scenario for this grade"
    },
    fair: {
        screen: "Prominent scratches on the screen. Visibility of the screen is not affected.",
        body: "Noticeable scratches, visible spots upon close inspection. Possible discoloration, dents and dings on the body.",
        expectation: "Visibly used but fully functional. Cost-saving despite cosmetic imperfections.",
        note: "*this is a worst case scenario for this grade"
    }
};

// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
    initializeProduct();
    initializeTabs();
    initializeWarranty();
    initializeBatteryUpgrade();
    initializeFinancing();
    initializeBuybackLink();
});

/**
 * Initialize product from URL parameters
 */
function initializeProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand') || 'Apple';
    const model = urlParams.get('model') || 'iPhone 16 Pro Max';
    
    productState.brand = brand;
    productState.model = model;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-brand').textContent = brand;
    document.getElementById('breadcrumb-model').textContent = model;
    
    // Load product data
    loadProductData(brand, model);
}

/**
 * Load product data from admin data or phoneDatabase
 */
function loadProductData(brand, model) {
    // Try to load from admin data first (for buy prices and quantities)
    let product = null;
    let adminPhone = null;
    
    if (typeof adminManager !== 'undefined') {
        adminPhone = adminManager.phones.find(p => p.brand === brand && p.model === model);
    }
    
    // Fallback to phoneDatabase
    if (!adminPhone && typeof phoneDatabase !== 'undefined' && phoneDatabase[brand] && phoneDatabase[brand][model]) {
        product = phoneDatabase[brand][model];
    } else if (adminPhone) {
        // Use admin phone data
        product = {
            image: adminPhone.image,
            colors: adminPhone.colors || [],
            storage: {},
            basePrice: adminPhone.basePrice || 0
        };
        
        // Convert storages to storage object
        adminPhone.storages.forEach(storage => {
            product.storage[storage] = (adminPhone.storagePrices?.[storage] || adminPhone.basePrice) - adminPhone.basePrice;
        });
    }
    
    if (!product) {
        console.error('Product not found:', brand, model);
        return;
    }
    
    // Set product title
    document.getElementById('productTitle').textContent = model;
    
    // Set product image
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = product.image;
    mainImage.alt = model;
    
    // Generate thumbnails
    generateThumbnails(product.image);
    
    // Store admin phone for buy prices
    productState.adminPhone = adminPhone;
    
    // Set base price
    productState.basePrice = product.basePrice || 0;
    
    // Populate color options
    populateColorOptions(product.colors || []);
    
    // Populate storage options (with buy prices if available)
    populateStorageOptions(product.storage || {}, adminPhone);
    
    // Set default selections
    if (product.colors && product.colors.length > 0) {
        productState.color = typeof product.colors[0] === 'string' ? product.colors[0] : product.colors[0].name;
    }
    
    if (Object.keys(product.storage || {}).length > 0) {
        productState.storage = Object.keys(product.storage)[0];
    }
    
    // Populate condition options with prices and availability
    // This will be called after storage is selected
    setTimeout(() => {
        populateConditionOptions();
        calculatePrice();
    }, 100);
    
    // Update selected variant display
    updateSelectedVariant();
    
    // Load specifications
    loadSpecifications(brand, model);
    
    // Load reviews
    loadReviews();
    
    // Load related products
    loadRelatedProducts(brand, model);
}

/**
 * Generate thumbnail gallery
 */
function generateThumbnails(mainImageSrc) {
    const gallery = document.getElementById('thumbnailGallery');
    gallery.innerHTML = '';
    
    // For now, use the same image as thumbnail
    // In production, you'd have multiple product images
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail-item active';
    thumbnail.innerHTML = `<img src="${mainImageSrc}" alt="Thumbnail">`;
    thumbnail.addEventListener('click', () => {
        document.getElementById('mainProductImage').src = mainImageSrc;
        document.querySelectorAll('.thumbnail-item').forEach(item => item.classList.remove('active'));
        thumbnail.classList.add('active');
    });
    gallery.appendChild(thumbnail);
}

/**
 * Populate color options
 */
function populateColorOptions(colors) {
    const container = document.getElementById('colorOptions');
    container.innerHTML = '';
    
    colors.forEach(color => {
        const colorName = typeof color === 'string' ? color : color.name;
        const colorHex = typeof color === 'string' ? '#000000' : color.hex;
        
        const btn = document.createElement('button');
        btn.className = 'variant-btn color-btn';
        btn.dataset.color = colorName;
        btn.innerHTML = `<span class="color-swatch" style="background: ${colorHex}; border: 2px solid ${colorHex === '#FFFFFF' || colorHex === '#F5F5F0' ? 'rgba(0,0,0,0.2)' : 'transparent'}"></span>`;
        
        if (colorName === productState.color) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            productState.color = colorName;
            updateSelectedVariant();
        });
        
        container.appendChild(btn);
    });
}

/**
 * Populate condition options with prices and availability (CompAsia style)
 */
function populateConditionOptions() {
    const container = document.getElementById('conditionOptions');
    if (!container) return;
    
    const adminPhone = productState.adminPhone;
    const storage = productState.storage;
    
    if (!adminPhone || !adminPhone.buyPrices || !adminPhone.buyPrices[storage]) {
        // Use default conditions if no admin data
        return;
    }
    
    const prices = adminPhone.buyPrices[storage];
    const quantities = adminPhone.quantities?.[storage] || {};
    const conditions = ['excellent', 'good', 'fair'];
    
    container.innerHTML = '';
    
    conditions.forEach(condition => {
        const price = prices[condition] || 0;
        const quantity = quantities[condition] || 0;
        const available = quantity > 0;
        const desc = conditionDescriptions[condition];
        
        const btn = document.createElement('button');
        btn.className = `variant-btn ${!available ? 'out-of-stock' : ''}`;
        btn.dataset.condition = condition;
        btn.disabled = !available;
        
        btn.innerHTML = `
            <span class="condition-badge ${condition}">${condition.charAt(0).toUpperCase() + condition.slice(1)}</span>
            <span class="condition-price">S$${price.toLocaleString()}</span>
            ${available ? `<span class="stock-badge">${quantity} available</span>` : '<span class="out-of-stock-badge">Out of Stock</span>'}
        `;
        
        if (condition === productState.condition && available) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            container.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            productState.condition = condition;
            showConditionDetails(condition);
            calculatePrice();
            updateSelectedVariant();
        });
        
        // Show details on hover
        btn.addEventListener('mouseenter', () => {
            showConditionDetails(condition);
        });
        
        container.appendChild(btn);
    });
    
    // Show details for selected condition
    if (productState.condition) {
        showConditionDetails(productState.condition);
    }
}

/**
 * Show condition details (CompAsia style)
 */
function showConditionDetails(condition) {
    const detailsContainer = document.getElementById('conditionDetails');
    if (!detailsContainer) return;
    
    const desc = conditionDescriptions[condition];
    if (!desc) return;
    
    detailsContainer.innerHTML = `
        <h4>Screen</h4>
        <p>${desc.screen}</p>
        <h4>Body</h4>
        <p>${desc.body}</p>
        <p class="condition-note">${desc.note}</p>
        <p class="condition-expectation">Expectation: ${desc.expectation}</p>
    `;
    detailsContainer.classList.add('active');
}

/**
 * Populate storage options with buy prices
 */
function populateStorageOptions(storageOptions, adminPhone) {
    const container = document.getElementById('storageOptions');
    container.innerHTML = '';
    
    Object.keys(storageOptions).forEach(storage => {
        const modifier = storageOptions[storage];
        const basePrice = productState.basePrice + modifier;
        
        const btn = document.createElement('button');
        btn.className = 'variant-btn';
        btn.dataset.storage = storage;
        btn.dataset.modifier = modifier;
        
        // Check availability from admin data
        let available = false;
        let minPrice = basePrice;
        if (adminPhone && adminPhone.buyPrices && adminPhone.buyPrices[storage]) {
            const prices = adminPhone.buyPrices[storage];
            const quantities = adminPhone.quantities?.[storage] || {};
            
            // Check if any condition is available
            available = Object.keys(prices).some(condition => 
                (quantities[condition] || 0) > 0
            );
            
            // Get minimum price from available conditions
            const availablePrices = Object.keys(prices)
                .filter(condition => (quantities[condition] || 0) > 0)
                .map(condition => prices[condition]);
            if (availablePrices.length > 0) {
                minPrice = Math.min(...availablePrices);
            }
        }
        
        btn.innerHTML = `
            <span>${storage}</span>
            ${adminPhone ? `<span class="storage-price-hint">From S$${minPrice.toLocaleString()}</span>` : ''}
            ${!available && adminPhone ? '<span class="out-of-stock-badge">Out of Stock</span>' : ''}
        `;
        
        if (storage === productState.storage) {
            btn.classList.add('selected');
        }
        
        if (!available && adminPhone) {
            btn.classList.add('out-of-stock');
            btn.disabled = true;
        }
        
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            document.querySelectorAll('#storageOptions .variant-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            productState.storage = storage;
            // Repopulate condition options for new storage
            populateConditionOptions();
            calculatePrice();
            updateSelectedVariant();
        });
        
        container.appendChild(btn);
    });
}

/**
 * Calculate current price based on selections
 */
function calculatePrice() {
    const adminPhone = productState.adminPhone;
    const storage = productState.storage;
    const condition = productState.condition;
    
    let price = 0;
    
    // Use buy prices from admin if available
    if (adminPhone && adminPhone.buyPrices && adminPhone.buyPrices[storage] && adminPhone.buyPrices[storage][condition]) {
        price = adminPhone.buyPrices[storage][condition];
    } else {
        // Fallback to calculated price
        const product = phoneDatabase[productState.brand][productState.model];
        price = productState.basePrice;
        
        // Add storage modifier
        if (productState.storage && product.storage[productState.storage] !== undefined) {
            price += product.storage[productState.storage];
        }
        
        // Add condition modifier from admin settings
        const adminModifiers = JSON.parse(localStorage.getItem('ktmobile_condition_modifiers') || '{}');
        const conditionModifiers = {
            'excellent': adminModifiers.refurbCondition?.excellent || 0,
            'good': adminModifiers.refurbCondition?.good || -50,
            'fair': adminModifiers.refurbCondition?.fair || -150
        };
        price += conditionModifiers[productState.condition] || 0;
    }
    
    // Add warranty
    if (productState.extendedWarranty) {
        if (productState.warrantyMonths === 12) {
            price += 99;
        } else if (productState.warrantyMonths === 24) {
            price += 179;
        }
    }
    
    // Add battery upgrade
    if (productState.batteryUpgrade) {
        price += 89;
    }
    
    productState.currentPrice = Math.max(0, price);
    
    // Update price display
    updatePriceDisplay();
    
    // Update availability status
    updateAvailabilityStatus();
    
    // Update financing
    updateFinancing();
}

/**
 * Update selected variant display
 */
function updateSelectedVariant() {
    const selectedVariantEl = document.getElementById('selectedVariant');
    if (!selectedVariantEl) return;
    
    selectedVariantEl.innerHTML = `
        <span id="selectedColor">${productState.color || 'Not selected'}</span> | 
        <span id="selectedStorage">${productState.storage || 'Not selected'}</span> | 
        <span id="selectedCondition">${productState.condition.charAt(0).toUpperCase() + productState.condition.slice(1)}</span>
        <span class="quantity-text" id="quantityText"></span>
    `;
    
    // Update quantity text
    updateAvailabilityStatus();
}

/**
 * Update availability status
 */
function updateAvailabilityStatus() {
    const adminPhone = productState.adminPhone;
    const storage = productState.storage;
    const condition = productState.condition;
    const buyNowBtn = document.getElementById('buyNowBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const notifyMeBtn = document.getElementById('notifyMeBtn');
    
    let available = false;
    let quantity = 0;
    
    if (adminPhone && adminPhone.quantities && adminPhone.quantities[storage] && adminPhone.quantities[storage][condition]) {
        quantity = adminPhone.quantities[storage][condition] || 0;
        available = quantity > 0;
    }
    
    if (buyNowBtn) {
        buyNowBtn.disabled = !available;
        buyNowBtn.style.display = available ? 'flex' : 'none';
        buyNowBtn.textContent = 'Buy Now';
    }
    
    if (addToCartBtn) {
        addToCartBtn.disabled = !available;
        addToCartBtn.style.display = available ? 'flex' : 'none';
        addToCartBtn.textContent = 'Add to Cart';
    }
    
    // Show "Notify Me" button when out of stock
    if (notifyMeBtn) {
        notifyMeBtn.style.display = !available ? 'flex' : 'none';
        notifyMeBtn.addEventListener('click', () => {
            handleNotifyMe();
        });
    }
    
    // Show quantity if available
    const quantityTextEl = document.getElementById('quantityText');
    if (quantityTextEl) {
        if (available) {
            quantityTextEl.textContent = `(${quantity} available)`;
            quantityTextEl.style.display = 'inline';
        } else {
            quantityTextEl.style.display = 'none';
        }
    }
}

/**
 * Handle "Notify Me" functionality
 */
function handleNotifyMe() {
    const email = prompt('Enter your email to be notified when this product is back in stock:');
    if (email && email.includes('@')) {
        // Store notification request (in production, send to backend)
        const notifications = JSON.parse(localStorage.getItem('ktmobile_notifications') || '[]');
        notifications.push({
            brand: productState.brand,
            model: productState.model,
            storage: productState.storage,
            condition: productState.condition,
            email: email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('ktmobile_notifications', JSON.stringify(notifications));
        alert('Thank you! We will notify you when this product is back in stock.');
    }
}

/**
 * Update price display
 */
function updatePriceDisplay() {
    const currentPriceEl = document.getElementById('currentPrice');
    const originalPriceEl = document.getElementById('originalPrice');
    
    // Calculate original price (base + storage, no condition discount)
    const product = phoneDatabase[productState.brand][productState.model];
    let originalPrice = productState.basePrice;
    if (productState.storage && product.storage[productState.storage] !== undefined) {
        originalPrice += product.storage[productState.storage];
    }
    
    currentPriceEl.textContent = `S$${productState.currentPrice.toLocaleString()}`;
    originalPriceEl.textContent = `S$${originalPrice.toLocaleString()}`;
    
    const saveAmount = originalPrice - productState.currentPrice;
    if (saveAmount > 0) {
        document.querySelector('.price-save').textContent = `Save up to S$${saveAmount}`;
    }
}

// Condition buttons are now handled in populateConditionOptions()
// updateSelectedVariant() is defined above

/**
 * Initialize tabs
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

/**
 * Initialize warranty radio buttons
 */
function initializeWarranty() {
    const warranty12 = document.getElementById('extendedWarranty');
    const warranty24 = document.getElementById('extendedWarranty24');
    
    if (warranty12) {
        warranty12.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (warranty24) warranty24.checked = false;
                productState.extendedWarranty = true;
                productState.warrantyMonths = 12;
            } else {
                productState.extendedWarranty = false;
                productState.warrantyMonths = 0;
            }
            calculatePrice();
        });
    }
    
    if (warranty24) {
        warranty24.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (warranty12) warranty12.checked = false;
                productState.extendedWarranty = true;
                productState.warrantyMonths = 24;
            } else {
                productState.extendedWarranty = false;
                productState.warrantyMonths = 0;
            }
            calculatePrice();
        });
    }
}

/**
 * Initialize battery upgrade checkbox
 */
function initializeBatteryUpgrade() {
    const batteryCheckbox = document.getElementById('batteryUpgrade');
    if (batteryCheckbox) {
        batteryCheckbox.addEventListener('change', (e) => {
            productState.batteryUpgrade = e.target.checked;
            calculatePrice();
        });
    }
}

/**
 * Initialize financing display
 */
function initializeFinancing() {
    // Financing will be updated via updateFinancing()
}

/**
 * Update financing display
 */
function updateFinancing() {
    const financingSection = document.getElementById('financingSection');
    const installmentCount = document.getElementById('installmentCount');
    const installmentPrice = document.getElementById('installmentPrice');
    
    if (!financingSection || !installmentCount || !installmentPrice) return;
    
    const totalPrice = productState.currentPrice;
    const installments = 4;
    const installmentAmount = Math.round(totalPrice / installments);
    
    installmentCount.textContent = installments;
    installmentPrice.textContent = `S$${installmentAmount.toLocaleString()}`;
}

/**
 * Initialize buyback link
 */
function initializeBuybackLink() {
    const sellLink = document.getElementById('sellPhoneLink');
    if (sellLink) {
        sellLink.addEventListener('click', (e) => {
            e.preventDefault();
            const params = new URLSearchParams({
                brand: productState.brand,
                model: productState.model
            });
            window.location.href = `quote.html?${params.toString()}`;
        });
    }
}

/**
 * Load product specifications (with scraping API integration)
 */
async function loadSpecifications(brand, model) {
    const specsContent = document.getElementById('specsContent');
    
    // Try to fetch from scraping API first
    try {
        const scrapedSpecs = await fetchProductSpecs(brand, model);
        if (scrapedSpecs) {
            renderSpecifications(scrapedSpecs);
            return;
        }
    } catch (error) {
        console.log('Scraping API unavailable, using fallback specs');
    }
    
    // Fallback to local specifications
    const specs = {
        'iPhone 16 Pro Max': {
            'Display': {
                'Screen Size': '6.9 inches',
                'Resolution': '2796 x 1290 pixels',
                'Technology': 'Super Retina XDR OLED'
            },
            'Processor': {
                'Chipset': 'Apple A18 Pro',
                'CPU': '6-core (2x3.4 GHz + 4x2.42 GHz)',
                'GPU': 'Apple GPU (6-core graphics)'
            },
            'Camera': {
                'Rear Camera': '48 MP, f/1.8, 24mm (wide), 1/1.28", 1.22µm, dual pixel PDAF, sensor-shift OIS',
                'Telephoto': '12 MP, f/2.8, 120mm (periscope telephoto), 5x optical zoom',
                'Ultrawide': '48 MP, f/2.2, 13mm (ultrawide)',
                'Front Camera': '12 MP, f/1.9, 23mm (wide), 1/3.6", 1.0µm, PDAF, OIS'
            },
            'Battery': {
                'Capacity': 'Not specified',
                'Charging': 'Fast charging, Wireless charging',
                'Battery Health': '80% minimum'
            },
            'Storage': {
                'Options': '256GB, 512GB, 1TB'
            }
        }
    };
    
    const modelSpecs = specs[model] || specs['iPhone 16 Pro Max'];
    renderSpecifications(modelSpecs);
}

/**
 * Render specifications to DOM
 */
function renderSpecifications(specs) {
    const specsContent = document.getElementById('specsContent');
    if (!specsContent) return;
    
    specsContent.innerHTML = '';
    
    Object.entries(specs).forEach(([category, items]) => {
        const specGroup = document.createElement('div');
        specGroup.className = 'spec-group';
        specGroup.innerHTML = `<h4>${category}</h4>`;
        
        Object.entries(items).forEach(([label, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${label}</span>
                <span class="spec-value">${value}</span>
            `;
            specGroup.appendChild(specItem);
        });
        
        specsContent.appendChild(specGroup);
    });
}

/**
 * Fetch product specifications using scraping API
 * Uses APIs from https://github.com/cporter202/scraping-apis-for-devs
 */
async function fetchProductSpecs(brand, model) {
    // Example: Using GSMArena scraping API pattern
    // In production, integrate with actual scraping APIs from the repository
    try {
        // Construct GSMArena URL for product page
        const modelSlug = model.toLowerCase().replace(/\s+/g, '-');
        const brandSlug = brand.toLowerCase();
        const gsmArenaUrl = `https://www.gsmarena.com/${brandSlug}_${modelSlug}-pics.php`;
        
        // Note: Direct scraping requires CORS proxy or backend API
        // For now, return null to use fallback specs
        // In production, implement backend endpoint that uses scraping APIs
        
        return null;
    } catch (error) {
        console.error('Error fetching specs:', error);
        return null;
    }
}

/**
 * Load customer reviews
 */
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    
    // Sample reviews - in production, this would come from a database
    const reviews = [
        {
            author: 'Kok Su Fong',
            rating: 5,
            text: '1st time buying from KT Mobile very happy with purchase. Device in pristine condition!'
        },
        {
            author: 'Sazman Osman',
            rating: 5,
            text: 'Very good service and product quality.'
        },
        {
            author: 'Danial Ismail',
            rating: 5,
            text: 'Great price and fast delivery. Highly recommended!'
        },
        {
            author: 'Jeff Ng',
            rating: 4,
            text: 'The device was delivered as expected. Battery health could be better but overall satisfied.'
        },
        {
            author: 'Zin Min',
            rating: 5,
            text: 'Product received very well. Worth buying. Hope to order again soon.'
        }
    ];
    
    reviewsList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="review-author">${review.author}</div>
                <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <div class="review-text">${review.text}</div>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

/**
 * Load related products
 */
function loadRelatedProducts(brand, model) {
    const relatedGrid = document.getElementById('relatedProducts');
    
    if (typeof phoneDatabase === 'undefined' || !phoneDatabase[brand]) {
        return;
    }
    
    const models = Object.keys(phoneDatabase[brand]);
    const relatedModels = models.filter(m => m !== model).slice(0, 4);
    
    relatedGrid.innerHTML = '';
    
    relatedModels.forEach(relatedModel => {
        const product = phoneDatabase[brand][relatedModel];
        const card = document.createElement('div');
        card.className = 'related-product-card';
        card.addEventListener('click', () => {
            window.location.href = `product.html?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(relatedModel)}`;
        });
        
        const basePrice = product.basePrice || 0;
        const firstStorage = Object.keys(product.storage || {})[0];
        const price = basePrice + (product.storage[firstStorage] || 0);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${relatedModel}" class="related-product-image">
            <div class="related-product-info">
                <div class="related-product-title">${relatedModel}</div>
                <div class="related-product-price">From S$${price.toLocaleString()}</div>
            </div>
        `;
        
        relatedGrid.appendChild(card);
    });
}

/**
 * Buy Now button handler
 */
document.getElementById('buyNowBtn').addEventListener('click', () => {
    if (!productState.color || !productState.storage) {
        alert('Please select color and storage options');
        return;
    }
    
    // Redirect to quote page with pre-filled data
    const params = new URLSearchParams({
        brand: productState.brand,
        model: productState.model,
        storage: productState.storage,
        color: productState.color,
        condition: productState.condition
    });
    
    window.location.href = `quote.html?${params.toString()}`;
});

/**
 * Add to Cart button handler
 */
document.getElementById('addToCartBtn').addEventListener('click', () => {
    if (!productState.color || !productState.storage) {
        alert('Please select color and storage options');
        return;
    }
    
    // In production, this would add to cart
    alert(`Added to cart: ${productState.model} - ${productState.color} - ${productState.storage} - ${productState.condition} - S$${productState.currentPrice.toLocaleString()}`);
    
    // Store in localStorage for cart functionality
    const cart = JSON.parse(localStorage.getItem('ktmobile_cart') || '[]');
    cart.push({
        brand: productState.brand,
        model: productState.model,
        color: productState.color,
        storage: productState.storage,
        condition: productState.condition,
        price: productState.currentPrice,
        warranty: productState.warrantyMonths,
        image: phoneDatabase[productState.brand][productState.model].image
    });
    localStorage.setItem('ktmobile_cart', JSON.stringify(cart));
});
