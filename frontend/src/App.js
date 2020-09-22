import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStageComponent from './components/CreateStageComponent';


function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path = "/" exact component = {ListStagesComponent}></Route>
              <Route path = "/stages" component = {ListStagesComponent}></Route>
              <Route path = "/createStage" component = {CreateStageComponent}></Route>
              <ListStagesComponent />
            </Switch>
          </div>
          <FooterComponent />
        </div>
      </Router>

    </div>

  );
}

export default App;
