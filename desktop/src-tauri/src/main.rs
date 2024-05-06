// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod cmd;

#[cfg(target_os = "linux")]
mod linux_webrtc;

fn main() {
    env_logger::init();
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|_app| {
            #[cfg(target_os = "linux")]
            linux_webrtc::enable_webrtc(_app.app_handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![cmd::press, cmd::package_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
