import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', };
    }

    handleChangeText = event => {
        this.setState({ filter: event.target.value });
    };
    
    async componentDidMount() {
        console.log(this.props.match.params.id);
        const { data: etudiants } = await EtudiantService.getEtudiants();
        this.setState({ etudiants });
    }

    render() {

        return (
            <div>
                <h1 className="text-center">Liste des étudiants</h1>

                <div className="form-group">
                    <div className="row">
                        <h4 className="text-center">FILTRAGE MATRICULE</h4>
                    </div>
                    <div className="row"> 
                        <input type='text' value={this.state.filter} onChange={this.handleChangeText} />
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
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