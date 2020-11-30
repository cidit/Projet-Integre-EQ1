import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import MuiAlert from '@material-ui/lab/Alert';
import StageService from "../../service/StageService";
import '../../css/StageVeto.css';
import axios from "axios";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as PropTypes from "prop-types";
import StageInfo from "./StageInfoComponent";
import SelectionnerStagiaireComponent from "../employeur/SelectionnerStagiaireComponent";
import SelectionnerEtudiantComponent from "../gestionnaire/SelectionnerEtudiantComponent";
import CandidatureService from '../../service/CandidatureService';

export default class StageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: {},
            employeur: {},
            candidatures: [],
            showModal: false
        };
        this.handleShowModal = this.handleShowModal.bind(this)
    }

    handleShowModal = () => this.setState({showModal: true});

    componentDidMount() {
        StageService.getStageById(this.props.match.params.id)
            .then((res) => {
                this.setState({stage: res.data})
                this.setState({employeur: res.data.employeur})
            })

        CandidatureService.getByStage(this.props.match.params.id)
            .then(res => {
                this.setState({candidatures: res.data})
            }
        )
    }

    render() {
        let idTab = 0;
        if (this.props.match.params.tab !== undefined){
            idTab = this.props.match.params.tab;
        }

        return (
            <div className="container">
                <MyTabs
                    stage={this.state.stage}
                    employeur={this.state.employeur}
                    candidatures={this.state.candidatures}
                    // tab = {idTab}
                />
            </div>
        );
    }
}

export function Veto(props){
    const approved = "APPROUVÉ";
    const denied = "REFUSÉ";

    function toggleBtns(isApprouved) {
        document.getElementsByName(approved)[0].disabled = isApprouved
        document.getElementsByName(denied)[0].disabled = !isApprouved
    }

    async function handleClickStatut(event) {
        event.preventDefault();

        props.stage.statut = event.target.name;
        props.stage.ouvert = event.target.name === approved;
        toggleBtns(event.target.name === approved);
        await StageService.updateStage(props.stage, parseInt(event.target.value));
        window.location.reload()
    }

    return (
        <>
            <div>
                <h4>Informations à regarder: </h4>
                <ul>
                    <li>Est-ce que la durée du stage est suffisante?</li>
                    <li>Est-ce que la date de début est adéquate?</li>
                    <li>Est-ce que le nombre d'heures par semaine est faisable?</li>
                    <li>Est-ce que le salaire est adéquat?</li>
                    <li>ESt-ce que les exigences et la description sont adaptés pour le programme ciblé?</li>
                </ul>
            </div>
            <Button
                type="button"
                className="btnVeto"
                name={approved}
                disabled={props.stage.statut === approved}
                value={props.stage.id}
                onClick={handleClickStatut}
                variant="success"
            >
                Approuver
            </Button>
            <Button
                type="button"
                className="btnVeto"
                name={denied}
                disabled={props.stage.statut === denied}
                value={props.stage.id}
                onClick={handleClickStatut}
                variant="danger"
            >
                Refuser
            </Button>
        </>
    );
}


function MyTabs(props) {
    const [value, setValue] = React.useState(0);
    // const [value, setValue] = React.useState(props.tab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const roles = [
        {gestionnaire: true, employeur: true},
        {gestionnaire: true, employeur: false},
        {gestionnaire: true, employeur: false},
        {gestionnaire: true, employeur: true},
        {gestionnaire: true, employeur: false},
    ];

    const tags = [
        {label: "Info", disabled: false},
        {label: "Veto",  disabled: false},
        {label: "Assigner étudiants",  disabled: false},
        {label: "Choix des stagiaires",  disabled: props.candidatures.length === 0},
        {label: "Evaluation",  disabled: false},
    ];
    const panels =[
        {component: <StageInfo stage={props.stage} employeur={props.employeur} />},
        {component: <Veto stage={props.stage}/>},
        {component: <SelectionnerEtudiantComponent stage={props.stage}/>},
        {component: <SelectionnerStagiaireComponent id={props.stage.id}/>},
        {component: <p>TODO</p>},
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
                    <TabPanel key={panel.id} value={value} index={panel.id}>
                        {panel.component}
                    </TabPanel>
            )}
        </>
    );

}

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

