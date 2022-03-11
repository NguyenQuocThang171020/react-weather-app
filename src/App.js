import { useState } from "react";
import moment from 'moment'
const api = {
  key: "672e5ce2b2738d2a512b0a651b9c9a31",
  base: "https://api.openweathermap.org/data/2.5/",
};
const dateBuilder = (d) => {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} , ${date} ${month} ${year}`;
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name} , {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="others">
                <div className="humidity">
                  <span>Humidity :</span> <br></br>{weather.main.humidity} %
                </div>
                <div className="description">
                  <span>Description :</span> <br></br>{weather.weather[0].description}
                </div>
                <div className="wind">
                  <span>Wind direction :</span> {weather.wind.deg} °deg
                </div>
                <div className="wind">
                  <span>Wind speed :</span> <br></br>
                  {weather.wind.speed} km/h </div>
                <div className="sunrise">
                  <span>Sunrise :</span> <br></br>{moment(weather.sys.sunrise).format('LT')}
                </div>
                <div className="sunset">
                  <span>Sunset :</span><br></br>{moment(weather.sys.sunset).format('LT')}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="error">
            <h2>Enter for search City.</h2>
            <h2>Please use mobile</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
