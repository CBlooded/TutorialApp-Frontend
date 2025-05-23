import './chatRoomMessenger.css';

function ChatRoomMessenger() {
  return (
    <div className="chat-room-container">
        <div className="conversation-area">
            <div className="message">
                {/* sample code */}
                <div className="message-sender">User1</div>
                <div className="message-text">California girls, we're unforgettable, Daisy Dukes, bikinis on top. Sun-kissed skin, so hot, we'll melt your popsicle.
                {Array.from({ length: 100 }, () => "jacek cwel").join(" ")}
                </div>
            </div>
            <div className="message">
                <div className="message-sender">User2</div>
                <div className="message-text">
                  {Array.from({ length: 200 }, () => "Wejde Wyjde").join(" ")}
                </div>
            </div>
            {/* Add more messages here */}
        </div>
        <div className="user-input-area">
            <textarea
            placeholder="Type your message..."
            className="user-input"
            />
            <button className="send-button">Send</button>
        </div>
    </div>
  );
}

export default ChatRoomMessenger;