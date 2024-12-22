import React, { useState, useEffect } from 'react';
import aboutus from "../assets/aboutus.svg";
import Logo from "../assets/FinalLogo.png"; // Replace with the correct path to your logo image
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import Navbar from '../components/Navbar';
import DownloadPromo from '../components/DownloadPromo';
import SideChat from '../components/SideChat';

const AboutUsComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the window is scrolled down
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Placeholder function for the login button
  const handleLoginClick = () => {
    console.log("Log-in button clicked");
  };

  return (
    <div className="sm:h-[1600px] h-[1200px] relative bg-white">
      {/* Header with Logo and Buttons */}
      <Navbar/>      
      {/* Main Content with About Us Image */}
      <div>
        <img src={aboutus} alt="About Us" className="h-full w-full sm:pt-0 pt-11 " />
      </div>
      

      {/* Eighth Division  */}
      <DownloadPromo/>

      <Footer/>
    </div>
  );
};

export default AboutUsComponent;
