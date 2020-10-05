import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import User from "../model/User";
import LoginService from "../service/LoginService";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = new User();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)

    }

    handleSubmit(event) {
        event.preventDefault();

        LoginService.login(this.state["email"], this.state["password"])
        this.props.history.push('/');
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
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

