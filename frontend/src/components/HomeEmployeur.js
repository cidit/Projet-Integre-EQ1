import React, { Component } from 'react';
import Employeur from '../model/Employeur';
import EmployeurService from '../service/EmployeurService'
import CreateStageComponent from './CreateStageComponent';

class HomeEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = {employeur : {}};
      
    }

    async componentDidMount() {
        EmployeurService.getById(3).then((res)=> this.setState({employeur : res}))
    }

    render() {
        return (
            <div>
                <div>{this.state.employeur.nomEntreprise}</div>

        <button></button>
            </div>
        );
    }
}

export default HomeEmployeur;