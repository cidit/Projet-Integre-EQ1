import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import EvaluationService from '../../../service/EvaluationService';
import GetAppIcon from '@material-ui/icons/GetApp';

import AuthService from "../../../service/security/auth.service";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '#E9E9E9',
        fontWeight: 'bold'
    },
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
        },
    },
}));
const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
            borderBottom: 'unset',
        },
    },
}));
export default function HistoriqueEvaluationsMilieuStage() {
    const [evaluationsMilieuStage, setEvaluationsMilieuStage] = useState([])
    const classes = useStyles();
    const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_ENSEIGNANT" ? AuthService.getTokenId() : '';

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
                                        <TableCell className={classes.textTitle}>Télécharger évaluation</TableCell>
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

    const downloadEvaluation = async (evaluation) => {
        await EvaluationService.telechargerEvaluationMilieuStage(evaluation.id).then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "Evaluation_Milieu_stage" + evaluation.employeur.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell className='align-middle'>{row.dateCreation}</TableCell>
                <TableCell className='align-middle'>{row.employeur.nom}</TableCell>
                <TableCell className='align-middle'>{row.employeur.email}</TableCell>
                <TableCell className='align-middle'>{row.employeur.telephone}</TableCell>
                <TableCell className='align-middle'>{row.etudiant.nom}{row.etudiant.prenom}</TableCell>
                <TableCell className='align-middle'>{row.etudiant.email}</TableCell>
                <TableCell>
                    <Button className='m-2' 
                    size="small" 
                    color="primary" 
                    onClick={() => downloadEvaluation(row)}><GetAppIcon /></Button>
                </TableCell>
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




