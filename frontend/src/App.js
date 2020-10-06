import React from 'react';
import './App.css';

import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import Login from "./components/Login";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";

import ListEtudiantsComponent from "./components/ListEtudiantComponent";
import HomeEtudiant from "./components/HomeEtudiant";
import Register from './components/RegisterComponent';
import Logout from './components/Logout';
import CreateStageComponent from './components/CreateStageComponent'

function App() {
  return (
    <div className="App">
      <main>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/stages" component={ListStagesComponent}/>
          <Route path='/create' component={EtudiantRegister} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path="/etudiants" component={ListEtudiantsComponent}></Route>
          <Route path='/etudiant' component={HomeEtudiant} />
          <Route path='/createStage' component={CreateStageComponent} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
