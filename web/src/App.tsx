import Peer, { DataConnection } from 'peerjs';
import { useEffect, useState } from 'react';


enum Action {
  VOL_UP,
  VOL_DN
}
interface Message {
  action: Action
}


// 8e25320d-7759-469e-b019-035b48593438
function App() {
  const params = new URLSearchParams(window.location.search);
  
  const [peer, setPeer] = useState(new Peer());
  const [conn, setConn] = useState<DataConnection | null>(null)

  function sendMessage(data: Message) {
    conn?.send(JSON.stringify(data))
  }


  useEffect(() => {
    const address = params.get('id')
    console.log('connecting to ', address)
    peer.on('open', () => {
      const connection = peer.connect(address!)
      setConn(connection)
    })
    
        
  }, [])

  return (
    <>
      <div>connected to {conn?.connectionId}</div>
      <button className='btn' onClick={() => {
        sendMessage({action: Action.VOL_UP})
      }}>+</button>
      <button className='btn' onClick={() => {
        sendMessage({action: Action.VOL_DN})
      }}>-</button>
    </>
  )
}

export default App
