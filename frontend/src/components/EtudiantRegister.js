import React, {Component} from "react";
import Etudiant from "../model/Etudiant";
import {simpleFetch} from "../crud/DataCRUD";

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
        simpleFetch("/api/create", "POST", this.state).then(r => console.log(r))
        // this.props.onSubmitted(this.state)
    }

    render() {
        return (
            <div className="container">
                <h3>Register Etudiant</h3>
                <form onSubmit={this.handleSubmit} className="d-flex flex-column">
                    <label>Nom: <input className="form-control" type="text" name="nom" value={this.state.nom}
                                       onChange={this.handleChange}/></label>
                    <label>Prenom: <input className="form-control" type="text" name="prenom" value={this.state.prenom}
                                          onChange={this.handleChange}/></label>
                    <label>Matricule: <input className="form-control" type="text" name="matricule"
                                             value={this.state.matricule} onChange={this.handleChange}/></label>
                    <label>email: <input className="form-control" type="text" name="email" value={this.state.email}
                                         onChange={this.handleChange}/></label>
                    <label>Password: <input className="form-control" type="text" name="password"
                                            value={this.state.password} onChange={this.handleChange}/></label>
                    <label>Telephone: <input className="form-control" type="text" name="telephone"
                                             value={this.state.telephone} onChange={this.handleChange}/></label>
                    <label>Adresse: <input className="form-control" type="text" name="adresse"
                                           value={this.state.adresse} onChange={this.handleChange}/></label>
                    <label>Programme: <input className="form-control" type="text" name="programme"
                                             value={this.state.programme} onChange={this.handleChange}/></label>
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}