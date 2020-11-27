import React, {Component } from "react";
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
<<<<<<< HEAD
import Etudiant from '../../model/Etudiant';

import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';
import {Alert} from "@material-ui/lab";
=======
>>>>>>> 4bd57222391e2ca6769b9861f5ed3c52050bba9f
import {
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Paper,
    Table,
    TableRow,
<<<<<<< HEAD
    Checkbox
} from "@material-ui/core";

export default class SelectionnerEtudiantComponent extends Component {    
=======
    Checkbox,
    Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export default class SelectionnerEtudiantComponent extends Component {
>>>>>>> 4bd57222391e2ca6769b9861f5ed3c52050bba9f
    constructor(props) {
        super(props);
        this.state = { etudiants: [], etudiantsPermis: [] };
    }

    async componentDidMount() {
<<<<<<< HEAD
        let stage = this.props.stage;
        // const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.programme);

=======
        let stage;
        stage = this.props.stage;
        var idSession = localStorage.getItem("session");
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.programme, idSession);
        
>>>>>>> 4bd57222391e2ca6769b9861f5ed3c52050bba9f
        this.setState({ etudiants });

        const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(stage.id);
        this.setState({ etudiantsPermis });
    }

    render() {
        return (
            <div>
                <CustomTable etudiants={this.state.etudiants} stage={this.props.stage} etudiantsPermis={this.state.etudiantsPermis}/>
            </div>
        );
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color: "#000000"
    },
    table:{
        color:"#ffffff",
    }
}));

function CustomTable(props){
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    
    const [selectedObj, setSelectedObj] = React.useState([]);
    //const isSelected = (id) => selected.indexOf(id) !== -1;

    const [flag, setFlag] = React.useState(true);
    const isSelected = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let newSelectedObj = [];
        if (props.etudiantsPermis.length !== []) {  
            for (let i = 0; i < props.etudiantsPermis.length; i++) {
                if (props.etudiantsPermis[i].id === id && selectedIndex === -1 && flag){
                    newSelected = newSelected.concat(selected, props.etudiantsPermis[i].id);
                    newSelectedObj = newSelectedObj.concat(selectedObj, props.etudiantsPermis[i]);
                    setSelected(newSelected);
                    setSelectedObj(newSelectedObj);
                    return selectedIndex !== -1;
                }
            }
        }
        return selectedIndex !== -1;
    }

<<<<<<< HEAD
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
=======
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.etudiants.map((etudiant) => etudiant.id);
            setSelected(newSelecteds);
            const newSelectedsObj = props.etudiants.map((etudiant) => etudiant);
            setSelectedObj(newSelectedsObj);
            return;
        }
        setFlag(false);
        setSelected([]);
    };

    const handleClickSelect = (etudiant) => {
        const selectedIndex = selected.indexOf(etudiant.id);
        let newSelected = [];
        let newSelectedObj = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, etudiant.id);
            newSelectedObj = newSelectedObj.concat(selectedObj, etudiant);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedObj = newSelectedObj.concat(selectedObj.slice(1));
            setFlag(false);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedObj = newSelectedObj.concat(selectedObj.slice(0, -1));
            setFlag(false);
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
>>>>>>> 4bd57222391e2ca6769b9861f5ed3c52050bba9f
            );
            newSelectedObj = newSelectedObj.concat(
                selectedObj.slice(0, selectedIndex),
                selectedObj.slice(selectedIndex + 1),
            );
            setFlag(false);
        }

        setSelected(newSelected);
        setSelectedObj(newSelectedObj);
    };


    function handleConfirmation(event){
        event.preventDefault();
        if (selected.length === 0) {
            return;
        }
        StageService.addEtudiants(props.stage.id, selectedObj);
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }
<<<<<<< HEAD
=======

    return(
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={props.etudiants.length > 0 && selected.length === props.etudiants.length}
                                onChange={handleSelectAllClick}
                            />
                        </TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Programme</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Adresse</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.etudiants
                        .map(
                            etudiant => {
                                const isItemSelected = isSelected(etudiant.id)
                                return (

                                    <TableRow
                                        key={etudiant.id}
                                        hover
                                        onClick={(event) => handleClickSelect(etudiant)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>{etudiant.prenom}</TableCell>
                                        <TableCell>{etudiant.nom}</TableCell>
                                        <TableCell>{etudiant.programme}</TableCell>
                                        <TableCell>{etudiant.telephone}</TableCell>
                                        <TableCell>{etudiant.email}</TableCell>
                                        <TableCell>{etudiant.adresse}</TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                </TableBody>

            </Table>
        </TableContainer>
            <Button variant="contained" color="primary" onClick={handleConfirmation}>Confirmer</Button>
                            
        </>
    );
>>>>>>> 4bd57222391e2ca6769b9861f5ed3c52050bba9f
}
