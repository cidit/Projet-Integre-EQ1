import axios from "axios";

const baseURL = "http://localhost:8080/candidatures";

class CandidatureService{
    async getAll(){
        let data;
        await fetch(baseURL +"/findAll", {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getById(id) {
        let data;
        await fetch(baseURL + "/get?idCandidature=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    getByEtudiant(idEtudiant) {
        return axios.get(baseURL + "/getByEtudiant?idEtudiant=" + idEtudiant);

    }

    async getByStage(idStage) {
        return axios.get(baseURL + "/getByStage?idStage="+ idStage);

    }

    async post(idEtudiant, idStage){
        const formData = new FormData();
        formData.append('idEtudiant', idEtudiant);
        formData.append('idStage', idStage);
        const options = {
            method: 'POST',
            body: formData
        };
        fetch(baseURL + "/createCandidature", options);

    }

    async put(candidature, id){
        fetch(baseURL + "/update/"+id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candidature)} )
            .then(r => r.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    async putCandidatureChoisi(id){
        return axios.put(baseURL + "/updateChoisi/" + id);
    }

    async getCandidatureChoisi(id){
        let data;
        await fetch(baseURL + "/getChoisi/" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        console.log(data);
        return data;
    }
}

export default new CandidatureService()































