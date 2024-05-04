# Build

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node](https://nodejs.org/en/download/current)
- [tauri.app/start/prerequisites/](https://beta.tauri.app/start/prerequisites/)
- [Enigo#runtime-dependencies](https://github.com/enigo-rs/enigo?tab=readme-ov-file#runtime-dependencies)

### Development

To run in development,

1. in both desktop and web folders execute `npm install`
2. execute `npx tauri dev` in desktop folder
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
npx tauri dev
```

For forther exploring, you can even try setting

```
RUST_BACKTRACE=1
```
