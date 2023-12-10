import React, { useState } from 'react'
import './WeatherApp.css'
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import rainIcon from '../Assets/rain.png';
import windIcon from '../Assets/wind.png';
import snowIcon from '../Assets/snow.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';



const WeatherApp = () => {

    let apiKey = "9fda35cbcc8a50ca826668511f7d979a";
    const [wicon, setWicon] = useState(cloudIcon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity;
        wind[0].innerHTML = data.wind.speed;
        temp[0].innerHTML = Math.floor(data.main.temp - 273) + "°C" + " ";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clearIcon);
        }

        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {

            setWicon(cloudIcon);

        }

        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzleIcon);
        }

        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rainIcon);
        }

        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snowIcon);
        }

        else {
            setWicon(clearIcon);
        }

    }



    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={searchIcon} alt="searchIcon" />
                </div>
            </div>
            <div className="weather-img">
                <img src={wicon} alt="cloudIcon" />
            </div>
            <div className="weather-temp">25°C</div>
            <div className="weather-location">Paris</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">17 km/h</div>
                        <div className="text">Wind speed</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherApp;