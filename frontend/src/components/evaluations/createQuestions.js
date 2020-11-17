import {
    Button, FormControlLabel, Radio, RadioGroup,Paper,
    Table, TableCell, TableContainer, TableHead, TableRow, Checkbox, Link, InputAdornment, FormControl, FilledInput
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import ModalMessage from '../../components/utils/ModalMessage';
import EvaluationService from '../../service/EvaluationService'
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        overflowX: "initial"
      },
      sticky: {
        position: 'sticky' ,
        left: 0,
        top: 0,
      }
  

}));


const ChoixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord', 'Non Applicable']
const initialstate ={
    questions : [],
    commentaires : { ennonce : '',
                    section: ''}
}

export default function CreateQuestions(props) {
    const classes = useStyles();
    const [questions, setQuestions] = useState(props.questions)
    const [evaluation, setEvaluation] = useState([])
    const [isCopletedQuestions, setIsCopletedQuestions] = useState(true)
    const [questionLength, setQuestionLength] = useState(props.questions.length)
    const [commentValue, setCommentvalue] = useState('')
    const [isConditionsAccepted, setIsConditionsAccepted] = useState(true)
    const { params } = useRouteMatch();
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {

        return () => {
            setEvaluation([]);
            setQuestions([])
            setQuestionLength(0)
        }
    }, [])

    const continuer = (e) => {
        props.continuer();
    }

    const setCommentaire = (e) => {
        setCommentvalue(e.target.value)
    }


    const accepterConditions = () => {
        setIsConditionsAccepted(!isConditionsAccepted)
    }

    const handleChange = (e) => {

        //update response pour question
        for (var i = 0; i < evaluation.length; i++) {

            if (evaluation[i].question === e.target.name) {
                evaluation.splice(evaluation.id, 1)
            }
        }
        evaluation.push({
            // id: e.target.id,
            section: props.field,
            question: e.target.name,
            reponse: e.target.value,
        });

        if (evaluation.length === questionLength) {
            setIsCopletedQuestions(false)
        }

    }


    const sendQuestionaire = async () => {
       
       var result = ({ questions : evaluation,
                        commentaires : { ennonce : commentValue,
                        section: props.field}})

        if(!props.isMilieuStage){
            var response = await EvaluationService.putEvaluationStagiaire(result,params.id)
            setEvaluation([])
            setIsCopletedQuestions(true)
            console.log("send");
            continuer();
        }else{
            console.log("evaluation miluei stage")
           var response = await EvaluationService.putEvaluationMilieuStage(result,params.id)
            setEvaluation([])
            setIsCopletedQuestions(true)
            console.log("send");
            setIsSubmit(true)
        }
        
    }



    return (
        <Paper className={classes.root}>
            {questions &&
                <TableContainer >
                    <Table  stickyHeader aria-label="sticky table" >
                        <TableHead >
                            <tr className='row border-bottom m-2 p-3 font-weight-bold' >
                                <th className='col' align="left">Quéstion</th>
                                {ChoixResponses.map((choix, i) =>
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
                                            name={data.question}
                                        >
                                            <div className='col' >
                                                {data.question}
                                            </div>

                                            <div className='col' align="center" >
                                                <FormControlLabel
                                                    value={ChoixResponses[0]}
                                                    control={<Radio id={data.id} />}
                                                // label={ChoixResponses[0]}
                                                />
                                            </div>

                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[1]}
                                                    control={<Radio id={data.id} />}
                                                // label={ChoixResponses[1]}
                                                />
                                            </div>

                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[2]}
                                                    control={<Radio id={data.id} />}
                                                //label={ChoixResponses[2]}
                                                />
                                            </div>
                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[3]}
                                                    control={<Radio id={data.id} />}
                                                //label={ChoixResponses[3]}
                                                />
                                            </div>
                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[4]}
                                                    control={<Radio id={data.id} />}
                                                //label={ChoixResponses[4]}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            )}
                        </tbody>
                    </Table>

                    <FormControl fullWidth className={classes.margin} variant="outlined" className="mt-3">
                        <FilledInput
                            placeholder="Commentaires"
                            onChange={setCommentaire}
                        />
                    </FormControl>

                    <p className="card-text m-2"><small className="text-danger ml-auto">* veuillez répondre à toutes les questions</small></p>

                    {!props.isFinalStep && props.isAvantDerniere ?

                        <div>
                            <div >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={accepterConditions}
                                            name="checkedB"
                                            color="primary"
                                            disabled={isCopletedQuestions}
                                        />
                                    }
                                    label="accepter les"
                                />
                                
                                <Link href="#">
                                    Politiques et conditions
                                </Link>
                            </div>

                            <div >
                                <Button variant="contained" className=' m-2' color="primary" disabled={isConditionsAccepted}
                                    onClick={sendQuestionaire}>
                                    Terminer et envoyer
                                </Button>

                            </div>
                        </div>
                        :
                        <Button variant="contained" className=' m-2' color="primary" disabled={isCopletedQuestions}
                            onClick={sendQuestionaire}>
                            Continuer
                        </Button>
                    }
                </TableContainer >
            }
            {props.isFinalStep || isSubmit &&
                <ModalMessage
                    message={"Votre évaluation a été soumise avec succès. Merci pour votre soutien!"}
                    redirect="/"
                    title="nouvelle évaluation" />
            }

        </Paper >
    )

}