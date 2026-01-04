import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  setTypingUser,
  clearTypingUser,
} from "./chatSlice";
import Message from "./Message";
import Rooms from "../../components/Rooms";
import UserConnected from "../../components/UserConnected";
import socket from "../../socket";
import fakeUsers from "../../data/FakeUsers";
import fakeReplies from "../../data/fakeReply";

export default function ChatWindow() {
  const { user, currentRoom, messages, userTyping } = useSelector((state) => ({
    user: state.chat.user,
    currentRoom: state.chat.currentRoom,
    messages: state.chat.rooms[state.chat.currentRoom]?.messages || [],
    userTyping: state.chat.userTyping,
  }));

  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const [text, setText] = useState("");
  const [socketId, setSocketId] = useState("");

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, userTyping]);

  // Set socket ID
  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));
    return () => socket.off("connect");
  }, []);

  // Join room whenever currentRoom changes
  useEffect(() => {
    socket.emit("join_room", currentRoom);
  }, [currentRoom]);

  // Receive messages
  useEffect(() => {
    const handleReceive = (message) => {
      dispatch(sendMessage(message));
    };
    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [dispatch]);

  // Receive bot messages
  /*useEffect(() => {
    const handleBotMessage = (botMessage) => {
      dispatch(sendMessage(botMessage));
    };
    
    socket.on("bot_message", handleBotMessage);
    return () => socket.off("bot_message", handleBotMessage);
  }, [dispatch]);*/

  // Helpers
  const getRandomUser = () =>
    fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const randomReply = () =>
    fakeReplies[Math.floor(Math.random() * fakeReplies.length)];

  // Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (!text) return;
dispatch(setTypingUser(user.name));
    const message = {
      id: Date.now(),
      sender: user.name,
      text,
      room: currentRoom,
      timestamp: Date.now(),
    };

    // Emit to server
    socket.emit("send_message", message);
    dispatch(sendMessage(message));
    setText("");
    dispatch(clearTypingUser)

  };

  return (
    <>
      <Rooms />
      <div className="chat-window container relative mx-auto p-4">
        <div className="messages h-[70vh] overflow-y-auto mb-16">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="chat-input absolute bottom-0 text-center w-full p-4 bg-white"
        >
          {userTyping && (
            <div className="typing-indicator">
              <em>{userTyping} is typing...</em>
            </div>
          )}

          {socketId && <UserConnected socketId={socketId} />}

          <input
            className="outline-none bg-gray-300 rounded-2xl p-2 px-4 w-3/4"
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 mx-2 bg-blue-500 rounded-2xl"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
