# Flipkart Scraper API

API to scrapes search result and product details from flipkart

![Flipkart API Banner](/banner.png)

![Version](https://img.shields.io/badge/Version-3.1.0-green)
[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues)
[![Telegram](https://img.shields.io/badge/-dvishal485-blue?style=flat&logo=telegram)](https://t.me/dvishal485)
[![Documentation](https://img.shields.io/badge/API-Documentation-blue)](https://dvishal485.github.io/flipkart-scraper-api/)

**For documentation visit :** [Flipkart Scraper API](https://dvishal485.github.io/flipkart-scraper-api/)

**API :** [flipkart.dvishal485.workers.dev/](https://flipkart.dvishal485.workers.dev/)

---

## Deployment

Deploy your own API with Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dvishal485/flipkart-scraper-api)

---

## Features

- API **does not require any client id/secret or any other authorisation** unlike most of Flipkart API
- Completely Open Source
- Fetch search results from [Flipkart](https://www.flipkart.com/)

    Response in JSON format including the following information :
  - Product Name
  - Product Current Price
  - Product Original Price
  - Discount status (`true` or `false`)
  - Product Thumbnail

- Fetch product result from URL of product

    Response in JSON format including the following information about Product :
  - Product Full Name
  - Current and Original Price
  - Discount status and Discount percentage
  - User Rating
  - Stock avalibility (`true` or `false`)
  - Flipkart Assured Product (`true` or `false`)
  - Share URL (More presentable URL)
  - Seller Information (Seller Name and Rating)
  - Product Thumbnails
  - Highlights
  - Available Offers / Bank Offers
  - Specifications

- Different Mode with different output size as per requirement
  - Fetch the product result without any specifications as well as with condensed form of specifications as per requirement.
  - Search for some specific specification and only fetch those specs which meet the requirements.

- The API also removes all trackers & loggers in every link from flipkart giving an completely unbaised and cleaner output.

---

## ToDo

- [ ] Make code Presentable and Readable
- [x] Extend API for product details
- [x] Optimize existing code
- [ ] Support for newer deployment methods
- [x] Get product details (price & stock) specific to individual's pincode
  - Check out new repository [flipkart-product-stock](https://github.com/dvishal485/flipkart-product-stock)
- [x] New Project : Telegram bot to notify about price drop alerts
  - Check out [@flipkartX_bot](https://t.me/flipkartX_bot)
  - The bot can give you search result of any product and set price drop/rise alerts as well as stock availability alerts directly on Telegram.

---

## License & Copyright

- This Project is [Apache-2.0](./LICENSE) Licensed
- Copyright 2022 [Vishal Das](https://github.com/dvishal485)
