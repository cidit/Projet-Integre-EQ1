import React, { useState, useEffect } from "react";
import Telecharger from '../utils/telecharger'
import { Alert } from '@material-ui/lab';


const url = 'http://localhost:8080/contrats/getContatFile/';

function ListeContrats(props) {



  console.log(props.contrat);

  return (

   

    <div className="container-fluid">
      <div className="col">
        <div className="pt-3 mt-3">

        {props.contrat.length > 0 &&
          <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Contrats</h5> 
          }
          <div className="row">

          
          {props.contrat.length > 0  ?
 

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
             {props.contrat.map(
                  data =>
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.employeur.nom}</td>
                      <td>{data.candidature.etudiant.nom}</td>
                      <td>{data.candidature.etudiant.programme}</td>
                      {data.signatureEmployeur ?
                        <td style={{color:"green"}} >Signé</td>
                        :
                        <td style={{color:"red"}}>Pas Signé</td>
                      }
                       {data.signatureEtudiant ?
                        <td style={{color:"green"}} >Signé</td>
                        :
                        <td style={{color:"red"}}>Pas Signé</td>
                      }
                      {data.signatureAdmin ?
                        <td style={{color:"green"}} >Signé</td>
                        :
                        <td style={{color:"red"}}>Pas Signé</td>
                      }
                     
                      <td>{data.dateGeneration}</td>
                      <Telecharger path={data.id} />
                    </tr>
                )}  
              </tbody>
            </table>

            :
            <Alert severity="info" variant="filled">Vous n'avez aucun contrat à signer pour le moment</Alert>
            
            }

          </div>
        </div>
      </div>
    </div>

  )
};
export default ListeContrats; 