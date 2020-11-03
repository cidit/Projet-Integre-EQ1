import React, { Component } from 'react';
import ListeContrats from './contrat/ListeContrats'


import ContratsEmployeur from '../components/employeur/ContratEmployeur'
import CreationContrat from '../components/contrat/CreationContrat'
import ListCandidatureChoisi from './contrat/ListCandidatureChoisi'

export default class Home extends Component {
    componentDidMount() {
        if (this.props.location.search === "?refresh") {
            this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render() {
        return (
            <div>
          


            <ListCandidatureChoisi />  


            </div>

        );
    }
}