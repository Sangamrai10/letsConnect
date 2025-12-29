import { io } from "socket.io-client";

const socket = io("https://letsconnectserver-2.onrender.com");

export default socket;