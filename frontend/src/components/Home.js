import React, { Component } from 'react';
import HorizontalNonLinearStepper from '../components/contrat2.js/CreationContrat'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.location.search === "?refresh") {
            this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render() {
        return (
         <div>
                <HorizontalNonLinearStepper/>
            </div>
        );
    }
}