import axios from 'axios'

const BASE_URL = "http://localhost:8080/etudiants/registration"

class SessionService {
    isRegistered(id) {
        return axios.get(BASE_URL + "/isRegistered/" + id)
    }

    register(id) {
        return axios.put(BASE_URL + "/register/" + id)
    }
}

export default new SessionService();