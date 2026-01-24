/**
 * Import Exact Prices - Complete Hardcoded Phone Database
 *
 * Contains ALL phone entries from Excel files with CORRECT prices:
 * - Apple_USED_NEW_FULL_REVIEW.xlsx (32 models, 102 storage entries)
 * - Samsung_USED_NEW_FULL_REVIEW.xlsx (36 models, 74 storage entries)
 *
 * Each phone includes:
 * - storagePrices: USED prices from USED_HIGHEST_ALL sheet
 * - newPhonePrices: NEW prices from NEW_HIGHEST_ALL sheet (only for models that exist in that sheet, empty {} otherwise)
 * - buyPrices: Excellent: USED, Good: USED×0.95, Fair: USED×0.85
 */

function importExactPrices() {
    const phones = [
        // ========== APPLE PHONES ==========

        // Apple iPhone XR
        {
            id: 'apple-iphone-xr',
            brand: 'Apple',
            model: 'iPhone XR',
            image: 'images/phones/apple-iphone-xr.jpg',
            storages: ["64GB", "128GB", "256GB"],
            basePrice: 50,
            storagePrices: {"64GB": 50, "128GB": 80, "256GB": 110},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 50,
                                "good": 47,
                                "fair": 42
                },
                "128GB": {
                                "excellent": 80,
                                "good": 76,
                                "fair": 68
                },
                "256GB": {
                                "excellent": 110,
                                "good": 104,
                                "fair": 93
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone XS
        {
            id: 'apple-iphone-xs',
            brand: 'Apple',
            model: 'iPhone XS',
            image: 'images/phones/apple-iphone-xs.jpg',
            storages: ["64GB", "256GB", "512GB"],
            basePrice: 70,
            storagePrices: {"64GB": 70, "256GB": 100, "512GB": 130},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 70,
                                "good": 66,
                                "fair": 59
                },
                "256GB": {
                                "excellent": 100,
                                "good": 95,
                                "fair": 85
                },
                "512GB": {
                                "excellent": 130,
                                "good": 123,
                                "fair": 110
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone XS Max
        {
            id: 'apple-iphone-xs-max',
            brand: 'Apple',
            model: 'iPhone XS Max',
            image: 'images/phones/apple-iphone-xs-max.jpg',
            storages: ["64GB", "256GB", "512GB"],
            basePrice: 120,
            storagePrices: {"64GB": 120, "256GB": 150, "512GB": 180},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 120,
                                "good": 114,
                                "fair": 102
                },
                "256GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                },
                "512GB": {
                                "excellent": 180,
                                "good": 171,
                                "fair": 153
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 11
        {
            id: 'apple-iphone-11',
            brand: 'Apple',
            model: 'iPhone 11',
            image: 'images/phones/apple-iphone-11.jpg',
            storages: ["64GB", "128GB", "256GB"],
            basePrice: 120,
            storagePrices: {"64GB": 120, "128GB": 150, "256GB": 180},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 120,
                                "good": 114,
                                "fair": 102
                },
                "128GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                },
                "256GB": {
                                "excellent": 180,
                                "good": 171,
                                "fair": 153
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 11 Pro
        {
            id: 'apple-iphone-11-pro',
            brand: 'Apple',
            model: 'iPhone 11 Pro',
            image: 'images/phones/apple-iphone-11-pro.jpg',
            storages: ["64GB", "256GB", "512GB"],
            basePrice: 170,
            storagePrices: {"64GB": 170, "256GB": 210, "512GB": 240},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 170,
                                "good": 161,
                                "fair": 144
                },
                "256GB": {
                                "excellent": 210,
                                "good": 199,
                                "fair": 178
                },
                "512GB": {
                                "excellent": 240,
                                "good": 228,
                                "fair": 204
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 11 Pro Max
        {
            id: 'apple-iphone-11-pro-max',
            brand: 'Apple',
            model: 'iPhone 11 Pro Max',
            image: 'images/phones/apple-iphone-11-pro-max.jpg',
            storages: ["64GB", "256GB", "512GB"],
            basePrice: 220,
            storagePrices: {"64GB": 220, "256GB": 250, "512GB": 280},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 220,
                                "good": 209,
                                "fair": 187
                },
                "256GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                },
                "512GB": {
                                "excellent": 280,
                                "good": 266,
                                "fair": 238
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone SE (2022)
        {
            id: 'apple-iphone-se-2022',
            brand: 'Apple',
            model: 'iPhone SE (2022)',
            image: 'images/phones/apple-iphone-se-2022.jpg',
            storages: ["64GB", "128GB", "256GB"],
            basePrice: 120,
            storagePrices: {"64GB": 120, "128GB": 170, "256GB": 220},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 120,
                                "good": 114,
                                "fair": 102
                },
                "128GB": {
                                "excellent": 170,
                                "good": 161,
                                "fair": 144
                },
                "256GB": {
                                "excellent": 220,
                                "good": 209,
                                "fair": 187
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 12 Mini
        {
            id: 'apple-iphone-12-mini',
            brand: 'Apple',
            model: 'iPhone 12 Mini',
            image: 'images/phones/apple-iphone-12-mini.jpg',
            storages: ["64GB", "128GB", "256GB"],
            basePrice: 120,
            storagePrices: {"64GB": 120, "128GB": 150, "256GB": 180},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 120,
                                "good": 114,
                                "fair": 102
                },
                "128GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                },
                "256GB": {
                                "excellent": 180,
                                "good": 171,
                                "fair": 153
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 12
        {
            id: 'apple-iphone-12',
            brand: 'Apple',
            model: 'iPhone 12',
            image: 'images/phones/apple-iphone-12.jpg',
            storages: ["64GB", "128GB", "256GB"],
            basePrice: 200,
            storagePrices: {"64GB": 200, "128GB": 250, "256GB": 300},
            newPhonePrices: {},
            buyPrices: {
                "64GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                },
                "128GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                },
                "256GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                }
},
            quantities: {
                "64GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 12 Pro
        {
            id: 'apple-iphone-12-pro',
            brand: 'Apple',
            model: 'iPhone 12 Pro',
            image: 'images/phones/apple-iphone-12-pro.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 300,
            storagePrices: {"128GB": 300, "256GB": 350, "512GB": 400},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                },
                "256GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "512GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 12 Pro Max
        {
            id: 'apple-iphone-12-pro-max',
            brand: 'Apple',
            model: 'iPhone 12 Pro Max',
            image: 'images/phones/apple-iphone-12-pro-max.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 350,
            storagePrices: {"128GB": 350, "256GB": 400, "512GB": 450},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "256GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                },
                "512GB": {
                                "excellent": 450,
                                "good": 427,
                                "fair": 382
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 13 Mini
        {
            id: 'apple-iphone-13-mini',
            brand: 'Apple',
            model: 'iPhone 13 Mini',
            image: 'images/phones/apple-iphone-13-mini.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 250,
            storagePrices: {"128GB": 250, "256GB": 300, "512GB": 350},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                },
                "256GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                },
                "512GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 13
        {
            id: 'apple-iphone-13',
            brand: 'Apple',
            model: 'iPhone 13',
            image: 'images/phones/apple-iphone-13.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 300,
            storagePrices: {"128GB": 300, "256GB": 350, "512GB": 400},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                },
                "256GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "512GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 13 Pro
        {
            id: 'apple-iphone-13-pro',
            brand: 'Apple',
            model: 'iPhone 13 Pro',
            image: 'images/phones/apple-iphone-13-pro.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 380,
            storagePrices: {"128GB": 380, "256GB": 430, "512GB": 480, "1TB": 530},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 380,
                                "good": 361,
                                "fair": 323
                },
                "256GB": {
                                "excellent": 430,
                                "good": 408,
                                "fair": 365
                },
                "512GB": {
                                "excellent": 480,
                                "good": 456,
                                "fair": 408
                },
                "1TB": {
                                "excellent": 530,
                                "good": 503,
                                "fair": 450
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 13 Pro Max
        {
            id: 'apple-iphone-13-pro-max',
            brand: 'Apple',
            model: 'iPhone 13 Pro Max',
            image: 'images/phones/apple-iphone-13-pro-max.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 460,
            storagePrices: {"128GB": 460, "256GB": 510, "512GB": 560, "1TB": 610},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 460,
                                "good": 437,
                                "fair": 391
                },
                "256GB": {
                                "excellent": 510,
                                "good": 484,
                                "fair": 433
                },
                "512GB": {
                                "excellent": 560,
                                "good": 532,
                                "fair": 476
                },
                "1TB": {
                                "excellent": 610,
                                "good": 579,
                                "fair": 518
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 14
        {
            id: 'apple-iphone-14',
            brand: 'Apple',
            model: 'iPhone 14',
            image: 'images/phones/apple-iphone-14.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 350,
            storagePrices: {"128GB": 350, "256GB": 400, "512GB": 450},
            newPhonePrices: {"128GB": 350, "256GB": 400, "512GB": 450},
            buyPrices: {
                "128GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "256GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                },
                "512GB": {
                                "excellent": 450,
                                "good": 427,
                                "fair": 382
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 14 Plus
        {
            id: 'apple-iphone-14-plus',
            brand: 'Apple',
            model: 'iPhone 14 Plus',
            image: 'images/phones/apple-iphone-14-plus.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 420,
            storagePrices: {"128GB": 420, "256GB": 470, "512GB": 520},
            newPhonePrices: {"128GB": 420, "256GB": 470, "512GB": 520},
            buyPrices: {
                "128GB": {
                                "excellent": 420,
                                "good": 399,
                                "fair": 357
                },
                "256GB": {
                                "excellent": 470,
                                "good": 446,
                                "fair": 399
                },
                "512GB": {
                                "excellent": 520,
                                "good": 494,
                                "fair": 442
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 14 Pro
        {
            id: 'apple-iphone-14-pro',
            brand: 'Apple',
            model: 'iPhone 14 Pro',
            image: 'images/phones/apple-iphone-14-pro.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 500,
            storagePrices: {"128GB": 500, "256GB": 550, "512GB": 600, "1TB": 650},
            newPhonePrices: {"128GB": 500, "256GB": 550, "512GB": 600, "1TB": 650},
            buyPrices: {
                "128GB": {
                                "excellent": 500,
                                "good": 475,
                                "fair": 425
                },
                "256GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                },
                "512GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "1TB": {
                                "excellent": 650,
                                "good": 617,
                                "fair": 552
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 14 Pro Max
        {
            id: 'apple-iphone-14-pro-max',
            brand: 'Apple',
            model: 'iPhone 14 Pro Max',
            image: 'images/phones/apple-iphone-14-pro-max.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 600,
            storagePrices: {"128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750},
            newPhonePrices: {"128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750},
            buyPrices: {
                "128GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "256GB": {
                                "excellent": 650,
                                "good": 617,
                                "fair": 552
                },
                "512GB": {
                                "excellent": 700,
                                "good": 665,
                                "fair": 595
                },
                "1TB": {
                                "excellent": 750,
                                "good": 712,
                                "fair": 637
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 15
        {
            id: 'apple-iphone-15',
            brand: 'Apple',
            model: 'iPhone 15',
            image: 'images/phones/apple-iphone-15.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 500,
            storagePrices: {"128GB": 500, "256GB": 550, "512GB": 600},
            newPhonePrices: {"128GB": 500, "256GB": 550, "512GB": 600},
            buyPrices: {
                "128GB": {
                                "excellent": 500,
                                "good": 475,
                                "fair": 425
                },
                "256GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                },
                "512GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 15 Plus
        {
            id: 'apple-iphone-15-plus',
            brand: 'Apple',
            model: 'iPhone 15 Plus',
            image: 'images/phones/apple-iphone-15-plus.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 550,
            storagePrices: {"128GB": 550, "256GB": 600, "512GB": 650},
            newPhonePrices: {"128GB": 550, "256GB": 600, "512GB": 650},
            buyPrices: {
                "128GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                },
                "256GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "512GB": {
                                "excellent": 650,
                                "good": 617,
                                "fair": 552
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 15 Pro
        {
            id: 'apple-iphone-15-pro',
            brand: 'Apple',
            model: 'iPhone 15 Pro',
            image: 'images/phones/apple-iphone-15-pro.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 600,
            storagePrices: {"128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750},
            newPhonePrices: {"128GB": 600, "256GB": 650, "512GB": 700, "1TB": 750},
            buyPrices: {
                "128GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "256GB": {
                                "excellent": 650,
                                "good": 617,
                                "fair": 552
                },
                "512GB": {
                                "excellent": 700,
                                "good": 665,
                                "fair": 595
                },
                "1TB": {
                                "excellent": 750,
                                "good": 712,
                                "fair": 637
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 15 Pro Max
        {
            id: 'apple-iphone-15-pro-max',
            brand: 'Apple',
            model: 'iPhone 15 Pro Max',
            image: 'images/phones/apple-iphone-15-pro-max.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 800,
            storagePrices: {"256GB": 800, "512GB": 850, "1TB": 900},
            newPhonePrices: {"256GB": 800, "512GB": 850, "1TB": 900},
            buyPrices: {
                "256GB": {
                                "excellent": 800,
                                "good": 760,
                                "fair": 680
                },
                "512GB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                },
                "1TB": {
                                "excellent": 900,
                                "good": 855,
                                "fair": 765
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 16
        {
            id: 'apple-iphone-16',
            brand: 'Apple',
            model: 'iPhone 16',
            image: 'images/phones/apple-iphone-16.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 670,
            storagePrices: {"128GB": 670, "256GB": 720, "512GB": 770},
            newPhonePrices: {"128GB": 920, "256GB": 1020, "512GB": 1070},
            buyPrices: {
                "128GB": {
                                "excellent": 670,
                                "good": 636,
                                "fair": 569
                },
                "256GB": {
                                "excellent": 720,
                                "good": 684,
                                "fair": 612
                },
                "512GB": {
                                "excellent": 770,
                                "good": 731,
                                "fair": 654
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 16 Plus
        {
            id: 'apple-iphone-16-plus',
            brand: 'Apple',
            model: 'iPhone 16 Plus',
            image: 'images/phones/apple-iphone-16-plus.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 750,
            storagePrices: {"128GB": 750, "256GB": 800, "512GB": 850},
            newPhonePrices: {"128GB": 1050, "256GB": 1150, "512GB": 1200},
            buyPrices: {
                "128GB": {
                                "excellent": 750,
                                "good": 712,
                                "fair": 637
                },
                "256GB": {
                                "excellent": 800,
                                "good": 760,
                                "fair": 680
                },
                "512GB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 16 Pro
        {
            id: 'apple-iphone-16-pro',
            brand: 'Apple',
            model: 'iPhone 16 Pro',
            image: 'images/phones/apple-iphone-16-pro.jpg',
            storages: ["128GB", "256GB", "512GB", "1TB"],
            basePrice: 870,
            storagePrices: {"128GB": 870, "256GB": 920, "512GB": 970, "1TB": 1020},
            newPhonePrices: {"128GB": 870, "256GB": 920, "512GB": 970, "1TB": 1020},
            buyPrices: {
                "128GB": {
                                "excellent": 870,
                                "good": 826,
                                "fair": 739
                },
                "256GB": {
                                "excellent": 920,
                                "good": 874,
                                "fair": 782
                },
                "512GB": {
                                "excellent": 970,
                                "good": 921,
                                "fair": 824
                },
                "1TB": {
                                "excellent": 1020,
                                "good": 969,
                                "fair": 867
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 16 Pro Max
        {
            id: 'apple-iphone-16-pro-max',
            brand: 'Apple',
            model: 'iPhone 16 Pro Max',
            image: 'images/phones/apple-iphone-16-pro-max.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 1020,
            storagePrices: {"256GB": 1020, "512GB": 1070, "1TB": 1120},
            newPhonePrices: {"256GB": 1020, "512GB": 1070, "1TB": 1120},
            buyPrices: {
                "256GB": {
                                "excellent": 1020,
                                "good": 969,
                                "fair": 867
                },
                "512GB": {
                                "excellent": 1070,
                                "good": 1016,
                                "fair": 909
                },
                "1TB": {
                                "excellent": 1120,
                                "good": 1064,
                                "fair": 952
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 16E
        {
            id: 'apple-iphone-16e',
            brand: 'Apple',
            model: 'iPhone 16E',
            image: 'images/phones/apple-iphone-16e.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 520,
            storagePrices: {"128GB": 520, "256GB": 620, "512GB": 720},
            newPhonePrices: {"128GB": 650, "256GB": 770, "512GB": 870},
            buyPrices: {
                "128GB": {
                                "excellent": 520,
                                "good": 494,
                                "fair": 442
                },
                "256GB": {
                                "excellent": 620,
                                "good": 589,
                                "fair": 527
                },
                "512GB": {
                                "excellent": 720,
                                "good": 684,
                                "fair": 612
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 17
        {
            id: 'apple-iphone-17',
            brand: 'Apple',
            model: 'iPhone 17',
            image: 'images/phones/apple-iphone-17.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 900,
            storagePrices: {"256GB": 900, "512GB": 1150},
            newPhonePrices: {"256GB": 1200, "512GB": 1370},
            buyPrices: {
                "256GB": {
                                "excellent": 900,
                                "good": 855,
                                "fair": 765
                },
                "512GB": {
                                "excellent": 1150,
                                "good": 1092,
                                "fair": 977
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 17 Pro
        {
            id: 'apple-iphone-17-pro',
            brand: 'Apple',
            model: 'iPhone 17 Pro',
            image: 'images/phones/apple-iphone-17-pro.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 1350,
            storagePrices: {"256GB": 1350, "512GB": 1550, "1TB": 1750},
            newPhonePrices: {"256GB": 1600, "512GB": 1750, "1TB": 1950},
            buyPrices: {
                "256GB": {
                                "excellent": 1350,
                                "good": 1282,
                                "fair": 1147
                },
                "512GB": {
                                "excellent": 1550,
                                "good": 1472,
                                "fair": 1317
                },
                "1TB": {
                                "excellent": 1750,
                                "good": 1662,
                                "fair": 1487
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone 17 Pro Max
        {
            id: 'apple-iphone-17-pro-max',
            brand: 'Apple',
            model: 'iPhone 17 Pro Max',
            image: 'images/phones/apple-iphone-17-pro-max.jpg',
            storages: ["256GB", "512GB", "1TB", "2TB"],
            basePrice: 1520,
            storagePrices: {"256GB": 1520, "512GB": 1750, "1TB": 1920, "2TB": 2070},
            newPhonePrices: {"256GB": 1720, "512GB": 2000, "1TB": 2220, "2TB": 2420},
            buyPrices: {
                "256GB": {
                                "excellent": 1520,
                                "good": 1444,
                                "fair": 1292
                },
                "512GB": {
                                "excellent": 1750,
                                "good": 1662,
                                "fair": 1487
                },
                "1TB": {
                                "excellent": 1920,
                                "good": 1824,
                                "fair": 1632
                },
                "2TB": {
                                "excellent": 2070,
                                "good": 1966,
                                "fair": 1759
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "2TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Apple iPhone Air
        {
            id: 'apple-iphone-air',
            brand: 'Apple',
            model: 'iPhone Air',
            image: 'images/phones/apple-iphone-air.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 850,
            storagePrices: {"256GB": 850, "512GB": 1000, "1TB": 1100},
            newPhonePrices: {"256GB": 1000, "512GB": 1220, "1TB": 1320},
            buyPrices: {
                "256GB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                },
                "512GB": {
                                "excellent": 1000,
                                "good": 950,
                                "fair": 850
                },
                "1TB": {
                                "excellent": 1100,
                                "good": 1045,
                                "fair": 935
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // ========== SAMSUNG PHONES ==========

        // Samsung Galaxy Z Fold 3 5G
        {
            id: 'samsung-galaxy-z-fold-3-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Fold 3 5G',
            image: 'images/phones/samsung-galaxy-z-fold-3-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 200,
            storagePrices: {"256GB": 200, "512GB": 250},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                },
                "512GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Fold 4 5G
        {
            id: 'samsung-galaxy-z-fold-4-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Fold 4 5G',
            image: 'images/phones/samsung-galaxy-z-fold-4-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 350,
            storagePrices: {"256GB": 350, "512GB": 400, "1TB": 500},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "512GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                },
                "1TB": {
                                "excellent": 500,
                                "good": 475,
                                "fair": 425
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Fold 5 5G
        {
            id: 'samsung-galaxy-z-fold-5-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Fold 5 5G',
            image: 'images/phones/samsung-galaxy-z-fold-5-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 550,
            storagePrices: {"256GB": 550, "512GB": 600, "1TB": 650},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                },
                "512GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "1TB": {
                                "excellent": 650,
                                "good": 617,
                                "fair": 552
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Fold 6 5G
        {
            id: 'samsung-galaxy-z-fold-6-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Fold 6 5G',
            image: 'images/phones/samsung-galaxy-z-fold-6-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 770,
            storagePrices: {"256GB": 770, "512GB": 870, "1TB": 970},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 770,
                                "good": 731,
                                "fair": 654
                },
                "512GB": {
                                "excellent": 870,
                                "good": 826,
                                "fair": 739
                },
                "1TB": {
                                "excellent": 970,
                                "good": 921,
                                "fair": 824
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Fold 7 5G
        {
            id: 'samsung-galaxy-z-fold-7-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Fold 7 5G',
            image: 'images/phones/samsung-galaxy-z-fold-7-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 1470,
            storagePrices: {"256GB": 1470, "512GB": 1520, "1TB": 1620},
            newPhonePrices: {"256GB": 1630, "512GB": 1780, "1TB": 1860},
            buyPrices: {
                "256GB": {
                                "excellent": 1470,
                                "good": 1396,
                                "fair": 1249
                },
                "512GB": {
                                "excellent": 1520,
                                "good": 1444,
                                "fair": 1292
                },
                "1TB": {
                                "excellent": 1620,
                                "good": 1539,
                                "fair": 1377
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Flip 4 5G
        {
            id: 'samsung-galaxy-z-flip-4-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Flip 4 5G',
            image: 'images/phones/samsung-galaxy-z-flip-4-5g.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 100,
            storagePrices: {"128GB": 100, "256GB": 150, "512GB": 200},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 100,
                                "good": 95,
                                "fair": 85
                },
                "256GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                },
                "512GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Flip 5 5G
        {
            id: 'samsung-galaxy-z-flip-5-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Flip 5 5G',
            image: 'images/phones/samsung-galaxy-z-flip-5-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 250,
            storagePrices: {"256GB": 250, "512GB": 300},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                },
                "512GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Flip 6 5G
        {
            id: 'samsung-galaxy-z-flip-6-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Flip 6 5G',
            image: 'images/phones/samsung-galaxy-z-flip-6-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 400,
            storagePrices: {"256GB": 400, "512GB": 450},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                },
                "512GB": {
                                "excellent": 450,
                                "good": 427,
                                "fair": 382
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Flip 7 5G
        {
            id: 'samsung-galaxy-z-flip-7-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Flip 7 5G',
            image: 'images/phones/samsung-galaxy-z-flip-7-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 670,
            storagePrices: {"256GB": 670, "512GB": 770},
            newPhonePrices: {"256GB": 900, "512GB": 950},
            buyPrices: {
                "256GB": {
                                "excellent": 670,
                                "good": 636,
                                "fair": 569
                },
                "512GB": {
                                "excellent": 770,
                                "good": 731,
                                "fair": 654
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Z Flip 7 FE 5G
        {
            id: 'samsung-galaxy-z-flip-7-fe-5g',
            brand: 'Samsung',
            model: 'Galaxy Z Flip 7 FE 5G',
            image: 'images/phones/samsung-galaxy-z-flip-7-fe-5g.jpg',
            storages: ["128GB", "256GB"],
            basePrice: 470,
            storagePrices: {"128GB": 470, "256GB": 570},
            newPhonePrices: {"128GB": 620, "256GB": 770},
            buyPrices: {
                "128GB": {
                                "excellent": 470,
                                "good": 446,
                                "fair": 399
                },
                "256GB": {
                                "excellent": 570,
                                "good": 541,
                                "fair": 484
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S21 5G
        {
            id: 'samsung-galaxy-s21-5g',
            brand: 'Samsung',
            model: 'Galaxy S21 5G',
            image: 'images/phones/samsung-galaxy-s21-5g.jpg',
            storages: ["Base"],
            basePrice: 120,
            storagePrices: {"Base": 120},
            newPhonePrices: {},
            buyPrices: {
                "Base": {
                                "excellent": 120,
                                "good": 114,
                                "fair": 102
                }
},
            quantities: {
                "Base": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S21+ 5G
        {
            id: 'samsung-galaxy-s21-plus-5g',
            brand: 'Samsung',
            model: 'Galaxy S21+ 5G',
            image: 'images/phones/samsung-galaxy-s21-plus-5g.jpg',
            storages: ["Base"],
            basePrice: 150,
            storagePrices: {"Base": 150},
            newPhonePrices: {},
            buyPrices: {
                "Base": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                }
},
            quantities: {
                "Base": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S21 Ultra 5G
        {
            id: 'samsung-galaxy-s21-ultra-5g',
            brand: 'Samsung',
            model: 'Galaxy S21 Ultra 5G',
            image: 'images/phones/samsung-galaxy-s21-ultra-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 200,
            storagePrices: {"256GB": 200, "512GB": 250},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                },
                "512GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S21 FE 5G
        {
            id: 'samsung-galaxy-s21-fe-5g',
            brand: 'Samsung',
            model: 'Galaxy S21 FE 5G',
            image: 'images/phones/samsung-galaxy-s21-fe-5g.jpg',
            storages: ["256GB"],
            basePrice: 100,
            storagePrices: {"256GB": 100},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 100,
                                "good": 95,
                                "fair": 85
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S22 5G
        {
            id: 'samsung-galaxy-s22-5g',
            brand: 'Samsung',
            model: 'Galaxy S22 5G',
            image: 'images/phones/samsung-galaxy-s22-5g.jpg',
            storages: ["128GB", "256GB"],
            basePrice: 150,
            storagePrices: {"128GB": 150, "256GB": 200},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                },
                "256GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S22+ 5G
        {
            id: 'samsung-galaxy-s22-plus-5g',
            brand: 'Samsung',
            model: 'Galaxy S22+ 5G',
            image: 'images/phones/samsung-galaxy-s22-plus-5g.jpg',
            storages: ["128GB", "256GB"],
            basePrice: 200,
            storagePrices: {"128GB": 200, "256GB": 250},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 200,
                                "good": 190,
                                "fair": 170
                },
                "256GB": {
                                "excellent": 250,
                                "good": 237,
                                "fair": 212
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S22 Ultra 5G
        {
            id: 'samsung-galaxy-s22-ultra-5g',
            brand: 'Samsung',
            model: 'Galaxy S22 Ultra 5G',
            image: 'images/phones/samsung-galaxy-s22-ultra-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 350,
            storagePrices: {"256GB": 350, "512GB": 400},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                },
                "512GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S23 5G
        {
            id: 'samsung-galaxy-s23-5g',
            brand: 'Samsung',
            model: 'Galaxy S23 5G',
            image: 'images/phones/samsung-galaxy-s23-5g.jpg',
            storages: ["128GB", "256GB"],
            basePrice: 300,
            storagePrices: {"128GB": 300, "256GB": 350},
            newPhonePrices: {},
            buyPrices: {
                "128GB": {
                                "excellent": 300,
                                "good": 285,
                                "fair": 255
                },
                "256GB": {
                                "excellent": 350,
                                "good": 332,
                                "fair": 297
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S23+ 5G
        {
            id: 'samsung-galaxy-s23-plus-5g',
            brand: 'Samsung',
            model: 'Galaxy S23+ 5G',
            image: 'images/phones/samsung-galaxy-s23-plus-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 400,
            storagePrices: {"256GB": 400, "512GB": 450},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 400,
                                "good": 380,
                                "fair": 340
                },
                "512GB": {
                                "excellent": 450,
                                "good": 427,
                                "fair": 382
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S23 Ultra 5G
        {
            id: 'samsung-galaxy-s23-ultra-5g',
            brand: 'Samsung',
            model: 'Galaxy S23 Ultra 5G',
            image: 'images/phones/samsung-galaxy-s23-ultra-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 500,
            storagePrices: {"256GB": 500, "512GB": 550, "1TB": 600},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 500,
                                "good": 475,
                                "fair": 425
                },
                "512GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                },
                "1TB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S23 FE 5G
        {
            id: 'samsung-galaxy-s23-fe-5g',
            brand: 'Samsung',
            model: 'Galaxy S23 FE 5G',
            image: 'images/phones/samsung-galaxy-s23-fe-5g.jpg',
            storages: ["256GB"],
            basePrice: 220,
            storagePrices: {"256GB": 220},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 220,
                                "good": 209,
                                "fair": 187
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S24 5G
        {
            id: 'samsung-galaxy-s24-5g',
            brand: 'Samsung',
            model: 'Galaxy S24 5G',
            image: 'images/phones/samsung-galaxy-s24-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 500,
            storagePrices: {"256GB": 500, "512GB": 550},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 500,
                                "good": 475,
                                "fair": 425
                },
                "512GB": {
                                "excellent": 550,
                                "good": 522,
                                "fair": 467
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S24+ 5G
        {
            id: 'samsung-galaxy-s24-plus-5g',
            brand: 'Samsung',
            model: 'Galaxy S24+ 5G',
            image: 'images/phones/samsung-galaxy-s24-plus-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 570,
            storagePrices: {"256GB": 570, "512GB": 620},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 570,
                                "good": 541,
                                "fair": 484
                },
                "512GB": {
                                "excellent": 620,
                                "good": 589,
                                "fair": 527
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S24 Ultra 5G
        {
            id: 'samsung-galaxy-s24-ultra-5g',
            brand: 'Samsung',
            model: 'Galaxy S24 Ultra 5G',
            image: 'images/phones/samsung-galaxy-s24-ultra-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 700,
            storagePrices: {"256GB": 700, "512GB": 750, "1TB": 850},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 700,
                                "good": 665,
                                "fair": 595
                },
                "512GB": {
                                "excellent": 750,
                                "good": 712,
                                "fair": 637
                },
                "1TB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S24 FE 5G
        {
            id: 'samsung-galaxy-s24-fe-5g',
            brand: 'Samsung',
            model: 'Galaxy S24 FE 5G',
            image: 'images/phones/samsung-galaxy-s24-fe-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 370,
            storagePrices: {"256GB": 370, "512GB": 420},
            newPhonePrices: {},
            buyPrices: {
                "256GB": {
                                "excellent": 370,
                                "good": 351,
                                "fair": 314
                },
                "512GB": {
                                "excellent": 420,
                                "good": 399,
                                "fair": 357
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S25 5G
        {
            id: 'samsung-galaxy-s25-5g',
            brand: 'Samsung',
            model: 'Galaxy S25 5G',
            image: 'images/phones/samsung-galaxy-s25-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 600,
            storagePrices: {"256GB": 600, "512GB": 700},
            newPhonePrices: {"256GB": 850, "512GB": 950},
            buyPrices: {
                "256GB": {
                                "excellent": 600,
                                "good": 570,
                                "fair": 510
                },
                "512GB": {
                                "excellent": 700,
                                "good": 665,
                                "fair": 595
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S25+ 5G
        {
            id: 'samsung-galaxy-s25-plus-5g',
            brand: 'Samsung',
            model: 'Galaxy S25+ 5G',
            image: 'images/phones/samsung-galaxy-s25-plus-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 750,
            storagePrices: {"256GB": 750, "512GB": 850},
            newPhonePrices: {"256GB": 920, "512GB": 1120},
            buyPrices: {
                "256GB": {
                                "excellent": 750,
                                "good": 712,
                                "fair": 637
                },
                "512GB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S25 Ultra 5G
        {
            id: 'samsung-galaxy-s25-ultra-5g',
            brand: 'Samsung',
            model: 'Galaxy S25 Ultra 5G',
            image: 'images/phones/samsung-galaxy-s25-ultra-5g.jpg',
            storages: ["256GB", "512GB", "1TB"],
            basePrice: 850,
            storagePrices: {"256GB": 850, "512GB": 1050, "1TB": 1100},
            newPhonePrices: {"256GB": 1020, "512GB": 1200, "1TB": 1350},
            buyPrices: {
                "256GB": {
                                "excellent": 850,
                                "good": 807,
                                "fair": 722
                },
                "512GB": {
                                "excellent": 1050,
                                "good": 997,
                                "fair": 892
                },
                "1TB": {
                                "excellent": 1100,
                                "good": 1045,
                                "fair": 935
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "1TB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S25 Edge 5G
        {
            id: 'samsung-galaxy-s25-edge-5g',
            brand: 'Samsung',
            model: 'Galaxy S25 Edge 5G',
            image: 'images/phones/samsung-galaxy-s25-edge-5g.jpg',
            storages: ["256GB", "512GB"],
            basePrice: 570,
            storagePrices: {"256GB": 570, "512GB": 670},
            newPhonePrices: {"256GB": 770, "512GB": 870},
            buyPrices: {
                "256GB": {
                                "excellent": 570,
                                "good": 541,
                                "fair": 484
                },
                "512GB": {
                                "excellent": 670,
                                "good": 636,
                                "fair": 569
                }
},
            quantities: {
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy S25 FE 5G
        {
            id: 'samsung-galaxy-s25-fe-5g',
            brand: 'Samsung',
            model: 'Galaxy S25 FE 5G',
            image: 'images/phones/samsung-galaxy-s25-fe-5g.jpg',
            storages: ["128GB", "256GB", "512GB"],
            basePrice: 370,
            storagePrices: {"128GB": 370, "256GB": 470, "512GB": 520},
            newPhonePrices: {"128GB": 520, "256GB": 620, "512GB": 670},
            buyPrices: {
                "128GB": {
                                "excellent": 370,
                                "good": 351,
                                "fair": 314
                },
                "256GB": {
                                "excellent": 470,
                                "good": 446,
                                "fair": 399
                },
                "512GB": {
                                "excellent": 520,
                                "good": 494,
                                "fair": 442
                }
},
            quantities: {
                "128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "512GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy A36 5G
        {
            id: 'samsung-galaxy-a36-5g',
            brand: 'Samsung',
            model: 'Galaxy A36 5G',
            image: 'images/phones/samsung-galaxy-a36-5g.jpg',
            storages: ["8/256GB"],
            basePrice: 170,
            storagePrices: {"8/256GB": 170},
            newPhonePrices: {"8/256GB": 340},
            buyPrices: {
                "8/256GB": {
                                "excellent": 170,
                                "good": 161,
                                "fair": 144
                }
},
            quantities: {
                "8/256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy A55 5G
        {
            id: 'samsung-galaxy-a55-5g',
            brand: 'Samsung',
            model: 'Galaxy A55 5G',
            image: 'images/phones/samsung-galaxy-a55-5g.jpg',
            storages: ["8/128GB", "8/256GB"],
            basePrice: 170,
            storagePrices: {"8/128GB": 170, "8/256GB": 220},
            newPhonePrices: {},
            buyPrices: {
                "8/128GB": {
                                "excellent": 170,
                                "good": 161,
                                "fair": 144
                },
                "8/256GB": {
                                "excellent": 220,
                                "good": 209,
                                "fair": 187
                }
},
            quantities: {
                "8/128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "8/256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy A56 5G
        {
            id: 'samsung-galaxy-a56-5g',
            brand: 'Samsung',
            model: 'Galaxy A56 5G',
            image: 'images/phones/samsung-galaxy-a56-5g.jpg',
            storages: ["12/256GB", "8/256GB"],
            basePrice: 270,
            storagePrices: {"12/256GB": 270, "8/256GB": 360},
            newPhonePrices: {"8/256GB": 380, "12/256GB": 420},
            buyPrices: {
                "12/256GB": {
                                "excellent": 270,
                                "good": 256,
                                "fair": 229
                },
                "8/256GB": {
                                "excellent": 360,
                                "good": 342,
                                "fair": 306
                }
},
            quantities: {
                "12/256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "8/256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy A73 5G
        {
            id: 'samsung-galaxy-a73-5g',
            brand: 'Samsung',
            model: 'Galaxy A73 5G',
            image: 'images/phones/samsung-galaxy-a73-5g.jpg',
            storages: ["8/128GB", "8/256GB"],
            basePrice: 100,
            storagePrices: {"8/128GB": 100, "8/256GB": 150},
            newPhonePrices: {},
            buyPrices: {
                "8/128GB": {
                                "excellent": 100,
                                "good": 95,
                                "fair": 85
                },
                "8/256GB": {
                                "excellent": 150,
                                "good": 142,
                                "fair": 127
                }
},
            quantities: {
                "8/128GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                },
                "8/256GB": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Buds 3
        {
            id: 'samsung-galaxy-buds-3',
            brand: 'Samsung',
            model: 'Galaxy Buds 3',
            image: 'images/phones/samsung-galaxy-buds-3.jpg',
            storages: ["Base"],
            basePrice: 50,
            storagePrices: {"Base": 50},
            newPhonePrices: {"Base": 50},
            buyPrices: {
                "Base": {
                                "excellent": 50,
                                "good": 47,
                                "fair": 42
                }
},
            quantities: {
                "Base": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        },

        // Samsung Galaxy Buds 3 Pro
        {
            id: 'samsung-galaxy-buds-3-pro',
            brand: 'Samsung',
            model: 'Galaxy Buds 3 Pro',
            image: 'images/phones/samsung-galaxy-buds-3-pro.jpg',
            storages: ["Base"],
            basePrice: 130,
            storagePrices: {"Base": 130},
            newPhonePrices: {"Base": 130},
            buyPrices: {
                "Base": {
                                "excellent": 130,
                                "good": 123,
                                "fair": 110
                }
},
            quantities: {
                "Base": {
                                "excellent": 0,
                                "good": 0,
                                "fair": 0
                }
},
            colors: [],
            display: true,
            available: true
        }
    ];

    // Save to localStorage
    localStorage.setItem('ktmobile_phones', JSON.stringify(phones));

    console.log('Imported ' + phones.length + ' phones to localStorage');

    return {
        added: phones.length,
        updated: 0,
        total: phones.length
    };
}

// Make function available globally
if (typeof window !== 'undefined') {
    window.importExactPrices = importExactPrices;
}
