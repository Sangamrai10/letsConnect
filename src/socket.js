import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SOCKET_URL
    : import.meta.env.VITE_LOCAL_SOCKET_URL;

const socket = io(URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export default socket;
