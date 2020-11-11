import axios from 'axios'
const baseURL = "http://localhost:8080/evaluationStagiaire";

class EvaluationService{

    async put(evaluation, idEtudaint){
        return axios.post(baseURL + '/newEvaluation/'+ idEtudaint, evaluation)
    }

    async putEvaluation(evaluation, idEtudaint){
        fetch(baseURL + "/newEvaluation/"+idEtudaint,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(evaluation)} )
            
    }
}

export default new EvaluationService()
