import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { DataConnection, Peer } from "peerjs";
import QRCodeStyling from "qr-code-styling";
import { createQR } from "./qr";
import { BASE_URL } from "./config";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

enum Action {
  VOL_UP,
  VOL_DN
}
interface Message {
  action: Action
}

function App() {
  const [peer, setPeer] = useState(new Peer());
  const [id, setId] = useState('')
  const [conn, setConn] = useState<DataConnection | null>(null)
  const [name, setName] = useState("");
  const qrDiv = useRef<any>()


    function onMessage(message: unknown) {
      const data = JSON.parse(message as string) as Message
      switch (data.action) {
        case Action.VOL_UP: {
          invoke('press', {key: 'VOL_UP'})
          break;
        }
        case Action.VOL_DN: {
          invoke('press', {key: 'VOL_DN'})
          break;
        }
      }
    }
  
    useEffect(() => {
      conn?.on('data', onMessage)
    }, [conn])
    


  function onConnect(connection: DataConnection) {
    
    setConn(connection)
  }


  useEffect(() => {
    peer.on('open', id => {
      setId(id)
      console.log('creating qr')
      const qr = createQR(`${BASE_URL}?id=${id}`)
      qr.append(qrDiv.current)
    })
    peer.on('connection', onConnect)
  }, [])

  

  return (
    <div className="container">
      <div>address is {id}</div>
      <div>connection is from {conn?.connectionId}</div>
      <div ref={qrDiv} />
    </div>
  );
}

export default App;
