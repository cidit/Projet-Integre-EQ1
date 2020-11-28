import React from 'react';

export default function ListeGenericEtudiant(props) {

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th> Matricule </th>
                    <th> Nom </th>
                    <th> Prénom </th>
                    <th> Programme </th>
                    <th> Courriel </th>
                    <th> Téléphone </th>
                </tr>
                </thead>
                <tbody>
                {props.etudiants
                    .map(
                        etudiant =>
                        <tr key={etudiant.id}>
                            <td>{etudiant.matricule}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.prenom}</td>
                            <td>{etudiant.programme}</td>
                            <td>{etudiant.email}</td>
                            <td>{etudiant.telephone}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}