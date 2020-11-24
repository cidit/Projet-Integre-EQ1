import axios from "axios";

const baseURL = "http://localhost:8080/gestionnaires";

class GestionnaireService{

    getGestionnaireById(id){
        return axios.get(baseURL + "/get?idGestionnaire=" + id);
    }

    async updatePassword(gestionnaire, id){
        fetch(baseURL + "/updatePassword/" + id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gestionnaire)} )
            .then(r => r.json());
    }
}

export default new GestionnaireService()































