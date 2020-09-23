import React, {Component} from "react";
import Etudiant from "../model/Etudiant";

export default class EtudiantRegister extends Component {

    constructor(props) {
        super(props);
        this.state = new Etudiant()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmitted(this.state)
    }

    render() {
        return (
            <div>
                <h3>Register Etudiant</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Nom: <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange}/></label>
                    <label>Prenom: <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange}/></label>
                    <label>Matricule: <input type="text" name="matricule" value={this.state.matricule} onChange={this.handleChange}/></label>
                    <label>email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/></label>
                    <label>Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/></label>
                    <label>Telephone: <input type="text" name="telephone" value={this.state.telephone} onChange={this.handleChange}/></label>
                    <label>Adresse: <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange}/></label>
                    <label>Programme: <input type="text" name="programme" value={this.state.programme} onChange={this.handleChange}/></label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

}