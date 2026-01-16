/**
 * Price Comparison and Update Script
 * Compares WhyMobile and RedWhite prices and takes the highest
 */

// WhyMobile Data (Used Prices)
const whyMobileUsed = {
    // iPhone 17 Series
    'iPhone 17 256GB': 900,
    'iPhone 17 512GB': 1000,
    'iPhone 17 Pro 256GB': 1300,
    'iPhone 17 Pro 512GB': 1520,
    'iPhone 17 Pro 1TB': 1700,
    'iPhone 17 Pro Max 256GB': 1500, // Orange
    'iPhone 17 Pro Max 512GB': 1700, // Orange
    'iPhone 17 Pro Max 1TB': 2000, // Orange
    'iPhone 17 Pro Max 2TB': 2250, // Orange

    // iPhone 16 Series
    'iPhone 16e 128GB': 460,
    'iPhone 16e 256GB': 560,
    'iPhone 16e 512GB': 650,
    'iPhone 16 128GB': 600,
    'iPhone 16 256GB': 720,
    'iPhone 16 512GB': 760,
    'iPhone 16 Plus 128GB': 660,
    'iPhone 16 Plus 256GB': 810,
    'iPhone 16 Plus 512GB': 830,
    'iPhone 16 Pro 128GB': 720,
    'iPhone 16 Pro 256GB': 860,
    'iPhone 16 Pro 512GB': 970,
    'iPhone 16 Pro 1TB': 1020,
    'iPhone 16 Pro Max 256GB': 1000,
    'iPhone 16 Pro Max 512GB': 1100,
    'iPhone 16 Pro Max 1TB': 1150,

    // iPhone 15 Series
    'iPhone 15 128GB': 460,
    'iPhone 15 256GB': 530,
    'iPhone 15 512GB': 580,
    'iPhone 15 Plus 128GB': 530,
    'iPhone 15 Plus 256GB': 580,
    'iPhone 15 Plus 512GB': 630,
    'iPhone 15 Pro 128GB': 580,
    'iPhone 15 Pro 256GB': 660,
    'iPhone 15 Pro 512GB': 750,
    'iPhone 15 Pro 1TB': 800,
    'iPhone 15 Pro Max 256GB': 760,
    'iPhone 15 Pro Max 512GB': 830,
    'iPhone 15 Pro Max 1TB': 900,

    // iPhone 14 Series
    'iPhone 14 128GB': 330,
    'iPhone 14 256GB': 380,
    'iPhone 14 512GB': 430,
    'iPhone 14 Plus 128GB': 400,
    'iPhone 14 Plus 256GB': 450,
    'iPhone 14 Plus 512GB': 520,
    'iPhone 14 Pro 128GB': 460,
    'iPhone 14 Pro 256GB': 520,
    'iPhone 14 Pro 512GB': 560,
    'iPhone 14 Pro 1TB': 600,
    'iPhone 14 Pro Max 128GB': 520,
    'iPhone 14 Pro Max 256GB': 600,
    'iPhone 14 Pro Max 512GB': 680,
    'iPhone 14 Pro Max 1TB': 750,

    // iPhone 13 Series
    'iPhone 13 mini 128GB': 200,
    'iPhone 13 mini 256GB': 250,
    'iPhone 13 mini 512GB': 300,
    'iPhone 13 128GB': 260,
    'iPhone 13 256GB': 300,
    'iPhone 13 512GB': 360,
    'iPhone 13 Pro 128GB': 320,
    'iPhone 13 Pro 256GB': 380,
    'iPhone 13 Pro 512GB': 430,
    'iPhone 13 Pro 1TB': 480,
    'iPhone 13 Pro Max 128GB': 420,
    'iPhone 13 Pro Max 256GB': 460,
    'iPhone 13 Pro Max 512GB': 500,

    // iPhone 12 Series
    'iPhone 12 mini 128GB': 130,
    'iPhone 12 mini 256GB': 160,
    'iPhone 12 128GB': 200,
    'iPhone 12 256GB': 260,
    'iPhone 12 Pro 128GB': 280,
    'iPhone 12 Pro 256GB': 330,
    'iPhone 12 Pro 512GB': 380,
    'iPhone 12 Pro Max 128GB': 330,
    'iPhone 12 Pro Max 256GB': 380,
    'iPhone 12 Pro Max 512GB': 420,

    // iPhone 11 Series
    'iPhone 11 128GB': 160,
    'iPhone 11 256GB': 200,
    'iPhone 11 Pro 256GB': 220,
    'iPhone 11 Pro 512GB': 250,
    'iPhone 11 Pro Max 256GB': 260,
    'iPhone 11 Pro Max 512GB': 300,

    // Samsung Galaxy S25 Series
    'Galaxy S25 256GB': 560,
    'Galaxy S25 512GB': 650,
    'Galaxy S25 Plus 256GB': 680,
    'Galaxy S25 Plus 512GB': 760,
    'Galaxy S25 Ultra 256GB': 800,
    'Galaxy S25 Ultra 512GB': 920,
    'Galaxy S25 Ultra 1TB': 1020,

    // Samsung Galaxy S24 Series
    'Galaxy S24 256GB': 380,
    'Galaxy S24 512GB': 450,
    'Galaxy S24 FE 256GB': 300,
    'Galaxy S24 FE 512GB': 360,
    'Galaxy S24 Plus 256GB': 480,
    'Galaxy S24 Plus 512GB': 530,
    'Galaxy S24 Ultra 256GB': 580,
    'Galaxy S24 Ultra 512GB': 650,
    'Galaxy S24 Ultra 1TB': 700,

    // Samsung Galaxy S23 Series
    'Galaxy S23 256GB': 250,
    'Galaxy S23 FE 256GB': 200,
    'Galaxy S23 Plus 256GB': 330,
    'Galaxy S23 Plus 512GB': 370,
    'Galaxy S23 Ultra 256GB': 400,
    'Galaxy S23 Ultra 512GB': 450,

    // Samsung Galaxy S22 Series
    'Galaxy S22 Ultra 256GB': 270,
    'Galaxy S22 Ultra 512GB': 320,

    // Samsung Galaxy Z Fold Series
    'Galaxy Z Fold 7 256GB': 1220,
    'Galaxy Z Fold 7 512GB': 1350,
    'Galaxy Z Fold 7 1TB': 1450,
    'Galaxy Z Fold 6 256GB': 770,
    'Galaxy Z Fold 6 512GB': 870,
    'Galaxy Z Fold 5 256GB': 550,
    'Galaxy Z Fold 4 256GB': 350,

    // Samsung Galaxy Z Flip Series
    'Galaxy Z Flip 7 256GB': 550,
    'Galaxy Z Flip 7 512GB': 650,
    'Galaxy Z Flip 7 FE 128GB': 300,
    'Galaxy Z Flip 7 FE 256GB': 450,
    'Galaxy Z Flip 6 256GB': 400,
    'Galaxy Z Flip 5 256GB': 250,
    'Galaxy Z Flip 4 128GB': 100,

    // Samsung Galaxy A Series
    'Galaxy A55 256GB': 180,
    'Galaxy A56 256GB': 250,
    'Galaxy A56 128GB': 180,

    // Samsung TriFold
    'Samsung TriFold 512GB': 4220,
};

