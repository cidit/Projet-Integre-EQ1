import {Col, Container, Row} from "react-bootstrap";
import React, {Component} from "react";
import {createMuiTheme} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";

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
                <ShowInfo
                    stage={this.props.stage}
                    employeur={this.props.employeur}
                />
            </>
        );
    }
}

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



function ShowInfo1(props){
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <Row>
                <Col><h4>{props.stage.titre}</h4></Col>
            </Row>

            <Row>
                <Col className={classes.header}>Status</Col>
            </Row>
            <Row>
                {
                    props.stage.statut === "EN_ATTENTE"
                        ?
                        <Col className={props.stage.statut}>EN ATTENTE</Col>
                        :
                        <Col className={props.stage.statut}>{props.stage.statut}</Col>
                }
            </Row>

            <Row>
                <Col className={classes.header}>Programme</Col>
                <Col className={classes.header}>Ville</Col>
                <Col className={classes.header}>Employeur</Col>
            </Row>
            <Row>
                <Col>{props.stage.programme}</Col>
                <Col>{props.stage.ville}</Col>
                <Col>{props.employeur.nom}</Col>
            </Row>


            <Row>
                <Col className={classes.header}>Date de début</Col>
                <Col className={classes.header}>Date de fin</Col>
                <Col className={classes.header}>Date limite pour appliquer</Col>
            </Row>
            <Row>
                <Col>{props.stage.dateDebut}</Col>
                <Col>{props.stage.dateFin}</Col>
                <Col>{props.stage.dateLimiteCandidature}</Col>
            </Row>


            <Row>
                <Col className={classes.header} xs={6} md={4}>Nombre de places</Col>
                <Col className={classes.header} xs={6} md={4}>Heures par semaine</Col>
                <Col className={classes.header} xs={6} md={4}>Salaire</Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>{props.stage.nbAdmis}</Col>
                <Col xs={6} md={4}>{props.stage.nbHeuresParSemaine}</Col>
                <Col xs={6} md={4}>{props.stage.salaire}$/h</Col>
            </Row>


            <Row>
                <Col className={classes.header} xs={6} md={4}>Description</Col>
            </Row>
            <Row>
                <Col>{props.stage.description}</Col>
            </Row>


            <Row>
                <Col className={classes.header} xs={6} md={4}>Exigences</Col>
            </Row>
            <Row>
                <Col>{props.stage.exigences}</Col>
            </Row>
        </Container>
    );
}






const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.secondary.main,
    },
    header:{
        fontWeight: "bold"
    }
}));