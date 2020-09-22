import React, { Component } from 'react';
import Stage from '../model/Stage'
import StageService from '../service/StageService';
import { Formik, Field, Form, ErrorMessage } from "formik";

class CreateStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = new Stage();

        this.changeTitreHandler = this.changeTitreHandler.bind(this);
        this.changeProgrammeHandler = this.changeProgrammeHandler.bind(this);
        this.changeDateDebutHandler = this.changeDateDebutHandler.bind(this);
        this.changeDateFinHandler = this.changeDateFinHandler.bind(this);
        this.changeDateLimiteHandler = this.changeDateLimiteHandler.bind(this);
        this.changeNbAdmisHandler = this.changeNbAdmisHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeExigencesHandler = this.changeExigencesHandler.bind(this);
        this.saveStage = this.saveStage.bind(this);
    }

    saveStage = (e) => {
        e.preventDefault();
        let stageToPost = {
       titre : this.state.titre,
        description: this.state.description,
        exigences : this.state.exigences,
        dateDebut : this.state.dateDebut,
       dateFin : this.state.dateFin,
        dateLimite : this.state.dateLimite,
        nbAdmis : this.state.nbAdmis,
        programme : this.state.programme
        
        }
        StageService.createNewStage(stageToPost).then(res => {
            this.props.history.push('/stages');
        });

    }

    cancel(){
        this.props.history.push('/stages');
    }


    changeTitreHandler = (e) => {
        this.setState({ titre: e.target.value });
    }

    changeProgrammeHandler = (e) => {
        this.setState({ programme: e.target.value });
    }

    changeDateDebutHandler = (e) => {
        this.setState({ dateDebut: e.target.value });
    }


    changeDateFinHandler = (e) => {
        this.setState({ dateFin: e.target.value });
    }

    changeDateLimiteHandler = (e) => {
        this.setState({ dateLimite: e.target.value });
    }


    changeNbAdmisHandler = (e) => {
        this.setState({ nbAdmis: e.target.value });
    }

    changeDescriptionHandler = (e) => {
        this.setState({ description: e.target.value });
    }

    changeExigencesHandler = (e) => {
        this.setState({ exigences: e.target.value });
    }

    render() {
        return (

            <div className="container">
                <form>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Title :</label>
                            <input placeholder="Title" name="title" className="form-control"
                                value={this.state.titre} onChange={this.changeTitreHandler} />
                        </div>
                        <div className="form-group col">
                            <label>Programme :</label>
                            <input placeholder="Programme" name="programme" className="form-control"
                                value={this.state.programme} onChange={this.changeProgrammeHandler} />
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col">
                            <label>Date Début de Stage :</label>
                            <input type="date" name="dateDebut" className="form-control"
                                value={this.state.dateDebut} onChange={this.changeDateDebutHandler} />
                        </div>
                        <div className="form-group col">
                            <label>Date Fin de Stage :</label>
                            <input type="date" name="dateFin" className="form-control"
                                value={this.state.dateFin} onChange={this.changeDateFinHandler} />
                        </div>
                        <div className="form-group col">
                            <label>Date Limit de dépôt :</label>
                            <input type="date" name="dateLimite" className="form-control"
                                value={this.state.dateLimite} onChange={this.changeDateLimiteHandler} />
                        </div>

                        <div className="form-group col">
                            <label>Nombre de places :</label>
                            <input type="number" name="dateLimite" className="form-control"
                                value={this.state.nbAdmis} onChange={this.changeNbAdmisHandler} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Description :</label>
                            <textarea placeholder="Description" name="description" className="form-control"
                                value={this.state.description} onChange={this.changeDescriptionHandler} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Exigences :</label>
                            <textarea placeholder="Exigences" name="exigences" className="form-control"
                                value={this.state.exigences} onChange={this.changeExigencesHandler} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-success" onClick={this.saveStage}>Enregistrer</button>
                    <button type="button" className="btn btn-warning" onClick={this.cancel.bind(this)}>Cancel</button>


                </form>
            </div>

        );
    }
}

export default CreateStageComponent;