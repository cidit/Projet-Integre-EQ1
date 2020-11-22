import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import { useRouteMatch } from "react-router-dom";

export default function QuestionProductivite(props) {
  const { productiviteQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)
  const { params } = useRouteMatch();

  const goToQualiteTravail = () => {
    setRedirect(true);
  }
  console.log(params.id)

  if (redirect) {
    return <Redirect to={`/questionQualiteTravail/${params.id}`} />
  }
  return (
    <CreateQuestions questions={productiviteQuestions} field={"Productivité"} continuer={goToQualiteTravail} 
    titre ={"1. PRODUCTIVITÉ"} sousTitre={"Capacité d’optimiser son rendement au travail"}/>
  )
}
