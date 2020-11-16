import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import MuiAlert from '@material-ui/lab/Alert';
import StageService from "../../service/StageService";
import '../../css/StageVeto.css';
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import StageInfo from "./StageInfoComponent";
import SelectionnerStagiaireComponent from "../employeur/SelectionnerStagiaireComponent";
import {Modal} from "react-bootstrap";

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
    }

    handleShowModal = () => this.setState({showModal: true});

    componentDidMount() {
        StageService.getStageById(this.props.match.params.id)
            .then((res) => {
                this.setState({stage: res.data})
                this.setState({employeur: res.data.employeur})
            })
            // .then((res) => console.log(this.state.stage))

        axios.get("http://localhost:8080/candidatures/getByStage?stage=" + this.props.match.params.id).then(res => {
                this.setState({candidatures: res.data})
            }
        )
    }

    render() {
        return (
            <div className="container">
                <MyTabs
                    stage={this.state.stage}
                    employeur={this.state.employeur}
                    candidatures={this.state.candidatures}
                    stage={this.state.stage}
                />
            </div>
        );
    }
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Veto(props){
    const approuved = "APPROUVÉ";
    const denied = "REFUSÉ";

    function toggleBtns(isApprouved) {
        document.getElementsByName(approuved)[0].disabled = isApprouved
        document.getElementsByName(denied)[0].disabled = !isApprouved
    }

    async function handleClickStatut(event) {
        event.preventDefault();

        props.stage.statut = event.target.name;
        props.stage.ouvert = event.target.name === approuved;

        toggleBtns(event.target.name === approuved);



        await StageService.updateStage(props.stage, parseInt(event.target.value));

        // handleShowSnackbar();
        // handleCloseModal();
    }

    return (
        <>
            <Button
                type="button"
                className="btnVeto"
                name={approuved}
                disabled={props.stage.statut === approuved}
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


export function MyTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const roles = [
        {gestionnaire: true, employeur: true},
        {gestionnaire: true, employeur: true},
        {gestionnaire: true, employeur: false},
        {gestionnaire: true, employeur: true}
    ];

    const tags = [
        {label: "Info", disabled: false},
        {label: "Choix des stagiaires",  disabled: props.candidatures.length === 0},
        {label: "Veto",  disabled: false},
        {label: "Hello",  disabled: false}
    ];
    const panels =[
        {component: <StageInfo stage={props.stage} employeur={props.employeur} />},
        {component: <SelectionnerStagiaireComponent id={props.stage.id}/>},
        {component: <Veto stage={props.stage}/>},
        {component: <p>Hello</p>}
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

function hasRole(role){
    return window.localStorage.getItem("desc") === role;
}



export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
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


export function ListeCandidatures(props) {
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

    function HandleClick(e) {
        e.preventDefault();
        console.log(checked)

        for (let i = 0; i < checked.length; i++) {
            checked[i].statut = "CHOISI";
            axios.put("http://localhost:8080/candidatures/update/" + checked[i].id, checked[i]).then(res => console.log(res))
        }
        handleCloseModal();
    }

    return (
        <>
            <List>
                {props.candidatures.map((candidature) => {
                    // const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={candidature.id}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(candidature)}
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
                                primary={`${candidature.etudiant.nom}, ${candidature.etudiant.prenom}`}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Button
                onClick={HandleClick}
            >
                Confirmer
            </Button>
        </>

    );


}


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}