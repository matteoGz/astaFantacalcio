import axios from 'axios';

export function doLogin(nomeUtente, handleSuccess, handleError){
    axios.request({ method: 'POST', url: 'http://localhost:4000/api/login', data: { nomeUtente } })
        .then(result => handleSuccess(result.data))
        .catch(error => handleError(error))
}