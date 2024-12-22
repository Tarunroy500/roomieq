import React, { useContext } from "react";
import Close from "../assets/closeicon.svg";
import Mid_Img from "../assets2/assets3/mid_img.png";
import Logo from "../assets/FinalLogo.png";
import T from "../assets/T.png";
import { AuthContext } from "../../utils/contextLogin";

function Profile() {
  const userData = useContext(AuthContext);
  console.log(userData);

  return (
    <div className="overflow-x-hidden">
      <div className="w-[400px] h-[700px] mt-[70px] relative bg-gradient-to-t from-[#fcf6bd] to-[#d0f4de] rounded-[20px] max-w-[410px] mx-auto mb-5">
        <img
          className="w-[98px] h-[31px] left-[230px] top-[-30px] absolute"
          src={T}
        />
        <img
          className="w-[40px] h-[35px] left-[21px] top-[38px] absolute"
          src={Logo}
        />
        <img
          className="w-[38px] h-[31px] left-[340px] top-[38px] absolute"
          src={Close}
        />
        <div className="w-[70px] h-[70px] p-[11.67px] left-[1524px] top-[49px] absolute justify-center items-center inline-flex" />
        <div className="w-10 h-10 p-[6.67px] left-[336px] top-[36px] absolute justify-center items-center inline-flex" />
        <div className="w-[150px] h-[150px] left-[33px] top-[109px] absolute bg-white rounded-full" />
        <div className="left-[249px] top-[150px] absolute text-black text-2xl font-normal font-['Poppins']">
          First Name
        </div>
        <div className="left-[230px] top-[100px] absolute text-black text-xl font-light font-['Poppins']">
          Hi !
        </div>
        <div className="left-[249px] top-[186px] absolute text-black text-2xl font-normal font-['Poppins']">
          Last Name
        </div>
        <div className="w-[342px] h-[0px] left-[33px] top-[292px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[341px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[392px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[442px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[492px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[542px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[592px] absolute opacity-20 border border-black"></div>
        <div className="w-[342px] h-[0px] left-[33px] top-[654px] absolute opacity-20 border border-black"></div>
        <div className="left-[274px] top-[262px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          {/* Edit Profile */}
          <input type="text" name="" id="" />
        </div>
        <div className="left-[277px] top-[308px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          My Listing
        </div>
        <div className="left-[265px] top-[359px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          My Wishlist
        </div>
        <div className="left-[174px] top-[412px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          Coupons & Rewards
        </div>
        <div className="left-[216px] top-[462px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          Request Refund
        </div>
        <div className="left-[258px] top-[512px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          Get the APP
        </div>

        <div className="left-[129px] top-[562px] absolute opacity-60 text-black text-xl font-light font-['Poppins']">
          Delete/ Remove Account
        </div>

        <div className="left-[303px] top-[609px] absolute opacity-70 text-[#ff0000] text-xl font-light font-['Poppins']">
          Logout
        </div>
        <img
          className="w-[50px] h-[74px] left-[180px] top-[63px] absolute"
          src={Mid_Img}
        />
      </div>
    </div>
  );
}

export default Profile;
