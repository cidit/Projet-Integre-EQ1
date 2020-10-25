import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import EmployeurService from '../../service/EmployeurService'
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';


export default function CollapsibleTable() {
    const [employeurs, setEmployeurs] = useState([]);
    const [employeurChoisi, setEmployeurChoisi] = useState(null);





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





    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>

                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    <Row row={employeurs} />

                </TableBody>
            </Table>
        </TableContainer>
    );
}
