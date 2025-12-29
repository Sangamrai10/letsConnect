import { useSelector } from "react-redux";

export default function Message({ message }) {
  const currentUser = useSelector((state) => state.chat.user.name);
  const isOwnMessage = message.sender === currentUser;

  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}>
      <div className="max-w-[70%]">
        {!isOwnMessage && (
          <div className="text-xs font-semibold">
            {message.sender}
          </div>
        )}
        <div>{message.text}</div>
        
      </div>
    </div>
  );
}