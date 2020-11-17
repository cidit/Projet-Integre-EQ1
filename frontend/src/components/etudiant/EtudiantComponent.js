import React, {Component} from "react";
import EtudiantService from "../../service/EtudiantService";
import {Col, Container, Row} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TabPanel} from "../stage/StageComponent";

export default class EtudiantComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            etudiant: {},
            file: "",
            displayInvalidFileMessage: false,
            displaySubmitCVButton: false,
            CVInfoMessage: "",
            hasUploadedCV: false,
            id: ''
        };
    };

    componentDidMount(){
        EtudiantService.getEtudiantById(this.props.match.params.id)
            .then((res) => {
                this.setState({etudiant: res.data});
            })
    }


    render() {
        return (

            <div className="container">
                <MyTabs
                    etudiant={this.state.etudiant}
                />
            </div>
        );
    }

}

export function MyTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const roles = [
        {gestionnaire: true, employeur: true, etudiant: true},
        {gestionnaire: false, employeur: true, etudiant: false},

    ];

    const tags = [
        {label: "Info", disabled: false},
        {label: "Evaluation", disabled: false},
        // {label: "Choix des stagiaires",  disabled: props.candidatures.length === 0},
        // {label: "Veto",  disabled: false},
        // {label: "Hello",  disabled: false}
    ];
    const panels =[
        {
            component:
            <div>
                <InfoEtudiant
                    etudiant={props.etudiant}
                />



            </div>

        },
        {component: <p>TODO</p>},
        // {component: <SelectionnerStagiaireComponent id={props.stage.id}/>},
        // {component: <Veto stage={props.stage}/>},

    ];

    let usedTags=[];
    let usedPanels=[];


    for (let i = 0; i < roles.length; i++){
        if(roles[i][window.localStorage.getItem("desc").toLowerCase()]){
            tags[i].id = usedTags.length;
            panels[i].id = usedPanels.length;
            usedTags.push(tags[i]);
            usedPanels.push(panels[i]);
        }
    }

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {usedTags.map(
                    tab =>
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            disabled={tab.disabled}
                        />
                )}
            </Tabs>

            {usedPanels.map(
                panel =>
                    <TabPanel
                        key={panel.id}
                        value={value}
                        index={panel.id}
                    >
                        {panel.component}
                    </TabPanel>
            )}



        </>
    );

}


function SessionInfo(props) {

    return (
        <>

        </>
    );
}


function CV (props){

}


export function Data(props){
    const classes = useStyles();
    return (
        <>
            <Col>
                <div
                    className={classes.header}
                >{props.header}</div>
                <div>{props.info}</div>
            </Col>

        </>

    );
}

export function InfoEtudiant(props){


    return(

          <Container>
              <Row>
                  <Col><h4>{props.etudiant.prenom} {props.etudiant.nom}</h4></Col>
              </Row>


              <Row>
                  <Data
                      header={"Status"}
                      info={props.etudiant.statutStage}
                  />

              </Row>

              <Row>
                  <Data
                      header={"Programme"}
                      info={props.etudiant.programme}
                  />
                  <Data
                      header={"Adresse"}
                      info={props.etudiant.adresse}
                  />
                  <Data
                      header={"Matricule"}
                      info={props.etudiant.matricule}
                  />
              </Row>




              <Row>
                  <Data
                      header={"Telephone"}
                      info={props.etudiant.telephone}
                  />
                  <Data
                      header={"Email"}
                      info={props.etudiant.email}
                  />
              </Row>


              <Row>
                  <button>CV</button>
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