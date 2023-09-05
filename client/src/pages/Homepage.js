import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// //homepage style
// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       padding: theme.spacing(2),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.primary,
//     },
//     header: {
//       marginBottom: theme.spacing(2),
//     },
//     button: {
//       marginTop: theme.spacing(2),
//     },
// }));

//component
export default function Homepage(){

    const navigate = useNavigate();

    return (
        <React.Fragment>
        <Grid container spacing={3}>
            {/* Header */}
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h4">Asta live fantacalcio</Typography>
                    <Typography variant="subtitle1">Developed with ❤ by MatteoGz.</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/astaLive')}
                >
                    Asta live
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/listone')}
                >
                    Listone giocatori
                </Button>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}