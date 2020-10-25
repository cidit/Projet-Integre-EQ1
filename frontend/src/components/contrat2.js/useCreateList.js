import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Employeur from '../../model/Employeur'
import EmployeurService from '../../service/EmployeurService'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import UseCreerContrat from '../contrat2.js/useCreerContrat';
import HorizontalNonLinearStepper from '../contrat2.js/CreationContrat'
import useCreationContrat from '../contrat2.js/useCreerContrat'
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function List(props) {
    const { list } = props.list;
    const { header } = props.header;

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const classes = useRowStyles();
    const [selected, setSelected] = React.useState(false);

    const handleClick = (event, data) => {
        event.stopPropagation();
        setSelected(!selected);
        console.log(data);
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                           {header.map((_header)=>{
                                <TableCell align="right">{_header}</TableCell>
                           })}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>


    )
}

export default function CollapsibleTable() {
    const [employeurs, setEmployeurs] = useState([]);
    const [employeurChoisi, setEmployeurChoisi] = useState(null);


    const { employeur, isLoading, error } = useCreateList(employeurs);

    useEffect(() => {
        let mounted = true;
        EmployeurService.getAll().then(response => {
            if (mounted) setEmployeurs(response)
        });
        //EmployeurService.getById(4).then(reponse => setEmployeurChoisi(reponse)).then((res) => console.log(res))

        return function cleanup() {
            mounted = false;
            setEmployeurs(null);
            setEmployeurChoisi(null)
        }
    }, []);

const header =[
    nom,
    telephone,
    email,
];



    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                
                        <List list ={employeurs} />
                    
            </Table>
        </TableContainer>
    );
}
