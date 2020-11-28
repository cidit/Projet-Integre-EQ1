import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React,{  useEffect, useState } from 'react';
import CandidatureService from '../../service/CandidatureService';
import EtudiantService from '../../service/EtudiantService';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '#E9E9E9',
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: '50%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    }
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
export default function ListEtudiantsEnCharge() {
    const [candidatures, setCandidatures] = useState([])
    const classes = useStyles();
    const id = localStorage.getItem("desc") === "Enseignant" ? localStorage.getItem("id") : '';

    const getEtudiant = async () => {
        const response = await EtudiantService.getEtudiantsbyEnseignat(id);
        console.log(response.data)
        setCandidatures(response.data);
    }

    useEffect(() => {
        getEtudiant()
        return () => {
            setCandidatures([])
        }
    }, [])


    if (candidatures.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <div className='container-fluid'>
                {candidatures &&
                    <>
                        <TableContainer className='mt-3'>
                            <Table className="table table-striped">
                                <TableHead className={classes.root}>
                                    <TableRow >
                                        <TableCell className={classes.textTitle} >Nom </TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Status stage</TableCell>
                                        <TableCell className={classes.textTitle}>Adresse</TableCell>
                                        <TableCell className={classes.textTitle}>Matricule</TableCell>
                                        <TableCell className={classes.textTitle}>Session courante</TableCell>
                                        
                                  
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidatures.map((row) => (
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
                    <TableCell >{row.prenom} {row.nom}</TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell>{row.telephone}</TableCell>
                    <TableCell>{row.programme}</TableCell>
                    <TableCell>{row.statutStage}</TableCell>
                    <TableCell>{row.adresse}</TableCell>
                    <TableCell>{row.matricule}</TableCell>
                    <TableCell>{row.session.nom}</TableCell>
                    
                </TableRow>
    
        </React.Fragment>
    );

};
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune étudaint en charge pour le moment</Alert>
            </div>
        </div>
    </div>;
}



