import axios from 'axios';

export enum apiData {
    API_KEY = "bafb1aba085a22b07648ba4d0ccad279",
    LANG = "es"
}

export const apiWeatherWeb = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5/weather?appid=" + apiData.API_KEY + "&lang="+apiData.LANG,
})

export const apiWeatherLocal = () => {
 
}