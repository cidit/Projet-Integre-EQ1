import React, { Component } from 'react';
import Stage from '../model/Stage'
import StageService from '../service/StageService';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Employeur from '../model/Employeur';

class CreateStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = new Stage();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    cancel() {
        this.props.history.push('/stages');
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ employeur: new Employeur() })
        StageService.createStage(this.state).then(res => {
            this.props.history.push('/stages');
        });
    }

    render() {
        return (
            <div >
                <h3 className="m-3">Créer un offre de stage</h3>
                <form onSubmit={this.handleSubmit} >
                    <div className="container">
                        <div className="row">
                            <div className="form-group col">
                                <label>Title :</label>
                                <input placeholder="Title" name="titre" className="form-control" required
                                    value={this.state.titre} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col">
                                <label>Programme :</label>
                                <input placeholder="Programme" name="programme" className="form-control" required
                                    value={this.state.programme} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col">
                                <label>Date Début de Stage :</label>
                                <input type="date" name="dateDebut" className="form-control" required
                                    value={this.state.dateDebut} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col">
                                <label>Date Fin de Stage :</label>
                                <input type="date" name="dateFin" className="form-control" required
                                    value={this.state.dateFin} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col">
                                <label>Date Limit de dépôt :</label>
                                <input type="date" name="dateLimite" className="form-control" required
                                    value={this.state.dateLimite} onChange={this.handleChange} />
                            </div>

                            <div className="form-group col">
                                <label>Nombre de places :</label>
                                <input type="number" name="nbAdmis" className="form-control"
                                    value={this.state.nbAdmis} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
                                <label>Description :</label>
                                <textarea placeholder="Description" name="description" className="form-control" required
                                    value={this.state.description} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
                                <label>Exigences :</label>
                                <textarea placeholder="Exigences" name="exigences" className="form-control" required
                                    value={this.state.exigences} onChange={this.handleChange} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success" onClick={this.saveStage}>Enregistrer</button>
                        <button type="button" className="btn btn-warning" onClick={this.cancel.bind(this)}>Cancel</button>

                    </div>
                </form>
            </div>

        );
    }
}

export default CreateStageComponent;