import React from 'react';
import './App.css';

import Login from "./components/Login";
import {Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";

import CreateStageComponent from './components/stage/CreateStageComponent';
import ApplicationStageComponent from "./components/etudiant/ApplicationStageComponent";
import ListeCandidaturesEtudiantComponent from './components/etudiant/ListeCandidaturesEtudiantComponent';
import SelectionnerEtudiantComponent from './components/gestionnaire/SelectionnerEtudiantComponent';

import SelectionnerStagiaireComponent from "./components/employeur/SelectionnerStagiaireComponent";

import CreationContrat from './components/contrat/CreationContrat';
import TeleverserContrat from './components/utils/TeleverserContrat';

import StageComponent from "./components/stage/StageComponent";

import QuestionProductivite from './components/evaluations/evaluationStagiaire/QuestionProductivite';
import QuestionQualiteTravail from './components/evaluations/evaluationStagiaire/QuestionQualiteTravail';
import QuestionRelations from './components/evaluations/evaluationStagiaire/QuestionRelations';
import QuestionsHabilites from './components/evaluations/evaluationStagiaire/QuestionsHabilites';
import EvaluationMilieuStage from './components/evaluations/evaluationMilieuStage/EvaluationMilieuStage';
import EvaluationStagiaire from './components/evaluations/evaluationStagiaire/EvaluationStagiaire';
import EvaluationStagiaireTabs from './components/employeur/evaluations/EvaluationStagiaireTabs';
import {createMuiTheme} from "@material-ui/core";
import {ListeContrat} from "./components/contrat/ListeContrats";

import ProfilEmployeur from './components/employeur/ProfilEmployeur';
import ProfilGestionnaire from './components/gestionnaire/ProfilGestionnaire';
import ProfilEtudiant from './components/etudiant/ProfilEtudiant';

import ProfilEnseignant from './components/enseignant/ProfilEnseignant';
import EvaluationMiliauStageTabs from './components/evaluations/evaluationMilieuStage/EvaluationMiliauStageTabs';
import ListEtudiantsEnCharge from './components/enseignant/ListEtudiantsEnCharge';
import RegisterTabs from './components/register/RegisterTabs';
import EnseignantsTabs from './components/gestionnaire/rapport-enseignant/EnseignantsTabs';
import RapportEnseignantComponent from './components/gestionnaire/rapport-enseignant/RapportEnseignantComponent';
import RapportEtudiantComponent from './components/gestionnaire/rapport-etudiant/RapportEtudiantComponent';
import RapportStageComponent from './components/gestionnaire/rapport-stage/RapportStageComponent';
import RapportContratComponent from './components/gestionnaire/rapport-contrat/RapportContratComponent';

import RapportStageEmployeur from './components/employeur/stage/RapportStageEmployeur';
import ThemeProvider from "@material-ui/styles/ThemeProvider";

function App() {
  return (
    
      <main>
      <ThemeProvider theme={theme}>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={RegisterTabs} />
          <Route path='/offrestage' component={ApplicationStageComponent} />
          <Route path='/createStage' component={CreateStageComponent} />
          <Route path='/listecandidatures' component={ListeCandidaturesEtudiantComponent} />
          <Route path='/stageSelectEtudiants/:id' component={SelectionnerEtudiantComponent} />
          <Route path='/stageSelectStagiaire/:id' component={SelectionnerStagiaireComponent} />
         
          <Route path='/CreationContrat/:id' component={CreationContrat} />
          <Route path='/televerserContrats/:id' component={TeleverserContrat} />
          <Route path="/stage/:id/:tab" component={StageComponent}/>
          <Route path='/listeContrats' component={ListeContrat}/>
          <Route path="/questionProductivite/:id" component={QuestionProductivite}/>
          <Route path="/questionQualiteTravail/:id" component={QuestionQualiteTravail}/>
          <Route path="/questionRelations/:id" component={QuestionRelations}/>
          <Route path="/questionsHabilites/:id" component={QuestionsHabilites}/>
          <Route path="/evaluationMilieuStage/:employeur/:prenomEtudiant/:nomEtudiant/:idEnseignant/:idCandidature" component={EvaluationMilieuStage}/>
          <Route path="/evaluationsEmployeur" component={EvaluationStagiaireTabs}/>
          <Route path="/evaluationStagiaire/:id" component={EvaluationStagiaire}/>
          <Route path="/evaluationMilieuStageHome" component={EvaluationMiliauStageTabs}/>

          {/* Rapports */}
          <Route path="/rapportEnseignant" component={RapportEnseignantComponent}/>
          <Route path="/rapportEtudiant" component={RapportEtudiantComponent}/>
          <Route path="/rapportStage/:tab" component={RapportStageComponent}/>
          <Route path="/rapportContrat/:tab" component={RapportContratComponent}/>

          {/* Profils */}
          <Route path="/profilEtudiant" component={ProfilEtudiant}/>
          <Route path="/profilEmployeur" component={ProfilEmployeur}/>
          <Route path="/profilGestionnaire" component={ProfilGestionnaire}/>
          <Route path="/profilEnseignant" component={ProfilEnseignant}/>

          <Route path="/etudiantsEnCharge" component={ListEtudiantsEnCharge}/>
          <Route path="/etudiantsAuEnseignant/:nom/:prenom/:id/:programme" component={EnseignantsTabs}/>

          <Route path="/rapportStageEmployeur" component={RapportStageEmployeur}/>
        </Switch>
            </ThemeProvider>
      </main>
    
  );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1666DB",
            light: "#4d84e3",
            dark: "#0d3477",
        },
        secondary:{
            main:"#1666DB",
            light: "#ffbe49",
            // dark: "#c55e00",
        },
        action: {
            hover: "#4d84e3",
            disabled: "#ac0505",
            selected: "#ffbe49"
        },
        background: {
            table: "#8e8e8e"
        },
        button: {
            textTransform: "capitalize"
        },

    }
});

export default App;
