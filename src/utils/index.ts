import axios from "axios";
import { WeatherDataProps } from "../types/index"

const api_key = "228cfefac5b85af9fc76719bc59ef9cd";
const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchWeatherData = async (city: string) => {
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

export const formatSunsetTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}`;
};
