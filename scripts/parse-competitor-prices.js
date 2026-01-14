/**
 * Competitor Price Parser and Comparator
 * Processes WhyMobile and RedWhiteMobile pricing data
 * Automatically selects highest prices for IBOX pricing
 */

const competitorData = {
  // iPhone Models - USED PRICES
  used: {
    iphone: {
      // iPhone 16 Series
      "iPhone 16e 128GB": { whymobile: 460, redwhite: 520, highest: 520 },
      "iPhone 16e 256GB": { whymobile: 560, redwhite: 620, highest: 620 },
      "iPhone 16e 512GB": { whymobile: 650, redwhite: 720, highest: 720 },
      "iPhone 16 128GB": { whymobile: 600, redwhite: 670, highest: 670 },
      "iPhone 16 256GB": { whymobile: 720, redwhite: 720, highest: 720 },
      "iPhone 16 512GB": { whymobile: 760, redwhite: 770, highest: 770 },
      "iPhone 16 Plus 128GB": { whymobile: 660, redwhite: 750, highest: 750 },
      "iPhone 16 Plus 256GB": { whymobile: 810, redwhite: 800, highest: 810 },
      "iPhone 16 Plus 512GB": { whymobile: 830, redwhite: 850, highest: 850 },
      "iPhone 16 Pro 128GB": { whymobile: 720, redwhite: 870, highest: 870 },
      "iPhone 16 Pro 256GB": { whymobile: 860, redwhite: 920, highest: 920 },
      "iPhone 16 Pro 512GB": { whymobile: 970, redwhite: 970, highest: 970 },
      "iPhone 16 Pro 1TB": { whymobile: 1020, redwhite: 1020, highest: 1020 },
      "iPhone 16 Pro Max 256GB": { whymobile: 1000, redwhite: 1020, highest: 1020 },
      "iPhone 16 Pro Max 512GB": { whymobile: 1100, redwhite: 1070, highest: 1100 },
      "iPhone 16 Pro Max 1TB": { whymobile: 1150, redwhite: 1120, highest: 1150 },

      // iPhone 17 Series
      "iPhone 17 256GB": { whymobile: 900, redwhite: 900, highest: 900 },
      "iPhone 17 512GB": { whymobile: 1000, redwhite: 1150, highest: 1150 },
      "iPhone 17 Air 256GB": { whymobile: 900, redwhite: 900, highest: 900 },
      "iPhone 17 Air 512GB": { whymobile: 1020, redwhite: 1000, highest: 1020 },
      "iPhone 17 Air 1TB": { whymobile: 1120, redwhite: 1100, highest: 1120 },
      "iPhone 17 Pro 256GB": { whymobile: 1300, redwhite: 1350, highest: 1350 },
      "iPhone 17 Pro 512GB": { whymobile: 1520, redwhite: 1550, highest: 1550 },
      "iPhone 17 Pro 1TB": { whymobile: 1700, redwhite: 1750, highest: 1750 },
      "iPhone 17 Pro Max 256GB": { whymobile: 1500, redwhite: 1520, highest: 1520 },
      "iPhone 17 Pro Max 512GB": { whymobile: 1700, redwhite: 1750, highest: 1750 },
      "iPhone 17 Pro Max 1TB": { whymobile: 2000, redwhite: 1970, highest: 2000 },
      "iPhone 17 Pro Max 2TB": { whymobile: 2250, redwhite: 2070, highest: 2250 },

      // iPhone 15 Series
      "iPhone 15 128GB": { whymobile: 460, redwhite: 500, highest: 500 },
      "iPhone 15 256GB": { whymobile: 530, redwhite: 550, highest: 550 },
      "iPhone 15 512GB": { whymobile: 580, redwhite: 600, highest: 600 },
      "iPhone 15 Plus 128GB": { whymobile: 530, redwhite: 550, highest: 550 },
      "iPhone 15 Plus 256GB": { whymobile: 580, redwhite: 600, highest: 600 },
      "iPhone 15 Plus 512GB": { whymobile: 630, redwhite: 650, highest: 650 },
      "iPhone 15 Pro 128GB": { whymobile: 580, redwhite: 600, highest: 600 },
      "iPhone 15 Pro 256GB": { whymobile: 660, redwhite: 650, highest: 660 },
      "iPhone 15 Pro 512GB": { whymobile: 750, redwhite: 700, highest: 750 },
      "iPhone 15 Pro 1TB": { whymobile: 800, redwhite: 750, highest: 800 },
      "iPhone 15 Pro Max 256GB": { whymobile: 760, redwhite: 800, highest: 800 },
      "iPhone 15 Pro Max 512GB": { whymobile: 830, redwhite: 850, highest: 850 },
      "iPhone 15 Pro Max 1TB": { whymobile: 900, redwhite: 900, highest: 900 },

      // iPhone 14 Series
      "iPhone 14 128GB": { whymobile: 330, redwhite: 350, highest: 350 },
      "iPhone 14 256GB": { whymobile: 380, redwhite: 400, highest: 400 },
      "iPhone 14 512GB": { whymobile: 430, redwhite: 450, highest: 450 },
      "iPhone 14 Plus 128GB": { whymobile: 400, redwhite: 420, highest: 420 },
      "iPhone 14 Plus 256GB": { whymobile: 450, redwhite: 470, highest: 470 },
      "iPhone 14 Plus 512GB": { whymobile: 520, redwhite: 520, highest: 520 },
      "iPhone 14 Pro 128GB": { whymobile: 460, redwhite: 500, highest: 500 },
      "iPhone 14 Pro 256GB": { whymobile: 520, redwhite: 550, highest: 550 },
      "iPhone 14 Pro 512GB": { whymobile: 560, redwhite: 600, highest: 600 },
      "iPhone 14 Pro 1TB": { whymobile: 600, redwhite: 650, highest: 650 },
      "iPhone 14 Pro Max 128GB": { whymobile: 520, redwhite: 600, highest: 600 },
      "iPhone 14 Pro Max 256GB": { whymobile: 600, redwhite: 650, highest: 650 },
      "iPhone 14 Pro Max 512GB": { whymobile: 680, redwhite: 700, highest: 700 },
      "iPhone 14 Pro Max 1TB": { whymobile: 750, redwhite: 750, highest: 750 },

      // iPhone 13 Series
      "iPhone 13 128GB": { whymobile: 260, redwhite: 300, highest: 300 },
      "iPhone 13 256GB": { whymobile: 300, redwhite: 350, highest: 350 },
      "iPhone 13 512GB": { whymobile: 360, redwhite: 400, highest: 400 },
      "iPhone 13 mini 128GB": { whymobile: 200, redwhite: 250, highest: 250 },
      "iPhone 13 mini 256GB": { whymobile: 250, redwhite: 300, highest: 300 },
      "iPhone 13 mini 512GB": { whymobile: 300, redwhite: 350, highest: 350 },
      "iPhone 13 Pro 128GB": { whymobile: 350, redwhite: 380, highest: 380 },
      "iPhone 13 Pro 256GB": { whymobile: 400, redwhite: 430, highest: 430 },
      "iPhone 13 Pro 512GB": { whymobile: 450, redwhite: 480, highest: 480 },
      "iPhone 13 Pro 1TB": { whymobile: 480, redwhite: 530, highest: 530 },
      "iPhone 13 Pro Max 128GB": { whymobile: 420, redwhite: 460, highest: 460 },
      "iPhone 13 Pro Max 256GB": { whymobile: 480, redwhite: 510, highest: 510 },
      "iPhone 13 Pro Max 512GB": { whymobile: 520, redwhite: 560, highest: 560 },
      "iPhone 13 Pro Max 1TB": { whymobile: 530, redwhite: 610, highest: 610 },

      // iPhone 12 Series
      "iPhone 12 64GB": { whymobile: 200, redwhite: 200, highest: 200 },
      "iPhone 12 128GB": { whymobile: 200, redwhite: 250, highest: 250 },
      "iPhone 12 256GB": { whymobile: 260, redwhite: 300, highest: 300 },
      "iPhone 12 mini 64GB": { whymobile: 120, redwhite: 120, highest: 120 },
      "iPhone 12 mini 128GB": { whymobile: 130, redwhite: 150, highest: 150 },
      "iPhone 12 mini 256GB": { whymobile: 160, redwhite: 180, highest: 180 },
      "iPhone 12 Pro 128GB": { whymobile: 280, redwhite: 320, highest: 320 },
      "iPhone 12 Pro 256GB": { whymobile: 330, redwhite: 370, highest: 370 },
      "iPhone 12 Pro 512GB": { whymobile: 380, redwhite: 420, highest: 420 },
      "iPhone 12 Pro Max 128GB": { whymobile: 330, redwhite: 370, highest: 370 },
      "iPhone 12 Pro Max 256GB": { whymobile: 380, redwhite: 420, highest: 420 },
      "iPhone 12 Pro Max 512GB": { whymobile: 420, redwhite: 470, highest: 470 },

      // iPhone 11 Series
      "iPhone 11 64GB": { whymobile: 150, redwhite: 150, highest: 150 },
      "iPhone 11 128GB": { whymobile: 160, redwhite: 190, highest: 190 },
      "iPhone 11 256GB": { whymobile: 200, redwhite: 230, highest: 230 },
      "iPhone 11 Pro 64GB": { whymobile: 200, redwhite: 200, highest: 200 },
      "iPhone 11 Pro 256GB": { whymobile: 220, redwhite: 240, highest: 240 },
      "iPhone 11 Pro 512GB": { whymobile: 250, redwhite: 280, highest: 280 },
      "iPhone 11 Pro Max 64GB": { whymobile: 250, redwhite: 250, highest: 250 },
      "iPhone 11 Pro Max 256GB": { whymobile: 260, redwhite: 290, highest: 290 },
      "iPhone 11 Pro Max 512GB": { whymobile: 300, redwhite: 330, highest: 330 }
    },

    samsung: {
      // Samsung S25 Series
      "Galaxy S25 256GB": { whymobile: 560, redwhite: 600, highest: 600 },
      "Galaxy S25 512GB": { whymobile: 650, redwhite: 700, highest: 700 },
      "Galaxy S25 Plus 256GB": { whymobile: 680, redwhite: 750, highest: 750 },
      "Galaxy S25 Plus 512GB": { whymobile: 760, redwhite: 850, highest: 850 },
      "Galaxy S25 Ultra 256GB": { whymobile: 800, redwhite: 850, highest: 850 },
      "Galaxy S25 Ultra 512GB": { whymobile: 920, redwhite: 1050, highest: 1050 },
      "Galaxy S25 Ultra 1TB": { whymobile: 1020, redwhite: 1100, highest: 1100 },
      "Galaxy S25 Edge 256GB": { whymobile: null, redwhite: 570, highest: 570 },
      "Galaxy S25 Edge 512GB": { whymobile: null, redwhite: 670, highest: 670 },
      "Galaxy S25 FE 128GB": { whymobile: null, redwhite: 370, highest: 370 },
      "Galaxy S25 FE 256GB": { whymobile: null, redwhite: 470, highest: 470 },
      "Galaxy S25 FE 512GB": { whymobile: null, redwhite: 520, highest: 520 },

      // Samsung S24 Series
      "Galaxy S24 256GB": { whymobile: 380, redwhite: 500, highest: 500 },
      "Galaxy S24 512GB": { whymobile: 450, redwhite: 550, highest: 550 },
      "Galaxy S24 Plus 256GB": { whymobile: 480, redwhite: 570, highest: 570 },
      "Galaxy S24 Plus 512GB": { whymobile: 530, redwhite: 620, highest: 620 },
      "Galaxy S24 Ultra 256GB": { whymobile: 580, redwhite: 700, highest: 700 },
      "Galaxy S24 Ultra 512GB": { whymobile: 650, redwhite: 750, highest: 750 },
      "Galaxy S24 Ultra 1TB": { whymobile: 700, redwhite: 850, highest: 850 },
      "Galaxy S24 FE 256GB": { whymobile: 300, redwhite: 370, highest: 370 },
      "Galaxy S24 FE 512GB": { whymobile: 360, redwhite: 420, highest: 420 },

      // Samsung S23 Series
      "Galaxy S23 128GB": { whymobile: null, redwhite: 300, highest: 300 },
      "Galaxy S23 256GB": { whymobile: 250, redwhite: 350, highest: 350 },
      "Galaxy S23 Plus 256GB": { whymobile: 330, redwhite: 400, highest: 400 },
      "Galaxy S23 Plus 512GB": { whymobile: 370, redwhite: 450, highest: 450 },
      "Galaxy S23 Ultra 256GB": { whymobile: 400, redwhite: 500, highest: 500 },
      "Galaxy S23 Ultra 512GB": { whymobile: 450, redwhite: 550, highest: 550 },
      "Galaxy S23 Ultra 1TB": { whymobile: null, redwhite: 600, highest: 600 },
      "Galaxy S23 FE 256GB": { whymobile: 200, redwhite: 220, highest: 220 },

      // Samsung S22 Series
      "Galaxy S22 128GB": { whymobile: null, redwhite: 150, highest: 150 },
      "Galaxy S22 256GB": { whymobile: null, redwhite: 200, highest: 200 },
      "Galaxy S22 Plus 128GB": { whymobile: null, redwhite: 200, highest: 200 },
      "Galaxy S22 Plus 256GB": { whymobile: null, redwhite: 250, highest: 250 },
      "Galaxy S22 Ultra 256GB": { whymobile: 270, redwhite: 350, highest: 350 },
      "Galaxy S22 Ultra 512GB": { whymobile: 320, redwhite: 400, highest: 400 },

      // Samsung Z Fold Series
      "Galaxy Z Fold 7 256GB": { whymobile: 1220, redwhite: 1470, highest: 1470 },
      "Galaxy Z Fold 7 512GB": { whymobile: 1350, redwhite: 1520, highest: 1520 },
      "Galaxy Z Fold 7 1TB": { whymobile: 1450, redwhite: 1620, highest: 1620 },
      "Galaxy Z Fold 6 256GB": { whymobile: null, redwhite: 770, highest: 770 },
      "Galaxy Z Fold 6 512GB": { whymobile: null, redwhite: 870, highest: 870 },
      "Galaxy Z Fold 6 1TB": { whymobile: null, redwhite: 970, highest: 970 },
      "Galaxy Z Fold 5 256GB": { whymobile: null, redwhite: 550, highest: 550 },
      "Galaxy Z Fold 5 512GB": { whymobile: null, redwhite: 600, highest: 600 },
      "Galaxy Z Fold 5 1TB": { whymobile: null, redwhite: 650, highest: 650 },
      "Galaxy Z Fold 4 256GB": { whymobile: null, redwhite: 350, highest: 350 },
      "Galaxy Z Fold 4 512GB": { whymobile: null, redwhite: 400, highest: 400 },
      "Galaxy Z Fold 4 1TB": { whymobile: null, redwhite: 500, highest: 500 },

      // Samsung Z Flip Series
      "Galaxy Z Flip 7 256GB": { whymobile: 550, redwhite: 670, highest: 670 },
      "Galaxy Z Flip 7 512GB": { whymobile: 650, redwhite: 770, highest: 770 },
      "Galaxy Z Flip 7 FE 128GB": { whymobile: 300, redwhite: 470, highest: 470 },
      "Galaxy Z Flip 7 FE 256GB": { whymobile: 450, redwhite: 570, highest: 570 },
      "Galaxy Z Flip 6 256GB": { whymobile: null, redwhite: 400, highest: 400 },
      "Galaxy Z Flip 6 512GB": { whymobile: null, redwhite: 450, highest: 450 },
      "Galaxy Z Flip 5 256GB": { whymobile: null, redwhite: 250, highest: 250 },
      "Galaxy Z Flip 5 512GB": { whymobile: null, redwhite: 300, highest: 300 },
      "Galaxy Z Flip 4 128GB": { whymobile: null, redwhite: 100, highest: 100 },
      "Galaxy Z Flip 4 256GB": { whymobile: null, redwhite: 150, highest: 150 },
      "Galaxy Z Flip 4 512GB": { whymobile: null, redwhite: 200, highest: 200 },

      // Samsung A Series
      "Galaxy A56 12/256GB": { whymobile: 250, redwhite: 270, highest: 270 },
      "Galaxy A56 8/256GB": { whymobile: 180, redwhite: null, highest: 180 },
      "Galaxy A55 8/256GB": { whymobile: 180, redwhite: 220, highest: 220 },
      "Galaxy A36 8/256GB": { whymobile: null, redwhite: 170, highest: 170 }
    }
  },

  // NEW/SEALED PRICES
  new: {
    iphone: {
      // iPhone 16 Series
      "iPhone 16e 128GB": { whymobile: 660, redwhite: 650, highest: 660 },
      "iPhone 16e 256GB": { whymobile: 770, redwhite: 770, highest: 770 },
      "iPhone 16e 512GB": { whymobile: null, redwhite: 870, highest: 870 },
      "iPhone 16 128GB": { whymobile: 860, redwhite: 920, highest: 920 },
      "iPhone 16 256GB": { whymobile: 1000, redwhite: 1020, highest: 1020 },
      "iPhone 16 512GB": { whymobile: null, redwhite: null, highest: null },
      "iPhone 16 Plus 128GB": { whymobile: null, redwhite: 1050, highest: 1050 },
      "iPhone 16 Plus 256GB": { whymobile: null, redwhite: 1150, highest: 1150 },
      "iPhone 16 Plus 512GB": { whymobile: null, redwhite: null, highest: null },
      "iPhone 16 Pro 128GB": { whymobile: null, redwhite: 870, highest: 870 },
      "iPhone 16 Pro 256GB": { whymobile: 1300, redwhite: 920, highest: 1300 },
      "iPhone 16 Pro 512GB": { whymobile: 1500, redwhite: 970, highest: 1500 },
      "iPhone 16 Pro 1TB": { whymobile: null, redwhite: 1020, highest: 1020 },
      "iPhone 16 Pro Max 256GB": { whymobile: 1430, redwhite: null, highest: 1430 },
      "iPhone 16 Pro Max 512GB": { whymobile: 1630, redwhite: null, highest: 1630 },
      "iPhone 16 Pro Max 1TB": { whymobile: null, redwhite: null, highest: null },

      // iPhone 17 Series
      "iPhone 17 256GB": { whymobile: 1170, redwhite: 1200, highest: 1200 },
      "iPhone 17 512GB": { whymobile: 1450, redwhite: 1370, highest: 1450 },
      "iPhone 17 Air 256GB": { whymobile: null, redwhite: 1050, highest: 1050 },
      "iPhone 17 Air 512GB": { whymobile: null, redwhite: 1220, highest: 1220 },
      "iPhone 17 Air 1TB": { whymobile: null, redwhite: 1320, highest: 1320 },
      "iPhone 17 Pro 256GB": { whymobile: 1570, redwhite: 1600, highest: 1600 },
      "iPhone 17 Pro 512GB": { whymobile: 1860, redwhite: 1750, highest: 1860 },
      "iPhone 17 Pro 1TB": { whymobile: 2040, redwhite: 1950, highest: 2040 },
      "iPhone 17 Pro Max 256GB": { whymobile: 1730, redwhite: 1720, highest: 1730 },
      "iPhone 17 Pro Max 512GB": { whymobile: 1960, redwhite: 2000, highest: 2000 },
      "iPhone 17 Pro Max 1TB": { whymobile: 2250, redwhite: 2270, highest: 2270 },
      "iPhone 17 Pro Max 2TB": { whymobile: 2450, redwhite: 2420, highest: 2450 },

      // iPhone 15 Series
      "iPhone 15 128GB": { whymobile: null, redwhite: 500, highest: 500 },
      "iPhone 15 256GB": { whymobile: null, redwhite: 550, highest: 550 },
      "iPhone 15 512GB": { whymobile: null, redwhite: 600, highest: 600 },
      "iPhone 15 Plus 128GB": { whymobile: null, redwhite: 550, highest: 550 },
      "iPhone 15 Plus 256GB": { whymobile: null, redwhite: 600, highest: 600 },
      "iPhone 15 Plus 512GB": { whymobile: null, redwhite: 650, highest: 650 },
      "iPhone 15 Pro 128GB": { whymobile: null, redwhite: 600, highest: 600 },
      "iPhone 15 Pro 256GB": { whymobile: null, redwhite: 650, highest: 650 },
      "iPhone 15 Pro 512GB": { whymobile: null, redwhite: 700, highest: 700 },
      "iPhone 15 Pro 1TB": { whymobile: null, redwhite: 750, highest: 750 },
      "iPhone 15 Pro Max 256GB": { whymobile: null, redwhite: 800, highest: 800 },
      "iPhone 15 Pro Max 512GB": { whymobile: null, redwhite: 850, highest: 850 },
      "iPhone 15 Pro Max 1TB": { whymobile: null, redwhite: 900, highest: 900 },

      // iPhone 14 Series
      "iPhone 14 128GB": { whymobile: null, redwhite: 350, highest: 350 },
      "iPhone 14 256GB": { whymobile: null, redwhite: 400, highest: 400 },
      "iPhone 14 512GB": { whymobile: null, redwhite: 450, highest: 450 },
      "iPhone 14 Plus 128GB": { whymobile: null, redwhite: 420, highest: 420 },
      "iPhone 14 Plus 256GB": { whymobile: null, redwhite: 470, highest: 470 },
      "iPhone 14 Plus 512GB": { whymobile: null, redwhite: 520, highest: 520 },
      "iPhone 14 Pro 128GB": { whymobile: null, redwhite: 500, highest: 500 },
      "iPhone 14 Pro 256GB": { whymobile: null, redwhite: 550, highest: 550 },
      "iPhone 14 Pro 512GB": { whymobile: null, redwhite: 600, highest: 600 },
      "iPhone 14 Pro 1TB": { whymobile: null, redwhite: 650, highest: 650 },
      "iPhone 14 Pro Max 128GB": { whymobile: null, redwhite: 600, highest: 600 },
      "iPhone 14 Pro Max 256GB": { whymobile: null, redwhite: 650, highest: 650 },
      "iPhone 14 Pro Max 512GB": { whymobile: null, redwhite: 700, highest: 700 },
      "iPhone 14 Pro Max 1TB": { whymobile: null, redwhite: 750, highest: 750 }
    },

    samsung: {
      // Samsung S25 Series
      "Galaxy S25 256GB": { whymobile: 760, redwhite: 850, highest: 850 },
      "Galaxy S25 512GB": { whymobile: 850, redwhite: 950, highest: 950 },
      "Galaxy S25 Plus 256GB": { whymobile: 880, redwhite: 920, highest: 920 },
      "Galaxy S25 Plus 512GB": { whymobile: 1000, redwhite: 1120, highest: 1120 },
      "Galaxy S25 Ultra 256GB": { whymobile: 1040, redwhite: 1020, highest: 1040 },
      "Galaxy S25 Ultra 512GB": { whymobile: 1250, redwhite: 1200, highest: 1250 },
      "Galaxy S25 Ultra 1TB": { whymobile: 1350, redwhite: null, highest: 1350 },
      "Galaxy S25 Edge 256GB": { whymobile: null, redwhite: 770, highest: 770 },
      "Galaxy S25 Edge 512GB": { whymobile: null, redwhite: 870, highest: 870 },
      "Galaxy S25 FE 128GB": { whymobile: 480, redwhite: 520, highest: 520 },
      "Galaxy S25 FE 256GB": { whymobile: 580, redwhite: 620, highest: 620 },
      "Galaxy S25 FE 512GB": { whymobile: 660, redwhite: 670, highest: 670 },

      // Samsung Z Fold Series
      "Galaxy Z Fold 7 256GB": { whymobile: 1630, redwhite: 1720, highest: 1720 },
      "Galaxy Z Fold 7 512GB": { whymobile: 1780, redwhite: 1870, highest: 1870 },
      "Galaxy Z Fold 7 1TB": { whymobile: 1860, redwhite: 1920, highest: 1920 },
      "Samsung TriFold 512GB": { whymobile: 4000, redwhite: 4220, highest: 4220 },

      // Samsung Z Flip Series
      "Galaxy Z Flip 7 256GB": { whymobile: 800, redwhite: 900, highest: 900 },
      "Galaxy Z Flip 7 512GB": { whymobile: 920, redwhite: 950, highest: 950 },
      "Galaxy Z Flip 7 FE 128GB": { whymobile: 500, redwhite: 620, highest: 620 },
      "Galaxy Z Flip 7 FE 256GB": { whymobile: 680, redwhite: 770, highest: 770 },

      // Samsung A Series
      "Galaxy A56 12/256GB": { whymobile: 420, redwhite: 420, highest: 420 },
      "Galaxy A56 8/256GB": { whymobile: 380, redwhite: null, highest: 380 },
      "Galaxy A36 8/256GB": { whymobile: 330, redwhite: 340, highest: 340 },
      "Galaxy A26 8/256GB": { whymobile: 270, redwhite: null, highest: 270 },
      "Galaxy A17 5G 8/128GB": { whymobile: 200, redwhite: null, highest: 200 },
      "Galaxy A17 4G 8/128GB": { whymobile: 160, redwhite: null, highest: 160 }
    }
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = competitorData;
}

console.log('Competitor price data parsed successfully!');
console.log(`Total iPhone models (used): ${Object.keys(competitorData.used.iphone).length}`);
console.log(`Total iPhone models (new): ${Object.keys(competitorData.new.iphone).length}`);
console.log(`Total Samsung models (used): ${Object.keys(competitorData.used.samsung).length}`);
console.log(`Total Samsung models (new): ${Object.keys(competitorData.new.samsung).length}`);
