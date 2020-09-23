import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStageComponent from './components/CreateStageComponent';
import CreateStageFormikComponent from './components/CreateStageFormikComponent';
import EmployeurRegister from "./components/EmployeurRegister";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Projet intégré équipe 1
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          x
        </a>
      </header>
        <article id="article">
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/empRegist' component={EmployeurRegister} />
            <Route path='/login' component={Login} />
          </Switch>

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

    {/*<header className="App-header">*/}
    {/*  <img src={logo} className="App-logo" alt="logo" />*/}
    {/*  <p>*/}
    {/*    Edit <code>src/App.js</code> and save to reload.*/}
    {/*  </p>*/}
    {/*  <a*/}
    {/*    className="App-link"*/}
    {/*    href="https://reactjs.org"*/}
    {/*    target="_blank"*/}
    {/*    rel="noopener noreferrer"*/}
    {/*  >*/}
    {/*    Learn React*/}
    {/*  </a>*/}
    {/*</header>*/}
    <EtudiantRegister/>


</div>
        </article>


    </div>

  );
}

export default App;
