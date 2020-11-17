import React from 'react';
import Telecharger from '../utils/telecharger'
import { Alert } from '@material-ui/lab';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import ContratService from "../../service/ContratService";

function isListeVideEmployeur(props){
  const map = props.contrats.filter(data => data.signatureEmployeur === 'PAS_SIGNE' &&
      data.signatureEtudiant === 'PAS_SIGNE')
  return map.length === 0;
}

function isListeVideEtudiant(props){
  const map = props.contrats.filter(data => data.signatureEmployeur === 'SIGNE' &&
      data.signatureEtudiant === 'PAS_SIGNE')
  return map.length === 0;
}

function approuveSignature (id, desc) {
  ContratService.accepteSignatureContrat(id, desc);
  setTimeout((function() {
    window.location.reload();
  }), 800);

}
function refuseSignature (id, desc) {
  ContratService.refuseSignatureContrat(id, desc);
  setTimeout((function() {
    window.location.reload();
  }), 800);
}
export function ListeContratsGestionnaire(props) {

  if (props.contrats.length === 0) {
    return (
        AlertAucunContrat(true)
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
                  </tr>
                  </thead>
                  <tbody>
                  {props.contrats
                      .map(
                      data =>
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.employeur.nom}</td>
                            <td>{data.candidature.etudiant.prenom} {data.candidature.etudiant.nom}</td>
                            <td>{data.candidature.etudiant.programme}</td>
                            <td>{data.dateGeneration}</td>
                            <Telecharger path={data.id} />
                            <td>
                              {data.signatureEmployeur === "EN_ATTENTE"?
                                  <div>
                                    <button className="btn btn-primary-outline" onClick={() => approuveSignature(data.id, "Employeur")}>
                                      <h3> <AiFillCheckCircle style={{color: "green"}}/> </h3>
                                    </button>
                                    <button className="btn btn-primary-outline" onClick={() => refuseSignature(data.id, "Employeur")}>
                                      <h3> <AiFillCloseCircle style={{color: "red"}}/> </h3>
                                    </button>
                                  </div> : data.signatureEmployeur}
                            </td>
                            <td>
                              {data.signatureEtudiant === "EN_ATTENTE"?
                                  <div>
                                    <button className="btn btn-primary-outline" onClick={() => approuveSignature(data.id, "Etudiant")}>
                                      <h3> <AiFillCheckCircle style={{color: "green"}}/> </h3>
                                    </button>
                                    <button className="btn btn-primary-outline" onClick={() => refuseSignature(data.id, "Etudiant")}>
                                      <h3> <AiFillCloseCircle style={{color: "red"}}/> </h3>
                                    </button>
                                  </div> : data.signatureEtudiant}
                            </td>
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
}





export function ListeContratsEmployeur(props) {
  console.log(props.contrats)
  if (isListeVideEmployeur(props)) {
    return (
        AlertAucunContrat(false)
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
                    <th> Etat </th>
                    <th> Télécharger contrat</th>


                  </tr>
                  </thead>
                  <tbody>
                  {props.contrats
                      .filter(data => data.signatureEmployeur === 'PAS_SIGNE' &&
                          data.signatureEtudiant === 'PAS_SIGNE')
                      .map(
                      data =>
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.employeur.nom}</td>
                            <td>{data.candidature.etudiant.prenom} {data.candidature.etudiant.nom}</td>
                            <td>{data.candidature.etudiant.programme}</td>
                            <td>{data.dateGeneration}</td>
                            <td>{data.signatureEmployeur}</td>
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
}

export function ListeContratsEtudiant(props) {
  console.log(props.contrats)
  if (isListeVideEtudiant(props)) {
    return (
        AlertAucunContrat(false)
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
                    <th> Etat </th>
                    <th> Télécharger contrat</th>


                  </tr>
                  </thead>
                  <tbody>
                  {props.contrats
                      .filter(data => data.signatureEmployeur === 'SIGNE' &&
                          data.signatureEtudiant === 'PAS_SIGNE')
                      .map(
                          data =>
                              <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.employeur.nom}</td>
                                <td>{data.candidature.etudiant.prenom} {data.candidature.etudiant.nom}</td>
                                <td>{data.candidature.etudiant.programme}</td>
                                <td>{data.dateGeneration}</td>
                                <td>{data.signatureEtudiant}</td>
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
}
function AlertAucunContrat(isGestionnaire) {
  return <div className="container">
    <div className="row justify-content-md-center">
      <div className="col">
        {isGestionnaire ?<Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à approuver pour le moment</Alert>
            : <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à signer pour le moment</Alert>
        }
      </div>
    </div>
  </div>;
}
