import React, { Component } from 'react';
import HorizontalNonLinearStepper from '../components/contrat2.js/CreationContrat'
import CollapsibleTable from '../components/contrat2.js/useCreateList'

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
                <CollapsibleTable/>
            </div>
        );
    }
}