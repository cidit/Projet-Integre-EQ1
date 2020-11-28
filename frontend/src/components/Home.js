import React, { Component } from 'react';
import ListEnseignants from './gestionnaire/ListEnseignants';


export default class Home extends Component {
    componentDidMount() {
        if (localStorage.getItem("desc") === null) {
            this.props.history.push('/login');
        }
        if (this.props.location.search === "?refresh") {
            this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render() {
        return (
            <div>

             {/* <ListEnseignants/>   */}

            </div>
        );
    }
}