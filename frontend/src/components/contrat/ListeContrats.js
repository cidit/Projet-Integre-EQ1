import React from 'react';
import Telecharger from '../utils/telecharger'
import { Alert } from '@material-ui/lab';


const url = 'http://localhost:8080/contrats/getContratFile/';



function ListeContratsGestionnaire(props) {

  if (props.contrat.length === 0) {
    return (
        AlertAucunContrat()
    )
  } else {
    return (
        <div className="container-fluid">
          <div className="col">
            <div className="pt-3 mt-3">
              <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Contrats</h5>
              <div className="row">
                <table className="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th> Numéro de contrat</th>
                    <th> Employeur </th>
                    <th> Étudiant(e) </th>
                    <th> Programme </th>
                    <th> Date de creation</th>
                    <th> Télécharger contrat</th>
                    <th> Signature de l'employeur</th>
                    <th> Signature de l'étudiant(e)</th>
                    <th> Signature du Cégep</th>

                  </tr>
                  </thead>
                  <tbody>
                  {props.contrat.map(
                      data =>
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.employeur.nom}</td>
                            <td>{data.candidature.etudiant.nom}</td>
                            <td>{data.candidature.etudiant.programme}</td>
                            <td>{data.dateGeneration}</td>
                            <Telecharger path={data.id} />
                            <td>
                              <select value={data.signatureEmployeur}>
                                <option value={"SIGNE"}>Signé</option>
                                <option value={"PAS_SIGNE"}>Pas signé</option>
                                <option value={"EN_ATTENTE"}>En attente</option>
                              </select>
                            </td>
                            <td></td>
                          </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
  }
};





export function ListeContratsEmployeur(props) {
  console.log(props.contrats)
  if (props.contrats.length === 0) {
    return (
        AlertAucunContrat()
    )
  } else {
    return (
        <div className="container-fluid">
          <div className="col">
            <div className="pt-3 mt-3">
              <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Contrats</h5>
              <div className="row">
                <table className="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th> Numéro de contrat</th>
                    <th> Employeur </th>
                    <th> Étudiant(e) </th>
                    <th> Programme </th>
                    <th> Date de creation</th>
                    <th> Télécharger contrat</th>


                  </tr>
                  </thead>
                  <tbody>
                  {props.contrats.map(
                      data =>
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.employeur.nom}</td>
                            <td>{data.candidature.etudiant.nom}</td>
                            <td>{data.candidature.etudiant.programme}</td>
                            <td>{data.dateGeneration}</td>
                            <Telecharger path={data.id} />
                          </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
  }
};
function AlertAucunContrat() {
  return <div className="container">
    <div className="row justify-content-md-center">
      <div className="col">
        <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à signer pour le moment</Alert>
      </div>
    </div>
  </div>;
}
