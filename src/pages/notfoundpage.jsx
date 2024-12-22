import React from "react";
import Navbar from "../components/Navbar";
import notfound from "../assets/notfound.svg";
import { useNavigate } from "react-router-dom";

function notfoundpage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="h-[900px]">
        <img
          src={notfound}
          alt=""
          className="w-[80%] h-[60%] mx-auto pt-[170px]"
        />
        <div className="flex items-center justify-center">
          <button
            className="h-[60px] w-[250px] bg-[#E4C1F9] rounded-[50px] font-poppins font-normal mt-[50px]"
            onClick={() => navigate("/home")}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </>
  );
}

export default notfoundpage;
