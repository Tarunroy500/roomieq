import { useEffect, useState } from "react";
import Heart from "../assets/Heart.svg";
import HeartFill from "../assets/heart-fill.svg";
import { Link, useNavigate,useLocation } from "react-router-dom";
import IsVerifiedComponent from "../components/VerifiedComponent";
import e from "cors";

const GridCardLike = ({
  _id,
  title,
  desc,
  price,
  occupation,
  location,
  link,
  img,
  verified,
  isFeatureListing,
  isWishlisted,
  toggleWishlist,
  distance,
  type,
}) => {
  const navigate = useNavigate();
  const [animateHeart, setAnimateHeart] = useState(false);
  const Paramlocation = useLocation();
  const isMyListingsPage = Paramlocation.pathname.includes("mylisting");

  const handleHeartClick = () => {
    setAnimateHeart(true);
    toggleWishlist();

    // Reset animation after it completes
    setTimeout(() => setAnimateHeart(false), 300); // Adjust timing if necessary
  };
  const HandleEdit = (id) => {
    const routes = {
      Bhojnalaya: "/addbhojanalay",
      Hostel: "/addhostel",
      Office: "/addoffice",
      Room: "/addrooms",
      Roommate: "/addroommate",
    };
    console.log("Edit clicked", id);
    
    navigate(routes[type], { state: { id, update: true } });
  };
  return (
    <div className="rounded-2xl">
      {/* Image Section */}
      {/* Image Section */}
      <div className="bg-[#d9d9d9] h-[120px] xs:h-[150px] sm:h-[200px] xl:h-[300px] w-[90%] mx-auto rounded-t-2xl relative">
        <img
          src={img}
          alt="Image"
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {/* Featured Tag */}
        {isFeatureListing && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs sm:text-sm font-semibold py-1 px-2 rounded-full shadow-md">
            Featured
          </div>
        )}

        {/* Icons Section */}
        <div className="absolute top-0 right-0 flex gap-2 rounded-tr-lg rounded-bl-lg backdrop-blur-lg p-1">
          <div
            onClick={handleHeartClick}
            className={`bg-white p-1 w-5 h-5 md:w-8 md:h-8 cursor-pointer rounded-full flex justify-center items-center ${
              animateHeart ? "animate-like" : ""
            }`}
          >
            <img
              src={isWishlisted ? HeartFill : Heart}
              alt=""
              className="w-full -mb-[2px] h-full object-contain"
            />
          </div>
          <IsVerifiedComponent verified={verified} />
        </div>

        {/* Edit Button */}
        {isMyListingsPage && (
          <button
            className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={() => HandleEdit(_id)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="bg-[#fcf6bd] rounded-2xl p-4 flex flex-col justify-between">
        {/* Title and Description */}
        <div className="hidden sm:block max-w-full max-h-20 overflow-y-auto">
          <h1 className="text-xl font-semibold mb-2 truncate">{title}</h1>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed truncate">
            {desc}
          </p>
        </div>

        {/* Price and Location */}
        <div className="flex flex-col max-h-10 overflow-y-auto sm:flex-row justify-between items-center">
          {price ? (
            <h4 className="text-base sm:text-lg font-medium">INR {price}/-</h4>
          ) : (
            <h4 className="text-base sm:text-lg">{occupation}</h4>
          )}
          <p className="text-xs mt-1 sm:mt-0 text-gray-500">{location}</p>
          {distance && <p>Distance: {distance?.toFixed(2)} km</p>}
        </div>

        {/* Button */}
        <Link
          to={link}
          className="bg-[#a9def9] text-xs text-center sm:text-base mt-4 px-6 py-2 rounded-full hover:bg-[#87cce6] transition-colors duration-300 font-medium border-b-[2px] border-gray-300"
        >
          Contact Now
        </Link>
      </div>
    </div>
  );
};

export default GridCardLike;
