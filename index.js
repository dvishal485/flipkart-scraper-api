import product from './API/product';
import search from './API/search';
import header from './header';

async function handleRequest(request) {
    const headers = header(request.headers)
    const path = new URL(request.url).pathname;

    if (request.method == 'GET') {
        if (path.startsWith('/search/')) {
            return new Response(await search(path.replace('/search/', '')), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/min/')) {
            return new Response(await product(path.replace('/product/min/', ''), 'minimum'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/compact/')) {
            return new Response(await product(path.replace('/product/compact/', ''), 'compact'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/')) {
            return new Response(await product(path.replace('/product/', ''), 'general'), {
                status: 200,
                headers
            })
        } else {
            return new Response(JSON.stringify(
                [{
                    "name": "flipkart-scraper",
                    "description": "API to scrapes search result and product details from flipkart",
                    "author": "Vishal Das",
                    "email": "dvishal485@gmail.com",
                    "telegram": "@dvishal485",
                    "documentation": "https://dvishal485.github.io/flipkart-scraper-api/",
                    "examples": {
                        "search_api": "https://flipkart.dvishal485.workers.dev/search/<product_name>",
                        "product_api": "https://flipkart.dvishal485.workers.dev/product/<product_link_argument>",
                        "product_min_api": "https://flipkart.dvishal485.workers.dev/product/min/<product_link_argument>",
                        "product_compact_api": "https://flipkart.dvishal485.workers.dev/product/compact/<product_link_argument>"
                    }
                }]
                , null, 2), {
                status: 200,
                headers
            })
        }
    } else {
        return Response.redirect("https://github.com/dvishal485/flipkart-scraper/", 301)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
