use axum::Router;
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let app = Router::new()
        .nest_service("/static", ServeDir::new("static"))
        .fallback_service(ServeFile::new("static/index.html"));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:9999").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
