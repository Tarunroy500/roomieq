import Vector from "../assets/Vector.svg";
import bot from "../assets/Technical Support.svg";
import chatic from "../assets/Chat Bubble.svg";

import Chatbot from "../pages/Chatbot";
import { Link } from "react-router-dom";

const SideChat = () => {
  return (
    <div>
      <div className="fixed right-6 z-1 bottom-6 sm:right-[60px] sm:bottom-[60px]">
        <div className="dropdown dropdown-top dropdown-end">
          <div tabIndex={0} role="button" className="">
            <button className="w-12 h-12 sm:w-16 sm:h-16 bg-[#48a36b] rounded-full shadow-lg flex items-center justify-center">
              <img
                src={Vector}
                alt="Chat Icon"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow"
          >
            <li
              onClick={() =>
                (document.getElementById("chatbot_modal").checked = true)
              }
              className="flex flex-row gap-3 justify-center items-center"
            >
              <div className="flex flex-row gap-3 items-center">
                <button>Support</button>
                <div className="bg-[#48a36b] p-1 ml-4 w-8 h-8 rounded-full">
                  <img src={bot} alt="Bot" />
                </div>
              </div>
            </li>
            <li className="flex flex-row gap-3 justify-center items-center">
              <Link to="/chat" className="flex flex-row gap-3 items-center">
                <p>Chats</p>
                <div className="bg-[#48a36b] p-1 ml-8 w-8 h-8 rounded-full">
                  <img src={chatic} alt="chat" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Chatbot Modal */}
      <input type="checkbox" id="chatbot_modal" className="modal-toggle" />
      <div className="modal modal-right">
        <div className="modal-box w-full sm:w-[450px]">
          <Chatbot />
          <label
            htmlFor="chatbot_modal"
            className="absolute top-4 bg-white px-2 rounded-full right-4 cursor-pointer text-lg font-bold"
          >
            ✕
          </label>
        </div>
      </div>
    </div>
  );
};

export default SideChat;
