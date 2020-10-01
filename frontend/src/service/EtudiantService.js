const ETUDIANTS_URL = "http://localhost:8080/etudiants/findAll";
const baseURL = "http://localhost:8080/etudiants";
const ETUDIANT_MATRICULE = "http://localhost:8080/etudiants/matricule?matricule=";

class EtudiantService{

    //axiom
    getEtudiants(){
        return axios.get(ETUDIANTS_URL);
    }

    getEtudiantByMatricule(matricule){
        return axios.get(ETUDIANT_MATRICULE + matricule);
    }
}

export default new EtudiantService()