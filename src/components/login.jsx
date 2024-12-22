import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Close from "../assets/closeicon.svg";
import Logo from "../assets/Logo.svg";
import { axiosI } from "../axios";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
// import { useAuth } from "../../utils/LoginContext";

const Login = ({ setLoginVisible }) => {
  const navigate = useNavigate();
  // useEffect(()=>{
  // 	if(localStorage.getItem("isLoggedIn")){
  // 		navigate("/home");
  // 	}else{
  // 		navigate("/login");
  // 	}
  // },[]);
  // const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const backendUrl = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axiosI.post("/login", formData);

      if (response.status === 200) {
        setSuccess("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        // dispatch({ type: "LOGIN" });
        if (response.data.user.uid) {
          localStorage.setItem("user", response.data.user.uid);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
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

  return (
    <div>
      <label
        // onClick={closeModal}
        htmlFor="login_modal"
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
      >
        <img src={Close} alt="Close" className="h-6 w-6" />
      </label>

      <div className="text-center mb-6">
        <img src={Logo} alt="Logo" className="mx-auto w-12 h-12" />
        <h2 className="text-2xl font-semibold mt-2">Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            By tapping Login, you accept our{" "}
            <span className="underline">Terms</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={() => login()}
          type="button"
          className="w-full flex items-center justify-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Register
          </Link>
        </p>
      </div>

      <div className="text-center text-sm mt-4">
        <Link to="/forgotpassword" className="text-purple-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
