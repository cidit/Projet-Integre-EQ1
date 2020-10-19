import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Stage from '../../model/Stage';
import Etudiant from '../../model/Etudiant';

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], etudiantsPermis: [], disabledButtons: [], };
        this.addAllEtudiants = this.addAllEtudiants.bind(this);
        this.confirmerChoix = this.confirmerChoix.bind(this);
        this.retourner = this.retourner.bind(this);
    }

    retourner(){
        this.props.history.push('/gestionnaireStage');
    }

    addAllEtudiants(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiants);
        this.props.history.push('/gestionnaireStage');
    }

    confirmerChoix(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiantsPermis);
        this.props.history.push('/gestionnaireStage');
    }

    async componentDidMount() {
        var stage = new Stage();
        stage = await StageService.getStageById(this.props.match.params.id);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        this.setState({ etudiants });
        this.setState({ disabledButtons: new Array(this.state.etudiants.length).fill(false)});

        const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(this.props.match.params.id);
        this.setState({ etudiantsPermis });
        
        var arr = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiantsPermis){
            arr[etudiant.id] = true;
        }
        
        this.setState({ disabledButtons: arr });
    }

    async AddToList(index, param, e) {
        var etudiant = new Etudiant();
            etudiant = await EtudiantService.getEtudiantById(index);

        this.setState(oldState => {
            const newEtudiantsPermis = [...oldState.etudiantsPermis];
            newEtudiantsPermis[index] = etudiant.data;
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = true;
            return {
                disabledButtons: newDisabledButtons,
                etudiantsPermis: newEtudiantsPermis,
            }
        });
    }

    async RemoveFromList(index, param, e) {
        const newList = this.state.etudiantsPermis.filter((etudiant) => etudiant.id !== index);
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = false;
            return {
                disabledButtons: newDisabledButtons,
                etudiantsPermis: newList,
            }
        });
    }

    render() {

        return (
            <div>
                <h1 className="text-center">Liste des étudiants</h1>

                <div className="form-group">
                    <div className="row"> 
                        <button className="btn btn-secondary" onClick={this.retourner}>RETOUR</button>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row"> 
                        <button className="btn btn-primary" onClick={this.addAllEtudiants}>SÉLECTIONNER TOUT</button>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> O </th>
                                <th> X </th>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>{etudiant.id}</td>
                                        <td>
                                            <button onClick={() => this.AddToList(etudiant.id)}
                                                disabled={this.state.disabledButtons[etudiant.id]}>
                                                {!this.state.disabledButtons[etudiant.id] ? ("Add") : "Already in"}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.RemoveFromList(etudiant.id)}
                                                disabled={!this.state.disabledButtons[etudiant.id]}>
                                                {this.state.disabledButtons[etudiant.id] ? ("Remove") : "Already out"}
                                            </button>
                                        </td>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="form-group">
                    <div className="row"> 
                        <button className="btn btn-success" onClick={this.confirmerChoix}>CONFIRMER</button>
                    </div>
                </div>

            </div>
        );
    }
}