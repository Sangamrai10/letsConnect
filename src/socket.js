import { io } from "socket.io-client";
import UserConnected from "./components/UserConnected";

const socket = io("https://letsconnectserver.onrender.com",
{transports: ["websocket"]}
);

socket.on("connect", ()=>{
  <UserConnected socketId={socket.id}/>;
});
export default socket;