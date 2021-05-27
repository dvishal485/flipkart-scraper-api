const search = async (q) => {
    const urlSearch = 'https://www.flipkart.com/search?marketplace=FLIPKART&q=' + q;
    const webPage = await (await fetch(urlSearch)).text();
    var products = webPage.split('>₹');
    var i, result = [];
    for (i = 1; i < products.length; i++) {
        try {
            var price, oprice, link, name
            var priceCheck = products[i].split('</div>')[0].replace(/,/g, '');
            price = parseInt(priceCheck);
            if (priceCheck.split('</option>').length == 1) {

                //Method A - Compact screen with about mulltiple columns
                try {
                    var linkGetter = products[i - 1].split('</a>');
                    var lastLinkIndex = linkGetter.length - 2;
                    var linkGetterFront = linkGetter[lastLinkIndex].split('target="_blank"');
                    if (linkGetterFront.length > 1) {
                        link = "https://www.flipkart.com/" + linkGetterFront[1].split('href="')[1].split('"')[0];
                        name = linkGetterFront[1].split('href="')[1].split('"')[1].split('>')[1]
                    }
                } catch (error) {
                    console.log("Failed to obtain product name and link from Method A")
                    console.log(error.message)
                }
                oprice = parseInt(price);
                if (i + 1 != products.length) {
                    var nextItem = products[i + 1].split('</div>')[0].replace(/,/g, '').split('<!-- -->')
                    var discounted = nextItem.length > 1
                    if (discounted) { i++; oprice = parseInt(nextItem[1]); }
                }
                result.push({
                    "name": name,
                    "link": link,
                    "current_price": price,
                    "original_price": oprice,
                    "discounted": discounted
                })
            } else {
                console.log("Ignoring amount " + price + " : Suspected to be dropdown menu item")
            };
        } catch (e) {
            console.log(e.message);
        }
    }

    return JSON.stringify({
        total_result: result.length,
        result
    }, null, 2)

}


export default search