import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";
import { axiosI } from "../src/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosI.get("/messages/users", {
        withCredentials: true,
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosI.get(`/messages/${userId}`);
      set({ messages: res.data });
      await axiosI.put(`/messages/seen/${userId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  markMessagesAsSeen: async (userId) => {
    try {
      await axiosI.put(`/messages/seen/${userId}`);
    } catch (error) {
      console.error("Error marking messages as seen: ", error.message);
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosI.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
   
  deleteUserChats: async (userId) => {
    try {
      await axiosI.delete(`/messages/delete/${userId}`);
      set({ messages: [] });      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;
      newMessage.seen = true;
      set({ messages: [...get().messages, newMessage] });
      axiosI.put(`/messages/seen/${selectedUser._id}`).catch((err) => {
        console.error("Error marking messages as seen: ", err.message);
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });

    if (selectedUser) {
      await get().markMessagesAsSeen(selectedUser._id);
    }
  },
}));
