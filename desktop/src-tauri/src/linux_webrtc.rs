use tauri::Manager;
use webkit2gtk::{SettingsExt, WebViewExt};

fn enable_web_features(settings: &webkit2gtk::Settings) {
    settings.set_enable_webrtc(true);
    settings.set_enable_media_stream(true);
    settings.set_enable_mediasource(true);
    settings.set_enable_media(true);
    settings.set_enable_media_capabilities(true);
    settings.set_enable_encrypted_media(true);
    // settings.set_enable_mock_capture_devices(true);
    settings.set_media_playback_requires_user_gesture(false);
    settings.set_media_playback_allows_inline(true);
    settings.set_media_content_types_requiring_hardware_support(None);
    // settings.set_disable_web_security(true);
}

fn allow_all_permissions(webview: &webkit2gtk::WebView) {
    use webkit2gtk::PermissionRequestExt;
    // Allow all permission requests for debugging
    let _ = webview.connect_permission_request(move |_, request| {
        request.allow();
        true
    });
}

pub fn enable_webrtc(app: &tauri::AppHandle) {
    app.webview_windows().values().for_each(|webview_window| {
        if let Err(e) = webview_window.with_webview(|webview| {
            if let Some(settings) = webview.inner().settings() {
                allow_all_permissions(&webview.inner());
                enable_web_features(&settings);
            }
        }) {
            log::error!("Error configuring webview: {:?}", e);
        }
    });
}
