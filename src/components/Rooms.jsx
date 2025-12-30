import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "../features/chat/chatSlice";
import socket from "../socket";

export default function Rooms() {
  const { currentRoom, rooms } = useSelector((state) => ({
    currentRoom: state.chat.currentRoom,
    rooms: state.chat.rooms,
  }));
  const dispatch = useDispatch();

  const handleRoomChange = (roomName) => {
    if (roomName === currentRoom) return;

    dispatch(setRoom(roomName));
    socket.emit("join_room", roomName);
  };

  return (
    <div className="rooms flex gap-2 mb-4">
      {Object.keys(rooms).map((room) => (
        <button
          key={room}
          onClick={() => handleRoomChange(room)}
          className={`px-4 py-2 rounded-full ${
            currentRoom === room ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {room}
        </button>
      ))}
    </div>
  );
}
