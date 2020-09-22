import React from 'react';
import logo from './logo.svg';
import './App.css';
import EtudiantRegister from "./components/EtudiantRegister";
import ListStagesComponent from "./components/ListStageComponent";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <ListStagesComponent />
      </div>
      <FooterComponent />
    </div>

  );
}

export default App;
