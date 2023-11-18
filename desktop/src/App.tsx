import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Peer } from "peerjs";

import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
    
    </div>
  );
}

export default App;
