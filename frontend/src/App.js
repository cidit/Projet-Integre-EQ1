import React from 'react';
import './App.css';

import Login from "./components/Login";
import {Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";
import ListEtudiantsComponent from "./components/gestionnaire/ListEtudiantComponent";
import Register from './components/RegisterComponent';
import Logout from './components/Logout';
import CreateStageComponent from './components/stage/CreateStageComponent';
import GestionnaireListStageComponent from './components/gestionnaire/GestionnaireListeStageComponent';
import ApplicationStageComponent from "./components/etudiant/ApplicationStageComponent";
import ListeCandidaturesEtudiantComponent from './components/etudiant/ListeCandidaturesEtudiantComponent';
import SelectionnerEtudiantComponent from './components/gestionnaire/SelectionnerEtudiantComponent';

import SelectionnerStagiaireComponent from "./components/employeur/SelectionnerStagiaireComponent";
import ContratsEmployeur from './components/employeur/ContratEmployeur'
import ContratEtudiant from './components/etudiant/ContratEtudiant'
import ListCandidatureChoisi from './components/contrat/ListCandidatureChoisi'
import CreationContrat from './components/contrat/CreationContrat'
import TeleverserContrat from './components/utils/TeleverserContrat'
import ContratsGestionnaire from "./components/gestionnaire/ContratsGestionnaire";

import StageComponent from "./components/stage/StageComponent";
import ListeStage from "./components/stage/ListeStage";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import EtudiantComponent from "./components/etudiant/EtudiantComponent";
import RapportComponent from "./components/gestionnaire/RapportComponent";
import CandidaturesGestionnaire from "./components/gestionnaire/CandidaturesGestionnaire";
import HomeEtudiant from "./components/HomeEtudiant";


function App() {
    return (

        <main>
            <ThemeProvider theme={theme}>
                <HeaderComponent/>

                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path="/etudiants" component={ListEtudiantsComponent}/>
                    <Route path='/etudiant' component={HomeEtudiant}/>
                    <Route path='/offrestage' component={ApplicationStageComponent}/>
                    <Route path="/etudiants" component={ListEtudiantsComponent}/>
                    <Route path='/createStage' component={CreateStageComponent}/>
                    <Route path='/listecandidatures' component={ListeCandidaturesEtudiantComponent}/>
                    <Route path='/gestionnaireStage' component={GestionnaireListStageComponent}/>
                    <Route path='/stageSelectEtudiants/:id' component={SelectionnerEtudiantComponent}/>
                    <Route path='/stageSelectStagiaire/:id' component={SelectionnerStagiaireComponent}/>
                    <Route path='/contratsEmployeur' component={ContratsEmployeur}/>
                    <Route path='/contratsGestionnaire' component={ContratsGestionnaire}/>
                    <Route path='/contratEtudiant' component={ContratEtudiant}/>
                    <Route path='/ListCandidatureChoisi' component={ListCandidatureChoisi}/>
                    <Route path='/CreationContrat/:id' component={CreationContrat}/>
                    <Route path='/televerserContrats/:id' component={TeleverserContrat}/>
                    <Route path='/listCandidatureChoisi' component={ListCandidatureChoisi}/>
                    <Route path="/stage/:id/" component={StageComponent}/>
                    <Route path="/etudiantisa/:id" component={EtudiantComponent}/>
                    <Route path="/listestages" component={ListeStage}/>
                    <Route path="/candidaturesGestionnaire/:id" component={CandidaturesGestionnaire}/>


                    <Route path="/rapport" component={RapportComponent}/>
                </Switch>
            </ThemeProvider>
        </main>

    );


}

const theme = createMuiTheme({
    palette: {
        // primary: {
        //     main: "#616161",
        //     light: "#8e8e8e",
        //     dark: "#373737",
        // },
        primary: {
            main: "#612675",
            light: "#ffbe49",
            dark: "#c55e00",
        },
        action: {
            hover: "#ff8d0b",
            disabled: "#ac0505",
            selected: "#ffbe49"
        },
        background: {
            table: "#8e8e8e"
        },
        button: {
            textTransform: "capitalize"
        }
    }
});

export default App;
