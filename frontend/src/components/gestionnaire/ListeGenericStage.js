import React from 'react';

export default function ListeGenericStage(props) {

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th> Titre </th>
                    <th> Programme </th>
                    <th> Date Début </th>
                    <th> Date Finale </th>
                    <th> Ville </th>
                    <th> Nombre disponible </th>
                    <th> Date Limite </th>
                    <th> Employeur </th>
                </tr>
                </thead>
                <tbody>
                {props.stages
                    .map(
                        stage =>
                        <tr key={stage.id}>
                            <td>{stage.titre}</td>
                            <td>{stage.programme}</td>
                            <td>{stage.dateDebut}</td>
                            <td>{stage.dateFin}</td>
                            <td>{stage.ville}</td>
                            <td>{stage.nbAdmis}</td>
                            <td>{stage.dateLimiteCandidature}</td>
                            <td>{stage.employeur.nom}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}