
class UserService {
    async getByEmail(email) {
        let data;
<<<<<<< HEAD
        await fetch("http://localhost:8080/users/get/" + email, {method: "GET"})
=======
        await fetch("http://localhost:8080/users/get/richard@email.com", {method: "GET"})
            .then(r=> console.log(r))
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getByEmail2(email){
        let data;
        await fetch("http://localhost:8080/users/email?email=" +email, {method: "GET"} )
>>>>>>> testRichard
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

}

export default new UserService()

