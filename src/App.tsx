import React, { useEffect, useState } from 'react';
import { apiWeatherWeb } from './api/ApiWeather';

enum apiData {
  API_KEY = "bafb1aba085a22b07648ba4d0ccad279",
  LANG = "es",
  CITY_CARACTER_CONTROL = "&q=",
}

function App() {
  const [] = useState()

  //petición get api weathermap
  const getWeather = async () => {
    await apiWeatherWeb.get('weather?appid=' + 
      apiData.API_KEY + "&lang="+apiData.LANG + apiData.CITY_CARACTER_CONTROL + "pasto")
      .then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      });
  }
  //useEffect
  useEffect(() => {
    getWeather();
  }, [])
  
  return (
    <div className="App">
      <h3>React con typeScript listo para funcionar</h3>
    </div>
  );
}

export default App;
