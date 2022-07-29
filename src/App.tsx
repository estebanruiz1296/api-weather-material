import React, {useState} from 'react';
import { apiWeatherLocal} from './api/ApiWeather';
import { NavBar } from './common/NavBar';
import {TableContainer, Table, TableHead, TableRow, 
  Paper, TableCell, TableBody, TableFooter,
  Container, TextField, Button, Box, Dialog,
  DialogTitle, Typography, DialogContent, Grid,
  DialogActions,
  Stack} from '@mui/material'
import { WeatherInterfaz } from './interfaces/WeatherInterface';
import {Edit, Delete} from '@mui/icons-material';
import {red, lime } from '@mui/material/colors';
import { useStyles } from './stylesCustom/AllStyles';

function App() {
  //hook para obtener información del api, array de datos
  const [descripcion, setDescripcion] = useState<WeatherInterfaz[]>([]);

  //hook obtener objeto
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState<WeatherInterfaz>({
    id : 0,
    ciudad : '',
    clima : '',
    descripcion : '',
    temperatura : 0,
    pais : ''
  });

  //themes
  const {iconos} = useStyles();
  
  //Estados para el modal Eliminar
  const [isActiveModalEliminar, setIsActiveModalEliminar] = useState(false);

  //Estados para el modal insertar
  const [isActiveModalInsertar, setIsActiveModalInsertar] = useState(false);

  //acciones modal insertar
  const handleCloseInsertar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalInsertar(false);
  const handleShowInsertar = () => setIsActiveModalInsertar(true);

  //acciones modal eliminar
  const handleCloseEliminar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalEliminar(false);
  const handleShowEliminar = () => setIsActiveModalEliminar(true);

  //para capturar el valor de los textField
  const handleChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setDescripcionSeleccionada(prevState => ({
      ...prevState,
      [name] :value
    }));
    console.log(descripcionSeleccionada);
  }

  //peticiones http
    //petición get

  
  /*const getDescripcion = async () =>{
    await apiWeatherLocal.get<WeatherInterfaz[]>('/descripcion')
      .then(response => {
        console.log(response.status);
        setDescripcion(response.data);
      }).catch(error => {
        console.log(error);
      });
  }*/

  //petición post
  const postGestor = async () => {
    delete descripcionSeleccionada.id;
    descripcionSeleccionada.temperatura = parseInt(descripcionSeleccionada.temperatura.toString())
    await apiWeatherLocal.post<WeatherInterfaz>('/descripcion', descripcionSeleccionada)
      .then(response => {
        setDescripcion(descripcion.concat(response.data));
        console.log(response.status);
        handleCloseInsertar();
      }).catch(error => {
        console.log(error);
      })
  }
  //petición put
  const getDescripcionCiudad = async () =>{
    await apiWeatherLocal.get<WeatherInterfaz>('/descripcion/' + descripcionSeleccionada.ciudad)
      .then(response => {
        setDescripcionSeleccionada(response.data);
        console.log(response.status);
      }).catch(error => {
        console.log(error);
      });

    }
  //petición delete
  const deleteDescription = async () =>{
    await apiWeatherLocal.delete<WeatherInterfaz>('/descripcion/' + descripcionSeleccionada.ciudad)
      .then(response => {
        setDescripcion(descripcion.filter(desc => desc.ciudad !==  descripcionSeleccionada.ciudad));
        console.log(response.status);
        handleCloseEliminar();
      }).catch(error => {
        console.log(error);
      });
  }
  

  return (
    <div>
      <NavBar/>
      <Container  maxWidth='xl'sx={{mt:9}}>
        <Container maxWidth = 'lg' sx={{display:'flex', justifyContent:'center'}}>
          <Stack direction="row" spacing={2} sx={{mt:4, mb:4}}>
            <TextField fullWidth label='Buscar Ciudad' name='ciudad'
              onChange={handleChange}/>
            <Button variant='outlined' onClick={()=>getDescripcionCiudad()}>Buscar</Button>
          </Stack>
        </Container>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <TableCell>Ciudad</TableCell>
                <TableCell>Clima</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Temperatura °C</TableCell>
                <TableCell>País (Cod)</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead> 
            <TableBody>
            {
              (descripcionSeleccionada.ciudad === "" || !descripcionSeleccionada) ? (
                
                <TableCell colSpan={6} >
                  <h3 style={{display:'flex', justifyContent:'center'}}>No hay registro aún.</h3>
                </TableCell>
              ):(
                <TableRow key={descripcionSeleccionada.id}>
                    <TableCell>{descripcionSeleccionada && descripcionSeleccionada.ciudad}</TableCell>
                    <TableCell>{descripcionSeleccionada && descripcionSeleccionada.clima}</TableCell>
                    <TableCell>{descripcionSeleccionada && descripcionSeleccionada.descripcion}</TableCell>
                    <TableCell>{descripcionSeleccionada && descripcionSeleccionada.temperatura}</TableCell>
                    <TableCell>{descripcionSeleccionada && descripcionSeleccionada.pais}</TableCell>
                    <TableCell>
                      <Box sx={{'& > :not(style)': {m: 2,},}}>
                        <Edit sx={{ color: lime[700] }} className={iconos}
                          />

                        <Delete sx={{ color: red[900] }} className={iconos}
                          onClick={()=>handleShowEliminar()}/>
                      </Box> 
                    </TableCell>
                  </TableRow>
              ) 
            }
            </TableBody>
            <TableFooter>
            {/*Boton para insertar datos*/}
                <Button variant='outlined' sx={{mt:2, mb:2}}
                  onClick={()=>handleShowInsertar()}>
                  Insertar
                </Button>
            </TableFooter>
          </Table>
        </TableContainer>
        <div>
          {/*"Dialog para insertar registros"*/}
          <Dialog open={isActiveModalInsertar}>
              <DialogTitle>
                <Typography>
                  Insertar nueva descripción del clima
                </Typography>
              </DialogTitle>
              <Paper sx={{padding:"1.1em",}}>
                <DialogContent sx={{mt:0.1}}>
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
                            <TextField fullWidth label="País" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="pais"
                            onChange={handleChange} required/>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={handleCloseInsertar}>Cancel</Button>
                  <Button variant="outlined" onClick={()=>postGestor()}>Agregar</Button>
                </DialogActions>
              </Paper>
          </Dialog>
        </div>
        {/*"Dialog para confirmar eliminación de registro"*/}
        <div>
          <Dialog open={isActiveModalEliminar}>
              <DialogTitle>
                <Typography>
                  ¿Estas seguro de eliminar el registro de la ciudad de: {descripcionSeleccionada && descripcionSeleccionada.ciudad} ?
                </Typography>
              </DialogTitle>
              <Paper sx={{padding:"1.2em",}}>
                <DialogActions sx={{display:'flex', justifyContent:'center'}}>
                  <Button variant="outlined" onClick={()=>deleteDescription()}>Si</Button>
                  <Button variant="outlined" onClick={()=>handleCloseEliminar()}>No</Button>
                </DialogActions>
              </Paper>
          </Dialog>
        </div>
        
      </Container>
    </div>
  );
}

export default App;
