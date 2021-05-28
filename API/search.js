const search = async (q) => {
    const urlSearch = 'https://www.flipkart.com/search?marketplace=FLIPKART&q=' + q;
    var webPage = await (await fetch(urlSearch)).text();
    // To rectify pages with exchange option
    webPage = webPage.replace(/style="color:#000000;font-size:14px;font-style:normal;font-weight:700">₹/g, '>Rs. ')
    var products = webPage.split('>₹');
    var i, result = [];
    for (i = 1; i < products.length; i++) {
        try {
            var price = null, oprice = null, link = null, name = null, method = null, discounted = false
            var priceCheck = products[i].split('</div>')[0].replace(/,/g, '');
            price = parseInt(priceCheck);
            if (priceCheck.split('</option>').length == 1) {

                //Method A - Compact screen with about mulltiple columns
                try {
                    var linkGetter = products[i - 1].split('</a>');
                    var lastLinkIndex = linkGetter.length - 2;
                    var linkGetterFront = linkGetter[lastLinkIndex].split('target="_blank"');
                    if (linkGetterFront.length > 1) {
                        link = "https://www.flipkart.com" + linkGetterFront[1].split('href="')[1].split('"')[0];
                        name = linkGetterFront[1].split('href="')[1].split('"')[1].split('>')[1]
                        method = "A"
                    }
                } catch (error) {
                    console.log("Failed to obtain product name and link from Method A : " + error.message)
                }
                oprice = parseInt(price);
                if (i + 1 != products.length) {
                    var nextItem = products[i + 1].split('</div>')[0].replace(/,/g, '').split('<!-- -->')
                    discounted = nextItem.length > 1
                    if (discounted) { i++; oprice = parseInt(nextItem[1]); }
                }
                if (name == "" || name == null) {
                    console.log("executing method B")
                    console.log(price)
                    // Method B - Full product description page
                    try {
                        var linkGetter = products[i - 2].split('<a');
                        console.log(linkGetter)
                        var lastLinkIndex = linkGetter.length - 1;
                        var linkGetterFront = linkGetter[lastLinkIndex].split('target="_blank"');
                        if (linkGetterFront.length > 1) {
                            link = "https://www.flipkart.com" + linkGetterFront[1].split('href="')[1].split('"')[0];
                            name = linkGetterFront[1].split('href="')[1].split('"col col-7-12">')[1].split('</div>')[0].split('>')[1]
                            method = "B"
                        }
                    } catch (e) {
                        console.log("Failed to obtain product name and link from Method A : " + e.message)
                    }
                    if (name == "" || name == null) {
                        console.log("unimplemented")
                    } else {
                        result.push({
                            "name": name,
                            "link": link,
                            "current_price": price,
                            "original_price": oprice,
                            "discounted": discounted,
                            "fetch_method": method
                        })
                    }
                } else {
                    result.push({
                        "name": name,
                        "link": link,
                        "current_price": price,
                        "original_price": oprice,
                        "discounted": discounted,
                        "fetch_method": method
                    })
                }

            } else {
                console.log("Ignoring amount " + price + " : Suspected to be dropdown menu item")
            };
        } catch (e) {
            console.log(e.message);
        }
    }

    return JSON.stringify({
        result
    }, null, 2)

}


export default search