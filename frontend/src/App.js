import React from 'react';
import './App.css';

import Login from "./components/Login";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";
import ListEtudiantsComponent from "./components/gestionnaire/ListEtudiantComponent";
import Register from './components/RegisterComponent';
import Logout from './components/Logout';
import CreateStageComponent from './components/stage/CreateStageComponent';
import GestionnaireListStageComponent from './components/gestionnaire/GestionnaireListeStageComponent';
import ListStagesEmployeur from './components/employeur/ListStagesEmployeur';
import ApplicationStageComponent from "./components/etudiant/ApplicationStageComponent";
import ListeCandidaturesEtudiantComponent from './components/etudiant/ListeCandidaturesEtudiantComponent';
import SelectionnerEtudiantComponent from './components/gestionnaire/SelectionnerEtudiantComponent';
import StageVeto from "./components/StageVeto";

import SelectionnerStagiaireComponent from "./components/employeur/SelectionnerStagiaireComponent";
import ContratsEmployeur from './components/employeur/ContratEmployeur'
import ContratEtudiant from './components/etudiant/ContratEtudiant'
import ListCandidatureChoisi from './components/contrat/ListCandidatureChoisi'
import CreationContrat from './components/contrat/CreationContrat'
import TeleverserContrat from './components/utils/TeleverserContrat'
import ContratsGestionnaire from "./components/gestionnaire/ContratsGestionnaire";

import StageComponent from "./components/stage/StageComponent";
import ListeStage from "./components/stage/ListeStage";

import QuestionProductivite from './components/evaluations/evaluationStagiaire/QuestionProductivite'
import QuestionQualiteTravail from './components/evaluations/evaluationStagiaire/QuestionQualiteTravail'
import QuestionRelations from './components/evaluations/evaluationStagiaire/QuestionRelations'
import QuestionsHabilites from './components/evaluations/evaluationStagiaire/QuestionsHabilites'
import EvaluationMilieuStage from './components/evaluations/evaluationMilieuStage/EvaluationMilieuStage'
import ObservationsMilieuStage from './components/evaluations/evaluationMilieuStage/EvaluationMilieuStage'
import EvaluationStagiaire from './components/evaluations/evaluationStagiaire/EvaluationStagiaire'
import CreateSessionComponent from "./components/gestionnaire/CreateSessionComponent";
import EvaluationsHome from './components/employeur/evaluations/EvaluationsHome'
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import EtudiantComponent from "./components/etudiant/EtudiantComponent";
import RapportComponent from "./components/gestionnaire/RapportComponent";
import CandidaturesGestionnaire from "./components/gestionnaire/CandidaturesGestionnaire";
import ProfileEmployeur from './components/employeur/ProfileEmployeur';
import ProfileGestionnaire from './components/gestionnaire/ProfileGestionnaire';
import ProfileEtudiant from './components/etudiant/ProfileEtudiant';
import ProfilEnseignant from './components/enseignant/ProfilEnseignant'
import EnseignantTabs from './components/enseignant/EnseignantTabs'
import EvaluationMiliauStageTabs from './components/evaluations/evaluationMilieuStage/EvaluationMiliauStageTabs'
import AssignerEtudiantsAuEnseignant from './components/gestionnaire/AssignerEtudiantsAuEnseignant'
import ListEtudiantsEnCharge from './components/enseignant/ListEtudiantsEnCharge'

function App() {
  return (
    
      <main>
      <ThemeProvider theme={theme}> 
        <HeaderComponent />

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/stages" component={ListStagesEmployeur}/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path="/etudiants" component={ListEtudiantsComponent}/>
          {/*<Route path='/stageVeto' component={StageVeto} />*/}
          <Route path='/offrestage' component={ApplicationStageComponent} />
          <Route path="/etudiants" component={ListEtudiantsComponent} />
          <Route path='/createStage' component={CreateStageComponent} />
          <Route path='/listecandidatures' component={ListeCandidaturesEtudiantComponent} />
          <Route path='/gestionnaireStage' component={GestionnaireListStageComponent} />
          <Route path='/stageSelectEtudiants/:id' component={SelectionnerEtudiantComponent} />
          <Route path='/stageSelectStagiaire/:id' component={SelectionnerStagiaireComponent} />
          <Route path='/contratsEmployeur' component={ContratsEmployeur} />
          <Route path='/contratsGestionnaire' component={ContratsGestionnaire} />
          <Route path='/contratEtudiant' component={ContratEtudiant} />
          <Route path='/ListCandidatureChoisi' component={ListCandidatureChoisi} />
          <Route path='/CreationContrat/:id' component={CreationContrat} />
          <Route path='/televerserContrats/:id' component={TeleverserContrat} />
          <Route path='/listCandidatureChoisi' component={ListCandidatureChoisi} />
          <Route path="/stage/:id" component={StageComponent}/>
          <Route path="/etudiantisa/:id" component={EtudiantComponent}/>
          {/*<Route path="/listestages/:desc" component={ListeStage}/>*/}
          <Route path="/listestages" component={ListeStage}/>
          <Route path="/createSession" component={CreateSessionComponent}/>
          <Route path="/candidaturesGestionnaire/:id" component={CandidaturesGestionnaire}/>
          <Route path="/questionProductivite/:id" component={QuestionProductivite}/>
          <Route path="/questionQualiteTravail/:id" component={QuestionQualiteTravail}/>
          <Route path="/questionRelations/:id" component={QuestionRelations}/>
          <Route path="/questionsHabilites/:id" component={QuestionsHabilites}/>
          <Route path="/evaluationMilieuStage/:id" component={EvaluationMilieuStage}/>
          <Route path="/observationsMilieuStage/:id" component={ObservationsMilieuStage}/>
          <Route path="/evaluationsEmployeur" component={EvaluationsHome}/>
          <Route path="/evaluationStagiaire/:id" component={EvaluationStagiaire}/>
          <Route path="/evaluationMilieuStageHome" component={EvaluationMiliauStageTabs}/>
          <Route path="/createSession" component={CreateSessionComponent}/>
          <Route path="/rapport" component={RapportComponent}/>
          <Route path="/rapport" component={RapportComponent}/>
          <Route path="/profileEmployeur" component={ProfileEmployeur}/>
          <Route path="/profileGestionnaire" component={ProfileGestionnaire}/>

          <Route path="/profilEnseignant" component={EnseignantTabs}/>
          <Route path="/profilEnseignant" component={EnseignantTabs}/>
          <Route path="/etudiantsEnCharge" component={ListEtudiantsEnCharge}/>
          <Route path="/etudiantsAuEnseignant/:id/:programme" component={AssignerEtudiantsAuEnseignant}/>
        </Switch>
          </ThemeProvider>  
      </main>
    
  );
}
const theme = createMuiTheme({
  palette:{
    primary:{
      main: "#616161",
      light: "#8e8e8e",
      dark: "#373737",
    },
    secondary:{
      main:"#ff8d0b",
      light: "#ffbe49",
     // dark: "#c55e00",
    },
    // type: "dark",
    action:{
        hover: "#ff8d0b",
        disabled: "#ac0505",
        selected :"#ffbe49"
    },
    background:{
      table: "#8e8e8e"
    }
  }
});

export default App;
