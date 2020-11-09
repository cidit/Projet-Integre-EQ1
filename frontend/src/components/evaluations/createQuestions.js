import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import {
    RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
    TableHead, TableContainer, TableCell, TableBody, Table, Button, Container
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



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
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));



const ChoixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord', 'N/A']

const initialInputs = [
    { id: "0", question: 'planifier et organiser son travail de façon efficace' },
    { id: "1", question: 'comprendre rapidement les directives relatives à son travail' },
    { id: "2", question: 'maintenir un rythme de travail soutenu' },
    { id: "3", question: 'établir ses priorités' },
    { id: "4", question: 'respecter ses échéanciers' },
];

export default function CreateQuestions() {
    const classes = useStyles();
    const [questions, setInputs] = useState(initialInputs)
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


    if (questions.length === 0) {
        return <p>Loading....</p>
    } else {
        return (
            <div >
                {questions &&
                    <div className="container-fluid">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableCell></TableCell>
                                            {ChoixResponses.map((choix, i) =>
                                                <TableCell key={i} component="th"  >{choix}</TableCell>
                                            )}
                                        </TableCell>



                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell><strong>Le stagiaire a été en mesure de :</strong></TableCell>
                                    </TableRow>

                                 
                                    


                                    <TableRow>
                                        {questions.map(data => (
                                            <>




                                                <RadioGroup
                                                    //className={classes.group}
                                                    onChange={handleChange}
                                                    row={true}
                                                    key={data.id}
                                                >
                                                    <TableCell className='col'  >
                                                        {data.question}
                                                    </TableCell>

                                                    <TableCell className='col'>
                                                        <FormControlLabel
                                                            value={ChoixResponses[0]}
                                                            control={<Radio id={data.id} />}
                                                            label={ChoixResponses[0]}
                                                        />
                                                    </TableCell>

                                                    <TableCell className='col'>
                                                        <FormControlLabel
                                                            value={ChoixResponses[1]}
                                                            control={<Radio id={data.id} />}
                                                            label={ChoixResponses[1]}
                                                        />
                                                    </TableCell>

                                                    <TableCell className='col'>
                                                        <FormControlLabel
                                                            value={ChoixResponses[2]}
                                                            control={<Radio id={data.id} />}
                                                            label={ChoixResponses[2]}
                                                        />
                                                    </TableCell>
                                                    <TableCell className='col'>
                                                        <FormControlLabel
                                                            value={ChoixResponses[3]}
                                                            control={<Radio id={data.id} />}
                                                            label={ChoixResponses[3]}
                                                        />
                                                    </TableCell>
                                                    <TableCell className='col'>
                                                        <FormControlLabel
                                                            value={ChoixResponses[4]}
                                                            control={<Radio id={data.id} />}
                                                            label={ChoixResponses[4]}
                                                        />
                                                    </TableCell>


                                                </RadioGroup>
                                            </>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button variant="contained" color="primary" disabled={isCopletedQuestions} className='mt-3'>
                            Continuer
                        </Button>




                    </div>


                }
            </div >
        )
    }
}
