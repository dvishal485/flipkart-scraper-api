use std::error::Error;

use flipkart_scraper::{search::SearchParams, ProductSearch};
use serde::Serialize;

use crate::{ApiError, DEFAULT_DEPLOYMENT_URL};

pub async fn search_product(
    query: String,
    params: SearchParams,
) -> Result<SearchResultResponse, ApiError> {
    let search = ProductSearch::search(query, params).await;
    if let Err(e) = search {
        return Err(ApiError {
            error_message: e.to_string(),
            more_details: e.source().map(|source| source.to_string()),
        });
    }

    let ProductSearch {
        query,
        query_params,
        query_url,
        results,
    } = search.unwrap();

    let search_result = SearchResultResponse {
        total_result: results.len(),
        query,
        query_params,
        fetch_from: query_url,
        result: results
            .into_iter()
            .map(|p| {
                let discounted = p
                    .current_price
                    .map_or(false, |c| p.original_price.map_or(false, |o| c < o));

                let query_url = p
                    .product_link
                    .strip_prefix("https://")
                    .unwrap_or(p.product_link.as_str());
                let query_url = query_url.strip_prefix("http://").unwrap_or(query_url);
                let query_url = query_url
                    .strip_prefix("dl.flipkart.com")
                    .unwrap_or(query_url);
                let query_url = query_url.strip_prefix("flipkart.com").unwrap_or(query_url);
                let query_url = query_url
                    .split_once("?")
                    .map(|(link, _)| link)
                    .unwrap_or(query_url);

                let link = p
                    .product_link
                    .split_once("&q=")
                    .map(|(link, _)| link)
                    .unwrap_or(&p.product_link)
                    .to_string();

                SearchResultProduct {
                    name: p.product_name,
                    link,
                    current_price: p.current_price,
                    original_price: p.original_price,
                    discounted,
                    thumbnail: p.thumbnail,
                    query_url: format!(
                        "{host}/product{query}",
                        host = std::env::var("DEPLOYMENT_URL")
                            .unwrap_or_else(|_| DEFAULT_DEPLOYMENT_URL.to_string()),
                        query = query_url
                    ),
                }
            })
            .collect(),
    };

    Ok(search_result)
}

#[derive(Serialize)]
pub struct SearchResultProduct {
    name: String,
    link: String,
    current_price: Option<i32>,
    original_price: Option<i32>,
    discounted: bool,
    thumbnail: String,
    query_url: String,
}

#[derive(Serialize)]
pub struct SearchResultResponse {
    total_result: usize,
    query: String,
    query_params: SearchParams,
    fetch_from: String,
    result: Vec<SearchResultProduct>,
}
