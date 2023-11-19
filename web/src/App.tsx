import NoSleep from "nosleep.js";
import { useEffect, useRef, useState } from "react";
import { useLongPress } from "use-long-press";

import Peer, { DataConnection } from "peerjs";

const noSleep = new NoSleep();
enum Action {
  VOL_UP,
  VOL_DN,
  PG_UP,
  PG_DN,
  F5,
  ESC,
}
interface Message {
  action: Action;
}

function App() {
  const params = new URLSearchParams(window.location.search);

  const peerRef = useRef<Peer>();
  const connRef = useRef<DataConnection>();
  const addressRef = useRef<null | string>("");
  const checkConnectionIntervalRef = useRef<number | null>(null);
  const connectIntervalRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  function sendMessage(data: Message) {
    console.log("sending => ", data);
    navigator.vibrate(60);
    if (!noSleep.isEnabled) {
      console.log("No sleep enabled");
      noSleep.enable();
    }

    connRef.current?.send(JSON.stringify(data));
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
    setLoading(true);
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
    return new Promise<void>((resolve, reject) => {
      console.log("connecting to ", addressRef.current);
      peerRef.current = new Peer({
        host: "0.peerjs.com",
        debug: 3,
        pingInterval: 2000,
      });
      peerRef.current.on("open", () => {
        if (addressRef.current) {
          peerRef?.current?.on("error", (error) => reject(error));
          connRef.current = peerRef.current?.connect(addressRef.current);
          connRef.current?.on("open", () => resolve());
        }
      });
    });
  }

  async function connect() {
    try {
      await createConnection();

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
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "VolumeDown": {
          sendMessage({ action: Action.PG_UP }); // previous
          break;
        }
        case "VolumeUp": {
          sendMessage({ action: Action.PG_DN }); // next
          break;
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    async function init() {
      addressRef.current = params.get("id");
      if (!addressRef.current) {
        alert("Wrong address, please scan again.");
        return;
      }
      await reconnect();
    }
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextButtonBind = useLongPress(() => {
    sendMessage({ action: Action.F5 });
  });

  const prevButtonBind = useLongPress(() => {
    sendMessage({ action: Action.ESC });
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-5 w-[100vw] h-[100vh] items-center justify-center">
        <span className="text-lg font-bold">CONNECTING</span>
        <span className="loading loading-spinner w-[80px]"></span>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="flex flex-col gap-1 items-center h-full">
        <div className="flex gap-3 items-center mt-20">
          <button
            className="btn btn-circle w-[100px] h-[100px]"
            onClick={() => sendMessage({ action: Action.VOL_UP })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button
            className="btn btn-circle w-[80px] h-[80px]"
            onClick={() => sendMessage({ action: Action.VOL_DN })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-auto items-center mb-[35%]">
          <button
            {...nextButtonBind()}
            onClick={() => sendMessage({ action: Action.PG_DN })} // next
            className="btn btn-circle w-[150px] h-[150px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
          <button
            {...prevButtonBind()}
            onClick={() => sendMessage({ action: Action.PG_UP })} // prev
            className="btn btn-circle w-[80px] h-[80px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
