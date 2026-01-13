/**
 * iPhone Image Scraper Solution
 * Using APIs from https://github.com/cporter202/scraping-apis-for-devs
 * 
 * This script can be used to fetch high-quality iPhone images from various sources
 */

// Option 1: Using E-commerce Product Image Scraper API
// From the scraping-apis-for-devs repo: ecommerce-apis-147 folder
async function fetchiPhoneImageFromEcommerceAPI() {
    // Example using a product image scraper API
    const apiUrl = 'https://api.example-ecommerce-scraper.com/product-image';
    const productUrl = 'https://www.apple.com/sg/iphone-16-pro-max/';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: productUrl,
                imageType: 'hero',
                quality: 'high'
            })
        });
        
        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error('E-commerce API failed:', error);
        return null;
    }
}

// Option 2: Using GSMArena Scraper (if available in the repo)
async function fetchiPhoneImageFromGSMArena() {
    // GSMArena has high-quality product images
    const model = 'apple-iphone-16-pro-max';
    const imageUrl = `https://fdn2.gsmarena.com/vv/pics/apple/${model}-1.jpg`;
    
    try {
        const response = await fetch(imageUrl);
        if (response.ok) {
            return imageUrl;
        }
    } catch (error) {
        console.error('GSMArena fetch failed:', error);
    }
    return null;
}

// Option 3: Using Product Image Extractor API
// From scraping-apis-for-devs: developer-tools-apis-172 or automation-apis-218
async function extractProductImage(productPageUrl) {
    const extractorAPI = 'https://api.product-image-extractor.com/extract';
    
    try {
        const response = await fetch(extractorAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: productPageUrl,
                selectors: [
                    'img[alt*="iPhone 16 Pro Max"]',
                    '.hero-image img',
                    '.product-image img'
                ],
                quality: 'highest'
            })
        });
        
        const data = await response.json();
        return data.images[0]?.url || null;
    } catch (error) {
        console.error('Image extractor failed:', error);
        return null;
    }
}

// Main function to get best iPhone image
async function getBestiPhoneImage() {
    // Try multiple sources in order of preference
    const sources = [
        fetchiPhoneImageFromEcommerceAPI,
        fetchiPhoneImageFromGSMArena,
        () => extractProductImage('https://www.apple.com/sg/iphone-16-pro-max/')
    ];
    
    for (const source of sources) {
        const imageUrl = await source();
        if (imageUrl) {
            return imageUrl;
        }
    }
    
    // Fallback to local image
    return 'images/phones/iphone-16-pro-max-best.jpg';
}

// Usage: Update the hero image on page load
document.addEventListener('DOMContentLoaded', async function() {
    const heroImage = document.querySelector('.featured-phone-image');
    if (heroImage) {
        const bestImageUrl = await getBestiPhoneImage();
        heroImage.src = bestImageUrl;
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getBestiPhoneImage, fetchiPhoneImageFromGSMArena };
}
