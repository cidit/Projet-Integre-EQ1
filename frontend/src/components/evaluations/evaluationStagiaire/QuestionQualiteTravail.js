import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function QuestionQualiteTravail(props) {
  const { qualiteTravailQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)

  const goToRelations = () => {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={"/questionRelations"} />
  }
    return (
        <CreateQuestions questions= {qualiteTravailQuestions}  field={"Qualité du travail"} continuer={goToRelations}/>
      )
}
