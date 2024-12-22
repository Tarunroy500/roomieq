import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Navbar Component
import Footer from "../components/footer"; // Footer Component
import DownloadPromo from "../components/DownloadPromo"; // Download Promo Component
import GridCardLike from "../components/CardLike"; // Card Component
import { axiosI } from "../axios"; // Axios instance for API requests


const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the listings
        const { data } = await axiosI.get("/mylistings");
        setMyListings(data.listings);

        // Fetch the wishlist
        const wishlistResponse = await axiosI.get("/wishlist");
        setWishlist(wishlistResponse.data.itemIds); // Assuming itemIds is an array of IDs
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle toggling of wishlist
  const toggleWishlist = (id, itemType) => {
    console.log("Toggling wishlist for:", itemType);
    
    const isWishlisted = wishlist.includes(id);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType }) // Send itemId and itemType
      .then((res) => {
        if (isWishlisted) {
          setWishlist((prev) => prev.filter((item) => item !== id));
        } else {
          setWishlist((prev) => [...prev, id]);
        }
      })
      .catch((err) => {
        console.error("Error toggling wishlist:", err);
      });
  };

  

  return (
    <>
      <Navbar /> {/* Navbar Component */}
      <div className="font-poppins px-4 sm:px-8 py-28">
        <h1 className="text-2xl font-bold mb-4 text-center">My Listings</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {myListings.length > 0 ? (
            myListings.map((listing, index) => {
              const { _id, itemType, ...details } = listing; // Extract details
              return (
                <GridCardLike
                  key={index}
                  _id = {_id}
                  title={details.name || details.bhojanalayName || details.roomName || details.officeName || details.hostelName || "Listing"}
                  desc={details.description || "No description provided"}
                  price={details.rent || details.priceOfThali || details.monthlyMaintenance ||"N/A"}
                  occupation={details.occupation || ""}
                  location={details.location || "Location not specified"}
                  link={`/${details.type}/${_id}`} // Link to listing details page
                  img={details.images?.[0] || "/default-image.jpg"}
                  verified={details.uid?.verified || false}
                  isFeatureListing={details.uid?.isFeatureListing || false}
                  isWishlisted={wishlist.includes(_id)} // Check if the listing is in the wishlist
                  toggleWishlist={() => toggleWishlist(_id, itemType)} // Toggle wishlist action
                  type={details.type}
                />
              );
            })
          ) : (
            <p className="text-center w-full">No listings found.</p>
          )}
        </div>
      </div>

      <div className="w-full text-center">
        <button className="mt-[40px] bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]">
          View More Listings...
        </button>
      </div>

      {/* Download Promo Section */}
      <DownloadPromo />

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default MyListings;
