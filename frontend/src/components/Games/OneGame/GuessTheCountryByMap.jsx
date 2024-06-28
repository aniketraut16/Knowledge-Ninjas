import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SquareArrowDown,
  SquareArrowDownLeft,
  SquareArrowLeft,
  SquareArrowUpLeft,
  SquareArrowUp,
  SquareArrowUpRight,
  SquareArrowRight,
  SquareArrowDownRight,
} from "lucide-react";
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

// Function to get compass direction and icon
const compassDirectionIcon = (bearing) => {
  const directions = [
    { name: "N", icon: <SquareArrowUp /> },
    { name: "NE", icon: <SquareArrowUpRight /> },
    { name: "E", icon: <SquareArrowRight /> },
    { name: "SE", icon: <SquareArrowDownRight /> },
    { name: "S", icon: <SquareArrowDown /> },
    { name: "SW", icon: <SquareArrowDownLeft /> },
    { name: "W", icon: <SquareArrowLeft /> },
    { name: "NW", icon: <SquareArrowUpLeft /> },
  ];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
};

const GuessTheCountry = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const countriesList = countryData.names;
  const totalcountryData = countryData.data;
  const [randomCountry, setrandomCountry] = useState("");
  const [guessedCountry, setguessedCountry] = useState("");
  const [attempts, setattempts] = useState([]);

  const initializeGame = () => {
    setrandomCountry(
      countriesList[Math.floor(Math.random() * countriesList.length)]
    );
    setguessedCountry("");
    setattempts([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  if (randomCountry === "") {
    return <div>Loading...</div>;
  }

  const handleGameEnd = (message) => {
    if (window.confirm(`${message}\nDo you want to play again?`)) {
      initializeGame();
    } else {
      navigate(-1);
    }
  };

  const handleGuess = () => {
    if (guessedCountry === "") {
      alert("Please enter a country name.");
    } else if (guessedCountry === randomCountry) {
      handleGameEnd(
        `Correct! You guessed the country , it is ${randomCountry}.`
      );
    } else {
      const distance = haversine(
        totalcountryData[guessedCountry].latitude,
        totalcountryData[guessedCountry].longitude,
        totalcountryData[randomCountry].latitude,
        totalcountryData[randomCountry].longitude
      );
      const bearing = calculateBearing(
        totalcountryData[guessedCountry].latitude,
        totalcountryData[guessedCountry].longitude,
        totalcountryData[randomCountry].latitude,
        totalcountryData[randomCountry].longitude
      );
      const { name, icon } = compassDirectionIcon(bearing);
      const attempt = {
        name: guessedCountry,
        distance,
        direction: name,
        icon,
      };
      const newAttempts = [...attempts, attempt];
      setattempts(newAttempts);
      setguessedCountry("");

      if (newAttempts.length >= 5) {
        handleGameEnd(
          `You've used all 5 attempts! You lost. it was ${randomCountry}`
        );
      }
    }
  };

  return (
    <div className="GuesstheCountry">
      <h1>Guess the Country by its {mode === "flag" ? "flag" : "map"}</h1>
      <img
        src={
          mode === "flag"
            ? totalcountryData[randomCountry].flag_url
            : totalcountryData[randomCountry].map_url
        }
        alt={`${randomCountry} ${mode}`}
        className={mode}
      />
      <h2>Which Country is this? 🤔</h2>

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
      <span>
        <button onClick={handleGuess} className="guess-btn">
          Guess
        </button>
        <button className="reload-button" onClick={initializeGame}>
          <svg
            className="svg-icon"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="white" strokeLinecap="round" strokeWidth="1.5">
              <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
              <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
            </g>
          </svg>
          <span className="label">Refresh</span>
        </button>
      </span>
      {attempts.length > 0 && (
        <>
          <h2>Attempts:</h2>
          <table>
            <thead>
              <tr>
                <th>Attemp</th>
                <th>Country</th>
                <th>Distance</th>
                <th>Direction</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{attempt.name}</td>
                  <td>{attempt.distance.toFixed(2)} km</td>
                  <td>{attempt.direction}</td>
                  <td>{attempt.icon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GuessTheCountry;
