import axios from "axios";

const baseURL = "http://localhost:8080/contrats/";

class ContratService {

    async getContrats() {
        return await axios.get(baseURL + "findAll");
    }
    async getDocumentContrat(url) {
        const method = 'GET';

        console.log(url)
        //const url = 'http://localhost:8080/contrats/getContatFile/1';
        return () => {
            axios.request({
                url: 'http://localhost:8080/contrats/getContatFile/1',
                method: 'GET',
                responseType: 'blob',
            })
        }
    }

}
export default new ContratService()
