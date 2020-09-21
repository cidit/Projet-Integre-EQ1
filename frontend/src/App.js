import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeurRegister from "./components/EmployeurRegister";
import Login from "./components/Login";

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
        <article>
        <EmployeurRegister/>
        </article>


    </div>
  );
}

export default App;
