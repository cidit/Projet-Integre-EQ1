import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import { Tab, Tabs } from 'react-bootstrap';
import Etudiant from "../model/Etudiant";
import {simpleFetch} from "../crud/DataCRUD";
import Employeur from "../model/Employeur";
import EmployeurRegister from './EmployeurRegister';
import EtudiantRegister from './EtudiantRegister';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'etudiant',
        };
    }

    render(){
        
        return (
			<Tabs
				id="controlled-tab-example"
				activeKey={this.state.key}
				onSelect={key => this.setState({ key })}
			>
				<Tab eventKey="etudiant" title="Etudiant">
                    <h3>Enregistrement Etudiant</h3>
					<EtudiantRegister/>
				</Tab>
				<Tab eventKey="employeur" title="Employeur">
					<EmployeurRegister/>
				</Tab>
			</Tabs>
		);
    }
}