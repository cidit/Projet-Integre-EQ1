import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import User from "../model/User";
import LoginService from "../service/LoginService";
import HomeEmployeur from './HomeEmployeur';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {user : {}};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();

        let user = await LoginService.login(this.state["email"], this.state["password"])
        if (user.id != undefined){
             this.props.history.push('/?refresh');
        }

        // validation invalid email/password missing
    }

    render(){
        return (
            <div className="formBox">
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={this.handleChange} />
                     
                    </label>
                    <input type="submit" value="Login"/>
                </form>

                {this.state.user.desc == "Employeur" &&
                <div>hello</div>
                
                }

        
            </div>
        );
    }
}

