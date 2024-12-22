import React, { useState, useEffect } from "react";
import Logo from "../assets/FinalLogo.png";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import DownloadPromo from "../components/DownloadPromo";

function BlogPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-white font-poppins">
      {/* Header Section */}
      <NavBar />

      {/* Title Section */}
      <div className="pt-32 text-center">
        <h1 className="text-[30px] sm:text-[40px] md:text-[50px] font-bold text-gray-800">
          Blogs & Knowledge
        </h1>
        <div className="w-3/4 mx-auto h-px my-6 bg-gray-400 opacity-50"></div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 md:px-16 lg:px-20 mt-12 pb-12">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-200 rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto"
          >
            {/* Card Image */}
            <div className="h-[150px] sm:h-[160px] lg:h-[180px] bg-gray-300 w-full"></div>

            {/* Card Content */}
            <div className="bg-[#A9DEF9] w-full p-4 flex flex-col">
              <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-900">
                Title of the Blog
              </h2>
              <p className="text-xs sm:text-sm font-light text-gray-700 mt-2">
                By admin | Date posted | Category
              </p>
              <p className="mt-4 text-xs sm:text-sm font-light text-gray-700">
                One Line Description .................................... <br />
                ..............................................................
              </p>

              {/* Button */}
              <button className="mt-4 w-[90%] h-10 bg-[#FF99C8] text-gray-900 font-medium text-sm sm:text-base rounded-full mx-auto">
                Continue Reading
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download Promo Section */}
      <DownloadPromo />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default BlogPage;
