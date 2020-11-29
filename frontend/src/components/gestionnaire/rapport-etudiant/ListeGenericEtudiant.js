import React from 'react';
import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        fontWeight: 'bold',
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',
    },
    heading: {
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
        margin:'auto',
    },
    row:{
        textAlign: 'center',
    }
}));

export default function ListeGenericEtudiant(props) {
    
    const classes = useStyles();

    console.log(props);

    if (props.etudiants.length === 0) {
        return (
            AlertAucunEtudiant(true)
        )
    } else {
        return (
        <div className='container' >
            <TableContainer className={classes.root}>
                <Table className="table ">
                    <TableHead className={classes.heading}>
                    <TableRow>
                        <TableCell> Matricule </TableCell>
                        <TableCell> Nom </TableCell>
                        <TableCell> Prénom </TableCell>
                        <TableCell> Programme </TableCell>
                        <TableCell> Courriel </TableCell>
                        <TableCell> Téléphone </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.etudiants
                        .map(
                            etudiant =>
                            <TableRow key={etudiant.id}>
                                <TableCell>{etudiant.matricule}</TableCell>
                                <TableCell>{etudiant.nom}</TableCell>
                                <TableCell>{etudiant.prenom}</TableCell>
                                <TableCell>{etudiant.programme}</TableCell>
                                <TableCell>{etudiant.email}</TableCell>
                                <TableCell>{etudiant.telephone}</TableCell>
                            </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }
}


function AlertAucunEtudiant() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'etudiants</Alert>
            </div>
        </div>
    </div>
}