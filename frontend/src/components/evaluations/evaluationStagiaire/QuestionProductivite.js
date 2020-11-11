import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

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
