import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from 'react-router-dom';
import CandidatureService from "../../../service/CandidatureService";
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function EvaluationMilieuStage() {
  const { evaluationMilieuStageQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)
  const { params } = useRouteMatch();
  const [nomEmployeur, setNomEmployeur] = useState('')
  const [nomEtudiant, setNomEtudiant] = useState('')
  const [prenomEtudiant, setprenomEtudiant] = useState('')


  const getCandidature = async () => {
    const response = await CandidatureService.getById(params.id);
    setNomEmployeur(response.stage.employeur.nom);
    setNomEtudiant(response.etudiant.nom)
    setprenomEtudiant(response.etudiant.prenom)
  }

  useEffect(() => {
    getCandidature();
  })


  if (redirect) {
    return <Redirect to={`/observationsMilieuStage/${params.id}`} />
  }
  return (

    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2 border-right '>

          <div className="card mt-5 sticky-top">
            <div className="card-body">
              <h5 className="card-title">Employeur</h5>
              <p className="card-text">{nomEmployeur}</p>
              <h5 className="card-title">Étudiant</h5>
              <p className="card-text">{nomEtudiant} {prenomEtudiant}</p>
            </div>
          </div>
        </div>
        <div className='col-sm-8'>
          <CreateQuestions questions={evaluationMilieuStageQuestions}
            field={"Evaluation milieu stage"}
            isFinalStep={true}
            isMilieuStage={true}
            titre="ÉVALUATION DU MILIEU DE STAGE"
            redirect ="/evaluationMilieuHome"
          />
        </div>

      </div>



    </div>

  )
}
