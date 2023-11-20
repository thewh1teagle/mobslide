import { useRef, useState, useEffect } from "react";
import Peer, { DataConnection } from "peerjs";
import { PEERJS_OPTIONS } from "./config";

export enum Action {
  VOL_UP,
  VOL_DN,
  PG_UP,
  PG_DN,
  F5,
  ESC,
}
export interface Message {
  action: Action;
}

type Status = "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "INIT" | "READY";

export function usePeer(id?: string, listener?: boolean) {
  const peerRef = useRef<Peer>();
  const connRef = useRef<DataConnection>();
  const addressRef = useRef<null | string>("");
  const checkConnectionIntervalRef = useRef<number | null>(null);
  const connectIntervalRef = useRef<number | null>(null);
const [message, setMessage] = useState<Message | null>()

  const [status, setStatus] = useState<Status>("INIT");


  function onMessage(message: unknown) {
    const data = JSON.parse(message as string) as Message | null;
    setMessage(data)
  }

  function reconnect() {
    if (checkConnectionIntervalRef.current) {
      clearInterval(checkConnectionIntervalRef.current);
    }
    if (connectIntervalRef.current) {
      clearInterval(connectIntervalRef.current);
    }
    // reconnect
    peerRef.current?.destroy();
    connRef.current?.close();
    connRef.current = undefined;
    peerRef.current = undefined;
    setStatus("CONNECTING");
    if (checkConnectionIntervalRef.current) {
      clearInterval(checkConnectionIntervalRef.current);
    }
    connectIntervalRef.current = setInterval(() => connect(), 5000);
  }

  function checkConnection() {
    if (!connRef.current?.peerConnection) {
      // reconnect
      reconnect();
    }
  }

  async function createConnection() {
    setStatus("CONNECTING");
    return new Promise<void>((resolve, reject) => {
      console.log("connecting to ", addressRef.current);
      if (id) {
        peerRef.current = new Peer(id, PEERJS_OPTIONS);
      } else {
        peerRef.current = new Peer(PEERJS_OPTIONS);
      }
      
      peerRef.current.on("open", () => {
        setStatus('READY')
        if (addressRef.current) {
          peerRef?.current?.on("error", (error) => reject(error));
          connRef.current = peerRef.current?.connect(addressRef.current);
          connRef.current?.on("open", () => resolve());
        }
      });
      
    });
  }

  function listen() {
    if (id) {
        peerRef.current = new Peer(id, PEERJS_OPTIONS);
      } else {
        peerRef.current = new Peer(PEERJS_OPTIONS);
      }
      
    peerRef.current?.on("open", () => {
        setStatus('READY')
    });
    peerRef.current.on('connection', conn => {
        setStatus('CONNECTED')
        connRef.current = conn
        connRef.current?.on('data', onMessage)
        connRef.current.on('iceStateChanged', (state) => {
            if (state === 'disconnected' || state === 'closed') {
                peerRef.current?.destroy();
                connRef.current?.close();
                connRef.current = undefined;
                peerRef.current = undefined;
                listen()
                setStatus('DISCONNECTED')
                return
            }
        })
    })
  }

  if (listener) {
    useEffect(() => {
        listen()
    }, [])
  }

  async function connect() {
    try {
      await createConnection();
        connRef.current?.on('data', onMessage)
      connRef.current?.once("iceStateChanged", (state) => {
        if (
          state === "disconnected" ||
          state == "closed" ||
          state == "failed"
        ) {
          reconnect();
        }
      });
      if (connectIntervalRef.current) {
        clearInterval(connectIntervalRef.current!);
      }
      checkConnectionIntervalRef.current = setInterval(checkConnection, 1000);
      setStatus("CONNECTED");
    } catch (e) {
      console.log(e);
    }
  }

  function sendMessage(data: Message) {
    console.log("sending => ", data);
    navigator.vibrate(60);

    connRef.current?.send(JSON.stringify(data));
  }

  function connectWrapper(address: string) {
    addressRef.current = address;
    reconnect();
  }
  return { connectWrapper, sendMessage, status, message };
}

