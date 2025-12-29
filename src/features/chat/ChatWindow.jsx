import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, setTypingUser, clearTypingUser } from "./chatSlice";
import Message from "./Message";

//socket server
import socket from "../../socket";

//fakeusers and replies 
import fakeUsers from "../../data/FakeUsers";
import fakeReplies from "../../data/fakeReply";
import Rooms from "../../components/Rooms";
import UserConnected from "../../components/UserConnected";

export default function ChatWindow() {
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.chat.user);
  const typingUser = useSelector((state) => state.chat.userTyping);
  const dispatch = useDispatch();
  const bottomRef = useRef(null)
  const [text, setText] = useState("");
  const { currentRoom, rooms } = useSelector((state) => state.chat);
  const roomMessages = rooms[currentRoom].messages;
  const [socketId, setSocketId] = useState("");


  // fake users and fake replies
  const getRandomUser = () =>
    fakeUsers[Math.floor(Math.random() * fakeUsers.length)];

  const randomReply = () =>
    fakeReplies[Math.floor(Math.random() * fakeReplies.length)];


  const handleSend = (e) => {
    e.preventDefault();
    if (!text) return;

    //user 
    dispatch(
      sendMessage({
        id: Date.now() + Math.random(),
        sender: user.name,
        text,
        timestamp: Date.now(),
      })
    );
    setText("");

    const bots = getRandomUser()
    dispatch(setTypingUser(bots))
    //fake reply
    setTimeout(() => {
      //clear typing indicator
      dispatch(clearTypingUser())

      dispatch(
        sendMessage({
          id: Date.now() + 1,
          sender: bots,
          text: randomReply(),
          timestamp: Date.now(),
        }))
    }, 800 + Math.random() * 1200);
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages, typingUser]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
  }, [socket.id]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      dispatch(sendMessage(message));
    });
    // listen incomming messages
    return () => socket.off("receive_message");
  }, [dispatch]);

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
        <form onSubmit={handleSend} className="chat-input absolute bottom-0 text-center w-full p-4 bg-white">
          {typingUser && (
            <div className="typing-indicator">
              <em>{typingUser} is typing...</em>
            </div>
          )}
          <UserConnected/>
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
    </>
  );
}