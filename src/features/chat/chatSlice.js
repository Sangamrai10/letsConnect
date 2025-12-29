import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";
const saved_chat = JSON.parse(localStorage.getItem("chat")) || {};

const initialState = {
  user: {
    name: { name: saved_chat.user?.name || "" },
  },
  currentRoom: saved_chat?.currentRoom || "General",
  messages: saved_chat?.messages || [],
  rooms: saved_chat?.rooms || {
    General: { messages: [] },
    Technology: { messages: [] },
    Sports: { messages: [] },
    Music: { messages: [] },
  },
  userTyping: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.user.name = action.payload;
      localStorage.setItem(
        "chat",
        JSON.stringify({ user: state.user, messages: state.messages })
      );
    },

    sendMessage(state, action) {
      state.messages.push(action.payload);
      localStorage.setItem(
        "chat",
        JSON.stringify({user:state.user, messages: state.messages})
      );
      socket.emit("send_message", {
        id: action.payload.id,
        sender: state.user.name,
        text: action.payload.text,
        room: state.currentRoom,
        timestamp: action.payload.timestamp,
      });
    },

    clearChat(state) {
      state.messages = [];
      localStorage.removeItem("chat");
    },

    setRoom(state, action) {
      state.currentRoom = action.payload;
      localStorage.setItem(
        "chatApp",
        JSON.stringify({
          user: state.user,
          currentRoom: state.currentRoom,
          rooms: state.rooms,
        })
      );
    },

    setTypingUser(state, action) {
      state.userTyping = action.payload;
    },

    clearTypingUser(state) {
      state.userTyping = null;
    },
  },
});

export const {
  setUsername,
  sendMessage,
  clearChat,
  setRoom,
  setTypingUser,
  clearTypingUser,
} = chatSlice.actions;
export default chatSlice.reducer;
