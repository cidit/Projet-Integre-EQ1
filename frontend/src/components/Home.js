import React, { Component } from 'react';
import Register from './RegisterComponent';
import HomeEmployeur from './HomeEmployeur';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
           <div><HomeEmployeur/></div>
        );
    }
}