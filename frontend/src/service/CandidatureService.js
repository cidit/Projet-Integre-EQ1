import axios from "axios";
import authHeader from './security/auth-header';

//const baseURL = "http://localhost:8080/candidatures";


class CandidatureService{

    async getById(id) {
        let data;
        await fetch("/get?idCandidature=" + id, {method: "GET", headers: authHeader()})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    getByEtudiant(idEtudiant, idSession) {
        return axios.get("/getByEtudiant/" + idEtudiant, { params: { idSession: idSession}, headers: authHeader() });
    }

    getByStage(idStage) {
        return axios.get("/getByStage?stage=" + idStage, { headers: authHeader() });
    }

    async post(idEtudiant, idStage){
        return axios.post("/createCandidature?idEtudiant=" + idEtudiant + "&idStage=" + idStage);
    }

    async putCandidatureChoisi(id){
        return axios.put("/updateChoisi/" + id, { headers: authHeader() });
    }

    async putCandidatureApprouve(id){
        return axios.put("/updateApprouve/" + id, { headers: authHeader() });
    }

    async getCandidatureChoisi(id){
        let data;
        await fetch("/getChoisi/" + id, {method: "GET", headers: authHeader()})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }


    async getCandidaturesChoisis(idSession) {
        return await axios.get("/getAllChoisis", { params: { idSession: idSession}, headers: authHeader() });
    }

    async getCandidaturesAEvaluerParEmployeur(idEmployeur, idSession) {
        return axios.get("/getListAEvaluer/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }

    async getCandidaturesEmployeurNonEvalues(id) {
        return await axios.get("/getListByEmployeurNonEvalues/" + id, { headers: authHeader() });
    }
}

export default new CandidatureService()































