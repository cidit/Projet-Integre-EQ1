import React, { Component } from 'react';
import EtudiantService from '../service/EtudiantService';
import axios from 'axios'

export default class ListEtudiantsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', };
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };
    /*
    componentDidMount() {
        EtudiantService.getEtudiants().then((res) => { this.setState({ etudiants: res.data }) })
        //EtudiantService.getEtudiantByMatricule(this.state.filter).then((res) => { this.setState({ etudiants: [res.data] }) })
    }
    */
    async componentDidMount() {
            const { data: etudiants } = await axios.get(
                "http://localhost:8080/etudiants/findAll"
            );
            this.setState({ etudiants });
        }
    render() {

        return (
            <div>
                <h2 className="text-center">List des étudiants</h2>
                <input type='text' value={this.state.filter} onChange={this.handleChange} />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prenom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .filter(etudiant => etudiant.matricule.includes(this.state.filter))
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}