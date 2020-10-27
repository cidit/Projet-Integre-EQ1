import React, { Component } from 'react';
import CandidatureService from "../service/CandidatureService";


export default class ListeCandidaturesEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatures: [],
            employeurId: ""
        };
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");
        const { data: candidatures } = await CandidatureService.getByEtudiant(id);
        this.setState({ candidatures });
    }

    AccepterStage(id){
        CandidatureService.putCandidatureChoisi(id);
    }

    render() {
        return (
                <div className="container">
                    <div className="col">
                        <div className="pt-3 mt-3">
                            <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Vos candidatures</h5>

                            <div className="row">

                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr >
                                        <th> Titre </th>
                                        <th> Programme </th>
                                        <th> Description </th>
                                        <th> Date de début </th>
                                        <th> Date de fin </th>
                                        <th> Ville </th>
                                        <th> Nombre d'heures par semaine </th>
                                        <th> Statut</th>
                                        <th> Confirmer stage choisi </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.candidatures.map(
                                        candidature =>
                                            <tr key={candidature.id}>
                                                <td>{candidature.stage.titre}</td>
                                                <td>{candidature.stage.programme}</td>
                                                <td>{candidature.stage.description}</td>
                                                <td>{candidature.stage.dateDebut}</td>
                                                <td>{candidature.stage.dateFin}</td>
                                                <td>{candidature.stage.ville}</td>
                                                <td>{candidature.stage.nbHeuresParSemaine}</td>
                                                <td>{candidature.statut}</td>
                                                <td> 
                                                    <button className="btn btn-primary" onClick={() => this.AccepterStage(candidature.id)}
                                                        disabled={candidature.statut !== "APPROUVE"}> 
                                                        Confirmer
                                                    </button>
                                                </td>
                                            </tr>
                                    )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

