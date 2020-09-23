import React, { Component } from 'react';
import Stage from "../model/Stage";
import { Redirect } from "react-router-dom";
import StageService from '../service/StageService';


let redirectStr = "";
export default class StageRegister extends Component {
    constructor(props) {
        super(props);
        this.state = new Stage();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(redirectStr);
    }

    handleSubmit(event) {
        event.preventDefault();
        StageService.createStage(this.state).then(res => {
            this.props.history.push('/stages');
        });
    }

    cancel() {
        this.props.history.push('/stages');
    }


    render() {
        return (
            <div className="container-fluid" >
                <h3>Enregistrer votre offre de stage</h3>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-row">
                        <div class="form-group col-md-12">
                            <label>titre: </label>
                            <input required
                                className="form-control"
                                type="text"
                                name="titre"
                                value={this.state.titre}
                                onChange={this.handleChange} />
                        </div>
                        <div class="form-group col-md-4">
                            <label>Programme: </label>
                            <input required
                                className="form-control"
                                type="text"
                                name="programme"
                                value={this.state.programme}
                                onChange={this.handleChange} />
                        </div>

                    </div>
                    <div className="form-row">
                        <label>description: </label>
                        <input required
                            className="form-control"
                            type="textarea"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange} />

                    </div>
                    <label>exigences: <input required
                        className="form-control"
                        type="text"
                        name="exigences"
                        value={this.state.exigences}
                        onChange={this.handleChange} /></label>
                    <label>dateDebut: <input required
                        className="form-control"
                        type="date"
                        name="dateDebut"
                        value={this.state.dateDebut}
                        onChange={this.handleChange} /></label>
                    <label>dateFin: <input required
                        className="form-control"
                        type="date"
                        name="dateFin"
                        value={this.state.dateFin}
                        onChange={this.handleChange} /></label>
                    <label>Date d'overture: <input required
                        className="form-control"
                        type="date"
                        name="ouvert"
                        value={this.state.ouvert}
                        onChange={this.handleChange} /></label>
                    <label>Date Limite: <input required
                        className="form-control"
                        type="date"
                        name="dateLimite"
                        value={this.state.dateLimite}
                        onChange={this.handleChange} /></label>
                    <label>Nombre heures par semaine: <input required
                        className="form-control"
                        type="number" min="0" name="nbHeuresParSemaine"
                        value={this.state.nbHeuresParSemaine}
                        onChange={this.handleChange} /></label>
                    <label>salaire: <input required
                        className="form-control"
                        type="text"
                        name="salaire"
                        value={this.state.salaire}
                        onChange={this.handleChange} /></label>
                    <label>nombre de places: <input required
                        className="form-control"
                        type="text"
                        name="nbAdmis"
                        value={this.state.nbAdmis}
                        onChange={this.handleChange} /></label>
                    <button type="button" className="btn btn-primary" >Enregistrer</button>
                    <button type="button" className="btn btn-warning" onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div >
        );
    }
}