// WhyMobile Data (New Prices)
const whyMobileNew = {
    // iPhone 17 Series
    'iPhone 17 256GB': 1170,
    'iPhone 17 512GB': 1450,
    'iPhone 17 Pro 256GB': 1570,
    'iPhone 17 Pro 512GB': 1840,
    'iPhone 17 Pro 1TB': 2050,
    'iPhone 17 Pro Max 256GB Silver': 1730,
    'iPhone 17 Pro Max 512GB Silver': 1960,
    'iPhone 17 Pro Max 1TB Silver': 2250,
    'iPhone 17 Pro Max 2TB Silver': 2450,

    // iPhone 16 Series
    'iPhone 16e 128GB': 660,
    'iPhone 16e 256GB': 770,
    'iPhone 16 128GB': 860,
    'iPhone 16 256GB': 1000,
    'iPhone 16 Pro 256GB': 1300,
    'iPhone 16 Pro 512GB': 1500,
    'iPhone 16 Pro Max 256GB': 1430,
    'iPhone 16 Pro Max 512GB': 1630,

    // Samsung Galaxy S25 Series
    'Galaxy S25 256GB': 760,
    'Galaxy S25 512GB': 850,
    'Galaxy S25 Plus 256GB': 880,
    'Galaxy S25 Plus 512GB': 1000,
    'Galaxy S25 Ultra 256GB': 1040,
    'Galaxy S25 Ultra 512GB': 1250,
    'Galaxy S25 Ultra 1TB': 1350,
    'Galaxy S25 FE 128GB': 480,
    'Galaxy S25 FE 256GB': 580,
    'Galaxy S25 FE 512GB': 660,

    // Samsung Galaxy A Series
    'Galaxy A17 4G 128GB': 160,
    'Galaxy A17 5G 128GB': 200,
    'Galaxy A26 256GB': 270,
    'Galaxy A36 256GB': 330,
    'Galaxy A56 256GB': 420,
    'Galaxy A56 128GB': 380,

    // Samsung Z Fold Series
    'Galaxy Z Fold 7 256GB': 1630,
    'Galaxy Z Fold 7 512GB': 1780,
    'Galaxy Z Fold 7 1TB': 1860,
    'Samsung TriFold 512GB': 4000,

    // Samsung Z Flip Series
    'Galaxy Z Flip 7 256GB': 800,
    'Galaxy Z Flip 7 512GB': 920,
    'Galaxy Z Flip 7 FE 128GB': 500,
    'Galaxy Z Flip 7 FE 256GB': 680,
};

