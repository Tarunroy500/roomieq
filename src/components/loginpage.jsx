import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/FinalLogo.png";
import { useGoogleLogin } from "@react-oauth/google";

import { toast } from "react-toastify";

import axios from "axios";
import { axiosI } from "../axios";

const LoginForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const { name, email } = res.data;

        const { data } = await axiosI.post("/google-login", {
          name,
          email,
        });

        if (data.success) {
          console.log("User successfully created/verified:", data.user);

          // Store login state and UID in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", data.user.uid);

          // Navigate to the home page
          location.reload();
        } else {
          console.error("Error:", data.message || "An error occurred");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const validateForm = () => {
    const newErrors = {};
    // Full Name validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axiosI.post("/login", formData);

      if (!data.success) {
        setErrors({ sub: data.message });
        return;
      }

      setSuccess("Login successful!");

      toast.success("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      // dispatch({ type: "LOGIN" });

      if (data.user?.uid) {
        localStorage.setItem("user", data.user.uid);
      }

      setTimeout(() => {
        navigate("/", { state: { email: formData.email } });
      }, 1000);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center font-poppins">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md h-full relative flex flex-col">
        {/* Logo and Title */}
        <div className="flex items-center gap-1 mb-6 flex-col">
          <img src={Logo} alt="Logo" className="w-32" />
          <h1 className="text-2xl md:text-3xl font-semibold flex-grow text-center">
            Login
          </h1>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Terms Text */}
            <p className="text-[10px] text-gray-500 ml-[10px] relative top-1">
              By Tapping login, you accept terms & conditions, legal notice, and
              privacy policy.
            </p>
          </div>

          <div className="space-y-4">
            {/* Buttons */}
            <button
              type="submit"
              className="w-full py-2 bg-[#E4C1F9] text-purple-700 rounded-lg hover:bg-purple-300 transition-colors text-sm font-medium relative top-4 h-10"
            >
              Login
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs my-1">{errors.sub}</p>
            )}
            {success && (
              <p className="text-green-500 text-xs my-1">{success}</p>
            )}
            <div className="flex items-center gap-2 my-2 relative top-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              onClick={() => login()}
              type="button"
              className="w-full py-2 bg-[#E4C1F9] text-purple-700 rounded-lg hover:bg-purple-300 transition-colors flex items-center justify-center gap-2 text-sm font-medium relative top-4 h-10"
            >
              <img
                src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google logo"
                className="w-6 h-6"
              />
              Sign in with Google
            </button>

            <div className="h-[1px] w-full bg-slate-200 relative top-4"></div>

            {/* Login Link */}
            <div className="ml-[10px]">
              <span className="sm:text-xs text-[10px] text-gray-500 font-light">
                Create an account?{" "}
              </span>
              <Link
                to="/signup"
                className="sm:text-xs text-[10px] text-gray-700 "
              >
                Signup
              </Link>
              <Link to="/forgotPassword">
                <div className="sm:text-xs text-[10px] text-gray-500 font-light relative sm:right-[-265px] right-[-207px] top-[-17px]">
                  Forgot Password?
                </div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
