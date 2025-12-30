import { createSlice } from "@reduxjs/toolkit";

const savedChat = JSON.parse(localStorage.getItem("chatApp")) || {};

const initialState = {
  user: { name: savedChat.user?.name || "" },
  currentRoom: savedChat.currentRoom || "General",
  messages: savedChat.messages || [],
  rooms: savedChat.rooms || {
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
      localStorage.setItem("chatApp", JSON.stringify({ ...state }));
    },

    sendMessage(state, action) {
      const msg = action.payload;
      state.messages.push(msg);
      if (!state.rooms[msg.room]) state.rooms[msg.room] = { messages: [] };
      state.rooms[msg.room].messages.push(msg);
      localStorage.setItem("chatApp", JSON.stringify({ ...state }));
    },

    clearChat(state) {
      state.messages = [];
      Object.keys(state.rooms).forEach((room) => (state.rooms[room].messages = []));
      localStorage.removeItem("chatApp");
    },

    setRoom(state, action) {
      state.currentRoom = action.payload;
      localStorage.setItem("chatApp", JSON.stringify({ ...state }));
    },

    setTypingUser(state, action) {
      state.userTyping = action.payload;
    },

    clearTypingUser(state) {
      state.userTyping = null;
    },
  },
});

export const { setUsername, sendMessage, clearChat, setRoom, setTypingUser, clearTypingUser } =
  chatSlice.actions;
export default chatSlice.reducer;
