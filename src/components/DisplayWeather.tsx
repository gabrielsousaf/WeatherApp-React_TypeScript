import { useState, useEffect } from "react";
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
import { fetchCurrentWeather, fetchWeatherData, formatSunsetTime } from "../utils/index";
import { WeatherDataProps } from "../types/index";


const DisplayWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [searchCity, setSearchCity] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
       handleSearch();
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
        window.alert("City not found. Please enter a valid city name.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
        }
      );
    });
  }, []);

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

  return (
    <main className={styles.main}>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Enter a City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleKeyDown}
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
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
};

export default DisplayWeather;
