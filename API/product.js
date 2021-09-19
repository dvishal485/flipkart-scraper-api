const product = async (link, type) => {
    if (type == 'compact') { var compact = true, minimumResult = false; } else if (type == 'minimum') { var compact = false, minimumResult = true; } else { var compact = false, minimumResult = false; }
    try {
        const uri = encodeURI(link)
        console.log("Product details initiated")
        try {
            var webPage = await (await fetch('https://www.flipkart.com/' + uri)).text();
            webPage = webPage.replace(/&amp;/g, '&')
            // for has been moved or deleted
            if (doesExist(webPage.split('for has been moved or deleted'))) {
                throw "Link provided doesn't corresponds to any product";
            }
        } catch (e) {
            return JSON.stringify({
                "error_message": e,
                "possible_solution": "Validate your link and try removing https://www.flipkart.com from your product link",
                "bug_report": "https://github.com/dvishal485/flipkart-scraper-api/issues"
            })
        }
        var rating = null, price = null, properURI = null, title = null, oprice, highlights = [];
        if (doesExist(webPage.split('<h1'))) {
            var title = webPage.split('<h1')[1].split('</span>')[0].split('">')[2].replace(/<!-- -->/g, '').replace(/&nbsp;/g, '');
        } else {
            var title = webPage.split('class="B_NuCI')[1].split('</span>')[0].split('>')[1].replace(/<!-- -->/g, '').replace(/&nbsp;/g, '')
        }
        try {
            var price = webPage.split('<h1')[1].split(">₹")[1].split("</div>")[0]
        } catch (e) {
            var price = null
        }
        try {
            var discountCheck = webPage.split('<h1')[1].split(">₹")[2].split("</div>")[0].split('<!-- -->')
            var discounted = doesExist(discountCheck)
        } catch (e) {
            var discounted = false
        }
        var t = webPage.split('height:64px')
        var thumbnails = []
        if (doesExist(t)) {
            thumbnails = makeThumbnails(t)
        } else {
            t = webPage.split('_20Gt85 _1Y')
            if (doesExist(t)) {
                thumbnails = makeThumbnails(t)
            } else {
                t = webPage.split('_2r_T1I')
                if (doesExist(t)) {
                    thumbnails = makeThumbnails(t)
                }
            }
        }
        if (thumbnails.length == 0) {
            try {
                var p = title.split('(')[0].trim()
                var thumb = webPage.split(`alt="${p}`)
                thumb = thumb[1].split('src="')[1].split('"')[0]
                thumbnails.push(thumb)
            } catch (e) { }
        }
        try {
            var fAssCheck = webPage.split('<h1')[1].split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png')
            var fassured = doesExist(fAssCheck)
        } catch (e) {
            var fassured = doesExist(webPage.split('Product Description')[0].split('fk-cp-zion/img/fa_62673a.png'))
        }
        try {
            price = parseInt(price.replace(/,/g, ''))
            if (discounted) {
                oprice = parseInt(discountCheck[1].replace(/,/g, ''))
            } else { oprice = price }
        } catch (e) {
            oprice = null
        }
        try {
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
        url.searchParams.delete('_appId')
        url.searchParams.delete('_refId')
        url.searchParams.delete('cmpid')
        properURI = url.toString()
        var stock = doesExist(webPage.split('This item is currently out of stock</div>')) || doesExist(webPage.split('Coming Soon</div>'))
        try {
            var highlightsLocator = webPage.split('Highlights')[1].split('</ul>')[0].replace(/<\/li>/g, '').split('<li')
            if (doesExist(highlightsLocator)) {
                for (var i = 1; i < highlightsLocator.length; i++) {
                    try {
                        highlights.push(highlightsLocator[i].split('>')[1])
                    } catch (e) { }
                }
            }
        } catch (e) { highlights = [] }
        var isRated = fAssCheck[0].split('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==')
        if (doesExist(isRated)) {
            var rateDetector = isRated[0].split('">')
            var rating = lastEntry(rateDetector).split('<')[0]
        } else {
            try {
                var rating = webPage.split(`_3LWZlK`)[1].split(`<`)[0].split(`>`)[1].trim()
            } catch (e) { }
        }
        if (price == null || price == undefined || price == NaN || price < 1) {
            price = parseInt(webPage.split(`_30jeq3 _16Jk6d`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
        }
        if (oprice == null || oprice == undefined || oprice == NaN || oprice < 1) {
            oprice = parseInt(webPage.split(`_3I9_wc _2p6lqe`)[1].split(`</div>`)[0].split(`>`)[1].replace(/₹/g, '').replace(/,/g, ''))
        }
        var discount_percent = parseInt(100 * (1 - price / oprice))
        try {
            // final changes
            title = title.replace(/&#x27;/g, `'`).trim()
            properURI = properURI.replace('http://', 'https://')
            stock = !stock
        } catch (e) { }
        if (!minimumResult) {
            var specs = []
            try {
                var specsLocator = webPage.split('Specifications</div>')[1].split('>Safe and Secure Payments.')[0].replace(/&amp;/g, '&').split('</div><table')
            } catch (e) { var specsLocator = [] }
            for (var i = 1; i < specsLocator.length; i++) {
                try {
                    var compactDetails = '';
                    var tableData = [];
                    var headingLocator = specsLocator[i - 1].split('>')
                    var heading = lastEntry(headingLocator)
                    var tableTD = specsLocator[i].split('</td>')
                    var k;
                    for (k = 1; k < tableTD.length; k = k + 2) {
                        try {
                            var td = tableTD[k - 1].split('>')
                            var tdData = lastEntry(td)
                            var tr = tableTD[k].split('</li>')[0].split('>')
                            var trData = lastEntry(tr)
                            if (tdData != null && tdData != "" && trData.split("<").length == 1 && trData != "") {
                                if (!compact) {
                                    tableData.push({
                                        "property": tdData,
                                        "value": trData
                                    })
                                } else {
                                    compactDetails += tdData + ' : ' + trData + '; '
                                }
                            }
                        } catch (e) { }
                    }
                    if (tableData != []) {
                        if (!compact) {
                            specs.push({
                                "title": heading,
                                "details": tableData
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
            "name": title,
            "current_price": price,
            "original_price": oprice,
            "discounted": discounted,
            "discount_percent": discount_percent,
            "rating": rating,
            "in_stock": stock,
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
        if (compact || minimumResult) {
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
            var thumb = locationArray[i].split('</div>')[0].split('background-image:url(')[1].split(')')[0]
            thumbnails.push(thumb)
        } catch (e) { }
    }
    return thumbnails
}
export default product
