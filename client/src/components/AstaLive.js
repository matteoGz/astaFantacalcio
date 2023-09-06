import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIO from 'socket.io-client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function AstaLive(){
    
    const location = useLocation();
    
    let calciatoreSelezionato = location.state?.calciatore
    console.log(calciatoreSelezionato)

    const [currentValueAsta, setCurrentValueAsta] = useState(0);
    const [timer, setTimer] = useState(15);
    const [userW, setUserW] = useState('');

    useEffect(() => {
        const decrementTimer = () => { if(timer > 0) setTimer(timer - 1) }
    
        const timerInterval = setInterval(decrementTimer, 1000)

        return () => clearInterval(timerInterval)
    }, [timer])
    

    useEffect(() => {
        const socket = socketIO('http://localhost:4000');

        socket.emit('join', calciatoreSelezionato?.Column4)

        socket.on('asta', (newValue, user) => {
            setCurrentValueAsta(newValue)
            setUserW(user)
        });

        return () => socket.disconnect(); //Disconnect when component unmounts
    }, [])

    const handleAsta = (amount) => {
        if(timer > 0){
            console.log("entro e incremento di ", amount)
            const socket = socketIO('http://localhost:4000');
            socket.emit('asta', calciatoreSelezionato?.Column4, currentValueAsta+amount, sessionStorage.getItem('user')); //send new value asta
            setCurrentValueAsta(currentValueAsta+amount);
            setUserW(sessionStorage.getItem('user'))
            setTimer(15)
        } else{
            alert('---TEMPO SCADUTO---'+<br></br>+'Calciatore assegnato a '+<strong>{userW}</strong>)
        }
    }
    


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
                <Typography variant="h4" textAlign={'center'}><AccessTimeIcon/> <strong>{timer}</strong></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h1" textAlign={'center'} sx={{backgroundColor:'#fafafa'}}>
                    {currentValueAsta}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">Sta vincendo: </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5"><strong>{userW}</strong></Typography>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAsta(1)}
                >
                    <strong>+ 1</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAsta(2)}
                >
                    <strong>+ 2</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAsta(5)}
                >
                    <strong>+ 5</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleAsta(10)}
                >
                    <strong>+ 10</strong>
                </Button>
            </Grid>
        </Grid>
    )
}