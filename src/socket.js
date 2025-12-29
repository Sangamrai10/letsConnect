import { io } from "socket.io-client";
import UserConnected from "./components/UserConnected";

const socket = io("https://letsconnectserver.onrender.com",
{transports: ["websocket"]}
);

export default socket;