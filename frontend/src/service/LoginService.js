import EmployeurService from "./EmployeurService";

class LoginService{
    async login(email){
        let user = await EmployeurService.getByEmail("toto");
        await this.storage(user);
    }
    async storage(user) {
        await localStorage.setItem("id", "4");
        await localStorage.setItem("desc", "EMP");
    }
}

export default new LoginService()