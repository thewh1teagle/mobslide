<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/1286d350-36e9-4c78-b2ef-800aa8f23865" width="130px" height="130px" />

# mobslide


Turn your smartphone into presentation remote controller


<br />

<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/64db10d7-ca7e-45cc-a64b-71ce3fad3fb3" width="400px" height="280px" />

<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/571228a3-8b4a-4270-a5de-0fd71adebf72" width="400px" height="280px" />




# Install
1. Simply Download `mobslide` from [releases](https://github.com/thewh1teagle/mobslide/releases) on your PC and start it

# Usage
Scan the QR code with your smartphone and open the link.

# Keys
- `+` Volume up
- `-` Volume down
- `Arrow Up` Next
- `Arrow Down` Previous
-  `Arrow Up Long Press` Start presentation

-  `Arrow Down Long Press` Stop presentation

# Features
- Scan the QR code. No installation required
- Lightweight app `~2.5M`
- Minimal and effective design
  
## Build
### Prerequisites
- [Rust](https://www.rust-lang.org/tools/install)
- [Node](https://nodejs.org/en/download/current)

### Development
To run in development, execute `cargo tauri dev`.

### Building
To build for the current platform, execute `cargo tauri build`. On Windows, this will build both NSIS and MSI installers. Both function identically and are located under `src-tauri/target/release/bundle/<msi or nsis>`.
