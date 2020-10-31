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
        return await axios.get(baseURL + "getByEmployeurId/"+ id);
    }

    async getContratByEtudiantId(id) {
        return await axios.get(baseURL + "getByEtudiantId/"+ id);
    }

    async candidatureHasContrat(idcandidature) {
        return await axios.get(baseURL + "contratExiste/"+ idcandidature);
    }


    async createContrat(idCandidature, file){
        return axios.put(baseURL + "create/" + idCandidature, file)
    }

    asucreateContratV2(idCandidature, file){
        return axios.post(baseURL + "create/" + idCandidature, file);
    }


}
export default new ContratService()
