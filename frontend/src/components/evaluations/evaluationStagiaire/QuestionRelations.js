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
          <CreateQuestions questions= {relationsQuestions}  
          field={"Qualité des relations interpersonnelles"} 
          continuer={goToHabilites} 
          titre ={"3. QUALITÉS DES RELATIONS INTERPERSONNELLES"} 
          sousTitre={"Capacité d’établir des interrelations harmonieuses dans son milieu de travail"}/>
        )
}
