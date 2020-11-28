import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import EmployeurRegister from '../components/register/EmployeurRegister';
import EtudiantRegister from '../components/register/EtudiantRegister';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'etudiant',
        };
    }

    render(){
        
        return (

			<div className="container">
				<div className="container">
					<Tabs
						id="controlled-tab-example"
						activeKey={this.state.key}
						onSelect={key => this.setState({ key })}
					>
						<Tab eventKey="etudiant" title="Etudiant">
							<EtudiantRegister/>
						</Tab>
						<Tab eventKey="employeur" title="Employeur">
							<EmployeurRegister/>
						</Tab>
					</Tabs>
				</div>
			</div>

		);
    }
}