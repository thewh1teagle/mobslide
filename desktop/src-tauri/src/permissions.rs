use accessibility_sys::{kAXTrustedCheckOptionPrompt, AXIsProcessTrustedWithOptions};
use core_foundation_sys::base::{CFRelease, TCFTypeRef};
use core_foundation_sys::dictionary::{CFDictionaryAddValue, CFDictionaryCreateMutable};
use core_foundation_sys::number::{kCFBooleanFalse, kCFBooleanTrue};
use std::{error::Error, ptr};

pub fn check_accessibility(ask_if_not_allowed: bool) -> Result<bool, Box<dyn Error>> {
    let is_allowed;
    unsafe {
        let options =
            CFDictionaryCreateMutable(ptr::null_mut(), 0, std::ptr::null(), std::ptr::null());
        let key = kAXTrustedCheckOptionPrompt;
        let value = if ask_if_not_allowed {
            kCFBooleanTrue
        } else {
            kCFBooleanFalse
        };
        if !options.is_null() {
            CFDictionaryAddValue(options, key.as_void_ptr(), value.as_void_ptr());
            is_allowed = AXIsProcessTrustedWithOptions(options);
            CFRelease(options as *const _);
        } else {
            return Err("options is null".into());
        }
    }
    Ok(is_allowed)
}
