import { EllipsisVertical, Star, X } from "lucide-react";
import { useAuthStore } from "../../utils/useAuthStore";
import { useChatStore } from "../../utils/useChatStore";
import { useAuth } from "../../utils/contextLogin";
import { useState } from "react";

const ChatHeader = ({ blocked = false, toggleBlock, deleteUserChats }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const [isMarking, setIsMarking] = useState(false);
  const { toggleImportantUser, userData} = useAuth();
  const { onlineUsers } = useAuthStore();
  const markImportantUser = async (userId) => {
    setIsMarking(true);
    await toggleImportantUser(userId);
    setIsMarking(false);
  }
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.name}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <div className="flex items-center gap-3">
        <button className="" onClick={() => markImportantUser(selectedUser._id)} disabled={isMarking}>
          {userData?.importantUserMarked?.includes(selectedUser._id) ? <Star className="text-zinc-400 size-8 cursor-pointer" color="yellow" fill="yellow"/> : <Star className="text-zinc-400 size-8 cursor-pointer"/>}
          </button>  
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="">
              <EllipsisVertical />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
            >
              <li onClick={() => toggleBlock(selectedUser._id)}>{blocked ? <button>Unblock Chat</button> : <button>Block Chat</button>}</li>             
              <li onClick={() => deleteUserChats(selectedUser._id)}><button>Delete Chats</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
