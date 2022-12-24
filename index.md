<head>
  <link rel="shortcut icon" type="image/x-icon" href="https://dvishal485.github.io/flipkart-scraper-api/favicon.ico">
</head>

# Flipkart Scraper API

API to scrapes search result and product details from flipkart

Check out [@flipkartX_bot](https://t.me/flipkartX_bot) on Telegram

![Flipkart API Banner](./banner.png)

![Version](https://img.shields.io/badge/Version-3.1.0-green)
[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues)
[![Telegram](https://img.shields.io/badge/-dvishal485-blue?style=flat&logo=telegram)](https://t.me/dvishal485)

## Table of Contents

- [Flipkart Scraper API](#flipkart-scraper-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Note](#note)
  - [API Reference](#api-reference)
    - [Search Item](#search-item)
    - [Product Link Argument](#product-link-argument)
    - [Product Details](#product-details)
  - [Increasing Resolution of Image](#increasing-resolution-of-image)
  - [Deployment](#deployment)
  - [Accuracy](#accuracy)
  - [Error Handling](#error-handling)
  - [ToDo](#todo)
  - [License and Copyright](#license-and-copyright)

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

### Note

- All the amounts are in currency INR
- You can also explore products by [passing an empty search command](https://flipkart.dvishal485.workers.dev/search/)

---

## API Reference

### Search Item

```;
  GET /search/${product_name}
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `product_name` | `string` | **Required**. Name of product to search |

  Example :

- [View live demo](https://flipkart.dvishal485.workers.dev/search/laptop)
- [View sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-search.json)

### Product Link Argument

Link argument of a product will be URL of Flipkart product after removing the `https://www.flipkart.com/` or any other similar component from it.

### Product Details

- Elaborated

  ```;
    GET /product/${product_link_argument}
  ```

  | Parameter               | Type     | Description                                                    |
  | :---------------------- | :------- | :------------------------------------------------------------- |
  | `product_link_argument` | `string` | **Required**. Product link without `https://www.flipkart.com/` |

  Example :
  - [View live demo](https://flipkart.dvishal485.workers.dev/product/apple-2020-macbook-air-m1-8-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itmde54f026889ce)
  - [View sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-product.json)

  The response will be given in following JSON format :

  ```javascript
  {
    "name": "Product Full Name",
    "current_price": current_price,
    "original_price": original_price,
    "discounted": true or false,
    "discount_percent": discount_percent,
    "rating": rating of product,
    "in_stock": true or false,
    "f-assured": true or false,
    "share_url": "Share URL",
    "seller": {
      "seller_name": "seller_name",
      "seller_rating": seller_rating
    },
    "thumbnails": [
      "url_1","url_2", ...
    ],
    "highlights": [
      "Highlight1",
      "Highlight2", ...
    ],
    "offers": [
      "offer_1",
      "offer_2", ...
    ]
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

- Compact

  ```;
    GET /product/compact/${product_link_argument}
  ```

  | Parameter               | Type     | Description                                                    |
  | :---------------------- | :------- | :------------------------------------------------------------- |
  | `product_link_argument` | `string` | **Required**. Product link without `https://www.flipkart.com/` |

  Example :
  - [View live demo](https://flipkart.dvishal485.workers.dev/product/compact/apple-2020-macbook-air-m1-8-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itmde54f026889ce)

  Returns same information but the sub-specifications are merged into one group, each seperated by `;`

  Useful when scrapping a huge data with low data transmission

- Minimum Mode

  ```;
    GET /product/min/${product_link_argument}
  ```

  | Parameter               | Type     | Description                                                    |
  | :---------------------- | :------- | :------------------------------------------------------------- |
  | `product_link_argument` | `string` | **Required**. Product link without `https://www.flipkart.com/` |

  Example :
  - [View live demo](https://flipkart.dvishal485.workers.dev/product/min/apple-2020-macbook-air-m1-8-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itmde54f026889ce)

  Returns information without Specifications reducing the size of output largely.

- Property Mode *(Deprecated)*

  ```;
    GET /property/${specs_to_search}/${product_link_argument}
  ```

  | Parameter               | Type     | Description                                                    |
  | :---------------------- | :------- | :------------------------------------------------------------- |
  | `specs_to_search`       | `string` | **Required**. Specs of product to search seperated with `&`    |
  | `product_link_argument` | `string` | **Required**. Product link without `https://www.flipkart.com/` |

  Example :
  - [View live demo](https://flipkart.dvishal485.workers.dev/property/battery&display/s/kzZg7WuuuN)
  
  In the given example, we are get all the specs containg `battery` or `display` in the product with link argument [`s/kzZg7WuuuN`](https://flipkart.dvishal485.workers.dev/product/s/kzZg7WuuuN)
  
  Replies with product details and only those specifications which are mentioned to be searched.

---

## Increasing Resolution of Image

You can increase the resolution of image by changing certain parameters in the thumbnail link.

For example, in the link :

```;
https://rukminim2.flixcart.com/image/312/312/kzfvzww0/computer/r/g/i/hp-laptop-15s-eq2144au-amd-ryzen-5-5500u-8gb-ddr4-512-gb-pcie-original-imagbg5jctdf4xwf.jpeg?q=70
```

The *312/312* describes the resolution. Just change it to *1024/1024* for product image.

```;
https://rukminim2.flixcart.com/image/1024/1024/kzfvzww0/computer/r/g/i/hp-laptop-15s-eq2144au-amd-ryzen-5-5500u-8gb-ddr4-512-gb-pcie-original-imagbg5jctdf4xwf.jpeg?q=70
```

---

## Deployment

Deploy your own API with Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dvishal485/flipkart-scraper-api)

---

## Accuracy

- Search API

    The Search API is tested with lot of products and compared thoroughly and is found to be accurate for all of them till date, thanking to the self adjusting different fetch methods. The Flipkart website doesn't have any standard `id` or `class` or `name` to the components of website making it far more difficult to scrape and create API from. However, there may be inaccuracy in case of some product ( `null` result ). In case, if someone encounter with some other error, convey it to me through [Telegram](https://t.me/dvishal485) or [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues) containing the following information :
  - Search keyword
  - Information you find wrong
  - Fetch Method
  - JSON response received ( if possible )

- Product API

    The Product API was found to be completely error free during the testing, so hopefully it will remain the same in future. I have ensured that you get maximum of Flipkart's data which may not be present in other alternatives. Especially without any authorisation. If you still encounter anything unexpected, [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues)

---

## Error Handling

  In case of any error you will receive an error message in the following format :

```json
{
  "error_message": "ERROR MESSAGE",
  "possible_solution": "POSSIBLE SOLUTION",
  "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
}
```
  
  **Note :** In case the API can't find Product URL or Name of Product, it will be set to `null`. Hence always null check the result.
  
  [If you are facing unexpected results then Raise An Issue](https://github.com/dvishal485/flipkart-scraper-api/issues)

---

## ToDo

- [x] Make code Presentable and Readable
- [x] Extend API for product details
- [x] Optimize existing code
- [ ] [Support for newer deployment methods](https://github.com/dvishal485/flipkart-scraper-api/issues/5)
- [x] Get product details (price & stock) specific to individual's pincode

  - Check out new repository [flipkart-product-stock](https://github.com/dvishal485/flipkart-product-stock)

- [x] New Project : Telegram bot to notify about price drop alerts

  - Check out [@flipkartX_bot](https://t.me/flipkartX_bot)
  - The bot can give you search result of any product and set price drop/rise alerts as well as stock availability alerts directly on Telegram.

---

## License and Copyright

- This Project is [Apache-2.0](./LICENSE) Licensed
- Copyright 2022 [Vishal Das](https://github.com/dvishal485)
