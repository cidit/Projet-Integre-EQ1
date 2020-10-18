import axios from 'axios'

const CV_URL = "http://localhost:8080/cvs";


class CVService{


    createCV(idEtudiant, file){
        const formData = new FormData();
        formData.append('id', idEtudiant);
        formData.append('name', "name");
        formData.append('status', "UNREVIEWED");
        formData.append('data', file);
        const options = {
            method: 'PUT',
            body: formData
        };
        fetch(CV_URL + "/create", options);
    }
}

export default new CVService()