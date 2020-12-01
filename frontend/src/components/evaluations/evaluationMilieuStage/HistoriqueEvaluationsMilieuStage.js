import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,Paper
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import EvaluationService from '../../../service/EvaluationService';



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '#E9E9E9',
        fontWeight: 'bold'
    },
    // paper: {
    //     padding: theme.spacing(0),
    //     margin: 'auto',
    //     maxWidth: '50%',
    // },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(-15),
        margin: 'auto',
        maxWidth: '50%',
        marginLeft: theme.spacing(1, 'auto'),
    },
    row: {
        '& > *': {
            padding: theme.spacing(1),
            borderBottom: 'unset',
            //backgroundColor: '#E9E9E9  ',
        },
    },
}));
const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
            borderBottom: 'unset',
            //backgroundColor: '#E9E9E9  ',
        },
    },
}));
export default function HistoriqueEvaluationsMilieuStage() {
    const [evaluationsMilieuStage, setEvaluationsMilieuStage] = useState([])
    const classes = useStyles();
    const id = localStorage.getItem("desc") === "Enseignant" ? localStorage.getItem("id") : '';

    const getEtudiant = async () => {
        const response = await EvaluationService.getEvaluationsMilieuStageByEnseignant(id);
        setEvaluationsMilieuStage(response.data);
    }

    useEffect(() => {
        getEtudiant()
        return () => {
            setEvaluationsMilieuStage([])
        }
    }, [])


    if (evaluationsMilieuStage.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <div className='container-fluid'>
                {evaluationsMilieuStage &&
                    <>
                    <TableContainer >
                            <Table className="table table-striped">
                                <TableHead>
                                    <TableRow >
                                        <TableCell className={classes.textTitle} >Date de creation </TableCell>
                                        <TableCell className={classes.textTitle}>Nom de l'employeur</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel de l'employeur</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Étudiant</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel de l'étudiant</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {evaluationsMilieuStage.map((row) => (
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
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell >{row.dateCreation}</TableCell>
                <TableCell >{row.employeur.nom}</TableCell>
                <TableCell >{row.employeur.email}</TableCell>
                <TableCell>{row.employeur.telephone}</TableCell>
                <TableCell>{row.etudiant.nom}{row.etudiant.prenom}</TableCell>
                <TableCell>{row.etudiant.email}</TableCell>
            </TableRow>
        </React.Fragment>
    );

};
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune évaluation pour le moment</Alert>
            </div>
        </div>
    </div>;
}




