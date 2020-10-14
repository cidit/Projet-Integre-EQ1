import React from 'react';
import './App.css';

import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import Login from "./components/Login";
import { Route, Switch,Router , withRouter } from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";
import ListEtudiantsComponent from "./components/ListEtudiantComponent";
import HomeEtudiant from "./components/HomeEtudiant";
import Register from './components/RegisterComponent';
import Logout from './components/Logout';
import CreateStageComponent from './components/CreateStageComponent'
import ListeStageEtudiantComponent from "./components/ApplicationStageComponent";

function App() {
  return (
    
      <main>
        <HeaderComponent />
        <div className="container">
         
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/stages" component={ListStagesComponent}/>
          <Route path='/create' component={EtudiantRegister} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path="/etudiants" component={ListEtudiantsComponent}/>
          <Route path='/etudiant' component={HomeEtudiant} />
          <Route path='/offrestage' component={ListeStageEtudiantComponent} />
          <Route path='/createStage' component={CreateStageComponent} />
        </Switch>
       
        </div>
      </main>
    
  );
}

export default App;
