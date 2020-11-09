import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import {
    RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
    TableHead, TableContainer, TableCell, TableBody, Table
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
const valueInput = [
    { value: 'Totalement en accord', checked: false, row: '', column: '' },
    { value: 'Plutôt en accord', checked: false, row: '', column: '' },
    { value: 'Plutôt en désaccord', checked: false, row: '', column: '' },
    { value: 'Totalement en désaccord', checked: false, row: '', column: '' },
    { value: 'N/A', checked: false, row: '', column: '' }];

const initialInputs = [
    { id: "0", question: 'planifier et organiser son travail de façon efficace', response: "true" },
    { id: "1", question: 'comprendre rapidement les directives relatives à son travail', response: "true" },
    { id: "2", question: 'maintenir un rythme de travail soutenu', response: "true" },
    { id: "3", question: 'établir ses priorités', response: "true" },
    { id: "4", question: 'respecter ses échéanciers', response: "true" },
];



export default function CreateQuestions() {
    const classes = useStyles();
    const [inputs, setInputs] = useState(initialInputs)
    const [questions, setQuestions] = useState([])
    const [selectedInputValue, setcheckOptionValue] = useState('')
    const [checkedId, setCheckedId] = useState(0);
    const [row, setrow] = useState('')
    const [initialRadios, setInitialRadios] = useState(valueInput)



    const change = () => {
        //setquestions(initialState)
    }


    useEffect(() => {
        change();
        return () => {

        }
    }, [])

    const setResponse = (e) => {

        setrow(e.target.column)

    }


    const handleChange = (e) => {
        setCheckedId(e.target.id)
        setcheckOptionValue(e.target.value)
        //setInitialRadios(...initialRadios, {value: e.target.value, checked : false, row :'', column:''})
        //setQuestions(questions.push(inputs[e.target.id]))
        //questions.push(inputs[e.target.id])
        //setSelectedValue({ ...selectedValue, value: e.target.value, checked: true })
    }

    console.log(initialRadios)

    if (inputs.length === 0) {
        return <p>Loading....</p>
    } else {
        return (
            <div >
                {inputs &&
                    <div className="container-fluid">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Le stagiaire a été en mesure de :</strong></TableCell>
                                        {ChoixResponses.map((choix, i) =>
                                            <TableCell key={i} align="right">{choix}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <div >
                                        {inputs.map(data => (
                                            <div key={data.id} className='col' >
                                                <TableCell component="th" scope="row">
                                                    {data.question}
                                                </TableCell>
                                            </div>



                                        ))}
                                       
                                    </div>


                                </TableBody>
                            </Table>
                        </TableContainer>


                    </div>


                }


                <p>{inputs.question_1}</p>
                <p>{inputs.response_1}</p>
            </div >
        )
    }
}
