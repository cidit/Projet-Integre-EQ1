const baseURL = "http://localhost:8080/api/employeurs";

class EmployeurService{


    getAll(){
        fetch(baseURL +"/findAll", {method: "GET"} ).then(r => r.json()).then(data => console.log(data));
    }

    post(employeur){
        fetch(baseURL + "/createEmploye",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json()).then(data => console.log(data));
    }

    put(employeur){
        // fetch(baseURL + "/update",
        //     {method: "PUT",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(employeur)} )
        //     .then(r => r.json()).then(data => console.log(data));
    }
}


export default new EmployeurService()