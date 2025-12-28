import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../features/chat/chatSlice";

export default function UsernameForm({ onSubmit }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    dispatch(setUsername(name));
    onSubmit(); // move to chat window
  };

  return (
    <form onSubmit={handleSubmit} className="username-form bg-cyan-800">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-name bg-blue-300"
      />
      <button type="submit" className="btn-submit">Start Chat</button>
    </form>
  );
}