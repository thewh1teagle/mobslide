// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmd;
mod logging;

#[cfg(target_os = "linux")]
mod linux_webrtc;

#[cfg(target_os = "macos")]
mod permissions;

fn main() {
    logging::setup_logging();
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|_app| {
            #[cfg(target_os = "linux")]
            linux_webrtc::enable_webrtc(_app.app_handle());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmd::press,
            cmd::package_info,
            #[cfg(target_os = "macos")]
            cmd::check_accessibility_permission,
            #[cfg(target_os = "macos")]
            cmd::open_accessibility_permission,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
