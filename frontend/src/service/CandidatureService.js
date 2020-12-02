import axios from "axios";

const baseURL = "http://localhost:8080/candidatures";

class CandidatureService{

    async getById(id) {
        let data;
        await fetch(baseURL + "/get?idCandidature=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    getByEtudiant(idEtudiant, idSession) {
        return axios.get(baseURL + "/getByEtudiant/" + idEtudiant, { params: { idSession: idSession} });
    }

    getByStage(idStage) {
        return axios.get(baseURL + "/getByStage?stage="+ idStage);
    }

    async post(idEtudiant, idStage){
        return axios.post(baseURL + "/createCandidature?idEtudiant=" + idEtudiant + "&idStage=" + idStage);
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
        return data;
    }

    async getAllChoisis(){
        let data;
        await fetch(baseURL +"/getAllChoisis", {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getCandidaturesChoisis(idSession) {
        return await axios.get(baseURL +"/getAllChoisis", { params: { idSession: idSession} });
    }


    async getCandidaturesByPremierMoisStage() {
        return await axios.get(baseURL +"/getByPremierMoisStage");
    }

    async getCandidaturesAEvaluerParEmployeur(idEmployeur, idSession) {
        return axios.get(baseURL + "/getListAEvaluer/" + idEmployeur, { params: { idSession: idSession} });
    }

    async getCandidatureEtudiantByEnseignant(id) {
        return await axios.get(baseURL +"/getListByEnseignant/"+id);
    }

    async getCandidaturesEmployeurNonEvalues(id) {
        return await axios.get(baseURL +"/getListByEmployeurNonEvalues/"+id);
    }
}

export default new CandidatureService()































