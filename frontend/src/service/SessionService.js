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

    async changeSession(id){
        console.log(id)
        await window.localStorage.removeItem("session");
        await window.localStorage.setItem("session", id);
    }


}

export default new SessionService();