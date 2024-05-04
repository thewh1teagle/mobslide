import { PeerOptions } from "peerjs";

export const BASE_URL =
  false && import.meta.env.MODE === "development"
    ? "http://localhost:5173/mobslide/"
    : "https://thewh1teagle.github.io/mobslide/";
export const PEERJS_OPTIONS: PeerOptions = {
  host: "mobslide-signaling.fly.dev",
  port: 443,
  path: "/",
  pingInterval: 2000,
  secure: true,
  debug: 3,
};
