import EmployeurService from "./EmployeurService";
import UserService from "./UserService";
const baseURL = "http://localhost:8080/users";

class LoginService{
    async login(email, password){
        let data;
        await fetch(baseURL +"/get/" +email + "/" + password, {method: "GET"} )
            .then(r => data = r.json()).then(res => this.storage(res))
            .catch(error => data = {});
        return data;
        //await this.storage(user);
    }
    async storage(user) {
        await localStorage.setItem("id", user.id);
        await localStorage.setItem("desc", user.desc);
    }
}

export default new LoginService()