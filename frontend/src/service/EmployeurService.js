import axios from 'axios';
import authHeader from './security/auth-header';

//const baseURL = "http://localhost:8080/employeurs";

class EmployeurService{

    async getById(id) {
       return await axios.get("/employeurs/get?idEmployeur=" + id, { headers: authHeader() });
    }

    async post(employeur){
        fetch("/employeurs/createEmploye",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json());
    }

    async updatePassword(employeur, id){
        return axios.put("/employeurs/updatePassword/" + id, employeur, { headers: authHeader() });
    }
}

export default new EmployeurService()































