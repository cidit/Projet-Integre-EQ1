import React, {Component, useState} from 'react';
import CandidatureService from "../service/CandidatureService";
import Candidature from "../model/Candidature";

import Button from 'react-bootstrap/Button'
import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

export default class ListeCandidaturesEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatures: [],
            employeurId: "",
            showSnackbar: false,
            disabledAll: false,
        };
        
        ShowCandidature = ShowCandidature.bind(this);
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");
        const { data: candidatures } = await CandidatureService.getByEtudiant(id);
        this.setState({ candidatures });

        var candidature = new Candidature();
        candidature = await CandidatureService.getCandidatureChoisi(id);
        if (candidature === null) {
            console.log("NOTHING!");
            this.setState({ disabledAll: false });
        }
        else{
            this.setState({ disabledAll: true });
        }
    }
    
    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true});
    handleDisableAll = () => this.setState({disabledAll: true});

    render() {
        return (
            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0' }}>Vos candidatures</h5>
                        
                        <h5 className="card-title text-center p-3" 
                            style={{ background: '#FFCCCB' }}
                            hidden={!this.state.disabledAll}>Vous avez déjà confirmer votre stage</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr >
                                    <th> Titre </th>
                                    <th> Statut </th>
                                    <th> Programme </th>
                                    <th> Ville </th>
                                    <th> Confirmer choix </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.candidatures
                                    .map(candidature =>
                                        <tr key={candidature.id}>
                                            <ShowCandidature candidature={candidature} disabledAll={this.state.disabledAll}/>
                                        </tr>
                                )}
                                </tbody>
                            </table>
                            <Snackbar open={this.state.showSnackbar} autoHideDuration={6000}
                                      onClose={this.handleCloseSnackbar}>
                                <Alert onClose={this.handleCloseSnackbar} severity="success">
                                    Changements effectués avec succès
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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

    async function handleClick(event) {
        event.preventDefault();

        toggleBtns(event.target.name === approuved);

        await CandidatureService.putCandidatureChoisi(props.candidature.id);

        handleShowSnackbar();
        handleCloseModal();
        handleDisableAll();

        //window.location.reload();
    }

    return (
        <>
            <td>{props.candidature.stage.titre}</td>
            <td>{props.candidature.statut}</td>
            <td>{props.candidature.stage.programme}</td>
            <td>{props.candidature.stage.ville}</td>
            <td>
                <Button onClick={handleShowModal}
                        disabled={props.candidature.statut === "REFUSE" 
                                || props.candidature.statut === "EN_ATTENTE"
                                || props.disabledAll === true}>
                    Consulter
                </Button>
            </td>

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
                            <Col style={{color: "red"}}>Assurez-vous d'avoir bien confirmer votre stage afin de pouvoir générer le contrat d'ici aux prochains jours!</Col>
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
                    <Button type="button" className="btnVeto" name={approuved}
                            disabled={props.candidature.statut === approuved} 
                            value={props.candidature.id} onClick={handleClick}
                            variant="success">Confirmer ma présence</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
