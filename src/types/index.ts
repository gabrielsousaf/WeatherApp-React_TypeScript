export interface WeatherDataProps {
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
