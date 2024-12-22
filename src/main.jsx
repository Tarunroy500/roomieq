import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../utils/contextLogin.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListingProvider } from "../utils/ListingContext.jsx";
import { LocationProvider } from "../utils/LocationContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LocationProvider>
        <ListingProvider>
          <App />
        </ListingProvider>
      </LocationProvider>
    </GoogleOAuthProvider>
    <ToastContainer />
  </AuthProvider>
);
