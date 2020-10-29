import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'
import IsLoading from '../utils/IsLoading'
import useListeContrats from "./useListeContrats";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';



const url = 'http://localhost:8080/contrats/getContatFile/';

function ListeContrats(props) {
  //const [contrats, setContrat] = useState([]);
  //const [isLoading, setIsloading] = useState(true);

  /*const doFetch = async () => {
    ContratService.getContrats().then((res) => setContrat(res.data));
    setIsloading(false);
  }*/

  /*useEffect(() => {
    doFetch();
    return () => {
    }
  }, [contrats])*/


console.log(props.contrat)

 

  // if (isLoading) {
  //   return <IsLoading />
  // }

  console.log("desde lista")
  console.log(props.contrats)


  return (

    <div className="container">
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
                  <th>Signature de l'employeur</th>
                  
                  <th> Signature de l'étudiant(e)</th>
                  <th> Signature de l'Cégep</th>
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
                      <td>{data.etudiant.nom}</td>
                      <td>{data.etudiant.programme}</td>
                      {data.signatureEmployeur ?
                        <td>Signé</td>
                        :
                        <td>Pas Signé</td>
                      }
                       {data.signatureEtudiant ?
                        <td>Signé</td>
                        :
                        <td>Pas Signé</td>
                      }
                      {data.signatureAdmin ?
                        <td>Signé</td>
                        :
                        <td>Pas Signé</td>
                      }
                     
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




};
export default ListeContrats; 