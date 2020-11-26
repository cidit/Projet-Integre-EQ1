import axios from 'axios'

const baseURL = "http://localhost:8080/enseignants/";

class EnseignantService{


    getEnseignantsInscrits(){
        return axios.get(baseURL + "/findAll");
    }

    getEnseignantById(id){
        return axios.get(baseURL + "get?idEnseignant=" + id);
    }

    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async post(Enseignant){
        fetch(baseURL + "/createEnseignant",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Enseignant)} )
            .then(r => r.json());
    }

    async updatePassword(Enseignant, id){
        console.log(Enseignant);
        fetch(baseURL + "/updatePassword/" + id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Enseignant)} )
            .then(r => r.json());
    }
}

export default new EnseignantService()