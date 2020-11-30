import React from 'react';
import './App.css';

import Login from "./components/Login";
import {Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";
import ListEtudiantsComponent from "./components/gestionnaire/ListEtudiantComponent";

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

import StageComponent from "./components/stage/StageComponent";
import ListeStage from "./components/stage/ListeStage";

import QuestionProductivite from './components/evaluations/evaluationStagiaire/QuestionProductivite'
import QuestionQualiteTravail from './components/evaluations/evaluationStagiaire/QuestionQualiteTravail'
import QuestionRelations from './components/evaluations/evaluationStagiaire/QuestionRelations'
import QuestionsHabilites from './components/evaluations/evaluationStagiaire/QuestionsHabilites'
import EvaluationMilieuStage from './components/evaluations/evaluationMilieuStage/EvaluationMilieuStage'
import EvaluationStagiaire from './components/evaluations/evaluationStagiaire/EvaluationStagiaire'
import EvaluationsHome from './components/employeur/evaluations/EvaluationsHome'
import {createMuiTheme} from "@material-ui/core";
import RapportComponent from "./components/gestionnaire/RapportComponent";
import CandidaturesGestionnaire from "./components/gestionnaire/CandidaturesGestionnaire";

import ProfilEmployeur from './components/employeur/ProfilEmployeur';
import ProfilGestionnaire from './components/gestionnaire/ProfilGestionnaire';
import ProfilEtudiant from './components/etudiant/ProfilEtudiant';
import ProfilEnseignant from './components/enseignant/ProfilEnseignant'
import EvaluationMiliauStageTabs from './components/evaluations/evaluationMilieuStage/EvaluationMiliauStageTabs'
import ListEtudiantsEnCharge from './components/enseignant/ListEtudiantsEnCharge'
import RegisterTabs from './components/register/RegisterTabs'
import EnseignantsTabs from './components/gestionnaire/EnseignantsTabs'
import ThemeProvider from "@material-ui/styles/ThemeProvider";

function App() {
    return (

        <main>
            <ThemeProvider theme={theme}>
                <HeaderComponent/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={RegisterTabs}/>
                    <Route path="/etudiants" component={ListEtudiantsComponent}/>
                    <Route path='/offrestage' component={ApplicationStageComponent}/>
                    <Route path="/etudiants" component={ListEtudiantsComponent}/>
                    <Route path='/createStage' component={CreateStageComponent}/>
                    <Route path='/listecandidatures' component={ListeCandidaturesEtudiantComponent}/>
                    <Route path='/gestionnaireStage' component={GestionnaireListStageComponent}/>
                    <Route path='/stageSelectEtudiants/:id' component={SelectionnerEtudiantComponent}/>
                    <Route path='/stageSelectStagiaire/:id' component={SelectionnerStagiaireComponent}/>
                    <Route path='/contratsEmployeur' component={ContratsEmployeur}/>
                    <Route path='/contratEtudiant' component={ContratEtudiant}/>
                    <Route path='/ListCandidatureChoisi' component={ListCandidatureChoisi}/>
                    <Route path='/CreationContrat/:id' component={CreationContrat}/>
                    <Route path='/televerserContrats/:id' component={TeleverserContrat}/>
                    <Route path='/listCandidatureChoisi' component={ListCandidatureChoisi}/>
                    <Route path="/stage/:id/:tab" component={StageComponent}/>
                    <Route path="/listestages" component={ListeStage}/>
                    <Route path="/candidaturesGestionnaire/:id" component={CandidaturesGestionnaire}/>
                    <Route path="/questionProductivite/:id" component={QuestionProductivite}/>
                    <Route path="/questionQualiteTravail/:id" component={QuestionQualiteTravail}/>
                    <Route path="/questionRelations/:id" component={QuestionRelations}/>
                    <Route path="/questionsHabilites/:id" component={QuestionsHabilites}/>
                    <Route
                        path="/evaluationMilieuStage/:employeur/:prenomEtudiant/:nomEtudiant/:idEnseignant/:idCandidature"
                        component={EvaluationMilieuStage}/>
                    <Route path="/evaluationsEmployeur" component={EvaluationsHome}/>
                    <Route path="/evaluationStagiaire/:id" component={EvaluationStagiaire}/>
                    <Route path="/evaluationMilieuStageHome" component={EvaluationMiliauStageTabs}/>
                    <Route path="/rapport" component={RapportComponent}/>

                    <Route path="/profilEtudiant" component={ProfilEtudiant}/>
                    <Route path="/profilEmployeur" component={ProfilEmployeur}/>
                    <Route path="/profilGestionnaire" component={ProfilGestionnaire}/>
                    <Route path="/profilEnseignant" component={ProfilEnseignant}/>
                    <Route path="/etudiantsEnCharge" component={ListEtudiantsEnCharge}/>
                    <Route path="/etudiantsAuEnseignant/:nom/:prenom/:id/:programme" component={EnseignantsTabs}/>
                </Switch>
            </ThemeProvider>
        </main>

    );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#26616b",
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
