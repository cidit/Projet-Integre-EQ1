import axios from 'axios'

const BASE_URL = "http://localhost:8080/sessions/"

class SessionService {

    createSession() {
        return axios.post(BASE_URL + "createSession")
    }
}

export default new SessionService();