import header from './header.js';
import product from '../API/product';
import search from '../API/search';
import property from '../API/property'

export default {
	async fetch(request, env, ctx) {
		console.log(request);
		const hostname = request.headers.get('host');
		const headers = header(request.headers);
		let pathname = new URL(request.url).pathname;
		if (request.method == 'GET') {
			if (pathname.startsWith('/search/')) {
				return new Response(await search(pathname.replace('/search/', ''), request.headers.get("host")), {
					status: 200,
					headers
				})
			} else if (pathname.startsWith('/product/min/')) {
				return new Response(await product(pathname.replace('/product/min/', ''), 'minimum'), {
					status: 200,
					headers
				})
			} else if (pathname.startsWith('/product/compact/')) {
				return new Response(await product(pathname.replace('/product/compact/', ''), 'compact'), {
					status: 200,
					headers
				})
			} else if (pathname.startsWith('/product/')) {
				return new Response(await product(pathname.replace('/product/', ''), 'general'), {
					status: 200,
					headers
				})
			} else if (pathname.startsWith('/property/')) {
				return new Response(await property(pathname.replace('/property/', ''), 'general'), {
					status: 200,
					headers
				})
			} else {
				return new Response(JSON.stringify(
					{
						"name": "flipkart-scraper",
						"description": "API to scrapes search result and product details from Flipkart",
						"version": "3.1.0",
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
					, null, 2), {
					status: 200,
					headers
				})
			}
		}
		return new Response.redirect("https://github.com/dvishal485/flipkart-scraper-api", 301)
	}
};
