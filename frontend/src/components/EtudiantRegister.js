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

    }

    render() {
        return (
            <div className="container">
                <h3>Register Etudiant</h3>
                <form onSubmit={this.handleSubmit} className="d-flex flex-column">
                    <label>Nom: <input required="true"
                                       className="form-control"
                                       type="text"
                                       name="nom"
                                       value={this.state.nom}
                                       onChange={this.handleChange}/></label>
                    <label>Prenom: <input required="true"
                                          className="form-control"
                                          type="text"
                                          name="prenom"
                                          value={this.state.prenom}
                                          onChange={this.handleChange}/></label>
                    <label>Matricule: <input required="true"
                                             className="form-control"
                                             type="text"
                                             name="matricule"
                                             value={this.state.matricule}
                                             onChange={this.handleChange}/></label>
                    <label>email: <input required="true"
                                         className="form-control"
                                         type="email"
                                         name="email"
                                         value={this.state.email}
                                         onChange={this.handleChange}/></label>
                    <label>Password: <input required="true"
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}/></label>
                    <label>Telephone: <input required="true"
                                             className="form-control"
                                             type="text" name="telephone"
                                             value={this.state.telephone}
                                             onChange={this.handleChange}/></label>
                    <label>Adresse: <input required="true"
                                           className="form-control"
                                           type="text"
                                           name="adresse"
                                           value={this.state.adresse}
                                           onChange={this.handleChange}/></label>
                    <label>Programme: <input required="true"
                                             className="form-control"
                                             type="text"
                                             name="programme"
                                             value={this.state.programme}
                                             onChange={this.handleChange}/></label>
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}