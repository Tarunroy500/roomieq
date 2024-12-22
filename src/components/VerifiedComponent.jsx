import React from 'react'
import Right from "../assets/Right.svg";

const VerifiedComponent = ({verified}) => {
    return (
     <>
      {verified ? (
        <div className="bg-blue-700  p-1 w-5 h-5 md:w-8 md:h-8 cursor-pointer rounded-full flex justify-center items-center ">
          <img
            src={Right}
            alt=""
            className="w-full h-full object-contain invert"
          />
        </div>
      ) : null}
     </>
  )
}

export default VerifiedComponent