import React, { Component } from 'react';
import EtudiantService from '../service/EtudiantService';

export default class ListEtudiantsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', statut: '', };
    }

    approuverCV(){

    }
    handleChangeText = event => {
        this.setState({ filter: event.target.value });
    };

    handleChangeRadio = event => {
        console.log(event.target.value)
        this.setState({ statut: event.target.value });
    };
    
    async componentDidMount() {
            const { data: etudiants } = await EtudiantService.getEtudiants();
            this.setState({ etudiants });
    }

    render() {

        return (
            <div>
                <h1 className="text-center">Liste des étudiants</h1>

                <div className="form-group">
                    <div className="row">
                        <h4 className="text-center">FILTRAGE MATRICULE</h4>
                    </div>
                    <div className="row"> 
                        <input type='text' value={this.state.filter} onChange={this.handleChangeText} />
                    </div>
                    <div className="row">
                        <h4 className="text-center">STATUT DE STAGE</h4>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="aucun stage" 
                                onChange={this.handleChangeRadio}/> N'a aucun stage</label>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="possede stage" 
                                onChange={this.handleChangeRadio}/> Possède un stage</label>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="" 
                                onChange={this.handleChangeRadio}/> Tous les étudiants</label>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                                <th> Télécharger son CV</th>
                                <th> Etat du CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .filter(etudiant => etudiant.matricule.includes(this.state.filter) && 
                                        etudiant.statutStage.includes(this.state.statut))
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                        <td>
                                            <a href="" download="cv">
                                            <img src={require('../images/PDF_file_icon.svg')} alt="PDFImage" width={150} height={30}/>
                                            </a>
                                        </td>
                                        <td>Approuvé</td>

                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}