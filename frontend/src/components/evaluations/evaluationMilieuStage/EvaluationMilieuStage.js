import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import { useRouteMatch } from "react-router-dom";

export default function EvaluationMilieuStage() {
const { evaluationMilieuStageQuestions } = useSetQuestions();
const [redirect, setRedirect] = useState(false)
const { params } = useRouteMatch();

const goToObservations = () => {
  setRedirect(true);
}
if (redirect) {
  return <Redirect to={`/observationsMilieuStage/${params.id}`} />
}
return (
    <CreateQuestions questions= {evaluationMilieuStageQuestions}  
                    field={"Evaluation milieu stage"} 
                    continuer={goToObservations}
                    isMilieuStage={true}
                    titre ="ÉVALUATION DU MILIEU DE STAGE"
                    />
  )
}
