# Scraping APIs Reference Guide

## Source Repository
[cporter202/scraping-apis-for-devs](https://github.com/cporter202/scraping-apis-for-devs)

This document catalogs useful scraping APIs for the KT Mobile Singapore phone buyback platform.

---

## E-Commerce APIs (147 APIs)

For product data, pricing, and inventory scraping:

| API | Description | Use Case |
|-----|-------------|----------|
| **Apify Web Scraper** | General-purpose web scraper | Scrape competitor prices from SellUp, Carousell |
| **ScraperAPI** | Rotating proxies + JS rendering | Bypass bot detection on retail sites |
| **Amazon Product API** | Extract product listings | Market price research |
| **Shopee/Lazada Scrapers** | SEA marketplace data | Regional price comparison |

### Implementation Example
```javascript
// Price scraping configuration
const priceScrapingConfig = {
    targets: [
        'https://sellup.com.sg/sell-mobile-phone',
        'https://compasia.sg/sell',
        'https://www.backmarket.sg/'
    ],
    frequency: 'daily',
    dataPoints: ['model', 'storage', 'condition', 'price']
};
```

---

## Social Media APIs (73 APIs)

For market research and trend analysis:

| API | Description | Use Case |
|-----|-------------|----------|
| **Instagram Scraper** | Profile & post data | Track phone resale trends |
| **TikTok Scraper** | Video & engagement data | Monitor viral phone content |
| **Reddit Subreddit Scraper** | Community discussions | r/singapore phone deals insights |
| **Facebook Marketplace** | Local listings | Competitor pricing data |

---

## Lead Generation APIs (80 APIs)

For customer acquisition:

| API | Description | Use Case |
|-----|-------------|----------|
| **Email Finder APIs** | Business contact extraction | B2B partnerships |
| **LinkedIn Scrapers** | Professional network data | Corporate buyback programs |

---

## Developer Tools APIs (172 APIs)

For platform enhancement:

| API | Description | Use Case |
|-----|-------------|----------|
| **Image Processing APIs** | Resize, compress, optimize | Phone image handling |
| **OCR APIs** | Text extraction from images | IMEI verification from photos |
| **Translation APIs** | Multi-language support | Serve non-English customers |

---

## Integration APIs (191 APIs)

For platform connectivity:

| API | Description | Use Case |
|-----|-------------|----------|
| **Payment Gateways** | PayNow, GrabPay integration | Instant customer payouts |
| **SMS/WhatsApp APIs** | Customer notifications | Order updates, quotes |
| **Email APIs** | Transactional emails | Confirmation, receipts |
| **Shipping APIs** | SingPost, Ninja Van | Pickup scheduling |

---

## Phone Image Sources

### Primary: GSMArena (Most Reliable)
```
https://fdn2.gsmarena.com/vv/bigpic/{brand}-{model}.jpg
https://fdn2.gsmarena.com/vv/pics/{brand}/{brand}-{model}-1.jpg
```

Examples:
- `apple-iphone-16-pro-max.jpg` (bigpic folder)
- `apple/apple-iphone-16-pro-max-1.jpg` (pics folder - higher quality)
- `samsung-galaxy-s24-ultra-5g.jpg`
- `google-pixel-8-pro.jpg`

### Using E-Commerce Scraping APIs (from scraping-apis-for-devs)
For high-quality product images, use APIs from the **ecommerce-apis-147** folder:

1. **Apify Product Image Scraper** - Extract hero images from product pages
2. **ScraperAPI** - Bypass bot detection on Apple Store, Amazon
3. **Product Image Extractor APIs** - Get highest resolution images

See `image-scraper-solution.js` for implementation examples.

### Fallback Chain
1. GSMArena pics folder (highest quality - ~40KB)
2. GSMArena bigpic folder
3. GSMArena alternate naming (with -5g suffix)
4. Local cached image
5. Branded placeholder via placehold.co

---

## Implementation Notes

### CORS Handling
For client-side scraping, use CORS proxies:
```javascript
const corsProxy = 'https://api.allorigins.win/get?url=';
const targetUrl = encodeURIComponent('https://target-site.com');
fetch(`${corsProxy}${targetUrl}`);
```

### Rate Limiting
- Implement exponential backoff
- Cache responses for 24 hours
- Use webhook notifications for price changes

### Legal Considerations
- Respect robots.txt
- Use official APIs when available
- Implement proper attribution

---

## Quick Start Code

```javascript
// Import into your project
import { ScrapingAPIs } from './script.js';

// Access API references
console.log(ScrapingAPIs.ecommerce);
console.log(ScrapingAPIs.socialMedia);
```

---

## Future Enhancements

1. **Real-time Price Sync** - Auto-update prices from SellUp/CompAsia
2. **Image CDN** - Self-host phone images for reliability
3. **AI Condition Assessment** - Use computer vision for phone grading
4. **Automated Quoting** - ML-based price prediction

---

*Last Updated: January 2026*
*KT Mobile Singapore - Henderson Industrial Park*
