import React, { useState } from "react";
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function QuestionsHabilites() {
    const { habilitesQuestions } = useSetQuestions();

      return (
          <CreateQuestions questions= {habilitesQuestions}  fied={"Habilités personnelles"} isFinalStep={true}/>
        )
}
