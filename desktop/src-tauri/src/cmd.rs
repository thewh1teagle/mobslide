use enigo::{Direction, Enigo, Key, Keyboard, Settings};

#[cfg(target_os = "macos")]
fn osx_adjust_volume(up: bool) {
    use std::process::Command;

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
                log::error!("{:?}", output);
            }
        }
        Err(err) => {
            log::error!("Failed to execute command: {}", err);
        }
    }
}

#[tauri::command]
pub async fn press(key: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    log::debug!("Pressing {}", key);
    match key.as_str() {
        "VOL_UP" => {
            cfg_if::cfg_if! {
                if #[cfg(target_os = "macos")] {
                    osx_adjust_volume(true);
                } else {
                    enigo.key(Key::VolumeUp, Direction::Click).unwrap();
                }
            }
        }
        "VOL_DN" => {
            #[cfg(target_os = "macos")]
            osx_adjust_volume(false);

            #[cfg(not(target_os = "macos"))]
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
