use axum::{
    body::Body,
    extract::{Path, Query},
    http::Error,
    http::{Response, StatusCode},
    response::Redirect,
    routing::get,
    Router, ServiceExt,
};
use serde::Serialize;
use std::collections::HashMap;
mod search;
use flipkart_scraper::{search::SearchParams, Url};
use search::search_product;
mod product;
use axum::response::IntoResponse;
use product::product_details;
use serde_json::{json, Value};

#[derive(Debug, Serialize)]
pub struct ApiError {
    error_message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    more_details: Option<String>,
}

fn default_error_response(e: Error) -> Response<Body> {
    let err = ApiError {
        error_message: "Internal Server Error".to_string(),
        more_details: Some(format!("There was some internal server error, make sure you are calling the API correctly. {e}. Report any issues at https://github.com/dvishal485/flipkart-scraper-api")),
    };

    Response::builder()
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .header("Content-Type", "application/json")
        .body(Body::from(json!({"error": err}).to_string()))
        .unwrap_or_default()
}

async fn search_router(
    query: Option<Path<String>>,
    params_result: Result<Query<SearchParams>, axum::extract::rejection::QueryRejection>,
) -> Response<Body> {
    match params_result {
        Ok(Query(params)) => {
            let query = query.map(|q| q.to_string()).unwrap_or_default();
            let data = search_product(query, params).await;

            match data {
                Ok(data) => Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "application/json")
                    .body(Body::from(serde_json::to_string(&data).unwrap())),
                Err(err) => Response::builder()
                    .status(StatusCode::BAD_GATEWAY)
                    .header("Content-Type", "application/json")
                    .body(Body::from(json!({"error": err}).to_string())),
            }
        }
        Err(err) => Response::builder()
            .status(StatusCode::BAD_REQUEST)
            .header("Content-Type", "application/json")
            .body(Body::from(
                serde_json::json!(ApiError {
                    error_message: "Invalid query parameters".to_string(),
                    more_details: Some(err.to_string()),
                })
                .to_string(),
            )),
    }
    .unwrap_or_else(|e| default_error_response(e))
}

async fn product_router(
    Path(url): Path<String>,
    Query(query_params): Query<HashMap<String, String>>,
) -> Response<Body> {
    let url = Url::parse_with_params(
        format!("https://www.flipkart.com/{url}").as_str(),
        query_params,
    );

    match url {
        Ok(url) => {
            let data = product_details(url).await;

            match data {
                Err(e) => Response::builder()
                    .status(StatusCode::BAD_GATEWAY)
                    .header("Content-Type", "application/json")
                    .body(Body::from(json!({"error": e}).to_string())),
                Ok(data) => Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "application/json")
                    .body(Body::from(serde_json::to_string(&data).unwrap())),
            }
        }
        Err(e) => Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .header("Content-Type", "application/json")
            .body(Body::from(json!({"error": e.to_string()}).to_string())),
    }
    .unwrap_or_else(|e| default_error_response(e))
}

const DEFAULT_DEPLOYMENT_URL: &str = "localhost:3000";

#[tokio::main]
async fn main() {
    let deploy_url =
        std::env::var("DEPLOYMENT_URL").unwrap_or_else(|_| DEFAULT_DEPLOYMENT_URL.to_string());

    let description: Value = json!({
        "name": env!("CARGO_PKG_NAME"),
        "description": env!("CARGO_PKG_DESCRIPTION"),
        "version": env!("CARGO_PKG_VERSION"),
        "authors": env!("CARGO_PKG_AUTHORS"),
        "repository": env!("CARGO_PKG_REPOSITORY"),
        "license": env!("CARGO_PKG_LICENSE"),
        "usage": {
            "search_api": format!("{deploy_url}/search/{{product_name}}"),
            "product_api": format!("{deploy_url}/product/{{product_link_argument}}"),
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
        .route("/search/{*query}", get(search_router))
        .route("/search", get(search_router))
        .route("/search/", get(search_router))
        .route("/product/{*url}", get(product_router))
        .fallback(get(|| async {
            (StatusCode::PERMANENT_REDIRECT, Redirect::permanent("/")).into_response()
        }));

    println!("Starting server on {}", deploy_url);

    let listener = tokio::net::TcpListener::bind(deploy_url).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
