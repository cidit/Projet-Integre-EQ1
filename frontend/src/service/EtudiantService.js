import axios from 'axios'

const ETUDIANTS_URL = "http://localhost:8080/etudiants/findAll";


class EtudiantService{

    //axiom
    getEtudiants(){
        return axios.get(ETUDIANTS_URL);
    }

    //fetch
    getAllEtudiants(){
        return fetch(ETUDIANTS_URL).then(res =>{ return res.json();
        }).then(res => {console.log(res)})
    }

}

export default new EtudiantService()