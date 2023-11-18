// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use enigo::*;
use std::sync::Mutex;
use tauri::State;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
        _ => {}
    }
}


fn main() {
    let controller = Enigo::new();

    tauri::Builder::default()
        .manage(Controller(Mutex::new(controller)))
        .invoke_handler(tauri::generate_handler![press])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
