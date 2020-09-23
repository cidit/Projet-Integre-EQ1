import React from 'react';
import logo from './logo.svg';
import './App.css';


import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStageComponent from './components/CreateStageComponent';
import CreateStageFormikComponent from './components/CreateStageFormikComponent';
import EmployeurRegister from "./components/EmployeurRegister";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch ,Link} from 'react-router-dom';
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
        
        </Switch>

        <div>
          <Router>
            <div className="container">
            <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stages">Get al stages</Link>
          </li>
          <li>
            <Link to="/createStage">Create Stage</Link>
          </li>
          <li>
            <Link to="/empRegist">Employee registre</Link>
          </li>
          <li>
            <Link to="/create">Create Student</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
           
              <div className="container">
                <Switch>
                  
                  <Route path="/" exact component={Home}></Route>
                  <Route path="/stages" component={ListStagesComponent}></Route>
                  <Route path="/createStage" component={CreateStageComponent}></Route>
                  <Route path='/empRegist' component={EmployeurRegister} />
                  <Route path='/create' component={EtudiantRegister} />
                  <Route path='/login' component={Login} />
                
                </Switch>
              </div>
              <FooterComponent />
            </div>
          </Router>

        </div>
      </article>


    </div>

  );
}

export default App;
