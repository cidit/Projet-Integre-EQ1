import axios from 'axios'

const ETUDIANTS_URL = "http://localhost:8080/etudiants";
const ETUDIANTS_URL_POST = "http://localhost:8080/create";


class StageService{

    //axiom
    getStages(){
        return axios.get(ETUDIANTS_URL);
    }

    createEtudiant(etudiant){
        return axios.post(ETUDIANTS_URL_POST, etudiant);
    }

    //fetch
    getAllEtudiants(){
        return fetch(ETUDIANTS_URL).then(res =>{ return res.json();
        }).then(res => {console.log(res)})
    }

    createNewEtudiant(etudiant){
        fetch(ETUDIANTS_URL_POST, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(etudiant), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

}

export default new EtudiantService()