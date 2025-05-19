use std::error::Error;

use flipkart_scraper::{product_details::*, Url};
use serde::Serialize;

use crate::ApiError;

pub async fn product_details(url: Url) -> Result<ProductDetailsResponse, ApiError> {
    let result = ProductDetails::fetch(url).await.map_err(|e| ApiError {
        error_message: e.to_string(),
        more_details: e.source().map(|source| source.to_string()),
    })?;

    let ProductDetails {
        name,
        current_price,
        original_price,
        in_stock,
        product_id,
        share_url,
        rating,
        f_assured,
        highlights,
        seller,
        thumbnails,
        offers,
        specifications,
    } = result;

    Ok(ProductDetailsResponse {
        name,
        current_price,
        original_price,
        discounted: current_price.map_or(false, |c| original_price.map_or(false, |o| c < o)),
        discount_percent: current_price.and_then(|c| original_price.map(|o| ((o - c) * 100) / o)),
        rating,
        in_stock,
        f_assured,
        share_url,
        seller: seller.map(|s| SellerResponse {
            seller_name: s.name,
            seller_rating: s.rating,
        }),
        thumbnails,
        highlights,
        offers: offers
            .into_iter()
            .map(|o| OfferResponse {
                offer_type: o.category,
                description: o.description,
            })
            .collect(),
        product_id,
        specs: specifications
            .into_iter()
            .map(|s| SpecsResponse {
                title: s.category,
                details: s
                    .specifications
                    .into_iter()
                    .map(|d| SpecResponse {
                        property: d.name,
                        value: d.value,
                    })
                    .collect(),
            })
            .collect(),
    })
}

#[derive(Serialize)]
pub struct SellerResponse {
    seller_name: String,
    seller_rating: Option<f32>,
}

#[derive(Serialize)]
pub struct OfferResponse {
    offer_type: Option<String>,
    description: String,
}

#[derive(Serialize)]
pub struct SpecsResponse {
    title: String,
    details: Vec<SpecResponse>,
}

#[derive(Serialize)]
pub struct SpecResponse {
    property: String,
    value: String,
}

#[derive(Serialize)]
pub struct ProductDetailsResponse {
    name: Option<String>,
    current_price: Option<i32>,
    original_price: Option<i32>,
    discounted: bool,
    discount_percent: Option<i32>,
    rating: Option<f32>,
    in_stock: bool,
    f_assured: bool,
    share_url: String,
    seller: Option<SellerResponse>,
    thumbnails: Vec<String>,
    highlights: Vec<String>,
    product_id: Option<String>,
    offers: Vec<OfferResponse>,
    specs: Vec<SpecsResponse>,
}
