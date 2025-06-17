use axum::{routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use tokio::process::Command;
use tower_http::services::{ServeDir, ServeFile};

#[derive(Deserialize, Serialize)]
struct Task {
    uuid: String,
    description: String,
    urgency: f32,
    project: Option<String>,
    priority: Option<String>,
}

async fn tasklist() -> Result<Json<Vec<Task>>, String> {
    let proc = Command::new("scripts/top_tasks").output();
    let tasks = match proc.await {
        Ok(output) => output,
        Err(err) => return Err(format!("Failed to run task process: {err}")),
    };

    if tasks.status.success() {
        let data = tasks.stdout;
        let tasks: Vec<Task> = match serde_json::from_slice(data.as_slice()) {
            Ok(tasks) => tasks,
            Err(err) => return Err(format!("Failed to parse task results: {err}")),
        };
        Ok(Json::from(tasks))
    } else {
        let data = tasks.stderr;
        let err = String::from_utf8_lossy(data.as_slice());
        Err(format!("Failed to fetch tasks: {err}"))
    }
}

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
        .route("/tasks", get(tasklist))
        .nest_service("/static", ServeDir::new("static"))
        .fallback_service(ServeFile::new("static/index.html"));

    let listener = tcp_listener().await;
    println!("Starting server at {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
