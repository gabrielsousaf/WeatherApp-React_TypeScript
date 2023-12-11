import React from "react";

import styles from "./DisplayWeather.module.css";

import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { FiSun, FiArrowRightCircle } from "react-icons/fi";


import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";

interface WeatherDataProps {
  name: string;

  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather = () => {
  const api_key = "228cfefac5b85af9fc76719bc59ef9cd";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const [searchCity, setSearchCity] = React.useState("");

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const searchResponse = await axios.get(url);

      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return { currentWeatherData };
    } catch (error) {
      console.error("No Data Found");
      throw error;
    }
  };
  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }

    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {
      console.error("No Results Found");
    }
  };

  const formatSunsetTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Adicione um zero à esquerda se os minutos forem menores que 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes}`;
  };

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }
    
    return (
      <span className={styles.icon} style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
          console.log(currentWeather);
        }
      );
    });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Enter a City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        <div className={styles.searchCircle}>
          <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
        </div>
      </div>

      {weatherData && isLoading ? (
        <>
          <div className={styles.weatherArea}>
            <h1>{weatherData.name}</h1>
            <span>{weatherData.sys.country}</span>
            <div className={styles.icon}>
              {iconChanger(weatherData.weather[0].main)}
            </div>
            <h1>{weatherData.main.temp.toFixed(0)}°</h1>
            <h2>{weatherData.weather[0].main}</h2>
          </div>


          <div className={styles.bottomInfoArea}>

            <div className={styles.humidityLevel}>
              <WiHumidity className={styles.windIcon} />
              <div className={styles.humidInfo}>
                <h1>{weatherData.main.humidity}%</h1>
                <p>Humidity</p>
              </div>
            </div>

            <div className={styles.sunset}>
              <FiSun className={styles.windIcon} />
              <div className={styles.humidInfo}>
                <h1>{formatSunsetTime(weatherData.sys.sunset)}</h1>
                <p>Sunset</p>
              </div>
            </div>
            
            <div className={styles.wind}>
              <SiWindicss className={styles.windIcon} />
              <div className={styles.humidInfo}>
                <h1>{weatherData.wind.speed}</h1>
                <p>Wind speed</p>
              </div>
            </div>


            <div className={styles.pressure}>
              <FiArrowRightCircle className={styles.windIcon} />
              <div className={styles.humidInfo}>
                <h1>{weatherData.main.pressure}</h1>
                <p>Pressure</p>
              </div>
            </div>


          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <RiLoaderFill className={styles.loadingIcon} />
          <p>Loading</p>
        </div>
      )}
    </main>
  );
};

export default DisplayWeather;
