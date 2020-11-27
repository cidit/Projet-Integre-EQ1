import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Etudiant from '../../model/Etudiant';

import {Alert} from "@material-ui/lab";
import CandidatureService from "../../service/CandidatureService";

export default class SelectionnerEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { candidatures: []};
    }

    async componentDidMount() {
        var idSession = localStorage.getItem("session");
        const { data: candidatures } = await CandidatureService.getByEtudiant(this.props.match.params.id, idSession);

        this.setState({ candidatures });
    }

    render() {
        if (this.state.candidatures.length === 0) {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Cet étudiant n'a pas encore postulé pour une offre de stage.</Alert>
                    </div>
                </div>
            </div>;
        } else {
            return (
                <div className="pt-3 mt-3">
                    <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Liste des candidatures</h5>

                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th> Stage </th>
                                <th> Employeur </th>
                                <th> Statut </th>
                                <th> Entrevue </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.candidatures
                                .map(
                                    candidature =>
                                        <tr key={candidature.id}>
                                            <td>{candidature.stage.titre}</td>
                                            <td>{candidature.stage.employeur.nom}</td>
                                            <td>{candidature.statut}</td>
                                            <td>{candidature.entrevueStatut}</td>

                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            );
        }


    }
}