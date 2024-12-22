import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useChatStore } from "../../utils/useChatStore";
import { useAuthStore } from "../../utils/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { useAuth } from "../../utils/contextLogin";
import { toast } from "react-toastify";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    deleteUserChats,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { userData, toggleBlockUser } = useAuth();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages,isMessagesLoading]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const toggleBlock = async (userId) => {
    await toggleBlockUser(userId);
  };

  const deleteUserChatsHandler = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete all chats?");
    if (!confirmed) return;
    await deleteUserChats(userId);
    toast.success("Chats deleted successfully");
  };

  return (
    <div
      className={`flex-1 flex flex-col overflow-hidden ${
        selectedUser ? "flex" : "hidden"
      }`}
    >
      <ChatHeader
        blocked={userData?.blockedUsers?.includes(selectedUser._id)}
        toggleBlock={toggleBlock}
        deleteUserChats={deleteUserChatsHandler}
      />

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {!userData?.blockedUsers?.includes(selectedUser._id) ? (
          messages.map((message, ind) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              {messages.length - 1 === ind && (
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
              )}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}               
                </time>                
              </div>
              <div
                className={`chat-bubble relative ${
                  message.senderId === authUser._id
                    ? "bg-[#D0F4DE] text-black"
                    : "bg-[#D9D9D9] text-black"
                } flex flex-col`}
              >
                {message.image &&
                  message.image.map((img, index) => (
                    <a
                      key={index}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    </a>
                  ))}
                {message.text && <p>{message.text}</p>}
                {message.senderId === authUser._id && message.seen === true ? (
                  <span
                    className={`absolute ${
                      message.senderId === authUser._id
                        ? "bottom-[1px] right-[2px]"
                        : "hidden"
                    } text-xs opacity-50`}
                  >
                    <CheckCheck size={16} />
                  </span>
                ) : (
                  <span
                    className={`absolute ${
                      message.senderId === authUser._id
                        ? "bottom-[1px] right-[2px]"
                        : "hidden"
                    } text-xs opacity-50`}
                  >
                    <Check size={16} />
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center bg-yellow-100 font-semibold p-2">
            You have blocked this user!
          </div>
        )}
        {/* Reference Element for Scrolling */}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      {!userData?.blockedUsers?.includes(selectedUser._id) &&
      !selectedUser?.blockedUsers?.includes(authUser._id) ? (
        <MessageInput />
      ) : (
        <div className="text-center bg-yellow-100 font-semibold p-2">
          {selectedUser?.blockedUsers?.includes(authUser._id)
            ? "This user has blocked you!"
            : ""}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
