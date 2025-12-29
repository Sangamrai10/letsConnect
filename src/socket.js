import { io } from "socket.io-client";

const socket = io("https://letsconnectserver.onrender.com");

export default socket;