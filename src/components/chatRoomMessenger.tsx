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
      () => {
        console.log(
          `Connected! username: ${sessionStorage.getItem("username")}`
        );
        subscribe("/topic/messages/#k2342", (msg) => {
          console.log("Received message in chat room:", msg);
          setMessages((prev) => [...prev, msg]);
        });
      },
      (error) => console.log("WebSocket Error:", error)
    );

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    return () => {
      unsubscribe("/topic/messages/#k2342");
      disconnect();
    };
  }, []);

  return (
    <div className="chat-room-container">
      <div className="conversation-area">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <div className="message-sender">{msg.usernameFrom}</div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="user-input-area">
        <textarea
          placeholder="Type your message..."
          className="user-input"
          value={inputText}
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
