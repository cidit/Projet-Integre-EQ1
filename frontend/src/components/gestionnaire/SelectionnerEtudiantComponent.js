import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Etudiant from '../../model/Etudiant';

import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';
import {Alert} from "@material-ui/lab";
import {
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Paper,
    Table,
    TableRow,
    Checkbox
} from "@material-ui/core";

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], etudiantsPermis: [], disabledButtons: [], };
        this.addAllEtudiants = this.addAllEtudiants.bind(this);
        this.removeAllEtudiants = this.removeAllEtudiants.bind(this);
        this.confirmerChoix = this.confirmerChoix.bind(this);
        this.annulerChoix = this.annulerChoix.bind(this);
    }

    async componentDidMount() {
        let stage = this.props.stage;
        // const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.programme);

        this.setState({ etudiants });
        this.setState({ disabledButtons: new Array(this.state.etudiants.length).fill(false)});

        // const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(this.props.match.params.id);
        const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(stage.id);
        this.setState({ etudiantsPermis });

        let bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiantsPermis){
            bouttons[etudiant.id] = true;
        }
        this.setState({ disabledButtons: bouttons });

        const stageEtudiants = [];
        if (this.state.etudiantsPermis !== []) { 
            for(let etudiant of this.state.etudiantsPermis){
                stageEtudiants[etudiant.id] = etudiant;
            }
        }
        this.setState({ etudiantsPermis: stageEtudiants });
    }

    addAllEtudiants(){
        const etudiants = [];
        for(let etudiant of this.state.etudiants){
            etudiants.push(etudiant);
        }

        let bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiants){
            bouttons[etudiant.id] = true;
        }
        
        this.setState({ disabledButtons: bouttons });
        this.setState({ etudiantsPermis: etudiants });
    }

    removeAllEtudiants(){
        let bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiants){
            bouttons[etudiant.id] = false;
        }
        
        this.setState({ disabledButtons: bouttons });
        this.setState({ etudiantsPermis: [] });
    }

    async AddToList(index, param, e) {
        let etudiant = new Etudiant();
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
        let newList = this.state.etudiantsPermis.filter((value) => (value === undefined) ? "" : value);
        const updatedList = newList.filter((etudiant) => etudiant.id !== index);
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = false;
            return {
                disabledButtons: newDisabledButtons,
                etudiantsPermis: updatedList,
            }
        });
    }

    confirmerChoix(){
        // StageService.addEtudiants(this.props.match.params.id, this.state.etudiantsPermis);
        StageService.addEtudiants(this.props.stage.id, this.state.etudiantsPermis);
        // this.props.history.push('/gestionnaireStage');
        
        window.location.reload();
    }

    annulerChoix(){
        //TODO : FIX
        this.props.history.push('/gestionnaireStage');
    }

    render() {


        if (this.state.etudiants.length === 0) {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Aucun étudiant n'est dans un programme auquel le stage est relié.</Alert>
                    </div>
                </div>
            </div>;
        } else {
            return (
                <div className="pt-3 mt-3">
                    <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Liste des étudiants</h5>

                    <div className="row">
                        <Table className="table table-striped table-bordered">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <button className="btn btn-primary-outline" onClick={this.addAllEtudiants}>
                                            <h3> <AiOutlineCheckSquare /> </h3>
                                        </button>
                                        <button className="btn btn-primary-outline" onClick={this.removeAllEtudiants}>
                                            <h3> <AiOutlineCloseSquare /> </h3>
                                        </button>
                                    </TableCell>
                                    <TableCell> Matricule </TableCell>
                                    <TableCell> Nom </TableCell>
                                    <TableCell> Prénom </TableCell>
                                    <TableCell> Programme </TableCell>
                                    <TableCell> Courriel </TableCell>
                                    <TableCell> Téléphone </TableCell>
                                    <TableCell> Statut </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.etudiants
                                    .map(
                                        etudiant =>
                                            <TableRow key={etudiant.id}>
                                                <TableCell>
                                                    <button className="btn btn-primary-outline" onClick={() => this.AddToList(etudiant.id)}
                                                            disabled={this.state.disabledButtons[etudiant.id]}>
                                                        {!this.state.disabledButtons[etudiant.id] ?
                                                            <h3> <AiFillCheckCircle style={{color: "green"}}/> </h3> : <h3> <AiOutlineCheckCircle /> </h3>}
                                                    </button>
                                                    <button className="btn btn-primary-outline" onClick={() => this.RemoveFromList(etudiant.id)}
                                                            disabled={!this.state.disabledButtons[etudiant.id]}>
                                                        {this.state.disabledButtons[etudiant.id] ?
                                                            <h3> <AiFillCloseCircle style={{color: "red"}}/> </h3> : <h3> <AiOutlineCloseCircle /> </h3>}
                                                    </button>
                                                </TableCell>
                                                <TableCell>{etudiant.matricule}</TableCell>
                                                <TableCell>{etudiant.nom}</TableCell>
                                                <TableCell>{etudiant.prenom}</TableCell>
                                                <TableCell>{etudiant.programme}</TableCell>
                                                <TableCell>{etudiant.email}</TableCell>
                                                <TableCell>{etudiant.telephone}</TableCell>
                                                <TableCell>{etudiant.statutStage}</TableCell>
                                            </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <button className="btn btn-success" onClick={this.confirmerChoix}>Confirmer</button>
                            <button className="btn btn-danger" onClick={this.annulerChoix}>Annuler</button>
                        </div>
                    </div>

                </div>
            );
        }


    }
}
