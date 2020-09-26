import React, { Component } from 'react';
import './../App.css';
import Etudiant from "../model/Etudiant";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = new Etudiant ();
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    render() {
        return(
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        );
    }
}