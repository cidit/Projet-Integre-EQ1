import useSetQuestions from '../useSetQuestions';
import React, { useEffect, useState, useRef } from "react";
import CreateQuestions from '../createQuestions';
import { Redirect } from 'react-router-dom'
import QuestionQualiteTravail from './QuestionQualiteTravail'

export default function QuestionProductivite(props) {
  const { productiviteQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)

  console.log(productiviteQuestions)

  const goToQualiteTravail = () => {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={"/questionQualiteTravail"} />
  }
  return (
    <CreateQuestions questions={productiviteQuestions} fied={"Productivité"} continuer={goToQualiteTravail} />
  )
}
