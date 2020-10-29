import axios from "axios";

const baseURL = "http://localhost:8080/contrats/";

class ContratService {

    async getContrats() {
        return await axios.get('http://localhost:8080/contrats/findAll');
    }

    async telechargerDocument(id) {
        return ( axios.request({
            url: baseURL + "getContratFile/"+ id,
            method: 'GET',
            responseType: 'blob',
        }))
    }

    async getContratByEmployeurId(id) {
        console.log(id)
        return await axios.get(baseURL + "getByEmployeurId/"+ id);
    }

    async getContratByEtudiantId(id) {
        return await axios.get(baseURL + "getByEtudiantId/"+ id);
    }


}
export default new ContratService()
