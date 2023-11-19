import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";

enum Action {
  VOL_UP,
  VOL_DN,
  PG_UP,
  PG_DN,
}
interface Message {
  action: Action;
}

// 8e25320d-7759-469e-b019-035b48593438
function App() {
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peer] = useState(new Peer({ pingInterval: 1000 }));
  const [conn, setConn] = useState<DataConnection | null>(null);

  function sendMessage(data: Message) {
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
        <div className="flex gap-3 items-center mt-52">
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
            onClick={() => sendMessage({ action: Action.PG_UP })}
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
            onClick={() => sendMessage({ action: Action.PG_DN })}
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
