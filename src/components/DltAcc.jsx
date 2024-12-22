import React, { useState } from 'react';
// import { TrashIcon } from '@heroicons/react/24/solid';
import line from "../assets/delete.png";

function DeleteAccountModal() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-200 flex items-center justify-center font-poppins">
      <div className="bg-white w-[500px] h-[400px] rounded-[20px] p-8 shadow-lg flex flex-col items-center">
        {/* Title and Icon */}
        <h2 className=" text-xl  relative left-[-117px] top-4 font-light text-gray-600">Are you sure want to</h2>
        <h1 className=" text-[30px] font-bold mt-1 relative left-[-96px] top-3">Delete Account?</h1>
        
        {/* Icon */}
        <div className="mt-4 relative left-[160px]">
          {/* <TrashIcon className="w-20 h-20 text-red-500" /> */}
          <img src={line} alt="" className="w-[200px] h-[150px] text-red-500 relative top-[-120px]" />
          
        </div>

        {/* Warning Text */}
        <p className="text-center mt-[-120px] text-gray-800 ml-[-140px] mb-5  ">
          All the data and purchases related to <br /> <span className='relative left-6'>xyz@gmail.com will be permanently delete.</span>
        </p>

        {/* Checkbox */}
        <div className="flex items-start mt-4 w-full">
          <input 
            type="checkbox" 
            className="mt-[3px] mr-2 h-6 w-6 ml-4" 
            checked={isChecked} 
            onChange={() => setIsChecked(!isChecked)} 
          />
          <label className="text-sm text-gray-600 ml-2">
            I understand, that deleted account is not able to get <br /> recovered once it got deleted.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-[150px] mt-9">
          <button 
            className="px-8 relative left-6 py-2 rounded-full border-2 border-gray-400 text-gray-700 text-[22px] w-[170px]"
            style={{ fontWeight: 'semibold' }}
          >
            Delete
          </button>
          <button 
            className="px-8 py-2 rounded-full border-2 relative right-6 border-gray-400 text-gray-700 text-[22px] w-[170px]"
            style={{ fontWeight: 'semibold' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
