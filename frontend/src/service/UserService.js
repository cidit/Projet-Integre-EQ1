class UserService {
    async getByEmail(email) {
        let data
        await fetch("http://localhost:8080/users/get/" + email, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {})
        return data
    }

    async getReminders(id) {
        let data
        await fetch("http://localhost:8080/users/reminders/" + id, {method: "GET"})
            .then(response => data = response.json())
            .catch(err => data = {})

        return data
        //return fetch("http://localhost:8080/users/reminders/" + id, {method: "GET"})
    }
}

export default new UserService()