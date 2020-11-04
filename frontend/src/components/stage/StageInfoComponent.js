import {Col, Container, Row} from "react-bootstrap";
import React, {Component} from "react";

export default class StageInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stage: {},
            employeur: {}
        };
    }

    render(){
        return (
            <>
                <Container>

                    <Row>
                        <Col><h4>{this.props.stage.titre}</h4></Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold">Status</Col>
                    </Row>
                    <Row>
                        <Col className={this.props.stage.statut}>{this.props.stage.statut}</Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold">Programme</Col>
                        <Col className="font-weight-bold">Ville</Col>
                        <Col className="font-weight-bold">Employeur</Col>
                    </Row>
                    <Row>
                        <Col>{this.props.stage.programme}</Col>
                        <Col>{this.props.stage.ville}</Col>
                        <Col>{this.props.employeur.nom}</Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold">Date de début</Col>
                        <Col className="font-weight-bold">Date de fin</Col>
                        <Col className="font-weight-bold">Date limite pour appliquer</Col>
                    </Row>
                    <Row>
                        <Col>{this.props.stage.dateDebut}</Col>
                        <Col>{this.props.stage.dateFin}</Col>
                        <Col>{this.props.stage.dateLimiteCandidature}</Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold" xs={6} md={4}>Nombre de places</Col>
                        <Col className="font-weight-bold" xs={6} md={4}>Heures par semaine</Col>
                        <Col className="font-weight-bold" xs={6} md={4}>Salaire</Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>{this.props.stage.nbAdmis}</Col>
                        <Col xs={6} md={4}>{this.props.stage.nbHeuresParSemaine}</Col>
                        <Col xs={6} md={4}>{this.props.stage.salaire}$/h</Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold" xs={6} md={4}>Description</Col>
                    </Row>
                    <Row>
                        <Col>{this.props.stage.description}</Col>
                    </Row>


                    <Row>
                        <Col className="font-weight-bold" xs={6} md={4}>Exigences</Col>
                    </Row>
                    <Row>
                        <Col>{this.props.stage.exigences}</Col>
                    </Row>
                </Container>
            </>
        );
    }
}