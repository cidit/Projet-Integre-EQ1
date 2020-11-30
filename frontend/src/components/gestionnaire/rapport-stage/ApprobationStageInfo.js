import {Col, Container, Row} from "react-bootstrap";
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import StageService from '../../../service/StageService';

export default class StageInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stage: {},
            employeur: {}
        };
    }

    componentDidMount() {
        StageService.getStageById(this.props.match.params.id)
            .then((res) => {
                this.setState({stage: res.data})
                this.setState({employeur: res.data.employeur})
            })
    }

    render(){
        return (
            <>
                <ShowInfo
                    stage={this.state.stage}
                    employeur={this.state.employeur}
                />
            </>
        );
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 25,
        width: '100%',
    },
    header:{
        fontWeight: "bold"
    }
}));

export function Data(props){
    const classes = useStyles();
    return (
        <>
            <div className={classes.header}>{props.header}</div>
            <div>{props.info}</div>
        </>

    );
}

function ShowInfo(props){
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <Row>
                <Col><h4>{props.stage.titre}</h4></Col>
            </Row>

            <Row>
                <Col>
                    <Data
                        header="Status"
                        info={
                            props.stage.statut === "EN_ATTENTE"
                                ? "EN ATTENTE"
                                : props.stage.statut
                        }
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Data
                        header="Programme"
                        info={props.stage.programme}
                    />
                </Col>
                <Col>
                    <Data
                        header="Ville"
                        info={props.stage.ville}
                    />
                </Col>
                <Col>
                    <Data
                        header="Programme"
                        info={props.employeur.nom}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Data
                        header="Date de début"
                        info={props.stage.dateDebut}
                    />
                </Col>
                <Col>
                    <Data
                        header="Date de fin"
                        info={props.stage.dateFin}
                    />
                </Col>
                <Col>
                    <Data
                        header="Date limite pour appliquer"
                        info={props.stage.dateLimiteCandidature}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Data
                        header="Nombre de places"
                        info={props.stage.nbAdmis}
                    />
                </Col>
                <Col >
                    <Data
                        header="Heures par semaine"
                        info={props.stage.nbHeuresParSemaine}
                    />
                </Col>
                <Col >
                    <Data
                        header="Salaire"
                        info={props.stage.salaire + "$/h"}
                    />
                </Col>
            </Row>



            <Row>
                <Col>
                    <Data
                        header="Description"
                        info={props.stage.description}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Data
                        header="Exigences"
                        info={props.stage.exigences}
                    />
                </Col>
            </Row>
        </Container>
    );
}
