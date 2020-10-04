import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import { Tab, Tabs } from 'react-bootstrap';
import Etudiant from "../model/Etudiant";
import {simpleFetch} from "../crud/DataCRUD";
import Employeur from "../model/Employeur";

export default class Register extends Component {
    
    /**
     * NON FONCTIONNEL
     * PROBLÈME DE SET STATE AVEC PLUSIEURS OBJETS 
     */

    constructor(props) {
        super(props);
        this.state = {
            key: 'etudiant',
            etudiant: new Etudiant(),
            employeur: new Employeur(),
        };
        
        this.handleSubmitEtudiant = this.handleSubmitEtudiant.bind(this)
        this.handleChangeEtudiant = this.handleChangeEtudiant.bind(this)

        this.handleSubmitEmployeur = this.handleSubmitEmployeur.bind(this)
        this.handleChangeEmployeur = this.handleChangeEmployeur.bind(this)
    }

    handleChangeEtudiant(event) {
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmitEtudiant(event) {
        event.preventDefault()
        simpleFetch("/etudiants/create", "POST", this.state.etudiant).then(r => console.log(r))
        alert("SAVED ETUDIANT")
    }

    handleChangeEmployeur(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmitEmployeur(event) {
        event.preventDefault()
        simpleFetch("/employeurs/create", "POST", this.state.employeur).then(r => console.log(r))
        alert("SAVED EMPLOYEUR")
    }

    render(){
        
        return (
			<Tabs
				id="controlled-tab-example"
				activeKey={this.state.key}
				onSelect={key => this.setState({ key })}
			>
				<Tab eventKey="etudiant" title="Etudiant">
                    <h3>Enregistrement Etudiant</h3>
					<div className="row justify-content-center">
                        <form onSubmit={this.handleSubmitEtudiant} className="d-flex flex-column">
                            <label>Nom: <input required
                                            className="form-control"
                                            type="text"
                                            name="nom"
                                            value={this.state.etudiant.nom}
                                            onChange={this.handleChangeEtudiant}/></label>
                            <label>Prenom: <input required
                                                className="form-control"
                                                type="text"
                                                name="prenom"
                                                value={this.state.etudiant.prenom}
                                                onChange={this.handleChangeEtudiant}/></label>
                            <label>Matricule: <input required
                                                    className="form-control"
                                                    type="text"
                                                    name="matricule"
                                                    value={this.state.etudiant.matricule}
                                                    onChange={this.handleChangeEtudiant}/></label>
                            <label>email: <input required
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={this.state.etudiant.email}
                                                onChange={this.handleChangeEtudiant}/></label>
                            <label>Password: <input required
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    value={this.state.etudiant.password}
                                                    onChange={this.handleChangeEtudiant}/></label>
                            <label>Telephone: <input required
                                                    className="form-control"
                                                    type="text" name="telephone"
                                                    value={this.state.etudiant.telephone}
                                                    onChange={this.handleChangeEtudiant}/></label>
                            <label>Adresse: <input required
                                                className="form-control"
                                                type="text"
                                                name="adresse"
                                                value={this.state.etudiant.adresse}
                                                onChange={this.handleChangeEtudiant}/></label>
                            <label>Programme: <input required
                                                    className="form-control"
                                                    type="text"
                                                    name="programme"
                                                    value={this.state.etudiant.programme}
                                                    onChange={this.handleChangeEtudiant}/></label>
                            <input className="btn btn-primary" type="submit" value="Enregistrer"/>
                        </form>
                    </div>
				</Tab>
				<Tab eventKey="employeur" title="Employeur">
                    <h3>Enregistrement Employeur</h3>
					<div className="row justify-content-center">
                        <form onSubmit={this.handleSubmitEmployeur}>
                            <label>Nom de l'entreprise: <input required
                                            className="form-control" 
                                            type="text" 
                                            name="nom"  
                                            value={this.state.employeur.nom} 
                                            onChange={this.handleChangeEmployeur}/>
                            </label>
                            <label>Email: <input required
                                            className="form-control"
                                            type="email" 
                                            name="email" 
                                            value={this.state.employeur.email}
                                            onChange={this.handleChangeEmployeur}/>
                            </label>
                            <label>Telephone: <input required
                                            className="form-control"
                                            type="tel" 
                                            name="telephone"  
                                            value={this.state.employeur.telephone} 
                                            onChange={this.handleChangeEmployeur}/>
                            </label>
                            <label>Addresse: <input required
                                            className="form-control"
                                            type="text" 
                                            name="adresse"  
                                            value={this.state.employeur.adresse}
                                            onChange={this.handleChangeEmployeur} />
                            </label>
                            <label>Mot de passe: <input required
                                            className="form-control"
                                            type="password" 
                                            name="password"  
                                            value={this.state.employeur.password} 
                                            onChange={this.handleChangeEmployeur}/>
                            </label>
                            <input className="btn btn-primary" type="submit" value="Enregistrer"/>
                        </form>
                    </div>
				</Tab>
			</Tabs>
		);
    }
}