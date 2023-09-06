import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { doLogin } from "../services/loginService";

export default function Loginpage(){

    const [nomeUtente, setNomeUtente] = useState('');

    const handleChangeNomeUtente = (event) => {
        setNomeUtente(event.target.value)
    }

    const effettuaLogin = () => {
        console.log(nomeUtente)
        doLogin(nomeUtente, handleSuccessLogin, handleErrorLogin)
    }

    const handleSuccessLogin = (result) => {
        console.log(result)
        if(result.message === 'Login successfull'){
            sessionStorage.setItem('user', nomeUtente)
            sessionStorage.setItem('auth', true)
            alert('LOGIN SUCCESSFULL')
        } else{
            alert('Try again -LOGIN-')
        }
    }

    const handleErrorLogin = (error) => {
        console.error(error)
        //error.message
    }

    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                --- <strong>LOGIN PAGE</strong> ---
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Nome utente"
                    onChange={handleChangeNomeUtente}
                    value={nomeUtente}
                    sx={{backgroundColor:'#fafafa'}}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={effettuaLogin}
                >
                    LOGIN
                </Button>
            </Grid>
        </Grid>
    )
}