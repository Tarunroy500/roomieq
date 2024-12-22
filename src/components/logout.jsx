import React from "react";
import right from "../assets2/assets3/Multiply.png";
import Box from "../assets2/assets3/Box.png";

function Logout() {
  return (
    <div className="h-screen w-screen bg-slate-200 flex items-center justify-center font-poppins">
      <div className="bg-white w-[500px] h-[280px]  rounded-[30px]">
        {/* Add your logout content here */}
        <h1 className="font-semibold text-[40px] mt-[20px] ml-[30px]">
          Logout?
        </h1>
        <p className="text-[20px] font-extralight text-black mt-5 ml-[30px]">
          Are you sure you want to LOGOUT?
        </p>
        <button>
          <img
            src={right}
            alt=""
            className="h-10 w-10 ml-[430px] mt-[-120px]"
          />
        </button>
        <div className="flex mt-[20px]">
          <button className="text-[25px] font-light">
            <img src={Box} alt="" className="h-[60px] w-[170px] ml-8" />
            <p className="relative top-[-50px] left-[20px]">Logout</p>
          </button>
          <button className="text-[25px] font-light">
            <img src={Box} alt="" className="h-[60px] w-[170px] ml-[90px]" />
            <p className="relative top-[-50px] left-11">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
