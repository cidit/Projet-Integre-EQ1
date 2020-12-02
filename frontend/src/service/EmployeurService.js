import axios from 'axios'
const baseURL = "http://localhost:8080/employeurs";


class EmployeurService{
    async getAll(){
        let data;
        await fetch(baseURL +"/findAll", {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getById(id) {
       return await axios.get(baseURL + "/get?idEmployeur=" + id);
    }

    async post(employeur){
        fetch(baseURL + "/createEmploye",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json());
    }

    async put(employeur, id){
        fetch(baseURL + "/update/" + id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json());
    }

    async updatePassword(employeur, id){
        return axios.put(baseURL + "/updatePassword/" + id, employeur);
    }
}

export default new EmployeurService()































