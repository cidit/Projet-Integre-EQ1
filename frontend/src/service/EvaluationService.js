import axios from 'axios'
const baseURLStagiaire = "http://localhost:8080/evaluationStagiaire";
const baseURLMilieuStage = "http://localhost:8080/evaluationMilieuStage";

class EvaluationService{

    async put(evaluation, idEtudaint){
        return axios.post(baseURLStagiaire + '/newEvaluation/'+ idEtudaint, evaluation)
    }

    async putEvaluationStagiaire(result, idEtudaint){
        fetch(baseURLStagiaire + "/newEvaluation/"+idEtudaint,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result),
               } )
            
    }
    async putEvaluationMilieuStage(result, idCandidature,idEnseignant){
        fetch(baseURLMilieuStage + "/newEvaluation/" + idCandidature +"/" + idEnseignant,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result),
               } )
            
    }

    async getEvaluationsStagiaireByEmployeur(idEmployeur, session){
        return await axios.get(baseURLStagiaire + "/getByEmployeur/" + idEmployeur + "?idSession=" + session);
    }

    async getEvaluationsMilieuStageByEnseignant(idEnseignant){
        return await axios.get(baseURLMilieuStage + "/getByEnseignant/" + idEnseignant);
    }
}

export default new EvaluationService()
