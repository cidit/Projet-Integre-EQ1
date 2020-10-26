import React, {Component} from "react";
import Stage from "../../model/Stage";
import StageService from "../../service/StageService";
import EtudiantService from "../../service/EtudiantService";
import Etudiant from "../../model/Etudiant";
import CandidatureService from "../../service/CandidatureService";

export default class SelectionnerStagiaireComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { candidatures: [] };
        this.handleClick = this.handleClick.bind(this);

    }

    async componentDidMount() {
        const { data: candidatures } = await CandidatureService.getByStage(this.props.match.params.id);
        this.setState({ candidatures });

    }

    handleClick(candidature){

    }

    render() {

        return (
            <div>
                <div className="pt-3 mt-3">
                    <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Liste des candidats</h5>

                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th> Prenom </th>
                                <th> Nom </th>
                                <th> Programme </th>
                                <th> Date application </th>
                                <th> Telephone </th>
                                <th> Email </th>
                                <th> Adresse </th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.candidatures
                                .map(
                                    candidature =>
                                        <tr key={candidature.id}>
                                            <td>{candidature.etudiant.prenom}</td>
                                            <td>{candidature.etudiant.nom}</td>
                                            <td>{candidature.etudiant.programme}</td>
                                            <td></td>
                                            <td>{candidature.etudiant.telephone}</td>
                                            <td>{candidature.etudiant.email}</td>
                                            <td>{candidature.etudiant.adresse}</td>

                                            <td>
                                                <button className="btn btn-primary" onClick={() => this.handleClick(candidature)}>
                                                    Accepter
                                                </button>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}