import React from 'react';
import logo from './logo.svg';
import './App.css';


import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import CreateStageComponent from './components/CreateStageComponent';
import EmployeurRegister from "./components/EmployeurRegister";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";

function App() {

  return (
    <div className="App">
      <main>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/stages" component={ListStagesComponent}/>
          <Route path="/createStage" component={CreateStageComponent}/>
          <Route path='/empRegist' component={EmployeurRegister} />
          <Route path='/create' component={EtudiantRegister} />
          <Route path='/login' component={Login} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
