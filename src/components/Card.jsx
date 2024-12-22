// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Heart from "../assets/Heart.svg";
// import HeartFill from "../assets/heart-fill.svg";

// const Card = ({
//   _id,
//   title,
//   desc,
//   price,
//   occupation,
//   location,
//   link,
//   img,
//   verified,
//   isFeatureListing,
//   isWishlisted,
//   toggleWishlist,
//   distance,
//   type,
// }) => {
//   const navigate = useNavigate();
//   const [animateHeart, setAnimateHeart] = useState(false);
//   const Paramlocation = useLocation();
//   const isMyListingsPage = Paramlocation.pathname.includes("mylisting");

//   const handleHeartClick = () => {
//     setAnimateHeart(true);
//     toggleWishlist();

//     // Reset animation after it completes
//     setTimeout(() => setAnimateHeart(false), 300); // Adjust timing if necessary
//   };
//   const HandleEdit = (id) => {
//     const routes = {
//       Bhojnalaya: "/addbhojanalay",
//       Hostel: "/addhostel",
//       Office: "/addoffice",
//       Room: "/addrooms",
//       Roommate: "/addroommate",
//     };
//     console.log("Edit clicked", id);

//     navigate(routes[type], { state: { id, update: true } });
//   };
//   return (
//     <>
//       <div className="product">
//         <div className="prod_photo object-cover w-full h-48 rounded-t-lg overflow-hidden relative">
//           <img src={img} alt="" />
//         </div>
//         {isFeatureListing && (
//           <div className="premium">
//             <img src="premium.svg" alt="" />
//           </div>
//         )}
//         <div className="title_heart">
//           <div id="title">{title}</div>
//           <div  className="img_grp">
//             <img onClick={handleHeartClick} src={isWishlisted ? HeartFill : Heart} alt="" className={``} />
//             <img src="bluetick.svg" alt="" />
//           </div>
          
//         </div>
        
//         <div className="prod_desc">{desc}</div>
//         <div className="price_city">
//           <div className="price">₹{price}</div>
//           <div className="city">{location}&gt;&gt;</div>
//         </div>
//         <Link to={link}>
//           <div className="button">
//             <button>
//               Contanct now <img src="chat.svg" alt="" />
//             </button>
//           </div>
//         </Link>
//         <div className="prod_break"></div>
//       </div>
//     </>
//   );
// };

// export default Card;


import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, CheckCircle,Star } from 'lucide-react';

const Card = ({
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
  const paramLocation = useLocation();
  const isMyListingsPage = paramLocation.pathname.includes("mylisting");

  const handleHeartClick = () => {
    setAnimateHeart(true);
    toggleWishlist();
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const handleEdit = (id) => {
    const routes = {
      Bhojnalaya: "/addbhojanalay",
      Hostel: "/addhostel",
      Office: "/addoffice",
      Room: "/addrooms",
      Roommate: "/addroommate",
    };
    navigate(routes[type], { state: { id, update: true } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {isFeatureListing && (
          <div className="absolute top-2 left-2 bg-yellow-400 rounded-full p-1.5 shadow-md">
            <Star className="w-4 h-4 text-white" fill="white" />
          </div>
        )}
        <button
          onClick={handleHeartClick}
          className={`absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 transition-transform duration-300 ${
            animateHeart ? 'scale-125' : ''
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
          {verified && (
            <CheckCircle className="w-5 h-5 text-blue-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{desc}</p>
        <div className="flex justify-between gap-6 items-center mb-4">
          <span className="text-xl font-bold text-green-600">₹{price}</span>
          <span className="text-xs text-gray-500">{location}</span>
        </div>
        <Link
          to={link}
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
        >
          Contact now
          <MessageCircle className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Card;




