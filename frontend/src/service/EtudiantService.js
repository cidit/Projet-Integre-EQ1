import axios from 'axios'

const ETUDIANTS_URL = "http://localhost:8080/etudiants/findAll";
const baseURL = "http://localhost:8080/etudiants";
const ETUDIANT_GET = "http://localhost:8080/etudiants/get";

class EtudiantService{

    getEtudiants(idSession){
        return axios.get(ETUDIANTS_URL, { params: { idSession: idSession} });
    }

    getEtudiantById(id){
        return axios.get(ETUDIANT_GET + "?idEtudiant=" + id);
    }

    getEtudiantsAucunCV(idSession){
        return axios.get(baseURL + "/getAllSansCV", { params: { idSession: idSession} });
    }

    getEtudiantsCVNonApprouve(idSession){
        return axios.get(baseURL + "/getAllCVNonApprouve",
            { params: { idSession: idSession} });
    }

    getEtudiantsSansStage(idSession){
        return axios.get(baseURL + "/get/aucunStage", { params: { idSession: idSession} });
    }

    getEtudiantsByProgramme(programme, idSession){
        return axios.get(ETUDIANT_GET + "/" + programme, { params: { idSession: idSession} });
    }


    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async post(etudiant){
        fetch(baseURL + "/create",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)} )
            .then(r => r.json());
    }

    isRegistered(id) {
        return axios.get( baseURL + "/registration/isRegistered/" + id)
    }

    async register(id) {
        return axios.put(baseURL + "/registration/register/" + id)
    }

    async updatePassword(etudiant, id){
        fetch(baseURL + "/updatePassword/" + id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)} )
            .then(r => r.json());
    }

    async setEnseignant(idetudiant, idEnseignant) {
        return await axios.put(baseURL + "/setEnseignant/"+idetudiant+"/"+ idEnseignant)
    }

    async  getEtudiantsbyEnseignat(idEnseignant){
        return axios.get(baseURL + "/getAllbyEnseignant/"+idEnseignant);
    }


    
}

export default new EtudiantService()