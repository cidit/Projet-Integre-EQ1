import axios from "axios";

const baseURL = "http://localhost:8080/contrats/";

class ContratService {

    async getContrats() {
        return await axios.get(baseURL + "findAll");
    }

    async telechargerDocument(id) {
        return ( axios.request({
            url: baseURL + id,
            method: 'GET',
            responseType: 'blob',
        }))
    }

    async getContratById(id) {
        return await axios.get(baseURL + "getById"+ id);
    }


}
export default new ContratService()
