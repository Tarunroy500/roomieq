import React from "react";
import Navbar from "./Navbar";
import leftImage from "../assets2/Group.png";
import rightImage from "../assets2/arrowcircleright.png";
import ellipseImage from "../assets2/ellipse2.png";
import vectorIcon from "../assets2/vector.png";
import verctrIcon from "../assets2/vectr2.png";
import newImage from "../assets2/newimage.svg";
import GridCardLike from "./CardLike";
import DownloadPromo from "./DownloadPromo";
import Footer from "./footer";

const ListingGrid = () => {
  return (
    <>
      <Navbar />
      <main className="w-full pt-32 md:pt-48 bg-white">
        {/* Breadcrumb */}
        <div className="pl-4 text-black px-4 sm:px-8 lg:px-16 text-base sm:text-xl border-b-2 pb-2 opacity-80 border-black font-normal font-['Poppins']">
          Home \ Category \ SubCategory
        </div>

        <section className="grid mt-12 px-4 sm:px-8 lg:px-16 grid-cols-1 md:grid-cols-5 gap-6 py-8">
          {/* Main Content */}
          <div className="col-span-3 grid gap-8">
            {/* Highlight Section */}
            <div className="rounded-[20px]  shadow-lg bg-[#a9def9] w-full h-full min-w-[300px] min-h-[400px] relative">
              <img
                src={leftImage}
                alt=""
                className="absolute left-[10%] top-[50%] -translate-y-[50%]"
              />
              <img
                src={rightImage}
                alt=""
                className="absolute right-[10%] top-[50%] -translate-y-[50%]"
              />
              <div className="grid grid-cols-3 px-4 aspect-square lg:px-12 gap-6 absolute w-full max-h-[100px] md:max-h-[150px] h-full -bottom-12 md:-bottom-16 left-[50%] -translate-x-[50%]">
                <div className="h-full w-full bg-[#d0f4de] rounded-[20px]  shadow-lg" />
                <div className="h-full w-full bg-[#d0f4de] rounded-[20px]  shadow-lg" />
                <div className="h-full w-full bg-[#d0f4de] rounded-[20px]  shadow-lg" />
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-16">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Title of the Post</h3>
                  <p className="text-gray-500 text-sm">
                    Location or Address of the Post
                  </p>
                </div>
                <button className="bg-pink-300 text-black px-4 py-2 mt-2 rounded-full">
                  Rent Amount/-
                </button>
              </div>
              <p className="text-gray-800 font-medium mb-4">Details:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                <ul className="space-y-2">
                  <li>Sharing:</li>
                  <li>Category of People:</li>
                  <li>Total Floor:</li>
                  <li>Bathroom:</li>
                  <li>Maintenance:</li>
                  <li>Electricity:</li>
                  <li>Deposit:</li>
                </ul>
                <ul className="space-y-2">
                  <li>Furnishing:</li>
                  <li>Parking:</li>
                  <li>Build-up Area:</li>
                  <li>Facing:</li>
                  <li>Amenities:</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-3 md:col-span-2 grid gap-6">
            {/* Profile Section */}
            <div className="relative bg-green-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm">Posted Date</p>
                <div className="flex gap-2">
                  <img src={vectorIcon} alt="Icon" className="w-8 h-8" />
                  <img src={verctrIcon} alt="Icon" className="w-8 h-8" />
                </div>
              </div>
              <div className="text-center">
                <img
                  src={ellipseImage}
                  alt="Profile"
                  className="w-36 h-36 mx-auto mb-4"
                />
                <h4 className="text-lg font-medium">Name of Lister</h4>
                <p className="text-gray-500">City, Area, State</p>
                <button className="mt-4 bg-purple-200 text-black px-6 py-2 rounded-full shadow-md">
                  Chat Now
                </button>
              </div>
            </div>

            {/* Membership Section */}
            <div className="bg-yellow-100 flex flex-col justify-between rounded-lg shadow-md p-4 md:p-6">
              <h4 className="text-xl font-medium mb-4">
                Want to Connect with Multiple Properties?
              </h4>
              <div className="flex items-center gap-2 justify-between">
                <button className="bg-pink-200 px-6 py-4 rounded-lg shadow-md">
                  <p className="text-sm">Become a Member of</p>
                  <p className="font-semibold">Saath Raho Family</p>
                </button>
                <img
                  src={newImage}
                  alt="Membership"
                  className="w-full max-w-24 md:max-w-36"
                />
              </div>
              <p className="text-xs text-center mt-4">
                Become a Saath Raho Family member for exclusive content.
              </p>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <div className="space-y-2">
                <p>Title of the Post:</p>
                <p>Location or Address of the Post:</p>
                <p>Details of the Post:</p>
              </div>
            </div>
          </aside>
        </section>
        <section className="py-8 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl mb-8 md:text-4xl font-poppins text-center mx-auto font-semibold ">
          Related Search
        </h2>
        <GridCardLike/>
        <div className='w-full text-center'>
      <button className="mt-[40px] bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]">
          Explore More Search...
        </button>
      </div>
        </section>
        <DownloadPromo/>
        <Footer/>
      </main>
    </>
  );
};

export default ListingGrid;
