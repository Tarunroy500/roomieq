import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import { axiosI } from "../axios";

const socket = io(import.meta.env.VITE_URL);

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [images, setImages] = useState([]);
  const userId = "user-id"; // Replace with authenticated user ID
  const otherUserId = "other-user-id"; // Replace with recipient user ID

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    axiosI.get(`/messages/${roomId}`).then((res) => {
      setMessages(res.data);
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("messageSeen", (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isSeen: true } : msg
        )
      );
    });
  }, [roomId]);

  const sendMessage = async () => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    let uploadedPaths = [];
    if (images.length) {
      const { data } = await axiosI.post("/upload", formData);
      uploadedPaths = data.paths;
    }

    const message = {
      roomId,
      senderId: userId,
      receiverId: otherUserId,
      message: newMessage,
      images: uploadedPaths,
    };

    axiosI.post("/sendMessage", message);
    setNewMessage("");
    setImages([]);
  };

  const formatMessagesByDate = () => {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const date = moment(msg.timestamp).format("YYYY-MM-DD");
      if (!groupedMessages[date]) groupedMessages[date] = [];
      groupedMessages[date].push(msg);
    });
    return groupedMessages;
  };

  const renderMessages = () => {
    const grouped = formatMessagesByDate();
    return Object.keys(grouped).map((date) => (
      <div key={date}>
        <div className="date-separator">
          {moment(date).calendar(null, {
            sameDay: "[Today]",
            lastDay: "[Yesterday]",
            sameElse: "MMMM DD, YYYY",
          })}
        </div>
        {grouped[date].map((msg) => (
          <div
            key={msg._id}
            className={`message ${
              msg.senderId === userId ? "sent" : "received"
            }`}
          >
            {/* {msg.images &&
              msg.images.map((img, index) => (
                <img key={index} src={`http://localhost:5000/${img}`} alt="" />
              ))} */}
            {msg.message && <p>{msg.message}</p>}
            <span>{msg.isSeen ? "Seen" : "Delivered"}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="chat-room">
      
      <div className="messages">{renderMessages()}</div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
