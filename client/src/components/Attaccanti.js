import { Button, Grid, TableContainer} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import TabellaQuotazioni from "./TabellaQuotazioni";

export default function Attaccanti(){

    const location = useLocation();
    const navigate = useNavigate();

    const listaAttaccanti = location.state?.attaccanti
    console.log(listaAttaccanti)

    return(
        <>
        { listaAttaccanti === undefined ||
          listaAttaccanti.length === 0 ?
            <>
                <h1 style={{color: 'red'}}>Errore nel caricamento dei giocatori, torna indietro!</h1>    
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<HomeIcon/>}
                    onClick={() => navigate('/')}
                >
                    Torna alla home
                </Button>
            </>
         :  <Grid container> 
                <Grid item xs={12}>
                    <TableContainer>
                        <TabellaQuotazioni lista={listaAttaccanti}/>
                    </TableContainer>
                </Grid>
            </Grid>
        }
        </>
    )
}