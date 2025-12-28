import React, { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatWindow from "./features/chat/ChatWindow";

function App() {
  <div>letsConnect</div>
  const [started, setStarted] = useState(false);

  if (!started) {
    return <UsernameForm onSubmit={() => setStarted(true)} />;
  }

  return <ChatWindow />;
} 

export default App;