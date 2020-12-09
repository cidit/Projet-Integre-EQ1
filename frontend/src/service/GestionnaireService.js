import axios from "axios";
import authHeader from './security/auth-header';

//const baseURL = "http://localhost:8080/gestionnaires";

class GestionnaireService{

    getGestionnaireById(id){
        return axios.get("/gestionnaires/get?idGestionnaire=" + id, { headers: authHeader() });
    }

    async updatePassword(gestionnaire, id){
        return axios.put("/gestionnaires//updatePassword/" + id, gestionnaire, { headers: authHeader() });
    }
}

export default new GestionnaireService()































