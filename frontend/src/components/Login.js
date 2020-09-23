import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render(){
        return (
            <div className="formBox">
                <h3>Login</h3>
                <form>
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

