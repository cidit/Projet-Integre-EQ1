import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import Employeur from "../model/Employeur";


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

    handleSubmit(event) {
        event.preventDefault();
        // this.props.onSubmitted(this.state);
    }



    render(){
        return (
            <div className="formBox">
                <h3>Enregistrement Employeur</h3>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        Nom:
                        <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Telephone:
                        <input type="tel" name="telephone" value={this.state.telephone} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Addresse:
                        <input type="text" name="addresse" value={this.state.adresse} onChange={this.handleChange} />
                    </label>

                    <label>
                        Mot de passe:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>

                    <input type="submit" value="Register"/>

                </form>
            </div>
        );
    }




}

