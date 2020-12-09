import axios from 'axios';
import authHeader from './security/auth-header';

//const baseURL = "http://localhost:8080/etudiants";

class EtudiantService{

    getEtudiants(idSession){
        return axios.get( "/etudiants/findAll", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantById(id){
        return axios.get("/etudiants/get?idEtudiant=" + id, { headers: authHeader() });
    }

    getEtudiantsAucunCV(idSession){
        return axios.get("/etudiants/getAllSansCV", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsCVNonApprouve(idSession){
        return axios.get("/etudiants/getAllCVNonApprouve", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsSansStage(idSession){
        return axios.get("/etudiants/get/aucunStage", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsByProgramme(programme, idSession){
        return axios.get("/etudiants/get/" + programme, { params: { idSession: idSession}, headers: authHeader() });
    }

    async post(etudiant){
        fetch("/etudiants/create",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)} )
            .then(r => r.json());
    }

    isRegistered(id) {
        return axios.get("/etudiants/registration/isRegistered/" + id, { headers: authHeader() })
    }

    async register(id) {
        return axios.put("/etudiants/registration/register/" + id, { headers: authHeader() })
    }

    async updatePassword(etudiant, id){
        return axios.put("/etudiants/updatePassword/" + id, etudiant, { headers: authHeader() });
    }

    async setEnseignant(idetudiant, idEnseignant) {
        return await axios.put("/etudiants/setEnseignant/" + idetudiant + "/" + idEnseignant, { headers: authHeader() })
    }

    async enleverEnseignant(idetudiant, idEnseignant) {
        return await axios.put("/etudiants/enleverEnseignant/" + idetudiant + "/" + idEnseignant, { headers: authHeader() })
    }

    async getEtudiantsbyEnseignat(idEnseignant){
        return axios.get("/etudiants/getAllbyEnseignant/" + idEnseignant, { headers: authHeader() });
    }
    
}

export default new EtudiantService()