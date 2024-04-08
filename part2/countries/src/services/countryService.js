import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll =  () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
}

const fetchCountry = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`);
    return request.then(response => response.data);
}

const fetchWeather = (country) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=4f4989009ade4ebbf0f3471180333cd3`);
    return request.then(response => response.data);
}

export default { getAll, fetchCountry, fetchWeather };