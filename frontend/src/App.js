import React from 'react';
import logo from './logo.svg';
import './App.css';
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
        </article>


    </div>
  );
}

export default App;
