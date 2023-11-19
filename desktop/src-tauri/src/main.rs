// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[cfg(any(windows, target_os = "macos"))]
use window_shadows::set_shadow;

use tauri::Manager;
use enigo::*;

#[tauri::command]
async fn press(key: String) -> Result<(), String> {
    let mut controller = Enigo::new();
    match key.as_str() {
        "VOL_UP" => {
            controller.key_down(Key::VolumeUp);
        },
        "VOL_DN" => {
            controller.key_down(Key::VolumeDown);
        },
        "PG_UP" => {
            controller.key_down(Key::PageUp);
        },
        "PG_DN" => {
            controller.key_down(Key::PageDown);
        },
        "F5" => {
            controller.key_down(Key::F5);
        },
        "ESC" => {
            controller.key_down(Key::Escape);
        }
        _ => {}
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        
        #[cfg(any(windows, target_os = "macos"))]
        set_shadow(&window, true).unwrap();

        Ok(())
    })
    .invoke_handler(tauri::generate_handler![press])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
