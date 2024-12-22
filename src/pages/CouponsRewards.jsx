import React, { useEffect, useState } from "react";
import manwithgift from "../assets/41.svg";
import giftbackground from "../assets/48.svg";
import giftimg2 from "../assets/49.svg";
import giftsvg from "../assets/50.svg";
import logo from "../assets/FinalLogo.png";
import { axiosI } from "../axios";

const CouponsRewards = ({ setCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [toasterMessage, setToasterMessage] = useState(""); // State for toaster message

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axiosI.get("/user-coupon");
        setCoupons(data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleexit = () => {
    setCoupon(false);
  };

  const handleCopy = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    setToasterMessage("Coupon code copied!"); // Set toaster message

    // Hide toaster after 2 seconds
    setTimeout(() => {
      setToasterMessage(""); // Clear the toaster message
    }, 2000);
  };

  return (
    <div className="backdrop-blur-sm w-[100vw] flex justify-center items-center min-h-screen px-4 fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-yellow-100 flex flex-wrap lg:flex-nowrap w-full lg:w-[90%] h-[620px] xl:w-[900px] lg:h-[500px] rounded-[60px] shadow-lg overflow-hidden">
        <div className="w-full lg:w-4/5 p-6 flex flex-col relative">
          <img
            src={logo}
            alt="Logo"
            className="absolute w-[50px] h-[40px] lg:w-[74px] lg:h-[55px]"
          />
          <div className="flex justify-end items-center right-4 absolute top-0">
            <img
              src={giftsvg}
              alt="Logo"
              className="w-24 h-24 lg:w-36 lg:h-36"
            />
          </div>
          <div className="w-full lg:w-[60%] mx-auto flex flex-col items-center justify-center pt-14 bg-yellow-100">
            <h1 className="text-[#FF99C8] text-shadow-lg text-2xl lg:text-3xl font-bold mb-4">
              Coupons & Rewards
            </h1>
            <div className="bg-[#E4C1F9] p-3 rounded-[30px]">
              {/* Map through coupons and display them */}
              {coupons[0] != null ? (
                coupons.slice(0, 2).map((coupon, index) => (
                  <div key={index} className="relative mb-2">
                    <input
                      type="text"
                      className="border-none rounded-3xl w-full lg:w-4/5 px-4 py-2 bg-[#E4C1F9] border border-purple-300 text-purple-900 focus:outline-none"
                      value={coupon?.code} // Display the coupon code
                      readOnly
                    />
                    {/* Copy Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className="bg-purple-300 p-2 rounded-full"
                      >
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.6"
                            d="M12.5263 14.5455H4.42105V4.36364H12.5263M12.5263 2.90909H4.42105C4.03021 2.90909 3.65537 3.06234 3.379 3.33512C3.10263 3.6079 2.94737 3.97787 2.94737 4.36364V14.5455C2.94737 14.9312 3.10263 15.3012 3.379 15.574C3.65537 15.8468 4.03021 16 4.42105 16H12.5263C12.9172 16 13.292 15.8468 13.5684 15.574C13.8447 15.3012 14 14.9312 14 14.5455V4.36364C14 3.97787 13.8447 3.6079 13.5684 3.33512C13.292 3.06234 12.9172 2.90909 12.5263 2.90909ZM10.3158 0H1.47368C1.08284 0 0.708001 0.153246 0.431632 0.426027C0.155263 0.698807 0 1.06878 0 1.45455V11.6364H1.47368V1.45455H10.3158V0Z"
                            fill="#000000"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No active coupons available.</p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-3/4 mx-auto px-2 mt-8 flex flex-col items-start justify-center">
            <h2 className="font-semibold text-sm lg:text-base mx-auto text-center">
              Terms & Conditions:
            </h2>
            <p className="text-xs mt-2">
              <strong>Expiration:</strong> Rewards will expire after a specified
              date, and unused rewards cannot be extended.
            </p>
            <p className="text-xs mt-2">
              <strong>Restrictions:</strong> Only one coupon or reward may be
              used per transaction, and fraudulent activities will result in
              disqualification.
            </p>
          </div>
          <div className=" flex justify-start absolute bottom-[125px] left-4 lg:bottom-8 lg:left-8">
            <img
              src={giftimg2}
              alt="Gift Icon"
              className="h-16 w-16 lg:h-28 lg:w-28"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 rounded-[60px] lg:rounded-[60px] bg-[#E4C1F9] p-6 relative flex flex-col">
          {/* Background Grid Images */}
          <div
            className="rounded-[60px] lg:rounded-[80px] overflow-hidden absolute inset-0 z-0 grid grid-cols-4 lg:grid-cols-5 gap-4"
            style={{ opacity: 0.1 }}
          >
            {Array.from({ length: 35 }).map((_, index) => (
              <img
                key={index}
                src={giftbackground}
                alt={`Gift ${index + 1}`}
                className="w-[50px] lg:w-[80px] -rotate-12 h-auto mx-auto"
              />
            ))}
          </div>

          {/* Close Button */}
          <button className="absolute top-4 lg:top-6 right-4 lg:right-6 p-2 rounded-full z-50">
            <svg
              onClick={handleexit}
              width="20"
              height="20"
              lg:width="28"
              lg:height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.3332 5.51675L22.4832 0.666748L13.9998 9.15008L5.5165 0.666748L0.666504 5.51675L9.14984 14.0001L0.666504 22.4834L5.5165 27.3334L13.9998 18.8498L22.4832 27.3334L27.3332 22.4834L18.8498 14.0001L27.3332 5.51675Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Toaster Notification */}
      {toasterMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg">
          {toasterMessage}
        </div>
      )}
    </div>
  );
};

export default CouponsRewards;
