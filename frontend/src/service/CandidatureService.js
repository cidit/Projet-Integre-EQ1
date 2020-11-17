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
        return axios.get(baseURL + "/getByStage?stage="+ idStage);
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


    async putCandidatureChoisi(id){
        return axios.put(baseURL + "/updateChoisi/" + id);
    }

    async putCandidatureApprouve(id){
        return axios.put(baseURL + "/updateApprouve/" + id);
    }

    async getCandidatureChoisi(id){
        let data;
        await fetch(baseURL + "/getChoisi/" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        console.log(data);
        return data;
    }

    async getAllChoisis(){
        let data;
        await fetch(baseURL +"/getAllChoisis", {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getCandidaturesChoisis() {
        return await axios.get(baseURL +"/getAllChoisis");
    }

    async convoqueEtudiantEntrevue(id){
        return axios.put(baseURL + "/convoqueEtudiantEntrevue/" + id);
    }

    async entrevuePasseeConfirmation(id){
        console.log(id)
        return axios.put(baseURL + "/entrevuePasseeConfirmation/" + id);
    }
}

export default new CandidatureService()































