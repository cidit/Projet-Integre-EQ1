import React, { Component } from 'react';
import './../App.css';
import axios from "axios";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {etudiant: {}, displayInvalidFileMessage: false, displaySubmitCVButton: false, hasAlreadyCV: false, hasUploadedCV: false, id: ''};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        var files = event.target.files
        if (this.checkMimeType(event)) {
            this.setState(prevState => ({
                etudiant: {
                    ...prevState.etudiant,
                    cv: files[0]
                }
            }))

        }
        this.setState({hasUploadedCV: false});
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");

        const {data: etudiant} = await axios.get(
            "http://localhost:8080/etudiants/get?idEtudiant=" + id
    );
        this.setState({etudiant: etudiant});
        this.setState({hasAlreadyCV: this.state.etudiant.cv != undefined} );
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
                this.setState({displayInvalidFileMessage: true});
                this.setState({displaySubmitCVButton: false});
            } else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }
        }
        ;
        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }
    handleSubmit(event) {
        event.preventDefault()
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");
        const formData = new FormData();
        formData.append('file', this.state.etudiant.cv);
        const options = {
            method: 'PUT',
            body: formData
        };
        fetch('http://localhost:8080/etudiants/saveCV/' + id, options);
        this.setState({hasUploadedCV: true});
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="d-flex flex-column">
            <div className="container">
                <h3>Votre profil</h3>
                <label>Nom complet : {this.state.etudiant.prenom}  {this.state.etudiant.nom}</label><br/>
                <label>Matricule : {this.state.etudiant.matricule} </label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Email : {this.state.etudiant.email}</label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Programme : {this.state.etudiant.programme}</label><br/>
                <label>Televerser votre CV : <input type="file" name="file"
                                                    className="form-control-file"
                                                    accept="application/pdf"
                                                    ref={this.inputRef}
                                                    defaultValue= {this.state.etudiant.cv}
                                                    onChange={this.onChangeHandler}/>

                </label><br/>
                {this.state.hasAlreadyCV ? <label>Rappel : vous avez déjà téléversé un CV</label>: null}<br/>
                {this.state.displayInvalidFileMessage ?
                    <label style={{color: "red"}}>Ce format de fichier n'est pas autorisé. Seuls les fichiers au format PDF sont autorisés.</label> : null}
                {this.state.displaySubmitCVButton ? <button type="submit" className="btn btn-primary">Enregistrer mon CV</button> : null}<br/>
                {this.state.hasUploadedCV? <label style={{color: "green"}}>Vous venez de téléverser votre CV</label>: null}<br/>
            </div>
            </form>

        );
    }
}