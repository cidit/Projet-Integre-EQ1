import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/createStage";


class StageService{

    //axiom
    getStages(){
        return axios.get(STAGES_URL);
    }
    getStagesByEmployeurId(idEmployeur){
        return axios.get("http://localhost:8080/stageByEmployeurId?idEmployeur="+ idEmployeur);
    }



    createStage(stage){
        return axios.post(STAGES_URL_POST,stage)
    }

    //fetch
    getAllStages(){
        return fetch(STAGES_URL).then(res =>{ return res.json();
        }).then(res => {console.log(res)})   
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
}

export default new StageService()