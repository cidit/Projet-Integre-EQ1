import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Stage from '../../model/Stage';

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], selections: [], checkedItems: new Map(), };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        var stage = new Stage();
        stage = await StageService.getStageById(this.props.match.params.id);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        this.setState({ etudiants });

        console.log(stage.data.etudiantsAdmits);
        
        var arr = this.state.selections;

        if (stage.data.etudiantsAdmits.length === 0) {
            console.log("EMPTY!");
        } else {
            console.log("FILLING!");
            stage.data.etudiantsAdmits.forEach(etudiant => {
                arr.push(etudiant);
            });
            this.setState({ selections: arr });
        }
    }
    
    handleChange(etudiant, event) {
        var isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(etudiant, isChecked) }));
    }

    handleSubmit() {
        var mp = this.state.checkedItems;
        var arr = this.state.selections;
        mp.forEach((value, key)=>{ 
            if (value) {
                console.log(value + ":" + key)
                arr.push(key);
            }
            else{
                console.log(value + ":" + key)
                arr.pop(key);
            }
        }) 
        this.setState({ selections: arr })
        console.log(this.state.selections)
        StageService.addEtudiants(this.props.match.params.id, this.state.selections)
    }

    addAllEtudiants(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiants);
        this.props.history.push('/gestionnaireStage');
    }

    render() {
        return (

            <div className="container">

                <div>
                    <div> 
                        <button onClick={this.addAllEtudiants}>SÉLECTIONNER TOUT</button>
                        <button onClick={this.handleSubmit}>Sauvegarder</button>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> </th>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={etudiant.id}
                                                onClick={(e) => this.handleChange(etudiant, e)}
                                            />   
                                        </td>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}