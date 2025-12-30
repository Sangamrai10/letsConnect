import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SOCKET_URL
    : import.meta.env.VITE_LOCAL_SOCKET_URL;

const socket = io(URL, {
  transports: ["websocket"],
});

export default socket;
