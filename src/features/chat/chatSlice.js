import { createSlice } from "@reduxjs/toolkit";

const saved_chat= JSON.parse(localStorage.getItem("chat")) || {}

const initialState = {
  user: {
    name: {name: saved_chat.user?.name || ""},
  },
  messages: saved_chat.messages || [],
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
        JSON.stringify({user: state.user, messages: state.messages})
        )
    },

    sendMessage(state, action) {
      /*state.messages.push(action.payload);
      localStorage.setItem(
        "chat",
        JSON.stringify({user:state.user, messages: state.messages})
        )*/
        socket.emit("send_message", {
          sender: user.name,
          text,
          room: currentRoom,
          timestamp: Date.now(),
          
        });
    },

    clearChat(state) {
      state.messages = [];
      localStorage.removeItem("chat")
    },
    
    setTypingUser(state, action){
      state.userTyping=action.payload;
    },
    
    clearTypingUser(state){
      state.userTyping=null;
    }
  },
});

export const { 
  setUsername, 
  sendMessage, 
  clearChat, 
  setTypingUser, 
  clearTypingUser 
  
} = chatSlice.actions;
export default chatSlice.reducer;