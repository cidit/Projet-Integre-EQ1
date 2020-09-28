import React from 'react';
import logo from './logo.svg';
import './App.css';


import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import CreateStageComponent from './components/CreateStageComponent';
import EmployeurRegister from "./components/EmployeurRegister";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Home from "./components/Home";
import HomeEtudiant from "./components/HomeEtudiant";

function App() {
  return (
    <div className="App">


      <article id="article">
        <div>
          <Router>
            <nav class="navbar navbar-dark bg-dark p-2 m-3">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/empRegist">Inscrire un employé</NavLink>
              <NavLink to="/create">Inscrire un étudiant</NavLink>
              <NavLink to="/createStage">Créer un stage</NavLink>
              <NavLink to="/Login">Login</NavLink>
            </nav>
            <div className="container">
              <div className="container">
                <Switch>
                  <Route path="/" exact component={Home}></Route>
                  <Route path="/stages" component={ListStagesComponent}></Route>
                  <Route path="/createStage" component={CreateStageComponent}></Route>
                  <Route path='/empRegist' component={EmployeurRegister} />
                  <Route path='/create' component={EtudiantRegister} />
                  <Route path='/login' component={Login} />
                  <Route path='/etudiant' component={HomeEtudiant} />

                </Switch>
              </div>

            </div>
          </Router>

        </div>
      </article>


    </div>

  );
}

export default App;
