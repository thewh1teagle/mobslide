import {PeerOptions} from 'peerjs'

export const PEERJS_OPTIONS: PeerOptions = {
    host: 'mobslide-signaling.fly.dev',
    port: 443,
    path: '/',
    pingInterval: 2000,
    secure: true,
    debug: 3
}