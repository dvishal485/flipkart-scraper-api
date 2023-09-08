/* Copyright 2023 Vishal Das

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
*/

const search = async (q, host) => {
    const searchURL = 'https://www.flipkart.com/search?marketplace=FLIPKART&q=' + q;
    console.log("Search initiated : " + searchURL);
    let webPageContents = await (await fetch(searchURL)).text();
    // To rectify pages with exchange option
    webPageContents = webPageContents.replace(/style="color:#000000;font-size:14px;font-style:normal;font-weight:700">₹/g, '>Rs. ');
    webPageContents = webPageContents.replace(/&#x27;/g, `'`).replace(/&#...;/g, '');
    let products = webPageContents.split('>₹');
    let result = [], method = null, reversion = false;

    for (var i = 1; i < products.length; i++) {
        // The product details will be tried to be found through various
        // methods. Each method has been carefully thought upon at time
        // of building the script. And it works very well till date.
        // Updates will be difficult and editing is not recommened in
        // this script until and unless you know what each line does.
        try {
            let currentPrice = null, originalPrice = null, productLink = null, productName = null, isDiscounted = false, thumbnail = null;
            let linkDetails = null, lastLinkIndex = null, linkDetailsFinder = null

            // product price

            let priceCheck = products[i].split('</div>')[0].replace(/,|<|>|-|!/g, '');
            currentPrice = parseInt(priceCheck);
            originalPrice = parseInt(currentPrice);

            // product name and link

            if (priceCheck.split('</option>').length == 1) {
                //Method A - Compact screen with about mulltiple columns
                try {
                    linkDetails = products[i - 1].split('</a>');
                    try {
                        let thumbnails_arr = products[i - 1].split('src="https');
                        for (let i = 0; i < thumbnails_arr.length; i++) {
                            let possible_thumbnail = thumbnails_arr[i].split('"')[0];
                            if (possible_thumbnail.lastIndexOf("jpeg") != -1
                                || possible_thumbnail.lastIndexOf("image") != -1) {
                                thumbnail = "https" + possible_thumbnail; break;
                            }
                        }
                    } catch (e) { }
                    lastLinkIndex = linkDetails.length - 2;
                    linkDetailsFinder = linkDetails[lastLinkIndex].split('target="_blank"');
                    if (linkDetailsFinder.length > 1) {
                        productLink = "https://www.flipkart.com" + linkDetailsFinder[1].split('href="')[1].split('"')[0];
                        productName = linkDetailsFinder[1].split('href="')[1].split('"')[1].split('>')[1];
                        method = "A";
                    }
                } catch (error) {
                    console.log("Failed to obtain product name and link from Method A");
                }

                if (productName == "" || productName == null) {
                    // Method B - Full product description page
                    try {
                        if (method == "C" || method == "D") {
                            // This should revert method to B temporarily
                            i++;
                            reversion = true;
                        }
                        linkDetails = products[i - 2].split('<a');
                        method = "B";
                        if (linkDetails.length == 1) {
                            // Method C
                            linkDetails = products[i - 1].split('<a');
                            method = "C";
                        } else {
                            console.log("Failed to obtain product name and link from Method B");
                        }
                        lastLinkIndex = linkDetails.length - 1;
                        linkDetailsFinder = linkDetails[lastLinkIndex].split('target="_blank"');
                        if (linkDetailsFinder.length > 1) {
                            productLink = "https://www.flipkart.com" + linkDetailsFinder[1].split('href="')[1].split('"')[0];
                            try {
                                if (linkDetailsFinder[1].indexOf("Sponsored") == -1) {
                                    try {
                                        productName = linkDetailsFinder[1].split('href="')[1].split('"col col-7-12">')[1].split('</div>')[0].split('>')[1];
                                    } catch (e) {
                                        try {
                                            let occur = linkDetailsFinder[1].split('href="')[1].split('</div>')[0];
                                            productName = occur.split('>')[occur.length - 1];
                                        } catch (e) {
                                            console.log("Couldn't fetch product name at all.");
                                        }
                                    }
                                } else {
                                    let span_class = linkDetailsFinder[1].split('"col col-7-12"')[1].split("</div>")[1].split(">")[2];
                                    productName = span_class;
                                }
                            } catch (e) {
                                console.log("Failed to obtain product name, keeping it null");
                            }
                        }
                        if (reversion) {
                            i--;
                            reversion = false;
                            method = "D";
                            console.log("Failed to obtain product name and link from Method C");
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                    if (productName == "" || productName == null) {
                        console.log("Failed to obtain product name and link from known methods");
                    } else {
                        console.log("Sucessfully obtained product name and link from known methods");

                        // product thumbnail

                        try {
                            if (thumbnail == null) {
                                thumbnail = webPageContents.split(`alt="${productName}"`)[1].split('src="')[1].split('"')[0];
                            }
                        } catch (e) { thumbnail = null; }
                        if (i + 1 != products.length) {
                            var nextItem = products[i + 1].split('</div>')[0].replace(/,/g, '').split('<!-- -->');
                            isDiscounted = nextItem.length > 1;
                            if (isDiscounted) { i++; originalPrice = parseInt(nextItem[1]); }
                        }

                        result.push({
                            "name": productName.replace(/&#x27;/g, `'`),
                            "link": clean(productLink),
                            "current_price": currentPrice,
                            "original_price": originalPrice,
                            "discounted": isDiscounted,
                            thumbnail,
                            "query_url": clean(productLink).replace('www.flipkart.com', host + '/product').replace('dl.flipkart.com', host + '/product')
                        })
                    }
                } else {

                    // product thumbnail

                    try {
                        if (thumbnail == null) {
                            thumbnail = webPageContents.split(`alt="${productName}"`);
                            if (thumbnail.length == 1)
                                thumbnail = webPageContents.split(`alt="${productName.slice(0, 5)}`);
                            thumbnail = thumbnail[1].split('src="')[1].split('"')[0];
                        }
                    } catch (e) { thumbnail = null; }
                    if (i + 1 != products.length) {
                        var nextItem = products[i + 1].split('</div>')[0].replace(/,/g, '').split('<!-- -->');
                        isDiscounted = nextItem.length > 1;
                        if (isDiscounted) { i++; originalPrice = parseInt(nextItem[1]); }
                    }
                    result.push({
                        "name": productName.trim(),
                        "link": clean(productLink).replace('http://', 'https://'),
                        "current_price": currentPrice,
                        "original_price": originalPrice,
                        "discounted": isDiscounted,
                        thumbnail,
                        "query_url": clean(productLink).replace('www.flipkart.com', host + '/product').replace('dl.flipkart.com', host + '/product')
                    });
                }
            } else {
                webPageContents = webPageContents.replace('₹', 'Rs.');
                console.log("Ignoring amount " + currentPrice + " : Suspected to be dropdown menu item");
            };
        } catch (e) {
            console.log(e.message);
        }
    }

    return {
        total_result: result.length,
        query: q,
        fetch_from: searchURL,
        result
    };

}

const clean = (link) => {
    // delete all useless parameters from product url
    var url = new URL(link.replace(/amp;/g, ''));
    url.searchParams.delete('_appId');
    url.searchParams.delete('_refId');
    url.searchParams.delete('cmpid');
    url.searchParams.delete('marketplace');
    url.searchParams.delete('ppt');
    url.searchParams.delete('lid');
    url.searchParams.delete('store');
    url.searchParams.delete('spotlightTagId');
    url.searchParams.delete('q');
    url.searchParams.delete('srno');
    url.searchParams.delete('otracker');
    url.searchParams.delete('fm');
    url.searchParams.delete('iid');
    url.searchParams.delete('ppn');
    url.searchParams.delete('ssid');
    url.searchParams.delete('qH');
    return url.toString();
}

export default search
