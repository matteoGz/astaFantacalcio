import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LockPersonIcon from '@mui/icons-material/LockPerson';

export default function Homepage(){

    const navigate = useNavigate();

    return (
        <React.Fragment>
        <Grid container spacing={3}>
            {/* Header */}
            <Grid item xs={8}>
                <Paper>
                    <Typography variant="h4">Asta live fantacalcio</Typography>
                    <Typography variant="subtitle1">Developed with ❤ by MatteoGz.</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    endIcon={<LockPersonIcon/>}
                    onClick={() => navigate('/login')}
                >
                    LOGIN
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/astaLive')}
                    sx={{width:"50%"}}
                    startIcon={<AddAlertIcon/>}
                >
                    Chiama un giocatore
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/listone')}
                    sx={{width:"50%"}}
                    startIcon={<FormatListNumberedIcon/>}
                >
                    Listone giocatori  
                </Button>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}