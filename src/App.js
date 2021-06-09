import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { Component, createRef } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard/WeatherCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      error: null,
      region: ""
    }
    this.buttonRef = createRef(null);
  }
  

  componentDidMount() {
    var self = this; //inside the axios get call, the this keyword loses its context and is undefined. So, creating this variable to maintain that context.
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Using the locationIQ api call here. Ran into an error while calling the google API for Geocoding.
      const API_KEY = "pk.3e1af6017af09eaad7781cba08518966";
      axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json`)
        .then((response) => {
          const location = response.data.address.city;
          console.log(location);
          self.showWeatherClickHandler(location);
          self.setState({ region: location })
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  regionChangeHandler = event => {
    this.setState({ region: event.target.value });
  }

  showWeatherClickHandler = (location) => {
    // Used the openweather api here.
    const OPEN_WEATHER_API_KEY = "05c537a9ca5b862745119139c6549440";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({ weatherData: response.data, error: null });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error, weatherData: null });
      })
  }

  keyUpHandler = event => {
    if (event.keyCode === 13) {
      this.buttonRef.current.click();
    }
  }

  selectText = (event) => {
    event.target.select();
  }

  render() {
    return (
      <div>
        <p className="header">Weather App</p>
        <div id="container" className="container">
          <div className="select-region">
            <span className="select-region-span">Select Region:</span>
            <TextField
              id="outlined-basic"
              label="Enter a City"
              classes={{ root: "select-region-textbox"}}
              value={this.state.region}
              onChange={this.regionChangeHandler}
              onKeyUp={this.keyUpHandler}
              onClick={this.selectText}
              variant="outlined"
            />
            <Button
              variant="contained"
              ref={this.buttonRef}
              color="primary"
              onClick={() => this.showWeatherClickHandler(this.state.region)}
            >
              Show Weather
            </Button>
          </div>
          {this.state.weatherData && <WeatherCard data={this.state.weatherData} />}
          {this.state.error && <div>Please enter a correct city</div>}
        </div>
      </div>
    );
  }
}

export default App;
