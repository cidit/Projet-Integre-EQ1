import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { TableRow, TableCell } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import EvaluationService from '../../../service/EvaluationService';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3',
    width: '100%',
    fontWeight: 'bold',
    margin: 'auto',
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'center',

  },
  heading: {
    margin: 'auto',
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
    margin: 'auto',
  },
  row: {
    textAlign: 'center',
  }
}));

export default function ListHistoriqueEvaluationsStagiaires() {
  const [listEvaluationsEmployeur, setListEvaluationsEmployeur] = useState([])
  const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';
  const classes = useStyles();



  const getListEvaluations = async () => {
    var idSession = localStorage.getItem("session");
    const response = await EvaluationService.getEvaluationsStagiaireByEmployeur(id, idSession);
    setListEvaluationsEmployeur(response.data);
  }

  useEffect(() => {
    getListEvaluations()
    return () => {
    }
  }, [])

  if (listEvaluationsEmployeur.length === 0) {
    return (
      AlertAucunContrat(true)
    )
  } else {
    return (
      <div className='container-fluid'>
        {listEvaluationsEmployeur &&
          <>
            <TableContainer >
              <Table className="table table-striped">
                <TableHead>
                  <TableRow >
                    <TableCell className={classes.textTitle} >Date de creation </TableCell>
                    <TableCell className={classes.textTitle}>Étudiant </TableCell>
                    <TableCell className={classes.textTitle}>Programme </TableCell>
                    <TableCell className={classes.textTitle}>Courriel </TableCell>
                    <TableCell className={classes.textTitle}>Téléphone</TableCell>
                    <TableCell className={classes.textTitle}>Remplie par</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listEvaluationsEmployeur.map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }
      </div>
    )
  }
};

function Row(props) {
  const { row } = props;
  const classes = useStyles();
  var nomSession = localStorage.getItem("nomSession");

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell >{row.dateCreation}</TableCell>
        <TableCell >{row.etudiant.prenom} {row.etudiant.nom}</TableCell>
        <TableCell >{row.etudiant.programme}</TableCell>
        <TableCell >{row.etudiant.email}</TableCell>
        <TableCell >{row.etudiant.telephone}</TableCell>
        <TableCell >{row.employeur.nom}</TableCell>
      </TableRow>
    </React.Fragment>
  );

};
function AlertAucunContrat(isGestionnaire) {
  return <div className="container">
    <div className="row justify-content-md-center">
      <div className="col">
        <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez fait aucune évaluation</Alert>
      </div>
    </div>
  </div>;
}
