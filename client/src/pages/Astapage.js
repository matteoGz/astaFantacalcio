import { Autocomplete, Button, Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getListoneGiocatori } from '../services/listoneService';
import { useNavigate } from 'react-router-dom';

export default function Astapage(){
    
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [listaCalciatori, setListaCalciatori] = useState([]);
    const [listaSorted, setListaSorted] = useState([]);

    useEffect(() => {
      getListoneGiocatori(handleSuccessGetLista, handleErrorGetLista)
    }, [])

    const handleSuccessGetLista = (result) => {
        setListaCalciatori(result.Tutti.slice(1,result.Tutti.length))
        setIsLoading(false)
    }

    const handleErrorGetLista = (error) => {
        //error.message
        console.error(error)
        setIsLoading(false)
    }

    const filtraRuolo = (ruolo) => {
        setListaSorted(listaCalciatori.filter(calciatore => calciatore.Column2 === ruolo))
    }

    return(
        <Grid container spacing={3}>{console.log(listaCalciatori)}
        { !isLoading ? <>    
            <Grid item xs={12}>
                <Typography variant='h6' textAlign={'center'}>ASTA LIVE</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Chip
                            label='Portieri'
                            sx={{color: 'white', backgroundColor: 'orange'}}
                            onClick={() => filtraRuolo('P')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Chip
                            label='Difensori'
                            sx={{color: 'white', backgroundColor: 'green'}}
                            onClick={() => filtraRuolo('D')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Chip
                            label='Centrocampisti'
                            sx={{color: 'white', backgroundColor: 'purple'}}
                            onClick={() => filtraRuolo('C')}
                        />  
                    </Grid>
                    <Grid item xs={3}>
                        <Chip
                            label='Attaccanti'
                            sx={{color: 'white', backgroundColor: 'red'}}
                            onClick={() => filtraRuolo('A')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    options={listaSorted?.length > 0 ? listaSorted : listaCalciatori}
                    getOptionLabel={(option) => option.Column2 +" - "+ option.Column4 +" ---> "+ option.Column5}
                    renderInput={(params) => <TextField {...params} label="Calciatore"/>}
                    sx={{backgroundColor:'#fafafa'}}
                />
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate('/astaLive')} //asta per quel giocatore...
                >
                    Avvia asta
                </Button>
            </Grid></>
         :  <Grid item xs={12} textAlign={'center'} marginTop={10}>
                <CircularProgress size={100}/>
            </Grid> }
        </Grid> 
    )
}