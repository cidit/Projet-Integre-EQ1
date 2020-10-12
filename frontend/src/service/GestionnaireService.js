const baseURL = "http://localhost:8080/gestionnaires";

class GestionnaireService{

    async put(gestionnaire,id){
        fetch(baseURL + "/update/" + id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gestionnaire)} )
            .then(r => r.json());
    }
}

export default new GestionnaireService()































