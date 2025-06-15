use axum::Router;
use tower_http::services::{ServeDir, ServeFile};

async fn tcp_listener() -> tokio::net::TcpListener {
    let port = match std::env::var_os("STRT_PORT") {
        Some(p) => p.into_string().unwrap(),
        None => "8080".to_string(),
    };
    let host = format!("0.0.0.0:{port}");
    tokio::net::TcpListener::bind(host).await.unwrap()
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let app = Router::new()
        .nest_service("/static", ServeDir::new("static"))
        .fallback_service(ServeFile::new("static/index.html"));

    let listener = tcp_listener().await;
    println!("Starting server at {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
