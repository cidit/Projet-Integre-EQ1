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
    async putEvaluationMilieuStage(result, idCandidature){
        console.log("idcandidature")
        console.log(idCandidature)
        fetch(baseURLMilieuStage + "/newEvaluation/" + idCandidature,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result),
               } )
            
    }

    async getEvaluatinsStagiaireByEmployeur(idEmployeur, idSession){
        return await axios.get(baseURLStagiaire + "/getByEmployeur/" + idEmployeur, { params: { idSession: idSession} });
    }
}

export default new EvaluationService()
