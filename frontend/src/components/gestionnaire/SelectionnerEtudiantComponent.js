import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Stage from '../../model/Stage'

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', etudiantsPermis: [], };
        this.addAllEtudiant = this.addAllEtudiant.bind(this);
    }

    addAllEtudiant(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiants);
        this.props.history.push('/gestionnaireStage');
    }

    async componentDidMount() {
        var stage = new Stage();
        stage = await StageService.getStageById(this.props.match.params.id);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        this.setState({ etudiants });
    }

    render() {

        return (
            <div>
                <h1 className="text-center">Liste des étudiants</h1>

                <div className="form-group">
                    <div className="row"> 
                        <button onClick={this.addAllEtudiant}>SÉLECTIONNER TOUT</button>
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