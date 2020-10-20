import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stage";
const STAGES_URL_POST = "http://localhost:8080/stage/createStage";


class StageService{

    //axiom
    getStages(){
        return axios.get(STAGES_URL + "/findAll");
    }

    getStagesByEmployeurId(idEmployeur){
        return axios.get("http://localhost:8080/stage/stageByEmployeurId?idEmployeur="+ idEmployeur);
    }

    async getById(id) {
        let data;
        await fetch("http://localhost:8080/stage/getStage?idStage=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async updateStage(stage, id){
        fetch( "http://localhost:8080/stage/updateStatusStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    createStage(stage){
        return axios.post(STAGES_URL_POST,stage)
    }

    //fetch
    getAllStages(){
        return fetch(STAGES_URL + "/findAll").then(res =>{ return res.json();
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