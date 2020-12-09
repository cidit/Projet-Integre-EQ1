import axios from 'axios';

//const BASE_URL = "http://localhost:8080/sessions/"

class SessionService {

    isSessionSelectionneeEnCours(idSession){
        return axios.get("/sessions/isSessionSelectionneeEnCours/" +  idSession);
    }

    getSessionById(id){
        return axios.get("/sessions/findById/"+id);
    }

    getAllSessions(){
        return axios.get("/sessions/findAll");
    }

    async storeSessionParDefaut(){
        axios.get("/sessions/getSessionEnCours").then(res => window.localStorage.setItem("session", res.data.id));
        axios.get("/sessions/getSessionEnCours").then(res => window.localStorage.setItem("nomSession", res.data.nom));
    }

    async changeSession(id, nom){
        await window.localStorage.removeItem("session");
        await window.localStorage.removeItem("nomSession");
        await window.localStorage.setItem("session", id);
        await window.localStorage.setItem("nomSession", nom);
    }
}

export default new SessionService();