import React, { useState } from "react";
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function EvaluationMilieuStage() {
const { evaluationMilieuStageQuestions } = useSetQuestions();

return (
    <CreateQuestions questions= {evaluationMilieuStageQuestions}  field={"Evaluation"} isAvantDerniere = {true} isMilieuStage={true}/>
  )
}
