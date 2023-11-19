// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(windows)]
use window_shadows::set_shadow;

use tauri::Manager;
use enigo::*;
use tauri::State;
use tokio::sync::Mutex;


struct Controller(Mutex<Enigo>);

#[tauri::command]
async fn press(controller: State<'_, Controller>, key: &str) -> Result<(), String> {
    let mut controller = (&controller.0).lock().await;
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
    Ok(())
}


fn main() {
    let controller = Enigo::new();

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            
            #[cfg(windows)]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .manage(Controller(Mutex::new(controller)))
        .invoke_handler(tauri::generate_handler![press])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
