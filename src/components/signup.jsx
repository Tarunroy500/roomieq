import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Close from "../assets/closeicon.svg";
import Logo from "../assets/FinalLogo.png";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { axiosI } from "../axios";

const SignupForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({ name: "", email: "" });

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
        setUser({ name, email });

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
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    // Full Name validation
    if (!formData.name) {
      newErrors.name = "Full Name is required";
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    // Phone No validation
    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone Number must be 10 digits";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If validation fails, do not send OTP

    try {
      const { data } = await axiosI.post("/signup", formData);

      if (data) {
        toast.success(data.message);
        navigate("/otp1", { state: formData, forgot: false });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      // Show error message from backend in a toast
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    }
  };
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center font-poppins">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md  relative flex flex-col">
        {/* Close button */}
        {/* <Link to="/">
          <button className="absolute right-9 top-10 text-gray-400 hover:text-gray-600">
            <img src={Close} alt="" className="h-8 w-8" />
          </button>
        </Link> */}

        {/* Logo and Title */}
        <div className="flex items-center gap-1 mb-6 flex-col">
          <img src={Logo} alt="Logo" className="w-32" />
          <h1 className="text-2xl md:text-3xl font-semibold flex-grow text-center">
            Sign-up
          </h1>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={sendOtp}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

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

            <div>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone No"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-md"
                value={formData.phoneNo}
                onChange={handleChange}
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-xs">{errors.phoneNo}</p>
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
              By Tapping create account, you accept Saath Raho&apos;s terms &{" "}
              <br />
              conditions, legal notice, and privacy policy.
            </p>
          </div>

          <div className="space-y-4">
            {/* Buttons */}
            <button
              type="submit"
              // Call sendOtp on button click
              className="w-full py-2 bg-[#E4C1F9] text-purple-700 rounded-lg hover:bg-purple-300 transition-colors text-sm font-medium relative top-4 h-10"
            >
              Send OTP
            </button>

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
              Sign in with Google{" "}
            </button>

            <div className="h-[1px] w-full bg-slate-200 relative top-4"></div>

            {/* Login Link */}
            <div className="ml-[10px]">
              <span className="sm:text-xs text-[10px] text-gray-500 font-light">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="sm:text-xs text-[10px] text-gray-700 "
              >
                Login
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

export default SignupForm;