// RedWhite Data (Used Prices)
const redWhiteUsed = {
    // iPhone 17 Series (all Blue version prices, highest)
    'iPhone 17 Pro Max 256GB': 1520,
    'iPhone 17 Pro Max 512GB': 1750,
    'iPhone 17 Pro Max 1TB': 1920,
    'iPhone 17 Pro Max 2TB': 2070,
    'iPhone 17 Pro 256GB': 1350,
    'iPhone 17 Pro 512GB': 1550,
    'iPhone 17 Pro 1TB': 1750,
    'iPhone 17 Air 256GB': 900, // iPhone Air
    'iPhone 17 Air 512GB': 1000,
    'iPhone 17 Air 1TB': 1100,
    'iPhone 17 256GB': 900,
    'iPhone 17 512GB': 1150,

    // iPhone 16 Series
    'iPhone 16e 128GB': 520,
    'iPhone 16e 256GB': 620,
    'iPhone 16e 512GB': 720,
    'iPhone 16 128GB': 670,
    'iPhone 16 256GB': 720,
    'iPhone 16 512GB': 770,
    'iPhone 16 Plus 128GB': 750,
    'iPhone 16 Plus 256GB': 800,
    'iPhone 16 Plus 512GB': 850,
    'iPhone 16 Pro 128GB': 870,
    'iPhone 16 Pro 256GB': 920,
    'iPhone 16 Pro 512GB': 970,
    'iPhone 16 Pro 1TB': 1020,
    'iPhone 16 Pro Max 256GB': 1020,
    'iPhone 16 Pro Max 512GB': 1070,
    'iPhone 16 Pro Max 1TB': 1120,

    // iPhone 15 Series
    'iPhone 15 128GB': 500,
    'iPhone 15 256GB': 550,
    'iPhone 15 512GB': 600,
    'iPhone 15 Plus 128GB': 550,
    'iPhone 15 Plus 256GB': 600,
    'iPhone 15 Plus 512GB': 650,
    'iPhone 15 Pro 128GB': 600,
    'iPhone 15 Pro 256GB': 650,
    'iPhone 15 Pro 512GB': 700,
    'iPhone 15 Pro 1TB': 750,
    'iPhone 15 Pro Max 256GB': 800,
    'iPhone 15 Pro Max 512GB': 850,
    'iPhone 15 Pro Max 1TB': 900,

    // iPhone 14 Series
    'iPhone 14 128GB': 350,
    'iPhone 14 256GB': 400,
    'iPhone 14 512GB': 450,
    'iPhone 14 Plus 128GB': 420,
    'iPhone 14 Plus 256GB': 470,
    'iPhone 14 Plus 512GB': 520,
    'iPhone 14 Pro 128GB': 500,
    'iPhone 14 Pro 256GB': 550,
    'iPhone 14 Pro 512GB': 600,
    'iPhone 14 Pro 1TB': 650,
    'iPhone 14 Pro Max 128GB': 600,
    'iPhone 14 Pro Max 256GB': 650,
    'iPhone 14 Pro Max 512GB': 700,
    'iPhone 14 Pro Max 1TB': 750,

    // iPhone 13 Series
    'iPhone 13 mini 128GB': 250,
    'iPhone 13 mini 256GB': 300,
    'iPhone 13 mini 512GB': 350,
    'iPhone 13 128GB': 300,
    'iPhone 13 256GB': 350,
    'iPhone 13 512GB': 400,
    'iPhone 13 Pro 128GB': 380,
    'iPhone 13 Pro 256GB': 430,
    'iPhone 13 Pro 512GB': 480,
    'iPhone 13 Pro 1TB': 530,
    'iPhone 13 Pro Max 128GB': 460,
    'iPhone 13 Pro Max 256GB': 510,
    'iPhone 13 Pro Max 512GB': 560,
    'iPhone 13 Pro Max 1TB': 610,

    // iPhone 12 Series
    'iPhone 12 mini 128GB': 150,
    'iPhone 12 mini 256GB': 180,
    'iPhone 12 128GB': 250,
    'iPhone 12 256GB': 300,
    'iPhone 12 Pro 128GB': 300,
    'iPhone 12 Pro 256GB': 350,
    'iPhone 12 Pro 512GB': 400,
    'iPhone 12 Pro Max 128GB': 350,
    'iPhone 12 Pro Max 256GB': 400,
    'iPhone 12 Pro Max 512GB': 450,

    // iPhone 11 Series
    'iPhone 11 128GB': 150,
    'iPhone 11 256GB': 200,
    'iPhone 11 Pro 256GB': 220,
    'iPhone 11 Pro 512GB': 250,
    'iPhone 11 Pro Max 256GB': 260,
    'iPhone 11 Pro Max 512GB': 300,

    // Samsung S25 Series
    'Galaxy S25 256GB': 600,
    'Galaxy S25 512GB': 700,
    'Galaxy S25 Plus 256GB': 750,
    'Galaxy S25 Plus 512GB': 850,
    'Galaxy S25 Ultra 256GB': 850,
    'Galaxy S25 Ultra 512GB': 1050,
    'Galaxy S25 Ultra 1TB': 1100,
    'Galaxy S25 Edge 256GB': 570,
    'Galaxy S25 Edge 512GB': 670,
    'Galaxy S25 FE 256GB': 470,
    'Galaxy S25 FE 512GB': 520,

    // Samsung S24 Series
    'Galaxy S24 256GB': 500,
    'Galaxy S24 512GB': 550,
    'Galaxy S24 FE 256GB': 370,
    'Galaxy S24 FE 512GB': 420,
    'Galaxy S24 Plus 256GB': 570,
    'Galaxy S24 Plus 512GB': 620,
    'Galaxy S24 Ultra 256GB': 700,
    'Galaxy S24 Ultra 512GB': 750,
    'Galaxy S24 Ultra 1TB': 850,

    // Samsung S23 Series
    'Galaxy S23 256GB': 300,
    'Galaxy S23 FE 256GB': 220,
    'Galaxy S23 Plus 256GB': 400,
    'Galaxy S23 Plus 512GB': 450,
    'Galaxy S23 Ultra 256GB': 500,
    'Galaxy S23 Ultra 512GB': 550,
    'Galaxy S23 Ultra 1TB': 600,

    // Samsung S22 Series
    'Galaxy S22 Ultra 256GB': 350,
    'Galaxy S22 Ultra 512GB': 400,

    // Samsung Z Fold Series
    'Galaxy Z Fold 7 256GB': 1470,
    'Galaxy Z Fold 7 512GB': 1520,
    'Galaxy Z Fold 7 1TB': 1620,
    'Galaxy Z Fold 6 256GB': 770,
    'Galaxy Z Fold 6 512GB': 870,
    'Galaxy Z Fold 6 1TB': 970,
    'Galaxy Z Fold 5 256GB': 550,
    'Galaxy Z Fold 5 512GB': 600,
    'Galaxy Z Fold 5 1TB': 650,
    'Galaxy Z Fold 4 256GB': 350,
    'Galaxy Z Fold 4 512GB': 400,
    'Galaxy Z Fold 4 1TB': 500,

    // Samsung Z Flip Series
    'Galaxy Z Flip 7 256GB': 670,
    'Galaxy Z Flip 7 512GB': 770,
    'Galaxy Z Flip 7 FE 128GB': 470,
    'Galaxy Z Flip 7 FE 256GB': 570,
    'Galaxy Z Flip 6 256GB': 400,
    'Galaxy Z Flip 6 512GB': 450,
    'Galaxy Z Flip 5 256GB': 250,
    'Galaxy Z Flip 5 512GB': 300,
    'Galaxy Z Flip 4 128GB': 100,
    'Galaxy Z Flip 4 256GB': 150,
    'Galaxy Z Flip 4 512GB': 200,

    // Samsung A Series
    'Galaxy A36 256GB': 270,
    'Galaxy A56 256GB': 270,
    'Galaxy A55 256GB': 220,
};

