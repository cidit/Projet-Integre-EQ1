import axios from 'axios'
import CV from "../model/CV";

const CV_URL = "http://localhost:8080/cvs";


class CVService{

    createCV(idEtudiant, formData){
        return axios.put(CV_URL + "/create/" + idEtudiant, formData)

    }
    async getCVByEtudiant(etudiant) {
        const method = 'GET';
        const url = 'http://localhost:8080/cvs/get/' + etudiant.id;
        return (axios.request({
                url,
                method,
                responseType: 'blob'
            }))

    }

    updateCVStatus(isValid, id){
        console.log(isValid);
        const formData = new FormData();
        formData.append('isValid', isValid);
        const options = {
            method: 'PUT',
            body: formData
        };
        return axios.put(CV_URL + "/update/" + id, formData)
    }
}

export default new CVService()