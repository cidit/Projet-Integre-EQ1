import useSetQuestions from '../useSetQuestions';
import React, { useEffect, useState, useRef } from "react";
import CreateQuestions from '../createQuestions';
import { Redirect } from 'react-router-dom'

export default function QuestionsHabilites() {
    const { habilitesQuestions } = useSetQuestions();
    const [redirect, setRedirect] = useState(false)
  

  
    const goToHabilites = () => {
      setRedirect(true);
    }
  
    
      return (
          <CreateQuestions questions= {habilitesQuestions}  fied={"Habilités personnelles"} isFinalStep={true}/>
        )
}
