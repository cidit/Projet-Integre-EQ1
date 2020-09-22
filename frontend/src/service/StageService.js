import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/createStage";


class StageService{

    getStages(){
        return axios.get(STAGES_URL);
    }

    createStage(stage){
        return axios.post(STAGES_URL_POST,stage)
    }

}

export default new StageService()