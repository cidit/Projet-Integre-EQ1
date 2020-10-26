import React, {Component, useEffect, useState} from 'react';
import StageService from '../../service/StageService';
import Button from 'react-bootstrap/Button';
import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import CandidatureService from "../../service/CandidatureService";
import EtudiantService from "../../service/EtudiantService";

export default class ListStagesEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            candidatures:[],
            employeurId: ""
        };

    }
    handleClick(id){
        this.props.history.push('/stageSelectStagiaire/' + id);
    }
    componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Employeur")
            id = localStorage.getItem("id");

        StageService.getStagesByEmployeurId(id).then((res) => { this.setState({ stage: res.data }) })
    }
    render() {
        return (

            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Stages</h5>

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
                                        <th> Heures par semaine </th>
                                        <th> Statut </th>
                                        <th> Choisir un stagiaire </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.stage.map(
                                        stage =>
                                            <tr key={stage.id}>
                                                <td>{stage.titre}</td>
                                                <td>{stage.programme}</td>
                                                <td>{stage.description}</td>
                                                <td>{stage.dateDebut}</td>
                                                <td>{stage.dateFin}</td>
                                                <td>{stage.ville}</td>
                                                <td>{stage.nbHeuresParSemaine}</td>
                                                <td>{stage.status}</td>
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
                </div>
            </div>
        );
    }
}
