import React from "react";

export default function Message({ message }) {
  const time = new Date(message.timestamp).toLocaleTimeString();
  return (
    <div className="message">
      <strong>{message.sender}</strong>: {message.text} <small>{time}</small>
    </div>
  );
}