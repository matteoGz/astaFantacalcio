import axios from 'axios';

export function getListoneGiocatori(handleSuccess, handleError){
    axios.get('https://asta-fantacalcio-api.adaptable.app/api/listone')
        .then(result => handleSuccess(result.data?.lista))
        .catch(error => handleError(error))
}