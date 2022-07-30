import axios from 'axios';

export const apiWeatherWeb = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5/",
})

export const apiWeatherLocal = axios.create({
    baseURL : "https://localhost:44381/api",
})

export const apiWeatherLocalConsulta = axios.create({
    baseURL : "https://localhost:44381/api",
})