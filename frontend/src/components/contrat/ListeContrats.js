import {Alert} from '@material-ui/lab';
import React, {Component} from 'react';
import ContratService from "../../service/ContratService";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import EtudiantService from "../../service/EtudiantService";
import {Button} from "@material-ui/core";

export class ListeContrat extends Component {
    constructor(props) {
        super(props);
        this.state = {contrats: []}
    }

    async componentDidMount() {
        if (localStorage.getItem("desc").toUpperCase() === "GESTIONNAIRE") {
            await ContratService.getContrats(localStorage.getItem("session")).then((res) => this.setState({contrats: res.data}));

        } else if (localStorage.getItem("desc").toUpperCase() === "EMPLOYEUR") {
            await ContratService.getContratByEmployeurId(localStorage.getItem("id")).then((res) => this.setState({contrats: res.data}));
        } else if (localStorage.getItem("desc").toUpperCase() === "ETUDIANT") {
            const response = await EtudiantService.isRegistered(localStorage.getItem("id"));
            if (!response.data) {
                this.props.history.push("/profilEtudiant");
            }
            await ContratService.getContratByEtudiantId(localStorage.getItem("id")).then((res) => this.setState({contrats: res.data}));

        }
    }

    render() {
        if (this.state.contrats.length === 0) {
            return (
                AlertAucunContrat(true)
            )
        } else {
            return (
                <>
                    <Table className="table table-striped table-bordered">
                        <TableHead>
                            <TableRow>
                                <TableCell> Numéro de contrat</TableCell>
                                <TableCell> Employeur </TableCell>
                                <TableCell> Étudiant(e) </TableCell>
                                <TableCell> Programme </TableCell>
                                <TableCell> Date de creation</TableCell>
                                <TableCell> Signature</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.contrats
                                .map(
                                    contrat =>
                                        <TableRow key={contrat.id}>
                                            <TableCell>{contrat.id}</TableCell>
                                            <TableCell>{contrat.employeur.nom}</TableCell>
                                            <TableCell>{contrat.candidature.etudiant.prenom} {contrat.candidature.etudiant.nom}</TableCell>
                                            <TableCell>{contrat.candidature.etudiant.programme}</TableCell>
                                            <TableCell>{contrat.dateGeneration}</TableCell>
                                            <TableCell>
                                                <Button href={"/televerserContrats/" + contrat.id}>
                                                    Signer le contrat
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </>
            );
        }
    }
}

function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                {isGestionnaire ?
                    <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à
                        approuver
                        pour le moment</Alert>
                    :
                    <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à
                        signer pour
                        le moment</Alert>
                }
            </div>
        </div>
    </div>;
}
