import GridCardLike from "../components/CardLike";
import Category from "../assets/Category.svg";
import House from "../assets/House.svg";
import Filter from "../assets/filter.png";
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { axiosI } from "../axios";
import { useLocation } from "../../utils/LocationContext";


function HostelsPage() {
  const [HostelsList, setHostelsList] = useState([]);
  const [filteredHostelsList, setFilteredHostelsList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { userLocation, fetchLocation } = useLocation();
  useEffect(() => {
    fetchLocation();
  }, []);

    useEffect(() => {
      // Fetch hostels
      axiosI
        .get("/hostels", {
          params: {
            filter,
            lat: userLocation?.lat,
            lng: userLocation?.lng,
          },
        })
        .then((res) => {
          setHostelsList(res.data);
          console.log("Hostel List: ", res.data);
          setLoading(false);
        });
    
      // Fetch wishlist items
      axiosI.get("/wishlist").then((res) => {
        setWishlist(Array.isArray(res.data.itemIds) ? res.data.itemIds : []);
      });
    }, [filter, userLocation]);

  const toggleWishlist = (id) => {
    console.log("Toggling wishlist for: ", id);
    
    const isWishlisted = wishlist.includes(id);
    console.log("isWishlisted: ", isWishlisted);
    
    axiosI
      .post("/wishlist/toggle", { itemId: id ,itemType: "Hostel"})
      .then((res) => {
        if (isWishlisted) {
          setWishlist((prev) => prev.filter((item) => item !== id));
        } else {
          setWishlist((prev) => [...prev, id]);
        }
      })
      .catch((err) => {
        console.error("Error toggling wishlist: ", err);
      });
  };


  // useEffect(() => {
  //   const filtered = HostelsList.filter((hostel) => {
  //     return (
  //       hostel.hostelName.toLowerCase().includes(filter.toLowerCase()) ||
  //       hostel.location.toLowerCase().includes(filter.toLowerCase())
  //     );
  //   });
  //   const sorted = filtered.sort((a, b) => {
  //     if (b.uid.isFeatureListing && !a.uid.isFeatureListing) return 1;
  //     if (a.uid.isFeatureListing && !b.uid.isFeatureListing) return -1;
  //     return 0;
  //   });
  //   setFilteredHostelsList(sorted);
  // }, [filter, HostelsList]);
  console.log(HostelsList);
  
  return (
    <>
      <Navbar />
      <div className="mb-[20px]">
        <div className="relative bg-white overflow-hidden h-auto pt-8">
          {/* Background Houses */}
          <img
            className="absolute top-5 sm:top-10 right-0 w-[120px] sm:w-[237px] h-[200px] sm:h-[400px] opacity-80"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute bottom-0 left-0 w-[140px] sm:w-[270px] h-[210px] sm:h-[610px] opacity-50"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute bottom-0 right-10 w-[150px] sm:w-[250px] h-[200px] sm:h-[420px] opacity-70"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute top-[25%] sm:top-[20%] right-[15%] w-[160px] sm:w-[277px] h-[180px] sm:h-[284px] opacity-70"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute top-[30%] sm:top-[25%] left-[10%] w-[170px] sm:w-[250px] h-[200px] sm:h-[404px] opacity-50"
            src={House}
            alt="Decorative House"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-32 space-y-6">
            <h1 className="text-2xl sm:text-5xl font-bold font-poppins text-black">
              Hostels
            </h1>
            <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
              Find the perfect hostels for you
            </p>
            <img
              className="w-[100px] sm:w-[171px] h-[140px] sm:h-[340px] opacity-90 mt-4"
              src={Category}
              alt="Category Icon"
            />
          </div>

          {/* Footer Section */}
          <div className="relative z-50 -mt-20 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 py-8 space-y-4 sm:space-y-0">
            <p className="text-sm sm:text-lg font-poppins text-gray-600">
              Home \ Hostels
            </p>
            <div className="flex items-center w-full sm:w-[350px] bg-white border border-black shadow-md rounded-full px-4 py-2">
              <img
                src={Filter}
                alt="Filter Icon"
                className="h-5 sm:h-6 w-5 sm:w-6"
              />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter by name, location..."
                className="w-full bg-transparent focus:outline-none placeholder-gray-500 ml-2"
              />
            </div>
          </div>
        </div>
        <div className="bg-black mx-auto w-[85%] sm:w-[94%] h-[1px] ml-[6] mt-3"></div>
      </div>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          <div className="px-4">
            <div className="font-poppins py-6">
              {/* Grid Container */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {HostelsList.map((hostel, index) => (
                  <div key={index}>
                    <GridCardLike
                      title={hostel?.hostelName}
                      desc={hostel?.description}
                      img={hostel?.images[0]}
                      price={hostel?.rent}
                      location={hostel?.location}
                      link={`/Hostel/${hostel?._id}`}
                      verified={hostel?.uid?.verified}
                      isFeatureListing={hostel?.uid?.isFeatureListing}
                      isWishlisted={wishlist?.includes(hostel?._id)}
                      toggleWishlist={() => toggleWishlist(hostel._id)}
                      distance={hostel.distance}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="w-full text-center">
            <button className="mt-[40px] bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]">
              View More Properties...
            </button>
          </div> */}
        </>
      )}

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

      <Footer />
    </>
  );
}

export default HostelsPage;
