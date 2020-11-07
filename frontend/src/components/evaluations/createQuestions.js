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

const initialState = [
    { question_1: 'planifier et organiser son travail de façon efficace', response_1: "true" },
    { question_2: 'comprendre rapidement les directives relatives à son travail', response_2: "true" },
    { question_3: 'maintenir un rythme de travail soutenu', response_3: "true" },
    { question_4: 'établir ses priorités', response_4: "true" },
    { question_5: 'respecter ses échéanciers', response_5: "true" },
];

const ChoixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord']



export default function CreateQuestions() {
    const classes = useStyles();
    const [questions, setquestions] = useState(initialState)


    const change = () => {
        setquestions({ ...questions, question_1: "soy la question qui vines de changer", response_1: 'soy la response al question' })


    }

    useEffect(() => {
        change();
        return () => {

        }
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
    }

    return (
        <div  >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>

            </Grid>

            <RadioGroup
                aria-label="Location"
                name="location"
                className={classes.group}
                //value={location}
                onChange={handleChange}
                row={true}
            >
                <FormControlLabel value="company" control={<Radio />} label="Company" />
                <FormControlLabel value="home" control={<Radio />} label="Home" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>


          <div className="container-fluid">
          <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Le stagiaire a été en mesure de :</strong></TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                </TableContainer>


          </div>
                
           

            <p>{questions.question_1}</p>
            <p>{questions.response_1}</p>
        </div>
    )
}
