import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "./chatSlice";
import Message from "./Message";

export default function ChatWindow() {
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.chat.user);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text) return;

    dispatch(
      sendMessage({
        id: Date.now(),
        sender: user.name,
        text,
        timestamp: Date.now(),
      })
    );
    setText("");
  };

  return (
    <div className="chat-window bg-amber-600">
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}