const search = async (q) => {
    const urlSearch = 'https://www.flipkart.com/search?marketplace=FLIPKART&q=' + q;
    const webPage = await (await fetch(urlSearch)).text();
    var products = webPage.split('>₹');
    var i, result = [];
    for (i = 1; i < products.length; i++) {
        try {
            var price, oprice
            var priceCheck = products[i].split('</div>')[0].replace(/,/g, '');
            price = parseInt(priceCheck);
            if (priceCheck.split('</option>').length == 1) {
                oprice = parseInt(price);
                if (i + 1 != products.length) {
                    var nextItem = products[i + 1].split('</div>')[0].replace(/,/g, '').split('<!-- -->')
                    var discounted = nextItem.length > 1
                    if (discounted) { i++; oprice = parseInt(nextItem[1]); }
                }
                result.push({
                    "current_price": price,
                    "discounted": discounted,
                    "original_price": oprice
                })
            } else {
                console.log("Ignoring amount " + price + " : Suspected to be dropdown menu item")
            };
        } catch (e) {
            console.log(e);
        }
    }

    return JSON.stringify({
        total_result: result.length,
        result
    }, null, 2)

}


export default search