import axios from 'axios';

export const apiWeatherWeb = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5/",
})

export const apiWeatherLocal = () => {
 
}