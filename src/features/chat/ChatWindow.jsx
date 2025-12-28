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
    <div className="chat-window container relative mx-auto p-4">
      <div className="messages h-125 overflow-y-auto mb-16">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-input absolute bottom-0 text-center w-full p-4 bg-white">
        <input
        className="outline-none bg-gray-300 rounded-2xl p-2 px-4 w-3/4"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 mx-2 bg-blue-500 rounded-2xl">Send</button>
      </form>
    </div>
  );
}