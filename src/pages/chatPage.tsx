import { useState } from "react";
import NavBar from "../components/NavBar";
import ChatJoinForm from "../components/chatJoinForm";
import ChatRoomMessenger from "../components/chatRoomMessenger";
import "./chatPage.css";

function Chat() {
  const [roomSelected, setRoomSelected] = useState(false);

  const handleRoomJoin = () => {
    setRoomSelected(true);
  };

  return (
    <div className="chat-page-container">
      <NavBar />
      {!roomSelected ? (
        <ChatJoinForm onRoomJoined={handleRoomJoin} />
      ) : (
        <ChatRoomMessenger />
      )}
    </div>
  );
}

export default Chat;
