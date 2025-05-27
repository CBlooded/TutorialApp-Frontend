import "./chatRoomMessenger.css";
import { useEffect, useRef, useState } from "react";
import { useWebSocketService } from "../Services/useWebSocketService";
import axiosConfig from "../api/axiosConfig";

function ChatRoomMessenger() {
  const conversationAreaRef = useRef<HTMLDivElement>(null);
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
        subscribe(
          `/topic/messages/${sessionStorage.getItem("roomKey")}`,
          (msg) => {
            setMessages((prev) => [...prev, msg]);
          }
        );
      },
      (error) => console.log("WebSocket Error:", error)
    );

  const scrollToBottom = () => {
    if (conversationAreaRef.current) {
      conversationAreaRef.current.scrollTop =
        conversationAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    const rawRoomKey = sessionStorage.getItem("roomKey") ?? "";
    if (!rawRoomKey) return;
    const roomKey = encodeURIComponent(rawRoomKey);

    axiosConfig
      .get(`/getMessage/${roomKey}?page=0&size=50`)
      .then((response) => {
        const newMessages = response.data;
        setMessages((prev) => [...newMessages, ...prev]);
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error);
      });
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe(`/topic/messages/${sessionStorage.getItem("roomKey")}`);
      disconnect();
    };
  }, []);

  return (
    <div className="chat-room-container">
      <div className="conversation-area" ref={conversationAreaRef}>
        {messages.map((msg, index) => {
          const isCurrentUser =
            msg.usernameFrom === sessionStorage.getItem("username");
          return (
            <div
              className={isCurrentUser ? "guest-user" : "host-user"}
              key={index}
            >
              <div className="message">
                <div className="message-sender">{msg.usernameFrom}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
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
            send(`/app/sendMessage/${sessionStorage.getItem("roomKey")}`, {
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
