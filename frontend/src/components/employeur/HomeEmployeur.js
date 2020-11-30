import React, { Component } from 'react';
import EmployeurService from '../service/EmployeurService'
import CreateStageComponent from './stage/CreateStageComponent';

class HomeEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = { employeur: {}, createStage: false };
        this.handleCreateStage = this.handleCreateStage.bind(this)
    }

    async componentDidMount() {
        let id;
        if (localStorage.getItem("role") == "Employeur")
            id = localStorage.getItem("id");

        EmployeurService.getById(id).then((res) => this.setState({ employeur: res }))
    }

    handleCreateStage() {
        this.setState({ createStage: !this.state.createStage })
    }

    render() {
        const createStage = this.state.createStage;
        let button;
        if (createStage) { button = <button><CreateStageComponent /></button> }

        return (
            <div className="container-fluid">
               
        <h5>Bienvenue employeur {this.state.employeur.id}</h5>

            </div>
        );
    }
}

export default HomeEmployeur;