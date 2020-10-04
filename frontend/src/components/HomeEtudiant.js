import React, { Component } from 'react';
import './../App.css';
import Etudiant from "../model/Etudiant";
import axios from "axios";
import {fetchFile, simpleFetch} from "../crud/DataCRUD";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {etudiant: {}, displayInvalidFileMessage: false, displaySubmitCVButton: false};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    /*
    onChangeHandler = event => {
        var files = event.target.files
        if (this.checkMimeType(event)) {
            // if return true allow to setState
            this.setState({
                selectedFile: files
            })
        }

    }

     */
    onChangeHandler = event => {
        var files = event.target.files
        if (this.checkMimeType(event)) {
            // if return true allow to setState
            //console.log(files[0]);
            this.setState(prevState => ({
                etudiant: {                   // object that we want to update
                    ...prevState.etudiant,    // keep all other key-value pairs
                    cv: files[0]      // update the value of specific key
                }
            }))
        }

    }

    async componentDidMount() {
        const {data: etudiant} = await axios.get(
            "http://localhost:8080/etudiants/get?idEtudiant=1"
    );
        this.setState({etudiant});
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['application/pdf']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't match
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container
                err += files[x].type + ' is not a supported format\n'
                this.setState({displayInvalidFileMessage: true});
                this.setState({displaySubmitCVButton: false});
            } else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }
        }
        ;
        //console.log("Display message " + this.state.displayInvalidFileMessage);
        console.log(this.state);

        if (err !== '') { // if message not same old that mean has error
            event.target.value = null // discard selected file
            console.log(err)
            return false;
        }
        return true;

    }
    handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData();
        formData.append('file', this.state.etudiant.cv);
        const options = {
            method: 'PUT',
            body: formData
        };
        //console.log("etudiant : " + this.state.etudiant.cv);
        fetch('http://localhost:8080/etudiants/saveCV/1', options);
        //fetchFile("/etudiants/saveCV/1", "PUT", this.state.etudiant.cv).then(r => console.log(r))
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="d-flex flex-column">
            <div className="container">
                <h3>Votre profil</h3>

                <label>Nom : {this.state.etudiant.matricule} </label><br/>
                <label>Matricule : {this.state.etudiant.nom} </label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Matricule : {this.state.etudiant.matricule}</label><br/>
                <label>Email : {this.state.etudiant.email}</label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Programme : {this.state.etudiant.programme}</label><br/>
                <label>Televerser votre CV : <input type="file" name="file"
                                                    accept="application/pdf"
                                                    ref={this.inputRef}
                                                    defaultValue= {this.state.etudiant.cv}
                                                    onChange={this.onChangeHandler}/>
                </label><br/>

                {this.state.displayInvalidFileMessage ?
                    <label style={{color: "red"}}>Ce format de fichier n'est pas autorise. Seuls les fichiers au format
                        PDF sont autorises</label> : null}
                {this.state.displaySubmitCVButton ? <input type="submit" value="Enregistrer mon CV"/> : null}

            </div>
            </form>

        );
    }
}