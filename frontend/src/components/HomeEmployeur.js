import React, { Component } from 'react';
import Employeur from '../model/Employeur';
import EmployeurService from '../service/EmployeurService'
import CreateStageComponent from './CreateStageComponent';
import { Link } from 'react-router-dom';

class HomeEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = { employeur: {}, createStage: false };
        this.handleCreateStage = this.handleCreateStage.bind(this)

    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");

        EmployeurService.getById(id).then((res) => this.setState({ employeur: res }))
    }

    handleCreateStage() {
        console.log(this.state.createStage)
        this.setState({ createStage: !this.state.createStage })
    }

    render() {
        const createStage = this.state.createStage;
        let button;
        if (createStage) { button = <button><CreateStageComponent /></button> }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-3">
                    <div className="row">
                        <button onClick={this.handleCreateStage.bind(this)}>create stage</button>
                        </div>

                        <div className="row">   
                        <button onClick={this.handleCreateStage.bind(this)}>voir mes stages</button>
                        </div>
                    </div>

                    <div className=" col-9">
                        {this.state.createStage &&
                            <CreateStageComponent employeur= {this.state.employeur}/>
                        }

                        
                    </div>
                </div>

                


            </div>
        );
    }
}

export default HomeEmployeur;