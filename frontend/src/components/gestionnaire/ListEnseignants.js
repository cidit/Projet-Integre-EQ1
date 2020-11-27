import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import EnseignantService from '../../service/EnseignantService';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '',
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
        fontSize: 15,
        width: '20%'
    },
    row:{
        width:'2%'
    }
}));

export default function ListEnseignants() {
    const [enseignants, setEnseignants] = useState([])
    const classes = useStyles();

    const getEnseignants = async () => {
        const response = await EnseignantService.getEnseignantsInscrits();
        setEnseignants(response.data);
    }

    useEffect(() => {
        getEnseignants()
        return () => {
            setEnseignants([])
        }
    }, [])


    if (enseignants.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <div className='container-fluid'>
                {enseignants &&
                    <>
                        <TableContainer >
                            <h4 align='center' className='m-2 sticky-top' ><strong>List enseignants </strong></h4>

                            <Table className="table table-striped">
                                <TableHead className={classes.root}>
                                    <TableRow className={classes.row}>
                                        <TableCell className={classes.textTitle}>Nom de l'enseignant</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell style={{ width: '20%' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {enseignants.map((row) => (
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
    const history = useHistory();
    const classes = useStyles();

    const handleClickRow = (_row) => {
        history.push("etudiantsAuEnseignant/" + _row.nom + "/" + _row.prenom + "/" + _row.id + "/" + _row.programme);
    }

    return (
        <React.Fragment>

            <TableRow  className={classes.row}>
                <TableCell >{row.prenom} {row.nom}</TableCell>
                <TableCell  >{row.programme}</TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell >{row.telephone}</TableCell>

                <TableCell style={{ width: '20%' }}>
                    <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickRow(row)} style={{ textTransform: 'none' }}>
                        Assigner étudiants
                    </Button>
                    <Button variant="outlined" size="small" color="primary" style={{ textTransform: 'none' }} >
                        Voir étudiants assigneés
                    </Button>

                </TableCell>
            </TableRow>

        </React.Fragment>
    );

};
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'enseignant inscrit</Alert>
            </div>
        </div>
    </div>;
}


