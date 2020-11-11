import useSetQuestions from '../useSetQuestions';
import React, { useEffect, useState, useRef } from "react";
import CreateQuestions from '../createQuestions';
import { Redirect } from 'react-router-dom'

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
          <CreateQuestions questions= {relationsQuestions}  fied={"Qualité des relations interpersonnelles"} continuer={goToHabilites}/>
        )
}
