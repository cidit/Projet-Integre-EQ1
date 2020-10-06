const baseURL = "http://localhost:8080/users";

class UserService{
    async getByEmail(email, password){
        let data;
        await fetch(baseURL +"/get/" +email + "/" + password, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getById(id) {
        let data;
        await fetch(baseURL + "/get?id=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }
}

export default new UserService()































