/**
 * Bulk Import Utility for Apple Product Prices
 * Generated from RedWhite + WhyMobile competitor analysis
 * Date: January 2026
 *
 * Usage:
 * 1. Open admin panel in browser
 * 2. Open browser console (F12)
 * 3. Copy-paste this entire file into console
 * 4. Run: importApplePrices()
 */

const applePricesData = {
    "Apple": {
        // iPhone 17 Series with color variants
        "iPhone 17 Pro Max Orange": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: ['Orange'],
            storagePrices: {        // USED
                '256GB': 1520,
                '512GB': 1750,
                '1TB': 1920,
                '2TB': 2070
            },
            newPhonePrices: {       // NEW SEALED
                '256GB': 1720,
                '512GB': 2000,
                '1TB': 2170,
                '2TB': 2420
            },
            image: 'images/phones/iphone-17-pro-max.jpg'
        },
        "iPhone 17 Pro Max Silver": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: ['Silver'],
            storagePrices: {
                '256GB': 1520,
                '512GB': 1750,
                '1TB': 1920,
                '2TB': 2070
            },
            newPhonePrices: {
                '256GB': 1730,
                '512GB': 1960,
                '1TB': 2220,
                '2TB': 2450
            },
            image: 'images/phones/iphone-17-pro-max.jpg'
        },
        "iPhone 17 Pro Max Blue": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: ['Blue'],
            storagePrices: {
                '256GB': 1520,
                '512GB': 1750,
                '1TB': 1920,
                '2TB': 2070
            },
            newPhonePrices: {
                '256GB': 1710,
                '512GB': 1950,
                '1TB': 2230,
                '2TB': 2360
            },
            image: 'images/phones/iphone-17-pro-max.jpg'
        },
        "iPhone 17 Pro Blue": {
            storages: ['256GB', '512GB', '1TB'],
            colors: ['Blue'],
            storagePrices: {
                '256GB': 1350,
                '512GB': 1550,
                '1TB': 1750
            },
            newPhonePrices: {
                '256GB': 1600,
                '512GB': 1750,
                '1TB': 1950
            },
            image: 'images/phones/iphone-17-pro.jpg'
        },
        "iPhone 17 Air": {
            storages: ['256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '256GB': 900,
                '512GB': 1000,
                '1TB': 1100
            },
            newPhonePrices: {
                '256GB': 1050,
                '512GB': 1220,
                '1TB': 1320
            },
            image: 'images/phones/iphone-17-air.jpg'
        },
        "iPhone 17": {
            storages: ['256GB', '512GB'],
            colors: [],
            storagePrices: {
                '256GB': 900,
                '512GB': 1150
            },
            newPhonePrices: {
                '256GB': 1200,
                '512GB': 1450
            },
            image: 'images/phones/iphone-17.jpg'
        },

        // iPhone 16 Series
        "iPhone 16e": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 520,
                '256GB': 620,
                '512GB': 720
            },
            newPhonePrices: {
                '128GB': 660,
                '256GB': 770,
                '512GB': 870
            },
            image: 'images/phones/iphone-16e.jpg'
        },
        "iPhone 16": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 670,
                '256GB': 720,
                '512GB': 770
            },
            newPhonePrices: {
                '128GB': 920,
                '256GB': 1020,
                '512GB': 1000
            },
            image: 'images/phones/iphone-16.jpg'
        },
        "iPhone 16 Plus": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 750,
                '256GB': 850,
                '512GB': 850
            },
            newPhonePrices: {
                '128GB': 1050,
                '256GB': 1150,
                '512GB': 1150
            },
            image: 'images/phones/iphone-16-plus.jpg'
        },
        "iPhone 16 Pro": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 870,
                '256GB': 970,
                '512GB': 970,
                '1TB': 1020
            },
            newPhonePrices: {
                '128GB': 1300,
                '256GB': 1500,
                '512GB': 1500,
                '1TB': 1300
            },
            image: 'images/phones/iphone-16-pro.jpg'
        },
        "iPhone 16 Pro Max": {
            storages: ['256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '256GB': 1100,
                '512GB': 1100,
                '1TB': 1150
            },
            newPhonePrices: {
                '256GB': 1630,
                '512GB': 1630,
                '1TB': 1630
            },
            image: 'images/phones/iphone-16-pro-max.jpg'
        },

        // iPhone 15 Series
        "iPhone 15": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 500,
                '256GB': 550,
                '512GB': 600
            },
            newPhonePrices: {
                '128GB': 575,
                '256GB': 633,
                '512GB': 690
            },
            image: 'images/phones/iphone-15.jpg'
        },
        "iPhone 15 Plus": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 550,
                '256GB': 600,
                '512GB': 650
            },
            newPhonePrices: {
                '128GB': 633,
                '256GB': 690,
                '512GB': 748
            },
            image: 'images/phones/iphone-15-plus.jpg'
        },
        "iPhone 15 Pro": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 600,
                '256GB': 660,
                '512GB': 750,
                '1TB': 800
            },
            newPhonePrices: {
                '128GB': 690,
                '256GB': 759,
                '512GB': 863,
                '1TB': 920
            },
            image: 'images/phones/iphone-15-pro.jpg'
        },
        "iPhone 15 Pro Max": {
            storages: ['256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '256GB': 800,
                '512GB': 850,
                '1TB': 900
            },
            newPhonePrices: {
                '256GB': 920,
                '512GB': 978,
                '1TB': 1035
            },
            image: 'images/phones/iphone-15-pro-max.jpg'
        },

        // iPhone 14 Series
        "iPhone 14": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 350,
                '256GB': 400,
                '512GB': 450
            },
            newPhonePrices: {
                '128GB': 403,
                '256GB': 460,
                '512GB': 518
            },
            image: 'images/phones/iphone-14.jpg'
        },
        "iPhone 14 Plus": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 420,
                '256GB': 470,
                '512GB': 520
            },
            newPhonePrices: {
                '128GB': 483,
                '256GB': 541,
                '512GB': 598
            },
            image: 'images/phones/iphone-14-plus.jpg'
        },
        "iPhone 14 Pro": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 500,
                '256GB': 550,
                '512GB': 600,
                '1TB': 650
            },
            newPhonePrices: {
                '128GB': 575,
                '256GB': 633,
                '512GB': 690,
                '1TB': 748
            },
            image: 'images/phones/iphone-14-pro.jpg'
        },
        "iPhone 14 Pro Max": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 600,
                '256GB': 650,
                '512GB': 700,
                '1TB': 750
            },
            newPhonePrices: {
                '128GB': 690,
                '256GB': 748,
                '512GB': 805,
                '1TB': 863
            },
            image: 'images/phones/iphone-14-pro-max.jpg'
        },

        // iPhone 13 Series
        "iPhone 13 mini": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 250,
                '256GB': 300,
                '512GB': 350
            },
            newPhonePrices: {
                '128GB': 288,
                '256GB': 345,
                '512GB': 403
            },
            image: 'images/phones/iphone-13-mini.jpg'
        },
        "iPhone 13": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 300,
                '256GB': 350,
                '512GB': 400
            },
            newPhonePrices: {
                '128GB': 345,
                '256GB': 403,
                '512GB': 460
            },
            image: 'images/phones/iphone-13.jpg'
        },
        "iPhone 13 Pro": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 380,
                '256GB': 430,
                '512GB': 480,
                '1TB': 530
            },
            newPhonePrices: {
                '128GB': 437,
                '256GB': 495,
                '512GB': 552,
                '1TB': 610
            },
            image: 'images/phones/iphone-13-pro.jpg'
        },
        "iPhone 13 Pro Max": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 460,
                '256GB': 510,
                '512GB': 560,
                '1TB': 610
            },
            newPhonePrices: {
                '128GB': 529,
                '256GB': 587,
                '512GB': 644,
                '1TB': 702
            },
            image: 'images/phones/iphone-13-pro-max.jpg'
        },

        // iPhone 12 Series
        "iPhone 12 mini": {
            storages: ['64GB', '128GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 120,
                '128GB': 150,
                '256GB': 180
            },
            newPhonePrices: {
                '64GB': 138,
                '128GB': 173,
                '256GB': 207
            },
            image: 'images/phones/iphone-12-mini.jpg'
        },
        "iPhone 12": {
            storages: ['64GB', '128GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 200,
                '128GB': 250,
                '256GB': 300
            },
            newPhonePrices: {
                '64GB': 230,
                '128GB': 288,
                '256GB': 345
            },
            image: 'images/phones/iphone-12.jpg'
        },
        "iPhone 12 Pro": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 300,
                '256GB': 350,
                '512GB': 400
            },
            newPhonePrices: {
                '128GB': 345,
                '256GB': 403,
                '512GB': 460
            },
            image: 'images/phones/iphone-12-pro.jpg'
        },
        "iPhone 12 Pro Max": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 350,
                '256GB': 400,
                '512GB': 450
            },
            newPhonePrices: {
                '128GB': 403,
                '256GB': 460,
                '512GB': 518
            },
            image: 'images/phones/iphone-12-pro-max.jpg'
        },

        // iPhone 11 Series
        "iPhone 11": {
            storages: ['64GB', '128GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 120,
                '128GB': 160,
                '256GB': 200
            },
            newPhonePrices: {
                '64GB': 138,
                '128GB': 184,
                '256GB': 230
            },
            image: 'images/phones/iphone-11.jpg'
        },
        "iPhone 11 Pro": {
            storages: ['64GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '64GB': 170,
                '256GB': 220,
                '512GB': 250
            },
            newPhonePrices: {
                '64GB': 196,
                '256GB': 253,
                '512GB': 288
            },
            image: 'images/phones/iphone-11-pro.jpg'
        },
        "iPhone 11 Pro Max": {
            storages: ['64GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '64GB': 220,
                '256GB': 260,
                '512GB': 300
            },
            newPhonePrices: {
                '64GB': 253,
                '256GB': 299,
                '512GB': 345
            },
            image: 'images/phones/iphone-11-pro-max.jpg'
        },

        // Older iPhones
        "iPhone SE 2022": {
            storages: ['64GB', '128GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 120,
                '128GB': 170,
                '256GB': 220
            },
            newPhonePrices: {
                '64GB': 138,
                '128GB': 196,
                '256GB': 253
            },
            image: 'images/phones/iphone-se-2022.jpg'
        },
        "iPhone XS": {
            storages: ['64GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '64GB': 70,
                '256GB': 100,
                '512GB': 130
            },
            newPhonePrices: {
                '64GB': 81,
                '256GB': 115,
                '512GB': 150
            },
            image: 'images/phones/iphone-xs.jpg'
        },
        "iPhone XS Max": {
            storages: ['64GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '64GB': 120,
                '256GB': 150,
                '512GB': 180
            },
            newPhonePrices: {
                '64GB': 138,
                '256GB': 173,
                '512GB': 207
            },
            image: 'images/phones/iphone-xs-max.jpg'
        },
        "iPhone XR": {
            storages: ['64GB', '128GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 50,
                '128GB': 80,
                '256GB': 110
            },
            newPhonePrices: {
                '64GB': 58,
                '128GB': 92,
                '256GB': 127
            },
            image: 'images/phones/iphone-xr.jpg'
        },

        // iPad Models
        "iPad 11th (2025) WiFi": {
            storages: ['128GB', '256GB'],
            colors: [],
            storagePrices: {
                '128GB': 250,
                '256GB': 380
            },
            newPhonePrices: {
                '128GB': 380,
                '256GB': 470
            },
            image: 'images/phones/ipad-11.jpg'
        },
        "iPad 11th (2025) Cellular": {
            storages: ['128GB', '256GB'],
            colors: [],
            storagePrices: {
                '128GB': 380,
                '256GB': 480
            },
            newPhonePrices: {
                '128GB': 520,
                '256GB': 620
            },
            image: 'images/phones/ipad-11.jpg'
        },
        "iPad 10th (2022) WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 130,
                '256GB': 180
            },
            newPhonePrices: {
                '64GB': 320,
                '256GB': 370
            },
            image: 'images/phones/ipad-10.jpg'
        },
        "iPad 10th (2022) Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 180,
                '256GB': 230
            },
            newPhonePrices: {
                '64GB': 370,
                '256GB': 420
            },
            image: 'images/phones/ipad-10.jpg'
        },
        "iPad 9th (2021) WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 80,
                '256GB': 120
            },
            newPhonePrices: {
                '64GB': 92,
                '256GB': 138
            },
            image: 'images/phones/ipad-9.jpg'
        },
        "iPad 9th (2021) Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 130,
                '256GB': 180
            },
            newPhonePrices: {
                '64GB': 150,
                '256GB': 207
            },
            image: 'images/phones/ipad-9.jpg'
        },

        // iPad Pro 13" M5 (2025)
        "iPad Pro 13 M5 (2025) WiFi": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '256GB': 1120,
                '512GB': 1220,
                '1TB': 1320,
                '2TB': 1420
            },
            newPhonePrices: {
                '256GB': 1470,
                '512GB': 1670,
                '1TB': 1920,
                '2TB': 2020
            },
            image: 'images/phones/ipad-pro-13-m5.jpg'
        },
        "iPad Pro 13 M5 (2025) Cellular": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '256GB': 1220,
                '512GB': 1320,
                '1TB': 1420,
                '2TB': 1520
            },
            newPhonePrices: {
                '256GB': 1570,
                '512GB': 1770,
                '1TB': 2020,
                '2TB': 2120
            },
            image: 'images/phones/ipad-pro-13-m5.jpg'
        },

        // iPad Pro 11" M5 (2025)
        "iPad Pro 11 M5 (2025) WiFi": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '256GB': 820,
                '512GB': 920,
                '1TB': 1020,
                '2TB': 1120
            },
            newPhonePrices: {
                '256GB': 1180,
                '512GB': 1370,
                '1TB': 1570,
                '2TB': 1770
            },
            image: 'images/phones/ipad-pro-11-m5.jpg'
        },
        "iPad Pro 11 M5 (2025) Cellular": {
            storages: ['256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '256GB': 920,
                '512GB': 1020,
                '1TB': 1120,
                '2TB': 1220
            },
            newPhonePrices: {
                '256GB': 1370,
                '512GB': 1570,
                '1TB': 1770,
                '2TB': 1970
            },
            image: 'images/phones/ipad-pro-11-m5.jpg'
        },

        // iPad Pro 12.9" (2022)
        "iPad Pro 12.9 (2022) WiFi": {
            storages: ['128GB', '256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '128GB': 650,
                '256GB': 700,
                '512GB': 750,
                '1TB': 800,
                '2TB': 850
            },
            newPhonePrices: {
                '128GB': 748,
                '256GB': 805,
                '512GB': 863,
                '1TB': 920,
                '2TB': 978
            },
            image: 'images/phones/ipad-pro-12-9.jpg'
        },
        "iPad Pro 12.9 (2022) Cellular": {
            storages: ['128GB', '256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '128GB': 700,
                '256GB': 750,
                '512GB': 800,
                '1TB': 850,
                '2TB': 900
            },
            newPhonePrices: {
                '128GB': 805,
                '256GB': 863,
                '512GB': 920,
                '1TB': 978,
                '2TB': 1035
            },
            image: 'images/phones/ipad-pro-12-9.jpg'
        },

        // iPad Pro 12.9" (2021)
        "iPad Pro 12.9 (2021) WiFi": {
            storages: ['128GB', '256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '128GB': 450,
                '256GB': 500,
                '512GB': 550,
                '1TB': 600,
                '2TB': 650
            },
            newPhonePrices: {
                '128GB': 518,
                '256GB': 575,
                '512GB': 633,
                '1TB': 690,
                '2TB': 748
            },
            image: 'images/phones/ipad-pro-12-9.jpg'
        },
        "iPad Pro 12.9 (2021) Cellular": {
            storages: ['128GB', '256GB', '512GB', '1TB', '2TB'],
            colors: [],
            storagePrices: {
                '128GB': 500,
                '256GB': 550,
                '512GB': 600,
                '1TB': 650,
                '2TB': 700
            },
            newPhonePrices: {
                '128GB': 575,
                '256GB': 633,
                '512GB': 690,
                '1TB': 748,
                '2TB': 805
            },
            image: 'images/phones/ipad-pro-12-9.jpg'
        },

        // iPad Air 6 13" M3 (2025)
        "iPad Air 6 13 M3 (2025) WiFi": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 670,
                '256GB': 770,
                '512GB': 970,
                '1TB': 1070
            },
            newPhonePrices: {
                '128GB': 870,
                '256GB': 970,
                '512GB': 1170,
                '1TB': 1320
            },
            image: 'images/phones/ipad-air-13.jpg'
        },
        "iPad Air 6 13 M3 (2025) Cellular": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 830,
                '256GB': 950,
                '512GB': 1050,
                '1TB': 1150
            },
            newPhonePrices: {
                '128GB': 1080,
                '256GB': 1200,
                '512GB': 1350,
                '1TB': 1500
            },
            image: 'images/phones/ipad-air-13.jpg'
        },

        // iPad Air 6 11" M3 (2025)
        "iPad Air 6 11 M3 (2025) WiFi": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 420,
                '256GB': 570,
                '512GB': 670,
                '1TB': 770
            },
            newPhonePrices: {
                '128GB': 600,
                '256GB': 770,
                '512GB': 870,
                '1TB': 970
            },
            image: 'images/phones/ipad-air-11.jpg'
        },
        "iPad Air 6 11 M3 (2025) Cellular": {
            storages: ['128GB', '256GB', '512GB', '1TB'],
            colors: [],
            storagePrices: {
                '128GB': 650,
                '256GB': 750,
                '512GB': 850,
                '1TB': 950
            },
            newPhonePrices: {
                '128GB': 800,
                '256GB': 950,
                '512GB': 1050,
                '1TB': 1150
            },
            image: 'images/phones/ipad-air-11.jpg'
        },

        // iPad Air 5 & 4
        "iPad Air 5 WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 300,
                '256GB': 350
            },
            newPhonePrices: {
                '64GB': 345,
                '256GB': 403
            },
            image: 'images/phones/ipad-air-5.jpg'
        },
        "iPad Air 5 Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 350,
                '256GB': 400
            },
            newPhonePrices: {
                '64GB': 403,
                '256GB': 460
            },
            image: 'images/phones/ipad-air-5.jpg'
        },
        "iPad Air 4 WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 150,
                '256GB': 200
            },
            newPhonePrices: {
                '64GB': 173,
                '256GB': 230
            },
            image: 'images/phones/ipad-air-4.jpg'
        },
        "iPad Air 4 Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 200,
                '256GB': 250
            },
            newPhonePrices: {
                '64GB': 230,
                '256GB': 288
            },
            image: 'images/phones/ipad-air-4.jpg'
        },

        // iPad Mini
        "iPad Mini 7 WiFi": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 370,
                '256GB': 470,
                '512GB': 570
            },
            newPhonePrices: {
                '128GB': 520,
                '256GB': 620,
                '512GB': 750
            },
            image: 'images/phones/ipad-mini-7.jpg'
        },
        "iPad Mini 7 Cellular": {
            storages: ['128GB', '256GB', '512GB'],
            colors: [],
            storagePrices: {
                '128GB': 470,
                '256GB': 570,
                '512GB': 670
            },
            newPhonePrices: {
                '128GB': 650,
                '256GB': 770,
                '512GB': 900
            },
            image: 'images/phones/ipad-mini-7.jpg'
        },
        "iPad Mini 6 WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 250,
                '256GB': 300
            },
            newPhonePrices: {
                '64GB': 288,
                '256GB': 345
            },
            image: 'images/phones/ipad-mini-6.jpg'
        },
        "iPad Mini 6 Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 300,
                '256GB': 400
            },
            newPhonePrices: {
                '64GB': 345,
                '256GB': 460
            },
            image: 'images/phones/ipad-mini-6.jpg'
        },
        "iPad Mini 5 WiFi": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 130,
                '256GB': 170
            },
            newPhonePrices: {
                '64GB': 150,
                '256GB': 196
            },
            image: 'images/phones/ipad-mini-5.jpg'
        },
        "iPad Mini 5 Cellular": {
            storages: ['64GB', '256GB'],
            colors: [],
            storagePrices: {
                '64GB': 210,
                '256GB': 250
            },
            newPhonePrices: {
                '64GB': 242,
                '256GB': 288
            },
            image: 'images/phones/ipad-mini-5.jpg'
        },

        // Apple Watch
        "Apple Watch Ultra 3": {
            storages: ['49mm'],
            colors: [],
            storagePrices: {
                '49mm': 820
            },
            newPhonePrices: {
                '49mm': 1020
            },
            image: 'images/phones/apple-watch-ultra-3.jpg'
        },
        "Apple Watch Ultra 2": {
            storages: ['49mm'],
            colors: [],
            storagePrices: {
                '49mm': 520
            },
            newPhonePrices: {
                '49mm': 598
            },
            image: 'images/phones/apple-watch-ultra-2.jpg'
        },
        "Apple Watch Ultra": {
            storages: ['49mm'],
            colors: [],
            storagePrices: {
                '49mm': 320
            },
            newPhonePrices: {
                '49mm': 368
            },
            image: 'images/phones/apple-watch-ultra.jpg'
        },
        "Apple Watch Series 11 GPS 42mm": {
            storages: ['42mm'],
            colors: [],
            storagePrices: {
                '42mm': 300
            },
            newPhonePrices: {
                '42mm': 450
            },
            image: 'images/phones/apple-watch-series-11.jpg'
        },
        "Apple Watch Series 11 GPS 46mm": {
            storages: ['46mm'],
            colors: [],
            storagePrices: {
                '46mm': 350
            },
            newPhonePrices: {
                '46mm': 500
            },
            image: 'images/phones/apple-watch-series-11.jpg'
        },
        "Apple Watch Series 11 Cellular 42mm": {
            storages: ['42mm'],
            colors: [],
            storagePrices: {
                '42mm': 350
            },
            newPhonePrices: {
                '42mm': 500
            },
            image: 'images/phones/apple-watch-series-11.jpg'
        },
        "Apple Watch Series 11 Cellular 46mm": {
            storages: ['46mm'],
            colors: [],
            storagePrices: {
                '46mm': 400
            },
            newPhonePrices: {
                '46mm': 550
            },
            image: 'images/phones/apple-watch-series-11.jpg'
        },
        "Apple Watch Series 10 GPS 42mm": {
            storages: ['42mm'],
            colors: [],
            storagePrices: {
                '42mm': 220
            },
            newPhonePrices: {
                '42mm': 253
            },
            image: 'images/phones/apple-watch-series-10.jpg'
        },
        "Apple Watch Series 10 GPS 46mm": {
            storages: ['46mm'],
            colors: [],
            storagePrices: {
                '46mm': 270
            },
            newPhonePrices: {
                '46mm': 311
            },
            image: 'images/phones/apple-watch-series-10.jpg'
        },
        "Apple Watch Series 10 Cellular 42mm": {
            storages: ['42mm'],
            colors: [],
            storagePrices: {
                '42mm': 270
            },
            newPhonePrices: {
                '42mm': 311
            },
            image: 'images/phones/apple-watch-series-10.jpg'
        },
        "Apple Watch Series 10 Cellular 46mm": {
            storages: ['46mm'],
            colors: [],
            storagePrices: {
                '46mm': 320
            },
            newPhonePrices: {
                '46mm': 368
            },
            image: 'images/phones/apple-watch-series-10.jpg'
        },
        "Apple Watch Series 9 GPS 41mm": {
            storages: ['41mm'],
            colors: [],
            storagePrices: {
                '41mm': 120
            },
            newPhonePrices: {
                '41mm': 138
            },
            image: 'images/phones/apple-watch-series-9.jpg'
        },
        "Apple Watch Series 9 GPS 45mm": {
            storages: ['45mm'],
            colors: [],
            storagePrices: {
                '45mm': 170
            },
            newPhonePrices: {
                '45mm': 196
            },
            image: 'images/phones/apple-watch-series-9.jpg'
        },
        "Apple Watch Series 9 Cellular 41mm": {
            storages: ['41mm'],
            colors: [],
            storagePrices: {
                '41mm': 170
            },
            newPhonePrices: {
                '41mm': 196
            },
            image: 'images/phones/apple-watch-series-9.jpg'
        },
        "Apple Watch Series 9 Cellular 45mm": {
            storages: ['45mm'],
            colors: [],
            storagePrices: {
                '45mm': 220
            },
            newPhonePrices: {
                '45mm': 253
            },
            image: 'images/phones/apple-watch-series-9.jpg'
        },
        "Apple Watch SE 3 GPS 40mm": {
            storages: ['40mm'],
            colors: [],
            storagePrices: {
                '40mm': 80
            },
            newPhonePrices: {
                '40mm': 210
            },
            image: 'images/phones/apple-watch-se-3.jpg'
        },
        "Apple Watch SE 3 GPS 44mm": {
            storages: ['44mm'],
            colors: [],
            storagePrices: {
                '44mm': 120
            },
            newPhonePrices: {
                '44mm': 250
            },
            image: 'images/phones/apple-watch-se-3.jpg'
        },
        "Apple Watch SE 3 Cellular 40mm": {
            storages: ['40mm'],
            colors: [],
            storagePrices: {
                '40mm': 120
            },
            newPhonePrices: {
                '40mm': 250
            },
            image: 'images/phones/apple-watch-se-3.jpg'
        },
        "Apple Watch SE 3 Cellular 44mm": {
            storages: ['44mm'],
            colors: [],
            storagePrices: {
                '44mm': 150
            },
            newPhonePrices: {
                '44mm': 290
            },
            image: 'images/phones/apple-watch-se-3.jpg'
        },

        // AirPods
        "AirPods Pro 3": {
            storages: ['Standard'],
            colors: [],
            storagePrices: {
                'Standard': 150
            },
            newPhonePrices: {
                'Standard': 280
            },
            image: 'images/phones/airpods-pro-3.jpg'
        },
        "AirPods Pro 2 (USB-C)": {
            storages: ['Standard'],
            colors: [],
            storagePrices: {
                'Standard': 90
            },
            newPhonePrices: {
                'Standard': 200
            },
            image: 'images/phones/airpods-pro-2.jpg'
        },
        "AirPods 4": {
            storages: ['Standard'],
            colors: [],
            storagePrices: {
                'Standard': 70
            },
            newPhonePrices: {
                'Standard': 120
            },
            image: 'images/phones/airpods-4.jpg'
        },
        "AirPods 4 (ANC)": {
            storages: ['Standard'],
            colors: [],
            storagePrices: {
                'Standard': 100
            },
            newPhonePrices: {
                'Standard': 170
            },
            image: 'images/phones/airpods-4-anc.jpg'
        },
        "AirPods Max (USB-C)": {
            storages: ['Standard'],
            colors: [],
            storagePrices: {
                'Standard': 320
            },
            newPhonePrices: {
                'Standard': 368
            },
            image: 'images/phones/airpods-max.jpg'
        }
    }
};

