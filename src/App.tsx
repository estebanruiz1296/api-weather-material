import React, { useEffect} from 'react';
import { apiWeatherWeb } from './api/ApiWeather';
import { NavBar } from './common/NavBar';
import {TableContainer, Table, TableHead, TableRow, 
  Paper, TableCell, TableBody, TableFooter,
  Container} from '@mui/material'

enum apiData {
  API_KEY = "bafb1aba085a22b07648ba4d0ccad279",
  LANG = "es",
  CITY_CARACTER_CONTROL = "&q=",
}

function App() {

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
      <NavBar/>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Lanzamiento</TableCell>
                <TableCell>Desarrollador</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
            </TableBody>
            <TableFooter>
              <TableRow >
                <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                 
                  
                </Container>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
    </div>
  );
}

export default App;
