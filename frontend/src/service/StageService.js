const STAGE_ETUDIANTS_URL_PUT = "http://localhost:8080/stages/updateEtudiantsAdmits/";
const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/stages/createStage";

class StageService{

    //axiom
    getStages(){
        return axios.get(STAGES_URL + "/findAll");
    }
    
    getStageById(id){
        return axios.get(STAGES_URL + "/getStage?idStage=" + id);
    }


    getStagesByEmployeurId(idEmployeur){
        return axios.get(STAGES_URL + "/stageByEmployeurId?idEmployeur="+ idEmployeur);
    }

    getStagesEtudiant(idEtudiant){
        return axios.get(STAGES_URL + "/stagesEtudiant?idEtudiant="+ idEtudiant);
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


    createStage(stage){
        return axios.post(STAGES_URL_POST,stage)
    }

    addEtudiants(id, etudiants){
        return axios.put(STAGE_ETUDIANTS_URL_PUT + id, etudiants);
    }
}

export default new StageService()