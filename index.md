# Flipkart Scraper API
API to scrapes search result and product details from flipkart

![Flipkart API Banner](./banner.png)

[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues) [![Telegram](https://img.shields.io/badge/chat-Telegram-blue)](https://t.me/dvishal485)

# Features

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


### Note
- All the amounts are in currency INR
- You can also explore products by passing an empty search command

# API Usage
  - Search

    - Fetch from URL `https://flipkart.dvishal485.workers.dev/search/<product_name>`

    Example : [https://flipkart.dvishal485.workers.dev/search/laptop](https://flipkart.dvishal485.workers.dev/search/laptop)
    
    The response will be given in following JSON format : 
```
{
    "results": [
        {
            "name": "PRODUCT_NAME",
            "link": "PRODUCT_LINK",
            "current_price": PRODUCT_CURRENT_PRICE,
            "original_price": PRODUCT_ORIGINAL_PRICE,
            "discounted": true or false,
            "fetch_method": "A or B or C or D"
        }, ...
    ]
}
```
  [Tap to view sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-search.json)

  - Product Details
    - Get the URL of flipkart product and remove the `https://www.flipkart.com/` from it, let's call it product link argument
    - Fetch from url `https://flipkart.dvishal485.workers.dev/product/<product_link_argument>`

    Example : [https://flipkart.dvishal485.workers.dev/product/apple-iphone-xr-product-red-64-gb-includes-earpods-power-adapter/p/itmf9z7zhydhtbn5?pid=MOBF9Z7ZRWGTX3FA](https://flipkart.dvishal485.workers.dev/product/apple-iphone-xr-product-red-64-gb-includes-earpods-power-adapter/p/itmf9z7zhydhtbn5?pid=MOBF9Z7ZRWGTX3FA)

    
    The response will be given in following JSON format : 
```
{
  "name": "Product Full Name",
  "current_price": current_price,
  "original_price": original_price,
  "discounted": true or false,
  "discount_percent": discount_percent,
  "rating": "rating of product",
  "in_stock": true or false,
  "f-assured": true or false,
  "share_url": "Share URL",
  "highlights": [
    "Highlight1",
    "Highlight2", ...
  ],
  "specs": [
    {
      "title": "Type of Properties",
      "details": [
        {
          "property": "Property1",
          "value": "Description of Property 1"
        }, ...
      ]
    }, ...
  ]
}
```
  [Tap to view sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-product.json)

  - The Product Details output may be too large to handle, in that case, you may use the `compact` or `minimum` mode.

    - Compact Mode
      API : `https://flipkart.dvishal485.workers.dev/product/compact/<product_link_argument>`
    
      Replies with the complete same information but the sub-specifications are merged into one, each seperated by `; `
    
    - Minimum Mode
      API : `https://flipkart.dvishal485.workers.dev/product/min/<product_link_argument>`
    
      Replies without Specifications reducing the size of output largely.
    
  
# Accuracy
  - Search API

    The Search API is tested with lot of products and compared thoroughly and is found to be accurate for all of them till date, thanking to the self adjusting different fetch methods. The Flipkart website doesn't have any standard `id` or `class` or `name` to the components of website making it far more difficult to scrape and create API from. However, there may be inaccuracy in case of some product. In case, if someone encounter with any of such item, convey it to me through [Telegram](https://t.me/dvishal485) or [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues) containing the following information :
    - Search keyword
    - Information you find wrong
    - Fetch Method
    - JSON response received ( if possible )

  - Product API

    The Product API was found to be completely error free during the testing, so hopefully it will remain the same in future. I have ensured that you get maximum of Flipkart's data which may not be present in other alternatives. Especially without any anutorisation. If you still encounter anything unexpected, [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues)

## Why not open-sourced ?
It took some efforts and a ton of dirty code work to build this API, and as far as I have seen no API have been build for Flipkart which can give `search` functionality **without any authorisation** . The project won't be made open-sourced atleast before its completion ( [Check out ToDo at end of page](https://github.com/dvishal485/flipkart-scraper-api/blob/main/index.md#Todo) )

# Error Handling
  In case of any error you will receive an error message in the following format :
```json
{
  "error_message": "ERROR MESSAGE",
  "possible_solution": "POSSIBLE SOLUTION",
  "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
}
```
  
  **Note :** While using the API, remember to null-check the Product Name and URL. It might be the case that the API Fetch Product price accurately but fail do give information about it's name and URL ( have not seen such case till date but is possible ). [Raise an issue for the same](https://github.com/dvishal485/flipkart-scraper-api/issues)
  
# Fetch Method
The Flipkart website doesn't have any standard `id` or `class` or `name` to the components of website making it far more difficult to scrape and create API from. Just a standard procedure can't scrape the whole website and sort out the products from all other stuff. Hence the same is done with help of different methods namely "A", "B", "C" and "D". Fetching from Method A will result to the most accurate level, while there might be inaccuracies in Method "B", "C" and "D". In case none of the Fetch Method works, the URL and Name of Product will be set to `null` and the method will be the same as the preceding result.

### Ideal Result
An ideal result will be the one which fetch from Method A, or from one result of Method C followed by results from Method D ( just like the [sample.json](https://dvishal485.github.io/flipkart-scraper-api/sample.json) ). Method B is quite rare to encounter with.

### End Note
All the methods are expected to work fine. But they can surely be optimised even more and I will work further on the same.

# Todo
  - ~~Extend API for product details~~
  - Optimize existing code
  - Improve accuracy
  - ~~New Project : Telegram bot to notify about price drop alerts~~ Check out [@flipkart_api_bot](https://t.me/flipkart_api_bot)
