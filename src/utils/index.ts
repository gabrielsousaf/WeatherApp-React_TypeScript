import axios from "axios";
import { WeatherDataProps } from "../types/index"

const api_key = process.env.REACT_APP_API_KEY;
const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

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