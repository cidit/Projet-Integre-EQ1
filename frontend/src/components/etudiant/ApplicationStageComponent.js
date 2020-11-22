import React, { Component } from 'react';
import StageService from '../../service/StageService';
import EtudiantService from "../../service/EtudiantService";
import CandidatureService from "../../service/CandidatureService";

import { Redirect } from 'react-router-dom';
import {Alert} from "@material-ui/lab";

export default class ApplicationStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            etudiant: "",
            hasValidCV: false,
            hasApplied:"",
            readyToRedirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addStage = this.addStage.bind(this);

    }
    addStage() {
        this.props.history.push('/createStage')
    }

    async componentDidMount() {

        let id;
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");

        const response = await EtudiantService.isRegistered(id);
        if(!response.data){
            this.setState({
                readyToRedirect: true
            });
        }

        const {data: etudiant} = await EtudiantService.getEtudiantById(id);
        this.setState({etudiant: etudiant});
        StageService.getStagesEtudiant(id).then((res) => { this.setState({ stages: res.data }) })
        console.log(this.state.stages);
        if (this.state.etudiant.cv === undefined || this.state.etudiant.cv === null){
            this.setState({ hasValidCV: false});
        }
        else {
            if (this.state.etudiant.cv === null){
                this.setState({ hasValidCV: false});
            }
            else if (this.state.etudiant.cv.status === 'APPROVED'){
                this.setState({ hasValidCV: true});
            }
            else {
                this.setState({ hasValidCV: false});
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        let idEtudiant;
        if (localStorage.getItem("desc") === "Etudiant")
            idEtudiant = localStorage.getItem("id");
        const idStage = event.target.value;
        this.componentDidMount();
        this.setState({hasApplied: true});
        CandidatureService.post(idEtudiant, idStage)
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    }

    render() {
        
        if (this.state.readyToRedirect) return <Redirect to="/etudiant" />

        if(this.state.stages.length !== 0){
            if (this.state.etudiant.cv === null){
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas postuler si vous n'avez pas de CV.</Alert>
                        </div>
                    </div>
                </div>;
            }
            if (!this.state.hasValidCV){
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas postuler si votre CV n'a pas été approuvé.</Alert>
                        </div>
                    </div>
                </div>;
            }
        }
        else {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Aucune offre de stage n'est disponible pour vous.</Alert>
                    </div>
                </div>
            </div>;
        }

        return (
            <form className="d-flex flex-column">
            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Offres de stage</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr >
                                    <th> Titre </th>
                                    <th> Programme </th>
                                    <th> Description </th>
                                    <th> Date de début </th>
                                    <th> Date finale </th>
                                    <th> Ville </th>
                                    <th> Nombre d'heures par semaine </th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.stages.map(
                                    stage =>
                                        <tr key={stage.id}>
                                            <td>{stage.titre}</td>
                                            <td>{stage.programme}</td>
                                            <td>{stage.description}</td>
                                            <td>{stage.dateDebut}</td>
                                            <td>{stage.dateFin}</td>
                                            <td>{stage.ville}</td>
                                            <td>{stage.nbHeuresParSemaine}</td>
                                            {this.state.hasValidCV ?

                                                <td>
                                                    <button type="submit" className="btn btn-primary" value={stage.id} onClick={this.handleSubmit}>Postuler</button>
                                                </td> : null
                                            }

                                        </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

