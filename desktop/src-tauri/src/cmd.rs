use enigo::{Direction, Enigo, Key, Keyboard, Settings};
use serde_json::Value;

#[tauri::command]
pub async fn press(key: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    log::debug!("Pressing {}", key);
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

#[tauri::command]
pub async fn package_info() -> Result<Value, String> {
    let info =
        serde_json::json!({"semver": env!("CARGO_PKG_VERSION"), "commit": env!("COMMIT_HASH")});
    Ok(info)
}

#[cfg(target_os = "macos")]
#[tauri::command]
pub fn check_accessibility_permission(show_prompt: bool) -> Result<bool, String> {
    use crate::permissions;
    log::debug!("show_prompt: {}", show_prompt);
    permissions::check_accessibility(show_prompt).map_err(|e| e.to_string())
}
