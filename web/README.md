# web

The mobslide website. One Vite app, two pages:

| path | source | what it is |
| --- | --- | --- |
| `/mobslide/` | `src/landing` | landing page |
| `/mobslide/remote/` | `src/remote` | the phone remote the desktop app's QR code points to |

Desktop builds released before the remote moved to `/remote/` open the site root
with an `?id=` param; `src/landing/main.tsx` redirects those to the remote.

```sh
bun install
bun run dev     # landing at /mobslide/, remote at /mobslide/remote/?id=<peer id>
bun run build
```

Deployed to GitHub Pages by `.github/workflows/web.yaml`.
