import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import Employeur from "../model/Employeur";
import EmployeurService from "../service/EmployeurService";
import Redirect from "react-router-dom";

export default class EmployeurRegister extends Component {
    constructor(props) {
        super(props);
        this.state = new Employeur();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }

    async handleSubmit(event) {
        event.preventDefault();
        let x = "email";
        let data = await EmployeurService.getByEmail(this.state[x]);
        console.log(data);
        if (data[x] != this.state[x]){
             EmployeurService.post(this.state);


            //window.location.href("http://localhost:3000");


        } else {
             alert("Ce email est deja utilise");
        }
        // this.props.onSubmitted(this.state);
    }

    render(){
        return (
            <div className="formBox">
                <h3>Enregistrement Employeur</h3>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        Nom:
                        <input type="text" name="nom" required value={this.state.nom} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" required value={this.state.email} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Telephone:
                        <input type="tel" name="telephone" required value={this.state.telephone} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Addresse:
                        <input type="text" name="adresse" required value={this.state.adresse} onChange={this.handleChange} />
                    </label>

                    <label>
                        Mot de passe:
                        <input type="password" name="password" required value={this.state.password} onChange={this.handleChange}/>
                    </label>

                    <input type="submit" value="Register"/>

                </form>
            </div>
        );
    }
}

