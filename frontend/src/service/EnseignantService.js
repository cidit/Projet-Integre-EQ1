import axios from 'axios';
import authHeader from './security/auth-header';

//const baseURL = "http://localhost:8080/enseignants";


class EnseignantService{


    getEnseignantsInscrits(){
        return axios.get("/enseignants/findAll", { headers: authHeader() });
    }

    getEnseignantById(id){
        return axios.get("/enseignants/get?idEnseignant=" + id, { headers: authHeader() });
    }

    async post(Enseignant){
        fetch("/enseignants/createEnseignant",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Enseignant)} )
            .then(r => r.json());
    }

    async updatePassword(enseignant, id){
        return axios.put("/enseignants/updatePassword/" + id, enseignant, { headers: authHeader() });
    }
}

export default new EnseignantService()