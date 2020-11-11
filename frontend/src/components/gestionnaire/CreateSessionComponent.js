import React, {Component, useState} from 'react';
import '../../App.css';
import Session from "../../model/Session";
import SessionService from "../../service/SessionService";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "react-bootstrap/Button";
import {Col, Container, Modal, Row} from "react-bootstrap";
import MuiAlert from "@material-ui/lab/Alert";

class CreateSessionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {nom: '', showSnackbar: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        ShowNouvelleSession = ShowNouvelleSession.bind(this);
    }
    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true, nom: " "});

    handleChange(event) {this.setState({
        nom: event.target.value});
    }
    handleSubmit(event) {

    }


    render() {
        return (
            <div className="card p-3">
                <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0' }}>Creer une nouvelle session</h5>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom de la session :
                    <input type="text" value={this.state.value} placeholder={"Nom"} onChange={this.handleChange} />
                </label>
                    <ShowNouvelleSession nom={this.state.nom}/>
                </form>
                <Snackbar open={this.state.showSnackbar} autoHideDuration={6000}
                          onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success">
                        Vous venez de créer la session {this.state.nom}
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}


function ShowNouvelleSession(props) {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleShowSnackbar = () => this.handleShowSnackbar();

    async function handleClick(event) {
        event.preventDefault()
        var session = new Session();
        session.nom = props.nom;
        session.current = true;
        await SessionService.createSession(session)
        handleShowSnackbar();
        handleCloseModal();
    }

    return (
        <>
            <Button onClick={handleShowModal}>
                Créer une nouvelle session
            </Button>
            <Modal
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {"Confirmation de création d'une nouvelle session"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col className="font-weight-bold" style={{color: "red"}}>***Attention***</Col>
                        </Row>
                        <Row>
                            <Col style={{color: "red"}}>La création d'une nouvelle session est irreversible!</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold" style={{color: "black"}}>Lorsque vous créez une nouvelle session, la session qui
                                était en cours est archivée. Les offres de stages actuelles ne seront plus visibles et les étudiants devront se réinscrire
                                à la session que vous viendrez de créer.
                            </Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold" style={{color: "black"}}>Etes-vous sur de vouloir créer et démarrer la session {this.state.nom} ?
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btnVeto"
                            onClick={handleClick}
                            variant="success">Démarrer la session {this.state.nom} </Button>
                    <Button type="button" className="btnVeto"
                            onClick={handleCloseModal}
                            variant="danger">Annuler</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default CreateSessionComponent;
