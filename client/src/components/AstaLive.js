import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIO from 'socket.io-client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BackHandIcon from '@mui/icons-material/BackHand';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

export default function AstaLive(){
    
    //alert from refreshing page
    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

    const location = useLocation();
    
    let calciatoreSelezionato = location.state?.calciatore
    console.log(calciatoreSelezionato)

    const [currentValueAsta, setCurrentValueAsta] = useState(0);
    const [currentTimer, setCurrentTimer] = useState(15);
    const [userW, setUserW] = useState('');
    const [isLasciato, setIsLasciato] = useState(false);
    const [isAssegnazione, setIsAssegnazione] = useState(false);

    let currentUser = sessionStorage.getItem('user');

    useEffect(() => {

        const socket = socketIO('https://asta-fantacalcio2023-api.vercel.app');

        socket.emit('join', calciatoreSelezionato?.Column4)

        //socket.on('timerUpdate', (timer) => setCurrentTimer(timer))

        socket.on('asta', (newValue, user) => {
            setCurrentValueAsta(newValue)
            setUserW(user)
        });

        return () => socket.disconnect(); //Disconnect when component unmounts
    }, [calciatoreSelezionato?.Column4])

    const handleAsta = (amount) => {
        if(currentTimer > 0){
            console.log("entro e incremento di ", amount)
            const socket = socketIO('https://asta-fantacalcio2023-api.vercel.app');
            socket.emit('asta', calciatoreSelezionato?.Column4, currentValueAsta+amount, sessionStorage.getItem('user')); //send new value asta
            setCurrentValueAsta(currentValueAsta+amount);
            setUserW(sessionStorage.getItem('user'));
            setCurrentTimer(15);
            //socket.on('timerUpdate', (timer) => setCurrentTimer(timer))
        } else{
            alert('---TEMPO SCADUTO---')
        }
    }

    const drawAssegnazione = () => {
        return(
            <Dialog
                fullWidth
                open={isAssegnazione}
                onClose={() => setIsAssegnazione(false)}
            >
                <DialogTitle>Assegnazione calciatore</DialogTitle>
                { currentValueAsta > 0 ?
                    <DialogContent>
                        Stai assegnando <strong>{calciatoreSelezionato.Column4}</strong> a <strong>{userW}</strong> per <strong>{currentValueAsta}</strong> crediti
                    </DialogContent>
                 :  <DialogContent><strong>Nessuno ha puntato</strong></DialogContent> }
                <DialogActions>
                { currentValueAsta > 0 ?
                    <Button
                        color="success"
                        //assegnare su db collection 'squadre': UTENTE - CALCIATORE - PREZZO
                    >
                        Conferma
                    </Button>
                 :  <></> }
                    <div style={{flex:'1 0'}}></div>
                    <Button
                        color="error"
                        onClick={() => setIsAssegnazione(false)}
                    >
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>
        )
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
                <Typography variant="h4" textAlign={'center'}><AccessTimeIcon/> <strong>{currentTimer}</strong></Typography>
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
                    disabled={isLasciato}
                >
                    <strong>+ 1</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAsta(2)}
                    disabled={isLasciato}
                >
                    <strong>+ 2</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAsta(5)}
                    disabled={isLasciato}
                >
                    <strong>+ 5</strong>
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleAsta(10)}
                    disabled={isLasciato}
                >
                    <strong>+ 10</strong>
                </Button>
            </Grid>
            <Grid item xs={12} textAlign={'center'} marginTop={3}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<BackHandIcon/>}
                    onClick={() => setIsLasciato(true)}
                    sx={{width:"35%"}}
                >
                    Lascio
                </Button>
            </Grid>
            { currentUser === "Uela" ?
                <Grid item xs={12} textAlign={'center'} marginTop={3}>
                    <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<MoveToInboxIcon/>}
                        onClick={() => setIsAssegnazione(true)}
                        sx={{width:"35%"}}
                    >
                        Assegna
                    </Button>
                    {drawAssegnazione()}
                </Grid>
             :  <></> }
        </Grid>
    )
}