import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import NoSleep from "nosleep.js";
import { v4 as uuidv4 } from 'uuid';
import { useLongPress } from 'use-long-press';
const noSleep = new NoSleep();


enum Action {
  VOL_UP,
  VOL_DN,
  PG_UP,
  PG_DN,
  F5
}
interface Message {
  action: Action;
}



function App() {


  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);
  const [id,] = useState(uuidv4())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peer] = useState(new Peer(id, { pingInterval: 1000 }));
  const [conn, setConn] = useState<DataConnection | null>(null);

  function sendMessage(data: Message) {
    navigator.vibrate(300)
    if (!noSleep.isEnabled) {
      console.log('No sleep enabled')
      noSleep.enable()
    }
    conn?.send(JSON.stringify(data));
  }

  useEffect(() => {
    const address = params.get("id");
    console.log("connecting to ", address);
    peer.on("open", () => {
      const connection = peer.connect(address!);
      setLoading(false);
      setConn(connection);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextButtonBind = useLongPress(() => {
    sendMessage({ action: Action.F5 })
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
