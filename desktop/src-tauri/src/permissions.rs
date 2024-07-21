use std::error::Error;

pub fn open_accessibility() {
    use cocoa::base::id;
    use objc::{class, msg_send, sel, sel_impl};

    let url = "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility";
    const UTF8_ENCODING: usize = 4;
    unsafe {
        let ns_string: id = msg_send![class!(NSString), alloc];
        let ns_string: id = msg_send![ns_string,
            initWithBytes: url.as_ptr()
            length: url.len()
            encoding: UTF8_ENCODING];
        let _: () = msg_send![ns_string, autorelease];

        let ns_url: id = msg_send![class!(NSURL), alloc];
        let ns_url: id = msg_send![ns_url, initWithString: ns_string];
        let _: () = msg_send![ns_url, autorelease];

        let shared_workspace: id = msg_send![class!(NSWorkspace), sharedWorkspace];
        let _: bool = msg_send![shared_workspace, openURL: ns_url];
    }
}

pub fn check_accessibility(ask_if_not_allowed: bool) -> Result<bool, Box<dyn Error>> {
    use accessibility_sys::{kAXTrustedCheckOptionPrompt, AXIsProcessTrustedWithOptions};
    use core_foundation_sys::base::{CFRelease, TCFTypeRef};
    use core_foundation_sys::dictionary::{CFDictionaryAddValue, CFDictionaryCreateMutable};
    use core_foundation_sys::number::{kCFBooleanFalse, kCFBooleanTrue};
    use std::ptr;

    let is_allowed;
    unsafe {
        let options = CFDictionaryCreateMutable(ptr::null_mut(), 0, ptr::null(), ptr::null());
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
