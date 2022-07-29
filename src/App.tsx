import React, {useState} from 'react';
import { apiWeatherLocal} from './api/ApiWeather';
import { NavBar } from './common/NavBar';
import {TableContainer, Table, TableHead, TableRow, 
  Paper, TableCell, TableBody, TableFooter,
  Container, TextField, Button, Box, Dialog,
  DialogTitle, Typography, DialogContent, Grid,
  DialogActions} from '@mui/material'
import { WeatherInterfaz } from './interfaces/WeatherInterface';

function App() {
  const [descripcion, setDescripcion] = useState<WeatherInterfaz[]>([]);
  //Estados para el modal insertar
  const [isActiveModalInsertar, setIsActiveModalInsertar] = useState(false);
  //
  const [descripcionClima, setdescripcionClima] = useState<WeatherInterfaz>({
    id : 0,
    ciudad : '',
    clima : '',
    descripcion : '',
    temperatura : null,
    pais : ''
  });
  
  //acciones modal insertar
  const handleCloseInsertar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalInsertar(false);
  const handleShowInsertar = () => setIsActiveModalInsertar(true);
  //datos capturados textFields
  const handleChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setdescripcionClima(prevState => ({
      ...prevState,
      [name] :value
    }));
    //console.log(descripcionClima);
  }

  //petición get api weather local
  const getWeather = async () => {
    await apiWeatherLocal.get<WeatherInterfaz>('/descripcion/' + descripcionClima.ciudad)
      .then(response => {
        setdescripcionClima(response.data);
        console.log(response.status);
      }).catch(error => {
        console.log(error)
      });
  }
   //petición post
   const postWeather = async () => {
    delete descripcionClima.id;
    descripcionClima.temperatura = parseInt(descripcionClima.temperatura.toString())
    await apiWeatherLocal.post<WeatherInterfaz>('/descripcion', descripcionClima)
      .then(response => {
        setDescripcion(descripcion.concat(response.data));
        console.log(response.status);
        handleCloseInsertar();
      }).catch(error => {
        console.log(error.response.data);
      })
  }

  //useEffect
  
  return (
    <div className="App">
      <NavBar/>
      <Container maxWidth='xl' sx={{mt:9}}>
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <TextField  sx={{mt:1.5, mb:2, mx:2}} margin="normal" 
            onChange={handleChange} name="ciudad"/>
          <Button onClick={()=>getWeather()} variant='outlined'>Buscar</Button>
        </Container>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <TableCell>Ciudad</TableCell>
                <TableCell>Clima</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Temperatura °C</TableCell>
                <TableCell>País (Code)</TableCell>
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
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Box sx={{mt:2}}>
          <Button variant='outlined' onClick={()=>handleShowInsertar()}>Insertar</Button>
        </Box>
        </Container>
        <div>
        <Dialog open={isActiveModalInsertar}>
          <DialogTitle>
            <Typography>Insertar Datos Correspondientes a la descripción del clima</Typography>
          </DialogTitle>
          <Paper sx={{padding:"1.2em",}}>
            <DialogContent >
                <Container maxWidth = 'md'>
                  <Grid container direction='column'>
                    <Grid item>
                        <Box>
                          <TextField fullWidth label="Ciudad" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="ciudad"
                            onChange={handleChange} required/>
                          <TextField fullWidth label="Clima" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="clima"
                            onChange={handleChange} required/>
                          <TextField fullWidth label="Descripción" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="descripcion"
                            onChange={handleChange} required/>
                            <TextField fullWidth label="Temperatura" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="temperatura"
                            onChange={handleChange} required/>
                            <TextField fullWidth label="Pais" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="pais"
                            onChange={handleChange} required/>
                        </Box>
                    </Grid>
                  </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleCloseInsertar}>Cancel</Button>
              <Button variant="outlined" onClick={()=>postWeather()}>Agregar</Button>
            </DialogActions>
          </Paper>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
