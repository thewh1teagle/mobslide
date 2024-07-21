use tracing_subscriber::{layer::SubscriberExt, EnvFilter, Layer, Registry};

pub fn setup_logging() {
    let sub = Registry::default().with(
        tracing_subscriber::fmt::layer()
            .with_ansi(true)
            .with_filter(EnvFilter::from_default_env()),
    );
    tracing::subscriber::set_global_default(sub).unwrap();
}
