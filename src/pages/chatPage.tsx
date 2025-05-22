import NavBar from "../components/NavBar";
//  import ChatJoinForm from "../components/chatJoinForm";
import ChatRoomMessenger from "../components/chatRoomMessenger";
import "./chatPage.css";

function Chat() {
  return (
    <div className="chat-page-container">
      <NavBar />
      {/* <ChatJoinForm /> */}
      <ChatRoomMessenger />
    </div>
  );
}

export default Chat;
