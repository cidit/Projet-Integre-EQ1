import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/createStage";


class StageService{

    //axiom
    getStages(){
        return axios.get(STAGES_URL);
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
        return fetch(STAGES_URL_POST,{
            method:'POST',
            body: JSON.stringify(stage),
            headers : {
                'Content-type':'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(res => console.log('Succes',res))
    }

}

export default new StageService()