import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import {
    RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
    TableHead, TableContainer, div, TableBody, Table, Button, Container, TableCell, CircularProgress
} from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {

    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
   
}));



const ChoixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord', 'Non Applicable']

const initialInputs = [
    { id: "0", question: 'planifier et organiser son travail de façon efficace' },
    { id: "1", question: 'comprendre rapidement les directives relatives à son travail' },
    { id: "2", question: 'maintenir un rythme de travail soutenu' },
    { id: "3", question: 'établir ses priorités' },
    { id: "4", question: 'respecter ses échéanciers' },
];

export default function CreateQuestions(props) {
    const classes = useStyles();
    const [questions, setInputs] = useState(props.questions)
    const [evaluation, setEvaluation] = useState([])
    const [isCopletedQuestions, setIsCopletedQuestions] = useState(true)


    useEffect(() => {
        return () => {
            setEvaluation([]);
        }
    }, [])


    const handleChange = (e) => {
        //update response pour question
        for (var i = 0; i < evaluation.length; i++) {

            if (evaluation[i].id === e.target.id) {
                evaluation.splice(evaluation.id, 1)
            }
        }
        evaluation.push({
            id: e.target.id,
            question: questions[e.target.id].question,
            response: e.target.value
        });

        if (evaluation.length === questions.length) {
            setIsCopletedQuestions(false)
        }

    }

    const sendQuestionaire = () => {
        console.log("send");
        console.log(evaluation);
    }


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
                        <p className="card-text m-2"><small className="text-danger ml-auto">* veuillez répondre à toutes les questions</small></p>

                        <Button variant="contained" className=' m-2'color="primary" disabled={isCopletedQuestions}
                            onClick={sendQuestionaire}>
                            Continuer
                            </Button>
                    </TableContainer >
                
                }


            </div >
        )
    }
}