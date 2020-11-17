import React, {Component} from 'react';
import StageService from '../../service/StageService';
import {Alert} from "@material-ui/lab";

export default class ListStagesEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            candidatures:[],
            employeurId: ""
        };

    }
    handleClick(id){
        this.props.history.push('/stageSelectStagiaire/' + id);
    }
    componentDidMount() {
        let id;
        if (localStorage.getItem("desc") === "Employeur"){
            id = localStorage.getItem("id");
            StageService.getStagesByEmployeurId(id).then((res) => { this.setState({ stages: res.data }) })
        }
        else{
            StageService.getStagesSession().then((res) => { this.setState({ stages: res.data }) })
        }



    }
    render() {
        if (this.state.stages.length === 0) {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez proposé aucun stage pour cette session.</Alert>
                    </div>
                </div>
            </div>;
        } else {
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
                                                <td>{stage.statut}</td>
                                                <td>
                                                    {stage.statut === 'APPROUVÉ' ? <button className="btn btn-primary" onClick={() => this.handleClick(stage.id)} >
                                                        Choisir
                                                    </button> : <p>Stage non approuvé</p> }

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
}
