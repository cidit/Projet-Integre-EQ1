import axios from 'axios'
import CV from "../model/CV";

const CV_URL = "http://localhost:8080/cvs";


class CVService{

    createCV(idEtudiant, formData){
        return axios.put(CV_URL + "/create/" + idEtudiant, formData)

    }
}

export default new CVService()