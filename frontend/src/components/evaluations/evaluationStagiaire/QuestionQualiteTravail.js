import useSetQuestions from '../useSetQuestions';
import React, { useEffect, useState, useRef } from "react";
import CreateQuestions from '../createQuestions';
import { Redirect } from 'react-router-dom'

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
        <CreateQuestions questions= {qualiteTravailQuestions}  fied={"Qualité du travail"} continuer={goToRelations}/>
      )
}
