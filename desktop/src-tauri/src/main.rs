// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[cfg(any(windows, target_os = "macos"))]
use window_shadows::set_shadow;

use tauri::Manager;
use enigo::*;
use tauri::State;
use tokio::sync::mpsc::UnboundedSender;
use tokio::sync::mpsc;
use tokio;

struct Controller(UnboundedSender<String>);

#[tauri::command]
async fn press(controller: State<'_, Controller>, key: String) -> Result<(), String> {
    controller.0.send(key.to_string()).unwrap_or_default();
    Ok(())
}

#[tokio::main]
async fn main() {
    let mut controller = Enigo::new();
    let (ch_tx, mut ch_rx) = mpsc::unbounded_channel::<String>();

    tokio::spawn(async move {
        // application specific stuff...
        // send commands to ch_tx
        // ch_tx.send(EnigoCommand::KeyClick(Key::Layout('E')));

        while let Some(key) = ch_rx.recv().await {
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
        }
    });

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            
            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .manage(Controller(ch_tx))
        .invoke_handler(tauri::generate_handler![press])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
