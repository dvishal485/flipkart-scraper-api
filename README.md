# Flipkart Scraper API
API to scrapes search result and product details from flipkart

![Flipkart API Banner](/banner.png)

[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues) [![Telegram](https://img.shields.io/badge/chat-Telegram-yellow)](https://t.me/dvishal485) [![Documentation](https://img.shields.io/badge/API-Documentation-blue)](https://dvishal485.github.io/flipkart-scraper-api/)

**For documentation visit :** [Flipkart Scraper API](https://dvishal485.github.io/flipkart-scraper-api/)

**API :** [flipkart.dvishal485.workers.dev/](https://flipkart.dvishal485.workers.dev/)

## Features :

  - API **does not require any client id/secret or any other authorisation** unlike most of Flipkart API
  - Fetch search results from [Flipkart](https://www.flipkart.com/)

    Response in JSON format including the following information :
    - Product Name
    - Product Current Price
    - Product Original Price
    - Discount status (`true` or `false`)
    - Fetch Method ( to be explained later in the section )
  - Fetch product result from url of product

    Response in JSON format including the following information about Product :
      - Product Full Name
      - Current and Original Price
      - Discount status and Discount percentage
      - User Rating
      - Stock avalibility (`true` or `false`)
      - Flipkart Assured Product (`true` or `false`)
      - Share URL (More presentable URL)
      - Highlights
      - Specifications
