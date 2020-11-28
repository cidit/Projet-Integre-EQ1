import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {TableRow, TableCell} from '@material-ui/core';
import React, { useEffect, useState } from "react";
import EvaluationService from '../../../service/EvaluationService';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
       
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

export default function ListHistoriqueEvaluationsStagiaires() {
    const [listEvaluationsEmployeur, setListEvaluationsEmployeur] = useState([])
    const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';
    const classes = useStyles();



    const getListEvaluations = async () => {
        var idSession = localStorage.getItem("session");
        const response = await EvaluationService.getEvaluationsStagiaireByEmployeur(id, idSession);
        setListEvaluationsEmployeur(response.data);
        console.log("response")
        console.log(response.data)
    }

    useEffect(() => {
        getListEvaluations()
        return () => {

        }
    }, [])

    return (
      <Paper className={classes.root}>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date création</StyledTableCell>
                            <StyledTableCell align="right">Étudiant</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Programme</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {listEvaluationsEmployeur.map((data) => (
                            <StyledTableRow key={data.id}>
                                <StyledTableCell component="th" scope="row">
                                {data.dateCreation}
                                </StyledTableCell>
                                <StyledTableCell align="right">{data.etudiant.prenom} {data.etudiant.nom}</StyledTableCell>
                                <StyledTableCell align="right">{data.etudiant.email}</StyledTableCell>
                                <StyledTableCell align="right">{data.etudiant.programme}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
