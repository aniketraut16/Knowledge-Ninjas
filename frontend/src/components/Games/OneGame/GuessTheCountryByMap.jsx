import React, { useState, useEffect } from "react";
import "./OneGame.css";
import countryData from "./countryData.json"; // assuming this is correct

// Function to calculate distance using Haversine formula
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371.0; // Radius of the Earth in km

  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

// Function to calculate bearing
const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const toDegrees = (radians) => (radians * 180) / Math.PI;

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dlon = lon2 - lon1;

  const x = Math.sin(dlon) * Math.cos(lat2);
  const y =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon);
  const initialBearing = Math.atan2(x, y);
  const compassBearing = (toDegrees(initialBearing) + 360) % 360;

  return compassBearing;
};

// Function to get compass direction
const compassDirection = (bearing) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
};

const GuessTheCountry = () => {
  // const totalCountries = data.names.length;
  const countriesList = countryData.names;
  const totalcountryData = countryData.data;
  const [randomCountry, setrandomCountry] = useState("");
  const [guessedCountry, setguessedCountry] = useState("");

  useEffect(() => {
    setrandomCountry(
      countriesList[Math.floor(Math.random() * countriesList.length)]
    );
  }, []);
  if (randomCountry === "") {
    return <div>Loading...</div>;
  }

  return (
    <div className="GuesstheCountry">
      <img src={totalcountryData[randomCountry].flag_url} alt="" />
      <h1>{totalcountryData[randomCountry].name}</h1>
      <input
        type="text"
        list="countries"
        onChange={(e) => {
          setguessedCountry(
            countriesList.includes(e.target.value) ? e.target.value : ""
          );
        }}
      />
      <datalist id="countries">
        {countriesList.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      <button
        onClick={() => {
          if (guessedCountry === "") {
            alert("Please enter a country name");
          } else if (guessedCountry === randomCountry) {
            alert("Correct");
          } else {
            const distance = haversine(
              countryData[guessedCountry],
              lon_india,
              lat_usa,
              lon_usa
            );
            const direction = compassDirection(
              calculateBearing(lat_india, lon_india, lat_usa, lon_usa)
            );
          }
        }}
      >
        Guess
      </button>
    </div>
  );
};

export default GuessTheCountry;
