import React, {Component} from "react";
import Etudiant from "../model/Etudiant";
import {simpleFetch} from "../crud/DataCRUD";
import EtudiantService from "../service/EtudiantService";

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
        this.setState({statutStage: "aucun stage"});
        simpleFetch("/etudiants/create", "POST", this.state).then(r => console.log(r))
    }

    async handleSubmit(event) {
        event.preventDefault();
        let x = "email";
        let data = await EtudiantService.getByEmail(this.state[x]);
        if (data[x] != this.state[x]){
            await this.setState({statutStage: "aucun stage"});
            await this.setState({desc: "Etudiant"});
            await EtudiantService.post(this.state);
            // await this.props.history.push('/login'); // undefined 
        } else {
             alert("Ce email est deja utilise");
        }
    }

    render() {
        return (
            <div className="formBox">
                <h3>Enregistrement Etudiant</h3>
                <form onSubmit={this.handleSubmit} className="d-flex flex-column">
                    <label>Nom: <input required
                                       type="text"
                                       name="nom"
                                       value={this.state.nom}
                                       onChange={this.handleChange}/></label>
                    <label>Prenom: <input required
                                          type="text"
                                          name="prenom"
                                          value={this.state.prenom}
                                          onChange={this.handleChange}/></label>
                    <label>Matricule: <input required
                                             type="text"
                                             name="matricule"
                                             value={this.state.matricule}
                                             onChange={this.handleChange}/></label>
                    <label>email: <input required
                                         type="email"
                                         name="email"
                                         value={this.state.email}
                                         onChange={this.handleChange}/></label>
                    <label>Password: <input required
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}/></label>
                    <label>Telephone: <input required
                                             type="text" name="telephone"
                                             value={this.state.telephone}
                                             onChange={this.handleChange}/></label>
                    <label>Adresse: <input required
                                           type="text"
                                           name="adresse"
                                           value={this.state.adresse}
                                           onChange={this.handleChange}/></label>
                    <label>Programme: <input required
                                             type="text"
                                             name="programme"
                                             value={this.state.programme}
                                             onChange={this.handleChange}/></label>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}