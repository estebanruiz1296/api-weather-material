import React from 'react';
import {Box, AppBar, Toolbar, Container, Grid, Typography} from '@mui/material';

export const NavBar : React.FC<{}>  = () => {
  return (
    <Box sx={{flexGrow : 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth = "xl">
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography>
                                <h3 style={{color:'#c8fa5f'}}>Gestores de Bases de Datos Material UI</h3>
                            </Typography>
                        </Grid>
                    </Grid> 
                </Container>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
