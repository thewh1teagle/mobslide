<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/1286d350-36e9-4c78-b2ef-800aa8f23865" width="130px" height="130px" />

# mobslide


Turn your smartphone into presentation remote controller


<br />

<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/64db10d7-ca7e-45cc-a64b-71ce3fad3fb3" width="400px" height="280px" />

<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/571228a3-8b4a-4270-a5de-0fd71adebf72" width="400px" height="280px" /> 

# Install
1. Simply Download `mobslide` from [releases](https://github.com/thewh1teagle/mobslide/releases) on your PC and start it

# Supported plaforms
Works on MacOS and Windows.

Tauri for linux doesn't support webrtc so currently Linux isn't supported 

# Usage
Scan the QR code with your smartphone and open the link.

<img src="https://github.com/thewh1teagle/mobslide/assets/61390950/4ee89b20-ef0d-488c-925b-92a3b60223a3" width="800px" height="600px" />



# Features
- Scan the QR code. No installation required
- Lightweight app `~2.5M`
- Minimal and effective design
  
## Build
### Prerequisites
- [Rust](https://www.rust-lang.org/tools/install)
- [Node](https://nodejs.org/en/download/current)

### Development
To run in development, 
1. in both desktop and web folders execute `npm install`
2. execute `cargo tauri dev` in desktop folder
3. execute `npm run dev` in web folder

A desktop app will open,
and for the "phone client" a local server will run on localhost:5173

In case you want to try in your phone execute in web folder:
```shell
npm run dev -- --host 0.0.0.0
```

### Building
To build for the current platform, execute `cargo tauri build`. On Windows, this will build both NSIS and MSI installers. Both function identically and are located under `src-tauri/target/release/bundle/<msi or nsis>`.


### Debugging
When developing you can see logging messages by setting ENV variable
```
export RUST_LOG=trace
cargo tauri dev
```

For forther exploring, you can even try setting
```
RUST_BACKTRACE=1
```
