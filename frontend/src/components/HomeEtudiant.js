import React, { Component } from 'react';
import './../App.css';
import Etudiant from "../model/Etudiant";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = { displayInvalidFileMessage: false, displaySubmitCVButton: false };
    }

    onChangeHandler=event=>{
        var files = event.target.files
        if(this.checkMimeType(event)){
            // if return true allow to setState
            this.setState({
                selectedFile: files
            })
        }

    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    checkMimeType=(event)=>{
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['application/pdf']
        // loop access array
        for(var x = 0; x<files.length; x++) {
            // compare file type find doesn't match
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container
                err += files[x].type+' is not a supported format\n'
                this.setState({displayInvalidFileMessage: true});
                this.setState({displaySubmitCVButton: false});
            }
            else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }

        };
        console.log("Display message " + this.state.displayInvalidFileMessage);

        if (err !== '') { // if message not same old that mean has error
            event.target.value = null // discard selected file
            console.log(err)
            return false;
        }
        return true;

    }

    render() {
        return(
            <div className="container">
                <h3>Votre profil</h3>
                <label>Nom : </label><br/>
                <label>Matricule : </label><br/>
                <label>Adresse : </label><br/>
                <label>Matricule : </label><br/>
                <label>Email : </label><br/>
                <label>Mot de passe : </label><br/>
                <label>Adresse : </label><br/>
                <label>Programme : </label><br/>
                <label>Televerser votre CV : <input type="file" name="file" onChange={this.onChangeHandler}/></label><br/>

                {this.state.displayInvalidFileMessage ? <label style={{color: "red"}}>Ce format de fichier n'est pas autorise </label> : null}
                {this.state.displaySubmitCVButton ? <input type="submit" value="Enregistrer mon CV"/>: null}

            </div>

        );
    }
}