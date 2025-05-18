<head>
  <link rel="shortcut icon" type="image/x-icon" href="https://dvishal485.github.io/flipkart-scraper-api/favicon.ico">
</head>

# Flipkart Scraper API

API to scrape search results and product details from Flipkart

**Disclaimer:** I am not affiliated or linked to flipkart in any way. This repository is an exploratory project and not meant for commercial use.

![Flipkart API Banner](/banner.png)

![Version](https://img.shields.io/badge/dynamic/toml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdvishal485%2Fflipkart-scraper-api%2Fmain%2FCargo.toml&query=package.version&label=version)
[![GitHub license](https://img.shields.io/github/license/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dvishal485/flipkart-scraper-api)](https://github.com/dvishal485/flipkart-scraper-api/issues)
[![Telegram](https://img.shields.io/badge/-dvishal485-blue?style=flat&logo=telegram)](https://t.me/dvishal485)

## Table of Contents

- [Flipkart Scraper API](#flipkart-scraper-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Note](#note)
    - [Deprecation of hosted API](#deprecation-of-hosted-api)
  - [API Reference](#api-reference)
    - [Search Item](#search-item)
    - [Product Link Argument](#product-link-argument)
    - [Product Details](#product-details)
  - [Increasing Resolution of Image](#increasing-resolution-of-image)
  - [Deployment](#deployment)
    - [Deploy using Docker](#deploy-using-docker)
    - [Deploy using Nix](#deploy-using-nix)
    - [Using Cargo](#using-cargo)
  - [Error Handling](#error-handling)
  - [Migration from JS to Rust](#migration-from-js-to-rust)
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

- Search with min-max price range filter, pagination support and results sorting.
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

- The API also removes all trackers & loggers in every link from flipkart giving an completely unbaised and cleaner output.

### Note

- All the amounts are in currency INR
- You can also explore products by passing an empty search command

### Deprecation of hosted API

This API is being shipped only as a Docker image now and **not as a hosted URL**, due to over-exploitation of the API and lack of funds & free-tier limitations. The hosted API URL has been taken down. [Check out Deployement](#deployment)

The API has been [rewritten in Rust](#migration-from-js-to-rust). With this process, a multitude of unexpected errors have been addressed with improved accuracy and better scraping mechanism. [Refer issue #13](https://github.com/dvishal485/flipkart-scraper-api/issues/13) and [Refer issue #12](https://github.com/dvishal485/flipkart-scraper-api/issues/12).

---

## API Reference

### Search Item

```;
  GET /search/${product_name}
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `product_name` | `string` | **Required**. Name of product to search |

- [View sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-search.json)

The response will be given in following JSON format :

```javascript
{
  "total_result": int,
  "query": String,
  "fetch_from": String,
  "result": [
    "name": String,
    "link": String,
    "current_price": int | null,
    "original_price": int | null,
    "discounted": boolean,
    "thumbnail": String,
    "query_url": String,
  ]
}
```

### Product Link Argument

Link argument of a product will be URL of Flipkart product after removing the `https://www.flipkart.com/` or any other similar component from it.

### Product Details

```;
  GET /product/${product_link_argument}
```

| Parameter               | Type     | Description                                                    |
| :---------------------- | :------- | :------------------------------------------------------------- |
| `product_link_argument` | `string` | **Required**. Product link without `https://www.flipkart.com/` |

- [View sample response](https://dvishal485.github.io/flipkart-scraper-api/sample-product.json)

The response will be given in following JSON format :

```javascript
{
  "name": String | null,
  "current_price": int | null,
  "original_price": int | null,
  "discounted": boolean,
  "discount_percent": int | null,
  "rating": float | null,
  "in_stock": boolean,
  "f-assured": boolean,
  "share_url": String,
  "seller": {
    "seller_name": String,
    "seller_rating": float | null
  } | null,
  "thumbnails": [ String ],
  "highlights": [ String ],
  "offers": [
    {
      "offer_type": String | null,
      "description": String
    }
  ]
  "specs": [
    {
      "title": String
      "details": [
        {
          "property": String,
          "value": String
        }
      ]
    }
  ]
}
```

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

### Deploy using Docker

- Fork and clone the repository on your system.

    ```bash
    git clone https://github.com/dvishal485/flipkart-scraper-api.git
    cd flipkart-scraper-api
    ```

- Build docker image.

    ```bash
    docker build . --tag flipkart-scraper-api
    ```

- Start container from image.

    ```bash
    docker run --rm -p3000:3000 localhost/flipkart-scraper-api
    ```

- API is now running actively on localhost with port 3000.

### Deploy using Nix

The package is also available as a Nix flake. On supported system with Nix installed, simply run

```bash
nix run github:dvishal485/flipkart-scraper-api
```

This uses default host as `localhost:3000`. Host can be managed as follows:

```bash
DEPLOYMENT_URL='127.0.0.1:4000' nix run github:dvishal485/flipkart-scraper-api
```

### Using Cargo

If you have Cargo installed on your system, you can compile and run the code on your system.

- Fork and clone the repository on your system.

    ```bash
    git clone https://github.com/dvishal485/flipkart-scraper-api.git
    cd flipkart-scraper-api
    ```
  
- Make sure you have openssl installed. [Refer to openssl crate](https://docs.rs/openssl/latest/openssl/#automatic).

- Make sure to set the environment variables `OPENSSL_LIB_DIR` and `OPENSSL_INCLUDE_DIR` before compilation. [Refer to openssl crate](https://docs.rs/openssl/latest/openssl/#manual) or simply use `pkg-config` to auto-configure.

- Optional: Set the environment variable `DEPLOYMENT_URL` (defaults to `http://localhost:3000`).

  Note: This is only required to make appropriate substitutions as required, to change PORT or any other settings, you have to get into the code.

- Compile and Run.
  
    ```bash
    cargo run --release
    ```

---

## Error Handling

  In case of any error you will receive an error message in the following format :

```json
{
  "error": "ERROR MESSAGE",
}
```
  
  **Note :** In case the API can't find Product URL or Name of Product, it will be set to `null`. Hence always null check the result. [Refer datatypes of the JSON response](#api-reference)
  
  [If you are facing unexpected results then Raise An Issue](https://github.com/dvishal485/flipkart-scraper-api/issues)

---

## Migration from JS to Rust

The API was previously written in Javascript, which had a lot of error and exceptions and the error handling was used to control the "Control Flow" of the program. The same resulted in a complex work and data flow and a difficult to maintain source code.

Hence decision was made to rewrite the API in Rust in a better approach to avoid running into issue and at the same time perform better with more accuracy and less "hacks". The types are also now guaranteed to match [as specified in the documentation](#api-reference). One can always [refer to the javascript builds in the previous commits](https://github.com/dvishal485/flipkart-scraper-api/tree/cbdf05efb829556ff3d41453b844bd6a1ceefed2).

Also decision to remove the hosted API was taken. API is now only [available for self-hosting](#deployment). Refer issues [#12](https://github.com/dvishal485/flipkart-scraper-api/issues/12) and [#13](https://github.com/dvishal485/flipkart-scraper-api/issues/13).

---

## License and Copyright

- This Project is [Apache-2.0](./LICENSE) Licensed
- Copyright 2023 [Vishal Das](https://github.com/dvishal485)

---
