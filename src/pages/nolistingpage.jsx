import React from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/footer';
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";


function nolistingpage() {
  return (
    <div>
      <Navbar />
      <div className="pt-[290px] flex flex-col items-center text-center font-poppins">
        <p className="mb-10 text-lg sm:text-3xl font-poppins font-medium">You haven’t listed anything yet</p>
        <p className="mb-10 text-md sm:text-[23px]">
          Let’s list something <br />
          you want to sell
        </p>
        <button className="sm:h-[70px] sm:w-[230px] h-[40px] w-[160px] text-black rounded-[12px] border-[1px] border-black bg-gray-50 text-xl sm:text-2xl">
          Start Listing
        </button>
      </div>
      {/* Eighth Division  */}
      <div className="w-[1540px] h-[850px] relative bg-[#f8f8f8] max-w-screen mt-[170px] overflow-hidden">
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

export default nolistingpage;
