import axios from 'axios';

export function doLogin(nomeUtente, handleSuccess, handleError){
    axios.request({ method: 'POST', url: 'https://asta-fantacalcio2023-api.vercel.app/api/login', data: { nomeUtente } })
        .then(result => handleSuccess(result.data))
        .catch(error => handleError(error))
}