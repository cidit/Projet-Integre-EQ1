import {Alert} from '@material-ui/lab';
import React, {Component} from 'react';
import ContratService from "../../service/ContratService";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@material-ui/core';
import EtudiantService from "../../service/EtudiantService";
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

class ListeContrat extends Component {
    constructor(props) {
        super(props);
        this.state = { contrats: [] }
    }

    async componentDidMount() {
        if (AuthService.getTokenDESC().toUpperCase() === "ROLE_GESTIONNAIRE") {
            await ContratService.getContrats(localStorage.getItem("session")).then((res) => this.setState({contrats: res.data}));
        }
        else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR") {
            await ContratService.getContratByEmployeurId(AuthService.getTokenId()).then((res) => this.setState({contrats: res.data}));
        }
        else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT") {
            const response = await EtudiantService.isRegistered(AuthService.getTokenId());
            if (!response.data) {
                this.props.history.push("/profilEtudiant");
            }
            await ContratService.getContratByEtudiantId(AuthService.getTokenId()).then((res) => this.setState({contrats: res.data}));
        }
    }

    render() {
        const { classes } = this.props;
        if (this.state.contrats.length === 0) {
            return (
                AlertAucunContrat(true)
            )
        } else {
            return (
                <>
                <div className="container">
                    <TableContainer className={classes.root}>
                    <h4 className='m-2 sticky-top'> Contrats </h4>
                        <Table className="table">
                            <TableHead className={classes.heading}>
                                <TableRow>
                                    <TableCell className={classes.textTitle}> Numéro de contrat</TableCell>
                                    <TableCell className={classes.textTitle}> Employeur </TableCell>
                                    <TableCell className={classes.textTitle}> Étudiant(e) </TableCell>
                                    <TableCell className={classes.textTitle}> Programme </TableCell>
                                    <TableCell className={classes.textTitle}> Date de creation</TableCell>
                                    <TableCell className={classes.textTitle}> Signature</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.contrats
                                    .map(
                                        contrat =>
                                        <TableRow key={contrat.id} hover className={classes.row}>
                                            <TableCell>{contrat.id}</TableCell>
                                            <TableCell>{contrat.employeur.nom}</TableCell>
                                            <TableCell>{contrat.candidature.etudiant.prenom} {contrat.candidature.etudiant.nom}</TableCell>
                                            <TableCell>{contrat.candidature.etudiant.programme}</TableCell>
                                            <TableCell>{contrat.dateGeneration}</TableCell>
                                            <TableCell>
                                                <Button
                                                    href={"/televerserContrats/" + contrat.id}
                                                    type="submit" 
                                                    className='m-2' 
                                                    variant="contained" 
                                                    size="small" 
                                                    color="primary"
                                                    style={{ textTransform: 'none' }}
                                                >
                                                    Signer le contrat
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                </>
            );
        }
    }
}

export default withStyles(useStyles)(ListeContrat);

function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                {isGestionnaire ?
                    <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à
                        approuver.
                        pour le moment</Alert>
                    :
                    <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à
                        signer pour
                        le moment.</Alert>
                }
            </div>
        </div>
    </div>;
}
