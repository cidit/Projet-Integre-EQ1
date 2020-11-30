import React, {Component, useState} from 'react';
import CandidatureService from "../../service/CandidatureService";

import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

import EtudiantService from "../../service/EtudiantService";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

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

class ListeCandidaturesEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatures: [],
            employeurId: "",
            showSnackbar: false,
            disabledAllButtons: false,
        };

        ShowCandidature = ShowCandidature.bind(this);
    }

    async componentDidMount() {

        let id;
        let idSession;
        idSession = localStorage.getItem("session");
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");

        const response = await EtudiantService.isRegistered(id);
        if (!response.data) {
            this.props.history.push("/profileEtudiant");
        }

        const {data: candidatures} = await CandidatureService.getByEtudiant(id, idSession);
        this.setState({candidatures});

        let candidature = await CandidatureService.getCandidatureChoisi(id);

        console.log(candidature);
        if (candidature !== null) {
            this.setState({disabledAllButtons: true});
        }
    }

    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true});
    handleDisableAll = () => this.setState({disabledAllButtons: true});

    render() {
        
        const { classes } = this.props;

        if (this.state.candidatures.length === 0) {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez pas encore
                            postulé à une offre de stage cette session.</Alert>
                    </div>
                </div>
            </div>;
        }
        return (
            <div className="container">
                <TableContainer className={classes.root}>
                    <Table className="table">
                        <TableHead className={classes.heading}>
                        <TableRow>
                            <TableCell className={classes.textTitle}> Titre </TableCell>
                            <TableCell className={classes.textTitle}> Statut </TableCell>
                            <TableCell className={classes.textTitle}> Programme </TableCell>
                            <TableCell className={classes.textTitle}> Ville </TableCell>
                            <TableCell className={classes.textTitle}> Confirmer entrevue </TableCell>
                            <TableCell className={classes.textTitle}> Confirmer choix </TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                                {this.state.candidatures
                                    .map(candidature =>
                                        <TableRow key={candidature.id} hover className={classes.row}>
                                            <ShowCandidature candidature={candidature}
                                                             disabledAll={this.state.disabledAllButtons}/>
                                        </TableRow>
                                    )}
                            </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={this.state.showSnackbar} autoHideDuration={6000}
                            onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success">
                        Vous venez de confirmer votre stage.
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles)(ListeCandidaturesEtudiantComponent);

function ShowCandidature(props) {

    const approuved = "CHOISI";

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleShowSnackbar = () => this.handleShowSnackbar();
    const handleDisableAll = () => this.handleDisableAll();

    function toggleBtns(isApprouved) {
        document.getElementsByName(approuved)[0].disabled = isApprouved
    }

    function entrevuePasseeConfirmation(candidature) {
        CandidatureService.entrevuePasseeConfirmation(candidature.id);
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }


    function renderColonneEntrevue(candidature) {
        if (candidature.entrevueStatut === 'PAS_CONVOQUE')
            return <p>Pas convoqué</p>
        if (candidature.entrevueStatut === 'PASSEE')
            return <p>Entrevue passée </p>
        return (
            <div>
                <button className="btn btn-primary"
                        onClick={(event) => entrevuePasseeConfirmation(candidature)}>Confirmer entrevue
                </button>
            </div>
        )

    }

    async function handleClick(event) {
        event.preventDefault();

        toggleBtns(event.target.name === approuved);

        props.candidature.statut = event.target.name;

        await CandidatureService.putCandidatureChoisi(props.candidature.id);

        handleShowSnackbar();
        handleCloseModal();
        handleDisableAll();
    }

    return (
        <>
            <TableCell>{props.candidature.stage.titre}</TableCell>
            <TableCell className={props.candidature.statut === "CHOISI" ? "APPROVED" : "WAITING"}>
                {props.candidature.statut === "EN_ATTENTE" ? "EN ATTENTE" : "" ||
                props.candidature.statut === "APPROUVE" ? "APPROUVÉE" : "" ||
                props.candidature.statut === "CHOISI" ? "CHOISI" : ""}
            </TableCell>
            <TableCell>{props.candidature.stage.programme}</TableCell>
            <TableCell>{props.candidature.stage.ville}</TableCell>
            <TableCell>
                {renderColonneEntrevue(props.candidature)}
            </TableCell>

            <TableCell>
                <Button type="submit" className='m-2' variant="contained" size="small" color="primary" onClick={handleShowModal}
                        disabled={props.candidature.statut === "REFUSE"
                        || props.candidature.statut === "EN_ATTENTE"
                        || props.disabledAll === true}>
                    Consulter
                </Button>
            </TableCell>

            <Modal
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.candidature.stage.titre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col className="font-weight-bold" style={{color: "red"}}>***Attention***</Col>
                        </Row>
                        <Row>
                            <Col style={{color: "red"}}>Assurez-vous d'avoir bien confirmer votre stage afin de pouvoir
                                générer le contrat d'ici aux prochains jours!</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold">Employeur</Col>
                            <Col className="font-weight-bold">Ville</Col>
                            <Col className="font-weight-bold" xs={6} md={4}>Salaire</Col>
                        </Row>
                        <Row>
                            <Col>{props.candidature.stage.employeur.nom}</Col>
                            <Col>{props.candidature.stage.ville}</Col>
                            <Col xs={6} md={4}>{props.candidature.stage.salaire}$/h</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold">Date de début</Col>
                            <Col className="font-weight-bold">Date de fin</Col>
                            <Col className="font-weight-bold" xs={6} md={4}>Heures par semaine</Col>
                        </Row>
                        <Row>
                            <Col>{props.candidature.stage.dateDebut}</Col>
                            <Col>{props.candidature.stage.dateFin}</Col>
                            <Col xs={6} md={4}>{props.candidature.stage.nbHeuresParSemaine}</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold" xs={6} md={4}>Description</Col>
                        </Row>
                        <Row>
                            <Col>{props.candidature.stage.description}</Col>
                        </Row>


                        <Row>
                            <Col className="font-weight-bold" xs={6} md={4}>Exigences</Col>
                        </Row>
                        <Row>
                            <Col>{props.candidature.stage.exigences}</Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className='m-2' variant="contained" size="small" color="primary" name={approuved}
                            disabled={props.candidature.statut === approuved}
                            value={props.candidature.id} onClick={handleClick}>Confirmer ma présence</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
