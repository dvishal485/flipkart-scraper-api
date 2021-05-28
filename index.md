# Flipkart Scraper API
API to scrapes search result and product details from flipkart

# Features :
  - Fetch search results from [Flipkart](https://www.flipkart.com/)
  - Response in JSON format including the following information about Product :
    - Product Name
    - Product Current Price
    - Product Original Price
    - Discount status of product (`true` or `false`)
    - Fetch Method ( to be explained later in the section)
  - It **does not require any client id/secret or any other authorisation** unlike most of Flipkart API

# API Usage :
  - Search
    Fetch from URL `https://flipkart.dvishal485.workers.dev/search/<product_name>`
    Example : https://flipkart.dvishal485.workers.dev/search/laptop
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

  - [Tap to View sample response](https://dvishal485.github.io/flipkart-scraper-api/sample.json)
  
# Accuracy
  The API is tested with lot of products and compared thoroughly and is found to be accurate for all of them till date, thanking to the self adjusting different fetch methods. The Flipkart website doesn't have any standard `id` or `class` or `name` to the components of website making it far more difficult to scrape and create API from. However, there may be inaccuracy in case of some product. In case, if someone encounter with any of such item, convey it to me through [Telegram](https://t.me/dvishal485) or [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues) containing the following information :
  - Search keyword
  - Information you find wrong
  - Fetch Method
  - JSON response received ( if possible )

## Notes
  While using the API, remember to null-check the Product Name and URL. It might be the case that the API Fetch Product price accurately but fail do give information about it's name and URL ( have not seen such case till date but is possible ). [Raise an issue for the same](https://github.com/dvishal485/flipkart-scraper-api/issues)

# Fetch Method
The Flipkart website doesn't have any standard `id` or `class` or `name` to the components of website making it far more difficult to scrape and create API from. Just a standard procedure can't scrape the whole website and sort out the products from all other stuff. Hence the same is done with help of different methods namely "A", "B", "C" and "D". Fetching from Method A will result to the most accurate level, while there might be inaccuracies in Method "B", "C" and "D". In case none of the Fetch Method works, the URL and Name of Product will be set to `null` and the method will be the same as the preceding result.

### Ideal Result
An ideal result will be the one which fetch from Method A, or from one result of Method C followed by results from Method D ( just like the [sample.json](https://dvishal485.github.io/flipkart-scraper-api/sample.json) ). Method B is quite rare to encounter with.
### End Note
All the methods are expected to work fine. But they can surely be optimised even more and I will work further on the same.

# Todo
  - Extend API for product details
  - Optimize existing code
  - Improve accuracy
