import React, { useState, useEffect } from 'react';
import s from "../assets/spage.svg";
import Logo from "../assets/FinalLogo.png"; // Make sure this path is correct
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import Navbar from '../components/Navbar';


function CareerPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the window is scrolled down
      setIsScrolled(window.scrollY > 0);
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
      <Navbar/>

      {/* Main Content with Image */}
      <div>
        <img src={s} alt="About Us" className="h-full w-full" />
      </div>

      {/* Eighth Division  */}
      <div className="w-[1540px] h-[850px] relative bg-[#f8f8f8] max-w-screen">
        <div className="sm:left-[102px] sm:top-[230px] sm:absolute sm:text-black sm:text-4xl sm:font-medium sm:font-['Poppins'] font-poppins left-[65px] top-[360px] text-[30px] relative">
          Connect with us
          <br />
          <span className="sm:relative relative sm:left-[0px] left-[-30px]">
            from anywhere you{" "}
            <span className="sm:top-[0px] top-[40px] relative sm:relative sm:left-[0px] left-[-180px]">
              want
            </span>
          </span>
        </div>
        <div className="sm:left-[102px] sm:top-[337px] absolute sm:absolute text-black sm:text-[25px] font-light font-['Poppins'] text-[25px] top-[550px] left-[26px]">
          Download our app to get{" "}
          <span className="absolute top-[50px] sm:relative sm:top-[0px] sm:left-[0px] left-[10px]">
            a Rampage Experience
          </span>
        </div>
        <img
          className="sm:w-[887px] sm:h-[753px] sm:left-[706px] sm:top-[43px] sm:absolute absolute w-[500px] h-[600px] left-[-120px] top-[-240px]"
          src={SecondPhone}
        />
        <button>
          <img
            className="sm:w-[345px] w-[180px] h-[180px] sm:h-[206px] sm:left-[62px] relative top-[560px] left-[10px] sm:top-[425px] sm:absolute sm:hover:w-[352px] sm:hover:h-[214px] "
            src={GooglePlay}
          />
        </button>
        <button>
          <img
            className=" sm:w-[343px] w-[180px] sm:h-[280px] h-[180px] sm:left-[378px] left-[8px] sm:top-[384px]  top-[560px]  relative sm:hover:w-[360px] sm:hover:h-[290px]"
            src={AppStore}
          />
        </button>
      </div>
      
      <Footer/>
    </div>
  );
}

export default CareerPage;
