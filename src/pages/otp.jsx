import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Close from "../assets/closeicon.svg";
import Logo from "../assets/FinalLogo.png";
import { toast } from "react-toastify";
import { axiosI } from "../axios";

const OTP1 = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(60);
  const [resendAvailable, setResendAvailable] = useState(false);
  const otpRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { fullName, email, password, phoneNo } = location.state || {};
  const [isForgetPassword, setIsForgetPassword] = useState(
    location.state.forgot
  );
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (element.value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }

    // Move focus to the previous input field
    if (!element.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosI.post("/verify-otp", {
        email,
        otp: otp.join(""),
      });

      if (response.data) {
        toast.success("OTP verified successfully!");
        localStorage.setItem("user", response.data.user.uid);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/"); // Navigate to the home page after successful OTP verification
      } else {
        toast.error("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      setOtp(new Array(5).fill("")); // Clear OTP input fields
      setTimer(60); // Reset the timer
      setResendAvailable(false); // Disable resend button temporarily

      const { data } = await axiosI.post("/resend-otp", { email });

      if (data.success) {
        toast.success("A new OTP has been sent to your email!");
        document.querySelector("input").focus(); // Focus on the first input field
      }

      toast.error(data.message || "Failed to resend OTP. Please try again.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(
        "An error occurred while resending the OTP. Please try again later."
      );
    }
  };

  const handleVerifyForgetPassword = async () => {
    try {
      const response = await axiosI.post("/verify-forgot-password", {
        email,
        otp: otp.join(""),
      });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        navigate("/changePassword", { state: { email } }); // Navigate to reset password page
      } else {
        toast.error("Invalid OTP, please try again.");
        setOtp(new Array(5).fill("")); // Clear OTP inputs
        otpRefs.current[0].focus(); // Focus on the first OTP input field
      }
    } catch (error) {
      toast.error("Internal server error. Please try again later.");
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) setResendAvailable(true);

    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 font-poppins">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] sm:w-[500px] shadow-lg">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <button onClick={() => navigate("/login")}>
            <img src={Close} alt="Close" className="h-8 w-8" />
          </button>
        </div>

        <h2 className="text-center text-2xl font-semibold mt-4">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 mt-4">
          Check your email for the OTP
        </p>

        <div className="flex justify-center gap-4 my-6">
          {otp.map((data, index) => (
            <input
              ref={(el) => (otpRefs.current[index] = el)}
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 border text-center rounded-md text-xl"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <button
          className="w-full bg-purple-500 text-white py-2 rounded-md"
          onClick={() => {
            if (isForgetPassword) {
              handleVerifyForgetPassword();
            } else {
              handleSubmit();
            }
          }}
        >
          Submit OTP
        </button>

        <div className="text-center mt-6">
          <p>
            {timer > 0
              ? `Resend available in 00:${timer < 10 ? `0${timer}` : timer}`
              : "Resend available now"}
          </p>
          <button
            className={`font-medium ${
              resendAvailable ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={handleResend}
            disabled={!resendAvailable}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP1;
