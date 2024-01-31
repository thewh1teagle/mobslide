// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(any(windows, target_os = "macos"))]
use window_shadows::set_shadow;

use enigo::{Direction, Enigo, Key, Keyboard, Settings};
use log::debug;
use tauri::Manager;

cfg_if::cfg_if! {
    if #[cfg(target_os = "macos")] {
        use log::error;
        use std::process::Command;

        fn osx_adjust_volume(up: bool) {
            let operator = if up { "+" } else { "-" };
            let output = Command::new("osascript")
                .args(&[
                    "-e",
                    "set Outputvol to output volume of (get volume settings)",
                    "-e",
                    &format!("set volume output volume (Outputvol {} 6.25)", operator),
                ])
                .output();

            match output {
                Ok(output) => {
                    if !output.status.success() {
                        error!("{:?}", output);
                    }
                }
                Err(err) => {
                    error!("Failed to execute command: {}", err);
                }
            }
        }
    }
}

#[tauri::command]
async fn press(key: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    debug!("Pressing {}", key);
    match key.as_str() {
        "VOL_UP" => {
            enigo.key(Key::VolumeUp, Direction::Click).unwrap();
        }
        "VOL_DN" => {
            enigo.key(Key::VolumeDown, Direction::Click).unwrap();
        }
        "PG_UP" => {
            enigo.key(Key::PageUp, Direction::Click).unwrap();
        }
        "PG_DN" => {
            enigo.key(Key::PageDown, Direction::Click).unwrap();
        }
        "F5" => {
            enigo.key(Key::F5, Direction::Click).unwrap();
        }
        "ESC" => {
            enigo.key(Key::Escape, Direction::Click).unwrap();
        }
        _ => {}
    }
    Ok(())
}

fn main() {
    env_logger::init();
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
