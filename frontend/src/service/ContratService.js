import axios from "axios";

const baseURL = "http://localhost:8080/contrats/";

class ContratService {

    async getContrats() {
        return await axios.get('http://localhost:8080/contrats/findAll');
    }

    async getCandidaturesSansContrat() {
        return await axios.get(baseURL +'getCandidaturesSansContrat');
    }

    async telechargerDocument(id) {
        return ( axios.request({
            url: baseURL + "getContratFile/"+ id,
            method: 'GET',
            responseType: 'blob',
        }))
    }

    async telechargerApercueContrat(id) {
        return ( axios.request({
            url: baseURL + "getApercueContrat/"+ id,
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
        const formData = new FormData();
            formData.append('file', file)
            formData.append('name',file.name);
        return axios.put(baseURL + "create/" + idCandidature, formData)
    }

    async createContratAuto(idCandidature, file){
        return axios.put(baseURL + "createAuto/" + idCandidature)
    }

}
export default new ContratService()
