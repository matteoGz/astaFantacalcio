import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { getListoneGiocatori } from "../services/listoneService";
import logoPortieri from '../images/gloves.png';
import logoDifensori from '../images/defense.png';
import logoCentrocampisti from '../images/midfielder.png';
import logoAttaccanti from '../images/striker.png';
import { useNavigate } from 'react-router-dom';

export default function Listonepage(){

  const navigate = useNavigate();

  const [listaPortieri, setListaPortieri] = useState([]);
  const [listaDifensori, setListaDifensori] = useState([]);
  const [listaCentrocampisti, setListaCentrocampisti] = useState([]);
  const [listaAttaccanti, setListaAttaccanti] = useState([]);
  

  useEffect(() => {
    getListoneGiocatori(handleSuccessGetListone, handleErrorGetListone)    
  }, [])
  
  const handleSuccessGetListone = (result) => {
    console.log(result)
    setListaPortieri(result.Portieri)
    setListaDifensori(result.Difensori)
    setListaCentrocampisti(result.Centrocampisti)
    setListaAttaccanti(result.Attaccanti)
  }

  const handleErrorGetListone = (error) => {
    //error.message
    console.error(error)
  }

  return(
    <div style={{ flexGrow: 1, padding: '16px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} style={{ marginBottom: '24px' }}>
          <Paper style={{ padding: '16px', textAlign: 'center', color: 'black' }} onClick={() => navigate('/listone/portieri', { state: { portieri: listaPortieri } })}>
            <Typography variant="h5">Portieri</Typography>
            <Typography variant="body1">
              <img src={logoPortieri} alt='Portieri' width={32} height={32}/>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{ marginBottom: '24px' }}>
          <Paper style={{ padding: '16px', textAlign: 'center', color: 'black' }} onClick={() => navigate('/listone/difensori', { state: { difensori: listaDifensori } })}>
            <Typography variant="h5">Difensori</Typography>
            <Typography variant="body1">
              <img src={logoDifensori} alt='Difensori' width={32} height={32}/>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{ marginBottom: '24px' }}>
          <Paper style={{ padding: '16px', textAlign: 'center', color: 'black' }} onClick={() => navigate('/listone/centrocampisti', { state: { centrocampisti: listaCentrocampisti } })}>
            <Typography variant="h5">Centrocampisti</Typography>
            <Typography variant="body1">
              <img src={logoCentrocampisti} alt='Centrocampisti' width={32} height={32}/>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{ marginBottom: '24px' }}>
          <Paper style={{ padding: '16px', textAlign: 'center', color: 'black' }} onClick={() => navigate('/listone/attaccanti', { state: { attaccanti: listaAttaccanti } })}>
            <Typography variant="h5">Attaccanti</Typography>
            <Typography variant="body1">
              <img src={logoAttaccanti} alt='Attaccanti' width={32} height={32}/>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}