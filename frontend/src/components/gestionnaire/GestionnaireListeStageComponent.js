import React, { Component } from 'react';
import StageService from '../../service/StageService';

export default class GestionnaireListStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { stages: [] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id){
        this.props.history.push('/stageSelectEtudiants/' + id);
    }
    
    async componentDidMount() {
            const { data: stages } = await StageService.getStages();
            this.setState({ stages });
    }

    render() {

        return (
            <div>
                <h1 className="text-center">Liste des stages approuvées</h1>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Nombre d'étudiant </th>
                                <th> Titre </th>
                                <th> Programme </th>
                                <th> Date Début </th>
                                <th> Date Finale </th>
                                <th> Ville </th>
                                <th> Heures par semaine </th>
                                <th> Statut approbation </th>
                                <th> Statut overture </th>
                                <th> Assigner étudiant(s) </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stages
                                .filter(stage => stage.approuve && stage.ouvert)
                                .map(
                                    stage =>
                                    <tr key={stage.id}>
                                        <td>{stage.etudiantsAdmits.length}</td>
                                        <td>{stage.titre}</td>
                                        <td>{stage.programme}</td>
                                        <td>{stage.dateDebut}</td>
                                        <td>{stage.dateFin}</td>
                                        <td>{stage.ville}</td>
                                        <td>{stage.nbHeuresParSemaine}</td>
                                        
                                        <td>{stage.approuve
                                            ? <span className="text-success"> Approuvé </span>
                                            : <span className="text-danger">En attente d'approbation</span>}</td>
                                        <td>{stage.ouvert ? 'Ouvert' : 'Fermé'}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => this.handleClick(stage.id)} >
                                                Assigner
                                            </button>
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}