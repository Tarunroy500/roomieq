import React from "react";
import Navbar from "../components/Navbar";
import loader from "../assets/loading.gif";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
    

      <div className="h-[900px]">
        <img
          src={loader}
          alt="Loading..."
          className="w-[11%] h-[30%] mx-auto pt-[200px] relative top-[90px]"
        />
      </div>
    </>
  );
}

export default NotFoundPage;
