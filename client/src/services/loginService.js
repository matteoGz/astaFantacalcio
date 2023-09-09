import axios from 'axios';

export function doLogin(nomeUtente, handleSuccess, handleError){
    axios.request({ method: 'POST', url: 'https://asta-fantacalcio-api.adaptable.app/api/login', data: { nomeUtente } })
        .then(result => handleSuccess(result.data))
        .catch(error => handleError(error))
}