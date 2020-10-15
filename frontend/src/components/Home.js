import React, { Component } from 'react';
import ListStagesComponent from './stage/ListStageComponent';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.location.search === "?refresh"){
             this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render(){
        return(
           <div><ListStagesComponent/></div>
        );
    }
}