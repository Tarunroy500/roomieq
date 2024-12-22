import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/FinalLogo.png";
import triangle from "../assets/triangle.png";
// import { useAuth } from "../../utils/LoginContext";
import React from "react";
import { useAuth } from "../../utils/contextLogin";
import LoginComponent from "./login";
import CouponsRewards from "../pages/CouponsRewards";
import SideChat from "./SideChat";
import { axiosI } from "../axios";

function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userMembership, setUserMembership] = useState("");
  const [membershipExpiry, setMembershipExpiry] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const [listingsCount, setListingsCount] = useState(0);
  const { userData } = useAuth();
  // const { state } = useAuth();
  const [isLoggedin, setisLoggedin] = useState(
    localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (userData) {
      setUserMembership(userData.membership);
      setListingsCount(userData.listingsCount);
      setMembershipExpiry(userData.membershipExpiry);
    }
  }, [userData]);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosI.get("/logout");
      if (data.success) {
        console.log(data.message);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");

        setisLoggedin(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const handleIsOpen = () => {
    setisOpen(true);
    setDropdownOpen(false);
  };
  const handleNavigate = () => {
    navigate("/membership");
    setisOpen(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}

      <nav
        className={`fixed w-full z-[100] transition-shadow duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-[#D0F4DE]"
        }`}
      >
        {isOpen && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg
                          className="size-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold text-gray-900"
                          id="modal-title"
                        >
                          Free Listing Exhausted
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Your account has reached it's maximum limit of
                            listing.If you want to continue please buy any
                            membership plan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#a9ddf9] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-300 sm:ml-3 sm:w-auto"
                      onClick={handleNavigate}
                    >
                      Buy Membership
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setisOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mx-auto flex items-center justify-between px-2 sm:px-4 lg:px-6 h-[70px] sm:h-[90px] lg:h-[110px]">
          {/* Logo */}
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-[100px] h-[80px] sm:w-[120px] sm:h-[90px] lg:w-[160px] lg:h-[110px]"
            />
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {(userMembership === "Free" && listingsCount >= 1) ||
            membershipExpiry ? (
              <button
                onClick={handleIsOpen}
                className="btn bg-[#FCF6BD] shadow-md border-b-4 border-slate-300 py-1 px-2 sm:py-2 sm:px-6 rounded-full"
              >
                <span className="text-black text-xs sm:text-base lg:text-lg">
                  Add Listing
                </span>
              </button>
            ) : (
              <Link to="/addlisting">
                <button className="btn bg-[#FCF6BD] shadow-md border-b-4 border-slate-300 py-1 px-2 sm:py-2 sm:px-6 rounded-full">
                  <span className="text-black text-xs sm:text-base lg:text-lg">
                    Add Listing
                  </span>
                </button>
              </Link>
            )}

            {isLoggedin ? (
              <ProfileDropdown
                isOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
                handleLogout={handleLogout}
                userData={userData}
              />
            ) : (
              <>
                <label
                  htmlFor="login_modal"
                  className="btn bg-[#A9DEF9] shadow-md border-b-4 border-slate-300 py-2 px-6 rounded-full text-sm sm:text-lg lg:text-xl"
                >
                  Login
                </label>
                <input
                  type="checkbox"
                  id="login_modal"
                  className="modal-toggle"
                />
                <div className="modal !m-0">
                  <div className="modal-box ">
                    <LoginComponent />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {/* {isLoginVisible && <LoginComponent setLoginVisible={setLoginVisible} />} */}
    </div>
  );
}
const ProfilePopup = ({ closePopup }) => {
  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all duration-500 scale-105 hover:scale-100 text-center max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          You need to download our app to edit the profile.
        </h2>
        <div className="space-x-6">
          <button
            onClick={closePopup}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 px-6 rounded-md hover:bg-gradient-to-l transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// eslint-disable-next-line react/prop-types
const ProfileDropdown = ({
  userData,
  isOpen,
  toggleDropdown,
  handleLogout,
}) => {
  const [coupon, setCoupon] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);  // Add state for the profile popup

  const handlecoupon = () => {
    setCoupon(true);
    console.log("Coupon", coupon);
  };

  const openProfilePopup = () => {
    console.log("Open Profile Popup");
    
    setProfilePopupOpen(true);
    toggleDropdown();  // Close the dropdown when the popup is open
  };

  const closeProfilePopup = () => {
    setProfilePopupOpen(false);
  };

  return (
    <div className="relative">
      <SideChat />
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-14 right-0 lg:-right-4 mt-2 bg-gradient-to-b from-[#e2f4c9] to-[#F5FABF] rounded-lg shadow-lg w-[250px] sm:w-[300px]">
          <img
            src={triangle}
            className="absolute mix-blend-multiply z-[-1] top-[-10px] w-10 right-0 lg:right-4"
            alt=""
          />
          <div className="p-4 flex flex-col space-y-3 relative z-50">
            <div className="flex items-center justify-between">
              <img src={Logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <button
                onClick={toggleDropdown}
                className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-500"
              >
                &times;
              </button>
            </div>
            <p className="flex items-center justify-center text-sm sm:text-lg lg:text-xl font-medium text-gray-700">
              Hi!
            </p>
            <div className="flex justify-between items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="profile image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-sm text-wrap sm:text-lg lg:text-xl font-medium text-black">
                  {userData.name}
                </h2>
              </div>
            </div>
            <ul className="flex flex-col items-end space-y-2 text-gray-700">
              <li className="border-b pb-2">
                <Link onClick={openProfilePopup}>Edit Profile</Link>
              </li>
              <li className="border-b pb-2">
                <Link to="/mylisting">My Listing</Link>
              </li>
              <li className="border-b pb-2">
                <Link to="/wishlist">My Wishlist</Link>
              </li>
              <li className="border-b pb-2">
                <Link onClick={handlecoupon}>Coupons & Rewards</Link>
              </li>
              <li className="border-b pb-2">
                <Link>Request Refund</Link>
              </li>
              <li className="border-b pb-2">
                <Link>Get the APP</Link>
              </li>
              <li className="border-b pb-2">
                <Link>Delete/Remove Account</Link>
              </li>
              <li className="border-b pb-2">
                <Link onClick={handleLogout} className="text-red-500">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {coupon && <CouponsRewards setCoupon={setCoupon} />}

      {/* Show Profile Popup */}
      {isProfilePopupOpen && <ProfilePopup closePopup={closeProfilePopup} />}
    </div>
  );
};



export default Navbar;
