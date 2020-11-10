import React from 'react'
import useSetQuestions from './useSetQuestions'
import CreateQuestions from './createQuestions'

export default function StepsEvaluation(props) {
  

    const {etudiant, productiviteQuestions,  qualiteTravailQuestions,  relationsQuestions, habilitesQuestions,
        optionsReponse} = useSetQuestions();
        console.log(props)
        switch (props.step) {
            case 0:
              return <CreateQuestions questions={productiviteQuestions} label={"Productivite"}/>;
            case 1:
              return <CreateQuestions questions={qualiteTravailQuestions} label={"Qualité du travail"}/>;
            case 2:
              return 'This is the bit I really care about!';
            default:
              return 'Unknown stepIndex';
          }
}

