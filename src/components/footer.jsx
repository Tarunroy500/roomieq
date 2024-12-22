import FinalLogo from "../assets/FinalLogo.png";
import Google from "../assets/Google.png";
import App from "../assets/App.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 px-4 md:px-12 lg:px-16 font-poppins mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Company Info */}
        <div className="space-y-4 -mt-6">
          <img
            src={FinalLogo}
            alt="Logo"
            className="w-[150px] h-auto md:mx-0 -mb-5"
          />
          <p className="text-base leading-6">
            101, Shanti Aloknandan Behind TMT Bus Stop Shanti Nagar, Mira Road
            (E) Thane, 401107, Maharashtra
          </p>
          <p className="text-base font-medium mt-4">Info@saathraho.com</p>
          <div className="flex space-x-4 text-gray-500 text-lg md:hidden">
            <a href="#instagram" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#facebook" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#youtube" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#linkedin" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <button            
            className="bg-green-100 text-green-600 px-6 py-2 rounded-full shadow-md font-semibold hover:bg-green-200 transition-all"
          >
            <Link to="/contact">Contact Us</Link>
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 md:mb-6 lg:text-center">
            Quick Links
          </h4>
          <ul className="space-y-4 lg:text-center">
            <li>
              <Link to="/about" className="hover:text-green-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-green-600">
                Connect Us
              </Link>
            </li>
            <li>
              <Link to="/rent-agreement" className="hover:text-green-600">
                Rent Agreement
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="hover:text-green-600">
                Consultation
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-green-600">
                Our Blogs
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-green-600">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Major Cities */}
        <div>
          <h4 className="text-lg font-semibold mb-2 md:mb-6 lg:text-center">
            Major Cities
          </h4>
          <ul className="space-y-4 lg:text-center">
            <li>
              <a href="#mumbai" className="hover:text-green-600">
                Mumbai
              </a>
            </li>
            <li>
              <a href="#delhi" className="hover:text-green-600">
                Delhi
              </a>
            </li>
            <li>
              <a href="#bengaluru" className="hover:text-green-600">
                Bengaluru
              </a>
            </li>
            <li>
              <a href="#kolkata" className="hover:text-green-600">
                Kolkata
              </a>
            </li>
            <li>
              <a href="#indore" className="hover:text-green-600">
                Indore
              </a>
            </li>
            <li>
              <a href="#rajasthan" className="hover:text-green-600">
                Rajasthan
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-2 md:mb-6 lg:text-center">
            Services
          </h4>
          <ul className="space-y-4 lg:text-center">
            <li>
              <Link to="/roommates" className="hover:text-green-600">
                A Roommate
              </Link>
            </li>
            <li>
              <Link to="/offices" className="hover:text-green-600">
                Office&apos;s
              </Link>
            </li>
            <li>
              <Link to="/room" className="hover:text-green-600">
                Flat / Room Rent
              </Link>
            </li>
            <li>
              <Link to="/hostels" className="hover:text-green-600">
                Hostel / PG&apos;s
              </Link>
            </li>
            <li>
              <Link to="/bhojanalayas" className="hover:text-green-600">
                Bhojanalay&apos;s
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-green-600">
                Consultation
              </Link>
            </li>
            <li>
              <Link to="/membership" className="hover:text-green-600">
                Membership Plans
              </Link>
            </li>
          </ul>
        </div>

        {/* App & Social Links */}
        <div className="flex flex-col items-start md:items-center">
          <button className="bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-semibold shadow-md mb-8 hover:bg-purple-300">
            Download the App
          </button>
          <div className="flex flex-col gap-2 mb-2 md:mb-6">
            <img
              src={Google}
              alt="Google Play"
              className="w-[180px] sm:w-[180px] h-auto mb-4"
            />
            <img
              src={App}
              alt="App Store"
              className="w-[180px] sm:w-[180px] h-auto"
            />
          </div>
          <div className="hidden space-x-4 text-gray-500 text-lg md:flex">
            <a href="#instagram" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#facebook" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#youtube" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#linkedin" className="hover:text-gray-700">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-8 border-t border-gray-300 pt-6 text-sm flex flex-col md:flex-row justify-between xs:items-center">
        <p className="text-gray-500 text-sm lg:text-base opacity-50">
          &copy; 2024 saathraho.com. All Rights Reserved.
        </p>
        <div className="flex space-x-4 opacity-50 mt-4 md:mt-0">
          <Link
            to="/privacypolicy"
            className="hover:text-gray-700 lg:text-sm text-xs"
          >
            Privacy Policy
          </Link>
          <Link
            to="/termsandconditions"
            className="hover:text-gray-700 lg:text-sm text-xs"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/legalnotice"
            className="hover:text-gray-700 lg:text-sm text-xs"
          >
            Legal Notice
          </Link>
          <Link
            to="/support"
            className="hover:text-gray-700 lg:text-sm text-xs"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
