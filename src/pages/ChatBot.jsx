import { useState, useEffect, useRef } from "react";
import boticon from "../assets/boticon.svg";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi, how can I help?" },
  ]);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (text, response) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text },
      { type: "bot", text: response },
    ]);
  };

  const lastMessageType = messages[messages.length - 1]?.type;

  const options = [
    { question: "Order purchasing related?", response: "Payment issue? Incomplete order?" },
    { question: "Refund & Return Policy?", response: "30-day returns, need help?" },
    { question: "1-1 Consultation with Expert?", response: "Ready to connect with expert?" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg w-full sm:w-[400px] h-[70vh] sm:h-[600px] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-purple-100 flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Chat with</h3>
          <h4 className="font-semibold text-xl text-gray-900">RoomieQ Person</h4>
        </div>
        <img src={boticon} alt="Bot Icon" className="w-10 h-10" />
      </div>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`${
                msg.type === "bot"
                  ? "bg-purple-200 text-gray-800"
                  : "bg-purple-300 text-gray-900"
              } rounded-xl px-4 py-2 max-w-[70%]`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Options */}
      {lastMessageType === "bot" && (
        <div className="p-4 space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                handleOptionClick(option.question, option.response)
              }
              className="w-full bg-purple-50 border border-purple-300 rounded-full px-4 py-2 text-purple-700 hover:bg-purple-200"
            >
              {option.question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
