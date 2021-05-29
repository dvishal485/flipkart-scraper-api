const product = async (link) => {
    const uri = encodeURI(link)
    console.log("Product details initiated")
    var webPage = await (await fetch('https://www.flipkart.com/' + uri)).text();
    var rating = null, price = null, properURI = null;
    // To rectify pages with exchange option
    //webPage = webPage.replace(/style="color:#000000;font-size:14px;font-style:normal;font-weight:700">₹/g, '>Rs. ')
    var oprice;
    var title = webPage.split('<h1')[1].split('</span>')[0].split('">')[2].replace(/<!-- -->/g, '').replace(/&nbsp;/g, '');
    var price = webPage.split('<h1')[1].split(">₹")[1].split("</div>")[0]
    var discountCheck = webPage.split('<h1')[1].split(">₹")[2].split("</div>")[0].split('<!-- -->')
    var discounted = discountCheck.length > 1
    var fAssCheck = webPage.split('<h1')[1].split(price)[0].split('fk-cp-zion/img/fa_62673a.png')
    var fassured = fAssCheck.length > 1
    price = parseInt(price.replace(/,/g, ''))
    if (discounted) {
        oprice = parseInt(discountCheck[1].replace(/,/g, ''))
    } else { oprice = price }
    var properURIlocate = webPage.split('product.share.pp')[0].split('"url":"')
    var properURI = properURIlocate[properURIlocate.length - 1] + 'product.share.pp'
    var stock = webPage.split('This item is currently out of stock</div>').length > 1
    var highlightsLocator = webPage.split('Highlights')[1].split('</ul>')[0].replace(/<\/li>/g, '').split('<li')
    var highlights = []
    if (highlightsLocator.length > 1) {
        var i;
        for (i = 1; i < highlightsLocator.length; i++) {
            highlights.push(highlightsLocator[i].split('>')[1])
        }
    }
    console.log("______")
    console.log(highlightsLocator)
    var isRated = fAssCheck[0].split('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==')
    if (isRated.length > 1) {
        var rateDetector = isRated[0].split('">')
        var rating = rateDetector[rateDetector.length - 1].split('<')[0]
    }
    return JSON.stringify({
        "name": title,
        "current_price": price,
        "original_price": oprice,
        "discounted": discounted,
        "discount_percent": parseInt(100 * (1 - price / oprice)),
        "rating": rating,
        "in_stock": !stock,
        "f-assured": fassured,
        "share_url": properURI,
        highlights

    }, null, 2)
}
export default product