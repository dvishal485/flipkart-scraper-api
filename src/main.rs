use axum::{
    body::Body,
    extract::{Path, Query},
    http::{Response, StatusCode},
    response::Redirect,
    routing::get,
    Router,
};
use std::collections::HashMap;
mod search;
use flipkart_scraper::Url;
use search::search_product;
mod product;
use axum::response::IntoResponse;
use product::product_details;
use serde_json::{json, Value};

async fn search_router(query: Option<Path<String>>) -> Response<Body> {
    let Path(query) = query.unwrap_or(Path("".to_string()));
    let data = search_product(query).await;
    if let Err(err) = data {
        return Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .header("Content-Type", "application/json")
            .body(Body::from(json!({"error": err.to_string()}).to_string()))
            .unwrap_or_else(|_| Response::new(Body::empty()));
    }

    let data = data.unwrap();
    Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_string(&data).unwrap()))
        .unwrap_or_else(|_| Response::new(Body::empty()))
}

async fn product_router(
    Path(url): Path<String>,
    q: Option<Query<HashMap<String, String>>>,
) -> Response<Body> {
    let url = if let Some(Query(q)) = q {
        Url::parse_with_params(format!("https://www.flipkart.com/{url}").as_str(), q)
    } else {
        Url::parse(format!("https://www.flipkart.com/{url}").as_str())
    };
    if let Err(e) = url {
        return Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .header("Content-Type", "application/json")
            .body(Body::from(json!({"error": e.to_string()}).to_string()))
            .unwrap();
    }
    let url = url.unwrap();
    let data = product_details(url).await;

    if let Err(e) = data {
        return Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .header("Content-Type", "application/json")
            .body(Body::from(json!({"error": e.to_string()}).to_string()))
            .unwrap();
    }

    let data = data.unwrap();
    Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_string(&data).unwrap()))
        .unwrap()
}

#[tokio::main]
async fn main() {
    let description: Value = json!({
        "name": env!("CARGO_PKG_NAME"),
        "description": env!("CARGO_PKG_DESCRIPTION"),
        "version": env!("CARGO_PKG_VERSION"),
        "authors": env!("CARGO_PKG_AUTHORS"),
        "repository": env!("CARGO_PKG_REPOSITORY"),
        "license": env!("CARGO_PKG_LICENSE"),
        "usage": {
            "search_api": concat!(env!("DEPLOYMENT_URL"), "/search/{product_name}"),
            "product_api": concat!(env!("DEPLOYMENT_URL"), "/product/{product_link_argument}"),
        }
    });

    let app = Router::new()
        .route(
            "/",
            get(|| async move {
                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "application/json")
                    .body(Body::from((description).to_string()))
                    .unwrap()
            }),
        )
        .route("/search/*query", get(search_router))
        .route("/search", get(search_router))
        .route("/search/", get(search_router))
        .route("/product/*url", get(product_router))
        .fallback(get(|| async {
            (StatusCode::PERMANENT_REDIRECT, Redirect::permanent("/")).into_response()
        }));

    println!("Starting server on {}", env!("DEPLOYMENT_URL"));
    let listener = tokio::net::TcpListener::bind(env!("DEPLOYMENT_URL"))
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
