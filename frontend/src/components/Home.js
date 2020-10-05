import React, { Component } from 'react';
import Register from './RegisterComponent';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
           <div><Register/></div>
        );
    }
}