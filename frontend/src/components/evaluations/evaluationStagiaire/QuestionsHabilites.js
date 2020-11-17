import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import ModalMessage from '../../utils/ModalMessage'
export default function QuestionsHabilites() {
    const { habilitesQuestions } = useSetQuestions();
    const [redirect, setRedirect] = useState(false)

    const finish = () => {
      setRedirect(true);
    }


   /*if (redirect) {
     return <ModalMessage
      message={"Votre évaluation a été soumise avec succès. Merci pour votre soutien!"}
      redirect="/"
      title="nouvelle évaluation" />
    }*/

      return (
          <CreateQuestions questions= {habilitesQuestions}  
          field={"Habilités personnelles"} 
          isFinalStep={true}
          titre ={"4. HABILETÉS PERSONNELLES"} 
          sousTitre={"Capacité de faire preuve d’attitudes ou de comportements matures et responsables"}
         // continuer={finish} 
          />
        )
}