// RedWhite Data (New Prices)
const redWhiteNew = {
    // iPhone 17 Series (highest prices for each model)
    'iPhone 17 Pro Max 256GB': 1730, // Silver
    'iPhone 17 Pro Max 512GB': 2000, // Orange/Silver
    'iPhone 17 Pro Max 1TB': 2220, // Silver
    'iPhone 17 Pro Max 2TB': 2420, // Orange/Silver/Blue
    'iPhone 17 Pro 256GB': 1600,
    'iPhone 17 Pro 512GB': 1750,
    'iPhone 17 Pro 1TB': 1950,
    'iPhone 17 Air 256GB': 1050,
    'iPhone 17 Air 512GB': 1220,
    'iPhone 17 Air 1TB': 1320,
    'iPhone 17 256GB': 1200,
    'iPhone 17 512GB': 1370,

    // iPhone 16 Series
    'iPhone 16e 128GB': 650,
    'iPhone 16e 256GB': 770,
    'iPhone 16e 512GB': 870,
    'iPhone 16 128GB': 920,
    'iPhone 16 256GB': 1020,
    'iPhone 16 Plus 128GB': 1050,
    'iPhone 16 Plus 256GB': 1150,
    'iPhone 16 Pro 128GB': 870,
    'iPhone 16 Pro 256GB': 920,
    'iPhone 16 Pro 512GB': 970,
    'iPhone 16 Pro 1TB': 1020,
    'iPhone 16 Pro Max 256GB': 1020,
    'iPhone 16 Pro Max 512GB': 1070,
    'iPhone 16 Pro Max 1TB': 1120,

    // Samsung S25 Series
    'Galaxy S25 256GB': 850,
    'Galaxy S25 512GB': 950,
    'Galaxy S25 Plus 256GB': 920,
    'Galaxy S25 Plus 512GB': 1120,
    'Galaxy S25 Ultra 256GB': 1020,
    'Galaxy S25 Ultra 512GB': 1200,
    'Galaxy S25 FE 128GB': 520,
    'Galaxy S25 FE 256GB': 620,
    'Galaxy S25 FE 512GB': 670,
    'Galaxy S25 Edge 256GB': 770,
    'Galaxy S25 Edge 512GB': 870,

    // Samsung A Series
    'Galaxy A17 4G 128GB': 160,
    'Galaxy A17 5G 128GB': 200,
    'Galaxy A26 256GB': 270,
    'Galaxy A36 256GB': 340,
    'Galaxy A56 128GB': 380,
    'Galaxy A56 256GB': 420,

    // Samsung Z Fold Series
    'Galaxy Z Fold 7 256GB': 1720,
    'Galaxy Z Fold 7 512GB': 1870,
    'Galaxy Z Fold 7 1TB': 1920,
    'Samsung TriFold 512GB': 4220,

    // Samsung Z Flip Series
    'Galaxy Z Flip 7 256GB': 900,
    'Galaxy Z Flip 7 512GB': 950,
    'Galaxy Z Flip 7 FE 128GB': 620,
    'Galaxy Z Flip 7 FE 256GB': 770,
};

