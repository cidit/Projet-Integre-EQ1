import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import {
    RadioGroup, Typography, ButtonBase, Grid, FormControlLabel, Radio, TableRow,
    TableHead, TableContainer, TableCell, TableBody, Table
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
const valueInput = [
    { id: "0", value: 'Totalement en accord', checked: false,name:''},
    { id: "1", value: 'Plutôt en accord', checked: false, name:'' },
    { id: "2", value: 'Plutôt en désaccord', checked: false, name:'' },
    { id: "3", value: 'Totalement en désaccord', checked: false, name:'' },
    { id: "0", value: 'N/A', checked: false, row: '', column: '' }];

const initialInputs = [
    { id: "0", question: 'planifier et organiser son travail de façon efficace', response: "true" },
    { id: "1", question: 'comprendre rapidement les directives relatives à son travail', response: "true" },
    { id: "2", question: 'maintenir un rythme de travail soutenu', response: "true" },
    { id: "3", question: 'établir ses priorités', response: "true" },
    { id: "4", question: 'respecter ses échéanciers', response: "true" },
];



export default function CreateQuestions3() {
    const classes = useStyles();
    const [inputs, setInputs] = useState(initialInputs)
    const [questions, setQuestions] = useState([])
    const [selectedInputValue, setcheckOptionValue] = useState('')
    const [checkedId, setCheckedId] = useState(0);
    const [selectedName, setselectedName] = useState('');
    const [row, setrow] = useState('')
    const [initialRadios, setInitialRadios] = useState(valueInput)
    const [inputName, setinputName] = useState('')
    const{index} =0;


    const change = () => {
        //setquestions(initialState)
    }


    useEffect(() => {
        change();
        return () => {

        }
    }, [])

    const setResponse = (i) => {

        setrow(i)

    }


    const handleChange = (e) => {
        //setInitialRadios(...initialRadios,{  id: e.target.name, value:  e.target.value, checked:  e.target.checked,
                                name: e.target.name+ e.target.id})
        console.log(index)
        //setCheckedId(e.target.id)
       // setcheckOptionValue(e.target.value)
       // setinputName(e.target.name)
       // console.log(e.target.value)


        //console.log(e.target.checked)

        //setQuestions(questions.push(inputs[e.target.id]))
        //questions.push(inputs[e.target.id])
        //setSelectedValue({ ...selectedValue, value: e.target.value, checked: true })
        //setInitialRadios({ ...valueInput, id: e.target.id, value: e.target.value, checked: e.target.checked })
    }

    //console.log(initialRadios)

    if (inputs.length === 0) {
        return <p>Loading....</p>
    } else {
        return (
            <div className="container-fluid">
                <div className="col">
                    <div className="pt-3 mt-3">
                     
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        {ChoixResponses.map((choix, i) =>
                                            <th key={i} >{choix}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                {inputs.map(data => (
                                     <tr key={data.id}>
                                      
                                            <td component="th" scope="row">
                                                {data.question}
                                            </td>
                                        
                                            {initialRadios.map((input, i) =>
                                                <td key={i} >
                                                    <div className='ra'></div>
                                                    <Radio
                                                        checked={(checkedId == data.id) && (selectedInputValue === input.value) 
                                                            || input.name}
                                                        value={ChoixResponses[i]}
                                                        onChange={handleChange}
                                                        row={data.id}
                                                        id={data.id}
                                                        name={input.id}
                                                        onClick={setResponse}
                                                    />

                                                </td>
                                            )}
                                            </tr>
                                    ))}


                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
