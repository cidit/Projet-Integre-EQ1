import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import { useRouteMatch } from "react-router-dom";

export default function QuestionQualiteTravail(props) {
  const { qualiteTravailQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)
  const { params } = useRouteMatch();

  const goToRelations = () => {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={`/questionRelations/${params.id}`} />
  }
    return (
        <CreateQuestions questions= {qualiteTravailQuestions}  
        field={"Qualité du travail"} 
        continuer={goToRelations} 
        titre ={"2. QUALITÉ DU TRAVAIL"} 
        sousTitre={"Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant personnellement des normes de qualité"}/>
      )
}
