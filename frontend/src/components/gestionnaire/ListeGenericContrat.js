import React from 'react';

export default function ListeGenericContrat(props) {

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th> Stage </th>
                    <th> Employeur </th>
                    <th> Courriel employeur </th>
                    <th> Signature Employeur </th>
                    <th> Etudiant </th>
                    <th> Courriel etudiant </th>
                    <th> Signature Etudiant </th>
                </tr>
                </thead>
                <tbody>
                {props.contrats
                    .map(
                        contrat =>
                        <tr key={contrat.id}>
                            <td>{contrat.candidature.stage.titre}</td>
                            <td>{contrat.employeur.nom}</td>
                            <td>{contrat.employeur.email}</td>
                            <td>{contrat.signatureEmployeur}</td>
                            <td>{contrat.candidature.etudiant.prenom} {contrat.candidature.etudiant.nom}</td>
                            <td>{contrat.candidature.etudiant.email}</td>
                            <td>{contrat.signatureEtudiant}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}