/**
 * INITIALIZE DATABASE FROM EXCEL REFERENCE
 * =========================================
 * This script helps initialize the price database with data
 * based on your Excel files structure
 *
 * Run this ONCE in admin panel to populate initial data
 * Then use admin UI to manage everything
 */

function initializeDatabaseFromExcelReference() {
    console.log('🔄 Initializing database with reference data...');

    // Get database instance
    const db = window.priceDB;
    if (!db) {
        console.error('❌ Price database not loaded!');
        alert('Error: Price database system not loaded. Please refresh the page.');
        return;
    }

    // Sample data based on your Excel files
    // In production, you'll add ALL your phones through admin UI
    const samplePhones = [
        // Apple iPhones
        {
            id: 'apple-iphone-17-pro-max',
            brand: 'Apple',
            model: 'iPhone 17 Pro Max',
            image: 'images/phones/iphone-16-pro-max.jpg',
            basePrice: 1520,  // USED price for 256GB
            storage: {
                '256GB': 0,
                '512GB': 230,
                '1TB': 400,
                '2TB': 550
            },
            colors: [
                'Cosmic Orange',
                'Deep Blue',
                'Silver'
            ],
            newPhonePrices: {
                '256GB': 1748,
                '512GB': 2013,
                '1TB': 2300,
                '2TB': 2550
            },
            display: true
        },
        {
            id: 'apple-iphone-17-pro',
            brand: 'Apple',
            model: 'iPhone 17 Pro',
            image: 'images/phones/iphone-16-pro.jpg',
            basePrice: 1350,
            storage: {
                '256GB': 0,
                '512GB': 200,
                '1TB': 400
            },
            colors: [
                'Cosmic Orange',
                'Deep Blue',
                'Silver'
            ],
            newPhonePrices: {
                '256GB': 1553,
                '512GB': 1783,
                '1TB': 2013
            },
            display: true
        },
        {
            id: 'apple-iphone-17',
            brand: 'Apple',
            model: 'iPhone 17',
            image: 'images/phones/iphone-16.jpg',
            basePrice: 900,
            storage: {
                '256GB': 0,
                '512GB': 250
            },
            colors: [
                'Black',
                'White',
                'Mist Blue',
                'Sage',
                'Lavender'
            ],
            newPhonePrices: {
                '256GB': 1035,
                '512GB': 1323
            },
            display: true
        },
        {
            id: 'apple-iphone-air',
            brand: 'Apple',
            model: 'iPhone Air',
            image: 'images/phones/iphone-16.jpg',
            basePrice: 850,
            storage: {
                '256GB': 0,
                '512GB': 150,
                '1TB': 250
            },
            colors: [
                'Space Black',
                'Cloud White',
                'Light Gold',
                'Sky Blue'
            ],
            newPhonePrices: {
                '256GB': 978,
                '512GB': 1150,
                '1TB': 1265
            },
            display: true
        },
        {
            id: 'apple-iphone-16e',
            brand: 'Apple',
            model: 'iPhone 16E',
            image: 'images/phones/iphone-se-3rd-gen.jpg',
            basePrice: 520,
            storage: {
                '128GB': 0,
                '256GB': 100,
                '512GB': 200
            },
            colors: [
                'Black',
                'White',
                'Pink',
                'Teal',
                'Ultramarine'
            ],
            newPhonePrices: {
                '128GB': 598,
                '256GB': 713,
                '512GB': 828
            },
            display: true
        },
        {
            id: 'apple-iphone-16-pro-max',
            brand: 'Apple',
            model: 'iPhone 16 Pro Max',
            image: 'images/phones/iphone-16-pro-max.jpg',
            basePrice: 1035,
            storage: {
                '256GB': 0,
                '512GB': 100,
                '1TB': 200
            },
            colors: [
                'Desert Titanium',
                'Natural Titanium',
                'White Titanium',
                'Black Titanium'
            ],
            newPhonePrices: {
                '256GB': 1190,
                '512GB': 1305,
                '1TB': 1420
            },
            display: true
        },
        {
            id: 'apple-iphone-16-pro',
            brand: 'Apple',
            model: 'iPhone 16 Pro',
            image: 'images/phones/iphone-16-pro.jpg',
            basePrice: 1225,
            storage: {
                '128GB': -25,
                '256GB': 0,
                '512GB': 100,
                '1TB': 200
            },
            colors: [
                'Desert Titanium',
                'Natural Titanium',
                'White Titanium',
                'Black Titanium'
            ],
            newPhonePrices: {
                '128GB': 1380,
                '256GB': 1409,
                '512GB': 1524,
                '1TB': 1639
            },
            display: true
        },
        // Samsung
        {
            id: 'samsung-galaxy-s25-ultra',
            brand: 'Samsung',
            model: 'Galaxy S25 Ultra 5G',
            image: 'images/phones/galaxy-s24-ultra.jpg',
            basePrice: 1020,
            storage: {
                '256GB': 0,
                '512GB': 100,
                '1TB': 200
            },
            colors: [
                'Titanium Silverblue',
                'Titanium Gray',
                'Titanium Black',
                'Titanium Whitesilver',
                'Titanium Jetblack',
                'Titanium Jadegreen',
                'Titanium Pinkgold'
            ],
            newPhonePrices: {
                '256GB': 1173,
                '512GB': 1288,
                '1TB': 1403
            },
            display: true
        },
        {
            id: 'samsung-galaxy-s25-plus',
            brand: 'Samsung',
            model: 'Galaxy S25+ 5G',
            image: 'images/phones/galaxy-s24-plus.jpg',
            basePrice: 750,
            storage: {
                '256GB': 0,
                '512GB': 100
            },
            colors: [
                'Navy',
                'Icyblue',
                'Mint',
                'Silver Shadow',
                'Blueblack',
                'Coralred',
                'Pinkgold'
            ],
            newPhonePrices: {
                '256GB': 863,
                '512GB': 978
            },
            display: true
        }
    ];

    // Save all phones to database
    let successCount = 0;
    let failCount = 0;

    samplePhones.forEach(phone => {
        if (db.savePhone(phone)) {
            successCount++;
        } else {
            failCount++;
        }
    });

    // Get final stats
    const stats = db.getStatistics();

    console.log('✅ Database initialization complete!');
    console.log('📊 Results:', {
        added: successCount,
        failed: failCount,
        totalInDatabase: stats.totalPhones
    });

    alert(`✅ Database Initialized!\n\n` +
          `📊 Added: ${successCount} phones\n` +
          `❌ Failed: ${failCount}\n` +
          `📱 Total in database: ${stats.totalPhones}\n\n` +
          `🔄 Reloading page to show new data...`);

    // Reload page to show new data
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// Make function globally available
window.initializeDatabaseFromExcelReference = initializeDatabaseFromExcelReference;

console.log('✅ Database initialization script loaded');
console.log('💡 To initialize: run initializeDatabaseFromExcelReference() in console');
