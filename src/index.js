/* Copyright 2023 Vishal Das

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
*/

import header from './header.js';
import product from '../API/product.js';
import search from '../API/search.js';
import property from '../API/property.js'

const metadata = (hostname) => {
    return {
        "name": "flipkart-scraper-api",
        "description": "API to scrapes search result and product details from Flipkart",
        "version": "3.1.2",
        "author": "Vishal Das",
        "email": "dvishal485@gmail.com",
        "documentation": "https://dvishal485.github.io/flipkart-scraper-api/",
        "usage": {
            "search_api": `https://${hostname}/search/<product_name>`,
            "product_api": `https://${hostname}/product/<product_link_argument>`,
            "product_min_api": `https://${hostname}/product/min/<product_link_argument>`,
            "product_compact_api": `https://${hostname}/product/compact/<product_link_argument>`,
            "product_search_specs": `https://${hostname}/property/<specs_to_search>/<product_link_argument>`
        },
        "examples": {
            "search_api": `https://${hostname}/search/smartwatch`,
            "product_api": `https://${hostname}/product/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ`,
            "product_min_api": `https://${hostname}/product/min/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ`,
            "product_compact_api": `https://${hostname}/product/compact/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ`,
            "product_search_specs": `https://${hostname}/property/battery&display/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ`
        }
    }
};

async function handle_request(request) {
    const hostname = request.headers.get('host');
    let pathname = new URL(request.url).pathname;
    if (request.method == 'GET') {
        if (pathname.startsWith('/search/')) {
            return await search(pathname.replace('/search/', ''), hostname)
        } else if (pathname.startsWith('/product/min/')) {
            return await product(pathname.replace('/product/min/', ''), 'minimum');
        } else if (pathname.startsWith('/product/compact/')) {
            return await product(pathname.replace('/product/compact/', ''), 'compact')
        } else if (pathname.startsWith('/product/')) {
            return await product(pathname.replace('/product/', ''), 'general')
        } else if (pathname.startsWith('/property/')) {
            return await property(pathname.replace('/property/', ''), 'general')
        } else {
            return metadata(hostname);
        }
    }
}

export default {
    fetch: async function(request, _env, _ctx) {
        const headers = header(request.headers);
        if (request.method != "GET") {
            return new Response(JSON.stringify({
                "error": "Method not allowed"
            }), {
                status: 405,
                headers
            });
        }
        let resp = await handle_request(request);
        return new Response(JSON.stringify(resp),
            { status: 200, headers }
        );
    },
    handler: handle_request,
    metadata
};
