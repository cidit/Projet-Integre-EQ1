import axios from 'axios'

const STAGE_ETUDIANTS_URL_PUT = "http://localhost:8080/stages/updateEtudiantsAdmits/";
const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/stages/createStage";
const STAGES_URL_ACCEPTER = "http://localhost:8080/stageAccepter/create";

class StageService{

    getStages(idSession){
        return axios.get(STAGES_URL + "/findAll", { params: { idSession: idSession} });
    }

    getStagesSession(){
        return axios.get(STAGES_URL + "/getStagesSession");
    }

    getStagesApprouves(idSession){
        return axios.get(STAGES_URL + "/approuves", { params: { idSession: idSession} });
    }

    getStagesNonApprouves(idSession){
        return axios.get(STAGES_URL + "/nonApprouves", { params: { idSession: idSession} });
    }

    getStagesNonCombles(idSession){
        return axios.get(STAGES_URL + "/nonComble", { params: { idSession: idSession} });
    }
    
    getStageById(id){
        return axios.get(STAGES_URL + "/getStage?idStage=" + id);
    }

    getStagesByEmployeurId(idEmployeur, idSession){
        return axios.get(STAGES_URL + "/stageByEmployeurId/" + idEmployeur, { params: { idSession: idSession} });
    }

    getStagesEtudiant(idEtudiant, idSession){
        return axios.get(STAGES_URL + "/stagesEtudiant/"+ idEtudiant, { params: { idSession: idSession} });
    }
    
    getEtudiantsByStageId(idStage) {
        return axios.get(STAGES_URL + "/getEtudiantsAdmits/" + idStage);
    }

    async getById(id) {
        let data;
        await fetch(STAGES_URL + "/getStage?idStage=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async updateStageStatus(stage, id){
        fetch( STAGES_URL + "/updateStatusStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
    }

    async updateStage(stage, id){
        fetch( STAGES_URL + "/updateStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
    }

    createStage(stage){
        return axios.post(STAGES_URL_POST, stage)
    }

    addEtudiants(id, etudiants){
        return axios.put(STAGE_ETUDIANTS_URL_PUT + id, etudiants);
    }

    getStagesApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get(STAGES_URL + "/stagesApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession} });
    }

    getStagesNonApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get(STAGES_URL + "/stagesNonApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession} });
    }
}

export default new StageService()