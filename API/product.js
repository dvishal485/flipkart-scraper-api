const product = async (link, type) => {
    if (type == 'compact') { var compactResult = true, minimumResult = false; } else if (type == 'minimum') { var compactResult = false, minimumResult = true; } else { var compactResult = false, minimumResult = false; }
    try {
        const uri = encodeURI(link)
        console.log("Product details initiated")
        try {
            var webPageContents = await (await fetch('https://www.flipkart.com/' + uri)).text();
            webPageContents = webPageContents.replace(/&amp;/g, '&')
            // check if page has been moved or deleted
            if (doesExist(webPageContents.split('for has been moved or deleted'))) {
                throw "Link provided doesn't corresponds to any product";
            }
        } catch (e) {
            return JSON.stringify({
                "error_message": e,
                "possible_solution": "Validate your link and try removing https://www.flipkart.com from your product link",
                "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
            })
        }
        var rating = null, currentPrice = null, properURI = null, productName = null, originalPrice, highlights = [];
        if (doesExist(webPageContents.split('<h1'))) {
            var productName = webPageContents.split('<h1')[1].split('</span>')[0].split('">')[2].replace(/<!-- -->/g, '').replace(/&nbsp;/g, '');
        } else {
            var productName = webPageContents.split('class="B_NuCI')[1].split('</span>')[0].split('>')[1].replace(/<!-- -->/g, '').replace(/&nbsp;/g, '')
        }
        try {
            var currentPrice = webPageContents.split('<h1')[1].split(">₹")[1].split("</div>")[0]
        } catch (e) {
            var currentPrice = null
        }
        try {
            var discountDetailsArray = webPageContents.split('<h1')[1].split(">₹")[2].split("</div>")[0].split('<!-- -->')
            var isDiscounted = doesExist(discountDetailsArray)
        } catch (e) {
            var isDiscounted = false
        }
        // thumbnail finder mechanism works on pattern based on comman flipkart products
        // may not work with each and every product page
        var thumbnailDetailsArray = webPageContents.split('height:64px')
        var thumbnails = []
        if (doesExist(thumbnailDetailsArray)) {
            thumbnails = makeThumbnails(thumbnailDetailsArray)
        } else {
            thumbnailDetailsArray = webPageContents.split('_20Gt85 _1Y')
            if (doesExist(thumbnailDetailsArray)) {
                thumbnails = makeThumbnails(thumbnailDetailsArray)
            } else {
                thumbnailDetailsArray = webPageContents.split('_2r_T1I')
                if (doesExist(thumbnailDetailsArray)) {
                    thumbnails = makeThumbnails(thumbnailDetailsArray)
                }
            }
        }
        // in many cases, one can find the thumbnail with it's product name
        // as the image alt usually contains the product name only
        if (thumbnails.length == 0) {
            try {
                var thumbnailDetailsUsingName = productName.split('(')[0].trim()
                var thumb = webPageContents.split(`alt="${thumbnailDetailsUsingName}`)
                thumb = thumb[1].split('src="')[1].split('"')[0]
                thumbnails.push(thumb)
            } catch (e) { }
        }
        try {
            var fAssuredDetails = webPageContents.split('<h1')[1].split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png')
            var fassured = doesExist(fAssuredDetails)
        } catch (e) {
            var fassured = doesExist(webPageContents.split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png'))
        }
        try {
            currentPrice = parseInt(currentPrice.replace(/,/g, ''))
            if (isDiscounted) {
                originalPrice = parseInt(discountDetailsArray[1].replace(/,/g, ''))
            } else { originalPrice = currentPrice }
        } catch (e) {
            originalPrice = null
        }
        try {
            var smallUri = webPageContents.split('product.share.pp"')
            if (doesExist(smallUri)) {
                smallUri = lastEntry(smallUri[smallUri.length - 2].split('"')) + 'product.share.pp'
                properURI = smallUri
            }
            if (properURI[0] == '/') { properURI = 'https://www.flipkart.com' + properURI }
            if (doesExist(String(properURI).toLowerCase().split('login'))) {
                if (uri.split('/')[0] == '') { var x = 1 } else { var x = 0 }
                if (uri.split('/')[x] == 's' || uri.split('/')[x] == 'dl') {
                    var properURI = `https://dl.flipkart.com/${uri}`
                } else {
                    var properURI = `https://www.flipkart.com/${uri}`
                }
            }
        } catch (e) {
            if (uri.split('/')[0] == 's' || uri.split('/')[0] == 'dl') {
                var properURI = `https://dl.flipkart.com/${uri}`
            } else {
                var properURI = `https://www.flipkart.com/${uri}`
            }
        }
        var url = new URL(properURI);
        // delete useless parameters from product page url
        url.searchParams.delete('_appId')
        url.searchParams.delete('_refId')
        url.searchParams.delete('cmpid')
        properURI = url.toString()
        var comingSoon = doesExist(webPageContents.split('Coming Soon</div>'))
        var inStock = doesExist(webPageContents.split('This item is currently out of stock</div>')) || comingSoon
        try {
            var highlightsDetails = webPageContents.split('Highlights')[1].split('</ul>')[0].replace(/<\/li>/g, '').split('<li')
            if (doesExist(highlightsDetails)) {
                for (var i = 1; i < highlightsDetails.length; i++) {
                    try {
                        highlights.push(highlightsDetails[i].split('>')[1])
                    } catch (e) { }
                }
            }
        } catch (e) { highlights = [] }
        var isRated = fAssuredDetails[0].split('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==')
        if (comingSoon) {
            // products not released yet will not be rated
            var rating = null
        } else {
            if (doesExist(isRated)) {
                var ratingDetails = isRated[0].split('">')
                var rating = lastEntry(ratingDetails).split('<')[0]
            } else {
                try {
                    var rating = webPageContents.split(`_3LWZlK`)[1].split(`<`)[0].split(`>`)[1].trim()
                } catch (e) { }
            }
        }
        if (currentPrice == null || currentPrice == undefined || currentPrice == NaN || currentPrice < 1) {
            currentPrice = parseInt(webPageContents.split(`_30jeq3 _16Jk6d`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
        }
        if (originalPrice == null || originalPrice == undefined || originalPrice == NaN || originalPrice < 1) {
            originalPrice = parseInt(webPageContents.split(`_3I9_wc _2p6lqe`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
        }
        var discount_percent = parseInt(100 * (1 - currentPrice / originalPrice))
        try {
            // final changes
            productName = productName.replace(/&#x27;/g, `'`).trim()
            properURI = properURI.replace('http://', 'https://')
            inStock = !inStock
        } catch (e) { }
        if (!minimumResult) {
            var specs = []
            try {
                var specsDetails = webPageContents.split('Specifications</div>')[1].split('>Safe and Secure Payments.')[0].replace(/&amp;/g, '&').split('</div><table')
            } catch (e) { var specsDetails = [] }
            for (var i = 1; i < specsDetails.length; i++) {
                try {
                    var compactDetails = '';
                    var specsData = [];
                    var headingDetails = specsDetails[i - 1].split('>')
                    var heading = lastEntry(headingDetails)
                    var specsTable = specsDetails[i].split('</td>')
                    var k;
                    for (k = 1; k < specsTable.length; k = k + 2) {
                        try {
                            var td = specsTable[k - 1].split('>')
                            var property = lastEntry(td)
                            var tr = specsTable[k].split('</li>')[0].split('>')
                            var propertyValue = lastEntry(tr)
                            if (property != null && property != "" && propertyValue.split("<").length == 1 && propertyValue != "") {
                                if (!compactResult) {
                                    specsData.push({
                                        "property": property,
                                        "value": propertyValue
                                    })
                                } else {
                                    compactDetails += property + ' : ' + propertyValue + '; '
                                }
                            }
                        } catch (e) { }
                    }
                    if (specsData != []) {
                        if (!compactResult) {
                            specs.push({
                                "title": heading,
                                "details": specsData
                            })
                        } else {
                            specs.push({
                                "title": heading,
                                "details": compactDetails
                            })
                        }
                    }
                } catch (e) { }
            }
        }
        var resultJson = {
            "name": productName,
            "current_price": currentPrice,
            "original_price": originalPrice,
            "discounted": isDiscounted,
            "discount_percent": discount_percent,
            "rating": rating,
            "in_stock": inStock,
            "f_assured": fassured,
            "share_url": properURI,
            "thumbnails": thumbnails,
            "highlights": highlights
        }
        if (!minimumResult) {
            Object.assign(resultJson, {
                "specs": specs
            });
            resultJson.specs = specs
        }
        if (compactResult || minimumResult) {
            return JSON.stringify(resultJson)
        } else {
            return JSON.stringify(resultJson, null, 1)
        }
    } catch (err) {
        return JSON.stringify({
            "error": "Couldn't fetch information : " + err.message,
            "possible_solution": "Don't lose hope, contact the support",
            "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
        }, null, 2)
    }
}

function lastEntry(x) { return x[x.length - 1] }
function doesExist(x) { return x.length > 1 }
function makeThumbnails(locationArray) {
    var thumbnails = []
    for (var i = 1; i < locationArray.length; i++) {
        try {
            var thumbnailDetails = locationArray[i].split('</div>')[0].split('background-image:url(')[1].split(')')[0]
            thumbnails.push(thumbnailDetails)
        } catch (e) { }
    }
    return thumbnails
}

export default product
