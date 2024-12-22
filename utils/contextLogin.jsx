/* eslint-disable react/prop-types */
// src/utils/LoginContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import { axiosI } from "../src/axios";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]); // Store the full user data
  //   const [loading, setLoading] = useState(true); // To track if user data is loading

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axiosI.get(`/me`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserData(response.data.user); // Set user data
      }
    } catch (error) {
      //   setError("Error fetching user profile");
      console.error("Error fetching user profile:", error);
    } finally {
      //   setLoading(false);
    }
  };

  // Check if user UID exists in localStorage and fetch user data on app mount
  useEffect(() => {
    fetchUserData(); // Fetch user data from the API
  }, []);

  // Function to log in a user
  const toggleImportantUser = async (userId) => {
    await axiosI.put(
      `/toggleImportant`,
      { uid: userId },
      {
        withCredentials: true,
      }
    );
    setUserData({
      ...userData,
      importantUserMarked: userData.importantUserMarked.includes(userId)
        ? userData.importantUserMarked.filter((id) => id !== userId)
        : [...userData.importantUserMarked, userId],
    });
    if (userData.importantUserMarked.includes(userId)) {
      toast.success("User marked as not important");
    } else {
      toast.success("User marked as important");
    }
  };

  const toggleBlockUser = async (userId) => {
    await axiosI.put(
      `/toggleBlock`,
      { uid: userId },
      {
        withCredentials: true,
      }
    );
    setUserData({
      ...userData,
      blockedUsers: userData.blockedUsers.includes(userId)
        ? userData.blockedUsers.filter((id) => id !== userId)
        : [...userData.blockedUsers, userId],
    });
    if (userData.blockedUsers.includes(userId)) {
      toast.success("User marked as unblocked");
    } else {
      toast.success("User marked as blocked");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, toggleImportantUser, toggleBlockUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
