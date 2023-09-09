import axios from 'axios';

export function getListoneGiocatori(handleSuccess, handleError){
    axios.get('https://asta-fantacalcio2023-api.vercel.app/api/listone')
        .then(result => handleSuccess(result.data?.lista))
        .catch(error => handleError(error))
}