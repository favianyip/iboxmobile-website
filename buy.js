/**
 * Buy Refurbished Page JavaScript
 * Displays all available refurbished phones with filtering and search
 */

let allProducts = [];
let filteredProducts = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeFilters();
    initializeSearch();
});

/**
 * Load products from admin data
 */
function loadProducts() {
    console.log('Loading products...');
    
    allProducts = [];
    
    // Try to get phones from various sources
    let phones = [];
    
    // First try adminManager
    if (typeof adminManager !== 'undefined' && adminManager.phones && adminManager.phones.length > 0) {
        phones = adminManager.phones;
        console.log('Loaded', phones.length, 'phones from adminManager');
    } 
    // Then try localStorage directly
    else {
        const stored = localStorage.getItem('ktmobile_phones');
        if (stored) {
            try {
                phones = JSON.parse(stored);
                console.log('Loaded', phones.length, 'phones from localStorage');
            } catch (e) {
                console.error('Failed to parse stored phones:', e);
            }
        }
    }
    
    console.log('Processing', phones.length, 'phones for products...');
    
    phones.forEach(phone => {
        console.log('Phone:', phone.model, 'display:', phone.display, 'buyPrices:', phone.buyPrices ? Object.keys(phone.buyPrices).length : 'none');
        
        // Only show phones that are set to display (if display toggle exists)
        if (phone.display === false) {
            console.log('  Skipped - display is false');
            return; // Skip hidden phones
        }
        
        // Check if phone has buy prices configured
        if (!phone.buyPrices || Object.keys(phone.buyPrices).length === 0) {
            console.log('  Skipped - no buyPrices');
            return; // Skip phones without buy prices
        }
        
        // Create a product entry for each storage/condition combination
        Object.keys(phone.buyPrices).forEach(storage => {
            const prices = phone.buyPrices[storage];
            const quantities = phone.quantities?.[storage] || {};
            
            Object.keys(prices).forEach(condition => {
                const price = prices[condition];
                const quantity = quantities[condition] || 0;
                
                // Create product variant
                const product = {
                    id: `${phone.id}-${storage}-${condition}`,
                    brand: phone.brand,
                    model: phone.model,
                    storage: storage,
                    condition: condition,
                    price: price,
                    quantity: quantity,
                    available: quantity > 0,
                    image: phone.image,
                    colors: phone.colors || [],
                    display: phone.display !== false // Default to true if not set
                };
                
                allProducts.push(product);
            });
        });
    });
    
    console.log('Total products created from phones:', allProducts.length);
    
    // If no admin data, fallback to phoneDatabase
    if (allProducts.length === 0 && typeof phoneDatabase !== 'undefined') {
        Object.entries(phoneDatabase).forEach(([brand, models]) => {
            Object.entries(models).forEach(([model, data]) => {
                Object.keys(data.storage || {}).forEach(storage => {
                    const basePrice = data.basePrice + (data.storage[storage] || 0);
                    
                    ['excellent', 'good', 'fair'].forEach(condition => {
                        const conditionModifiers = {
                            'excellent': 0,
                            'good': -50,
                            'fair': -150
                        };
                        
                        const product = {
                            id: `${brand}-${model}-${storage}-${condition}`,
                            brand: brand,
                            model: model,
                            storage: storage,
                            condition: condition,
                            price: basePrice + conditionModifiers[condition],
                            quantity: 0,
                            available: false,
                            image: data.image,
                            colors: data.colors || [],
                            display: true
                        };
                        
                        allProducts.push(product);
                    });
                });
            });
        });
    }
    
    filteredProducts = [...allProducts];
    renderProducts();
    updateResultsCount();
    populateBrandFilter();
}

/**
 * Render products to grid
 */
function renderProducts() {
    console.log('renderProducts called, filteredProducts:', filteredProducts.length);
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    console.log('Grid element:', grid ? 'found' : 'NOT FOUND');
    console.log('NoResults element:', noResults ? 'found' : 'NOT FOUND');
    
    if (!grid) {
        console.error('productsGrid element not found!');
        return;
    }
    
    grid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Group products by brand and model
    const groupedProducts = {};
    
    filteredProducts.forEach(product => {
        const key = `${product.brand}-${product.model}`;
        if (!groupedProducts[key]) {
            groupedProducts[key] = {
                brand: product.brand,
                model: product.model,
                image: product.image,
                variants: []
            };
        }
        groupedProducts[key].variants.push(product);
    });
    
    console.log('Grouped products count:', Object.keys(groupedProducts).length);
    
    // Create cards for each unique model
    let cardCount = 0;
    Object.values(groupedProducts).forEach(group => {
        // Find minimum price and total stock
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const totalStock = group.variants.reduce((sum, v) => sum + v.quantity, 0);
        const available = totalStock > 0;
        
        console.log('Creating card for:', group.model, 'price:', minPrice);
        const card = createProductCard(group, minPrice, totalStock, available);
        grid.appendChild(card);
        cardCount++;
    });
    
    console.log('Total cards created:', cardCount);
    console.log('Grid children count:', grid.children.length);
}

