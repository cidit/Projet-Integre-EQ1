import React, { Component } from 'react';
import ListeContrats from './contrat/ListeContrats'

import SauvegarderContrat from '../components/contrat/Testdeq'
import ContratsEmployeur from '../components/employeur/ContratEmployeur'
import CreationContrat from '../components/contrat/CreationContrat'

export default class Home extends Component {
    componentDidMount() {
        if (this.props.location.search === "?refresh") {
            this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render(){
        return(
           <div>
               {/* <ListeContrats/> */}
             
              {/* <SauvegarderContrat/>  */}

             {/* <CreationContrat/>  */}
           </div>

        );
    }
}