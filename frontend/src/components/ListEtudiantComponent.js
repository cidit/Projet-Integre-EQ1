import React, { Component } from 'react';
import EtudiantService from '../service/EtudiantService';


export default class ListEtudiantsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { etudiant: [], };
    }

    componentDidMount() {
        EtudiantService.getEtudiants().then((res) => { this.setState({ etudiant: res.data }) })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">List des étudiants</h2>
                // search bar
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
                            {this.state.etudiant.map(
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