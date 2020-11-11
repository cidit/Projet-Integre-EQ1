import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import useSetQuestions from './useSetQuestions';
import StepsEvaluation from './StepsEvaluation'
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState, useRef } from "react";
import {
  RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
  TableHead, TableContainer, div, TableBody, Table, Button, Container, TableCell, CircularProgress, FormControl 
} from '@material-ui/core';

import CreateQuestions from './createQuestions'
import AlertDialog from '../utils/ModalMessage'
import EvaluationService from '../../service/EvaluationService'
import ModalMessage from '../../components/utils/ModalMessage';






const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));




function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}



export default function CreateEvaluation() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [isFinalStep, setIsFinalStep] = useState(false)
  const { productiviteQuestions, qualiteTravailQuestions, relationsQuestions, habilitesQuestions,
    optionsReponse, FormControl} = useSetQuestions();

    


  useEffect(() => {

    return () => {

    }
  }, [])


  const handleNext = () => {
    if (activeStep === 3) {
      setIsFinalStep(true)
    }
    if (activeStep < 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };


  switch (activeStep) {
    case 0:
      return (
        ShowQuestions(productiviteQuestions, optionsReponse, handleNext, "Productivité", isFinalStep)
      );
    case 1:
      return (
        ShowQuestions(qualiteTravailQuestions, optionsReponse, handleNext, "Qualité du travail", isFinalStep)
      );

    case 2:
      return (
        ShowQuestions(relationsQuestions, optionsReponse, handleNext, "Qualité des relations interpersonnelles", isFinalStep)
      );
    case 3:
      return (
        ShowQuestions(habilitesQuestions, optionsReponse, handleNext, "Habilités personnelles", isFinalStep)
      );

    default:
      (console.log('This is a multi-step form built with React.'))
  }
}


const choixReponses = ['Totalement en accord', 
                        'Plutôt en accord', 
                        'Plutôt en désaccord', 
                        'Totalement en désaccord', 
                        'Non Applicable']

function ShowQuestions(questions, _optionsReponse, handleNext, _section, isFinalStep) {
  const [evaluation, setEvaluation] = useState([])
  const [isCopletedQuestions, setIsCopletedQuestions] = useState(true)
  const [questionLength, setQuestionLength] = useState(questions.length)
  const [checkedInput, setCheckedInput] = useState([])
  const [isCheked, setIsCheked] = useState('')
  const [optionsReponse, setOptionsReponse] = useState(_optionsReponse)

  const radioGroup = useRef(null);


  useEffect(() => {
  console.log("render function")
    return () => {
     
    }
  }, [_optionsReponse])
  
  
  const handleChange = (e) => {
    //update response pour question
    for (var i = 0; i < evaluation.length; i++) {
      if (evaluation[i].id === e.target.id) {
        evaluation.splice(evaluation.id, 1)
      }
    }
    evaluation.push({
      //id: e.target.id,
      section: _section,
      question: questions[e.target.id].question,
      reponse: e.target.value
    });
  
    if (evaluation.length === questionLength) {
      setIsCopletedQuestions(false)
    }
   
  }
  


  const sendQuestionaire = () => {

    //var response = EvaluationService.putEvaluation(evaluation, 1)
    //console.log(response)
    //setOptionsReponse(ChoixResponses)
    handleNext();

    setEvaluation([])
    setIsCopletedQuestions(true)
    radioGroup.current.bis_skin_checked = 1;
    console.log(radioGroup.current)

    //radioGroup.current = radioGroup;
    
    setOptionsReponse([]);

  }

  useEffect(() => {
    return () => {
 
    }
  }, [])


  if (questions.length === 0) {
    return <CircularProgress disableShrink />
  } else {
    return (
      <div >
        {questions &&
          <TableContainer>
            <Table>

              <TableHead>
                <tr className='row border-bottom m-2 p-3 font-weight-bold' >
                  <th className='col' align="left">Quéstion</th>
                  {optionsReponse.map((choix, i) =>
                    <th key={i} align="center" className='col'>{choix}</th>
                  )}

                </tr>

              </TableHead>
              <tbody>
                {questions.map(data =>
                  <TableRow key={data.id}>
                    <TableCell>
                  
                      <RadioGroup
                        onChange={handleChange}
                        row={true}
                        component='td'
                        ref={radioGroup}

                      >
                        <div className='col' >
                          {data.question}
                        </div>

                        <div className='col' align="center" >
                          <FormControlLabel
                            value={optionsReponse[0]}
                            control={<Radio id={data.id} name={data.question}/>}
                          // label={ChoixResponses[0]}
                          />
                        </div>

                        <div className='col' align="center">
                          <FormControlLabel
                            value={optionsReponse[1]}
                            control={<Radio id={data.id} name={data.question} />}
                          // label={ChoixResponses[1]}
                          />
                        </div>

                        <div className='col' align="center">
                          <FormControlLabel
                            value={optionsReponse[2]}
                            control={<Radio id={data.id} name={data.question} />}
                          //label={ChoixResponses[2]}
                          />
                        </div>
                        <div className='col' align="center">
                          <FormControlLabel
                            value={optionsReponse[3]}
                            control={<Radio id={data.id} name={data.question} />}
                          //label={ChoixResponses[3]}
                          />
                        </div>
                        <div className='col' align="center">
                          <FormControlLabel
                            value={optionsReponse[4]}
                            control={<Radio id={data.id} name={data.question} />}
                          //label={ChoixResponses[4]}
                          />
                        </div>
                      </RadioGroup>
                  
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
            <p className="card-text m-2"><small className="text-danger ml-auto">* veuillez répondre à toutes les questions</small></p>


            {!isFinalStep &&
              <Button variant="contained" className=' m-2' color="primary" disabled={isCopletedQuestions}
                onClick={sendQuestionaire}>
                Continuer
              </Button>

            }
          </TableContainer >
        }

        {isFinalStep &&
          <ModalMessage
            message={"Votre évaluation a été soumise avec succès. Merci pour votre soutien!"}
            redirect="/"
            title="nouvelle évaluation" />
        }


      </div >
    )
  }
}
