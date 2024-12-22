import React, { createContext, useState, useContext } from "react";
import { axiosI } from "../src/axios";

// Create a context for the listing
const ListingContext = createContext();

// Provider component
export const ListingProvider = ({ children }) => {
  // Function to handle adding a listing and updating the count
  const addListing = async () => {
    try {
      const response = await axiosI.get("/addlisting");

      if (response.data.success) {
        alert("Listing added successfully!");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("An error occurred while adding the listing. Please try again.");
      return false;
    }
  };

  return (
    <ListingContext.Provider value={{ addListing }}>
      {children}
    </ListingContext.Provider>
  );
};

// Custom hook to use the listing context
export const useListingContext = () => {
  return useContext(ListingContext);
};
