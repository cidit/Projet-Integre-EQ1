import React, {Component, useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import StageService from "../../service/StageService";
import '../../css/StageVeto.css';
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default class StageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: {},
            employeur: {},
            candidatures: [],
            showModal: false
        };
        ListeCandidatures = ListeCandidatures.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this)
        StageInfo = StageInfo.bind(this)
    }


     handleShowModal = () => this.setState({showModal: true});


    componentDidMount() {
        StageService.getStageById(this.props.match.params.id)
            .then((res) => {
                this.setState({stage: res.data})
                this.setState({employeur: res.data.employeur})
        })
            .then((res) => console.log(this.state.stage))


        axios.get(  "http://localhost:8080/candidatures/getByStage?stage=" + this.props.match.params.id).then (res => {
                this.setState({candidatures: res.data})
                console.log(this.state.candidatures)
            }
        )
    }





    render() {
        return (
            <div className="container">
                <StageInfo
                    stage={this.state.stage}
                    employeur={this.state.employeur}
                />

                <ListeCandidatures
                    candidatures={this.state.candidatures}
                />

            </div>
        );
    }
}



export function StageInfo(props){

    return (
        <>
            <Container>

                <Row>
                    <Col><h4>{props.stage.titre}</h4></Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold">Status</Col>
                </Row>
                <Row>
                    <Col className={props.stage.statut}>{props.stage.statut}</Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold">Programme</Col>
                    <Col className="font-weight-bold">Ville</Col>
                    <Col className="font-weight-bold">Employeur</Col>
                </Row>
                <Row>
                    <Col>{props.stage.programme}</Col>
                    <Col>{props.stage.ville}</Col>
                    <Col>{props.employeur.nom}</Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold">Date de début</Col>
                    <Col className="font-weight-bold">Date de fin</Col>
                    <Col className="font-weight-bold">Date limite pour appliquer</Col>
                </Row>
                <Row>
                    <Col>{props.stage.dateDebut}</Col>
                    <Col>{props.stage.dateFin}</Col>
                    <Col>{props.stage.dateLimiteCandidature}</Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold" xs={6} md={4}>Nombre de places</Col>
                    <Col className="font-weight-bold" xs={6} md={4}>Heures par semaine</Col>
                    <Col className="font-weight-bold" xs={6} md={4}>Salaire</Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>{props.stage.nbAdmis}</Col>
                    <Col xs={6} md={4}>{props.stage.nbHeuresParSemaine}</Col>
                    <Col xs={6} md={4}>{props.stage.salaire}$/h</Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold" xs={6} md={4}>Description</Col>
                </Row>
                <Row>
                    <Col>{props.stage.description}</Col>
                </Row>


                <Row>
                    <Col className="font-weight-bold" xs={6} md={4}>Exigences</Col>
                </Row>
                <Row>
                    <Col>{props.stage.exigences}</Col>
                </Row>
            </Container>


            <Row>
                <Col>
                    <Button onClick={this.handleShowModal }>Choisir les étudiants</Button>
                </Col>
            </Row>
        </>
    );
}



export  function ListeCandidatures(props){
    const [checked, setChecked] = React.useState([]);
    const handleCloseModal = () => this.setState({showModal: false});

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    function HandleClick(e){
        e.preventDefault();
        console.log(checked)

        for (let i = 0; i < checked.length; i++){
                checked[i].statut = "CHOISI";
                axios.put("http://localhost:8080/candidatures/update/" + checked[i].id, checked[i]).then(res => console.log(res))
        }
        handleCloseModal();
    }

    return (
        <Modal
            show={this.state.showModal}
            onHide={handleCloseModal}
        >
            <Modal.Header>Choisir les étudiants sélectionnés</Modal.Header>
            <Modal.Body>
                <List >
                    {props.candidatures.map((candidature) => {
                        // const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={candidature.id}
                                role={undefined}
                                dense
                                button
                                onClick={handleToggle(candidature)}
                                // onClick={handleToggle(candidature.id)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(candidature) !== -1}
                                        // checked={checked.indexOf(candidature.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        // inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={candidature.id}
                                    primary={`${candidature.etudiant.nom}, ${candidature.etudiant.prenom}` }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={HandleClick}
                >
                    Confirmer
                </Button>
            </Modal.Footer>
        </Modal>

    );



}


function ShowStage(props) {
    const approuved = "APPROVED";
    const denied = "DENIED";

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleShowSnackbar = () => this.handleShowSnackbar();

    function toggleBtns(isApprouved) {
        document.getElementsByName(approuved)[0].disabled = isApprouved
        document.getElementsByName(denied)[0].disabled = !isApprouved
    }

    async function handleClick(event) {
        event.preventDefault();


        console.log(props.stage.employeur)

        props.stage.statut = event.target.name;
        props.stage.ouvert = event.target.name === approuved;

        toggleBtns(event.target.name === approuved);

        await StageService.updateStage(props.stage, parseInt(event.target.value));

        handleShowSnackbar();
        handleCloseModal();
    }

    return (
        <>
            <td>{props.stage.titre}</td>
            <td className={props.stage.statut}>{props.stage.statut}</td>
            <td>{props.stage.programme}</td>
            <td>{props.stage.ville}</td>
            <td><Button onClick={handleShowModal}>Cliquez</Button></td>

            <Modal
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.stage.titre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">

                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btnVeto" name={approuved}
                            disabled={props.stage.statut === approuved} value={props.stage.id} onClick={handleClick}
                            variant="success">Oui</Button>
                    <Button type="button" className="btnVeto" name={denied} disabled={props.stage.statut === denied}
                            value={props.stage.id} onClick={handleClick} variant="danger">Non</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}