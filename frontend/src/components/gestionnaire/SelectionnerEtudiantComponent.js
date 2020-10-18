import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Stage from '../../model/Stage'

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', etudiantsPermis: [], selections: {}, };
        this.addAllEtudiants = this.addAllEtudiants.bind(this);
        this.confirmerChoix = this.confirmerChoix.bind(this);
        this.retourner = this.retourner.bind(this);
    }

    addAllEtudiants(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiants);
        this.props.history.push('/gestionnaireStage');
    }

    addEtudiant(etudiant){
        var arr = this.state.etudiantsPermis;
        if (arr.includes(etudiant)) {
            alert("EXISTE DÉJÀ!");
        }
        else{
            arr.push(etudiant);
            this.setState({ etudiantsPermis: arr });
        }
        console.log(this.state.etudiantsPermis);
    }

    removeEtudiant(etudiant){
        var arr = this.state.etudiantsPermis;
        if (arr.includes(etudiant)) {
            arr.pop(etudiant);
            this.setState({ etudiantsPermis: arr });
        }
        else{
            alert("DOES NOT EXIST!");
        }
        console.log(this.state.etudiantsPermis);
    }

    retourner(){
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
                                        <td>
                                            <button className="btn btn-primary" onClick={(e) => this.addEtudiant(etudiant)}>
                                                Ajouté
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={(e) => this.removeEtudiant(etudiant)}>
                                                Enlevé
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