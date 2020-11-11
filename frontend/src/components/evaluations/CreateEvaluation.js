import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import useSetQuestions from './useSetQuestions';
import React, { useEffect, useState, useRef } from "react";
import StepsEvaluation from './StepsEvaluation'
import Paper from '@material-ui/core/Paper';

import {
  RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
  TableHead, TableContainer, div, TableBody, Table, Button, Container, TableCell, CircularProgress, FormControl
} from '@material-ui/core';

import CreateQuestions from './createQuestions'
import AlertDialog from '../utils/ModalMessage'
import EvaluationService from '../../service/EvaluationService'
import ModalMessage from '../../components/utils/ModalMessage';
import QuestionProductivite from './evaluationStagiaire/QuestionProductivite'
import QuestionQualiteTravail from './evaluationStagiaire/QuestionQualiteTravail'






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



export default function CreateEvaluation() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  //  const steps = getSteps();
  const [isFinalStep, setIsFinalStep] = useState(false)
  const { productiviteQuestions, qualiteTravailQuestions, relationsQuestions, habilitesQuestions,
    optionsReponse, FormControl } = useSetQuestions();


  useEffect(() => {

    return () => {

    }
  }, [])


  const handleNext = () => {

    console.log("activeStep")
    console.log(activeStep)
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
        <QuestionProductivite productiviteQuestions ={productiviteQuestions}
        handleNext = {handleNext}  fied={"Productivité"}  isFinalStep={isFinalStep}
        />
      );
    case 1:
      return (
        <QuestionQualiteTravail qualiteTravailQuestions ={qualiteTravailQuestions}
        handleNext = {handleNext}  fied={"Productivité"}  isFinalStep={isFinalStep}
        />
       
      );

    case 2:
      return (
        relationQuestions(relationsQuestions, optionsReponse, handleNext, "Qualité des relations interpersonnelles", isFinalStep)
      );
    case 3:
      return (
        questionshabilites(habilitesQuestions, optionsReponse, handleNext, "Habilités personnelles", isFinalStep)
      );

    default:
      (console.log('This is a multi-step form built with React.'))
  }
}




function questionsProductivite(productiviteQuestions, optionsReponse, handleNext, champ, isFinalStep){
  const change =() =>{
    handleNext()
  }
  return (
    <CreateQuestions questions= {productiviteQuestions}  continuer={change}  fied={champ} isFinalStep={isFinalStep}/>
  )
}

function qualiteQuestions(qualiteTravailQuestions, optionsReponse, handleNext, champ, isFinalStep){
  const change =() =>{
    handleNext()
  }
  return (
    <CreateQuestions questions= {qualiteTravailQuestions}  continuer={change}  fied={champ} isFinalStep={isFinalStep}/>
  )
}

function relationQuestions(relationsQuestions, optionsReponse, handleNext, champ, isFinalStep){
  const change =() =>{
    handleNext()
  }
  return (
    <CreateQuestions questions= {relationsQuestions}  continuer={change}  fied={champ} isFinalStep={isFinalStep}/>
  )
}

function  questionshabilites(habilitesQuestions, optionsReponse, handleNext, champ, isFinalStep){

  const change =() =>{
    handleNext()
  }
  return (
    <CreateQuestions questions= {habilitesQuestions}  continuer={change} fied={champ} isFinalStep={isFinalStep}/>
  )
}