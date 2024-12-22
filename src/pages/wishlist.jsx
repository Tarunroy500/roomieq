import React from "react";
import newcity from "../assets2/assets3/newcity.svg";

function wishlist() {
  return (
    <>
<div className="relative bg-white overflow-hidden h-auto pt-8">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-32 space-y-6">
        <img
          className="w-[100px] sm:w-[171px] h-[140px] sm:h-[340px] opacity-90 mt-4"
          src={newcity}
          alt="Category Icon"
        />
        <h1 className="text-2xl sm:text-5xl font-bold font-poppins text-black">
          Wishlist
        </h1>
        <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
          Sub-Heading
        </p>
      </div>

      {/* Footer Section */}
      {/* <div className="relative z-50 -mt-20 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 py-8 space-y-4 sm:space-y-0">
        <p className="text-sm sm:text-lg font-poppins text-gray-600">
          Home \ Category
        </p>
        <div className="flex items-center w-full sm:w-[350px] bg-white border border-black shadow-md rounded-full px-4 py-2">
          <img src={Filter} alt="Filter Icon" className="h-5 sm:h-6 w-5 sm:w-6" />
          <input
            type="text"
            placeholder="Filter by price, location..."
            className="w-full bg-transparent focus:outline-none placeholder-gray-500 ml-2"
          />
        </div>
      </div> */}
    </div>
    </>
  );
}

export default wishlist;
