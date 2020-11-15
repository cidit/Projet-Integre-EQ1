import React, {Component} from 'react';
import './../App.css';
import axios from "axios";
import CVService from "../service/CVService";
import SessionService from "../service/SessionService";
import EtudiantService from "../service/EtudiantService";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            etudiant: {},
            file: "",
            displayInvalidFileMessage: false,
            displayNoSessionMessage: false,
            displaySubmitCVButton: false,
            CVInfoMessage: "",
            hasUploadedCV: false,
            id: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        if (this.checkMimeType(event)) {
            this.setState({
                file: event.target.files[0]
            });

        }
        this.setState({hasUploadedCV: false});
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");

        const {data: etudiant} = await axios.get(
            "http://localhost:8080/etudiants/get?idEtudiant=" + id
        );

        const {data: isRegistered} = await EtudiantService.isRegistered(etudiant.id)

        this.setState({
            etudiant: etudiant,
            hasAlreadyCV: this.state.etudiant.cv !== undefined,
            isRegistered: isRegistered
        });
    }

    displayCVMessage() {
        if (this.state.etudiant.cv != undefined) {
            switch (this.state.etudiant.cv.status) {
                case "APPROVED":
                    return <label> Votre CV a déjà été approuvé. Mais vous pouvez le mettre à jour.</label>
                case "DENIED" :
                    return <label> Votre CV a été refusé. Veuillez en soumettre un autre pour postuler à une offre de
                        stage.</label>
                case "UNREVIEWED" :
                    return <label> Votre CV a est en cours d'évaluation.</label>
                default :
                    break;
            }
        } else {
            return <label> Vous n'avez pas de CV, veuillez en soumettre afin de postuler à une offre de stage.</label>
        }
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
            } 
            else if(!this.state.isRegistered){
                err += files[x].type + ' you must register to current session\n'
                this.setState({displayNoSessionMessage: true});
                this.setState({displaySubmitCVButton: false});
            }
            else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }
        }

        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }

    handleSubmit(event) {
        event.preventDefault()
        var idEtudiant;
        if (localStorage.getItem("desc") === "Etudiant")
            idEtudiant = localStorage.getItem("id");
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('name', this.state.file.name);
        this.setState({hasUploadedCV: true});
        CVService.createCV(idEtudiant, formData)
    }

    register = event => {
        EtudiantService.register(this.state.etudiant.id)
        this.setState({isRegistered: true})
    }

    render() {
        return (
            <div className="container">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Votre profil</h5>
                        <form onSubmit={this.handleSubmit} className="d-flex flex-column">
                            <div className="container">
                                <label>Nom complet : {this.state.etudiant.prenom} {this.state.etudiant.nom}</label><br/>
                                <label>Matricule : {this.state.etudiant.matricule} </label><br/>
                                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                                <label>Email : {this.state.etudiant.email}</label><br/>
                                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                                <label>Programme : {this.state.etudiant.programme}</label><br/>
                                <label>Televerser votre CV : <input type="file" name="file"
                                                                    className="form-control-file"
                                                                    accept="application/pdf"
                                                                    ref={this.inputRef}
                                                                    defaultValue={this.state.file}
                                                                    onChange={this.onChangeHandler}/>

                                </label>
                                <br/>
                                {this.displayCVMessage()}
                                <br/>
                                {this.state.displayInvalidFileMessage ?
                                    <label style={{color: "red"}}>Ce format de fichier n'est pas autorisé. Seuls les fichiers au
                                        format PDF sont autorisés.</label> : null}
                                {this.state.displayNoSessionMessage ?
                                    <label style={{color: "red"}}>Vous devez vous enregistrer à la session.</label> : null}
                                {this.state.displaySubmitCVButton ?
                                    <button type="submit" className="btn btn-primary">Enregistrer mon CV</button> : null}<br/>
                                {this.state.hasUploadedCV ?
                                    <label style={{color: "green"}}>Vous venez de téléverser votre CV. Il doit cependant être
                                        approuvé pour que vous puissiez appliquer aux offres de stage.</label> : null}
                                <br/>

                                {this.state.isRegistered ?
                                    <p style={{color: "green"}}>*Vous etes enregistré pour cette session.</p> :
                                    <p style={{color: "red"}}>*Vous n'etes pas encore enregistré pour cette session.</p>}
                            </div>
                        </form>
                        {this.state.isRegistered ? "" : <button onClick={this.register}>Confirmer ma présence pour la session.</button>}
                    </div>
                </div>
            </div>
        );
    }
}