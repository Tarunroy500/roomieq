import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Close from "../assets/closeicon.svg"; // Ensure this path is correct
import { axiosI } from "../axios";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email; // Get the email from navigation state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    let validationErrors = {};

    // Validate password fields
    if (!password) validationErrors.password = "Password is required.";
    if (!confirmPassword)
      validationErrors.confirmPassword = "Confirm your password.";
    if (password && confirmPassword && password !== confirmPassword)
      validationErrors.match = "Passwords do not match.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const { data } = await axiosI.post("/reset-password", {
        email,
        password,
      });

      if (data.success) {
        toast.success("Password reset successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Failed to reset password. Try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 font-poppins">
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 w-[90%] sm:w-[500px] shadow-lg">
        {/* Close Button */}
        <Link to="/">
          <button className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
            <img src={Close} alt="Close" className="h-8 w-8" />
          </button>
        </Link>

        <h2 className="text-center text-2xl font-semibold mt-4">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mt-4">
          Enter your new password for <strong>{email}</strong>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {errors.match && (
              <p className="text-red-500 text-xs mt-1">{errors.match}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
