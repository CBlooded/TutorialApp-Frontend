import "./chatRoomMessenger.css";
import { useEffect, useState } from "react";
import { useWebSocketService } from "../Services/useWebSocketService";

function ChatRoomMessenger() {
  const [messages, setMessages] = useState<
    { usernameFrom: string; text: string }[]
  >([]);
  const [inputText, setInputText] = useState("");
  const webSocketUrl = "http://localhost:8080/chat";
  const { connect, subscribe, send, unsubscribe, disconnect } =
    useWebSocketService(
      webSocketUrl,
      () => console.log("Connected!"),
      (error) => console.log("WebSocket Error:", error)
    );

  useEffect(() => {
    connect();

    subscribe("/topic/messages/#k2342", (message) => {
      const parsed = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, parsed]);
    });

    return () => {
      unsubscribe("/topic/messages/#k2342");
      disconnect();
    };
  }, [connect, subscribe, disconnect, unsubscribe]);

  return (
    <div className="chat-room-container">
      <div className="conversation-area">
        <div className="message">
          {/* sample code */}
          <div className="message-sender"></div>
          <div className="message-text">
            {messages.map((msg, index) => (
              <div key={index}>{msg.text}</div>
            ))}
          </div>
        </div>
        <div className="message">
          <div className="message-sender"></div>
          <div className="message-text"></div>
        </div>
      </div>
      <div className="user-input-area">
        <textarea
          placeholder="Type your message..."
          className="user-input"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="send-button"
          onClick={() => {
            send("/app/sendMessage/#k2342", {
              usernameFrom: sessionStorage.getItem("username"),
              text: inputText,
            });
            setInputText(""); // clear after send
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoomMessenger;
