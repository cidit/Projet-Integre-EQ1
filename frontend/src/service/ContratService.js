import axios from "axios";

const baseURL = "http://localhost:8080/contrats/";

class ContratService {

    async getContrats() {
        return await axios.get(baseURL + "findAll");
    }
    async getDocumentContrat(_url) {
        return (axios.request({
            url: _url,
            method: 'GET',
            responseType: 'blob',
        }))
    }
}
export default new ContratService()
