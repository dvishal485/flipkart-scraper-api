# Flipkart Scraper API

API to scrapes search result and product details from flipkart

**Disclaimer:** I am not affiliated or linked to flipkart in any way. This repository is an exploratory project and not meant for commercial use.

![Flipkart API Banner](/banner.png)

![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdvishal485%2Fflipkart-scraper-api%2Fmain%2Fpackage.json&query=%24.version&label=version&color=green)
[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues)
[![Telegram](https://img.shields.io/badge/-dvishal485-blue?style=flat&logo=telegram)](https://t.me/dvishal485)
[![Documentation](https://img.shields.io/badge/API-Documentation-blue)](https://dvishal485.github.io/flipkart-scraper-api/)

**For documentation visit :** [Flipkart Scraper API](https://dvishal485.github.io/flipkart-scraper-api/)

**API :** [flipkart-scraper-api.dvishal485.workers.dev/](https://flipkart-scraper-api.dvishal485.workers.dev/)

---

## Deployment

![Docker](https://img.shields.io/badge/Docker--blue?logo=docker)
![Cloudflare](https://img.shields.io/badge/Cloudflare--orange?logo=cloudflare)
![NodeJS](https://img.shields.io/badge/NodeJS--yellow?logo=javascript)

Deployment is supported on [Cloudflare Worker](https://dvishal485.github.io/flipkart-scraper-api/#deploy-with-cloudflare-workers), using [NodeJS](https://dvishal485.github.io/flipkart-scraper-api#deploy-with-nodejs), and using [Docker Image](https://dvishal485.github.io/flipkart-scraper-api#deploy-using-docker).

[For more information on Deployment, refer documentation.](https://dvishal485.github.io/flipkart-scraper-api/#deployment)

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

- [x] Make code Presentable and Readable
- [x] Extend API for product details
- [x] Optimize existing code
- [x] [Support for newer deployment methods](https://github.com/dvishal485/flipkart-scraper-api/issues/5)
- [x] Get product details (price & stock) specific to individual's pincode

  - Check out new repository [flipkart-product-stock](https://github.com/dvishal485/flipkart-product-stock)

- [x] New Project : Telegram bot to notify about price drop alerts

  - Check out [@flipkartX_bot](https://t.me/flipkartX_bot)
  - The bot can give you search result of any product and set price drop/rise alerts as well as stock availability alerts directly on Telegram.

---

## License & Copyright

- This Project is [Apache-2.0](./LICENSE) Licensed
- Copyright 2023 [Vishal Das](https://github.com/dvishal485)
