import { invoke } from "@tauri-apps/api/tauri";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import successSvg from "./assets/success.svg";
import { BASE_URL } from "./config";
import { createQR } from "./qr";
import { Action, usePeer } from "./usePeer";


function App() {
  const [id, ] = useLocalStorage('id', uuidv4())
  console.log('localstorage id => ', id)
  const {message, status} = usePeer(id, true)
  const qrDiv = useRef<HTMLDivElement>(null);
 

  async function renderQR() {
    const url = `${BASE_URL}?id=${id}`;
    if (qrDiv.current) {
      qrDiv.current.innerHTML = "";
    }
    const newQR = createQR(url);
    
    const element = await newQR._getElement();
    if (element) {
      qrDiv.current?.appendChild(element);
    }
  }

  useEffect(() => {
    console.log('status => ', status)
    if (status === 'READY') {
      console.log("creating qr");
      const url = `${BASE_URL}?id=${id}`;
      console.log("url => ", url);
     renderQR() 
    }
  }, [status])

  useEffect(() => {
    if (message) {
      invoke("press", { key: Action[message.action].toString() });
    }
  }, [message])


  function copyURL() {
    const url = `${BASE_URL}?id=${id}`;
    navigator.clipboard.writeText(url);
  }

  if (status === 'CONNECTED') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[100vh]">
        <span className="text-3xl mb-5">CONNECTED</span>
        <img alt="" src={successSvg} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center">
      <span className="text-3xl mb-5">Ready to connect</span>
      <div ref={qrDiv} />
      {status === 'INIT' && (
        <div className="flex items-center justify-center w-[300px] h-[300px] rounded-xl bg-transparent shadow-xl">
          <span className="loading loading-spinner loading-lg p-0"></span>
        </div>
      )}
      <button className="btn mt-5" onClick={copyURL}>
        <svg
          stroke="currentColor"
          className="w-5 h-5"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="336"
            height="336"
            x="128"
            y="128"
            fill="none"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="57"
            ry="57"
          ></rect>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
          ></path>
        </svg>
        COPY URL
      </button>
    </div>
  );
}

export default App;
