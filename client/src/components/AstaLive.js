import { Grid, Typography } from "@mui/material";
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
            
        </Grid>
    )
}