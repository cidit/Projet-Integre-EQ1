import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/createStage";
const STAGE_ETUDIANTS_URL_PUT = "http://localhost:8080/stages/updateEtudiantsAdmits/";

class StageService{

    //axiom
    getStages(){
        return axios.get(STAGES_URL);
    }
    
    getStageById(id){
        return axios.get("http://localhost:8080/getStage?idStage=" + id);
    }

    getStagesByEmployeurId(idEmployeur){
        return axios.get("http://localhost:8080/stageByEmployeurId?idEmployeur="+ idEmployeur);
    }
    
    getStagesEtudiant(idEtudiant){
        return axios.get("http://localhost:8080/stagesEtudiant?idEtudiant="+ idEtudiant);
    }
    
    getEtudiantsByStageId(idStage){
        return axios.get("http://localhost:8080/stages/getEtudiantsAdmits/" + idStage);
    }


    createStage(stage){
        return axios.post(STAGES_URL_POST,stage)
    }

    createNewStage(stage){
        fetch(STAGES_URL_POST, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(stage), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }

    /*
    addEtudiants(id, etudiants){
        fetch(STAGE_ETUDIANTS_URL_PUT + id, {
            method: 'PUT',
            body: JSON.stringify(etudiants),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
    */

    addEtudiants(id, etudiants){
        return axios.put(STAGE_ETUDIANTS_URL_PUT + id, etudiants);
    }
}

export default new StageService()