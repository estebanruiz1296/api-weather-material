import React, { useEffect, useState} from 'react';
import { apiWeatherLocal} from './api/ApiWeather';
import { NavBar } from './common/NavBar';
import {TableContainer, Table, TableHead, TableRow, 
  Paper, TableCell, TableBody, TableFooter,
  Container, TextField, Button} from '@mui/material'
import { WeatherInterfaz } from './interfaces/WeatherInterface';

function App() {

  //estado - hook
  const [descripcionClima, setdescripcionClima] = useState<WeatherInterfaz>({
    id : 0,
    ciudad : '',
    clima : '',
    descripcion : '',
    temperatura : 0,
    pais : ''
  });
  //acciones
  //datos capturados textFields
  const handleChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setdescripcionClima(prevState => ({
      ...prevState,
      [name] :value
    }));
    console.log(descripcionClima);
  }

  //petición get api weather local
  const getWeather = async () => {
    await apiWeatherLocal.get('/descripcion/' + descripcionClima.ciudad)
      .then(response => {
        setdescripcionClima(response.data)
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
      <Container maxWidth='xl' sx={{mt:9}}>
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          
          <TextField  sx={{mt:1.5, mb:2, mx:2}} margin="normal" 
            onChange={handleChange}/>
          <Button variant='outlined'>Buscar</Button>
        
        </Container>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <TableCell>Ciudad</TableCell>
                <TableCell>Clima</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Temperatura</TableCell>
                <TableCell>País</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
            </TableBody>
            <TableFooter>
              <TableRow key={descripcionClima.id}>
                <TableCell>{descripcionClima.ciudad}</TableCell>
                <TableCell>{descripcionClima.clima}</TableCell>
                <TableCell>{descripcionClima.descripcion}</TableCell>
                <TableCell>{descripcionClima.temperatura}</TableCell>
                <TableCell>{descripcionClima.pais}</TableCell>
                <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  
                </Container>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        </Container>
    </div>
  );
}

export default App;
