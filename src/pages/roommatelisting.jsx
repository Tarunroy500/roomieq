import { useEffect, useState } from "react";
import vectorIcon from "../assets2/vector.png";
import verctrIcon from "../assets2/vectr2.png";
import newImage from "../assets2/newimage.svg";
import GridCardLike from "../components/CardLike";
import fitness from "../assets/fitness.svg";
import travel from "../assets/travel.svg";
import alcohol from "../assets/alcohol.svg";
import party from "../assets/party.svg";
import sport from "../assets/sport.svg";
import read from "../assets/read.svg";
import video from "../assets/video.svg";
import sing from "../assets/sing.svg";
import dance from "../assets/dance.svg";
import food from "../assets/food.svg";
import DownloadPromo from "../components/DownloadPromo";
import Footer from "../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useChatStore } from "../../utils/useChatStore";
import { useAuth } from "../../utils/contextLogin";
import { toast } from "react-toastify";
import { axiosI } from "../axios";
const RoommateListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = useChatStore();
  const { userData } = useAuth();
  const [officeData, setOfficeData] = useState(null);
  const [relatedOffices, setRelatedOffices] = useState([]);
  const [chatSelected, setChatSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const InterestsList = [
    { id: 1, label: "Fitness", icon: fitness },
    { id: 2, label: "Travel", icon: travel },
    { id: 3, label: "Alcoholic", icon: alcohol },
    { id: 4, label: "Party Animal", icon: party },
    { id: 5, label: "Sports", icon: sport },
    { id: 6, label: "Reading", icon: read },
    { id: 7, label: "Video Games", icon: video },
    { id: 8, label: "Singing", icon: sing },
    { id: 9, label: "Dancing", icon: dance },
    { id: 10, label: "Food Explorer", icon: food },
  ];
  useEffect(() => {
    if (selectedUser && chatSelected) {
      navigate("/chat");
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        const response = await axiosI.get(`/roommates`);
        const res = await axiosI.get(`/roommates/${id}`);
        setRelatedOffices(response.data.filter((item) => item._id !== id));
        setOfficeData(res.data);
      } catch (error) {
        console.error("Error fetching office data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficeData();
  }, [id]);

  const handleChat = (uid) => {
    if (userData._id === uid._id) {
      toast.error("You can't chat with yourself");
      return;
    }
    setSelectedUser(uid);
    setChatSelected(true);
  };

  var settings2 = {
    dots: true,
    infinite: relatedOffices.length > 3, // Make it infinite only if there are more items than slidesToShow
    speed: 500,
    slidesToShow: Math.min(relatedOffices.length, 3), // Show only available items
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(relatedOffices.length, 3),
          slidesToScroll: 1,
          infinite: relatedOffices.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: Math.min(relatedOffices.length, 2),
          slidesToScroll: 1,
          infinite: relatedOffices.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(relatedOffices.length, 1),
          slidesToScroll: 1,
          infinite: relatedOffices.length > 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main className="w-full pt-32 md:pt-48 bg-white">
        {/* Breadcrumb */}
        <div className="pl-4 text-black px-4 sm:px-8 lg:px-16 text-base sm:text-xl border-b-2 pb-2 opacity-80 border-black font-normal font-['Poppins']">
          Home \ Roommates \ {officeData?.name}
        </div>

        <section className="grid mt-12 px-4 sm:px-8 lg:px-16 grid-cols-1 md:grid-cols-5 gap-6 py-8">
          {/* Main Content */}
          <div className="col-span-3 grid gap-8">
            {/* Details Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-16">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{officeData?.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {officeData?.location}
                  </p>
                </div>
                <button className="bg-pink-300 text-black px-4 py-2 mt-2 rounded-full">
                  Room Preference: {officeData?.roomPreference}
                </button>
              </div>
              <p className="text-gray-800 font-medium mb-4">Details:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                <ul className="space-y-2">
                  <li>Occupation: {officeData?.occupation}</li>
                  <li>Home Town: {officeData?.hometown}</li>
                  <li>Move In Date: {officeData?.moveInDate}</li>
                </ul>
                <ul className="space-y-2">
                  <li>location Preference: {officeData?.locationPreference}</li>
                  <li>Language Preference: {officeData?.languagePreference}</li>
                  <li>Gender Preference: {officeData?.genderPreference}</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4>Interests:</h4>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {officeData?.interests.map((amenity,index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                    >                      
                      <div                       
                        className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-[#FCF6BD] rounded-full mb-2 flex items-center justify-center cursor-pointer"
                      >
                        <img
                          src={InterestsList.find((item) => item.label === amenity)?.icon}
                          alt={amenity}
                          className={`w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] object-contain ${
                            amenity === "Cleaning" ? "scale-150" : ""
                          }`}
                        />
                      </div>
                      <h2 className="text-xs sm:text-sm md:text-sm text-center text-gray-600">
                        {amenity}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{officeData?.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-3 md:col-span-2 grid gap-6">
            {/* Profile Section */}
            <div className="relative bg-green-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm">
                  {new Date(officeData?.createdAt).toDateString()}
                </p>
                <div className="flex gap-2">
                  <img src={vectorIcon} alt="Icon" className="w-8 h-8" />
                  <img src={verctrIcon} alt="Icon" className="w-8 h-8" />
                </div>
              </div>
              <div className="text-center">
                <img
                  src={officeData.uid?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-36 h-36 mx-auto mb-4"
                />
                <h4 className="text-lg font-medium">{officeData.uid?.name}</h4>
                <p className="text-gray-500">{officeData.uid?.location}</p>
                <button
                  onClick={() => handleChat(officeData.uid)}
                  className="mt-4 bg-purple-200 text-black px-6 py-2 rounded-full shadow-md"
                >
                  Chat Now
                </button>
              </div>
            </div>

            {/* Membership Section */}
            <Link
              to="/membership"
              className="bg-yellow-100 flex flex-col justify-between rounded-lg shadow-md p-4 md:p-6"
            >
              <h4 className="text-xl font-medium mb-4">
                Want to Connect with Multiple Properties?
              </h4>
              <div className="flex items-center gap-2 justify-between">
                <button className="bg-pink-200 px-6 py-4 rounded-lg shadow-md">
                  <p className="text-sm">Become a Member of</p>
                  <p className="font-semibold">Saath Raho Family</p>
                </button>
                <img
                  src={newImage}
                  alt="Membership"
                  className="w-full max-w-24 md:max-w-36"
                />
              </div>
              <p className="text-xs text-center mt-4">
                Become a Saath Raho Family member for exclusive content.
              </p>
            </Link>

            {/* Description Section */}
          </aside>
        </section>
        <section className="py-16 px-4 sm:px-8 lg:px-16">
          <h2 className="text-2xl mb-8 md:text-4xl font-poppins text-center mx-auto font-semibold ">
            Related Search
          </h2>
          <div className="slider-container py-4 pb-14 relative w-full overflow-hidden">
            {relatedOffices.length > 0 ? (
              <Slider {...settings2}>
                {relatedOffices.map((room, index) => (
                  <div key={index} className="px-4">
                    <GridCardLike
                      title={room.name}
                      desc={room.description}
                      img={"/avatar.png"}
                      occupation={room.occupation}
                      location={room.location}
                      link={`/roommate/${room._id}`}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-center text-gray-500">
                No related Roommate found.
              </p>
            )}
          </div>
          <div className="w-full text-center">
            <Link
              to="/roommates"
              className="mt-[40px] p-3 bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]"
            >
              Explore More
            </Link>
          </div>
        </section>
      </main>
      <DownloadPromo />
      <Footer />
    </>
  );
};

export default RoommateListingPage;
