import axios from 'axios'

const BASE_URL = "http://localhost:8080/sessions/"

class SessionService {

    createSession(session) {
        console.log(session)
        return axios.post(BASE_URL + "createSession", session)
    }

    getAllSessions(){
        return axios.get(BASE_URL + "findAll")
    }
    async storeSessionParDefaut(){
        var session = "";
        axios.get(BASE_URL + "getSessionEnCours").then(res => window.localStorage.setItem("session", res.data.id));
        console.log(session)


    }
    async changeSession(id){
        var data;
        //await axios.get(BASE_URL + "getSessionEnCours").then(r => console.log(r.data.id))
        console.log(data)
        await window.localStorage.removeItem("session");
        await window.localStorage.setItem("session", id);
    }


}

export default new SessionService();