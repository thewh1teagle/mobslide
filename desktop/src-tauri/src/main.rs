// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use window_shadows::set_shadow;
use tauri::Manager;
use enigo::*;
use std::sync::Mutex;
use tauri::State;


struct Controller(Mutex<Enigo>);

#[tauri::command]
fn press(controller: State<'_, Controller>, key: &str) {
    let mut controller = (&controller.0).lock().unwrap();
    match key {
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
}


fn main() {
    let controller = Enigo::new();

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            
            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .manage(Controller(Mutex::new(controller)))
        .invoke_handler(tauri::generate_handler![press])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
