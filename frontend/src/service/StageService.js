import axios from 'axios'

const STAGES_URL = "http://localhost:8080/stages";

class StageService{

    getStages(){
        return axios.get(STAGES_URL);
    }

}

export default new StageService()