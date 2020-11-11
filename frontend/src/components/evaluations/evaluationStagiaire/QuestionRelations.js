import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function QuestionRelations() {
    const { relationsQuestions } = useSetQuestions();
    const [redirect, setRedirect] = useState(false)
  
   
  
    const goToHabilites = () => {
      setRedirect(true);
    }
  
    if (redirect) {
      return <Redirect to={"/questionsHabilites"} />
    }
      return (
          <CreateQuestions questions= {relationsQuestions}  fied={"Qualité des relations interpersonnelles"} continuer={goToHabilites} isAvantDerniere = {true}/>
        )
}