/**
 * Create product card element
 */
function createProductCard(group, minPrice, totalStock, available) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Get first available variant for link
    const firstVariant = group.variants.find(v => v.available) || group.variants[0];
    
    card.addEventListener('click', () => {
        window.location.href = `product.html?brand=${encodeURIComponent(group.brand)}&model=${encodeURIComponent(group.model)}`;
    });
    
    const storages = [...new Set(group.variants.map(v => v.storage))].join(', ');
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${group.image}" alt="${group.model}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'200\\' height=\\'200\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23999\\' font-family=\\'sans-serif\\' font-size=\\'14\\'%3E${group.model}%3C/text%3E%3C/svg%3E';">
            ${available ? '<div class="product-badge">In Stock</div>' : '<div class="product-badge" style="background: #EF4444;">Out of Stock</div>'}
        </div>
        <div class="product-info">
            <div class="product-brand">${group.brand}</div>
            <div class="product-title">${group.model}</div>
            <div class="product-storage">${storages}</div>
            <div class="product-price">From S$${minPrice.toLocaleString()}</div>
            <div class="product-price-label">Refurbished</div>
            <div class="product-stock ${available ? 'available' : 'out-of-stock'}">
                ${available ? `${totalStock} available` : 'Out of Stock'}
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Initialize filters
 */
function initializeFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const storageFilter = document.getElementById('storageFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    
    if (brandFilter) {
        brandFilter.addEventListener('change', applyFilters);
    }
    
    if (storageFilter) {
        storageFilter.addEventListener('change', applyFilters);
    }
    
    if (conditionFilter) {
        conditionFilter.addEventListener('change', applyFilters);
    }
    
    if (availabilityFilter) {
        availabilityFilter.addEventListener('change', applyFilters);
    }
}

/**
 * Populate brand filter
 */
function populateBrandFilter() {
    const brandFilter = document.getElementById('brandFilter');
    if (!brandFilter) return;
    
    const brands = [...new Set(allProducts.map(p => p.brand))].sort();
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

/**
 * Initialize search
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }
}

/**
 * Apply all filters
 */
function applyFilters() {
    const brandFilter = document.getElementById('brandFilter')?.value || '';
    const storageFilter = document.getElementById('storageFilter')?.value || '';
    const conditionFilter = document.getElementById('conditionFilter')?.value || '';
    const availabilityFilter = document.getElementById('availabilityFilter')?.value || '';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    filteredProducts = allProducts.filter(product => {
        // Brand filter
        if (brandFilter && product.brand !== brandFilter) {
            return false;
        }
        
        // Storage filter
        if (storageFilter && product.storage !== storageFilter) {
            return false;
        }
        
        // Condition filter
        if (conditionFilter && product.condition !== conditionFilter) {
            return false;
        }
        
        // Availability filter
        if (availabilityFilter === 'in-stock' && !product.available) {
            return false;
        }
        if (availabilityFilter === 'out-of-stock' && product.available) {
            return false;
        }
        
        // Search filter
        if (searchInput) {
            const searchTerm = searchInput.toLowerCase();
            if (!product.model.toLowerCase().includes(searchTerm) &&
                !product.brand.toLowerCase().includes(searchTerm)) {
                return false;
            }
        }
        
        // Display filter (only show products that are set to display)
        if (product.display === false) {
            return false;
        }
        
        return true;
    });
    
    renderProducts();
    updateResultsCount();
}

/**
 * Update results count
 */
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const uniqueModels = new Set(filteredProducts.map(p => `${p.brand}-${p.model}`)).size;
        resultsCount.textContent = `Showing ${uniqueModels} product${uniqueModels !== 1 ? 's' : ''} (${filteredProducts.length} variant${filteredProducts.length !== 1 ? 's' : ''})`;
    }
}
