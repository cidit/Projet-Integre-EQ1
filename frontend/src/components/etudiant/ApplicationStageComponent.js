import React, {Component} from 'react';
import StageService from '../../service/StageService';
import EtudiantService from "../../service/EtudiantService";
import CandidatureService from "../../service/CandidatureService";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import {withStyles} from '@material-ui/core/styles';

import AuthService from "../../service/security/auth.service";

const useStyles = theme => ({
    root: {
        marginTop: '3',
        width: '100%',
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',
    },
    heading: {
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
        margin:'auto',
    },
    row:{
        textAlign: 'center',
    }
});

class ApplicationStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            etudiant: "",
            hasValidCV: false,
            hasApplied: "",
            readyToRedirect: false,
            id: AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT" ? AuthService.getTokenId() : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addStage = this.addStage.bind(this);

    }

    addStage() {
        this.props.history.push('/createStage')
    }

    async componentDidMount() {

        let id = this.state.id;
        var idSession = localStorage.getItem("session");

        const response = await EtudiantService.isRegistered(id);

        if (!response.data) {
            this.props.history.push("/profilEtudiant");
        }

        const {data: etudiant} = await EtudiantService.getEtudiantById(id);
        this.setState({etudiant: etudiant});

        StageService.getStagesEtudiant(id, idSession).then((res) => {
            this.setState({stages: res.data})
        })

        if (this.state.etudiant.cv === undefined || this.state.etudiant.cv === null) {
            this.setState({hasValidCV: false});
        } else {
            if (this.state.etudiant.cv.status === 'APPROVED') {
                this.setState({hasValidCV: true});
            } else {
                this.setState({hasValidCV: false});
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let idEtudiant = this.state.id;
        const idStage = event.currentTarget.value;
        this.componentDidMount();
        this.setState({hasApplied: true});
        CandidatureService.post(idEtudiant, idStage)
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    render() {
        
        const { classes } = this.props;

        if (this.state.stages.length !== 0) {
            if (this.state.etudiant.cv === null) {
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas
                                postuler si vous n'avez pas de CV.</Alert>
                        </div>
                    </div>
                </div>;
            }
            if (!this.state.hasValidCV) {
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas
                                postuler si votre CV n'a pas été approuvé.</Alert>
                        </div>
                    </div>
                </div>;
            }
        } else {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Aucune offre de stage n'est
                            disponible pour vous.</Alert>
                    </div>
                </div>
            </div>;
        }

        return (
            <form className="d-flex flex-column">
                <div className="container">
                    <TableContainer className={classes.root}>
                        <Table className="table">
                            <TableHead className={classes.heading}>
                            <TableRow>
                                <TableCell className={classes.textTitle}> Titre </TableCell>
                                <TableCell className={classes.textTitle}> Programme </TableCell>
                                <TableCell className={classes.textTitle}> Description </TableCell>
                                <TableCell className={classes.textTitle}> Date de début </TableCell>
                                <TableCell className={classes.textTitle}> Date finale </TableCell>
                                <TableCell className={classes.textTitle}> Ville </TableCell>
                                <TableCell className={classes.textTitle}> Heures par semaine </TableCell>
                                <TableCell className={classes.textTitle}></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.stages.map(
                                stage =>
                                    <TableRow key={stage.id} hover className={classes.row}>
                                        <TableCell>{stage.titre}</TableCell>
                                        <TableCell>{stage.programme}</TableCell>
                                        <TableCell>{stage.description}</TableCell>
                                        <TableCell>{stage.dateDebut}</TableCell>
                                        <TableCell>{stage.dateFin}</TableCell>
                                        <TableCell>{stage.ville}</TableCell>
                                        <TableCell>{stage.nbHeuresParSemaine}</TableCell>
                                        {this.state.hasValidCV ?

                                            <TableCell>
                                                <Button type="submit" className='m-2' variant="contained" size="small" color="primary" 
                                                        style={{ textTransform: 'none' }}
                                                        value={stage.id} onClick={this.handleSubmit}>Postuler
                                                </Button>
                                            </TableCell> : null
                                        }

                                    </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </form>
        );
    }
}

export default withStyles(useStyles)(ApplicationStageComponent);