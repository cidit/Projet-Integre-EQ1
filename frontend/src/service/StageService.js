import axios from 'axios';
import authHeader from './security/auth-header';

//const STAGES_URL = "http://localhost:8080/stages";


class StageService{

    getStagesApprouves(idSession){
        return axios.get("/stages/approuves", { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonApprouves(idSession){
        return axios.get("/stages/nonApprouves", { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonCombles(idSession){
        return axios.get("/stages/nonComble", { params: { idSession: idSession}, headers: authHeader() });
    }
    
    getStageById(id){
        return axios.get("/stages/getStage?idStage=" + id, { headers: authHeader() });
    }

    getStagesEtudiant(idEtudiant, idSession){
        return axios.get("/stages/stagesEtudiant/"+ idEtudiant, { params: { idSession: idSession}, headers: authHeader() });
    }
    
    getEtudiantsByStageId(idStage) {
        return axios.get("/stages/getEtudiantsAdmits/" + idStage, { headers: authHeader() });
    }

    async updateStage(stage, id){
        fetch( "/stages/updateStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
    }

    createStage(stage){
        return axios.post("/stages/createStage", stage, { headers: authHeader() })
    }

    addEtudiants(id, etudiants){
        return axios.put("/stages/updateEtudiantsAdmits/" + id, etudiants, { headers: authHeader() });
    }

    getStagesApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get("/stages/stagesApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get("/stages/stagesNonApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }
}

export default new StageService()