// Compare and get highest prices
function getHighestPrice(model, priceType) {
    const prices = [];

    if (priceType === 'used') {
        if (whyMobileUsed[model]) prices.push(whyMobileUsed[model]);
        if (redWhiteUsed[model]) prices.push(redWhiteUsed[model]);
    } else {
        if (whyMobileNew[model]) prices.push(whyMobileNew[model]);
        if (redWhiteNew[model]) prices.push(redWhiteNew[model]);
    }

    return prices.length > 0 ? Math.max(...prices) : null;
}

// Generate updated phone models for sell-phones.html
const updatedPhoneModels = {
    apple: [
        // iPhone 17 Series
        { name: 'iPhone 17 Pro Max', storage: ['256GB', '512GB', '1TB', '2TB'],
          usedPrice: getHighestPrice('iPhone 17 Pro Max 256GB', 'used') || 1520,
          newPrice: getHighestPrice('iPhone 17 Pro Max 256GB', 'new') || 1730 },
        { name: 'iPhone 17 Pro', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 17 Pro 256GB', 'used') || 1350,
          newPrice: getHighestPrice('iPhone 17 Pro 256GB', 'new') || 1600 },
        { name: 'iPhone 17 Air', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 17 Air 256GB', 'used') || 900,
          newPrice: getHighestPrice('iPhone 17 Air 256GB', 'new') || 1050 },
        { name: 'iPhone 17', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 17 256GB', 'used') || 900,
          newPrice: getHighestPrice('iPhone 17 256GB', 'new') || 1200 },

        // iPhone 16 Series
        { name: 'iPhone 16 Pro Max', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 16 Pro Max 256GB', 'used') || 1020,
          newPrice: getHighestPrice('iPhone 16 Pro Max 256GB', 'new') || 1430 },
        { name: 'iPhone 16 Pro', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 16 Pro 128GB', 'used') || 870,
          newPrice: getHighestPrice('iPhone 16 Pro 256GB', 'new') || 1300 },
        { name: 'iPhone 16 Plus', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 16 Plus 128GB', 'used') || 750,
          newPrice: getHighestPrice('iPhone 16 Plus 128GB', 'new') || 1050 },
        { name: 'iPhone 16', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 16 128GB', 'used') || 670,
          newPrice: getHighestPrice('iPhone 16 128GB', 'new') || 920 },
        { name: 'iPhone 16e', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 16e 128GB', 'used') || 520,
          newPrice: getHighestPrice('iPhone 16e 128GB', 'new') || 660 },

        // iPhone 15 Series
        { name: 'iPhone 15 Pro Max', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 15 Pro Max 256GB', 'used') || 800,
          newPrice: getHighestPrice('iPhone 15 Pro Max 256GB', 'new') || 800 },
        { name: 'iPhone 15 Pro', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 15 Pro 128GB', 'used') || 600,
          newPrice: getHighestPrice('iPhone 15 Pro 128GB', 'new') || 650 },
        { name: 'iPhone 15 Plus', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 15 Plus 128GB', 'used') || 550,
          newPrice: getHighestPrice('iPhone 15 Plus 128GB', 'new') || 600 },
        { name: 'iPhone 15', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 15 128GB', 'used') || 500,
          newPrice: getHighestPrice('iPhone 15 128GB', 'new') || 550 },

        // iPhone 14 Series
        { name: 'iPhone 14 Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 14 Pro Max 128GB', 'used') || 600,
          newPrice: getHighestPrice('iPhone 14 Pro Max 128GB', 'new') || 600 },
        { name: 'iPhone 14 Pro', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 14 Pro 128GB', 'used') || 500,
          newPrice: getHighestPrice('iPhone 14 Pro 128GB', 'new') || 550 },
        { name: 'iPhone 14 Plus', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 14 Plus 128GB', 'used') || 420,
          newPrice: getHighestPrice('iPhone 14 Plus 128GB', 'new') || 470 },
        { name: 'iPhone 14', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 14 128GB', 'used') || 350,
          newPrice: getHighestPrice('iPhone 14 128GB', 'new') || 400 },

        // iPhone 13 Series
        { name: 'iPhone 13 Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 13 Pro Max 128GB', 'used') || 460,
          newPrice: getHighestPrice('iPhone 13 Pro Max 128GB', 'new') || 510 },
        { name: 'iPhone 13 Pro', storage: ['128GB', '256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('iPhone 13 Pro 128GB', 'used') || 380,
          newPrice: getHighestPrice('iPhone 13 Pro 128GB', 'new') || 430 },
        { name: 'iPhone 13 mini', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 13 mini 128GB', 'used') || 250,
          newPrice: getHighestPrice('iPhone 13 mini 128GB', 'new') || 300 },
        { name: 'iPhone 13', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 13 128GB', 'used') || 300,
          newPrice: getHighestPrice('iPhone 13 128GB', 'new') || 350 },

        // iPhone 12 Series
        { name: 'iPhone 12 Pro Max', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 12 Pro Max 128GB', 'used') || 370,
          newPrice: getHighestPrice('iPhone 12 Pro Max 128GB', 'new') || 400 },
        { name: 'iPhone 12 Pro', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 12 Pro 128GB', 'used') || 320,
          newPrice: getHighestPrice('iPhone 12 Pro 128GB', 'new') || 350 },
        { name: 'iPhone 12', storage: ['64GB', '128GB', '256GB'],
          usedPrice: getHighestPrice('iPhone 12 128GB', 'used') || 250,
          newPrice: getHighestPrice('iPhone 12 128GB', 'new') || 300 },
        { name: 'iPhone 12 mini', storage: ['64GB', '128GB', '256GB'],
          usedPrice: getHighestPrice('iPhone 12 mini 128GB', 'used') || 150,
          newPrice: getHighestPrice('iPhone 12 mini 128GB', 'new') || 180 },

        // iPhone 11 Series
        { name: 'iPhone 11 Pro Max', storage: ['64GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 11 Pro Max 256GB', 'used') || 260,
          newPrice: getHighestPrice('iPhone 11 Pro Max 256GB', 'new') || 300 },
        { name: 'iPhone 11 Pro', storage: ['64GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('iPhone 11 Pro 256GB', 'used') || 220,
          newPrice: getHighestPrice('iPhone 11 Pro 256GB', 'new') || 250 },
        { name: 'iPhone 11', storage: ['64GB', '128GB', '256GB'],
          usedPrice: getHighestPrice('iPhone 11 128GB', 'used') || 160,
          newPrice: getHighestPrice('iPhone 11 128GB', 'new') || 200 }
    ],
    samsung: [
        // Samsung S25 Series
        { name: 'Galaxy S25 Ultra', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy S25 Ultra 256GB', 'used') || 850,
          newPrice: getHighestPrice('Galaxy S25 Ultra 256GB', 'new') || 1040 },
        { name: 'Galaxy S25 Plus', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S25 Plus 256GB', 'used') || 750,
          newPrice: getHighestPrice('Galaxy S25 Plus 256GB', 'new') || 920 },
        { name: 'Galaxy S25', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S25 256GB', 'used') || 600,
          newPrice: getHighestPrice('Galaxy S25 256GB', 'new') || 850 },
        { name: 'Galaxy S25 Edge', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S25 Edge 256GB', 'used') || 570,
          newPrice: getHighestPrice('Galaxy S25 Edge 256GB', 'new') || 770 },
        { name: 'Galaxy S25 FE', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S25 FE 256GB', 'used') || 470,
          newPrice: getHighestPrice('Galaxy S25 FE 128GB', 'new') || 520 },

        // Samsung S24 Series
        { name: 'Galaxy S24 Ultra', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy S24 Ultra 256GB', 'used') || 700,
          newPrice: getHighestPrice('Galaxy S24 Ultra 256GB', 'new') || 700 },
        { name: 'Galaxy S24 Plus', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S24 Plus 256GB', 'used') || 570,
          newPrice: getHighestPrice('Galaxy S24 Plus 256GB', 'new') || 570 },
        { name: 'Galaxy S24', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S24 256GB', 'used') || 500,
          newPrice: getHighestPrice('Galaxy S24 256GB', 'new') || 500 },
        { name: 'Galaxy S24 FE', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S24 FE 256GB', 'used') || 370,
          newPrice: getHighestPrice('Galaxy S24 FE 256GB', 'new') || 370 },

        // Samsung S23 Series
        { name: 'Galaxy S23 Ultra', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy S23 Ultra 256GB', 'used') || 500,
          newPrice: getHighestPrice('Galaxy S23 Ultra 256GB', 'new') || 550 },
        { name: 'Galaxy S23 Plus', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S23 Plus 256GB', 'used') || 400,
          newPrice: getHighestPrice('Galaxy S23 Plus 256GB', 'new') || 450 },
        { name: 'Galaxy S23', storage: ['128GB', '256GB'],
          usedPrice: getHighestPrice('Galaxy S23 256GB', 'used') || 300,
          newPrice: getHighestPrice('Galaxy S23 256GB', 'new') || 350 },
        { name: 'Galaxy S23 FE', storage: ['256GB'],
          usedPrice: getHighestPrice('Galaxy S23 FE 256GB', 'used') || 220,
          newPrice: getHighestPrice('Galaxy S23 FE 256GB', 'new') || 220 },

        // Samsung S22 Series
        { name: 'Galaxy S22 Ultra', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy S22 Ultra 256GB', 'used') || 350,
          newPrice: getHighestPrice('Galaxy S22 Ultra 256GB', 'new') || 400 },
        { name: 'Galaxy S22 Plus', storage: ['128GB', '256GB'],
          usedPrice: 250,
          newPrice: 250 },
        { name: 'Galaxy S22', storage: ['128GB', '256GB'],
          usedPrice: 200,
          newPrice: 200 },

        // Samsung Z Fold Series
        { name: 'Galaxy Z Fold 7', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy Z Fold 7 256GB', 'used') || 1470,
          newPrice: getHighestPrice('Galaxy Z Fold 7 256GB', 'new') || 1720 },
        { name: 'Galaxy Z Fold 6', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy Z Fold 6 256GB', 'used') || 770,
          newPrice: getHighestPrice('Galaxy Z Fold 6 256GB', 'new') || 770 },
        { name: 'Galaxy Z Fold 5', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy Z Fold 5 256GB', 'used') || 550,
          newPrice: getHighestPrice('Galaxy Z Fold 5 256GB', 'new') || 600 },
        { name: 'Galaxy Z Fold 4', storage: ['256GB', '512GB', '1TB'],
          usedPrice: getHighestPrice('Galaxy Z Fold 4 256GB', 'used') || 350,
          newPrice: getHighestPrice('Galaxy Z Fold 4 256GB', 'new') || 400 },

        // Samsung Z Flip Series
        { name: 'Galaxy Z Flip 7', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy Z Flip 7 256GB', 'used') || 670,
          newPrice: getHighestPrice('Galaxy Z Flip 7 256GB', 'new') || 900 },
        { name: 'Galaxy Z Flip 7 FE', storage: ['128GB', '256GB'],
          usedPrice: getHighestPrice('Galaxy Z Flip 7 FE 128GB', 'used') || 470,
          newPrice: getHighestPrice('Galaxy Z Flip 7 FE 128GB', 'new') || 620 },
        { name: 'Galaxy Z Flip 6', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy Z Flip 6 256GB', 'used') || 400,
          newPrice: getHighestPrice('Galaxy Z Flip 6 256GB', 'new') || 450 },
        { name: 'Galaxy Z Flip 5', storage: ['256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy Z Flip 5 256GB', 'used') || 250,
          newPrice: getHighestPrice('Galaxy Z Flip 5 256GB', 'new') || 300 },
        { name: 'Galaxy Z Flip 4', storage: ['128GB', '256GB', '512GB'],
          usedPrice: getHighestPrice('Galaxy Z Flip 4 128GB', 'used') || 100,
          newPrice: getHighestPrice('Galaxy Z Flip 4 128GB', 'new') || 150 },

        // Samsung TriFold
        { name: 'Samsung TriFold', storage: ['512GB'],
          usedPrice: getHighestPrice('Samsung TriFold 512GB', 'used') || 4220,
          newPrice: getHighestPrice('Samsung TriFold 512GB', 'new') || 4220 },

        // Samsung A Series
        { name: 'Galaxy A56', storage: ['12/256GB', '8/256GB'],
          usedPrice: getHighestPrice('Galaxy A56 256GB', 'used') || 270,
          newPrice: getHighestPrice('Galaxy A56 256GB', 'new') || 420 },
        { name: 'Galaxy A55', storage: ['8/256GB'],
          usedPrice: getHighestPrice('Galaxy A55 256GB', 'used') || 220,
          newPrice: getHighestPrice('Galaxy A55 256GB', 'new') || 220 },
        { name: 'Galaxy A36', storage: ['8/256GB'],
          usedPrice: getHighestPrice('Galaxy A36 256GB', 'used') || 270,
          newPrice: getHighestPrice('Galaxy A36 256GB', 'new') || 340 },
        { name: 'Galaxy A26', storage: ['8/256GB'],
          usedPrice: 270,
          newPrice: 270 },
        { name: 'Galaxy A17 5G', storage: ['8/128GB'],
          usedPrice: 200,
          newPrice: getHighestPrice('Galaxy A17 5G 128GB', 'new') || 200 },
        { name: 'Galaxy A17 4G', storage: ['8/128GB'],
          usedPrice: 160,
          newPrice: getHighestPrice('Galaxy A17 4G 128GB', 'new') || 160 }
    ]
};

console.log('Updated Phone Models:', JSON.stringify(updatedPhoneModels, null, 2));

module.exports = { updatedPhoneModels, getHighestPrice };
