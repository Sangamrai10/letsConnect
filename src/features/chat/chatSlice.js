import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
  },
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.user.name = action.payload;
    },

    sendMessage(state, action) {
      state.messages.push(action.payload);
    },

    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { setUsername, sendMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;