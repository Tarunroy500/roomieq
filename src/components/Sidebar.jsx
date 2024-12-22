import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../../utils/useAuthStore";
import { useChatStore } from "../../utils/useChatStore";
import { useAuth } from "../../utils/contextLogin";
import { Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { userData } = useAuth();
  const { onlineUsers } = useAuthStore();
  const [filterImportant, setFilterImportant] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter users based on online status and search query
  const filteredUsers = users.filter((user) => {
    const matchesOnlineFilter = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    const isImportant = filterImportant ? userData.importantUserMarked.includes(user._id) : true;
    const matchesSearchQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOnlineFilter && matchesSearchQuery && isImportant;
  });

  if (isUsersLoading) return <SidebarSkeleton />;  
  return (
    <aside
      className={`h-full w-full md:w-72 border-r border-base-300 flex flex-col transition-all duration-200 ${
        selectedUser ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center bg-gray-100 p-2 rounded-md gap-3">
          <div className="relative md:mx-0">
            <img
              src={userData?.profilePic || "/avatar.png"}
              alt={userData?.name}
              className="size-12 object-cover rounded-full"
            />
          </div>

          {/* User info */}
          <div className="block text-left min-w-0">
            <div className="font-medium truncate">{userData?.name}</div>
            <div className="text-sm text-zinc-400">{userData?.email}</div>
          </div>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
        <div className="mt-3 w-full justify-center flex gap-4">
          <button
            onClick={() => setFilterImportant(false)}
            className={`btn btn-sm ${!filterImportant ? "btn-info" : "btn-outline"}`}
          >
            All Chats
          </button>
          <button
            onClick={() => setFilterImportant(true)}
            className={`btn btn-sm ${filterImportant ? "btn-info" : "btn-outline"}`}
          >
            Important Chats
          </button>
        </div>
        {/* Search bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered rounded-full input-sm w-full pr-10 py-5 px-2"
          />
        <Search className="absolute top-1/2 -translate-y-1/2 right-3 text-zinc-400" />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`w-full p-3 flex items-center gap-2 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >          
          <button
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative md:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info */}
            <div className="block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
