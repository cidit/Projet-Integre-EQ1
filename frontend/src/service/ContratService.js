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

    createContrat(idCandidature, formData){
        return axios.put(baseURL + "update/" + idCandidature, formData).then((result) => {
            console.log(result.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    updateContrat(idCandidature, formData){
        return axios.put(baseURL + "update/" + idCandidature, formData).then((result) => {
            console.log(result.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }


    accepteSignatureContrat(id, desc){
        var formData = new FormData();
        formData.append('desc', desc);
        return axios.put(baseURL + "accepteSignatureContrat/" + id, formData)
    }

    refuseSignatureContrat(id, desc){
        var formData = new FormData();
        formData.append('desc', desc);
        return axios.put(baseURL + "refuseSignatureContrat/" + id, formData)
    }

    refuseeSignatureContrat(id, desc){
        return axios.put(baseURL + "refuseSignatureContrat/" + id, desc)
    }
    async updateContratEmployeur(idCandidature, file){
        return axios.put(baseURL + "updateContratEmployeur/" + idCandidature, file)
    }
    asucreateContratV2(idCandidature, file) {
        return axios.post(baseURL + "create/" + idCandidature, file);
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

    getContratsNonSignesEtudiant() {
        return axios.get(baseURL + '/getContratsNonSignesEtudiant');
    }

    getContratsNonSignesEmployeur() {
        return axios.get(baseURL + '/getContratsNonSignesEmployeur');
    }

    getContratsNonSignesAdministration() {
        return axios.get(baseURL + '/getContratsNonSignesAdministration');
    }

}
export default new ContratService()
