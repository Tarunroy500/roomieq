import { useEffect, useState } from "react";
import GridCardLike from "../components/CardLike"; // Import your GridCardLike component
import { axiosI } from "../axios";

const GridComponent = () => {
  const [wishlistData, setWishlistData] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist data from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosI.get("/wishlist");

        setWishlistData(response.data); // Store the response data
        setWishlist(
          Array.isArray(response.data.itemIds) ? response.data.itemIds : []
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    getData();
  }, []);

  // Handle toggling of wishlist
  const toggleWishlist = (id, itemType) => {
    const isWishlisted = wishlist.some((item) => item === id);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType }) // Send the itemId and itemType
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

  if (!wishlistData) {
    // no data found
    return <div className="font-poppins px-4 sm:px-8 py-6">No Data Found</div>;
  }

  return (
    <div className="font-poppins px-4 sm:px-8 py-6">
      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistData.populatedItems.map((item, index) => {
          const { details, itemId, itemType } = item; // Destructure item details
          return (
            <GridCardLike
              key={index}
              title={
                details?.name ||
                details?.bhojanalayName ||
                details?.roomName ||
                details?.officeName ||
                details?.hostelName
              }
              desc={details?.description || "Description not available"}
              // priceOfThali , monthlyMaintenance , rent
              price={
                details?.priceOfThali ||
                details?.monthlyMaintenance ||
                details?.rent ||
                ""
              }
              occupation={details?.occupation || "Not specified"}
              location={details?.location || "Location not specified"}
              link={`/${details.type}/${itemId}`} // Example link, adjust according to your routing
              img={details?.images || "/default-image?.jpg"} // Placeholder image
              verified={details?.uid?.verified || false}
              isFeatureListing={details?.uid?.isFeatureListing || false}
              isWishlisted={wishlist?.includes(itemId)}
              toggleWishlist={() => toggleWishlist(itemId, itemType)}
              distance={details?.distance}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridComponent;
