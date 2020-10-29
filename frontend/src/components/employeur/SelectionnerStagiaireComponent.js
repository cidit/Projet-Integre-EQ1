import React, {Component} from "react";
import CandidatureService from "../../service/CandidatureService";
import axios from "axios";
import CVService from "../../service/CVService";

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
        CandidatureService.putCandidatureApprouve(candidature.id);
        this.setState({});
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }

    downloadCV (etudiant) {
        CVService.getCVByEtudiant(etudiant).then((data) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "CV_" + etudiant.prenom + "_" + etudiant.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
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
                                <th> Telecharger CV</th>
                                <th> Telephone </th>
                                <th> Email </th>
                                <th> Adresse </th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.candidatures
                                .filter(candidature => candidature.statut == "EN_ATTENTE")
                                .map(
                                    candidature =>
                                        <tr key={candidature.id}>
                                            <td>{candidature.etudiant.prenom}</td>
                                            <td>{candidature.etudiant.nom}</td>
                                            <td>{candidature.etudiant.programme}</td>
                                            <td><button onClick={() => this.downloadCV(candidature.etudiant)} className="btn btn-primary">Telecharger</button></td>
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