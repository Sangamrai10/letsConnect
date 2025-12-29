import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../features/chat/chatSlice";

const rooms = ["general", "react", "random"];

export default function Rooms() {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.currentRoom);

  return (
    <div className="flex gap-2 p-2 border-b">
      {rooms.map((room) => (
        <button
          key={room}
          onClick={() => dispatch(setRoom(room))}
          className={`px-3 py-1 rounded text-sm ${
            currentRoom === room
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          #{room}
        </button>
      ))}
    </div>
  );
}
