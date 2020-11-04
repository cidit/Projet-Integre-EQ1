import React, {Component, useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import '../../css/StageVeto.css';
import {Table, TableBody, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import StageService from "../../service/StageService";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import StageVeto from "../StageVeto";

export default class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            showSnackbar: false
        };

        ShowStage = ShowStage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (event, id)  {
        this.props.history.push('/stage/' +id);
        console.log("OK")
    }

    componentDidMount() {
        StageService.getStages().then((res) => {
            this.setState({stage: res.data})
        });
    }

    findStage(id) {
        for (let i = 0; i < this.state.stage.length; i++) {
            if (this.state.stage[i].id === id) {
                return this.state.stage[i]
            }
        }
    }

    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true});

    render() {
        const headCells = [
            { id: 'titre', numeric: false, disablePadding: true, label: 'Titre', align: 'left' },
            { id: 'statut', numeric: false, disablePadding: false, label: 'Statut', align: 'left' },
            { id: 'programme', numeric: true, disablePadding: false, label: 'Programme', align: 'left' },
            { id: 'ville', numeric: true, disablePadding: false, label: 'Ville', align: 'left' },
        ];

        return (

            <div>
                <h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Stages</h5>

                <TableContainer  component={Paper}>
                    <Table
                        stickyHeader
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.align}
                                        // padding={headCell.disablePadding ? 'none' : 'default'}
                                        // sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            // active={orderBy === headCell.id}
                                            // direction={orderBy === headCell.id ? order : 'asc'}
                                            // onClick={createSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                {/*                            {orderBy === headCell.id ? (*/}
                {/*                                <span className={classes.visuallyHidden}>*/}
                {/*  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
                {/*</span>*/}
                {/*                            ) : null}*/}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {this.state.stage.map(
                                stage =>
                                    <TableRow
                                        key={stage.id}
                                        hover
                                        onClick={(event) => this.handleClick(event, stage.id)}>
                                        <TableCell component="th" scope="row">
                                            {stage.titre}
                                        </TableCell>
                                        <TableCell align="left">{stage.statut}</TableCell>
                                        <TableCell align="left">{stage.programme}</TableCell>
                                        <TableCell align="left">{stage.ville}</TableCell>
                                    </TableRow>

                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>


        );
    }



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
                    <Container>
                        <Row>
                            <Col className="font-weight-bold">Status</Col>
                        </Row>
                        <Row>
                            <Col className={props.stage.statut}>{props.stage.statut}</Col>
                        </Row>


                        <Row>
                            <Col className="font-weight-bold">Programme</Col>
                            <Col className="font-weight-bold">Ville</Col>
                            <Col className="font-weight-bold"> Employeur</Col>
                        </Row>
                        <Row>
                            <Col>{props.stage.programme}</Col>
                            <Col>{props.stage.ville}</Col>
                            <Col>{props.stage.employeur.nom}</Col>

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