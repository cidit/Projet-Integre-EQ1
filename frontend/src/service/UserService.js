const baseURL = "http://localhost:8080/users";

class UserService {
    async getByEmail(email) {
        let data;
        await fetch(baseURL + "/get/" + email, {method: "GET"})
        .then(r => data = r.json())
        .catch(error => data = {});
        return data;
    }

    async validateCredentials(id, password) {
        let data;
        await fetch(baseURL + "/validate/" + id + "/" + password, {method: "GET"})
        .then(r => data = r.json())
        .catch(error => data = {});
        return data;
    }

}


export default new UserService()