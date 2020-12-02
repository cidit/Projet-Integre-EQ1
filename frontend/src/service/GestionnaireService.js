import axios from "axios";

const baseURL = "http://localhost:8080/gestionnaires";

class GestionnaireService{

    getGestionnaireById(id){
        return axios.get(baseURL + "/get?idGestionnaire=" + id);
    }

    async updatePassword(gestionnaire, id){
        return axios.put(baseURL + "/updatePassword/" + id, gestionnaire);
    }
}

export default new GestionnaireService()































