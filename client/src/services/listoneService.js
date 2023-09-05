import axios from 'axios';

export function getListoneGiocatori(handleSuccess, handleError){
    axios.get('http://localhost:4000/listone')
        .then(result => handleSuccess(result.data?.lista))
        .catch(error => handleError(error))
}