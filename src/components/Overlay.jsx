import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import "../App.css";
import { axiosI } from "../axios";

const Overlay = ({ setLocation, location }) => {
  const [Areas, setAreas] = useState([]);
  const handleChange = async (e) => {
    if (e.target.value.length > 2) {
      const { data } = await axiosI.get(
        `/autosuggest_google?q=${e.target.value}`
      );
      console.log(data);
      

      setAreas(data.predictions);
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
      console.log(location);
    }
    setLocation(e);
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAy9lpoCJKj3p-ez31H9mNw5dM115WJr1Y`
        );
        setLocation(data.results[0].formatted_address);
      },
      (err) => {
        alert(
          "We do not have permission to determine your location. Please enter manually"
        );
      }
    );
  };
  return (
    <>
      <div className="overlay">
        <div className="box-cnt">
          <div className="detectPop">
            <h4>
              Welcome to <span>RoomieQ India</span>
            </h4>
            <div className="dup">
              <IoLocationOutline className="loca" />
              <p>
                Please provide your location to start exploring nearby
                accomodations choices.
              </p>
            </div>
            <div className="dend">
              <input
                className="dser"
                onChange={handleChange}
                placeholder="Search Places ..."
                // value={query}
              />

              <div className="or">OR</div>
              <button onClick={getLocation} className="dbut">
                Detect my location
              </button>
            </div>
          </div>
          <div className="detectbox">
            {Areas &&
              Areas.map((area, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(area.description)}
                  className="dolo"
                >
                  <IoLocationOutline className="local" />
                  <p> {area.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overlay;
