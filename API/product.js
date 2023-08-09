/* Copyright 2023 Vishal Das

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
*/

const product = async (link, type) => {
    const star = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=='
    if (type == 'compact') { var compactResult = true, minimumResult = false; } else if (type == 'minimum') { var compactResult = false, minimumResult = true; } else { var compactResult = false, minimumResult = false; }

    try {
        const uri = encodeURI(link);
        console.log("Product details initiated");
        try {
            var webPageContents = await (await fetch('https://www.flipkart.com/' + uri)).text();
            webPageContents = webPageContents.replace(/&amp;/g, '&');
            webPageContents = webPageContents.replace(/&nbsp;|&#...;/g, '');
            var comingSoon = doesExist(webPageContents.split('Coming Soon</div>'));
            var inStock = !doesExist(webPageContents.split('This item is currently out of stock</div>')) || comingSoon;
            // check if page has been moved or deleted
            if (webPageContents.includes('for has been moved or deleted'))
                throw "Link provided doesn't corresponds to any product";
        } catch (e) {
            return {
                "error_message": e.message,
                "possible_solution": "Validate your link and try removing https://www.flipkart.com from your product link",
                "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
            };
        }
        let rating = null, currentPrice = null, properURI = null, productName = null, originalPrice, highlights = [], product_id = null;

        // product name

        if (webPageContents.includes('<h1')) {
            productName = webPageContents.split('<h1')[1].split('</span>')[0].split('">')[2].replace(/<!-- -->/g, '').replace(/<!-- --/g, '');
            try {
                var subName = webPageContents.split('class="B_NuCI')[1].split('</span>')[0].split('>')[1].replace(/<!-- -->/g, '').replace(/<!-- --/g, '');
                productName += subName;
            } catch (e) { }
        } else {
            productName = webPageContents.split('class="B_NuCI')[1].split('</span>')[0].split('>')[1].replace(/<!-- -->/g, '');
        }

        // product price

        try {
            currentPrice = webPageContents.split('<h1')[1].split(">₹")[1].split("</div>")[0];
            currentPrice = parseInt(currentPrice.replace(/,/g, ''));
            product_id = webPageContents.split('productId":"')[1].split('","')[0];
            var discountDetailsArray = webPageContents.split('<h1')[1].split(">₹")[2].split("</div>")[0].split('<!-- -->');
            originalPrice = parseInt(discountDetailsArray[1].replace(/,/g, ''));
        } catch (e) { originalPrice = currentPrice; }

        try {
            if (currentPrice == null || currentPrice == undefined || currentPrice == NaN || currentPrice < 1) {
                currentPrice = parseInt(webPageContents.split(`_30jeq3 _16Jk6d`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
            }
        } catch (e) { }

        try {
            if (originalPrice == null || originalPrice == undefined || originalPrice == NaN || originalPrice < 1) {
                originalPrice = parseInt(webPageContents.split(`_3I9_wc _2p6lqe`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
            }
        } catch (e) { }

        let discount_percent = parseInt(100 * (1 - currentPrice / originalPrice))

        // product thumbnail

        /* thumbnail finder mechanism works on pattern
        based on comman flipkart products may not work
        with each and everyproduct page */
        let thumbnailDetailsArray = webPageContents.split('height:64px');
        let thumbnails = [];
        if (doesExist(thumbnailDetailsArray)) {
            thumbnails = makeThumbnails(thumbnailDetailsArray);
        } else {
            thumbnailDetailsArray = webPageContents.split('_20Gt85 _1Y');
            if (doesExist(thumbnailDetailsArray)) {
                thumbnails = makeThumbnails(thumbnailDetailsArray);
            } else {
                thumbnailDetailsArray = webPageContents.split('_2r_T1I');
                if (doesExist(thumbnailDetailsArray)) {
                    thumbnails = makeThumbnails(thumbnailDetailsArray);
                }
            }
        }
        // in many cases, one can find the thumbnail with it's product name
        // as the image alt usually contains the product name only
        if (thumbnails.length == 0) {
            try {
                let thumbnailDetailsUsingName = productName.split('(')[0].trim();
                let thumb = webPageContents.split(`alt="${thumbnailDetailsUsingName}`);
                if (thumb.length == 1) {
                    thumb = webPageContents.split(`alt="${thumbnailDetailsUsingName.slice(0, 5)}}`);
                }
                thumb = thumb[1].split('src="')[1].split('"')[0];
                thumbnails.push(thumb);
            } catch (e) { }
        }
        try {
            let imgArray = webPageContents.split('<img src="');
            imgArray.shift();
            for (let i of imgArray) {
                i = i.split('"')[0];
                if (!i.includes('promos') && i.slice(-2).match(/^\d+$/) && parseInt(i.slice(-2)) >= 50) {
                    if (!thumbnails.includes(i))
                        thumbnails.push(i);
                }
            }
        } catch (e) { }

        // fassured
        let fassured = false;
        try {
            var fAssuredDetails = webPageContents.split('<h1')[1].split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png');
            fassured = doesExist(fAssuredDetails);
        } catch (e) {
            fassured = doesExist(webPageContents.split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png'));
        }

        // page url

        try {
            let smallUri = webPageContents.split('product.share.pp"');
            if (doesExist(smallUri)) {
                smallUri = lastEntry(smallUri[smallUri.length - 2].split('"')) + 'product.share.pp';
                properURI = smallUri;
            }
            if (properURI[0] == '/') { properURI = 'https://www.flipkart.com' + properURI; }
            let x = 0;
            if (uri.split('/')[0] == '') { x = 1; }
            let properURI2 = `https://www.flipkart.com/${uri}`;
            if (uri.split('/')[x] == 's' || uri.split('/')[x] == 'dl') {
                properURI2 = `https://dl.flipkart.com/${uri}`;
            }
            properURI2 = cleanURL(properURI2);
            properURI = cleanURL(properURI);
            if (properURI2.length < properURI.length || doesExist(String(properURI).toLowerCase().split('login'))) {
                properURI = properURI2;
            }
        } catch (e) {
            properURI = cleanURL(`https://www.flipkart.com/${uri}`);
            if (uri.split('/')[0] == 's' || uri.split('/')[0] == 'dl') {
                properURI = cleanURL(`https://dl.flipkart.com/${uri}`);
            }
        }

        // product highlights

        try {
            let highlightsDetails = webPageContents.split('Highlights')[1].split('</ul>')[0].replace(/<\/li>/g, '').split('<li');
            if (doesExist(highlightsDetails)) {
                for (var i = 1; i < highlightsDetails.length; i++) {
                    try {
                        highlights.push(highlightsDetails[i].split('>')[1]);
                    } catch (e) { }
                }
            }
        } catch (e) { highlights = []; }

        // product rating

        var isRated = fAssuredDetails[0].split(star);
        if (comingSoon) {
            // products not released, so will not be rated
            rating = null;
        } else {
            if (doesExist(isRated)) {
                let ratingDetails = isRated[0].split('">');
                rating = lastEntry(ratingDetails).split('<')[0];
            } else {
                try {
                    rating = webPageContents.split(`_3LWZlK`)[1].split(`<`)[0].split(`>`)[1].trim();
                } catch (e) { }
            }
        }

        try {
            // final changes
            productName = productName.replace(/&#x27;/g, `'`).trim();
            properURI = properURI.replace('http://', 'https://');
        } catch (e) { }

        // product offers

        if (!minimumResult) {
            var offers = [];
            if (inStock)
                try {
                    // this is offer icon image
                    let offer_section = webPageContents.split('https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90');
                    for (var i = 0; i < offer_section.length; i++) {
                        try {
                            offer_section[i] = offer_section[i].split('<li')[1].split('<div')[0].replace(/<span>/g, ' : ').replace(/<\/span>/g, '').split('>')[2].trim().split("<")[0]
                            offers.push(offer_section[i]);
                        }
                        catch (e) { }
                    }
                } catch (e) { }

            // product specifications

            var specs = [];
            try {
                let specsDetails = webPageContents.split('Specifications</div>')[1].split('>Safe and Secure Payments.')[0].replace(/&amp;/g, '&').split('</div><table');
                for (var i = 1; i < specsDetails.length; i++) {
                    try {
                        let compactDetails = '';
                        var specsData = [];
                        let headingDetails = specsDetails[i - 1].split('>');
                        let heading = lastEntry(headingDetails);
                        let specsTable = specsDetails[i].split('</td>');
                        for (let k = 1; k < specsTable.length; k = k + 2) {
                            try {
                                let td = specsTable[k - 1].split('>');
                                let property = lastEntry(td);
                                let tr = specsTable[k].split('</li>')[0].split('>');
                                let propertyValue = lastEntry(tr);
                                if (property != null && property != "" && propertyValue.split("<").length == 1 && propertyValue != "") {
                                    if (!compactResult) {
                                        specsData.push({
                                            "property": property,
                                            "value": propertyValue
                                        });
                                    } else {
                                        compactDetails += property + ':' + propertyValue + ';';
                                    }
                                }
                            } catch (e) { }
                        }
                        console.log(specsData);
                        if (compactDetails || specsData.length > 0) {
                            if (specsData.length > 0) {
                                specs.push({
                                    "title": heading,
                                    "details": specsData
                                });
                            } else {
                                specs.push({
                                    "title": heading,
                                    "details": compactDetails
                                });
                            }
                        }
                    } catch (e) { }
                }
            } catch (e) { }
        }

        // result

        var resultJson = {
            "name": productName,
            "current_price": currentPrice,
            "original_price": originalPrice,
            "discounted": originalPrice != currentPrice,
            "discount_percent": discount_percent,
            "rating": parseFloat(rating),
            "in_stock": inStock,
            "f_assured": fassured,
            "share_url": properURI,
            "seller": {
                "seller_name": null,
                "seller_rating": null
            },
            "thumbnails": thumbnails,
            "highlights": highlights,
            "product_id": product_id
        }

        // seller details

        if (inStock)
            try {
                var seller = webPageContents.split('sellerName')[1]
                var sellerName = lastEntry(seller.split('</span>')[0].split('<span>'))
                try {
                    var seller_rating = lastEntry(seller.split(star)[0].split('>')).split('<')[0]
                    if (seller_rating.length <= 3) resultJson["seller"]["seller_rating"] = parseFloat(seller_rating)
                } catch (e) { }
                resultJson["seller"]["seller_name"] = sellerName
            } catch (e) { }

        if (!minimumResult) {
            Object.assign(resultJson, {
                "offers": offers,
                "specs": specs
            });
            resultJson['offers'] = offers
            resultJson.specs = specs
        }
        if (compactResult || minimumResult) {
            return resultJson;
        } else {
            return resultJson;
        }
    } catch (err) {
        return {
            "error": "Couldn't fetch information : " + err.message,
            "possible_solution": "Don't lose hope, contact the support",
            "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
        };
    }
}

// helper functions

function lastEntry(x) { return x[x.length - 1]; }
function doesExist(x) { return x.length > 1; }
function makeThumbnails(locationArray) {
    let thumbnails = [];
    for (var i = 1; i < locationArray.length; i++) {
        try {
            var thumbnailDetails = locationArray[i].split('</div>')[0].split('background-image:url(')[1].split(')')[0];
            thumbnails.push(thumbnailDetails);
        } catch (e) { }
    }
    return thumbnails;
}

const cleanURL = (url) => {
    // delete unnecessary parameters from product page url
    url = new URL(url);
    url.searchParams.delete('_appId');
    url.searchParams.delete('pid');
    url.searchParams.delete('_refId');
    url.searchParams.delete('cmpid');
    return url.toString();
}

export default product
