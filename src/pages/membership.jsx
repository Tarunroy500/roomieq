import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosI } from "../axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../../utils/contextLogin";

function Membership() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const { userData } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [DiscountPercentage, setDiscountPercentage] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState({
    Standard: 100,
    Premium: 200,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userData) {
      setLoggedInUserData(userData);
      console.log(loggedInUserData);
    }
  }, [userData]);

  const handleSubmit = async (amt) => {
    try {
      if (isDiscounted) {
        amt = amt - (amt * DiscountPercentage) / 100;
      }

      // Send payment request to the backend
      const res = await axiosI.post("/payment", {
        amount: amt,
      });
      console.log(res);

      const options = {
        key: "rzp_test_LQzqvbK2cWMGRg", // Razorpay key
        amount: amt * 100, // Convert to paise
        currency: "INR",
        name: "RoomieQ",
        description: "Test Transaction",
        image: "http://localhost:5173/logo.jpeg",
        order_id: res.data.id, // Use the Order ID from backend
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;

          // Capture the Payment ID
          console.log("Payment ID:", paymentId); // Log the Payment ID

          // Send Payment ID to your backend for further processing
          await handleTransaction(amt, paymentId);
          alert("Payment done");
        },
        prefill: {
          email: loggedInUserData.email || "test@example.com", // Optional
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleTransaction = async (amount, paymentId) => {
    const membership = amount === 100 ? "Standard" : "Premium";
    const res = await axiosI.post("/create-transaction", {
      amount,
      membership,
      couponCode,
      paymentId: paymentId,
    });
    if (res.data) {
      navigate("/transaction");
    }
  };

  const handleCouponApply = async () => {
    if (!couponCode) {
      alert("Please enter a coupon code.");
      return;
    }

    try {
      // Call the API to get the user's coupon details
      const res = await axiosI.get(`/user-coupon/${couponCode}`);

      if (res.data.success) {
        if (res.data.coupon) {
          setIsDiscounted(true);
          setDiscountPercentage(res.data.coupon.discountPercentage);

          // Update discounted amounts
          setDiscountedAmount({
            Standard: 100 - (100 * res.data.coupon.discountPercentage) / 100,
            Premium: 200 - (200 * res.data.coupon.discountPercentage) / 100,
          });

          // Show success message
          setCouponMessage(
            `Coupon applied successfully! Discount: ${res.data.coupon.discountPercentage}%`
          );
        } else {
          setCouponMessage("No active coupon available.");
        }
      } else {
        setCouponMessage("Invalid coupon code or expired.");
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setCouponMessage(errorMessage);
    }
  };

  const renderButton = (amount, membershipType) => {
    const displayAmount = isDiscounted
      ? discountedAmount[membershipType]
      : amount;

    if (loggedInUserData.membership === membershipType) {
      return (
        <button className="buy-btn" disabled>
          Current Plan Active
        </button>
      );
    } else {
      return (
        <button className="buy-btn" onClick={() => handleSubmit(amount)}>
          Buy Now at {displayAmount}/- Only
        </button>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto bg-white py-10 px-4 font-poppins">
        <div className="membership-cnt">
          <div className="img-cnt">
            <img src="/1.svg" alt="Standard Plan" />
            {renderButton(100, "Standard")}
          </div>
          <div className="img-cnt">
            <img src="/2.svg" alt="Premium Plan" />
            {renderButton(200, "Premium")}
          </div>
        </div>

        {/* Adjusted Coupon Section */}
        <div className="mt-1 max-w-md ml-4 bg-white p-2">
          {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Apply Coupon Code
          </h2> */}
          <div className="flex items-center justify-between space-x-4">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              onClick={handleCouponApply}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p
              className={`mt-2 text-sm ${
                couponMessage.includes("Coupon applied successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {couponMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Membership;
