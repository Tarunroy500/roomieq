/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import upload from "../assets/upload.svg";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import ButtonGroup from "../components/ButtonGroup";
import { useAuth } from "../../utils/contextLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useListingContext } from "../../utils/ListingContext";
import { axiosI } from "../axios";
import LocationInput from "../components/LocationInput";


function RoommateLisitngForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const formSchema = z.object({
    name: z.string().min(1, "Your name is required"),
    location: z.string().min(1, "Location is required"),
    hometown: z.string().min(1, "Hometown is required"),
    roomPreference: z.string().min(1, "Room Preference is required"),
    languagePreference: z.string().min(1, "Language Preference is required"),
    genderPreference: z.enum(["Male", "Female"]),
    occupation: z.string().optional(),
    moveInDate: z.string().min(1, "Move-In Date is required"),
    locationPreference: z.string().optional(),
    description: z
      .string()
      .max(800, "Description cannot exceed 800 characters")
      .optional(),
    images: z
      .array(z.string())
      .min(1, "You must upload at least one image")
      .max(8, "You can upload up to 8 images only"),
    coordinates: z.object({
      latitude: z.number().refine((val) => !isNaN(val), "Latitude is required"),
      longitude: z
        .number()
        .refine((val) => !isNaN(val), "Longitude is required"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { addListing } = useListingContext();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length + imagePreviews.length > 8) {
      toast.error("You can upload a maximum of 8 images.");
      return;
    }
    const readers = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setImagePreviews((prev) => [...prev, ...results]);
      setValue("images", [...imagePreviews, ...results]);
    });
  };
  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      imagePreviews.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    data.interests = selectedInterests;
    data.images = imagePreviews;

    try {
      setIsLoading(true);
      const response = state?.update
        ? await axiosI.put(`/roommates/${state.id}`, data) 
        : await axiosI.post("/create-roommate", {
            ...data,
            uid: userData._id,
          });
      if (response.status === 200) {
        toast.success(
          state?.update
            ? "Roommate Updated successfully!"
            : "Roommate Listed successfully!"
        );
       
        reset();
        reset();
        setSelectedInterests([]);
        setImagePreviews([]);
        if (!state?.update) {
          await addListing();
        }else{
          navigate("/mylisting");
        }
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAmenity = (label) => {
    setSelectedInterests((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  useEffect(() => {
    if (state?.update && state.id) {
      // Fetch data to edit
      const fetchRoommateDetails = async () => {
        try {
          const response = await axiosI.get(`/roommates/${state.id}`);
          const roommateData = response.data;

          setValue("name", roommateData.name);
          setValue("location", roommateData.location);
          setValue("hometown", roommateData.hometown);
          setValue("roomPreference", roommateData.roomPreference);
          setValue("languagePreference", roommateData.languagePreference);
          setValue("genderPreference", roommateData.genderPreference);
          setValue("occupation", roommateData.occupation);
          setValue("moveInDate", roommateData.moveInDate);
          setValue("locationPreference", roommateData.locationPreference);
          setValue("description", roommateData.description);
          setValue("coordinates", roommateData.coordinates);

          setImagePreviews(roommateData.images);
          setSelectedInterests(roommateData.interests || []);
        } catch (error) {
          toast.error("Failed to fetch roommate details");
        }
      };
      fetchRoommateDetails();
    }
  }, [state]);

  return (
    <div className="bg-[#F8F8F8]">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center pt-[100px] md:pt-[200px] pb-8 h-auto text-center z-10">
        <h1 className="text-xl md:text-[40px] font-bold mb-2 text-gray-600">
          {state?.update
            ? "Update Your Roommate Requirements"
            : "Add Your Roommate Requirements"}
        </h1>
        <p className="text-md md:text-2xl text-gray-600">
          {state?.update
            ? "Update your details"
            : "so anyone can connect with you"}
        </p>
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-center gap-x-[20px] xl:gap-x-[100px] gap-y-[20px] px-4 pt-[20px] md:pt-[100px]">
          <div className="space-y-6 w-full  md:w-[1000px] max-w-lg">
            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Your Name
              </p>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 h-19 bg-white border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.name && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Location
              </p>
              {/* <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:h-6 sm:w-6 h-5 w-5 text-gray-600 relative top-[-18px] sm:top-[-8px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5.5 10 10 10 10s10-4.5 10-10c0-5.52-4.48-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
              </div> */}
              {/* <textarea
                placeholder="Add your location..."
                {...register("location")}
                className="w-full pl-10 p-4 h-32 border border-gray-300 rounded-[20px] outline-none resize-none font-light text-[18px] md:text-[25px] text-gray-600"
                rows="4"
              ></textarea> */}
              <LocationInput register={register} setValue={setValue} />
              {errors.location && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Hometown
              </p>
              <input
                type="text"
                {...register("hometown")}
                placeholder="eg. Bhopal, Indore, Mumbai..."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.hometown && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.hometown.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Room Preference
              </p>
              <input
                type="text"
                {...register("roomPreference")}
                placeholder="eg: 1BHK, 2BHK, Hostel,PG..."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.roomPreference && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.roomPreference.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Language Preference
              </p>
              <input
                type="text"
                {...register("languagePreference")}
                placeholder="eg: English, Hindi, Marathi..."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.languagePreference && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.languagePreference.message}
                </p>
              )}
            </div>
            <div className="relative pt-[50px]">
              <div
                className="upload-field border-dashed p-6 text-center cursor-pointer border border-gray-300 bg-[white] rounded-[20px]"
                style={{ width: "100%", height: "400px" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  id="upload-input"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="upload-input"
                  className="text-gray-600 font-semibold text-[18px]"
                >
                  <img
                    src={upload}
                    alt=""
                    className="w-[70%] mx-auto h-[100px]"
                  />
                </label>

                {errors.images && (
                  <p className="text-red-500 text-sm">
                    {errors.images.message}
                  </p>
                )}

                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 w-full md:max-w-lg pt-[10px]">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <ButtonGroup
                  label="Gender Preference"
                  name="genderPreference"
                  options={["Male", "Female"]}
                  setValue={setValue}
                  getValues={getValues}
                  flat={true}
                  error={errors.genderPreference}
                  labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[23px] font-poppins"
                  optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                />
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                  Occupation
                </p>
                <input
                  type="text"
                  {...register("occupation")}
                  placeholder="eg. Student, Professional..."
                  className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
                />
                {errors.occupation && (
                  <p className="text-red-500 text-sm pt-1 pl-1">
                    {errors.occupation.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                  Move-In Date
                </p>
                <input
                  type="text"
                  {...register("moveInDate")}
                  placeholder="eg. 10/10/2024...."
                  className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
                />
                {errors.moveInDate && (
                  <p className="text-red-500 text-sm pt-1 pl-1">
                    {errors.moveInDate.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                  Location Preference
                </p>
                <input
                  type="text"
                  {...register("locationPreference")}
                  placeholder="eg: Mumbai, Pune, Delhi..."
                  className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
                />
                {errors.locationPreference && (
                  <p className="text-red-500 text-sm pt-1 pl-1">
                    {errors.locationPreference.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col pt-[20px] w-full">
              <h1 className="text-[18px] md:text-2xl font-bold mb-4 text-gray-600 text-left">
                Interests
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
                {InterestsList.map((amenity) => (
                  <div key={amenity.id} className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      id={`${amenity.id}+${amenity.label}`}
                      value={amenity.label}
                      checked={selectedInterests.includes(amenity.label)}
                      onChange={() => toggleAmenity(amenity.label)}
                      className="form-checkbox hidden"
                    />
                    <label
                      htmlFor={`${amenity.id}+${amenity.label}`}
                      className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-[#FCF6BD] rounded-full mb-2 flex items-center justify-center cursor-pointer ${
                        selectedInterests.includes(amenity.label)
                          ? "bg-[#ffd64f] border border-black"
                          : "bg-[#FCF6BD]"
                      }`}
                    >
                      <img
                        src={amenity.icon}
                        alt={amenity.label}
                        className={`w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] object-contain ${
                          amenity.label === "Cleaning" ? "scale-150" : ""
                        }`}
                      />
                    </label>
                    <h2 className="text-xs sm:text-sm md:text-sm text-center text-gray-600">
                      {amenity.label}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[40px]">
          <textarea
            placeholder="Description"
            {...register("description")}
            maxLength={800}
            className="w-[calc(80%+45px)] h-[250px] border border-gray-300 rounded-[20px] outline-none resize-none font-light text-[18px] md:text-[25px] text-gray-600 p-2 md:p-6"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-[50px] mb-[100px]">
          {state?.update ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#A9DEF9] disabled:bg-[#7ba5ba] font-normal w-[300px] md:w-[400px] h-[60px] rounded-[60px] transition duration-200 ease-in-out text-[18px] md:text-[25px] border-b-[5px] border-r-4 border-gray-300"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#A9DEF9] disabled:bg-[#7ba5ba] font-normal w-[300px] md:w-[400px] h-[60px] rounded-[60px] transition duration-200 ease-in-out text-[18px] md:text-[25px] border-b-[5px] border-r-4 border-gray-300"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default RoommateLisitngForm;
