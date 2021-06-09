import React from "react";
import PropTypes from "prop-types";

const weatherCard = ({ data }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let today = new Date();
  let year = today.getFullYear();
    let month = monthNames[today.getMonth()];
    let date = today.getDate();
  let fullDate = date + " " + month + ", " + year;

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  let windDirection = directions[(data.wind.deg / 45).toFixed(0)];

  return (
    <div className="weather-card-container">
      <div className="weather-card">
        <p>{data.name}</p>
        <span className="date">{fullDate}</span>
        <div className="temperature">
          <label className="actual">{data.main.temp} &deg;C</label>
          <span className="feels-like">
            Feels Like <span className="value">{data.main.feels_like} &deg;C</span>
          </span>
        </div>
        <div className="weather-type-wind-speed">
          <div className="weather-type">
            <img
              className="icon"
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt=""
            />
            <span className="text">{data.weather[0].description}</span>
          </div>
          <div className="wind-speed">
            <span className="label">
              Wind Speed: <span className="value">{data.wind.speed} km/h <label>{windDirection}</label></span>
            </span>
          </div>
        </div>
        <div className="other-details-container">
          <div className="humidity">
            <span className="label">
              Temp Max/Min: <span className="value">{data.main.temp_max}/{data.main.temp_min}</span>
            </span>
          </div>
          <div className="humidity">
            <span className="label">
              Humidity: <span className="value">{data.main.humidity} %</span>
            </span>
          </div>
          <div className="humidity">
            <span className="label">
              Pressure: <span className="value">{data.main.pressure} mbar</span>
            </span>
          </div>
          <div className="humidity">
            <span className="label">
              Visibility: <span className="value">{data.visibility} meters</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

weatherCard.propTypes = {
  data: PropTypes.object,
};

export default weatherCard;
