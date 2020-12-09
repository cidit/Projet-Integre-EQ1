import axios from 'axios';
import authHeader from './security/auth-header';

//const baseURLStagiaire = "http://localhost:8080/evaluationStagiaire";
//const baseURLMilieuStage = "http://localhost:8080/evaluationMilieuStage";

class EvaluationService{

    async getAllEvaluationsStagiaire(){
        return await axios.get("/evaluationStagiaire/findAll", { headers: authHeader() });
    }

    async getAllEvaluationsMilieuStage(){
        return await axios.get("/evaluationMilieuStage/findAll", { headers: authHeader() });
    }


    async putEvaluationStagiaire(result, idEtudaint){
        fetch("/evaluationStagiaire/newEvaluation/"+idEtudaint,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
               } )
            
    }
    async putEvaluationMilieuStage(result, idCandidature,idEnseignant){
        fetch("/evaluationMilieuStage/newEvaluation/" + idCandidature + "/" + idEnseignant,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify(result),
               } )
            
    }

    async getEvaluationsStagiaireByEmployeur(idEmployeur, session){
        return await axios.get("/evaluationStagiaire/getByEmployeur/" + idEmployeur + "?idSession=" + session, { headers: authHeader() });
    }

    async getEvaluationsMilieuStageByEnseignant(idEnseignant){
        return await axios.get("/evaluationMilieuStage/getByEnseignant/" + idEnseignant, { headers: authHeader() });
    }

    async telechargerEvaluationMilieuStage(idEvaluation) {
        return await( axios.request({
            url: "/evaluationMilieuStage/getEvaluation/"+ idEvaluation,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }
    async telechargerEvaluationStagiaire(idEvaluation) {
        return await( axios.request({
            url: "/evaluationStagiaire/getEvaluation/"+ idEvaluation,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }
}

export default new EvaluationService()
