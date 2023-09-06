import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function AstaLive(){
    
    const location = useLocation();
    
    let calciatoreSelezionato = location.state?.calciatore
    console.log(calciatoreSelezionato)

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6"><em>Asta in corso...</em></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" textAlign={'center'} sx={{backgroundColor:'#fafafa'}}>
                    <strong>{(calciatoreSelezionato.Column4).toUpperCase()}</strong>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Ruolo: <strong>{calciatoreSelezionato.Column2}</strong></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Squadra: <strong>{calciatoreSelezionato.Column5}</strong></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Valore: <strong>{Math.round(calciatoreSelezionato.Column12/2)}</strong></Typography>
            </Grid>
            <Grid item xs={12}>
                TIMER
            </Grid>
            <Grid item xs={12}>
                Puntata e prezzo attuale
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log('+1')}
                >
                    <strong>+ 1</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => console.log('+2')}
                >
                    <strong>+ 2</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => console.log('+5')}
                >
                    <strong>+ 5</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => console.log('+10')}
                >
                    <strong>+ 10</strong>
                </Button>
            </Grid>
        </Grid>
    )
}