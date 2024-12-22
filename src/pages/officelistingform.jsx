/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import fitness from "../assets/fitness.svg";
import travel from "../assets/park.svg";
import alcohol from "../assets/swim.svg";
import party from "../assets/water.svg";
import sport from "../assets/heater.svg";
import read from "../assets/tv.svg";
import video from "../assets/bed.svg";
import sing from "../assets/ac.svg";
import dance from "../assets/hospital.svg";
import food from "../assets/market.svg";
import upload from "../assets/upload.svg";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import ButtonGroup from "../components/ButtonGroup";
import { useAuth } from "../../utils/contextLogin";
import { X } from "lucide-react";
import { useListingContext } from "../../utils/ListingContext";
import { axiosI } from "../axios";
import LocationInput from "../components/LocationInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HostelLisitngForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = useAuth();
  const amenitiesList = [
    { id: 1, label: "Gym", icon: fitness },
    { id: 2, label: "Park", icon: travel },
    { id: 3, label: "Swimming Pool", icon: alcohol },
    { id: 4, label: "Water Purifier", icon: party },
    { id: 5, label: "Heater", icon: sport },
    { id: 6, label: "TV", icon: read },
    { id: 7, label: "Bed", icon: video },
    { id: 8, label: "A.C", icon: sing },
    { id: 9, label: "Hospital Nearby", icon: dance },
    { id: 10, label: "Market Nearby", icon: food },
  ];

  // Validation schema using Zod
  const formSchema = z.object({
    officeName: z.string().min(1, "Office name is required"),
    location: z.string().min(1, "Location is required"),
    title: z.string().min(1, "Title is required"),
    monthlyMaintenance: z.preprocess((value) => {
      const parsed = Number(value);
      return isNaN(parsed) ? null : parsed;
    }, z.number().optional().default(0)),
    floorNo: z.string().min(1, "Floor Number is required"),
    totalFloor: z.string().min(1, "Total Floor is required"),
    carpetArea: z.string().min(1, "Carpet Area is required"),
    facing: z.string().min(1, "Facing is required"),
    deposit: z.string().optional(),
    parking: z.enum(["4 Wheeler", "2 Wheeler", "All Vehicle", "None"]),
    cabins: z.enum(["1BHK", "2BHK", "3BHK", "4+BHK"]),
    bathroom: z.enum(["1 Bathroom", "2 Bathroom", "3 Bathroom"]),
    furnished: z.enum(["Furnished", "Semi-furnished", "Unfurnished"]),
    listedBy: z.enum(["Owner", "Rental"]),
    amenities: z.array(z.string()).optional(),
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

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { addListing } = useListingContext();

  const onSubmit = async (data) => {
    data.amenities = selectedAmenities;
    console.log(data, "office data");
    console.log(userData._id, "office data User ID");
    try {
      setIsLoading(true);
      const response = state?.update
        ? await axiosI.put(`/office-listings/${state.id}`, data)
        : await axiosI.post("/office-listings", {
            ...data,
            uid: userData._id,
          });

      if (response.data) {
        toast.success(
          state?.update
            ? "Office listing updated successfully"
            : "Office listing added successfully"
        );
        console.log(response.data.officeListing);
        reset();
        setSelectedAmenities([]);
        setImagePreviews([]);
        if (!state?.update) {
          await addListing();
        } else {
          navigate("/mylisting");
        }
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      imagePreviews.filter((_, i) => i !== index)
    );
  };

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

  const toggleAmenity = (label) => {
    setSelectedAmenities((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  useEffect(() => {
    if (state?.update && state.id) {
      // Fetch data to edit
      const fetchOfficeDetails = async () => {
        try {
          const response = await axiosI.get(`/office-listings/${state.id}`);
          const officeData = response.data;
          console.log(officeData, "office data");
          setValue("officeName", officeData.officeName);
          setValue("location", officeData.location);
          setValue("title", officeData.title);
          setValue("monthlyMaintenance", officeData.monthlyMaintenance);
          setValue("floorNo", officeData.floorNo);
          setValue("totalFloor", officeData.totalFloor);
          setValue("carpetArea", officeData.carpetArea);
          setValue("facing", officeData.facing);
          setValue("deposit", officeData.deposit);
          setValue("parking", officeData.parking);
          setValue("cabins", officeData.cabins);
          setValue("bathroom", officeData.bathroom);
          setValue("furnished", officeData.furnished);
          setValue("listedBy", officeData.listedBy);
          setValue("description", officeData.description);
          setValue("coordinates", officeData.coordinates);
          setValue("images", officeData.images);
          setImagePreviews(officeData.images);
          setSelectedAmenities(officeData.amenities || []);
        } catch (error) {
          toast.error("Failed to fetch office details");
        }
      };
      fetchOfficeDetails();
    }
  }, [state]);

  return (
    <div className="bg-[#F8F8F8]">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center pt-[100px] md:pt-[200px] pb-8 h-auto text-center z-10">
        <h1 className="text-xl md:text-[40px] font-bold mb-2 text-gray-600">
          {state?.update
            ? "Update Your Office space Details"
            : " Add Your Office space Details"}
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
                Office Name
              </p>
              <input
                {...register("officeName")}
                type="text"
                placeholder="Enter office name"
                className="w-full p-4 h-19 bg-white border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.officeName && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.officeName.message}
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
                placeholder="Add location..."
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
                Add Title
              </p>
              <input
                {...register("title")}
                type="text"
                placeholder="Enter title"
                className="w-full p-4 h-19 bg-white border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.title && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="relative">
              <p className="text-gray-600 font-semibold mb-2 text-[20px] md:text-[25px] font-poppins">
                Monthly Maintenance
              </p>
              <div className="absolute inset-y-0 top-[40px] md:top-[48px] left-3 flex items-center pointer-events-none">
                <svg
                  width="24px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600"
                >
                  <path
                    d="M6 4H10.5M10.5 4C12.9853 4 15 6.01472 15 8.5C15 10.9853 12.9853 13 10.5 13H6L13 20M10.5 4H18M6 8.5H18"
                    stroke="#4b5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                {...register("monthlyMaintenance")}
                placeholder="00, 500, 800, 1000......."
                className="w-full p-4 pl-10 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Floor No.
              </p>
              <input
                type="text"
                {...register("floorNo")}
                placeholder="eg: 1st floor, 2nd floor......."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.floorNo && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.floorNo.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Total Floor
              </p>
              <input
                type="text"
                {...register("totalFloor")}
                placeholder="eg: 1 Floor, 2 Floor......."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.totalFloor && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.totalFloor.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Build-up Carpet
              </p>
              <input
                type="text"
                {...register("carpetArea")}
                placeholder="eg: 600sq, 800sq, 1000sq...."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.carpetArea && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.carpetArea.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Facing
              </p>
              <input
                type="text"
                {...register("facing")}
                placeholder="eg: North, South, East...."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
              {errors.facing && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.facing.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins">
                Deposit
              </p>
              <input
                type="text"
                {...register("deposit")}
                placeholder="eg: 15 Days, 1 Month......."
                className="w-full p-4 h-19 border border-gray-300 rounded-[20px] outline-none font-light text-[18px] md:text-[25px] text-gray-600"
              />
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
                  maxLength={5}
                  style={{ display: "none" }}
                  id="upload-input"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="upload-input"
                  className="text-gray-600 font-semibold text-[18px] md:text-[20px]"
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
                  <div className="mt-4 grid place-items-center grid-cols-3 gap-2">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                        flex items-center justify-center"
                          type="button"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 w-full md:max-w-lg pt-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ButtonGroup
                  label="Parking Available"
                  name="parking"
                  options={["4 Wheeler", "2 Wheeler", "All Vehicle", "None"]}
                  setValue={setValue}
                  getValues={getValues}
                  error={errors.parking}
                  labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[23px] font-poppins"
                  optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                />

                <div className="mt-[60px]">
                  <ButtonGroup
                    label="No. of Bathroom"
                    name="bathroom"
                    options={["1 Bathroom", "2 Bathroom", "3 Bathroom"]}
                    setValue={setValue}
                    getValues={getValues}
                    error={errors.bathroom}
                    labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins"
                    optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                  />
                </div>
              </div>

              <div>
                <ButtonGroup
                  label="No. of Cabins?"
                  name="cabins"
                  options={["1BHK", "2BHK", "3BHK", "4+BHK"]}
                  setValue={setValue}
                  getValues={getValues}
                  error={errors.cabins}
                  labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins"
                  optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                />

                <div className="mt-[55px]"></div>
                <ButtonGroup
                  label="Furnished"
                  name="furnished"
                  options={["Furnished", "Semi-furnished", "Unfurnished"]}
                  setValue={setValue}
                  getValues={getValues}
                  error={errors.furnished}
                  labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins"
                  optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                />

                <div className="mt-[55px]"></div>
                <ButtonGroup
                  label="Listed By"
                  name="listedBy"
                  options={["Owner", "Rental"]}
                  setValue={setValue}
                  getValues={getValues}
                  error={errors.listedBy}
                  labelclassName="text-gray-600 font-semibold mb-2 text-[18px] md:text-[25px] font-poppins"
                  optionclassName="border p-4 rounded-[20px] w-full text-[18px] md:text-[25px] font-light border-b-4 border-r-4 border-gray-300 shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-col pt-[20px] w-full">
              <h1 className="text-[18px] md:text-2xl font-bold mb-4 text-gray-600 text-left">
                Amenities
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.id} className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      id={`${amenity.id}+${amenity.label}`}
                      value={amenity.label}
                      checked={selectedAmenities.includes(amenity.label)}
                      onChange={() => toggleAmenity(amenity.label)}
                      className="form-checkbox hidden"
                    />
                    <label
                      htmlFor={`${amenity.id}+${amenity.label}`}
                      className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-[#FCF6BD] rounded-full mb-2 flex items-center justify-center cursor-pointer ${
                        selectedAmenities.includes(amenity.label)
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

export default HostelLisitngForm;
