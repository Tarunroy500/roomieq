import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Cat from "./pages/categorypage";
import Cat1 from "./pages/categorypagebefore";
import Home from "./pages/home";
import Testing from "./pages/nolistingpage";
// import Cat2 from "./pages/categorypageafter";
import OTP1 from "./pages/otp";
// import OTP2 from "./pages/otp2";
import AboutUs from "./pages/aboutus";
import BlogPage from "./pages/blogpage";
import BlogSubPage from "./pages/blogsubpage";
import CareerWithUS from "./pages/careerpage";
import CityPage from "./pages/finalcitypage";
import WishList from "./pages/finalwishlist";
import Membership from "./pages/membership";
import Profile from "./pages/profile";
import RoomListingForm from "./pages/roomlistingform";
import RoomListingPage from "./pages/roomlistingpage";
// import PrivacyPolicy from "./pages/privacypolicy";
import "./App.css";
import DltAcc from "./components/DltAcc";
import Logout from "./components/logout";
import AddListing from "./pages/addlisting";
import BhojnalayForm from "./pages/bhojnalayform";
import BhojnalaySubPage from "./pages/bhojnalaysubpage";
import Chatpage from "./pages/chatpage";
import HostelListingForm from "./pages/hostellistingform";
import HostelListingPage from "./pages/hostellistingpage";
import LegalNotice from "./pages/legalnotice";
import Loader from "./pages/loader";
import Notfoundpage from "./pages/notfoundpage";
import OfficeListingForm from "./pages/officelistingform";
import OfficeListingPage from "./pages/officelistingpage";
import RoomMateForm from "./pages/roommateform";
import RoomMateListing from "./pages/roommatelisting";
import Support from "./pages/supportpage";
import TermsCondition from "./pages/termscondition";
import MyListing from "./pages/mylisitngpage";

import LoginForm from "./components/loginpage";
// import ChatRoom from "./components/ChatRoom";
import { useEffect } from "react";
import { useAuthStore } from "../utils/useAuthStore";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import BhojnalayasPage from "./pages/bhojanalayAll";
import HostelsPage from "./pages/hostelAll";
import OfficePage from "./pages/officeAll";
import RoommatesPage from "./pages/roommateAll";
import RoomsPage from "./pages/roomsAll";
import Transaction from "./pages/Transaction";

// import Cards from "./components/cards";

export default function App() {
  const { checkAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/testing" element={<Testing />} />
        <Route path="/" element={<Home />} />
        <Route path="/addrooms" element={<RoomListingForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/addroommate" element={<RoomMateForm />} />
        <Route path="/addhostel" element={<HostelListingForm />} />
        <Route path="/addbhojanalay" element={<BhojnalayForm />} />
        <Route path="/addoffice" element={<OfficeListingForm />} />
        <Route path="/bhojnalaya/:id" element={<BhojnalaySubPage />} />
        <Route path="/bhojanalayas" element={<BhojnalayasPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogSubPage />} />
        <Route path="/cat1" element={<Cat1 />} />
        <Route path="/cat" element={<Cat />} />
        <Route path="/citypage" element={<CityPage />} />
        <Route path="/career" element={<CareerWithUS />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/deleteaccount" element={<DltAcc />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/hostel/:id" element={<HostelListingPage />} />
        <Route path="/hostels" element={<HostelsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/legalnotice" element={<LegalNotice />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/mylisting" element={<MyListing />} />
        <Route path="/notfoundpage" element={<Notfoundpage />} />
        <Route path="/otp1" element={<OTP1 />} />
        <Route path="/office/:id" element={<OfficeListingPage />} />
        <Route path="/offices" element={<OfficePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/:id" element={<RoomListingPage />} />
        <Route path="/room" element={<RoomsPage />} />
        <Route path="/roommates" element={<RoommatesPage />} />
        <Route path="/roommate/:id" element={<RoomMateListing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />
        <Route path="/termsandconditions" element={<TermsCondition />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/wishlist" element={<WishList />} />

        {/* <Route path="/cat2" element={<Cat2 />} /> */}
        {/* <Route path="/otp2" element={<OTP2 />} /> */}
        {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}
        {/* <Route path="/Bot" element={<Bot />} /> */}

        {/* <Route path="/cards" element={<Cards />} /> */}
      </Routes>
    </Router>
  );
}
