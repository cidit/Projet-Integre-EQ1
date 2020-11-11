import axios from 'axios'

const BASE_URL = "http://localhost:8080/sessions/"

class SessionService {

    createSession(session) {
        console.log(session)
        return axios.post(BASE_URL + "createSession", session)
    }

}

export default new SessionService();