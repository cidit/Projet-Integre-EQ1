const BASE_URL = "http://localhost:8080/users/"

class UserService {
    
    async getByEmail(email) {
        let data
        await fetch(BASE_URL + "get/" + email, {method: "GET"})
            .then(response => data = response.json())
            .catch(error => data = {})
        return data
    }

    async getById(id) {
        let data
        await fetch(BASE_URL + "one/" + id, {method: "GET"})
            .then(response => data = response.json())
            .catch(error => data = {})
        return data
    }

    async validateCredentials(id, password) {
        let data;
        await fetch(BASE_URL + "validate/" + id + "/" + password, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getReminders(id) {
        let data
        await fetch(BASE_URL + "reminders/" + id, {method: "GET"})
            .then(response => data = response.json())
            .catch(err => data = {})
        return data
    }
}

export default new UserService()