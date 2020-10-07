const baseURL = "http://localhost:8080/users";

class LoginService{
    async login(email, password){
        let data;
        await fetch(baseURL +"/get?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .then(res => {
                if (res.password === password)
                    this.storage(res);
            })
            .then((res)=>console.log(res))
            .catch(error => data = {});
        return data;
    }

    async storage(user) {
        await localStorage.setItem("id", user.id);
        await localStorage.setItem("desc", user.desc);
    }

    async logout() {
        await localStorage.removeItem("id");
        await localStorage.removeItem("desc");
    }
}

export default new LoginService()