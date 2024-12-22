import React, { useState } from "react";
import { axiosI } from "../axios";
import axios from "axios";

const LocationInput = ({ register,setValue }) => {
  const [Areas, setAreas] = useState([]);
  const handleChange = async (e) => {
    if (e.target.value.length > 2) {
      const { data } = await axiosI.get(
        `/autosuggest_google?q=${e.target.value}`
      );
      console.log(data);
      
      setAreas(data.predictions);
    }
    if (e.target.value.length === 0) {
      setAreas([]);
    }
  };
  const handleClick = async (e) => {
    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: e,
          key: "AIzaSyAy9lpoCJKj3p-ez31H9mNw5dM115WJr1Y",
        },
      }
    );

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(location.lat);
      setValue("coordinates.latitude", location.lat);
      setValue("coordinates.longitude", location.lng);
      setValue("location", e);
      setAreas([]);
    }
    
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add location..."
        {...register("location")}
        className="w-full  p-4 h-19 border border-gray-300 rounded-[20px] outline-none resize-none font-light text-[18px] md:text-[25px] text-gray-600"
        rows="4"
        onChange={handleChange}
      />
      <div className="detectbox">
        {Areas &&
          Areas.map((area, i) => (
            <div
              key={i}
              onClick={() => handleClick(area.description)}
              className="dolo"
            >
              <p> {area.description}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default LocationInput;
