import React, { useState, useRef } from "react";
import peela from "../assets/peelabutton.png";
import dabba from "../assets/dabba.png";
import linepic from "../assets/vector.png";
import line from "../assets/line.png";
import left from "../assets2/assets3/left.png";
import right from "../assets2/assets3/right.png";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import DownloadPromo from "../components/DownloadPromo";

function BlogSubPage() {
  const totalCards = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const startTouch = useRef(0);
  const endTouch = useRef(0);

  const cards = Array.from({ length: totalCards });

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalCards - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalCards - 1 ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (e) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startTouch.current - endTouch.current > 50) {
      goToNext();
    } else if (endTouch.current - startTouch.current > 50) {
      goToPrevious();
    }
  };

  const handleTouchMove = (e) => {
    endTouch.current = e.touches[0].clientX;
  };

  return (
    <div className="w-full bg-white font-poppins">
      {/* Navbar */}
      <NavBar className="w-full" />

      {/* Header Buttons */}

      {/* Blog Topic Section */}
      <div className="pt-24 md:pt-36">
      <div className="bg-[#A9DEF9] max-w-3xl mx-2 sm:mx-auto p-6 rounded-[35px] shadow-md text-center relative">
        <p className="text-xl sm:text-3xl font-semibold">Topic of the Blog</p>
      <div className="max-w-lg mx-auto mt-4 p-2 bg-[#D0F4DE] rounded-full flex justify-center items-center shadow-sm absolute -bottom-14 right-0">
        <p className="text-sm sm:text-base text-center font-medium text-gray-700">
          By admin | Date of posting | Category
        </p>
      </div>
      </div>

      {/* Blog Meta Section */}

      {/* Blog Image Section */}
      <div className="mt-24 max-w-4xl px-4 mx-auto">
        <div className="bg-gray-300 w-full h-64 sm:h-96 rounded-lg flex justify-center items-center">
          <img src={dabba} alt="Blog visual" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-8 max-w-3xl mx-auto text-center px-6 sm:px-12 lg:px-24 text-gray-700 leading-relaxed">
        <p className="text-base sm:text-lg">
          ....................................dynamic content..............................................
        </p>
      </div>

      {/* Divider */}
      <div className="my-12 flex items-center justify-center h-1 w-[90%] mx-auto border-b border-black border-dotted">
      </div>

      {/* Related Blogs */}
      <h2 className="text-center text-2xl sm:text-3xl mt-12">Related Blogs</h2>
      <div className="relative overflow-hidden mt-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((_, index) => (
            <div key={index} className="min-w-full px-4 flex justify-center">
              <div className="bg-gray-300 rounded-lg shadow-md max-w-xs p-4">
                <div className="h-40 bg-gray-300 rounded-t-lg"></div>
                <div className="bg-[#A9DEF9] rounded-b-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Title of the Blog</h3>
                  <p className="text-xs text-gray-700 mt-1">By admin | Date posted | Category</p>
                  <p className="mt-2 text-sm text-gray-700">One Line Description ...</p>
                  <button className="mt-4 px-4 py-2 bg-[#FF99C8] text-gray-900 font-medium rounded-full">
                    Continue Reading
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-4xl mx-auto px-4 my-8">
        <button
          className="h-10 w-10 sm:h-12 sm:w-12 bg-transparent"
          onClick={goToPrevious}
        >
          <img src={left} alt="Previous" />
        </button>
        <button
          className="h-10 w-10 sm:h-12 sm:w-12 bg-transparent"
          onClick={goToNext}
          >
          <img src={right} alt="Next" />
        </button>
      </div>

      {/* Download Promo */}
      <DownloadPromo />

      {/* Footer */}
      <Footer />
          </div>
    </div>
  );
}

export default BlogSubPage;
