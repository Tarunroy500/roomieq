import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/FinalLogo.png";
import Close from "../assets/closeicon.svg";
import { axiosI } from "../axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    }

    try {
      setloader(true);
      const { data } = await axiosI.post("/forget-password", {
        email,
      });

      if (data.message.includes("OTP sent to your email")) {
        toast.success(data.message);
        navigate("/otp1", { state: { email, forgot: true } });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setloader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center font-poppins">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md h-full relative flex flex-col">
        <Link to="/">
          <button className="absolute right-9 top-10 text-gray-400 hover:text-gray-600">
            <img src={Close} alt="" className="h-8 w-8" />
          </button>
        </Link>
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl md:text-3xl ml-[-50px] font-semibold flex-grow text-center">
            Forgot Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="text-[10px] text-gray-500 ml-[10px] relative top-1">
              Enter your email address, and we'll send you a link to reset your
              password.
            </p>
          </div>
          <div className="space-y-4">
            {loader ? (
              <button
                disabled
                className="w-full py-2 bg-[#E4C1F9] text-purple-700 rounded-lg hover:bg-purple-300 transition-colors text-sm font-medium relative top-4 h-10"
              >
                Sending OTP...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-[#E4C1F9] text-purple-700 rounded-lg hover:bg-purple-300 transition-colors text-sm font-medium relative top-4 h-10"
              >
                Send Reset OTP
              </button>
            )}
            <div className="h-[1px] w-full bg-slate-200 relative top-4"></div>
            <div className="ml-[10px]">
              <span className="sm:text-xs text-[10px] text-gray-500 font-light">
                Remember your password?{" "}
              </span>
              <Link
                to="/login"
                className="sm:text-xs text-[10px] text-gray-700 "
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