function importApplePrices() {
    console.log('Starting Apple prices bulk import...');

    const phones = JSON.parse(localStorage.getItem('ktmobile_phones') || '[]');
    let updated = 0;
    let added = 0;

    for (const [brand, models] of Object.entries(applePricesData)) {
        for (const [modelName, priceData] of Object.entries(models)) {
            const existingIndex = phones.findIndex(p =>
                p.brand === brand && p.model === modelName
            );

            if (existingIndex >= 0) {
                // Update existing
                phones[existingIndex].storagePrices = priceData.storagePrices;
                phones[existingIndex].newPhonePrices = priceData.newPhonePrices;
                phones[existingIndex].basePrice = Math.min(...Object.values(priceData.storagePrices));
                phones[existingIndex].storages = priceData.storages;
                phones[existingIndex].colors = priceData.colors || [];
                phones[existingIndex].updatedAt = new Date().toISOString();
                updated++;
            } else {
                // Add new
                phones.push({
                    id: `${brand.toLowerCase()}-${modelName.toLowerCase().replace(/[\s\/\(\)]+/g, '-')}-${Date.now()}`,
                    brand: brand,
                    model: modelName,
                    image: priceData.image || `images/phones/${modelName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                    storages: priceData.storages,
                    colors: priceData.colors || [],
                    storagePrices: priceData.storagePrices,
                    newPhonePrices: priceData.newPhonePrices,
                    basePrice: Math.min(...Object.values(priceData.storagePrices)),
                    buyPrices: calculateBuyPrices(priceData.storagePrices),
                    quantities: initializeQuantities(priceData.storages),
                    available: true,
                    display: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                added++;
            }
        }
    }

    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    console.log(`✅ Import complete!`);
    console.log(`   Updated: ${updated} products`);
    console.log(`   Added: ${added} products`);
    console.log(`   Total: ${phones.length} products in database`);

    alert(`Apple prices imported successfully!\n\nUpdated: ${updated}\nAdded: ${added}\nTotal: ${phones.length}`);

    // Refresh admin panel if available
    if (typeof renderPhones === 'function') renderPhones();
    if (typeof renderPriceTable === 'function') renderPriceTable();
}

function calculateBuyPrices(storagePrices) {
    const buyPrices = {};
    for (const [storage, price] of Object.entries(storagePrices)) {
        buyPrices[storage] = {
            excellent: price,
            good: Math.round(price * 0.95),
            fair: Math.round(price * 0.85)
        };
    }
    return buyPrices;
}

function initializeQuantities(storages) {
    const quantities = {};
    storages.forEach(storage => {
        quantities[storage] = {
            excellent: 0,
            good: 0,
            fair: 0
        };
    });
    return quantities;
}

// Auto-run on load
console.log('Apple Bulk Import Utility loaded. Run importApplePrices() to import.');
