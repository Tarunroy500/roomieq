import GridCardLike from '../components/CardLike';
import Cat1 from '../pages/categorypagebefore';
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import Navbar from "../components/Navbar";



function CategoryPage() {
  return (
    <>
      <Navbar />
      <div className='mb-[20px]'>
        <Cat1/>
        <div className='bg-black mx-auto w-[85%] sm:w-[94%] h-[1px] ml-[6] mt-3'></div>
      </div>
      <div className='px-4'>
      <GridCardLike />
      </div>
      <div className='w-full text-center'>
      <button className="mt-[40px] bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]">
          View More Properties...
        </button>
      </div>

        {/* Eighth Division  */}
  <div className="bg-[#f8f8f8] flex flex-col items-center justify-center py-12 px-4 sm:px-8 lg:flex-row lg:py-16">
  {/* Left Section: Text Content */}
  <div className="flex flex-col space-y-6 text-center lg:text-left lg:max-w-md">
    <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-medium font-poppins">
      Connect with us
      <br />
      <span>from anywhere you want</span>
    </h2>
    <p className="text-black text-lg sm:text-xl font-light">
      Download our app to get{" "}
      <span className="font-semibold">a Rampage Experience</span>
    </p>
    {/* App Download Buttons */}
    <div className="flex !-mt-4 sm:space-x-4 space-y-4 sm:space-y-0 items-center justify-center lg:justify-start">
      <button>
        <img
          className="w-36 sm:w-44 lg:w-48 transition-transform hover:scale-105"
          src={GooglePlay}
          alt="Download on Google Play"
        />
      </button>
      <button>
        <img
          className="w-36 -mt-5 sm:mt-0 sm:w-44 lg:w-48 transition-transform hover:scale-105"
          src={AppStore}
          alt="Download on App Store"
        />
      </button>
    </div>
  </div>

  {/* Right Section: Phone Image */}
  <div className="">
    <img
      className="w-64 sm:w-80 lg:w-[35rem] mx-auto"
      src={SecondPhone}
      alt="App Preview on Phone"
    />
  </div>
</div>

      
      <Footer/>
    </>
  );
}

export default CategoryPage;
