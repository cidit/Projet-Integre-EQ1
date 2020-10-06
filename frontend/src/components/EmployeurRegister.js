import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import Employeur from "../model/Employeur";
import EmployeurService from "../service/EmployeurService";

export default class EmployeurRegister extends Component {
    
    constructor(props) {
        super(props);
        this.state = new Employeur();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let x = "email";
        let data = await EmployeurService.getByEmail(this.state[x]);
        if (data[x] != this.state[x]){
            await this.setState({desc: "Employeur"});
            await EmployeurService.post(this.state);
            // await this.props.history.push('/login'); // undefined 
        } else {
             alert("Ce email est deja utilise");
        }
    }

    render(){
        return (
            <div className="formBox">
                <h3>Enregistrement Employeur</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom de l'entreprise:
                        <input type="text" name="nomEntreprise" required value={this.state.nomEntreprise} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required value={this.state.email}
                               onChange={this.handleChange}/>
                    </label>
                    <label>
                        Telephone:
                        <input type="tel" name="telephone" required value={this.state.telephone}
                               onChange={this.handleChange}/>
                    </label>
                    <label>
                        Addresse:
                        <input type="text" name="adresse" required value={this.state.adresse}
                               onChange={this.handleChange}/>
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" required value={this.state.password}
                               onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}