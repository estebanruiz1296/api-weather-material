import React, {useEffect, useState} from 'react';
import { apiWeatherLocal, apiWeatherLocalConsulta} from './api/ApiWeather';
import { NavBar } from './common/NavBar';
import {TableContainer, Table, TableHead, TableRow, 
  Paper, TableCell, TableBody, TableFooter,
  Container, TextField, Button, Box, Dialog,
  DialogTitle, Typography, DialogContent, Grid,
  DialogActions,
  Stack} from '@mui/material'
import { ConsultaInterfaz, WeatherInterfaz } from './interfaces/WeatherInterface';
import {Edit, Delete} from '@mui/icons-material';
import {red, lime } from '@mui/material/colors';
import { useStyles } from './stylesCustom/AllStyles';
import '../src/assets/css/App.css'

function App() {
  //hook para obtener información del api, array de datos
  const [descripcion, setDescripcion] = useState<WeatherInterfaz[]>([]);

  //hook para obtener información del api, array de datos
  const [consulta, setConsulta] = useState<ConsultaInterfaz[]>([]);

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

  //Estados para el modal Editar
  const [isActiveModalEditar, setIsActiveModalEditar] = useState(false);

  //Estados para el modal Mostrar
  const [isActiveModalMostrar, setIsActiveModalMostrar] = useState(false);

  //acciones modal insertar
  const handleCloseInsertar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalInsertar(false);
  const handleShowInsertar = () => setIsActiveModalInsertar(true);
  
  //acciones modal editar
  const handleCloseEditar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalEditar(false);
  const handleShowEditar = () => setIsActiveModalEditar(true);

  //acciones modal eliminar
  const handleCloseEliminar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalEliminar(false);
  const handleShowEliminar = () => setIsActiveModalEliminar(true);

  //acciones modal eliminar
  const handleCloseMostrar : React.MouseEventHandler<HTMLButtonElement> | any = () => setIsActiveModalMostrar(false);
  const handleShowMostrar = () => setIsActiveModalMostrar(true);

  //para capturar el valor de los textField
  const handleChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setDescripcionSeleccionada(prevState => ({
      ...prevState,
      [name] :value
    }));
  }

  //peticiones http
    //petición get
  
  //petición get Consultas
  const getConsultas = async () =>{
    await apiWeatherLocalConsulta.get<WeatherInterfaz[]>('/consulta')
      .then(response => {
        console.log(response.status);
        setConsulta(response.data);
      }).catch(error => {
        console.log(error);
      });
  }
  //post Consulta
  const postConsulta = async () =>{
    delete descripcionSeleccionada.id;
    delete descripcionSeleccionada.clima;
    delete descripcionSeleccionada.temperatura;
    delete descripcionSeleccionada.pais;
    await apiWeatherLocalConsulta.post<WeatherInterfaz>('/consulta' + descripcionSeleccionada)
      .then(response => {
        console.log(response.status);
        setConsulta(consulta.concat(response.data));
      }).catch(error => {
        console.log(error);
      });
  }

  //Buscar ciudades ya agregadas y las consultadas
  const buscarCiudades = async () => {
    await apiWeatherLocalConsulta.get<WeatherInterfaz>('/consulta/' + descripcionSeleccionada.ciudad)
      .then(response => {
        const ciudadBuscada = response.data.ciudad;
        if(ciudadBuscada === descripcionSeleccionada.ciudad){
          console.log("existe");
        }else{
          console.log("No existe");
          postConsulta();
        }
      }).catch(error => {
        console.log(error);
      });
  }

  //petición post
  const postDescripcion = async () => {
    delete descripcionSeleccionada.id;
    descripcionSeleccionada.temperatura = parseInt((String) (descripcionSeleccionada.temperatura))
    await apiWeatherLocal.post<WeatherInterfaz>('/descripcion', descripcionSeleccionada)
      .then(response => {
        setDescripcion(descripcion.concat(response.data));
        console.log(response.status);
        handleCloseInsertar();
      }).catch(error => {
        console.log(error);
      })
  }
  //petición get por ciudad
  const getDescripcionCiudad = async () =>{
    await apiWeatherLocal.get<WeatherInterfaz>('/descripcion/' + descripcionSeleccionada.ciudad)
      .then(response => {
        setDescripcionSeleccionada(response.data);
        console.log(response.status);
        //buscar ciudad endpoint
        buscarCiudades();
      }).catch(error => {
        console.log(error);
      });
    }
  
  //petición put
  const putDescripcion = async () =>{
    descripcionSeleccionada.temperatura = parseInt((String)(descripcionSeleccionada.temperatura));
    await apiWeatherLocal.put<WeatherInterfaz>('/descripcion/' + descripcionSeleccionada.ciudad, descripcionSeleccionada)
      .then(response => {
        var new_data = descripcion;
        new_data.map(description => {
          if(descripcionSeleccionada.id === description.id){
            description.id = descripcionSeleccionada.id;
            description.ciudad = descripcionSeleccionada.ciudad;
            description.clima = descripcionSeleccionada.clima;
            description.descripcion = descripcionSeleccionada.descripcion;
            description.temperatura = descripcionSeleccionada.temperatura;
            description.pais = descripcionSeleccionada.pais;
          }
          console.log(response.status);
        })
        setDescripcion(new_data);
        handleCloseEditar();
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

  useEffect(() => {
    getConsultas();
  }, [])
  
  
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
                          onClick={()=>handleShowEditar()}/>

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
                <Button variant='outlined' sx={{mt:2, mb:1, mx:0.5}}
                  onClick={()=>handleShowInsertar()}>
                  Insertar
                </Button>
                <Button variant='outlined' sx={{mt:2, mb:1, mx:0.5}}
                  onClick={()=>handleShowMostrar()}>
                  Mostrar
                </Button>
            </TableFooter>
          </Table>
        </TableContainer>
        
          {/*"Dialog para insertar registros"*/}
          <Dialog open={isActiveModalInsertar}>
              <DialogTitle>
                <Typography>
                  <p>Insertar nueva descripción del clima</p>
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
                  <Button variant="outlined" onClick={()=>postDescripcion()}>Agregar</Button>
                </DialogActions>
              </Paper>
          </Dialog>
        
        {/*"Dialog para editar registros"*/}
       
          <Dialog open={isActiveModalEditar}>
              <DialogTitle>
                <Typography>
                  <p>Editar descripción del clima para este registro</p>
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
                            onChange={handleChange} required
                            value={descripcionSeleccionada && descripcionSeleccionada.ciudad}/>
                            <TextField fullWidth label="Clima" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="clima"
                            onChange={handleChange} required
                            value={descripcionSeleccionada && descripcionSeleccionada.clima}/>
                            <TextField fullWidth label="Descripción" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="descripcion"
                            onChange={handleChange} required
                            value={descripcionSeleccionada && descripcionSeleccionada.descripcion}/>
                            <TextField fullWidth label="Temperatura" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="temperatura"
                            onChange={handleChange} required
                            value={descripcionSeleccionada && descripcionSeleccionada.temperatura}/>
                            <TextField fullWidth label="País" sx={{mt:1, mb:1.1}} 
                            margin="normal" type="text" name="pais"
                            onChange={handleChange} required
                            value={descripcionSeleccionada && descripcionSeleccionada.pais}/>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={handleCloseEditar}>Cancel</Button>
                  <Button variant="outlined" onClick={()=>putDescripcion()}>Editar</Button>
                </DialogActions>
              </Paper>
          </Dialog>
      
        {/*"Dialog para confirmar eliminación de registro"*/}
        
          <Dialog open={isActiveModalEliminar}>
              <DialogTitle>
                <Typography>
                  <p>¿Estas seguro de eliminar el registro de la ciudad de: {descripcionSeleccionada && descripcionSeleccionada.ciudad} ?</p>
                </Typography>
              </DialogTitle>
              <Paper sx={{padding:"1.2em",}}>
                <DialogActions sx={{display:'flex', justifyContent:'center'}}>
                  <Button variant="outlined" onClick={()=>deleteDescription()}>Si</Button>
                  <Button variant="outlined" onClick={()=>handleCloseEliminar()}>No</Button>
                </DialogActions>
              </Paper>
          </Dialog>
        

        {/*"Dialog para confirmar eliminación de registro"*/}
        
          <Dialog open={isActiveModalMostrar}>
              <DialogTitle>
                <Typography>
                  <p>Ciudades visitadas</p>
                </Typography>
              </DialogTitle>
              <Paper sx={{padding:"1.2em",}}>
                <Container maxWidth='lg'>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Ciudad</TableCell>
                          <TableCell>Descripción</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                        consulta.map(({id, ciudad, descripcion})=>(
                          <TableRow key={id}>
                            <TableCell>{ciudad}</TableCell>
                            <TableCell>{descripcion}</TableCell>
                          </TableRow>
                        ))
                      }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
                <DialogActions sx={{display:'flex', justifyContent:'center', mt:2, mb:2}}>
                  <Button variant="outlined" onClick={()=>handleCloseMostrar()}>Cerrar</Button>
                </DialogActions>
              </Paper>
          </Dialog>
      </Container>
    </div>
  );
}

export default App;
