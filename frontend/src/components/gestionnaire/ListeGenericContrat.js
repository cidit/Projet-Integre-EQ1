import React from 'react';

export default function ListeGenericContrat(props) {

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th> Etudiant </th>
                    <th> Signature Etudiant </th>
                    <th> Employeur </th>
                    <th> Signature Employeur </th>
                </tr>
                </thead>
                <tbody>
                {props.contrats
                    .map(
                        contrat =>
                        <tr key={contrat.id}>
                            <td>{contrat.candidature.etudiant.prenom} {contrat.candidature.etudiant.nom}</td>
                            <td>{contrat.signatureEtudiant}</td>
                            <td>{contrat.employeur.nom}</td>
                            <td>{contrat.signatureEmployeur}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}