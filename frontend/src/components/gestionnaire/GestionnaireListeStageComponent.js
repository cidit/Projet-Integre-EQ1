import React, { Component } from 'react';
import StageService from '../../service/StageService';

export default class GestionnaireListStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { stages: [] };
    }

    handleChangeText = event => {
        this.setState({ filter: event.target.value });
    };

    handleChangeRadio = event => {
        console.log(event.target.value)
        this.setState({ statut: event.target.value });
    };
    
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
                                <th> Titre </th>
                                <th> Programme </th>
                                <th> Description </th>
                                <th> Date Début </th>
                                <th> Date Finale </th>
                                <th> Ville </th>
                                <th> Heures par semaine </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stages
                                .map(
                                    stage =>
                                    <tr key={stage.id}>
                                        <td>{stage.titre}</td>
                                        <td>{stage.programme}</td>
                                        <td>{stage.dateDebut}</td>
                                        <td>{stage.dateFin}</td>
                                        <td>{stage.ville}</td>
                                        <td>{stage.nbHeuresParSemaine}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}