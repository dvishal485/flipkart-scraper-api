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
  <details>
    <summary>View sample response</summary>
  
```json
{
  "result": [
    {
      "name": "ASUS ROG Zephyrus Duo 15 SE Ryzen 9 Octa Core 5900HX - (32 GB/2 TB SSD/Windows 10 Home/16 GB Graphics/...",
      "link": "https://www.flipkart.com/asus-rog-zephyrus-duo-15-se-ryzen-9-octa-core-5900hx-32-gb-2-tb-ssd-windows-10-home-16-gb-graphics-nvidia-geforce-rtx-3080-300-hz-gx551qs-hf151ts-gaming-laptop/p/itmbc357f16e90ce?pid=COMGYKZ9BKGTCG3F&amp;lid=LSTCOMGYKZ9BKGTCG3FZPZ6MH&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_1&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y4Ef%2FcbKkKKji7TYxCfaOsUrl4egRc6yx6khs9PjQhMjg%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 299990,
      "original_price": 389990,
      "discounted": true,
      "fetch_method": "C"
    },
    {
      "name": "ASUS ROG Flow X13 Ryzen 7 Octa Core 5800HS - (16 GB/1 TB SSD/Windows 10 Home/4 GB Graphics/NVIDIA GeFo...",
      "link": "https://www.flipkart.com/asus-rog-flow-x13-ryzen-7-octa-core-5800hs-16-gb-1-tb-ssd-windows-10-home-4-gb-graphics-nvidia-geforce-gtx-1650-120-hz-gv301qh-k6463ts-2-1-gaming-laptop/p/itma931643df91fc?pid=COMG2DBSBXVZBFZG&amp;lid=LSTCOMG2DBSBXVZBFZGTMOOCT&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_2&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y4vdjqi1lQVVQp%2F%2BdeVv041ukoolwYUEDe7inZKIjBfUw%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 124990,
      "original_price": 162990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "HP Pentium Quad Core - (8 GB/256 GB SSD/Windows 10 Home) 14s- DQ3018TU Thin and Light Laptop",
      "link": "https://www.flipkart.com/hp-pentium-quad-core-8-gb-256-gb-ssd-windows-10-home-14s-dq3018tu-thin-light-laptop/p/itmdf4e72a377e90?pid=COMG2HDWHWHHJV4E&amp;lid=LSTCOMG2HDWHWHHJV4EU2HY7O&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_3&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG2HDWHWHHJV4E.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 31490,
      "original_price": 33539,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "ASUS Athlon Dual Core 3050U - (4 GB/1 TB HDD/Windows 10 Home) M515DA-EJ002TS Thin and Light Laptop",
      "link": "https://www.flipkart.com/asus-athlon-dual-core-3050u-4-gb-1-tb-hdd-windows-10-home-m515da-ej002ts-thin-light-laptop/p/itm4bbe3ec46fb8b?pid=COMGYFH7HMPR9KD7&amp;lid=LSTCOMGYFH7HMPR9KD7Y4VBYQ&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_4&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMGYFH7HMPR9KD7.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 27990,
      "original_price": 32990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "HP 15s Ryzen 5 Quad Core 3500U - (8 GB/512 GB SSD/Windows 10 Home) 15s-eq0500AU Thin and Light Laptop",
      "link": "https://www.flipkart.com/hp-15s-ryzen-5-quad-core-3500u-8-gb-512-gb-ssd-windows-10-home-15s-eq0500au-thin-light-laptop/p/itm332829f51ddf9?pid=COMG22MX8FYVBNYZ&amp;lid=LSTCOMG22MX8FYVBNYZC0O4P9&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_5&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG22MX8FYVBNYZ.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 46490,
      "original_price": 52575,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "HP 14s Ryzen 3 Quad Core 4300U - (8 GB/512 GB SSD/Windows 10 Home) 14s-fr0016AU Thin and Light Laptop",
      "link": "https://www.flipkart.com/hp-14s-ryzen-3-quad-core-4300u-8-gb-512-gb-ssd-windows-10-home-14s-fr0016au-thin-light-laptop/p/itma78a910d56810?pid=COMG26RVFGZGDE9D&amp;lid=LSTCOMG26RVFGZGDE9DXGPBAY&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_6&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG26RVFGZGDE9D.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 39490,
      "original_price": 44442,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "Lenovo IdeaPad 3 Ryzen 5 Quad Core 3500U - (8 GB/512 GB SSD/Windows 10 Home) 14ADA05 Laptop",
      "link": "https://www.flipkart.com/lenovo-ideapad-3-ryzen-5-quad-core-3500u-8-gb-512-gb-ssd-windows-10-home-14ada05-laptop/p/itm49cfa1c074076?pid=COMG23RKNK6SU8HT&amp;lid=LSTCOMG23RKNK6SU8HTMCHUJD&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_7&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG23RKNK6SU8HT.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 41990,
      "original_price": 55990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "ASUS Ryzen 5 Quad Core 3500U - (8 GB/1 TB HDD/Windows 10 Home) M515DA-BQ502TS Thin and Light Laptop",
      "link": "https://www.flipkart.com/asus-ryzen-5-quad-core-3500u-8-gb-1-tb-hdd-windows-10-home-m515da-bq502ts-thin-light-laptop/p/itmf0e65b5d0c854?pid=COMGFH7UZJRHK8RB&amp;lid=LSTCOMGFH7UZJRHK8RBG69XPP&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_8&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y6Wsvfe1CEBbBATSlmxjPX59d2iAAb0pV%2Fzu1NSR5iETw%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 41990,
      "original_price": 52990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "HP 14s Core i3 11th Gen - (8 GB/512 GB SSD/Windows 10 Home) 14s- DR2015TU Thin and Light Laptop",
      "link": "https://www.flipkart.com/hp-14s-core-i3-11th-gen-8-gb-512-gb-ssd-windows-10-home-14s-dr2015tu-thin-light-laptop/p/itm3207eaabf1371?pid=COMG2HKGZ8XJG9WA&amp;lid=LSTCOMG2HKGZ8XJG9WACGEGGV&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_9&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG2HKGZ8XJG9WA.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 44990,
      "original_price": 49489,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "acer Aspire 7 Ryzen 5 Quad Core 3550H - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce ...",
      "link": "https://www.flipkart.com/acer-aspire-7-ryzen-5-quad-core-3550h-8-gb-512-gb-ssd-windows-10-home-4-graphics-nvidia-geforce-gtx-1650-60-hz-a715-41g-r6s8-gaming-laptop/p/itm56e58b0c59ea3?pid=COMFUUJGMZCNJDZH&amp;lid=LSTCOMFUUJGMZCNJDZHGUDORZ&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_10&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFUUJGMZCNJDZH.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 49990,
      "original_price": 72990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "Lenovo Ideapad S145 Core i3 10th Gen - (8 GB/1 TB HDD/Windows 10 Home) S145-15IIL Laptop",
      "link": "https://www.flipkart.com/lenovo-ideapad-s145-core-i3-10th-gen-8-gb-1-tb-hdd-windows-10-home-s145-15iil-laptop/p/itmb29c6d0cecd88?pid=COMFVECHMXQCSH44&amp;lid=LSTCOMFVECHMXQCSH444SJ4FY&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_11&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFVECHMXQCSH44.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 34990,
      "original_price": 42490,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "DELL Vostro Ryzen 3 Dual Core 3250U - (4 GB/1 TB HDD/Windows 10 Home) Vostro 3405 Thin and Light Lapto...",
      "link": "https://www.flipkart.com/dell-vostro-ryzen-3-dual-core-3250u-4-gb-1-tb-hdd-windows-10-home-3405-thin-light-laptop/p/itmd54aadfe16bb6?pid=COMFY9Z3RX9DYK2C&amp;lid=LSTCOMFY9Z3RX9DYK2CRPLHCC&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_12&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y49os%2FZZTQ5m6c517lYVn5TJDAdkQoA8R4Wk9qVvMXHzw%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 31490,
      "original_price": 36368,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "ASUS VivoBook 15 Core i3 10th Gen - (8 GB/1 TB HDD/Windows 10 Home) X515JA-EJ322TS Thin and Light Lapt...",
      "link": "https://www.flipkart.com/asus-vivobook-15-core-i3-10th-gen-8-gb-1-tb-hdd-windows-10-home-x515ja-ej322ts-thin-light-laptop/p/itm5cd03fd1bd5bc?pid=COMFZ53SSJQYYVTY&amp;lid=LSTCOMFZ53SSJQYYVTYERZCP9&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_13&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFZ53SSJQYYVTY.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 37990,
      "original_price": 38910,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "ASUS Vivobook Gaming Core i5 9th Gen - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce G...",
      "link": "https://www.flipkart.com/asus-vivobook-gaming-core-i5-9th-gen-8-gb-512-gb-ssd-windows-10-home-4-graphics-nvidia-geforce-gtx-1650-f571gt-bn913ts-laptop/p/itm8dba8769b86c8?pid=COMG26W4WKY8GUAR&amp;lid=LSTCOMG26W4WKY8GUARCMASBH&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_19&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMG26W4WKY8GUAR.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 52990,
      "original_price": 71990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "acer Aspire 3 Ryzen 3 Dual Core 3300U - (4 GB/1 TB HDD/Windows 10 Home) A315-42-R7HL Laptop",
      "link": "https://www.flipkart.com/acer-aspire-3-ryzen-dual-core-3300u-4-gb-1-tb-hdd-windows-10-home-a315-42-r7hl-laptop/p/itmb9278e8196275?pid=COMGFQ4AZFYEVVC5&amp;lid=LSTCOMGFQ4AZFYEVVC56ZJMQB&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_20&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y61%2BzTqJKC%2BD4WZNyzlwyiIkJGbohISAGzGT7ygisFENg%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 27990,
      "original_price": 36031,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "MSI GF63 Thin Core i5 9th Gen - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce GTX 1650...",
      "link": "https://www.flipkart.com/msi-gf63-thin-core-i5-9th-gen-8-gb-512-gb-ssd-windows-10-home-4-graphics-nvidia-geforce-gtx-1650-ti-max-q-9scsr-1040in-gaming-laptop/p/itm5ca8ea2a1ce80?pid=COMFUR8XCVCMMVM2&amp;lid=LSTCOMFUR8XCVCMMVM2FBE02J&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_21&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFUR8XCVCMMVM2.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 52990,
      "original_price": 72990,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "HP Pavilion Gaming Ryzen 5 Quad Core 3550H - (8 GB/1 TB HDD/Windows 10 Home/4 GB Graphics/NVIDIA GeFor...",
      "link": "https://www.flipkart.com/hp-pavilion-gaming-ryzen-5-quad-core-3550h-8-gb-1-tb-hdd-windows-10-home-4-gb-graphics-nvidia-geforce-gtx-1650-15-ec0101ax-laptop/p/itma1af6bf593dc8?pid=COMFSFNVDXG74QXR&amp;lid=LSTCOMFSFNVDXG74QXRY8FRH2&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;spotlightTagId=BestsellerId_6bo%2Fb5g&amp;srno=s_1_22&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFSFNVDXG74QXR.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 50990,
      "original_price": 56144,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "acer Nitro 5 Ryzen 5 Hexa Core 4600H - (8 GB/1 TB HDD/256 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA ...",
      "link": "https://www.flipkart.com/acer-nitro-5-ryzen-hexa-core-4600h-8-gb-1-tb-hdd-256-gb-ssd-windows-10-home-4-graphics-nvidia-geforce-gtx-1650-an515-44-r9qa-gaming-laptop/p/itm4302e2e2671a5?pid=COMFUR8X6RGZGYCJ&amp;lid=LSTCOMFUR8X6RGZGYCJLMUQYG&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_23&amp;otracker=search&amp;fm=organic&amp;iid=e38d37b1-be05-4d04-b8a6-131e9c5fa434.COMFUR8X6RGZGYCJ.SEARCH&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 62990,
      "original_price": 78999,
      "discounted": true,
      "fetch_method": "D"
    },
    {
      "name": "ASUS Ryzen 3 Dual Core - (4 GB/256 GB SSD/Windows 10 Home) M515DA-BQ312TS Thin and Light Laptop",
      "link": "https://www.flipkart.com/asus-ryzen-3-dual-core-4-gb-256-gb-ssd-windows-10-home-m515da-bq312ts-thin-light-laptop/p/itmb693b62762dc7?pid=COMG2DBSMFDZTE9F&amp;lid=LSTCOMG2DBSMFDZTE9FNDKXIK&amp;marketplace=FLIPKART&amp;q=laptop&amp;store=6bo%2Fb5g&amp;srno=s_1_24&amp;otracker=search&amp;fm=organic&amp;iid=en_twmsbMAwbhMbDT4MVUXK1I5GXneu7ctZRZSQdmK80y4J4i%2Bduv89V3b9OosRpohoOySViE4ma3ROM69E3f%2B%2BeA%3D%3D&amp;ppt=None&amp;ppn=None&amp;ssid=eppbf893zk0000001622214242944&amp;qH=312f91285e048e09",
      "current_price": 31990,
      "original_price": 37990,
      "discounted": true,
      "fetch_method": "D"
    }
  ]
}
```
  </details>
  
# Accuracy
  The API is tested with lot of products and compared thoroughly and is found to be accurate for all of them till date, thanking to the self adjusting different fetch methods. The Flipkart website doesn't have any standard 'id' or 'class' or 'name' to the components of website making it far more difficult to scrape and create API from. However, there may be inaccuracy in case of some product. In case, if someone encounter with any of such item, convey it to me through [Telegram](https://t.me/dvishal485) or [raise an issue](https://github.com/dvishal485/flipkart-scraper-api/issues) containing the following information :
  - Search keyword
  - Information you find wrong
  - Fetch Method
  - JSON response received ( if possible )

### Notes
  While using the API, remember to null-check the Product Name and URL. It might be the case that the API Fetch Product price accurately but fail do give information about it's name and URL ( have not seen such case till date but is possible ). [Raise an issue for the same](#Accuracy)

# Todo
  - Extend API for product details
  - Optimize existing code
  - Improve accuracy
